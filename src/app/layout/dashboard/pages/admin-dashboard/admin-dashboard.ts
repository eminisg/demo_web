import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    RouterOutlet
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
  standalone: true
})
export class AdminDashboard {
  private user = sessionStorage.getItem('user') ?? '[]'

  checkAdminAccess() {
    return JSON.parse(this.user)?.roles.includes("ADMIN");
  }

}
