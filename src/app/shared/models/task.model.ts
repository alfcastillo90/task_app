// src/app/tasks/task.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  ownerId: string;
  createdAt: string;  // ISO date
}
