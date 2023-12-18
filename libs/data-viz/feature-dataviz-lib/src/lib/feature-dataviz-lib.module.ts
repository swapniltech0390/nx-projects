import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { featureDatavizLibRoutes } from './lib.routes';
import { HomeComponent } from './components/home/home.component';
import { LineChartComponent } from '@data-viz/line-chart';
import { StackChartComponent } from '@data-viz/stack-chart';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(featureDatavizLibRoutes),LineChartComponent,StackChartComponent],
  declarations: [HomeComponent],
})
export class FeatureDatavizLibModule {}
