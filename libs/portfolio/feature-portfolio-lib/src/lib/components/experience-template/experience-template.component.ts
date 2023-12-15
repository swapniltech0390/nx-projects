import { Component, Input } from '@angular/core';
import { Experience } from '../../models/experienceData.model';

@Component({
  selector: 'feature-portfolio-experience-template',
  templateUrl: './experience-template.component.html',
  styleUrl: './experience-template.component.scss',
})
export class ExperienceTemplateComponent {
    @Input()
  experienceDetails!: Experience; 
}
