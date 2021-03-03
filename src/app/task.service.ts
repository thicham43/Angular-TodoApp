import { Injectable } from '@angular/core';
import { Task } from './task';
import { TASKS } from './tasks-data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(): Observable<Task[]> {
    const tasks = of(TASKS);
    return tasks;
  }

  getTask(task_id: number): Observable<Task|undefined> {
    return of(TASKS.find(t => t.id === task_id));
  }

  addTask(task: Task): void {
    TASKS.push(task);
  }

}
