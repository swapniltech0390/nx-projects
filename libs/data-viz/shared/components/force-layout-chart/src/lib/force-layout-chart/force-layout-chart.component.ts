/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { ChartGenerationService, InteractionService } from '@data-viz/services';
import { Options } from '@data-viz/types';

@Component({
  selector: 'data-viz-force-layout-chart',
  standalone: true,
  imports: [CommonModule],
   providers: [ChartGenerationService, InteractionService],
  templateUrl: './force-layout-chart.component.html',
  styleUrl: './force-layout-chart.component.scss',
})
export class ForceLayoutChartComponent implements OnInit {
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
    d3.json('assets/force-layout.json').then((data:any) => {
      this.options = {
        width: 800,
        height: 800,
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
        backgroundColor: '',
        responsive: true,
      };
      // tslint:disable-next-line:no-string-literal
      this.drawChart('force-layout', data, this.options);
    });
  }
  private drawChart(id: string, data: any, options: Options): void {
 const svg = d3.select(`#${id}`).append('svg').style('border', '1px solid');

 const selectorSvg = svg
      .attr(
        'viewBox',
        `${-options.width / 2}, ${-options.height / 2} ${options.width} ${
          options.height
        }`
      )
      .append('g');
 const links = data.links.map((d:any) => Object.create(d));
 const nodes = data.nodes.map((d:any) => Object.create(d));
 const types = ['model', 'view', 'resolved'];
 const color = d3.scaleOrdinal(types, d3.schemeCategory10);
 const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink(links).id((d: any) => d.id)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .force(
        'collide',
        d3.forceCollide(() => 65)
      );
    // Per-type markers, as they don't inherit styles.
 selectorSvg
      .append('defs')
      .selectAll('marker')
      .data(types)
      .join('marker')
      .attr('id', (d) => `arrow-${d}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 38)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('fill', color)
      .attr('d', 'M0,-5L10,0L0,5');


 const link = selectorSvg
   .append('g')
   .attr('fill', 'none')
   .attr('stroke-width', 1.5)
   .selectAll('path')
   .data(links)
   .join('path')
   .attr('stroke', (d: any) => color(d.type))
   .attr('marker-end', (d: any) => `url(#arrow-${d.type})`);

 const node = selectorSvg
      .append('g')
      .attr('fill', 'currentColor')
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(()=>this.drag(simulation));

 node
      .append('circle')
      .attr('stroke', 'white')
      .attr('stroke-width', 1.5)
      .attr('r', 25)
      .attr('fill', () => '#6baed6');

 node
   .append('text')
   .attr('x', 30 + 4)
   .attr('y', '0.31em')
   .text((d:any) => d.name)
   .clone(true)
   .lower()
   .attr('fill', 'none')
   .attr('stroke', 'white')
   .attr('stroke-width', 3);

 simulation.on('tick', () => {
      link.attr('d', this.linkArc);
      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

  }
  private linkArc = (d:any) =>
    `M${d.source.x},${d.source.y}A0,0 0 0,1 ${d.target.x},${d.target.y}`

  private drag = (simulation:any) => {
    // tslint:disable-next-line:typedef
    function dragstarted(event:any, d:any) {
      if (!event.active) {
        simulation.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    // tslint:disable-next-line:typedef
    function dragged(event:any, d:any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    // tslint:disable-next-line:typedef
    function dragended(event:any, d:any) {
      if (!event.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  }
}
