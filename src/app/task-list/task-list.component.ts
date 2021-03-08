import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  count_todo = 0;
  
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => { this.tasks = tasks; 
                                                     this.count_todo = tasks.filter((t: Task) => !t.is_done).length; });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe();
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }

}
