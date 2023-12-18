import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path:'',
        loadChildren : () => import('feature-dataviz-lib').then(m => m.FeatureDatavizLibModule)

    }
];
