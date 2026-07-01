import {inject, Injectable} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {environment} from '../../environments/environment';

const URLS = {
  post_category: `${environment.apiRoot}/seller/product/create-product`,
  category_list: `${environment.apiRoot}/seller/product/product-list`,
  current_user_category_list: `${environment.apiRoot}/seller/product/user-product-list`,
}

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private httpClient = inject(HttpClient);

  productResource = httpResource(()=> URLS.category_list);
  currentUserProductResource = httpResource(()=> URLS.current_user_category_list);


  postProduct(body: any) {
    return this.httpClient.post(URLS.post_category, body);
  }
}
