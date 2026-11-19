import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task } from './task';
import { TasksService } from './tasks.service';
import { vi } from 'vitest';

describe('Task', () => {
  let component: Task;
  let fixture: ComponentFixture<Task>;
  let taskService: { removeTask: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    taskService = {
      removeTask: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Task],
      providers: [{ provide: TasksService, useValue: taskService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Task);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('task', {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary: 'Learn Angular',
      dueDate: '2025-12-31',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove the task when completed', () => {
    fixture.componentRef.setInput('task', {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary: 'Learn Angular',
      dueDate: '2025-12-31',
    });

    fixture.detectChanges();
    component.onCompleteTask();

    expect(taskService.removeTask).toHaveBeenCalledWith('t1');
  });
});
