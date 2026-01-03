
import { Destination, Category, Itinerary } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'lalibela',
    name: 'Lalibela',
    category: Category.HISTORY,
    tagline: 'The Jerusalem of Ethiopia',
    description: 'Famous for its monolithic rock-hewn churches, Lalibela is a sacred site for Orthodox Christians.',
    history: 'King Lalibela in the 12th century sought to create a "New Jerusalem" after the old one was captured by Muslims.',
    significance: 'UNESCO World Heritage site and a testament to medieval engineering and spirituality.',
    bestTime: 'October to March (Ethiopian Christmas in January is peak).',
    costEstimate: '$100 - $300 per day',
    mainImage: 'https://th.bing.com/th/id/R.a4082a7d1269a84da32c2b17d58bf5b0?rik=I2OyQY3GHO6fkw&pid=ImgRaw&r=0',
    gallery: [],
    attractions: ['Bete Giyorgis', 'Bete Medhane Alem', 'Bete Maryam'],
    tips: ['Hire a local licensed guide', 'Wear comfortable walking shoes', 'Modest clothing for churches']
  },
  {
    id: 'simien-mountains',
    name: 'Simien Mountains',
    category: Category.NATURE,
    tagline: 'The Chess Pieces of the Gods',
    description: 'Massive erosion over the years has created one of the most spectacular landscapes in the world.',
    history: 'A plateau created by volcanic activity millions of years ago, later carved by nature.',
    significance: 'Home to rare wildlife like the Walia Ibex and Gelada baboons.',
    bestTime: 'September to November (lush green views).',
    costEstimate: '$80 - $250 per day',
    mainImage: 'https://th.bing.com/th/id/R.90c0cd9ab774bf3c6fa31e94a7375e44?rik=W4Z5ZwASLCDHqA&pid=ImgRaw&r=0',
    gallery: [],
    attractions: ['Ras Dashen', 'Jinbar Waterfall', 'Chenek Camp'],
    tips: ['High altitude precautions', 'Multi-day treks are best', 'Bring warm gear for nights']
  },
  {
    id: 'axum',
    name: 'Axum',
    category: Category.HISTORY,
    tagline: 'Ancient Empire of Africa',
    description: 'The center of one of the four great empires of the ancient world alongside Rome, Persia, and China.',
    history: 'Seat of the Axumite Empire, which controlled trade between India and the Roman Empire.',
    significance: 'Legendary resting place of the Ark of the Covenant.',
    bestTime: 'September to April.',
    costEstimate: '$70 - $200 per day',
    mainImage: 'https://th.bing.com/th/id/R.c35a4619d906803a0d25a172f60d55cb?rik=5dq7PzybI8R2ww&pid=ImgRaw&r=0',
    gallery: [],
    attractions: ['Stelae Park', 'Church of Our Lady Mary of Zion', 'Queen of Sheba Palace'],
    tips: ['The Ark chapel is off-limits but the museum is rich', 'Visit early to avoid heat']
  },
  {
    id: 'gondar',
    name: 'Gondar',
    category: Category.HISTORY,
    tagline: 'The Camelot of Africa',
    description: 'A city of medieval castles and breathtaking churches, once the seat of the Ethiopian Empire.',
    history: 'Founded by Emperor Fasilides in the 17th century, Gondar served as Ethiopia’s capital for over two hundred years.',
    significance: 'Known for the Fasil Ghebbi, a fortress enclosure containing several majestic palaces.',
    bestTime: 'October to February.',
    costEstimate: '$85 - $220 per day',
    mainImage: 'https://th.bing.com/th/id/R.c9e2dce2f94a8038bfaf47aaccc19a43?rik=GdEBSHho7U3vGw&pid=ImgRaw&r=0',
    gallery: [],
    attractions: ['Fasil Ghebbi (Royal Enclosure)', 'Debre Berhan Selassie Church', 'Fasilides Bath'],
    tips: ['Visit during Timkat (January) for an incredible cultural experience', 'Take a day trip to the Simien Mountains from here']
  }
];

export const ITINERARIES: Itinerary[] = [
  {
    id: 'classic-north',
    name: 'The Historic North',
    durationDays: 10,
    totalCost: '$1,500 - $2,500',
    days: [
      { day: 1, title: 'Arrival in Addis Ababa', activities: ['National Museum', 'Mercato'], food: 'Doro Wat', lodging: 'Sheraton Addis' },
      { day: 2, title: 'Flight to Axum', activities: ['Obelisks', 'Ancient Churches'], food: 'Injera with Shiro', lodging: 'Yeha Hotel' },
      { day: 5, title: 'Rock-hewn Churches of Lalibela', activities: ['Bete Giyorgis', 'Evening Traditional Music'], food: 'Beyaynetu', lodging: 'Mountain View Hotel' }
    ]
  }
];

export const FOODS = [
  { name: 'Injera', description: 'Sourdough flatbread made from Teff flour, the staple of every meal.', price: '$1-2 per portion' },
  { name: 'Doro Wat', description: 'Spicy chicken stew, often served for special occasions.', price: '$8-15' },
  { name: 'Coffee Ceremony', description: 'A social ritual involving roasting, grinding, and brewing beans.', price: 'Free or small tip' }
];
