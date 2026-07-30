import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, httpResource, HttpResourceRef} from '@angular/common/http';
import {PageableInterface} from './interfaces/pageable.interface';
import {UserInterface} from './interfaces/user.interface';
import {environment} from '../../environments/environment';

const URLS = {
  upload: `${environment.apiRoot}/file/upload-file`,
  uploads: `${environment.apiRoot}/file/upload-files`,
}

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private httpClient = inject(HttpClient);
}
