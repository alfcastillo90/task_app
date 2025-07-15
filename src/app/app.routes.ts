// src/app/app.routes.ts
import { Routes } from '@angular/router';

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

  // Aquí luego añadirás las rutas protegidas (Tasks, Users, etc.)
  // {
  //   path: 'tasks',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./tasks/tasks-module').then((m) => m.TasksModule),
  // },

  // Redirección por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
