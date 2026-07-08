import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdminService} from '../../../../../../core/admin.service';
import {HttpResourceRef} from '@angular/common/http';
import {PageableInterface} from '../../../../../../core/interfaces/pageable.interface';

@Component({
  selector: 'app-categories',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {

  constructor() {
    this.categories.reload();
  }

  private adminService = inject(AdminService);
  categories: HttpResourceRef<PageableInterface<any> | undefined> = this.adminService.categoryResource;
  form = new FormGroup({
    name: new FormControl('Test Category', [Validators.required]),
  })

  submitForm() {
    this.adminService.postCategory(this.form.value).subscribe(res => {
      this.categories.reload();
    });
  }
}
