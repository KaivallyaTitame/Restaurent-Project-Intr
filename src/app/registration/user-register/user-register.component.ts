import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  registerForm: FormGroup;
  message = '';
  showPassword = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['CUSTOMER', Validators.required]
    });
  }

  
  get f() {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.invalid) {
      this.message = "❌ Please fill the form correctly!";
      return;
    }

    const user = this.registerForm.value;
    console.log("User registered:", user);

    // TODO: Call your backend service here
    // Example: this.userService.register(user).subscribe(...)
    
    this.message = "✅ Registration successful!";
    this.registerForm.reset({ role: 'CUSTOMER' });
  }
}
