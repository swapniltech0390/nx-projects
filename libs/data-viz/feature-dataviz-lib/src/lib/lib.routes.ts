import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LineChartComponent } from '@data-viz/line-chart';
import { StackChartComponent } from '@data-viz/stack-chart';
import { AreaChartComponent } from '@data-viz/area-chart';
import { BarChartComponent } from '@data-viz/bar-chart';
import { BubbleChartComponent } from '@data-viz/bubble-chart';
import { DonutChartComponent } from '@data-viz/donut-chart';
import { ForceLayoutChartComponent } from '@data-viz/force-layout-chart';
import { GroupedBarChartComponent } from '@data-viz/grouped-bar-chart';
import { HorizontalBarChartComponent } from '@data-viz/horizontal-bar-chart';
import { PieChartComponent } from '@data-viz/pie-chart';
import { ScatterChartComponent } from '@data-viz/scatter-chart';
import { ScatterShapeChartComponent } from '@data-viz/scatter-shape-chart';

export const featureDatavizLibRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'line', pathMatch: 'full', component: LineChartComponent },
  { path: 'stack', pathMatch: 'full', component: StackChartComponent },
  { path: 'area', pathMatch: 'full', component: AreaChartComponent },
  { path: 'bar', pathMatch: 'full', component: BarChartComponent },
  { path: 'bubble', pathMatch: 'full', component: BubbleChartComponent },
  { path: 'donut', pathMatch: 'full', component: DonutChartComponent },
  { path: 'force-layout', pathMatch: 'full', component: ForceLayoutChartComponent },
  { path: 'grouped-bar', pathMatch: 'full', component: GroupedBarChartComponent },
  { path: 'horizontal-bar', pathMatch: 'full', component: HorizontalBarChartComponent },
  { path: 'pie', pathMatch: 'full', component: PieChartComponent },
  { path: 'scatter', pathMatch: 'full', component: ScatterChartComponent },
  { path: 'scatter-shape', pathMatch: 'full', component: ScatterShapeChartComponent },
  {
    path: '**',
    redirectTo: ''
  }
];
