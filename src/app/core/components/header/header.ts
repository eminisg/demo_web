import {Component, effect, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {UserService} from '../../user.service';
import {of, switchMap} from 'rxjs';
import {ImgLoc} from '../img-loc/img-loc';
import {CoreService} from '../../core.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    ImgLoc,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true
})
export class Header {
  private userService = inject(UserService);
  private coreService = inject(CoreService);

  user = this.userService.userResource;

  constructor() {
    this.user.reload();
    effect(() => {
      if (!this.user.isLoading() && this.user.status() !== 'idle') {
        sessionStorage.setItem('user', JSON.stringify(this.user.value()));
      }
    });
  }

  uploadFileProcess(ev: any) {
    const file = ev.target.files[0];

    if (!file) return;

    const f = new FormData();

    f.append('file', file);


    this.coreService.uploadFile(f).pipe(
      switchMap((imageInst: any): any => {
        return this.updateUserProcess(imageInst);
      })
    ).subscribe({
      next: (res) => {
        if(res) {
          this.user.reload();
        }
      }
    });
  }

  updateUserProcess(img: any) {
    const user = JSON.parse(sessionStorage.getItem('user') ?? "{}");

    if (!user) return;

    user.profileImg = img;

    return this.userService.updateUser(user) ?? of(user);
  }

  checkSellerAccess() {
    return this.user.value()?.roles.includes("SELLER");
  }

  checkAdminAccess() {
    return this.user.value()?.roles.includes("ADMIN");
  }
}
