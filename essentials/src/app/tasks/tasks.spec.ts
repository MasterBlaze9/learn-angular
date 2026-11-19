import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tasks } from './tasks';
import { TasksService } from './task/tasks.service';
import { vi } from 'vitest';

describe('Tasks', () => {
  let component: Tasks;
  let fixture: ComponentFixture<Tasks>;
  let taskService: { getUserTasks: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    taskService = {
      getUserTasks: vi.fn().mockReturnValue([]),
    };

    await TestBed.configureTestingModule({
      imports: [Tasks],
      providers: [{ provide: TasksService, useValue: taskService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Tasks);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', {
      id: 'u1',
      name: 'Jasmine Washington',
      avatar: 'user-1.jpg',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close the add-task dialog', async () => {
    fixture.componentRef.setInput('user', { id: 'u1', name: 'Jasmine', avatar: 'user-1.jpg' });
    fixture.detectChanges();

    component.onAddTaskClick();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.isAddingTask).toBe(true);

    component.onCloseAddTask();
    fixture.detectChanges();
    expect(component.isAddingTask).toBe(false);
  });
});
