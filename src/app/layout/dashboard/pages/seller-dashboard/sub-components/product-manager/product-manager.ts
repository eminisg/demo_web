import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpResourceRef } from '@angular/common/http';

import { AdminService } from '../../../../../../core/admin.service';
import { SellerService } from '../../../../../../core/seller.service';
import { CoreService } from '../../../../../../core/core.service';
import { environment } from '../../../../../../../environments/environment';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';
import {ImgLoc} from '../../../../../../core/components/img-loc/img-loc';

interface UploadedImage {
  id: number;
  filename: string;
}

@Component({
  selector: 'app-product-manager',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    ImgLoc,
  ],
  templateUrl: './product-manager.html',
  styleUrl: './product-manager.scss',
})
export class ProductManager implements OnInit {

  private sellerService = inject(SellerService);
  private adminService = inject(AdminService);
  private coreService = inject(CoreService);

  protected readonly environment = environment;

  imageIds = signal<UploadedImage[]>([]);

  currentUserProducts: HttpResourceRef<any> = this.sellerService.currentUserProductResource;
  categories: HttpResourceRef<any> = this.adminService.categoryResource;

  form = new FormGroup({
    name: new FormControl('My Product Title', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the mo', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: new FormControl<number | null>(200, Validators.required),
    stockQuantity: new FormControl<number | null>(1000000, Validators.required),
    category: new FormControl<number | null>(null, Validators.required),

    imageIds: new FormControl<number[]>([], {
      nonNullable: true,
    }),
  });

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    margin:30,
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

  submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sellerService.postProduct(this.form.getRawValue()).subscribe({
      next: () => {
        this.currentUserProducts.reload();
      },
      error: err => {
        console.error(err);
      },
    });
  }

  uploadFiles(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(input.files).forEach(file => {
      formData.append('files', file);
    });

    this.coreService.uploadFiles(formData).subscribe({
      next: (res: any) => {
        this.imageIds.set(res);

        this.form.patchValue({
          imageIds: res.map((x: any) => x.id),
        });
      },
      error: err => {
        console.error(err);
      },
    });
  }


}
