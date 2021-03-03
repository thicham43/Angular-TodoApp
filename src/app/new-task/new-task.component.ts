import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { TaskService } from "../task.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  taskForm = this.formBuilder.group({ id: '',
                                      title: '',
                                      details: '',
                                      date: ''
                                    });

  constructor(private formBuilder: FormBuilder,
              private taskService: TaskService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const task_record = this.taskForm.value;
    task_record.id = 99;
    this.taskService.addTask(task_record);
    this.taskForm.reset();
    this.router.navigate(['']);
  }

}
