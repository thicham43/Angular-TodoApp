import { Injectable } from '@angular/core';
import { Task } from './task';
import { TASKS } from './tasks-data';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { API_URL } from './api-conf';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  //------------  calls to python/flask api

  httpOptions = {
                  headers: new HttpHeaders({'Content-Type':  'application/json'})
                }

  getTasks(): Observable<Task[] | any> {
    return this.http.get(`${API_URL}/tasks`);
  }

  getTask(task_id: number): Observable<Task | any> {
    return this.http.get(`${API_URL}/tasks/${task_id}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${API_URL}/task/new`, task, this.httpOptions);
  }

  //------------  work with mock data

  /* getTasks(): Observable<Task[]> {
    const tasks = of(TASKS);
    return tasks;
  } */

  /* getTask(task_id: number): Observable<Task|undefined> {
    return of(TASKS.find(t => t.id === task_id));
  } */

}
