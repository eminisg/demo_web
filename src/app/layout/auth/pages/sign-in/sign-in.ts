import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/auth.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {

  constructor() {
    sessionStorage.clear();
  }

  private authService = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    username: new FormControl('Qwerty', [Validators.required]),
    password: new FormControl('123456789', [Validators.required]),
  })

  submitProcess() {
    this.authService.postSignIn(this.form.value).subscribe(res => {
      if(res.token) {
        this.router.navigate(['/dashboard']);
      }
    })
  }
}
