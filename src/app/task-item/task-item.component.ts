import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { Input } from "@angular/core";
import { Output, EventEmitter } from "@angular/core";
import { TaskService } from '../task.service'

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  
  @Input() task?: Task;
  @Input() sequence: number = 1;
  @Output() task_deleted = new EventEmitter();
  
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
  }

  onTaskDone() {
    if(this.task) {
      this.task.is_done = true;
      this.taskService.updateTask(this.task.id, {'is_done': true}).subscribe();
    }
  }

  onHoverTask() {
    
  }


}
