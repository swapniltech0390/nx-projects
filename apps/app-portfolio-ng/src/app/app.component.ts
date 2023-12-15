import { Component } from '@angular/core';
import { FeaturePortfolioLibModule } from '@portfolio/feature-portfolio-lib';

@Component({
  standalone: true,
  imports: [FeaturePortfolioLibModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app-portfolio-ng';
}
