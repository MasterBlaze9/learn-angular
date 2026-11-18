import { Component, input } from '@angular/core';
import { Task } from './task/task';
import { TaskModel, NewTaskData } from './task/task.model';
import { IUser } from '../user/user.model';
import { NewTask } from './new-task/new-task';
import { TasksService } from './task/tasks.service';

@Component({
  imports: [Task, NewTask],
  selector: 'app-tasks',
  styleUrl: './tasks.css',
  templateUrl: './tasks.html',
})
export class Tasks {
  user = input.required<IUser>();
  isAddingTask: boolean = false;

  constructor(private taskService: TasksService) {}

  get selectedUserTasks() {
    return this.taskService.getUserTasks(this.user()?.id!);
  }


  onAddTaskClick() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }

}
