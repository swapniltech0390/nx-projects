/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import * as d3 from 'd3';
import { ChartGenerationService,InteractionService } from '@data-viz/services';
import { LegendData, Options, ScaleProperties } from '@data-viz/types';


@Component({
  selector: 'data-viz-line-chart',
  standalone: true,
  imports: [CommonModule],
  providers:[ChartGenerationService,InteractionService],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit, OnDestroy {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    d3.json('assets/line.json').then((data: any) => {
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
      this.drawChart('line', chartData, legendDataArray, this.options);
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
    if (this.legendChangeSub) {
      this.legendChangeSub.unsubscribe();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareLegendData(colors: any[]): LegendData[] {
    // tslint:disable-next-line:no-string-literal
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    legendData: LegendData[],
    options: Options
  ): void {
    d3.select('#' + id).html('');
    const selectorSvg = this.chartGenerationService.buildSvg(id, options);
   const width = options.width - options.margin.left - options.margin.right;
const height = options.height - options.margin.top - options.margin.bottom;

    // tslint:disable-next-line:no-string-literal
    const products = Array.from(
      // tslint:disable-next-line:no-string-literal
      d3.group(data, (d:any) => d['name']),
      ([key, value]) => ({ key, value })
    );
    const xAxisOptions: ScaleProperties = {
      // tslint:disable-next-line:no-string-literal
      domain: products[0].value.map((d:any) => d['year']),
      range: [0, width],
      padding: 0
    };
    const yAxisOptions: ScaleProperties = {
      // tslint:disable-next-line:no-string-literal
      domain: [0, d3.max(data, (d:any) => +d['sales'])],
      range: [height, 0]
    };

    const xAxis = this.chartGenerationService.computePointScale(xAxisOptions);
    const yAxis = this.chartGenerationService.computeLinearScale(yAxisOptions);

    selectorSvg.attr(
      'transform',
      'translate(' + options?.margin?.left + ',' + options?.margin?.top + ')'
    );
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

    // Added chart container
    const chartContainer = selectorSvg
      .append('g')
      .classed('chart-container', true);
    // Add the line
    const line = d3
      .line()
      .curve(d3.curveCardinal)
      // tslint:disable-next-line:no-string-literal
      .x((d:any) => xAxis(d['year']))
      // tslint:disable-next-line:no-string-literal
      .y((d:any) => yAxis(d['sales']));
    const colorOptions: ScaleProperties = {
      // tslint:disable-next-line:no-string-literal
      domain: legendData.map((d) => d.name),
      range: legendData.map((d) => d.color)
    };
    const colorScale =
      this.chartGenerationService.computeOrdinalScale(colorOptions);
    const container = chartContainer
      .selectAll('line')
      .data(products)
      .enter()
      .append('g')
      .attr('id', (d: any, i: string) => 'item' + i)
      .classed('line', true);

    container
      .append('path')
      .datum((d: { value: any; }) => d.value)
      .attr('fill', 'none')
      .attr('stroke', (d: { name: any; }[]) => colorScale(d[0].name))
      .attr('stroke-width', 1.5)
      .attr('d', line)
      .transition()
      .duration(2000)
      .attrTween('stroke-dasharray', function (this:any) {
        const l = this.getTotalLength();
        const i = d3.interpolateString('0,' + l, l + ',' + l);
        return (t: number) => i(t);
      });

    container
      .selectAll('circle')
      .data((d: { value: any; }) => d.value)
      .enter()
      .append('circle')
      .classed('circle', true)
      .attr('cx', (d: { year: any; }) => xAxis(d.year))
      .attr('cy', (d: { sales: any; }) => yAxis(d.sales))
      .transition()
      .delay((_d: any, i: any) => 350 * i)
      .attr('r', 3)
      .style('stroke', (d: { name: any; }) => colorScale(d.name));
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
    this.legendChangeSub = this.interactionService.legendData.subscribe(
      (res: LegendData[]) => {
        if (this.data && this.data.length > 0) {
          const chartData: never[] = [];
          res.forEach((d) => {
            if (d.status) {
              // tslint:disable-next-line:no-string-literal
              chartData.push(...this.data.filter((e) => e['name'] === d.name));
            }
          });
          // tslint:disable-next-line:no-string-literal
          this.drawChart('line', chartData, res, this.options);
          this.interactionService.hideLegend.next(false);
        }
      }
    );
  }
}
