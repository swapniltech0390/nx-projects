/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import * as d3 from 'd3';
import { ChartGenerationService, InteractionService } from '@data-viz/services';
import { Options, ScaleProperties } from '@data-viz/types';

@Component({
  selector: 'data-viz-bar-chart',
  standalone: true,
  imports: [CommonModule],
  providers: [ChartGenerationService, InteractionService],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit, OnDestroy {
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
    d3.json('/assets/bar.json').then((data: any) => {
      this.options = {
        width: 1300,
        height: 480,
        margin: { top: 10, right: 20, bottom: 20, left: 50 },
        backgroundColor: '',
        responsive: true,
        xAxis: { padding: 0.1 }
      };
      // tslint:disable-next-line:no-string-literal
      this.drawChart('bar', data['data'], this.options);
    });
    this.interactionHandler();
    this.interactionService.enableLegend.next(false);
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

  drawChart(id: string, data: any[], options: Options): void {
    const selectorSvg = this.chartGenerationService.buildSvg(id, options);
    const width = options.width - options.margin.left - options.margin.right;
    const height = options.height - options.margin.top - options.margin.bottom;
    const xAxisOptions: ScaleProperties = {
      domain: data.map((d) => d.name),
      range: [0, width],
      padding: 0.1
    };
    const domain = d3.max(data, (d) => +d['salary']) ?? 1;
    const yAxisOptions: ScaleProperties = {
      // tslint:disable-next-line:no-string-literal
      domain: [0, domain * 1.2],
      range: [height, 0]
    };

    const xAxis = this.chartGenerationService.computeBandScale(xAxisOptions);
    const yAxis = this.chartGenerationService.computeLinearScale(yAxisOptions);
    // Added X-Axis
    const xAxisCall = d3.axisBottom(xAxis);
    const yAxisCall = d3.axisLeft(yAxis).ticks(5);

    // Add grid lines
    const xGridBuilder = selectorSvg.append('g').classed('x-grid grid', true);
    const yGridBuilder = selectorSvg.append('g').classed('y-grid grid', true);

    xGridBuilder
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxisCall.ticks(5).tickSize(-height));
    yGridBuilder.call(yAxisCall.tickSize(-width));

    selectorSvg.attr(
      'transform',
      'translate(' + options.margin.left + ',' + options.margin.top + ')'
    );

    const chartContainer = selectorSvg
      .append('g')
      .classed('chart-container', true);

    chartContainer
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      // tslint:disable-next-line:no-string-literal
      .attr('x', (d: any) => xAxis(d['name']))
      .attr('width', xAxis.bandwidth())
      .attr('y', height)
      .transition() // <---- Here is the transition
      .duration(1000)
      .delay((d: any, i: number) => 300 * i)
      // tslint:disable-next-line:no-string-literal
      .attr('y', (d: any) => yAxis(d['salary']))
      // tslint:disable-next-line:no-string-literal
      .attr('height', (d: any) => height - yAxis(d.salary));
  }
  interactionHandler(): void {
    // Handle hide or show x grid
    this.hideOrShowXGridSubs = this.interactionService.hideXGrid.subscribe(
      (res) => {
        if (res) {
          d3.selectAll('.x-grid .tick > line').classed('display-none', false);
        } else {
          d3.selectAll('.x-grid .tick > line').classed('display-none', true);
        }
      }
    );
    // Handle hide or show y grid
    this.hideOrShowYGridSubs = this.interactionService.hideYGrid.subscribe(
      (res) => {
        if (res) {
          d3.selectAll('.y-grid .tick > line').classed('display-none', false);
        } else {
          d3.selectAll('.y-grid .tick > line').classed('display-none', true);
        }
      }
    );
    // Handle hide or show X Axis
    this.enableXAxisSubs = this.interactionService.hideXAxisLine.subscribe(
      (res) => {
        if (res) {
          d3.selectAll('.x-grid path').classed('display-none', false);
          d3.selectAll('.x-grid .tick > text').classed('display-none', false);
        } else {
          d3.selectAll('.x-grid path').classed('display-none', true);
          d3.selectAll('.x-grid .tick > text').classed('display-none', true);
        }
      }
    );
    // Handle hide or show Y Axis
    this.enableYAxisSubs = this.interactionService.hideYAxisLine.subscribe(
      (res) => {
        if (res) {
          d3.selectAll('.y-grid path').classed('display-none', false);
          d3.selectAll('.y-grid .tick > text').classed('display-none', false);
        } else {
          d3.selectAll('.y-grid path').classed('display-none', true);
          d3.selectAll('.y-grid .tick > text').classed('display-none', true);
        }
      }
    );
  }
}
