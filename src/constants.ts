import { Room, Activity, Experience, DiningExperience, CuisineRegion } from './types';

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
  // Wildlife Safaris
  {
    id: 'amboseli-private-safari',
    title: 'Private Amboseli Safari',
    description: 'A bespoke full-day journey into the heart of Amboseli, focusing on the legendary "Big Tuskers" and diverse birdlife.',
    image: 'https://picsum.photos/seed/safari1/1200/800',
    category: 'Wildlife Safaris',
    duration: '8 hrs',
    price: 350,
    includes: ['Private 4x4 vehicle', 'Expert guide', 'Gourmet lunch box', 'Park fees']
  },
  {
    id: 'sunset-game-drive',
    title: 'Sunset Game Drive',
    description: 'Experience the magic of the African savannah as the sun sets behind Kilimanjaro, casting long shadows over the plains.',
    image: 'https://picsum.photos/seed/safari2/1200/800',
    category: 'Wildlife Safaris',
    duration: '3 hrs',
    price: 120,
    includes: ['Open-sided vehicle', 'Sundowners', 'Expert tracker']
  },
  {
    id: 'night-safari',
    title: 'Nocturnal Discovery',
    description: 'Explore the hidden world of nocturnal creatures on a guided night drive through our private conservancy.',
    image: 'https://picsum.photos/seed/safari3/1200/800',
    category: 'Wildlife Safaris',
    duration: '2 hrs',
    price: 90,
    includes: ['Spotlight tracking', 'Night vision equipment', 'Guide']
  },

  // Nature Walks
  {
    id: 'forest-immersion-walk',
    title: 'Forest Immersion Walk',
    description: 'A slow-paced, sensory journey through our 50-acre indigenous forest, focusing on mindfulness and local flora.',
    image: 'https://picsum.photos/seed/walk1/1200/800',
    category: 'Nature Walks',
    duration: '2 hrs',
    price: 45,
    includes: ['Naturalist guide', 'Botanical insights', 'Refreshments']
  },
  {
    id: 'bird-watching-expedition',
    title: 'Bird Watching Expedition',
    description: 'Identify over 100 species of birds with our resident ornithologist in the diverse habitats surrounding the retreat.',
    image: 'https://picsum.photos/seed/walk2/1200/800',
    category: 'Nature Walks',
    duration: '3 hrs',
    price: 60,
    includes: ['Binoculars', 'Checklist', 'Expert ornithologist']
  },
  {
    id: 'medicinal-plant-tour',
    title: 'Traditional Medicine Tour',
    description: 'Learn about the ancient healing properties of local plants used by the Maasai and Kamba communities for generations.',
    image: 'https://picsum.photos/seed/walk3/1200/800',
    category: 'Nature Walks',
    duration: '1.5 hrs',
    price: 40,
    includes: ['Cultural guide', 'Plant identification', 'Herbal tea tasting']
  },

  // Scenic Views
  {
    id: 'kilimanjaro-sunrise-view',
    title: 'Kilimanjaro Sunrise Experience',
    description: 'Witness the first light of day hitting the snow-capped peak from our most exclusive vantage point.',
    image: 'https://picsum.photos/seed/view1/1200/800',
    category: 'Scenic Views',
    duration: '1 hr',
    price: 30,
    includes: ['Morning coffee/tea', 'Private deck access', 'Photography assistance']
  },
  {
    id: 'starlit-observatory',
    title: 'Starlit Sky Observatory',
    description: 'Enjoy crystal-clear views of the Milky Way and southern constellations from our high-altitude viewing platform.',
    image: 'https://picsum.photos/seed/view2/1200/800',
    category: 'Scenic Views',
    duration: '1.5 hrs',
    price: 50,
    includes: ['Telescope access', 'Star map', 'Warm blankets & cocoa']
  },
  {
    id: 'helicopter-scenic-flight',
    title: 'Aerial Kilimanjaro Tour',
    description: 'A breathtaking helicopter flight around the base of the mountain for unparalleled views of the glaciers and craters.',
    image: 'https://picsum.photos/seed/view3/1200/800',
    category: 'Scenic Views',
    duration: '45 mins',
    price: 850,
    includes: ['Private helicopter', 'Pilot commentary', 'Champagne landing']
  },

  // Relaxation & Retreat
  {
    id: 'lakeside-meditation',
    title: 'Lakeside Meditation',
    description: 'Find your center with a guided meditation session on the tranquil shores of our private lake.',
    image: 'https://picsum.photos/seed/relax1/1200/800',
    category: 'Relaxation & Retreat',
    duration: '1 hr',
    price: 35,
    includes: ['Yoga mat', 'Guided session', 'Infused water']
  },
  {
    id: 'forest-spa-ritual',
    title: 'Forest Spa Ritual',
    description: 'A rejuvenating full-body treatment using local organic oils, performed in an open-air forest pavilion.',
    image: 'https://picsum.photos/seed/relax2/1200/800',
    category: 'Relaxation & Retreat',
    duration: '1.5 hrs',
    price: 150,
    includes: ['Full body massage', 'Aromatherapy', 'Forest view']
  },
  {
    id: 'digital-detox-day',
    title: 'Digital Detox Day',
    description: 'A curated day of device-free relaxation, featuring reading, sketching, and quiet contemplation.',
    image: 'https://picsum.photos/seed/relax3/1200/800',
    category: 'Relaxation & Retreat',
    duration: 'Full-day',
    price: 80,
    includes: ['Sketchbook & pencils', 'Curated library access', 'Personal butler']
  }
];

