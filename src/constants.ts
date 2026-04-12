import { Room, Activity, Experience, DiningExperience } from './types';

export const ROOMS: Room[] = [
  {
    id: 'a-frame',
    title: 'Signature A-Frame Cabin',
    description: 'Our iconic A-frame cabins offer a unique architectural experience with floor-to-ceiling windows facing Mount Kilimanjaro.',
    image: 'https://picsum.photos/seed/aframe/1200/800',
    price: 'From $350',
    amenities: ['King Bed', 'Private Deck', 'En-suite Bathroom', 'Coffee Maker'],
    capacity: '2 Adults'
  },
  {
    id: 'lake-villa',
    title: 'Lakeside Premium Villa',
    description: 'Perched on the edge of our man-made lake, these villas offer serene water views and direct access to lakeside trails.',
    image: 'https://picsum.photos/seed/lakevilla/1200/800',
    price: 'From $450',
    amenities: ['King Bed', 'Living Area', 'Lake View Deck', 'Mini Bar'],
    capacity: '2 Adults, 1 Child'
  },
  {
    id: 'forest-suite',
    title: 'Deep Forest Suite',
    description: 'Immerse yourself in the 50-acre forest. These suites are designed for those seeking ultimate privacy and nature immersion.',
    image: 'https://picsum.photos/seed/forestsuite/1200/800',
    price: 'From $300',
    amenities: ['Queen Bed', 'Outdoor Shower', 'Forest View', 'WiFi'],
    capacity: '2 Adults'
  }
];

export const ACTIVITIES: Activity[] = [
  {
    id: 'nature-walk',
    title: 'Guided Forest Walks',
    description: 'Explore our 50-acre private forest with expert guides who will point out rare birds and local flora.',
    image: 'https://picsum.photos/seed/forestwalk/800/600',
    category: 'Family'
  },
  {
    id: 'cycling',
    title: 'Forest Cycling',
    description: 'Navigate the winding trails of our forest on high-quality mountain bikes.',
    image: 'https://picsum.photos/seed/cycling/800/600',
    category: 'Family'
  },
  {
    id: 'team-building',
    title: 'Corporate Strategy Retreats',
    description: 'Custom-designed team building activities in a serene environment to foster collaboration and innovation.',
    image: 'https://picsum.photos/seed/teambuilding/800/600',
    category: 'Corporate'
  },
  {
    id: 'workshop',
    title: 'Creative Workshops',
    description: 'Inspire your team with outdoor workshops and strategy sessions in the heart of nature.',
    image: 'https://picsum.photos/seed/workshop/800/600',
    category: 'Corporate'
  },
  {
    id: 'amboseli-safari',
    title: 'Amboseli Safari Trips',
    description: 'Just a short drive away, experience the majestic elephants of Amboseli with our private safari tours.',
    image: 'https://picsum.photos/seed/safari/800/600',
    category: 'Tourist'
  },
  {
    id: 'photography',
    title: 'Wildlife Photography',
    description: 'Capture the beauty of Kilimanjaro and local wildlife with guided photography tours.',
    image: 'https://picsum.photos/seed/photo/800/600',
    category: 'Tourist'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'wildlife-safaris',
    title: 'Wildlife Safaris',
    description: 'Embark on a journey to witness the majestic elephants and diverse wildlife of the Amboseli ecosystem.',
    image: 'https://picsum.photos/seed/safari-exp/1200/800'
  },
  {
    id: 'nature-walks',
    title: 'Nature Walks',
    description: 'Reconnect with the earth through guided walks in our 50-acre indigenous forest.',
    image: 'https://picsum.photos/seed/walk-exp/1200/800'
  },
  {
    id: 'kilimanjaro-views',
    title: 'Scenic Views (Kilimanjaro)',
    description: 'Experience the awe-inspiring presence of Africa\'s highest peak from our exclusive vantage points.',
    image: 'https://picsum.photos/seed/kili-exp/1200/800'
  },
  {
    id: 'relaxation',
    title: 'Relaxation / Retreat',
    description: 'Find your inner peace with lakeside meditation, spa treatments, and quiet forest retreats.',
    image: 'https://picsum.photos/seed/relax-exp/1200/800'
  }
];

export const DINING: DiningExperience[] = [
  // Locations
  {
    id: 'lakeside-dining',
    title: 'Lakeside Dining',
    description: 'Dine under the stars with the gentle sound of the lake as your backdrop.',
    image: 'https://picsum.photos/seed/lakedining/800/600',
    type: 'Location'
  },
  {
    id: 'forest-dining',
    title: 'Forest Dining',
    description: 'An intimate dining experience nestled deep within our indigenous forest.',
    image: 'https://picsum.photos/seed/forestdining/800/600',
    type: 'Location'
  },
  {
    id: 'firepit-dining',
    title: 'Firepit / Outdoor Dining',
    description: 'Traditional storytelling and meals around a crackling fire.',
    image: 'https://picsum.photos/seed/firepit/800/600',
    type: 'Location'
  },
  {
    id: 'main-restaurant',
    title: 'Main Restaurant',
    description: 'Elegant indoor dining with panoramic views of Mount Kilimanjaro.',
    image: 'https://picsum.photos/seed/restaurant/800/600',
    type: 'Location'
  },
  // Meals
  {
    id: 'local-cuisine',
    title: 'Local Cuisine',
    description: 'Authentic Kenyan flavors prepared with fresh, locally-sourced ingredients.',
    image: 'https://picsum.photos/seed/localfood/800/600',
    type: 'Meal'
  },
  {
    id: 'int-cuisine',
    title: 'International Cuisine',
    description: 'A world-class menu featuring global favorites with a creative twist.',
    image: 'https://picsum.photos/seed/intfood/800/600',
    type: 'Meal'
  },
  // Special
  {
    id: 'private-dining',
    title: 'Private Dining',
    description: 'A bespoke dining experience tailored to your specific desires.',
    image: 'https://picsum.photos/seed/private/800/600',
    type: 'Special'
  },
  {
    id: 'romantic-setup',
    title: 'Romantic Dinner Setup',
    description: 'The perfect setting for anniversaries, proposals, or just a special night.',
    image: 'https://picsum.photos/seed/romantic/800/600',
    type: 'Special'
  }
];
