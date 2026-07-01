import {Routes} from '@angular/router';
import {Auth} from './layout/auth/auth';
import {SignIn} from './layout/auth/pages/sign-in/sign-in';
import {SignUp} from './layout/auth/pages/sign-up/sign-up';
import {Home} from './layout/dashboard/pages/home/home';
import {Product} from './layout/dashboard/pages/product/product';
import {AdminDashboard} from './layout/dashboard/pages/admin-dashboard/admin-dashboard';
import {Profile} from './layout/dashboard/profile';
import {Categories} from './layout/dashboard/pages/admin-dashboard/sub-components/categories/categories';
import {SellerDashboard} from './layout/dashboard/pages/seller-dashboard/seller-dashboard';
import {ProductManager} from './layout/dashboard/pages/seller-dashboard/sub-components/product-manager/product-manager';
import {About} from './layout/dashboard/pages/about/about';

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
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: Home},
      {path: 'product', component: Product},
      {path: 'about', component: About},
      {
        path: 'admin-dashboard',
        component: AdminDashboard,
        children: [
          {path: '', redirectTo: 'categories', pathMatch: 'full'},
          {path: 'categories', component: Categories},
        ]
      },
      {
        path: 'seller-dashboard',
        component: SellerDashboard,
        children: [
          {path: '', redirectTo: 'product', pathMatch: 'full'},
          {path: 'product', component: ProductManager},
        ]
      },
    ]
  }
];
