import type { LostItemRecord, CommunityPost } from '../types';
import { DEFAULT_RECOVERY_STEPS } from './recoveryPlans';

export const INITIAL_DEMO_ITEMS: LostItemRecord[] = [
  {
    id: 'demo-item-1',
    category: 'cnic',
    lostDate: '2026-08-12',
    lostTimeOfDay: 'afternoon',
    city: 'Rawalpindi',
    area: 'Saddar',
    locationDetails: 'Last seen near Commercial Market / Bank Road photocopy shop while applying for banking service.',
    identifyingDetails: 'Card in dark navy cardholder with a metro pass attached.',
    hasPhotoOrCopy: true,
    mockUploadedFileName: 'cnic_back_photocopy_sample.pdf',
    status: 'in_progress',
    createdAt: '2026-08-12T14:30:00Z',
    recoverySteps: DEFAULT_RECOVERY_STEPS.cnic.map((step, idx) => ({
      ...step,
      completed: idx < 3, // 3 of 6 completed
      completedAt: idx < 3 ? '2026-08-13T10:15:00Z' : undefined
    })),
    notes: 'Police DDR obtained at Khidmat Markaz Rawalpindi (Ref: PKM-RWP-88421). Pak-ID application submitted.'
  },
  {
    id: 'demo-item-2',
    category: 'educational_certificate',
    lostDate: '2026-08-10',
    lostTimeOfDay: 'morning',
    city: 'Islamabad',
    area: 'Sector H-9 / HEC Area',
    locationDetails: 'Lost folder containing FSC Marksheet near Higher Education Commission / FBISE office premises.',
    identifyingDetails: 'In a beige document file with blue folder clips.',
    hasPhotoOrCopy: true,
    mockUploadedFileName: 'scanned_fbise_sanad_copy.pdf',
    status: 'lost',
    createdAt: '2026-08-10T09:45:00Z',
    recoverySteps: DEFAULT_RECOVERY_STEPS.educational_certificate.map((step, idx) => ({
      ...step,
      completed: idx === 0, // 1 of 5 completed
      completedAt: idx === 0 ? '2026-08-10T16:00:00Z' : undefined
    })),
    notes: 'Drafted classified advertisement for Daily Jang / Dawn. Next step is police diary entry.'
  },
  {
    id: 'demo-item-3',
    category: 'driving_license',
    lostDate: '2026-08-02',
    lostTimeOfDay: 'evening',
    city: 'Lahore',
    area: 'Gulberg III / Main Boulevard',
    locationDetails: 'Misplaced wallet while dining in Gulberg food street.',
    identifyingDetails: 'Punjab DLIMS computerised driving license card.',
    hasPhotoOrCopy: false,
    status: 'recovered',
    createdAt: '2026-08-02T19:20:00Z',
    recoveredAt: '2026-08-08T11:00:00Z',
    recoverySteps: DEFAULT_RECOVERY_STEPS.driving_license.map((step) => ({
      ...step,
      completed: true, // 5 of 5 / 6 of 6 completed
      completedAt: '2026-08-08T11:00:00Z'
    })),
    notes: 'Recovered! Duplicate card successfully collected from Traffic Police Center, Lahore.'
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    type: 'found',
    itemTitle: 'Found Black Leather Wallet with CNIC & Metro Card',
    category: 'cnic',
    city: 'Rawalpindi',
    area: 'Saddar, near Bank Road',
    date: '12 Aug 2026',
    genericDescription: 'Found near photocopy shop. Contains a national identity card and some coins. Handed over to shopkeeper / security desk for safe return.',
    contactHint: 'Available with Shopkeeper "Al-Madina Photostat" opposite Tehzeeb Bakers, Saddar.',
    isVerifiedSafe: true
  },
  {
    id: 'post-2',
    type: 'lost',
    itemTitle: 'Lost Brown Document Folder with Academic Transcript',
    category: 'educational_certificate',
    city: 'Islamabad',
    area: 'Sector H-9 / Metro Station',
    date: '11 Aug 2026',
    genericDescription: 'Contains intermediate marksheet certificate. No money or bank cards inside. Very important for university admission.',
    contactHint: 'If found, please hand over to H-9 Metro Station Lost & Found desk or drop a message.',
    isVerifiedSafe: true
  },
  {
    id: 'post-3',
    type: 'found',
    itemTitle: 'Found Keychain with 3 Keys & Suzuki Remote',
    category: 'keys',
    city: 'Lahore',
    area: 'Liberty Market parking',
    date: '13 Aug 2026',
    genericDescription: 'Found on the parking bench near Roundabout. Has a blue braided strap and vehicle key.',
    contactHint: 'Deposited with Liberty Market Security Post No. 2.',
    isVerifiedSafe: true
  },
  {
    id: 'post-4',
    type: 'lost',
    itemTitle: 'Lost Green Passport in Leather Pouch',
    category: 'passport',
    city: 'Karachi',
    area: 'Tariq Road / PECHS',
    date: '09 Aug 2026',
    genericDescription: 'Misplaced pouch during shopping. Police lost report has been lodged.',
    contactHint: 'Contact Ferozabad Police Station or reply via secure message.',
    isVerifiedSafe: true
  },
  {
    id: 'post-5',
    type: 'found',
    itemTitle: 'Found Student Card & Bank Debit Card',
    category: 'bank_card',
    city: 'Peshawar',
    area: 'University Road',
    date: '14 Aug 2026',
    genericDescription: 'Found student ID and payment card. Bank has been informed to lock the card. Handed over to University Campus Security.',
    contactHint: 'Security Office, University of Peshawar main gate.',
    isVerifiedSafe: true
  }
];
