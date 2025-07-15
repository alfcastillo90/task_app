// src/app/tasks/tasks-module.ts
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TaskList } from './task-list/task-list';
import { TaskForm } from './task-form/task-form';
import { TasksRoutingModule } from './tasks-routing-module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    TasksRoutingModule,
    TaskList,
    TaskForm
  ]
})
export class TasksModule {}
