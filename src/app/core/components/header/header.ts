import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {UserService} from '../../user.service';
import {environment} from '../../../../environments/environment';
import {finalize} from 'rxjs';
import {ImgLoc} from '../img-loc/img-loc';
import {StoreService} from '../../store.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    ImgLoc,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private userService = inject(UserService);

  user = this.userService.userResource;

  constructor() {
    this.user.reload();
  }

  uploadFileProcess(ev: any) {
    const file = ev.target.files[0];

    if(!file) return;

    const f = new FormData();

    f.append('file', file);


    this.userService.uploadFile(f).pipe(
      finalize(() => {
        this.user.reload();
      })
    ).subscribe();
  }
}
