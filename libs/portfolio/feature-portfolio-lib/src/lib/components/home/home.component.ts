import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Experience } from '../../models/experience.model';
import { Project } from '../../models/project.model';

@Component({
  selector: 'feature-portfolio-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit{
   @ViewChild('aboutView')
  aboutViewElement!: ElementRef;
  @ViewChild('experienceView')
  experienceViewElement!: ElementRef;
  @ViewChild('projectsView')
  projectsViewElement!: ElementRef;

  public currentActive = 1;
  public aboutViewOffset = 0;
  public experienceViewOffset = 0;
  public projectsViewOffset = 0;

   ngAfterViewInit() {
    this.aboutViewOffset = this.aboutViewElement.nativeElement.offsetTop;
    this.experienceViewOffset = this.experienceViewElement.nativeElement.offsetTop;
    this.projectsViewOffset = this.projectsViewElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  checkOffsetTop() {
    if (window.pageYOffset >= this.aboutViewOffset && window.pageYOffset < this.experienceViewOffset) {
      this.currentActive = 1;
    } else if (window.pageYOffset >= this.experienceViewOffset && window.pageYOffset < this.projectsViewOffset) {
      this.currentActive = 2;
    } else if (window.pageYOffset >= this.projectsViewOffset) {
      this.currentActive = 3;
    } else {
      this.currentActive = 1;
    }
  }
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
        'AGILE'
      ]
    }
  ];

  projects: Project[] = [
    {
      name: 'Build a Spotify Connected',
      url: 'https://www.spotify.com',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      technologyUsed: ['Angular 14', 'MongoDB', 'GraphQL', 'NX Monorepo'],
      imageUrl: 'assets/images/sample.jpg'
    },
    {
      name: 'Build a Shopping Cart',
      url: 'https://www.google.com/',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      technologyUsed: [],
      imageUrl: 'assets/images/sample.jpg'
    }
  ];
}
