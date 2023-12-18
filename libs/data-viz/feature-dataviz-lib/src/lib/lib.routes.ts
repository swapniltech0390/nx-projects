import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LineChartComponent } from '@data-viz/line-chart';
import { StackChartComponent } from '@data-viz/stack-chart';

export const featureDatavizLibRoutes: Route[] = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'line', pathMatch: 'full', component: LineChartComponent},
  {path: 'stack', pathMatch: 'full', component: StackChartComponent},
    {
        path: "**",
        component: HomeComponent

    }
];
