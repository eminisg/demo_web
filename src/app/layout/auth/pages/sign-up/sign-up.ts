import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/auth.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {

  constructor() {
    sessionStorage.clear();
  }

  private authService = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    username: new FormControl('Qwerty', [Validators.required]),
    email: new FormControl('qwerty@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('123456789', [Validators.required]),
  })

  submitProcess() {
    this.authService.postSignUp(this.form.value).subscribe(res => {
      if(res.token) {
        this.router.navigate(['/dashboard']);
      }
    })
  }
}
