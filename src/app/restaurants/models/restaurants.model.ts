export class Restaurant {
  id: number;
  name: string;
  location: string;
  cuisine: string;
  rating: number;
  isOpen: boolean;

  constructor(init?: Partial<Restaurant>) {
    this.id = init?.id || 0;
    this.name = init?.name || '';
    this.location = init?.location || '';
    this.cuisine = init?.cuisine || '';
    this.rating = init?.rating ?? 0; 
    this.isOpen = init?.isOpen ?? true; 
  }

  isValid(): boolean {
    return (
      this.name.trim().length > 0 &&
      this.location.trim().length > 0 &&
      this.cuisine.trim().length > 0 &&
      this.rating >= 0 &&
      this.rating <= 5
    );
  }
}
