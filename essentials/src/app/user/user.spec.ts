import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from './user';
import { IUser } from './user.model';

describe('User', () => {
  let component: User;
  let fixture: ComponentFixture<User>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [User],
    }).compileComponents();

    fixture = TestBed.createComponent(User);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', {
      id: 'u1',
      name: 'Jasmine Washington',
      avatar: 'user-1.jpg',
    });
    fixture.componentRef.setInput('seleted', false);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the user name and emit on selection', () => {
    const user: IUser = {
      id: 'u1',
      name: 'Jasmine Washington',
      avatar: 'user-1.jpg',
    };
    fixture.componentRef.setInput('user', user);
    fixture.componentRef.setInput('seleted', true);
    let emittedUser: IUser | undefined;
    component.selectedUser.subscribe((selectedUser) => (emittedUser = selectedUser));

    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector('button') as HTMLButtonElement;

    expect(element.textContent).toContain(user.name);
    expect(button.classList.contains('active')).toBe(true);

    button.click();
    expect(emittedUser).toEqual(user);
  });
});
