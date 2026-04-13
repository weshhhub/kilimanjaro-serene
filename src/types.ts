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

export type ExperienceCategory = 'All' | 'Wildlife Safaris' | 'Nature Walks' | 'Scenic Views' | 'Relaxation & Retreat';

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  category: ExperienceCategory;
  duration: string;
  price: number;
  includes?: string[];
}

export interface MenuItem {
  name: string;
  description?: string;
  price?: number;
}

export interface CuisineRegion {
  id: string;
  title: string;
  description: string;
  image: string;
  dishes: string[];
  menu: MenuItem[];
}

export interface DiningExperience {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'Location' | 'Meal' | 'Special' | 'Cuisine';
  price?: number;
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

export interface ExperienceBooking {
  id: string;
  experienceId: string;
  experienceTitle: string;
  experienceType: 'Activity' | 'Dining' | 'Experience';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time?: string;
  guests: number;
  totalAmount: number;
  status: PaymentStatus;
  specialRequests?: string;
  createdAt: string;
}

export type Page = 'home' | 'accommodation' | 'experiences' | 'activities' | 'dining' | 'booking' | 'experience-booking' | 'confirmation' | 'contact' | 'admin';
export type ActivityCategory = 'All' | 'Family' | 'Corporate' | 'Tourist';
