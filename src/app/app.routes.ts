import { Routes } from '@angular/router';
import {Auth} from './layout/auth/auth';
import {SignIn} from './layout/auth/pages/sign-in/sign-in';
import {SignUp} from './layout/auth/pages/sign-up/sign-up';

export const routes: Routes = [
  {
    path: '',
    component: Auth,
    children: [
      {path: '', redirectTo: 'sign-up', pathMatch: 'full'},
      {path:'sign-in',component:SignIn},
      {path:'sign-up',component:SignUp},
    ]
  }
];
