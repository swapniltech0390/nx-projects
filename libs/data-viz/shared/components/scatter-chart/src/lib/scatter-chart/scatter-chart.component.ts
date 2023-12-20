/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import * as d3 from 'd3';
import { ChartGenerationService, InteractionService } from '@data-viz/services';
import { Options, ScaleProperties } from '@data-viz/types';
@Component({
  selector: 'data-viz-scatter-chart',
  standalone: true,
  imports: [CommonModule],
  providers: [ChartGenerationService, InteractionService],
  templateUrl: './scatter-chart.component.html',
  styleUrl: './scatter-chart.component.scss'
})
export class ScatterChartComponent implements OnInit, OnDestroy {
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
    d3.json('/assets/scatter.json').then((data: any) => {
      this.options = {
        width: 1300,
        height: 460,
        margin: { top: 10, right: 20, bottom: 20, left: 60 },
        backgroundColor: '',
        responsive: true,
        xAxis: { padding: 0.1 }
      };
      // tslint:disable-next-line:no-string-literal
      this.drawChart('scatter', data['data'], data['colors'], this.options);
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
    const domain = d3.max(data, (d) => +d['horsepower']) ?? 1;

    const xAxisOptions: ScaleProperties = {
      // tslint:disable-next-line:no-string-literal
      domain: [0, domain + 2],
      range: [0, width]
    };
    const yAxisOptions: ScaleProperties = {
      // tslint:disable-next-line:no-string-literal
      domain: [0, d3.max(data, (d) => +d['mileage'] + 5000)],
      range: [height, 0]
    };

    const xAxis = this.chartGenerationService.computeLinearScale(xAxisOptions);
    const yAxis = this.chartGenerationService.computeLinearScale(yAxisOptions);

    // Added X-Axis
    const xAxisCall = d3.axisBottom(xAxis).ticks(10);
    const yAxisCall = d3.axisLeft(yAxis).ticks(10);

    // Add grid lines
    const xGridBuilder = selectorSvg.append('g').classed('x-grid grid', true);
    const yGridBuilder = selectorSvg.append('g').classed('y-grid grid', true);

    xGridBuilder
      .attr('transform', 'translate(0,' + height + ')')
      .transition()
      .duration(1000)
      .call(xAxisCall.tickSize(-height));
    yGridBuilder.transition().duration(1000).call(yAxisCall.tickSize(-width));

    selectorSvg.attr(
      'transform',
      'translate(' + options.margin.left + ',' + options.margin.top + ')'
    );

    const chartContainer = selectorSvg
      .append('g')
      .classed('chart-container', true);

    chartContainer
      .append('g')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cy', height)
      .transition()
      .duration(1000)
      .delay(1000)
      .attr('cx', (d: any) => xAxis(d.horsepower))
      .attr('cy', (d: any) => yAxis(d.mileage))
      .attr('r', 3);

    chartContainer
      .append('g')
      .selectAll('text')
      .data(data)
      .join('text')
      .attr('dy', '0.35em')
      .attr('y', height)
      .transition()
      .duration(1000)
      .delay(1000)
      .attr('x', (d: any) => xAxis(d.horsepower) + 7)
      .attr('y', (d: any) => yAxis(d.mileage))
      .text((d: any) => d.name);
  }
  interactionHandler(): void {
    // Handle hide or show x grid
    this.hideOrShowXGridSubs = this.interactionService.hideXGrid.subscribe(
      (res) => {
        d3.selectAll('.x-grid .tick > line').classed('display-none', !res);
      }
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
