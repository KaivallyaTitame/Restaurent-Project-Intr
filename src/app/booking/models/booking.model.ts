export class Booking {
  customerName: string = '';
  date: string = '';
  time: string = '';
  guests: number = 1;

  constructor(init?: Partial<Booking>) {
    Object.assign(this, init);
  }

  isValid(): boolean {
    return !!(this.customerName && this.date && this.time && this.guests > 0);
  }

  reset(): void {
    this.customerName = '';
    this.date = '';
    this.time = '';
    this.guests = 1;
  }
}
