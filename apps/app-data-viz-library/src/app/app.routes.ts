import { Route } from '@angular/router';
import { ContactUsComponent } from '@portfolio/contact-us';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('feature-dataviz-lib').then((m) => m.FeatureDatavizLibModule)
  },
  {
    path: 'contact-us',
    pathMatch: 'full',
    component: ContactUsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
