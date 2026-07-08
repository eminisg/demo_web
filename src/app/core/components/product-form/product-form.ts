import {Component, inject, signal,} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CoreService} from '../../core.service';
import {HttpResourceRef} from '@angular/common/http';
import {AdminService} from '../../admin.service';
import {environment} from '../../../../environments/environment';
import {PageableInterface} from '../../interfaces/pageable.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SellerService} from '../../seller.service';

interface UploadedImage {
  id: number;
  filename: string;
}

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  readonly dialogRef = inject(MatDialogRef<ProductForm>);
  private adminService = inject(AdminService);
  private sellerService = inject(SellerService);
  private coreService = inject(CoreService);
  categories: HttpResourceRef<PageableInterface<any> | undefined> = this.adminService.categoryResource;
  images = signal<UploadedImage[]>([]);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  form: any = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the mo', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: new FormControl<number | null>(200, Validators.required),
    stockQuantity: new FormControl<number | null>(1000000, Validators.required),
    categoryId: new FormControl<number | null>(null, Validators.required),

    imageIds: new FormControl<number[]>([], {
      nonNullable: true,
    }),
  });
  protected readonly environment = environment;

  constructor() {
    if (this.data) {
      this.dataPatching(this.data);
    }
  }

  private dataPatching(data: any) {
    this.form.patchValue(data);
    this.images.set(data.images);
    const images = this.images().map(x => x.id) ?? []
    this.form.get('imageIds')?.setValue(images);
    this.form.get('categoryId')?.setValue(data.category.id);

    if (data.id) {
      this.form.setControl(
        'id',
        new FormControl(data.id ?? null, {
          nonNullable: true,
          validators: [],
        })
      );

    }
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
        const updatedImages = [...this.images(), ...res];

        this.images.set(updatedImages);

        this.form.patchValue({
          imageIds: updatedImages.map(image => image.id),
        });

      },
      error: err => {
        console.error(err);
      },
    });
  }

  close() {
    this.dialogRef.close();
  }

  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.value ?? null);
  }

  deleteProductFile(fileId: number, product: any) {
    if (!product?.id) {
      this.removeImageFromForm(fileId);
      return;
    }

    this.sellerService.deleteProductFile(product?.id, fileId).subscribe({
      next: () => this.removeImageFromForm(fileId),
      error: err => console.error(err),
    });
  }

  private removeImageFromForm(fileId: number) {
    const images = this.images().filter(image => image.id !== fileId);

    this.images.set(images);

    this.form.patchValue({
      imageIds: images.map(image => image.id),
    });
  }
}
