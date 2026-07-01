import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {Router} from '@angular/router';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        // router.navigate(['/auth']);
        return throwError(() => error);
      }

      const userMessage = Array.isArray(error.error.userMessage)
        ? error.error.userMessage.join('\n')
        : String(error.error.userMessage ?? '');

      return throwError(() => error);
    })
  );
};
