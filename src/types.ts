export interface Room {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  amenities: string[];
  capacity: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'Family' | 'Corporate' | 'Tourist';
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface DiningExperience {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'Location' | 'Meal' | 'Special';
}

export type Page = 'home' | 'accommodation' | 'experiences' | 'activities' | 'dining' | 'booking' | 'contact';
