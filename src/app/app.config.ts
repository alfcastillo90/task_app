// src/app/app.config.ts
import { importProvidersFrom }               from '@angular/core';
import { provideRouter }                     from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations }                 from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS }                 from '@angular/common/http';

import { routes }                            from './app.routes';
import { AuthInterceptor }                   from './auth/auth-interceptor';

export const appConfig = {
  providers: [
    // Router standalone
    provideRouter(routes),

    // HttpClient + permite inyectar interceptores
    provideHttpClient(withInterceptorsFromDi()),

    // Animaciones para Material
    provideAnimations(),

    // Nuestro interceptor para tokens/refresh
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ]
};
