import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
  }

  editUser(id: string) {
    this.router.navigate(['/edit-user', id]);
  }

  deleteUser(id: string) {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      this.userService.deleteUser(id).subscribe(() => {
        alert('User deleted successfully!');
        this.loadUsers();
      });
    }
  }
  
}
