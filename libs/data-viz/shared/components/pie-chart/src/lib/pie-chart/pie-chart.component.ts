/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { ChartGenerationService, InteractionService } from '@data-viz/services';
import { Options } from '@data-viz/types';


@Component({
  selector: 'data-viz-pie-chart',
  standalone: true,
  imports: [CommonModule],
   providers: [ChartGenerationService, InteractionService],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit {
  data: [] = [];
  options: Options = {
    width: 1200,
    height: 440,
    margin: { top: 10, right: 20, bottom: 20, left: 50 },
    backgroundColor: '',
    responsive: true,
    xAxis: { padding: 0.1 }
  };
  constructor(private chartGenerationService: ChartGenerationService) {}

  ngOnInit(): void {
    d3.json('/assets/pie.json').then((data:any) => {
      this.options = {
        width: 1200,
        height: 470,
        margin: { top: 20, right: 20, bottom: 40, left: 50 },
        backgroundColor: '',
        responsive: true,
        xAxis: { padding: 0 },
      };
      // tslint:disable-next-line:no-string-literal
      this.drawChart('pie', data['products'], data['colors'], this.options);
    });
  }

  drawChart(id: string, data: any[], colors: [], options: Options): void {
    const selectorSvg = this.chartGenerationService.buildSvg(id, options);
    const width = options.width - options.margin.left - options.margin.right;
    const height = options.height - options.margin.top - options.margin.bottom;
    const radius = Math.min(width, height) / 2;
    selectorSvg.attr(
      'transform',
      'translate(' + options.margin.left + ',' + options.margin.top + ')'
    );

    const pie = d3
      .pie()
      // tslint:disable-next-line:no-string-literal
      .value((d:any) => d['sales'])
      .sort(null);

    const arc = (datum:any, flag:any) => {
      return d3
        .arc()
        .innerRadius(0)
        .outerRadius(() => (flag ? radius : 0))(datum);
    };

    const chartContainer = selectorSvg
      .append('g')
      .classed('chart-container', true)
      .attr('transform', 'translate(' + radius + ',' + radius + ')');

    const path = chartContainer.selectAll('path').data(pie(data));

    // Enter new arcs
    path
      .enter()
      .append('path')
      .attr('fill', (d:any, i:any) => colors[i])
      .attr('d', (d:any) => arc(d, false))
      .transition()
      .delay((d:any, i:any) => 500 * i)
      .attr('d', (d:any) => arc(d, true))
      .attr('stroke', 'white')
      .attr('stroke-width', '6px');
  }
}

