import { Component, input, output } from '@angular/core';
import { TaskModel } from './task.model';
import { Card } from '../../shared/card/card';
import { DatePipe } from '@angular/common';
import { TasksService } from './tasks.service';

@Component({
  imports: [Card,DatePipe],
  selector: 'app-task',
  styleUrl: './task.css',
  templateUrl: './task.html',
})
export class Task {
  task = input.required<TaskModel>();

  constructor(private taskService: TasksService){}

  onCompleteTask() {
   this.taskService.removeTask(this.task().id)
  }
}
