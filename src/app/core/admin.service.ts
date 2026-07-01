import {inject, Injectable} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {environment} from '../../environments/environment';

const URLS = {
  post_category: `${environment.apiRoot}/admin/category/create-category`,
  category_list: `${environment.apiRoot}/admin/category/category-list`,
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private httpClient = inject(HttpClient);

  categoryResource = httpResource(()=> URLS.category_list);


  postCategory(body: any) {
    return this.httpClient.post(URLS.post_category, body);
  }

}
