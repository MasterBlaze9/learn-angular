import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { User } from './user/user';
import { DUMMY_USERS } from './dummy-users';
import { Tasks } from './tasks/tasks';
import { IUser } from './user/user.model';


@Component({
  imports: [Header, User, Tasks],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  users = DUMMY_USERS;
  selectedUserData = signal<IUser>({
    id: '',
    avatar: '',
    name: '',
  });

  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserData().id);
  }

  onSelectUser(user: IUser) {
    this.selectedUserData.set(user);
  }
}
