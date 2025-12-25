
export enum Category {
  NATURE = 'Nature',
  CULTURE = 'Culture',
  HISTORY = 'History',
  ADVENTURE = 'Adventure',
  URBAN = 'Urban'
}

export interface Destination {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  description: string;
  history: string;
  significance: string;
  bestTime: string;
  costEstimate: string;
  mainImage: string;
  gallery: string[];
  attractions: string[];
  tips: string[];
}

export interface Review {
  id: string;
  targetId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface CommunityImage {
  id: string;
  destinationId: string;
  title: string;
  description: string;
  location: string;
  author: string;
  url: string;
  dateTaken: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Itinerary {
  id: string;
  name: string;
  durationDays: number;
  totalCost: string;
  days: {
    day: number;
    title: string;
    activities: string[];
    food: string;
    lodging: string;
  }[];
}

export interface PartnerInquiry {
  id: string;
  businessName: string;
  type: 'hotel' | 'tour' | 'restaurant' | 'investor';
  contactPerson: string;
  email: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
}

export type UserRole = 'guest' | 'user' | 'contributor' | 'partner' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  contributions: number;
}
