export class Registration {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string; 

  constructor(init?: Partial<Registration>) {
    this.name = init?.name || '';
    this.email = init?.email || '';
    this.password = init?.password || '';
    this.confirmPassword = init?.confirmPassword || '';
    this.role = init?.role || 'user'; 
  }

  isValid(): boolean {
    return (
      this.name.trim().length >= 3 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) &&
      this.password.length >= 6 &&
      this.password === this.confirmPassword
    );
  }
}
