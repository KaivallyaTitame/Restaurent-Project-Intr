import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Registration } from '../models/registration.model';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  users: Registration[] = [];
  registerForm!: FormGroup;

  showForm = false;
  showUsers = false;
  message = '';
  messageType: 'success' | 'error' | '' = '';
  loading = false;

  availableRoles: string[] = ['user', 'admin', 'manager'];

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user']
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.message = '';
  }

  toggleUsersList(): void {
    this.showUsers = !this.showUsers;
  }

  loadUsers(): void {
    this.loading = true;
    this.registerService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: () => {
        this.message = 'Failed to load users';
        this.messageType = 'error';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const newUser = new Registration(this.registerForm.value);

    if (!newUser.isValid()) {
      this.message = 'Invalid form data';
      this.messageType = 'error';
      return;
    }

    this.loading = true;
    this.registerService.createUser(newUser).subscribe({
      next: (user) => {
        this.users.push(user); 
        this.message = 'User registered successfully!';
        this.messageType = 'success';
        this.registerForm.reset({ role: 'user' });
        this.showForm = false;
        this.loading = false;
      },
      error: () => {
        this.message = 'Error registering user';
        this.messageType = 'error';
        this.loading = false;
      }
    });
  }

  deleteUser(user: Registration): void {
    if (!user.id) {
      this.message = 'User ID missing, cannot delete';
      this.messageType = 'error';
      return;
    }

    if (confirm(`Delete user ${user.email}?`)) {
      this.registerService.deleteUser(user.id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
          this.message = 'User deleted';
          this.messageType = 'success';
        },
        error: () => {
          this.message = 'Failed to delete user';
          this.messageType = 'error';
        }
      });
    }
  }
}
