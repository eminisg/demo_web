import {inject, Injectable} from '@angular/core';
import {HttpClient, httpResource, HttpResourceRef} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PageableInterface} from './interfaces/pageable.interface';

const URLS = {
  post_category: `${environment.apiRoot}/category/create-category`,
  category_list: `${environment.apiRoot}/category/category-list`,
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private httpClient = inject(HttpClient);

  categoryResource:HttpResourceRef<PageableInterface<any> | undefined> = httpResource(()=> URLS.category_list);


  postCategory(body: any) {
    return this.httpClient.post(URLS.post_category, body);
  }

}
