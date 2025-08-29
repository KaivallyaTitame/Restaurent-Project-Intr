export class Booking {
  id?: number; 
  customerName: string;
  restaurantId: number = 1;
  date: string;
  time: string;
  guests: number;

  constructor(init?: Partial<Booking>) {
    this.id = init?.id;
    this.customerName = init?.customerName || '';
    this.date = init?.date || '';
    this.time = init?.time || '';
    this.guests = init?.guests ?? 1;
  }

  isValid(): boolean {
    return (
      this.customerName.trim().length > 0 &&
      this.date.trim().length > 0 &&
      this.time.trim().length > 0 &&
      this.guests > 0
    );
  }

  reset(): void {
    this.customerName = '';
     this.restaurantId = 1;
    this.date = '';
    this.time = '';
    this.guests = 1;
  }
}
