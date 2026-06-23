import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly httpClient = inject(HttpClient);

  postSignIn(body: any): Observable<any> {
    return this.httpClient.post(`http://localhost:8080/auth/sign-in`, body).pipe(
      tap((res: any) => {
        sessionStorage.setItem('token', res.token);
      }),
    )
  }

  postSignUp(body: any): Observable<any> {
    return this.httpClient.post(`http://localhost:8080/auth/sign-up`, body).pipe(
      tap((res: any) => {
        sessionStorage.setItem('token', res.token);
      }),
    )
  }

}
