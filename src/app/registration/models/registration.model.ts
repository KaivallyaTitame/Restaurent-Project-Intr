export class Registration {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: string;

  constructor(init?: Partial<Registration>) {
    this.id = init?.id;
    this.name = init?.name || '';
    this.email = init?.email || '';
    this.password = init?.password || '';
    this.role = init?.role || 'user';
  }

  isValid(): boolean {
    return (
      this.name.trim().length >= 3 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) &&
      this.password.length >= 6
    );
  }
}
