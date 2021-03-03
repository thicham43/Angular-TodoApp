import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { Input } from "@angular/core";
import { Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  
  @Input() task?: Task;
  @Input() sequence: number = 1;

  @Output() task_deleted = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  onTaskDone() {
    if(this.task) {
      this.task.is_done = true;
    }
    window.alert('Task tagged as done!');
  }

  onHoverTask() {
    
  }


}
