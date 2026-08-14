import type { CategoryMeta } from '../types';

export const PAKISTAN_CITIES = [
  'Rawalpindi',
  'Islamabad',
  'Lahore',
  'Karachi',
  'Peshawar',
  'Quetta',
  'Faisalabad',
  'Multan',
  'Gujranwala',
  'Sialkot',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Larkana',
  'Mardan',
  'Mirpur (AJK)',
  'Gilgit',
  'Other City'
];

export const CATEGORIES_DATA: CategoryMeta[] = [
  {
    id: 'cnic',
    name: 'CNIC / Smart Card',
    nameUrdu: 'شناختی کارڈ (CNIC)',
    iconName: 'CreditCard',
    badge: 'High Priority',
    description: 'National Identity Card issued by NADRA. Essential for banking, travel, SIM registration & legal status.',
    urgency: 'high',
    primaryAuthority: 'NADRA (National Database and Registration Authority)'
  },
  {
    id: 'passport',
    name: 'Passport (Pakistani)',
    nameUrdu: 'پاکستانی پاسپورٹ',
    iconName: 'BookMarked',
    badge: 'High Priority',
    description: 'Machine Readable or e-Passport issued by Directorate General of Immigration & Passports.',
    urgency: 'high',
    primaryAuthority: 'DGIP (Immigration & Passports)'
  },
  {
    id: 'driving_license',
    name: 'Driving License',
    nameUrdu: 'ڈرائیونگ لائسنس',
    iconName: 'Car',
    badge: 'Medium Priority',
    description: 'Provincial traffic police or National Highway driving license card.',
    urgency: 'medium',
    primaryAuthority: 'Traffic Police / DLIMS'
  },
  {
    id: 'bank_card',
    name: 'Bank / ATM / Credit Card',
    nameUrdu: 'بینک / اے ٹی ایم کارڈ',
    iconName: 'Landmark',
    badge: 'Immediate Action',
    description: 'Debit, Credit or Prepaid card linked to Pakistani bank accounts (1Link, PayPak, Visa/MC).',
    urgency: 'high',
    primaryAuthority: 'Issuing Commercial Bank / 1Link'
  },
  {
    id: 'mobile_phone',
    name: 'Mobile Phone',
    nameUrdu: 'موبائل فون',
    iconName: 'Smartphone',
    badge: 'High Priority',
    description: 'Smartphone with active Pakistani SIM cards, banking apps, and sensitive personal data.',
    urgency: 'high',
    primaryAuthority: 'PTA (DIRBS) & Police / CPLC'
  },
  {
    id: 'educational_certificate',
    name: 'Degree / Certificate',
    nameUrdu: 'تعلیمی اسناد / ڈگری',
    iconName: 'GraduationCap',
    badge: 'Standard Flow',
    description: 'Matric / Inter Sanad, Bachelor / Master Degree, HEC Attestation or Board marksheets.',
    urgency: 'standard',
    primaryAuthority: 'BISE Boards / Universities / HEC'
  },
  {
    id: 'vehicle_document',
    name: 'Vehicle Registration / Smart Card',
    nameUrdu: 'گاڑی / بائیک کے کاغذات',
    iconName: 'FileText',
    badge: 'Medium Priority',
    description: 'Vehicle Registration Book, Smart Card or Excise transfer file.',
    urgency: 'medium',
    primaryAuthority: 'Excise, Taxation & Narcotics Department'
  },
  {
    id: 'keys',
    name: 'Keys (House / Car / Office)',
    nameUrdu: 'چابیاں',
    iconName: 'KeyRound',
    badge: 'Immediate Action',
    description: 'House main door keys, vehicle remote fob, locker or office master keys.',
    urgency: 'medium',
    primaryAuthority: 'Local Locksmith / Building Security'
  },
  {
    id: 'other',
    name: 'Other Important Item / Document',
    nameUrdu: 'دیگر اہم دستاویز یا سامان',
    iconName: 'ShieldQuestion',
    badge: 'Standard Flow',
    description: 'Domicile, Stamp paper, Property registry, Medical book, or Wallet.',
    urgency: 'standard',
    primaryAuthority: 'Relevant District Administration'
  }
];
