import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [
    RouterOutlet
  ],
  template: `
  <section class="container-sm">
    <h1>Some New Branch</h1>
    <router-outlet></router-outlet>
  </section>
  `,
  styleUrl: './auth.scss',
})
export class Auth {

}
