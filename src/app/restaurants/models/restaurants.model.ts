export class Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;

  constructor(init?: Partial<Restaurant>) {
    this.id = init?.id || 0;
    this.name = init?.name || '';
    this.cuisine = init?.cuisine || '';
    this.rating = init?.rating ?? 0;
  }

  isValid(): boolean {
    return (
      this.name.trim().length > 0 &&
      this.cuisine.trim().length > 0 &&
      this.rating >= 0 &&
      this.rating <= 5
    );
  }
}
