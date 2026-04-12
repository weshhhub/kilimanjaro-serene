import { Room, Activity, Experience, DiningExperience } from './types';

export const ROOMS: Room[] = [
  {
    id: 'a-frame',
    title: 'Signature A-Frame Cabin',
    description: 'Our iconic A-frame cabins offer a unique architectural experience with floor-to-ceiling windows facing Mount Kilimanjaro.',
    image: 'https://picsum.photos/seed/aframe/1200/800',
    price: 'From $350',
    amenities: ['King Bed', 'Private Deck', 'En-suite Bathroom', 'Coffee Maker'],
    capacity: '2 Adults',
    position: 'Iconic + Scenic + Romantic',
    packages: [
      {
        id: 'sunrise-package',
        title: 'Kilimanjaro Sunrise Package',
        description: [
          'Guided sunrise viewing experience',
          'Early morning coffee/tea service on deck',
          'Professional photo session (optional upsell)'
        ],
        buttonText: 'Experience Sunrise Escape'
      },
      {
        id: 'romantic-package',
        title: 'Romantic Getaway Package',
        description: [
          'Candle-lit dinner (lakeside or private deck)',
          'Complimentary wine',
          'Room decoration'
        ],
        buttonText: 'Book Romantic Escape'
      },
      {
        id: 'creator-package',
        title: 'Content Creator Package',
        description: [
          'Curated scenic spots access',
          'Best photo timing guide',
          'Optional drone photography add-on'
        ],
        buttonText: 'Capture Your Stay'
      }
    ],
    addOns: [
      { id: 'safari', title: 'Add Safari Experience' },
      { id: 'dining', title: 'Add Private Dining' },
      { id: 'romantic', title: 'Add Romantic Setup' },
      { id: 'walk', title: 'Add Guided Nature Walk' }
    ]
  },
  {
    id: 'lake-villa',
    title: 'Lakeside Premium Villa',
    description: 'Perched on the edge of our man-made lake, these villas offer serene water views and direct access to lakeside trails.',
    image: 'https://picsum.photos/seed/lakevilla/1200/800',
    price: 'From $450',
    amenities: ['King Bed', 'Living Area', 'Lake View Deck', 'Mini Bar'],
    capacity: '2 Adults, 1 Child',
    position: 'Relaxation + Luxury + Experience',
    packages: [
      {
        id: 'lakeside-dining-pkg',
        title: 'Lakeside Dining Experience',
        description: [
          'Private dinner by the lake',
          'Sunset setup',
          'Dedicated service'
        ],
        buttonText: 'Reserve Lakeside Dining'
      },
      {
        id: 'wellness-package',
        title: 'Wellness & Relaxation Package',
        description: [
          'Morning yoga by the lake',
          'Massage session (if available or partner)',
          'Herbal tea experience'
        ],
        buttonText: 'Relax & Rejuvenate'
      },
      {
        id: 'leisure-package',
        title: 'Leisure Experience Package',
        description: [
          'Guided lakeside walks',
          'Optional canoe/boat experience',
          'Picnic setup'
        ],
        buttonText: 'Enjoy Lakeside Living'
      }
    ],
    addOns: [
      { id: 'safari', title: 'Add Safari Experience' },
      { id: 'dining', title: 'Add Private Dining' },
      { id: 'romantic', title: 'Add Romantic Setup' },
      { id: 'walk', title: 'Add Guided Nature Walk' }
    ]
  },
  {
    id: 'forest-suite',
    title: 'Deep Forest Suite',
    description: 'Immerse yourself in the 50-acre forest. These suites are designed for those seeking ultimate privacy and nature immersion.',
    image: 'https://picsum.photos/seed/forestsuite/1200/800',
    price: 'From $300',
    amenities: ['Queen Bed', 'Outdoor Shower', 'Forest View', 'WiFi'],
    capacity: '2 Adults',
    position: 'Privacy + Nature + Escape',
    packages: [
      {
        id: 'immersion-package',
        title: 'Forest Immersion Package',
        description: [
          'Guided nature walk',
          'Bird watching',
          'Forest storytelling session'
        ],
        buttonText: 'Immerse in Nature'
      },
      {
        id: 'firepit-package',
        title: 'Firepit Experience',
        description: [
          'Evening fire setup',
          'Storytelling / relaxation',
          'Light snacks'
        ],
        buttonText: 'Evening Fire Experience'
      },
      {
        id: 'detox-package',
        title: 'Digital Detox Retreat',
        description: [
          'No-device relaxation concept',
          'Curated quiet activities',
          'Reading + nature time'
        ],
        buttonText: 'Disconnect & Recharge'
      }
    ],
    addOns: [
      { id: 'safari', title: 'Add Safari Experience' },
      { id: 'dining', title: 'Add Private Dining' },
      { id: 'romantic', title: 'Add Romantic Setup' },
      { id: 'walk', title: 'Add Guided Nature Walk' }
    ]
  }
];

