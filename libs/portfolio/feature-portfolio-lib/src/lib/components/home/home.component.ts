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
  @ViewChild('pointer')
  pointer!: ElementRef;

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

  @HostListener('mousemove', ['$event'])
  onMouseEnter($event: MouseEvent) {
    const bodyHeight = document.body.offsetHeight;
    this.pointer.nativeElement.style.background = `radial-gradient(600px at ${$event.pageX}px ${$event.pageY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
    this.pointer.nativeElement.style.height = `${bodyHeight}px`;
  }

  @HostListener('window:scroll', ['$event'])
  checkOffsetTop() {
    const offset = window.pageYOffset + 200; // Added constant to handle the dif of padding
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
    name: 'Pranjil Jain',
    role: 'Software Engineer',
    shortDescription: 'Java Fullstack Developer',
    descriptionLine1:
      'My journey as a software developer began, fueled by a passion for crafting digital experiences. Starting with the fundamentals, I gradually honed my skills, evolving through the ever-changing landscape of web development. Over the years, my trajectory led me to embrace <b>Java</b>, where I delved into the intricacies of <b>software development</b>.',
    descriptionLine2:
      'As technology advanced, so did my journey. The transition to a powerful and scalable apps on <b>MIcrosoft Azure</b> architecture became a pivotal moment. Embracing this paradigm shift allowed me to efficiently manage projects, enhance collaboration, and maintain <b>code quality</b>.',
    descriptionLine3:
      'Outside the coding realm, I find solace and inspiration in the <b>art of travel, bike riding and swimming</b>. Exploring new cultures, tasting diverse cuisines, and immersing myself in unfamiliar landscapes enriches my perspective and fuels creativity in unexpected ways.',
    linkedInUrl: 'https://www.linkedin.com/in/pranjiljain26/',
    gitHubUrl: 'https://github.com/Pranjiljain26',
    mailTo: 'pranjiljain26@gmail.com',
    contactNumber: '+918889889770',
    bottomNote:
      'Designed using <b>Bootstrap</b>, coded in <b>VSCode</b>,deployed on <b>Vercel</b> and managed within an <b>NX monorepo</b>. Leveraging these tools, I created an efficient and scalable application, streamlining development and ensuring code consistency.',
    experience: [
      {
        start: 'DEC 2020',
        end: 'Present',
        role: 'Bacehlor Of technology',
        companyName: 'IIIT Chennai',
        url: 'https://www.iiitdm.ac.in/',
        description:
          'Delivering high-quality, robust production code, I foster close collaboration through knowledge sharing and mentorship. Passionate about elevating team capabilities, I thrive in creating innovative solutions while nurturing a culture of continuous learning and shared expertise within the organization.',
        technologyUsed: ['Java', 'Python', 'DSA', 'Microsoft Azure']
      },
      {
        start: 'MAY 2017',
        end: 'JULY 2019',
        role: 'Senior Secondary School',
        companyName: 'New Bundelkhand',
        url: 'https://mpbse.nic.in/',
        description:
          ' Under Top 5 of the school, Prepared for JEE and got in top 3% from 1.2 million aspirants.',
        technologyUsed: ['Mathematics', 'Phyics', 'Chemistry']
      },
      {
        start: 'APRIL 2007',
        end: 'MAY 2017',
        role: 'Higher Secondary School',
        companyName: 'Kendriya Vidhalaya Damoh',
        url: 'https://damoh.kvs.ac.in/',
        description:
          'Had a outstanding academic record throughout the years, Participated in National level Science Olypiad along with it district level Volleyball Player from school.',
        technologyUsed: ['Volleyball']
      }
    ],
    projects: [
      {
        name: 'NPM Package for NX CODEOWNERS',
        url: 'https://www.npmjs.com/package/@swapniltech0390/nx-codeowners',
        description:
          'Developed an open-source npm package aimed at streamlining the generation of CODEOWNERS files for Nx monorepo projects. Contributed to the developer community by providing a valuable tool for code ownership management. Received positive feedback and engagement from the open-source community for the npm package.',
        technologyUsed: ['NX Monorepo', 'GITHUB'],
        imageUrl: 'assets/images/node.jpg'
      },
      {
        name: 'Build a Data Visualization Library',
        url: 'https://app-data-viz-library.vercel.app/',
        description:
          'Led impactful data visualization projects using D3.js, transforming complex data into compelling visual narratives. Applied creativity and technical expertise to convey insights effectively, enhancing the user experience and contributing to data-driven decision-making.',
        technologyUsed: ['Angular', 'D3.js', 'Bootstrap'],
        imageUrl: 'assets/images/data-viz-lib.jpg'
      },
      {
        name: 'MEAN login logout',
        url: 'https://github.com/swapniltech0390/mean-login-logout',
        description:
          'Engineered a secure login/logout cart system using MEAN stack. Implemented robust authentication mechanisms, ensuring user data integrity. Leveraged MongoDB for seamless data storage, while Angular and Node.js facilitated dynamic user interactions, creating a fluid and secure e-commerce experience.',
        technologyUsed: ['Angular', 'Node', 'Express', 'MongoDB'],
        imageUrl: 'assets/images/mean.jpg'
      }
    ]
  };
}
