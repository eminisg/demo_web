import {inject, Injectable} from '@angular/core';
import {HttpClient, httpResource, HttpResourceRef} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PageableInterface} from './interfaces/pageable.interface';
import {ProductInterface} from './interfaces/product.interface';

const URLS = {
  post_product: `${environment.apiRoot}/seller/product/create-product`,
  init_product: `${environment.apiRoot}/seller/product/init-product`,
  product_list: `${environment.apiRoot}/seller/product/product-list`,
  product_by_id: `${environment.apiRoot}/seller/product/product-list`,
  delete_product: `${environment.apiRoot}/seller/product/delete-product`,
  put_product: `${environment.apiRoot}/seller/product/update-product`,
  delete_product_file: (productId: number, fileId: number) => `${environment.apiRoot}/seller/product/${productId}/${fileId}/delete-file`,
  current_user_category_list: `${environment.apiRoot}/seller/product/user-product-list`,
}

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private httpClient = inject(HttpClient);

  productResource: HttpResourceRef<PageableInterface<ProductInterface> | undefined> = httpResource(() => URLS.product_list);
  currentUserProductResource: HttpResourceRef<PageableInterface<ProductInterface> | undefined> = httpResource(() => URLS.current_user_category_list);

  getById(id: number) {
    return this.httpClient.get(`${URLS.product_by_id}/${id}`);
  }

  postProduct(body: any) {
    return this.httpClient.post(URLS.post_product, body);
  }

  putProduct(body: any, id: number) {
    return this.httpClient.put(`${URLS.put_product}/${id}`, body);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`${URLS.delete_product}/${id}`);
  }

  deleteProductFile(fileId: number, productId: number) {
    return this.httpClient.delete(URLS.delete_product_file(fileId, productId))
  }

  initProduct() {
    return this.httpClient.get(URLS.init_product);
  }
}
