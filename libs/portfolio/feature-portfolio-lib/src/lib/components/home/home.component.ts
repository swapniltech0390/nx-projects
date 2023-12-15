import { Component } from '@angular/core';
import { Experience } from '../../models/experienceData.model';

@Component({
  selector: 'feature-portfolio-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
   experienceData: Experience[] = [
     {
      start: 'OCT 2022',
      end: 'Present',
      role: 'Senior Software Developer',
      companyName: 'EY',
      url: 'https://www.ey.com/en_in',
      description:
        'Deliver high-quality, robust production code for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within engineering department through close collaboration, knowledge shares, and mentorship.',
      technologyUsed: [
        'Angular 14',
        'MongoDB',
        'GraphQL',
        'NX Monorepo',
        'Jenkins'
      ]
    },
    {
      start: 'JAN 2021',
      end: 'OCT 2022',
      role: 'Senior Web Developer',
      companyName: 'CAPITA',
      url: 'https://www.capita.com/',
      description:
        'Deliver high-quality, robust production code for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within engineering department through close collaboration, knowledge shares, and mentorship.',
      technologyUsed: [
        'Angular 8',
        'Node',
        'Express',
        'RXJS',
        'AZURE',
        'Unit Testing'
      ]
    },
    {
      start: 'DEC 2012',
      end: 'JAN 2021',
      role: 'Senior UI Developer',
      companyName: 'TCS',
      url: 'https://www.tcs.com/',
      description:
        'Deliver high-quality, robust production code for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within engineering department through close collaboration, knowledge shares, and mentorship.',
      technologyUsed: [
        'Angular 4',
        'D3.js',
        'Bootstrap',
        'SASS',
        'GIT',
        'AGILE',
      ]
    }
  ];
}
