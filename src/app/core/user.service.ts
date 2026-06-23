import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, httpResource, HttpResourceRef} from '@angular/common/http';
import {PageableInterface} from './interfaces/pageable.interface';
import {UserInterface} from './interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);

   userListResource: HttpResourceRef<PageableInterface<UserInterface> | undefined> = httpResource(() => 'http://localhost:8080/user/user-list');
   userResource: HttpResourceRef<UserInterface | undefined> = httpResource(() => 'http://localhost:8080/user/current-user');

   uploadFile(formData: FormData) {
    return this.httpClient.post('http://localhost:8080/file/upload-file', formData);
   }

}
