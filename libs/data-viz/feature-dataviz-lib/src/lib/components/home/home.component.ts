import { Component } from '@angular/core';

@Component({
  selector: 'feature-dataviz-lib-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  components = [
  { name: 'Line Chart', src: '/assets/line.jpg', route: '/line' },
  {
    name: 'Stack Chart',
    src: '/assets/stack.jpg',
    route: '/stack'
  }
];

}
