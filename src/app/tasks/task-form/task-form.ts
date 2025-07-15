// src/app/tasks/task-form/task-form.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.scss']
})
export class TaskForm implements OnInit {
  form!: FormGroup;
  isEdit = false;
  taskId?: string;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Inicializa el formulario
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false]
    });

    // Comprueba si venimos a editar
    this.taskId = this.route.snapshot.params['id'];
    this.isEdit = !!this.taskId;

    if (this.isEdit) {
      // Carga la tarea existente
      this.taskService.get(this.taskId!).subscribe({
        next: (task: Task) => {
          this.form.patchValue({
            title: task.title,
            description: task.description,
            completed: task.completed
          });
        },
        error: () => (this.error = 'No pudimos cargar la tarea.')
      });
    }
  }

  onSubmit() {
    this.error = null;
    if (this.form.invalid) {
      this.error = 'Completa todos los campos.';
      return;
    }

    const payload = this.form.value as Partial<Task>;
    const ownerId = this.auth.currentUserValue!.id;

    const obs = this.isEdit
      ? this.taskService.update(this.taskId!, { ...payload })
      : this.taskService.create({ ...payload, ownerId });

    obs.subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: () => (this.error = 'Error al guardar la tarea.')
    });
  }
}
