import {Component, effect, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true
})
export class Header {
  private userService = inject(UserService);

  user = this.userService.userResource;

  constructor() {
    this.user.reload();
    effect(() => {
      if (!this.user.isLoading() && this.user.status() !== 'idle') {
        sessionStorage.setItem('user', JSON.stringify(this.user.value()));
      }
    });
  }
}
