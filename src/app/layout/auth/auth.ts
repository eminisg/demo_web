import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [
    RouterOutlet
  ],
  template: `
  <section class="container-sm">
    <router-outlet></router-outlet>
  </section>
  `,
  styleUrl: './auth.scss',
})
export class Auth {

}
