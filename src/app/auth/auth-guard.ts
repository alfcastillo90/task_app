// src/app/auth/auth-guard.ts
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  } else {
    // Redirige a /login, incluyendo la URL de regreso
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }
};
