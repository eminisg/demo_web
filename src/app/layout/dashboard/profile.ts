import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from '../../core/components/header/header';
import {Footer} from '../../core/components/footer/footer';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    Header,
    Footer,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

}
