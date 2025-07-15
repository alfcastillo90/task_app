// src/app/tasks/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Task } from '../shared/models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private api = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  // GET /tasks?ownerId=...
  list(ownerId: string): Observable<Task[]> {
    return this.http.get<Task[]>(this.api, { params: { ownerId } });
  }

  // GET /tasks/:id
  get(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.api}/${id}`);
  }

  // POST /tasks
  create(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.api, task);
  }

  // PUT /tasks/:id
  update(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.api}/${id}`, task);
  }

  // DELETE /tasks/:id
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
