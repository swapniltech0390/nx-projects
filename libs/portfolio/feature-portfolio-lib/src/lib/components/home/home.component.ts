import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'feature-portfolio-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
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
    this.experienceViewOffset =
      this.experienceViewElement.nativeElement.offsetTop;
    this.projectsViewOffset = this.projectsViewElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  checkOffsetTop() {
    const offset = window.pageYOffset + 200; // Added constant to handle the diff of padding
    if (
      offset >= this.aboutViewOffset &&
      window.pageYOffset < this.experienceViewOffset
    ) {
      this.currentActive = 1;
    } else if (
      offset >= this.experienceViewOffset &&
      offset < this.projectsViewOffset
    ) {
      this.currentActive = 2;
    } else if (offset >= this.projectsViewOffset) {
      this.currentActive = 3;
    } else {
      this.currentActive = 1;
    }
  }

  profile: Profile = {
    name: 'Swapnil Jain',
    role: 'Experienced Front-End Engineer',
    shortDescription:
      'I build exceptional and accessible digital experiences for the web.',
    descriptionLine1:
      'Back in 2012, I decided to try my hand at creating custom Tumblr themes and tumbled head first into  the rabbit hole  of  coding and web development. Fast-forward to today, and I’ve had the privilege of building  software  for an  advertising  agency, a start-up, a student-led design studio, and <b>a huge corporation.</b> ',
    descriptionLine2:
      "My main focus these days is building products and leading projects for our clients at <b>Upstatement</b>. In my free time  I've  also released an <b>online video course</b> that covers everything you need to know to build a web app with  the Spotify API.",
    descriptionLine3:
      'When I’m not at the computer, I’m usually rock climbing, hanging out with my wife and two cats,or  running around  Hyrule  searching for <b>Korok seeds</b>.',
    linkedInUrl: 'https://www.linkedin.com/in/swapnil-jain-j90/',
    gitHubUrl: 'https://github.com/swapniltech0390',
    mailTo: 'jainswapnil90@hotmail.com',
    bottomNote:
      ' Loosely designed in Figma and coded in Visual Studio Code by yours truly. Built with <b>Next.js</b> and Tailwind CSS, deployed with <b>Vercel</b>. All text is set in the Inter typeface.',
    experience: [
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
    ],
    projects: [
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
    ]
  };
}
