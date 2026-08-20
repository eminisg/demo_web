import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [
    RouterOutlet
  ],
  template: `
  <section class="container-sm">
    <h1>Test 999 ss</h1>
    <router-outlet></router-outlet>
  </section>
  `,
  styleUrl: './auth.scss',
})
export class Auth {

}
