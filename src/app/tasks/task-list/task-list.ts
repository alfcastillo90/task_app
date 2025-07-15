// src/app/tasks/task-list/task-list.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private taskService: TaskService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const current = this.auth.currentUserValue;
    if (!current) {
      // Si por alguna razón no hay usuario, redirigir a login
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    this.taskService.list(current.id).subscribe({
      next: tasks => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: err => {
        this.error = 'No pudimos cargar las tareas.';
        this.loading = false;
      }
    });
  }

  trackById(index: number, task: Task): string {
    return task.id;
  }

  onEdit(task: Task) {
    this.router.navigate(['/tasks', task.id, 'edit']);
  }

  onDelete(task: Task) {
    this.taskService.delete(task.id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    }, () => {
      this.error = 'Error al eliminar la tarea.';
    });
  }
}
