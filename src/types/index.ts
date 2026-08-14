export type ItemCategory = 
  | 'cnic'
  | 'passport'
  | 'driving_license'
  | 'educational_certificate'
  | 'vehicle_document'
  | 'bank_card'
  | 'mobile_phone'
  | 'keys'
  | 'other';

export type ItemStatus = 'lost' | 'in_progress' | 'recovered';

export interface RecoveryStep {
  id: string;
  title: string;
  titleUrdu?: string;
  description: string;
  detailTips?: string[];
  actionLabel?: string;
  actionUrl?: string;
  authority?: string;
  isUrgent?: boolean;
  completed: boolean;
  completedAt?: string;
}

export interface ItemGuidance {
  whatToPrepare: string[];
  keepSafeTips: string[];
  officialAuthority: string;
  officialUrl?: string;
  estimatedTimeline?: string;
  estimatedFeeNote?: string;
  demoNotice: string;
}

export interface LostItemRecord {
  id: string;
  category: ItemCategory;
  customCategoryName?: string;
  lostDate: string;
  lostTimeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night' | 'unknown';
  city: string;
  area: string;
  locationDetails?: string;
  identifyingDetails?: string;
  hasPhotoOrCopy: boolean;
  mockUploadedFileName?: string;
  status: ItemStatus;
  createdAt: string;
  recoveredAt?: string;
  recoverySteps: RecoveryStep[];
  notes?: string;
}

export interface CategoryMeta {
  id: ItemCategory;
  name: string;
  nameUrdu: string;
  iconName: string;
  badge: string;
  description: string;
  urgency: 'high' | 'medium' | 'standard';
  primaryAuthority: string;
}

export interface CommunityPost {
  id: string;
  type: 'lost' | 'found';
  itemTitle: string;
  category: ItemCategory;
  city: string;
  area: string;
  date: string;
  genericDescription: string;
  contactHint: string;
  isVerifiedSafe: boolean;
}
