import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../../../core/user.service';
import {HttpResourceRef} from '@angular/common/http';
import {PageableInterface} from '../../../../core/interfaces/pageable.interface';
import {UserInterface} from '../../../../core/interfaces/user.interface';
import {ImgLoc} from '../../../../core/components/img-loc/img-loc';
import {StoreService} from '../../../../core/store.service';

@Component({
  selector: 'app-home',
  imports: [
    ImgLoc
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private userService = inject(UserService);
  userListPageable: HttpResourceRef<PageableInterface<UserInterface> | undefined> = this.userService.userListResource;
  private readonly storeService = inject(StoreService);

  constructor() {
  }

  ngOnInit() {
    this.userListPageable.reload();
  }
}
