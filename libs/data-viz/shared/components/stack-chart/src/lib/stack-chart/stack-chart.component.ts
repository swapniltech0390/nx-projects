/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartGenerationService, InteractionService } from '@data-viz/services';
import { LegendData, Options, ScaleProperties } from '@data-viz/types';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';

@Component({
  selector: 'data-viz-stack-chart',
  standalone: true,
  imports: [CommonModule],
  providers:[ChartGenerationService,InteractionService],
  templateUrl: './stack-chart.component.html',
  styleUrl: './stack-chart.component.scss',
})
export class StackChartComponent implements OnInit, OnDestroy{
  data: [] = [];

  options: Options = {
    width: 1300,
    height: 460,
    margin : {top: 20, right: 20, bottom: 20, left: 50},
    backgroundColor: '',
    responsive: true,
    xAxis : {padding: 0.2}
  };
  
    hideOrShowXGridSubs: Subscription = new Subscription();
  hideOrShowYGridSubs: Subscription = new Subscription();
  enableXAxisSubs: Subscription = new Subscription();
  enableYAxisSubs: Subscription = new Subscription();
  legendChangeSub: Subscription = new Subscription();
  constructor( private chartGenerationService: ChartGenerationService,
               private interactionService: InteractionService) { }
  ngOnInit(): void {
    d3.json('/assets/stack.json').then((data: any) => {
      // tslint:disable-next-line:no-string-literal
      const keyGroupElements = [{id: 1, name: 'AUDI', status: true, color: data['colors'][0]},
      // tslint:disable-next-line: no-string-literal
      {id: 2, name: 'BMW', status: true, color: data['colors'][1]},
      // tslint:disable-next-line:no-string-literal
      {id: 3, name: 'Ferrari', status: true, color: data['colors'][2]},
      // tslint:disable-next-line:no-string-literal
      {id: 4, name: 'Mercedez', status: true, color: data['colors'][3]}];

      this.interactionService.legendData.next(keyGroupElements);
      // tslint:disable-next-line:no-string-literal
      this.data = data['data'];
      // tslint:disable-next-line:no-string-literal
      this.drawChart('stack', data['data'], keyGroupElements, this.options);
    });
    this.interactionHandler();
    this.interactionService.enableLegend.next(true);
    this.interactionService.enableLegendCheckbox.next(true);
   }
   ngOnDestroy(): void{
    if (this.hideOrShowXGridSubs) { this.hideOrShowXGridSubs.unsubscribe(); }
    if (this.hideOrShowYGridSubs) { this.hideOrShowYGridSubs.unsubscribe(); }
    if (this.enableXAxisSubs) { this.enableXAxisSubs.unsubscribe(); }
    if (this.enableYAxisSubs) { this.enableYAxisSubs.unsubscribe(); }
    if (this.legendChangeSub){this.legendChangeSub.unsubscribe(); }
  }
   drawChart(id: string, data:any[], keyGroupElements: any[], options: Options): void{
    d3.select('#' + id).html('');
    const selectorSvg = this.chartGenerationService.buildSvg(id, options);
  const width = options.width - options.margin.left - options.margin.right;
const height = options.height - options.margin.top - options.margin.bottom;


    // Transpose the data into layers
    const keyGroup: any[] = [];
    const colors: any[] = [];
    // Managing keys and data for stack chart
    keyGroupElements.filter((items: any) => !!items.status).forEach(item => {
      keyGroup.push(item.name);
      colors.push(item.color);
    });
    const stack = d3.stack().keys(keyGroup);
    const stackSeries = stack(data);
    const max = d3.max(stackSeries[stackSeries.length - 1], (d) => +d[1]) ?? 1;
    const xAxisOptions: ScaleProperties = {
                           domain : data.map((d: { year: any; }) =>  d.year),
                           range: [0, width],
                           padding: options?.xAxis?.padding
                         };
    const yAxisOptions: ScaleProperties = {
        // tslint:disable-next-line:no-string-literal
                                 domain : [0, max * 1.1],
                                 range: [height, 0]
                               };
    const colorOptions: ScaleProperties = {domain : keyGroup, range: colors };
    const colorScale = this.chartGenerationService.computeOrdinalScale(colorOptions);

    const xAxis = this.chartGenerationService.computeBandScale(xAxisOptions);
    const yAxis = this.chartGenerationService.computeLinearScale(yAxisOptions);

    // Added X-Axis
    const xAxisCall = d3.axisBottom(xAxis);
    const yAxisCall = d3.axisLeft(yAxis).ticks(5);

    // Add grid lines
    const xGridBuilder = selectorSvg.append('g').classed('x-grid grid', true);
    const yGridBuilder = selectorSvg.append('g').classed('y-grid grid', true);

    xGridBuilder.attr('transform', 'translate(0,' + height + ')').call(xAxisCall.ticks(5).tickSize(-height));
    yGridBuilder.call(yAxisCall.tickSize(-width));

    selectorSvg.attr('transform', 'translate(' + options?.margin?.left + ',' + options?.margin?.top + ')');

    const chartContainer = selectorSvg.append('g').classed('chart-container', true);
    const sel = chartContainer
      .selectAll('g.series')
      .data(stackSeries)
      .enter()
      .append('g')
      .classed('series', true)
      .style('fill', (d: { key: any; }) => colorScale(d.key));

    const rectG =   sel.selectAll('rect')
    .data((d: any) => d)
    .enter()
    .append('rect')
    .attr('width', xAxis.bandwidth())
    .attr('x', (d: { data: { year: any; }; }) => xAxis(d.data.year))
    .attr('y', height);

    rectG  .transition().duration(2000)  .attr('y', (d: any[]) => yAxis(d[1])) .attr('height', (d: any[]) => {
      return +yAxis(d[0]) - +yAxis(d[1]);
    });
  }

  interactionHandler(): void{
    // Handle hide or show x grid
   this.hideOrShowXGridSubs = this.interactionService.hideXGrid.subscribe(res => {
     if (res){
       d3.selectAll('.x-grid .tick > line').classed('display-none', false);
     }else{
       d3.selectAll('.x-grid .tick > line').classed('display-none', true);
     }
   });
   // Handle hide or show y grid
   this.hideOrShowYGridSubs = this.interactionService.hideYGrid.subscribe(res => {
     if (res){
       d3.selectAll('.y-grid .tick > line').classed('display-none', false);
     }else{
       d3.selectAll('.y-grid .tick > line').classed('display-none', true);
     }
   });
   // Handle hide or show X Axis
   this.enableXAxisSubs = this.interactionService.hideXAxisLine.subscribe(res => {
     if (res){
       d3.selectAll('.x-grid path').classed('display-none', false);
       d3.selectAll('.x-grid .tick > text').classed('display-none', false);
     }else{
       d3.selectAll('.x-grid path').classed('display-none', true);
       d3.selectAll('.x-grid .tick > text').classed('display-none', true);
     }
   });
   // Handle hide or show Y Axis
   this.enableYAxisSubs = this.interactionService.hideYAxisLine.subscribe(res => {
     if (res){
       d3.selectAll('.y-grid path').classed('display-none', false);
       d3.selectAll('.y-grid .tick > text').classed('display-none', false);
     }else{
       d3.selectAll('.y-grid path').classed('display-none', true);
       d3.selectAll('.y-grid .tick > text').classed('display-none', true);
     }
   });

   this.legendChangeSub =  this.interactionService.legendData.subscribe((res: LegendData[]) => {
     if (this.data && this.data.length > 0){
      this.drawChart('stack', this.data, res, this.options);
     }
});

  }
}
