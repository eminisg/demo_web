import { Routes } from '@angular/router';
import {Auth} from './layout/auth/auth';
import {SignIn} from './layout/auth/pages/sign-in/sign-in';
import {SignUp} from './layout/auth/pages/sign-up/sign-up';
import {Dashboard} from './layout/dashboard/dashboard';
import {Home} from './layout/dashboard/pages/home/home';

export const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'prefix'},
  {
    path: 'auth',
    component: Auth,
    children: [
      {path: '', redirectTo: 'sign-up', pathMatch: 'full'},
      {path:'sign-in',component:SignIn},
      {path:'sign-up',component:SignUp},
    ]
  },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path:'home',component:Home},
    ]
  }
];
