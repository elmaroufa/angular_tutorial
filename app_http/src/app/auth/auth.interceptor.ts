import { HttpInterceptorFn, HttpInterceptor, HttpRequest,
  HttpHandlerFn} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { inject } from '@angular/core';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {

//   return next(req);
// };

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  
  const authReq = req.clone({
    setHeaders: { Authorization: 'myAuthToken' }
    });
    
  return next(authReq);
}