/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component,  OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { ChartGenerationService } from '@data-viz/services';
import { Options } from '@data-viz/types';


@Component({
  selector: 'data-viz-donut-chart',
  standalone: true,
  imports: [CommonModule],
   providers: [ChartGenerationService],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss',
})
export class DonutChartComponent  implements OnInit {

 data: [] = [];
  options: Options = {
    width: 1200,
    height: 440,
    margin: { top: 10, right: 20, bottom: 20, left: 50 },
    backgroundColor: '',
    responsive: true,
    xAxis: { padding: 0.1 }
  };
  constructor( private chartGenerationService: ChartGenerationService) { }

  ngOnInit(): void {
    d3.json('assets/pie.json').then((data:any) => {
      this.options = {
       width: 1200,
       height: 520,
       margin : {top: 20, right: 20, bottom: 40, left: 50},
       backgroundColor: '',
       responsive: true,
       xAxis : {padding: 0}
     };
      // tslint:disable-next-line:no-string-literal
      this.drawChart('donut', data['products'], data['colors'], this.options);
    });
   }

   drawChart(id: string, data: any[], colors: [], options: Options): void{
    const selectorSvg = this.chartGenerationService.buildSvg(id, options);
    const width = options.width - options.margin.left - options.margin.right;
    const height = options.height - options.margin.top - options.margin.bottom;
    const radius = Math.min(width, height) / 2;
    selectorSvg.attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')');


    const pie = d3.pie()
    .padAngle(0.005)
    .sort(null)
    // tslint:disable-next-line:no-string-literal
    .value((d:any) => d['sales']);
    const arc = d3.arc()
    .innerRadius(radius * 0.75)
    .outerRadius(radius);
    const chartContainer = selectorSvg.append('g')
                                 .classed('chart-container', true)
                                 .attr('transform', 'translate(' + radius + ',' + radius + ')');

    const path = chartContainer.selectAll('path')
                .data(pie(data));

    // Enter new arcs
    path
      .enter()
      .append('path')
      .attr('fill', (d:any, i:number) => colors[i])
      /* .attr('d', arc) */
      .attr('stroke', 'white')
      .attr('stroke-width', '2px')
      .transition()
      .delay((d:any, i:number) => {
        return i * 400;
      })
      .attrTween('d', (d:any) => {
        const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return (t:any) => {
          d.endAngle = i(t);
          return arc(d);
        };
      });

   }

}

