import { HttpInterceptorFn, HttpInterceptor, HttpRequest,
  HttpHandlerFn,
  HttpHandler,
  HttpErrorResponse,
  HttpStatusCode} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { EMPTY, catchError, throwError } from 'rxjs';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {

//   return next(req);
// };

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  
  const authReq = req.clone({
    setHeaders: { Authorization: 'myAuthToken' }
    });
    const authService = inject(AuthService);
    
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
      authService.logout();
      return EMPTY;
      } else {
      return throwError(() => error);
      }
      })
  );
}