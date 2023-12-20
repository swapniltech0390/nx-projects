import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { featureDatavizLibRoutes } from './lib.routes';
import { HomeComponent } from './components/home/home.component';
import { LineChartComponent } from '@data-viz/line-chart';
import { StackChartComponent } from '@data-viz/stack-chart';
import { AreaChartComponent } from '@data-viz/area-chart';
import { BarChartComponent } from '@data-viz/bar-chart';
import { DonutChartComponent } from '@data-viz/donut-chart';
import { ForceLayoutChartComponent } from '@data-viz/force-layout-chart';
import { GroupedBarChartComponent } from '@data-viz/grouped-bar-chart';
import { HorizontalBarChartComponent } from '@data-viz/horizontal-bar-chart';
import { PieChartComponent } from '@data-viz/pie-chart';
import { ScatterChartComponent } from '@data-viz/scatter-chart';
import { ScatterShapeChartComponent } from '@data-viz/scatter-shape-chart';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(featureDatavizLibRoutes),
    LineChartComponent,
    StackChartComponent,
    AreaChartComponent,
    BarChartComponent,
    DonutChartComponent,
    ForceLayoutChartComponent,
    GroupedBarChartComponent,
    HorizontalBarChartComponent,
    PieChartComponent,
    ScatterChartComponent,
    ScatterShapeChartComponent
  ],
  declarations: [HomeComponent]
})
export class FeatureDatavizLibModule {}