export const CUISINE_REGIONS: CuisineRegion[] = [
  {
    id: 'central-kenya',
    title: 'Central Kenya',
    description: 'The heart of the highlands, featuring hearty, earth-based dishes from the Kikuyu, Embu, and Meru communities.',
    image: 'https://picsum.photos/seed/central/800/600',
    dishes: ['Nyama Choma', 'Mũkimo', 'Githeri'],
    menu: [
      { name: 'Nyama Choma', description: 'Slow-roasted goat meat seasoned with sea salt and served with kachumbari.' },
      { name: 'Mũkimo', description: 'Traditional mash of potatoes, maize, beans, and pumpkin leaves.' },
      { name: 'Githeri', description: 'A nutritious mix of boiled maize and beans, sautéed with onions and tomatoes.' }
    ]
  },
  {
    id: 'western-kenya',
    title: 'Western Kenya',
    description: 'Rich flavors from the lakeside and lush valleys, celebrating the Luo and Luhya culinary heritage.',
    image: 'https://picsum.photos/seed/western/800/600',
    dishes: ['Tilapia', 'Ugali + Sukuma Wiki', 'Ingoho'],
    menu: [
      { name: 'Grilled Tilapia', description: 'Fresh from the lake, served wet-fry or charcoal grilled.' },
      { name: 'Ugali & Sukuma Wiki', description: 'The quintessential Kenyan staple served with sautéed kale.' },
      { name: 'Ingoho', description: 'Traditional Luhya-style free-range chicken, slow-cooked to perfection.' }
    ]
  },
  {
    id: 'coastal-kenya',
    title: 'Coastal Kenya',
    description: 'A fusion of African, Arab, and Indian influences, defined by aromatic spices and coconut.',
    image: 'https://picsum.photos/seed/coastal/800/600',
    dishes: ['Biryani', 'Pilau', 'Samaki wa Kupaka'],
    menu: [
      { name: 'Swahili Biryani', description: 'Fragrant rice layered with spiced meat and a rich tomato-based sauce.' },
      { name: 'Beef Pilau', description: 'Spiced rice cooked in a flavorful meat broth with cloves and cardamom.' },
      { name: 'Samaki wa Kupaka', description: 'Fish grilled over charcoal and basted with a thick coconut sauce.' }
    ]
  },
  {
    id: 'rift-valley',
    title: 'Rift Valley',
    description: 'The land of the Maasai and Kalenjin, where traditional roasting and dairy take center stage.',
    image: 'https://picsum.photos/seed/rift/800/600',
    dishes: ['Maasai Nyama Choma', 'Mursik'],
    menu: [
      { name: 'Maasai Style Roast', description: 'Traditional pit-roasted meat served with local herbs.' },
      { name: 'Mursik Experience', description: 'Traditional fermented milk treated with special charcoal.' }
    ]
  },
  {
    id: 'eastern-kenya',
    title: 'Eastern Kenya',
    description: 'The flavors of the Kamba people, featuring indigenous grains and free-range poultry.',
    image: 'https://picsum.photos/seed/eastern/800/600',
    dishes: ['Kienyeji Chicken', 'Muthokoi'],
    menu: [
      { name: 'Kienyeji Chicken', description: 'Free-range chicken stewed with traditional spices.' },
      { name: 'Muthokoi', description: 'Hulled maize cooked with beans and local vegetables.' }
    ]
  },
  {
    id: 'northern-kenya',
    title: 'Northern Kenya',
    description: 'Nomadic influences featuring roasted meats and traditional flatbreads from the Turkana and Somali cultures.',
    image: 'https://picsum.photos/seed/northern/800/600',
    dishes: ['Roasted Goat', 'Canjeero'],
    menu: [
      { name: 'Roasted Goat', description: 'Tender goat meat slow-roasted with desert herbs.' },
      { name: 'Canjeero & Stew', description: 'Traditional sourdough flatbread served with a rich meat stew.' }
    ]
  }
];

