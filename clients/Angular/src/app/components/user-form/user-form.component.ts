import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  user: any = {
    name: '',
    email: '',
    age: '',
    adress: '',
    password: ''
  };
  userId: string | null = null;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((data) => {
        this.user = data;
        console.log(this.user);
      });
    }
  }

  onSubmit() {
    if (this.userId) {
      this.userService.updateUser(this.userId, this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.createUser(this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
