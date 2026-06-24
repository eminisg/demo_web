import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {environment} from '../../environments/environment';

const URLS = {
  signIn:`${environment.apiRoot}/auth/sign-in`,
  signUp:`${environment.apiRoot}/auth/sign-up`
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly httpClient = inject(HttpClient);

  postSignIn(body: any): Observable<any> {
    return this.httpClient.post(URLS.signIn, body).pipe(
      tap((res: any) => {
        sessionStorage.setItem('token', res.token);
      }),
    )
  }

  postSignUp(body: any): Observable<any> {
    return this.httpClient.post(URLS.signUp, body).pipe(
      tap((res: any) => {
        sessionStorage.setItem('token', res.token);
      }),
    )
  }

}
