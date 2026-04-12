import { Room, Activity, Experience } from './types';

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
    id: 'team-building',
    title: 'Corporate Strategy Retreats',
    description: 'Custom-designed team building activities in a serene environment to foster collaboration and innovation.',
    image: 'https://picsum.photos/seed/teambuilding/800/600',
    category: 'Corporate'
  },
  {
    id: 'amboseli-safari',
    title: 'Amboseli Safari Trips',
    description: 'Just a short drive away, experience the majestic elephants of Amboseli with our private safari tours.',
    image: 'https://picsum.photos/seed/safari/800/600',
    category: 'Tourist'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'kilimanjaro-view',
    title: 'Kilimanjaro Sunrise',
    description: 'Wake up to the most breathtaking view of Africa\'s highest peak as the sun paints it in gold.',
    image: 'https://picsum.photos/seed/kili/1200/800'
  },
  {
    id: 'wildlife-encounter',
    title: 'Wildlife Within',
    description: 'Our property is a sanctuary for local wildlife. Spot zebras and antelopes right from your deck.',
    image: 'https://picsum.photos/seed/wildlife/1200/800'
  },
  {
    id: 'lakeside-serenity',
    title: 'Lakeside Relaxation',
    description: 'Unwind by our man-made lake, a perfect spot for meditation or a quiet afternoon with a book.',
    image: 'https://picsum.photos/seed/lake/1200/800'
  }
];
