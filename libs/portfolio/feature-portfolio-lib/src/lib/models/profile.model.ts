import { Experience } from './experience.model';
import { Project } from './project.model';

export interface Profile {
  name: string;
  role: string;
  shortDescription: string;
  descriptionLine1: string;
  descriptionLine2: string;
  descriptionLine3: string;
  linkedInUrl: string;
  gitHubUrl: string;
  mailTo: string;
  contactNumber: string;
  bottomNote: string;
  experience: Experience[];
  projects: Project[];
}
