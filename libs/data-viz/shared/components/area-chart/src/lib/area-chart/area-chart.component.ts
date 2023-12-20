/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import * as d3 from 'd3';
import { ChartGenerationService, InteractionService } from '@data-viz/services';
import { LegendData, Options, ScaleProperties } from '@data-viz/types';

@Component({
  selector: 'data-viz-area-chart',
  standalone: true,
  imports: [CommonModule],
  providers: [ChartGenerationService, InteractionService],
  templateUrl: './area-chart.component.html',
  styleUrl: './area-chart.component.scss'
})
export class AreaChartComponent implements OnInit, OnDestroy {
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
  legendChangeSub: Subscription = new Subscription();

  constructor(
    private chartGenerationService: ChartGenerationService,
    private interactionService: InteractionService
  ) {}

  ngOnInit(): void {
    d3.json('assets/area.json').then((data: any) => {
      this.options = {
        width: 1300,
        height: 460,
        margin: { top: 10, right: 20, bottom: 20, left: 50 },
        backgroundColor: '',
        responsive: true,
        xAxis: { padding: 0 }
      };
      // tslint:disable-next-line:no-string-literal
      this.data = data['data'];
      // tslint:disable-next-line:no-string-literal
      const legendDataArray = this.prepareLegendData(data['colors']);
      const chartData: never[] = [];
      legendDataArray.forEach((d) => {
        if (d.status) {
          // tslint:disable-next-line:no-string-literal
          chartData.push(...this.data.filter((e) => e['name'] === d['name']));
        }
      });
      // tslint:disable-next-line:no-string-literal
      this.drawChart('area', chartData, legendDataArray, this.options);
    });
    this.interactionHandler();
    this.interactionService.enableLegend.next(true);
    this.interactionService.enableLegendCheckbox.next(true);
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
  prepareLegendData(colors: any[]): LegendData[] {
    const products = Array.from(
      // tslint:disable-next-line:no-string-literal
      d3.group(this.data, (d) => d['name']),
      ([key, value]) => ({ key, value })
    );
    const legendData: LegendData[] = [];
    products.forEach((d, i) => {
      legendData.push({ id: i, name: d.key, status: true, color: colors[i] });
    });
    this.interactionService.legendData.next(legendData);
    return legendData;
  }
  drawChart(
    id: string,
    data: any[],
    legendData: LegendData[],
    options: Options
  ): void {
    d3.select('#' + id).html('');
    const selectorSvg = this.chartGenerationService.buildSvg(id, options);
    const width = options.width - options.margin.left - options.margin.right;
    const height = options.height - options.margin.top - options.margin.bottom;
    const xAxisOptions: ScaleProperties = {
      domain: data.map((d: { year: any }) => d.year),
      range: [0, width],
      padding: options?.xAxis?.padding
    };
    const yAxisOptions: ScaleProperties = {
      // tslint:disable-next-line:no-string-literal
      domain: [0, d3.max(data, (d) => +d['sales'])],
      range: [height, 0]
    };

    const xAxis = this.chartGenerationService.computePointScale(xAxisOptions);
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
    // Add the line
    const area = (
      datum: [number, number][] | Iterable<[number, number]>,
      flag: boolean
    ) => {
      return (
        d3
          .area()
          // tslint:disable-next-line:no-string-literal
          .x((d: any) => xAxis(d['year']))
          .y0(yAxis(0))
          // tslint:disable-next-line:no-string-literal
          .y1((d: any) => (flag ? yAxis(d['sales']) : height))(datum)
      );
    };

    const products = Array.from(
      // tslint:disable-next-line:no-string-literal
      d3.group(data, (d) => d['name']),
      ([key, value]) => ({ key, value })
    );
    chartContainer
      .selectAll('line')
      .data(products)
      .enter()
      .append('g')
      .classed('area', true)
      .append('path')
      .datum((d: { value: any }) => d.value)
      .attr('fill', (d: any, i: number) => legendData[i].color)
      .attr('stroke', (d: any, i: number) => legendData[i].color)
      .attr('stroke-width', 1.5)
      .attr('d', (d: any) => area(d, false))
      .transition()
      .duration(2000)
      .attr('d', (d: any) => area(d, true));
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
