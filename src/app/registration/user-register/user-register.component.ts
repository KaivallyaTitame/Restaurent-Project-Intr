import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegistration } from '../user-registration.model';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  users: UserRegistration[] = [];
  registerForm!: FormGroup;
  loading = false;
  showForm = false;
  showUsers = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  availableRoles = ['customer', 'admin', 'manager'];

  constructor(private fb: FormBuilder, private registerService: RegisterService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['customer', Validators.required]
    });
  }

  loadUsers(): void {
    this.loading = true;
    this.registerService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.registerForm.reset({ role: 'customer' });
    }
    this.clearMessage();
  }

  toggleUsersList(): void {
    this.showUsers = !this.showUsers;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    const newUser: UserRegistration = this.registerForm.value;

    this.registerService.registerUser(newUser).subscribe({
      next: (user) => {
        this.users.push(user);
        this.registerForm.reset({ role: 'customer' });
        this.showForm = false;
        this.loading = false;
        this.showMessage('User registered successfully!', 'success');
      },
      error: (error) => {
        console.error('Error registering user:', error);
        this.showMessage(error.message || 'Error registering user', 'error');
        this.loading = false;
      }
    });
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => this.clearMessage(), 5000);
  }

  private clearMessage(): void {
    this.message = '';
  }

  get f() {
    return this.registerForm.controls;
  }
}
