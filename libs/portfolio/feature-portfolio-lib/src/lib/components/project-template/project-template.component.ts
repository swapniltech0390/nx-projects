import { Component, Input } from '@angular/core';
import { Project } from '../../models/project.model';

@Component({
  selector: 'feature-portfolio-project-template',
  templateUrl: './project-template.component.html',
  styleUrl: './project-template.component.scss',
})
export class ProjectTemplateComponent {
    @Input()
  projectDetails!: Project; 
}
