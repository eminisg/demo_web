import {Component, inject} from '@angular/core';
import {UserService} from '../../../../core/user.service';
import {HttpResourceRef} from '@angular/common/http';
import {PageableInterface} from '../../../../core/interfaces/pageable.interface';
import {UserInterface} from '../../../../core/interfaces/user.interface';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  constructor() {
    this.userListPageable.reload();
  }

  private userService = inject(UserService);
  userListPageable: HttpResourceRef<PageableInterface<UserInterface> | undefined> = this.userService.userListResource;
  user: HttpResourceRef<UserInterface | undefined> = this.userService.userResource;

  uploadFileProcess(ev: any) {
    const file = ev.target.files[0];

    if(!file) return;

    const f = new FormData();

    f.append('file', file);


    this.userService.uploadFile(f).subscribe(res => {
      console.log(res);
    });
  }
}
