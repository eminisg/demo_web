import {Routes} from '@angular/router';
import {Auth} from './layout/auth/auth';
import {SignIn} from './layout/auth/pages/sign-in/sign-in';
import {SignUp} from './layout/auth/pages/sign-up/sign-up';
import {Profile} from './layout/dashboard/profile';
import {Todo} from './layout/dashboard/pages/todo/todo';

export const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'prefix'},
  {
    path: 'auth',
    component: Auth,
    children: [
      {path: '', redirectTo: 'sign-up', pathMatch: 'full'},
      {path: 'sign-in', component: SignIn},
      {path: 'sign-up', component: SignUp},
    ]
  },
  {
    path: 'profile',
    component: Profile,
    children: [
      {path: '', redirectTo: 'todo', pathMatch: 'full'},
      {path: 'todo', component: Todo},
    ]
  }
];
