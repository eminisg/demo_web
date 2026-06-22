import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/auth';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {

  private authService = inject(AuthService);

  form = new FormGroup({
    username: new FormControl('Qwerty', [Validators.required]),
    password: new FormControl('123456789', [Validators.required]),
  })

  submitProcess() {
    this.authService.postSignIn(this.form.value).subscribe(res => {
      console.log(res);
    })
  }
}
