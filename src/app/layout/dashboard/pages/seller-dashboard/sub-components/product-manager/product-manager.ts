import {Component, inject, OnInit, signal} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {HttpResourceRef} from '@angular/common/http';

import {SellerService} from '../../../../../../core/seller.service';
import {environment} from '../../../../../../../environments/environment';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';
import {ImgLoc} from '../../../../../../core/components/img-loc/img-loc';
import {EMPTY, finalize, Observable, switchMap, take} from 'rxjs';
import {PageableInterface} from '../../../../../../core/interfaces/pageable.interface';
import {ProductInterface} from '../../../../../../core/interfaces/product.interface';
import {NgOptimizedImage} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ProductForm} from '../../../../../../core/components/product-form/product-form';

@Component({
  selector: 'app-product-manager',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    ImgLoc,
    NgOptimizedImage,
  ],
  templateUrl: './product-manager.html',
  styleUrl: './product-manager.scss',
})
export class ProductManager implements OnInit {
  readonly dialog = inject(MatDialog);
  private sellerService = inject(SellerService);
  protected readonly environment = environment;

  currentUserProducts: HttpResourceRef<PageableInterface<ProductInterface> | undefined> = this.sellerService.currentUserProductResource;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    margin: 30,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this.currentUserProducts.reload();
  }

  submitForm(body: any): Observable<any> {
    return !body.id ? this.sellerService.postProduct(body) : this.sellerService.putProduct(body, body.id)
  }

  openDialogue(data?: any) {
    const dialogRef = this.dialog.open(ProductForm, {
      minWidth: '80vw',
      data,
    });

    return dialogRef.afterClosed();
  }

  updateProduct(product?:any) {
    if (product?.id && product.status !== "DRAFT") {
      this.sellerService.getById(product.id).pipe(
        switchMap((product: any) => {
          return this.openDialogue(product);
        }),
        switchMap((updateBody: any) => {
          return this.submitForm(updateBody);
        }),
        finalize(() => {
          this.currentUserProducts.reload();
        })
      ).subscribe();
    } else {
      this.openDialogue().pipe(
        switchMap((createBody: any) => {
          return this.submitForm(createBody);
        }),
        finalize(() => {
          this.currentUserProducts.reload();
        })
      ).subscribe();
    }

  }

  deleteProduct(id: number) {
    this.sellerService.deleteProduct(id).subscribe({
      next: (res: any) => {
        this.currentUserProducts.reload();
      }
    });
  }
}
