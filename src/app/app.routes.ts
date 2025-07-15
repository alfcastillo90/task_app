// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
  // Rutas de autenticación (públicas)
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/auth-module').then((m) => m.AuthModule),
  },

  // Rutas protegidas de tareas
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./tasks/tasks-module').then((m) => m.TasksModule),
  },

  // Redirección por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
