/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import * as d3 from 'd3';
import { ChartGenerationService, InteractionService } from '@data-viz/services';
import { Options, ScaleProperties } from '@data-viz/types';

@Component({
  selector: 'data-viz-grouped-bar-chart',
  standalone: true,
  imports: [CommonModule],
  providers: [ChartGenerationService, InteractionService],
  templateUrl: './grouped-bar-chart.component.html',
  styleUrl: './grouped-bar-chart.component.scss'
})
export class GroupedBarChartComponent implements OnInit, OnDestroy {
  data: [] = [];
  options: Options = {
    width: 1200,
    height: 440,
    margin: { top: 10, right: 20, bottom: 20, left: 50 },
    backgroundColor: '',
    responsive: true,
    xAxis: { padding: 0.1 }
  };
  hideOrShowXGridSubs: Subscription = new Subscription();
  hideOrShowYGridSubs: Subscription = new Subscription();
  enableXAxisSubs: Subscription = new Subscription();
  enableYAxisSubs: Subscription = new Subscription();
  constructor(
    private chartGenerationService: ChartGenerationService,
    private interactionService: InteractionService
  ) {}

  ngOnInit(): void {
    d3.json('/assets/group-bar.json').then((data: any) => {
      this.options = {
        width: 1200,
        height: 440,
        margin: { top: 10, right: 20, bottom: 20, left: 50 },
        backgroundColor: '',
        responsive: true,
        xAxis: { padding: 0.05 }
      };
      // tslint:disable-next-line:no-string-literal
      this.drawChart(
        'group-bar',
        // tslint:disable-next-line:no-string-literal
        data['groupData'],
        // tslint:disable-next-line:no-string-literal
        data['colors'],
        this.options
      );
    });
    this.interactionHandler();
  }
  ngOnDestroy(): void {
    if (this.hideOrShowXGridSubs) {
      this.hideOrShowXGridSubs.unsubscribe();
    }
    if (this.hideOrShowYGridSubs) {
      this.hideOrShowYGridSubs.unsubscribe();
    }
    if (this.enableXAxisSubs) {
      this.enableXAxisSubs.unsubscribe();
    }
    if (this.enableYAxisSubs) {
      this.enableYAxisSubs.unsubscribe();
    }
  }

  drawChart(id: string, data: any[], colors: [], options: Options): void {
    const selectorSvg = this.chartGenerationService.buildSvg(id, options);
    const width = options.width - options.margin.left - options.margin.right;
    const height = options.height - options.margin.top - options.margin.bottom;
    const yMax = d3.max(data, (key) =>
      // tslint:disable-next-line:no-string-literal
      d3.max(key['values'], (d: any) => d['grpValue'])
    );
    const xAxisOptions: ScaleProperties = {
      domain: data.map((d) => d.key),
      range: [0, width],
      padding: options?.xAxis?.padding
    };
    const yAxisOptions: ScaleProperties = {
      domain: [0, yMax],
      range: [height, 0]
    };

    const x0Axis = this.chartGenerationService.computeBandScale(xAxisOptions);
    const yAxis = this.chartGenerationService.computeLinearScale(yAxisOptions);

    // Added X-Axis
    const xAxisCall = d3.axisBottom(x0Axis);
    const yAxisCall = d3.axisLeft(yAxis).ticks(5);

    // Add grid lines
    const xGridBuilder = selectorSvg.append('g').classed('x-grid grid', true);
    const yGridBuilder = selectorSvg.append('g').classed('y-grid grid', true);

    xGridBuilder
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxisCall.ticks(5).tickSize(-height));
    yGridBuilder.call(yAxisCall.tickSize(-width));

    // tslint:disable-next-line:no-string-literal
    const rateNames = data[0].values.map((d: any) => d['grpName']);

    const x1AxisOptions: ScaleProperties = {
      domain: rateNames,
      range: [0, x0Axis.bandwidth()],
      padding: 0
    };

    const x1Axis = this.chartGenerationService.computeBandScale(x1AxisOptions);
    selectorSvg.attr(
      'transform',
      'translate(' + options.margin.left + ',' + options.margin.top + ')'
    );

    const chartContainer = selectorSvg
      .append('g')
      .classed('chart-container', true);
    const slice = chartContainer
      .selectAll('.slice')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'g')
      .attr('transform', (d: any) => 'translate(' + x0Axis(d.key) + ',0)');

    slice
      .selectAll('rect')
      .data((d: any) => d.values)
      .enter()
      .append('rect')
      .attr('width', x1Axis.bandwidth())
      .attr('x', (d: any) => x1Axis(d.grpName))
      .style('fill', (d: any, i: any) => colors[i])
      .attr('y', height)
      .transition()
      .duration(2000)
      .attr('y', (d: any) => yAxis(d.grpValue))
      .attr('height', (d: any) => height - yAxis(d.grpValue));
  }
  interactionHandler(): void {
    // Handle hide or show x grid
    this.hideOrShowXGridSubs = this.interactionService.hideXGrid.subscribe(
      (res) =>
        d3.selectAll('.x-grid .tick > line').classed('display-none', !res)
    );
    // Handle hide or show y grid
    this.hideOrShowYGridSubs = this.interactionService.hideYGrid.subscribe(
      (res) => {
        d3.selectAll('.y-grid .tick > line').classed('display-none', !res);
      }
    );
    // Handle hide or show X Axis
    this.enableXAxisSubs = this.interactionService.hideXAxisLine.subscribe(
      (res) => {
        d3.selectAll('.x-grid path').classed('display-none', !res);
        d3.selectAll('.x-grid .tick > text').classed('display-none', !res);
      }
    );
    // Handle hide or show Y Axis
    this.enableYAxisSubs = this.interactionService.hideYAxisLine.subscribe(
      (res) => {
        d3.selectAll('.y-grid path').classed('display-none', !res);
        d3.selectAll('.y-grid .tick > text').classed('display-none', !res);
      }
    );
  }
}
