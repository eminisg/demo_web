import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-seller-dashboard',
  imports: [
    RouterOutlet
  ],
  templateUrl: './seller-dashboard.html',
  styleUrl: './seller-dashboard.scss',
})
export class SellerDashboard {
  private user = sessionStorage.getItem('user') ?? '[]'

  checkSellerAccess() {
    return JSON.parse(this.user)?.roles.includes("SELLER");
  }

}
