import { Component } from '@angular/core';

@Component({
  selector: 'feature-dataviz-lib-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  components = [
    { name: 'Line Chart', src: '/assets/line.jpg', route: '/line' },
    {
      name: 'Stack Chart',
      src: '/assets/stack.jpg',
      route: '/stack'
    },
    { name: 'Area Chart', src: '/assets/area.jpg', route: '/area' },
    { name: 'Bar Chart', src: '/assets/bar.jpg', route: '/bar' },
    {
      name: 'Grouped Bar Chart',
      src: '/assets/group-bar.jpg',
      route: '/grouped-bar'
    },
    {
      name: 'Bubble Chart',
      src: '/assets/bubble.jpg',
      route: '/bubble'
    },
    {
      name: 'Horizontal Bar Chart',
      src: '/assets/horizontal-bar.jpg',
      route: '/horizontal-bar'
    },
    {
      name: 'Scatter Chart',
      src: '/assets/scatter.jpg',
      route: '/scatter'
    },
    {
      name: 'Scatter with Multiple Shapes Chart',
      src: '/assets/scatter-shape.jpg',
      route: '/scatter-shape'
    },
    {
      name: 'Donut Chart',
      src: '/assets/donut.jpg',
      route: '/donut'
    },
    {
      name: 'Force Layout Chart',
      src: '/assets/force-layout.jpg',
      route: '/force-layout'
    },
    { name: 'Pie Chart', src: '/assets/pie.jpg', route: '/pie' }
  ];
}
