import { Injectable } from '@angular/core';
import { Task } from './task';
import { TASKS } from './tasks-data';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { API_URL } from './api-conf';
import { map } from 'rxjs/operators';


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
    return this.http.get(`${API_URL}/tasks/${task_id}`).pipe(map((tasks: any) => tasks[0]));
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${API_URL}/task/new`, task, this.httpOptions);
  }

  updateTask(task_id: number, values: object): Observable<Task> {
    return this.http.post<Task>(`${API_URL}/task/update/${task_id}`, values, this.httpOptions);
  }

  deleteTask(task_id: number): Observable<Task[] | any> {
    return this.http.post(`${API_URL}/task/delete`, {'task_id': task_id}, this.httpOptions);
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