export const INTERNATIONAL_CUISINE = [
  {
    id: 'fine-dining',
    title: 'Global Fine Dining',
    description: 'A curated selection of international favorites prepared with a luxury touch.',
    image: 'https://picsum.photos/seed/finedining/800/600',
    servingTimes: 'Dinner: 19:00 - 22:30',
    menu: [
      { name: 'Wagyu Beef Fillet', description: 'Truffle potato purée, glazed baby carrots, red wine reduction.' },
      { name: 'Lobster Thermidor', description: 'Creamy cognac sauce, gruyère crust, herb-crusted asparagus.' },
      { name: 'Wild Mushroom Risotto', description: 'Arborio rice, porcini mushrooms, aged parmesan, truffle oil.' }
    ]
  },
  {
    id: 'mediterranean',
    title: 'Mediterranean Flavors',
    description: 'Fresh, vibrant dishes inspired by the coasts of Italy, Greece, and Southern France.',
    image: 'https://picsum.photos/seed/med/800/600',
    servingTimes: 'Lunch: 12:30 - 15:30',
    menu: [
      { name: 'Grilled Sea Bass', description: 'Lemon-herb butter, roasted Mediterranean vegetables.' },
      { name: 'Handmade Pappardelle', description: 'Slow-cooked lamb ragu, fresh herbs, pecorino.' }
    ]
  }
];

export const DINING: DiningExperience[] = [
  // Locations
  {
    id: 'lakeside-dining',
    title: 'Lakeside Dining',
    description: 'Dine under the stars with the gentle sound of the lake as your backdrop.',
    image: 'https://picsum.photos/seed/lakedining/800/600',
    type: 'Location',
    price: 75
  },
  {
    id: 'forest-dining',
    title: 'Forest Dining',
    description: 'An intimate dining experience nestled deep within our indigenous forest.',
    image: 'https://picsum.photos/seed/forestdining/800/600',
    type: 'Location',
    price: 90
  },
  {
    id: 'firepit-dining',
    title: 'Firepit / Outdoor Dining',
    description: 'Traditional storytelling and meals around a crackling fire.',
    image: 'https://picsum.photos/seed/firepit/800/600',
    type: 'Location',
    price: 60
  },
  {
    id: 'main-restaurant',
    title: 'Main Restaurant',
    description: 'Elegant indoor dining with panoramic views of Mount Kilimanjaro.',
    image: 'https://picsum.photos/seed/restaurant/800/600',
    type: 'Location',
    price: 50
  },
  // Premium Experiences
  {
    id: 'chefs-tasting',
    title: "Chef's Kenyan Tasting Menu",
    description: 'A 7-course journey through Kenya\'s finest ingredients and traditional techniques.',
    image: 'https://picsum.photos/seed/tasting/800/600',
    type: 'Special',
    price: 120
  },
  {
    id: 'cultural-night',
    title: 'Cultural Dining Night',
    description: 'An evening of traditional food, music, and dance under the African sky.',
    image: 'https://picsum.photos/seed/cultural/800/600',
    type: 'Special',
    price: 85
  },
  {
    id: 'storytelling-dinner',
    title: 'Food & Storytelling',
    description: 'Traditional dishes served alongside captivating tales of Kenyan heritage.',
    image: 'https://picsum.photos/seed/story/800/600',
    type: 'Special',
    price: 70
  },
  {
    id: 'farm-to-table',
    title: 'Farm-to-Table Experience',
    description: 'Visit our organic garden and enjoy a meal prepared with ingredients you helped harvest.',
    image: 'https://picsum.photos/seed/farm/800/600',
    type: 'Special',
    price: 95
  }
];
