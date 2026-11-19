import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTask } from './new-task';
import { TasksService } from '../task/tasks.service';
import { vi } from 'vitest';

describe('NewTask', () => {
  let component: NewTask;
  let fixture: ComponentFixture<NewTask>;
  let taskService: { addTask: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    taskService = {
      addTask: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [NewTask],
      providers: [{ provide: TasksService, useValue: taskService }],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTask);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('userId', 'u1');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a task and close the dialog', () => {
    fixture.componentRef.setInput('userId', 'u1');
    component.taskTitle.set('Write tests');
    component.taskSummary.set('Cover the app components');
    component.taskDueDate.set('2026-12-31');
    let closeEmitted = false;
    component.close.subscribe(() => (closeEmitted = true));

    component.onSubmit();

    expect(taskService.addTask).toHaveBeenCalledWith(
      {
        title: 'Write tests',
        summary: 'Cover the app components',
        dueDate: '2026-12-31',
      },
      'u1',
    );
    expect(closeEmitted).toBe(true);
  });
});
