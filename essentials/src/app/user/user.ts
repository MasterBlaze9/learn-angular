import { Component, computed, Input, input, output } from '@angular/core';
import { IUser } from './user.model';
import { Card } from '../shared/card/card';

@Component({
  imports: [Card],
  selector: 'app-user',
  styleUrl: './user.css',
  templateUrl: './user.html',
})
export class User {
  user = input.required<IUser>();
  selectedUser = output<IUser>();
  seleted = input<boolean>()

  imagePath = computed(() => {
    return 'assets/users/' + this.user().avatar;
  });

  onSelectUser() {
    this.selectedUser.emit(this.user());
  }
}
