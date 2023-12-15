import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ExperienceTemplateComponent } from './components/experience-template/experience-template.component';
import { ProjectTemplateComponent } from './components/project-template/project-template.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    HomeComponent,
    ExperienceTemplateComponent,
    ProjectTemplateComponent,
  ],
  exports: [HomeComponent],
})
export class FeaturePortfolioLibModule {}
