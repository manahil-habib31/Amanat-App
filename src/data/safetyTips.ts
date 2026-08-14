export interface HelplineInfo {
  name: string;
  category: string;
  phone: string;
  note: string;
}

export const PAKISTANI_HELPLINES: HelplineInfo[] = [
  {
    name: 'Police Emergency / Lost Report',
    category: 'Emergency & Legal',
    phone: '15',
    note: 'Call 15 nationwide to report lost items or locate nearest Police Station / Khidmat Markaz'
  },
  {
    name: 'NADRA Citizen Helpline',
    category: 'Identity Cards (CNIC)',
    phone: '1777 (from mobile) or 051-111-786-100',
    note: 'Inquire about duplicate CNIC status, token tracking, and Pak-ID guidance'
  },
  {
    name: 'PTA Lost Phone / DIRBS Complaint',
    category: 'Mobile Handsets & IMEI',
    phone: '0800-55055',
    note: 'Toll-free PTA consumer helpline for IMEI blocking across cellular networks'
  },
  {
    name: 'DGIP Passports Helpline',
    category: 'Pakistani Passports',
    phone: '051-9107044',
    note: 'Passports information and status inquiry center'
  },
  {
    name: 'Punjab Police Khidmat Markaz',
    category: 'Punjab Lost Documents',
    phone: '042-99030111',
    note: 'Computerized DDR (Roznamcha) lost report appointments & character certificates'
  },
  {
    name: 'CPLC Karachi (Citizen-Police Liaison)',
    category: 'Sindh / Karachi Support',
    phone: '1102 or 021-35682222',
    note: 'Stolen/Lost mobile phones, vehicle recovery & verification database'
  },
  {
    name: 'HBL Card Blocking Hotline',
    category: 'Banking Helpline (24/7)',
    phone: '021-111-111-425',
    note: 'Instant 24/7 card deactivation & fraud reporting'
  },
  {
    name: 'Meezan Bank 24/7 Helpline',
    category: 'Banking Helpline (24/7)',
    phone: '021-111-331-331 / 332',
    note: 'Debit card block & emergency banking authorization'
  },
  {
    name: 'Bank Alfalah 24/7 Helpline',
    category: 'Banking Helpline (24/7)',
    phone: '021-111-225-111',
    note: 'Credit/Debit card lost management'
  },
  {
    name: 'MCB Bank 24/7 Hotline',
    category: 'Banking Helpline (24/7)',
    phone: '021-111-000-622',
    note: 'Card freeze and customer support'
  },
  {
    name: 'EasyPaisa Helpline',
    category: 'Digital Wallets',
    phone: '3737 (Telenor) or 042-111-003-737',
    note: 'Lock digital wallet and report compromised account'
  },
  {
    name: 'JazzCash Helpline',
    category: 'Digital Wallets',
    phone: '4444 (Jazz) or 021-111-124-444',
    note: 'Immediate account security lock'
  }
];

export const FIRST_THREE_STEPS = [
  {
    stepNumber: '01',
    title: 'Secure Accounts & Prevent Misuse',
    titleUrdu: 'سب سے پہلے سیکیورٹی محفوظ بنائیں',
    description: 'If you lost a bank card, SIM, or smartphone, immediately block/freeze it within minutes. Never wait until tomorrow.',
    badge: 'Immediate Action'
  },
  {
    stepNumber: '02',
    title: 'Obtain a Police Diary Entry (Roznamcha / DDR)',
    titleUrdu: 'پولیس خدمت مرکز سے گمشدگی کی رپورٹ لیں',
    description: 'Getting a computerized DDR or Thana report creates legal proof of the date you lost the document, protecting you from identity theft.',
    badge: 'Legal Protection'
  },
  {
    stepNumber: '03',
    title: 'Organize Prerequisites Before Visiting the Office',
    titleUrdu: 'دفتر جانے سے پہلے ضروری کاغذات مکمل کریں',
    description: 'Check required photocopies, relative CNICs, stamp papers, or fee vouchers in advance to avoid multiple frustrating trips in the heat.',
    badge: 'Save Time & Stress'
  }
];
