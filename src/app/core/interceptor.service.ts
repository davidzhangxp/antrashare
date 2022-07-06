import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  token?: string | null;
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
    if (this.token) {
      const tokenizedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.token),
      });
      return next.handle(tokenizedReq);
    }
    return next.handle(req);
  }
}
