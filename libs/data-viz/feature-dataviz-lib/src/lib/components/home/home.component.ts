import { Component } from '@angular/core';

@Component({
  selector: 'feature-dataviz-lib-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  components = [
    { name: 'Line Chart', src: '/assets/line.jpg', route: '/home/line' },
    {
      name: 'Stack Chart',
      src: '/assets/stack.jpg',
      route: '/home/stack'
    },
    { name: 'Area Chart', src: '/assets/area.jpg', route: '/home/area' },
    { name: 'Bar Chart', src: '/assets/bar.jpg', route: '/home/bar' },
    {
      name: 'Grouped Bar Chart',
      src: '/assets/group-bar.jpg',
      route: '/home/grouped-bar'
    },
    {
      name: 'Bubble Chart',
      src: '/assets/bubble.jpg',
      route: '/home/bubble'
    },
    {
      name: 'Horizontal Bar Chart',
      src: '/assets/horizontal-bar.jpg',
      route: '/home/horizontal-bar'
    },
    {
      name: 'Scatter Chart',
      src: '/assets/scatter.jpg',
      route: '/home/scatter'
    },
    {
      name: 'Scatter with Multiple Shapes Chart',
      src: '/assets/scatter-shape.jpg',
      route: '/home/scatter-shape'
    },
    {
      name: 'Donut Chart',
      src: '/assets/donut.jpg',
      route: '/home/donut'
    },
    {
      name: 'Force Layout Chart',
      src: '/assets/force-layout.jpg',
      route: '/home/force-layout'
    },
    { name: 'Pie Chart', src: '/assets/pie.jpg', route: '/home/pie' }
  ];
}
