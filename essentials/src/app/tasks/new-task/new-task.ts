import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../task/tasks.service';

@Component({
  imports: [FormsModule],
  selector: 'app-new-task',
  styleUrl: './new-task.css',
  templateUrl: './new-task.html',
})
export class NewTask {
  userId = input.required<string>();
  close = output<void>();

  taskTitle = signal<string>('');
  taskSummary = signal<string>('');
  taskDueDate = signal<string>('');
  private taskService = inject(TasksService);

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    this.taskService.addTask(
      {
        title: this.taskTitle(),
        summary: this.taskSummary(),
        dueDate: this.taskDueDate(),
      },
      this.userId(),
    );
    this.close.emit()
  }
}