export const ACTIVITIES: Activity[] = [
  {
    id: 'nature-walk',
    title: 'Guided Forest Walks',
    description: 'Explore our 50-acre private forest with expert guides who will point out rare birds and local flora.',
    image: 'https://picsum.photos/seed/forestwalk/800/600',
    category: 'Family',
    duration: '1–2 hrs',
    group: 'Family-friendly',
    includes: ['Expert guide', 'Bird spotting', 'Water'],
    price: 30,
    recommendedFor: ['a-frame', 'forest-suite']
  },
  {
    id: 'cycling',
    title: 'Forest Cycling',
    description: 'Navigate the winding trails of our forest on high-quality mountain bikes.',
    image: 'https://picsum.photos/seed/cycling/800/600',
    category: 'Family',
    duration: '1–3 hrs',
    group: 'All ages',
    includes: ['Mountain bike', 'Helmet', 'Guide'],
    price: 45,
    recommendedFor: ['forest-suite']
  },
  {
    id: 'strategy-retreat',
    title: 'Strategy Retreats',
    description: 'Custom-designed team building activities in a serene environment to foster collaboration and innovation.',
    image: 'https://picsum.photos/seed/teambuilding/800/600',
    category: 'Corporate',
    duration: 'Full-day',
    group: 'Corporate teams',
    includes: ['Team building', 'Workshops', 'Planning sessions'],
    price: 150,
    recommendedFor: ['lake-villa']
  },
  {
    id: 'creative-workshop',
    title: 'Creative Workshops',
    description: 'Inspire your team with outdoor workshops and strategy sessions in the heart of nature.',
    image: 'https://picsum.photos/seed/workshop/800/600',
    category: 'Corporate',
    duration: 'Half-day',
    group: 'Creative teams',
    includes: ['Outdoor sessions', 'Leadership training', 'Materials'],
    price: 100,
    recommendedFor: ['lake-villa']
  },
  {
    id: 'amboseli-safari',
    title: 'Amboseli Safari Trips',
    description: 'Just a short drive away, experience the majestic elephants of Amboseli with our private safari tours.',
    image: 'https://picsum.photos/seed/safari/800/600',
    category: 'Tourist',
    duration: 'Full-day / Half-day',
    group: 'All explorers',
    includes: ['Private tour', 'Park fees', 'Lunch box'],
    price: 250,
    recommendedFor: ['a-frame', 'lake-villa']
  },
  {
    id: 'photography',
    title: 'Wildlife Photography',
    description: 'Capture the beauty of Kilimanjaro and local wildlife with guided photography tours.',
    image: 'https://picsum.photos/seed/photo/800/600',
    category: 'Tourist',
    duration: '3–5 hrs',
    group: 'Photography enthusiasts',
    includes: ['Guided tour', 'Best scenic spots', 'Technical tips'],
    price: 80,
    recommendedFor: ['a-frame']
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
