// src/app/auth/auth-interceptor.ts
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('accessToken');
    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        // Si 401 y hay refreshToken, intenta renovar
        if (err.status === 401 && localStorage.getItem('refreshToken')) {
          return from(this.auth.refreshToken()).pipe(
            switchMap(() => {
              const newToken = localStorage.getItem('accessToken');
              const retryReq = newToken
                ? authReq.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } })
                : authReq;
              return next.handle(retryReq);
            }),
            catchError(() => {
              // Si falla refresh, fuerza logout
              this.auth.logout();
              return throwError(() => err);
            })
          );
        }
        return throwError(() => err);
      })
    );
  }
}
