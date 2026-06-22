import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/auth';

@Component({
  selector: 'app-sign-up',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {

  private authService = inject(AuthService);

  form = new FormGroup({
    username: new FormControl('Qwerty', [Validators.required]),
    password: new FormControl('123456789', [Validators.required]),
  })

  submitProcess() {
    this.authService.postSignUp(this.form.value).subscribe(res => {
      console.log(res);
    })
  }
}
