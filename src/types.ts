export interface Package {
  id: string;
  title: string;
  description: string[];
  buttonText: string;
  icon?: string;
}

export interface AddOn {
  id: string;
  title: string;
  price?: string;
}

export interface Room {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  amenities: string[];
  capacity: string;
  position?: string;
  packages: Package[];
  addOns: AddOn[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'Family' | 'Corporate' | 'Tourist';
  duration: string;
  group: string;
  includes: string[];
  price: number;
  recommendedFor?: string[]; // Room IDs
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

export type PaymentStatus = 'Paid' | 'Pending' | 'Cancelled';

export interface Booking {
  id: string;
  roomId: string;
  roomTitle: string;
  customerName: string;
  customerEmail: string;
  arrivalDate: string;
  departureDate: string;
  guests: number;
  selectedAddOns: AddOn[];
  selectedActivities: Activity[];
  totalAmount: number;
  status: PaymentStatus;
  createdAt: string;
  isLive?: boolean; // If stay has started
}

export type Page = 'home' | 'accommodation' | 'experiences' | 'activities' | 'dining' | 'booking' | 'contact' | 'admin';
export type ActivityCategory = 'All' | 'Family' | 'Corporate' | 'Tourist';
