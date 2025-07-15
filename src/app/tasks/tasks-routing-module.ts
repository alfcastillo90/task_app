// src/app/tasks/tasks-routing-module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { TaskList } from './task-list/task-list';
import { TaskForm } from './task-form/task-form';

// Función guard standalone
import { authGuard } from '../auth/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: TaskList,
    canActivate: [authGuard]        // ← aquí usas la función
  },
  {
    path: 'new',
    component: TaskForm,
    canActivate: [authGuard]
  },
  {
    path: ':id/edit',
    component: TaskForm,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
