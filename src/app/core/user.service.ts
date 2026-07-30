import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, httpResource, HttpResourceRef} from '@angular/common/http';
import {PageableInterface} from './interfaces/pageable.interface';
import {UserInterface} from './interfaces/user.interface';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
const URLS = {
  put_user: `${environment.apiRoot}/user/update-user`,
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
   userResource: HttpResourceRef<UserInterface | undefined> = httpResource(() => 'http://localhost:8080/user/current');
}
