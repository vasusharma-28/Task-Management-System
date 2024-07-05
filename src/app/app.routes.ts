import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home/home.page';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
    canActivate: [MsalGuard],
  },
];
