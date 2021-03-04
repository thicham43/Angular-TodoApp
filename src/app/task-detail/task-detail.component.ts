import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  @Input() task?: Task;
  edit_mode: boolean = false;

  taskForm = this.formBuilder.group({ id: '',
                                      title: '',
                                      details: '',
                                      date: ''
                                    });

  constructor(private taskService:TaskService,
              private route: ActivatedRoute,
              private location: Location,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getTask();
    if(this.task){
      this.taskForm.setValue({id: this.task?.id,
                              title: this.task?.title,
                              details: this.task?.details,
                              date: ''
                            })
    }
  }

  getTask(): void {
    const task_id = Number(this.route.snapshot.paramMap.get('task_id'));
    this.taskService.getTask(task_id).subscribe(task => this.task = task);
  }

  
  onSubmit(): void {
    const task_values = this.taskForm.value;
    this.task = task_values;
    console.log('task details: ', task_values);
    this.edit_mode = false;
  }

  switchToEditMode(): void {
    this.edit_mode = true;
  }

  goBack(): void {
    this.location.back();
  }

}
