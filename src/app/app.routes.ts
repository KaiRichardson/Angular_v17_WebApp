import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./pages/containers/button-page/button-page.component')
      .then(mod => mod.ButtonPageComponent)
  },
  {
    path: 'table', loadComponent: () => import('./pages/containers/table-page/table-page.component')
      .then(mod => mod.TablePageComponent)
  },
];
