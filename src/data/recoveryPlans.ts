import type { ItemCategory, RecoveryStep, ItemGuidance } from '../types';

export const DEFAULT_RECOVERY_STEPS: Record<ItemCategory, RecoveryStep[]> = {
  cnic: [
    {
      id: 'step_cnic_1',
      title: 'Retrace steps & search last known location',
      titleUrdu: 'آخری جگہ پر دوبارہ تسلی سے تلاش کریں',
      description: 'Check photostat shops, ATM booths, vehicle glove compartments, office desks, or bags where you last presented your CNIC.',
      detailTips: [
        'Often photocopy shops or bank counters keep mislaid cards in an safe box.',
        'Ask the security guard or counter staff at your last visited spot in the area.'
      ],
      isUrgent: true,
      completed: false
    },
    {
      id: 'step_cnic_2',
      title: 'Report loss at nearest Police Khidmat Markaz or Police Station',
      titleUrdu: 'قریبی پولیس خدمت مرکز یا تھانے میں روزنامچہ درج کروائیں',
      description: 'Obtain a Police Diary entry / Roznamcha (DDR - Daily Diary Report) for lost document. This legally safeguards you against misuse of your identity.',
      detailTips: [
        'In Punjab/KPK/Sindh/Islamabad, Police Khidmat Markaz provides a computerized lost document slip in 10 minutes.',
        'Carry a photocopy of your CNIC or your CNIC number if memorized.',
        'Keep the DDR reference number safe for NADRA verification.'
      ],
      authority: 'Police Khidmat Markaz / Local Police Station',
      isUrgent: true,
      completed: false
    },
    {
      id: 'step_cnic_3',
      title: 'Verify duplicate CNIC requirements with NADRA',
      titleUrdu: 'نادرہ سے ڈپلیکیٹ شناختی کارڈ کا طریقہ کار معلوم کریں',
      description: 'Check whether you want to visit a NADRA Registration Center (NRC) physically or apply online through Pak-ID mobile app.',
      detailTips: [
        'If your biometric fingerprint data is already in NADRA system, you can apply on the Pak-ID app without visiting a center.',
        'For physical visit, check center timings (Mega centers operate 24/7 in major cities).'
      ],
      authority: 'NADRA (Pak-ID Portal / NRC Centers)',
      actionLabel: 'Visit Pak-ID Portal (Demo Link)',
      actionUrl: 'https://id.nadra.gov.pk/',
      completed: false
    },
    {
      id: 'step_cnic_4',
      title: 'Prepare required prerequisites and supporting information',
      titleUrdu: 'ضروری دستاویزات اور فیس واؤچر تیار رکھیں',
      description: 'Organize required details before submitting your duplicate application.',
      detailTips: [
        'Photocopy of lost CNIC (if available).',
        'CNIC copy of blood relative (Father, Mother, Brother, Sister, Spouse).',
        'Police Roznamcha / Lost report slip copy.',
        'Prescribed NADRA fee (Executive, Urgent, or Normal category).'
      ],
      completed: false
    },
    {
      id: 'step_cnic_5',
      title: 'Submit application for Duplicate / Lost CNIC',
      titleUrdu: 'ڈپلیکیٹ شناختی کارڈ کی درخواست جمع کروائیں',
      description: 'Complete biometric capture, photograph verification, and receive your tracking token number.',
      detailTips: [
        'Keep the tracking token SMS / receipt slip safely.',
        'Track tracking status via SMS to 8400 or Pak-ID tracking portal.'
      ],
      authority: 'NADRA Registration Center',
      completed: false
    },
    {
      id: 'step_cnic_6',
      title: 'Collect new CNIC & securely archive old records',
      titleUrdu: 'نیا شناختی کارڈ وصول کریں اور تصدیق مکمل کریں',
      description: 'Collect your card or receive it via registered courier. If the old card is ever found later, it is legally invalid and should be destroyed.',
      detailTips: [
        'Carry your original token slip and identity witness if required on collection.',
        'Update banking or telecommunication records if required.'
      ],
      completed: false
    }
  ],

  passport: [
    {
      id: 'step_pass_1',
      title: 'Verify immediate travel status & search belongings',
      titleUrdu: 'سفری کاغذات اور آخری مقامات کو چیک کریں',
      description: 'If you have an upcoming international flight, check with the airline regarding date alteration policies immediately.',
      isUrgent: true,
      completed: false
    },
    {
      id: 'step_pass_2',
      title: 'Lodge Lost Passport Report with Local Police',
      titleUrdu: 'تھانے یا پولیس خدمت مرکز سے گمشدگی کی رپورٹ لیں',
      description: 'A formal police lost report (Roznamcha / FIR copy) is mandatory for obtaining a duplicate Pakistani passport.',
      detailTips: [
        'Specify passport number if known, issuing date, and place of loss.',
        'Obtain an attested copy of the police report.'
      ],
      authority: 'Police Station / Khidmat Markaz',
      isUrgent: true,
      completed: false
    },
    {
      id: 'step_pass_3',
      title: 'Generate Passport Fee Challan via Asaan Passport App / NBP',
      titleUrdu: 'پاسپورٹ فیس چالان بنوائیں (پاسپورٹ آسان ایپ یا نیشنل بینک)',
      description: 'Pay the duplicate lost passport fee (Lost category has specific government token fees depending on 1st/2nd loss).',
      detailTips: [
        'Download the official "Passport Fee Asaan" app or pay at National Bank of Pakistan (NBP) counter.',
        'Keep the PSID / Paid receipt with you.'
      ],
      authority: 'Directorate General of Immigration & Passports (DGIP)',
      actionLabel: 'DGIP Portal (Demo Link)',
      actionUrl: 'https://dgip.gov.pk/',
      completed: false
    },
    {
      id: 'step_pass_4',
      title: 'Gather Original CNIC and Supporting Documents',
      titleUrdu: 'اصل شناختی کارڈ اور دیگر مطلوبہ دستاویزات ساتھ رکھیں',
      description: 'Pack Original valid CNIC/NICOP, photocopy of lost passport (if available), police report, and fee voucher.',
      detailTips: [
        'For dual nationals: foreign passport copy if applicable.',
        'For government servants: departmental NOC.'
      ],
      completed: false
    },
    {
      id: 'step_pass_5',
      title: 'Visit Regional Passport Office (RPO) for Processing',
      titleUrdu: 'ریجنل پاسپورٹ آفس جائیں اور بائیو میٹرک مکمل کروائیں',
      description: 'Obtain token, undergo photo/biometric verification, and complete the Assistant Director interview.',
      authority: 'Regional Passport Office (DGIP)',
      completed: false
    },
    {
      id: 'step_pass_6',
      title: 'Track Delivery and Collect New Passport',
      titleUrdu: 'پاسپورٹ اسٹیٹس ٹریک کریں اور نیا پاسپورٹ وصول کریں',
      description: 'Monitor delivery SMS from DGIP and collect passport from the counter with your original token.',
      completed: false
    }
  ],

  driving_license: [
    {
      id: 'step_dl_1',
      title: 'Stop driving until temporary authorization / report is issued',
      titleUrdu: 'بغیر لائسنس گاڑی چلانے سے گریز کریں',
      description: 'Driving without a valid license or official lost report can result in heavy traffic police challans or legal complications.',
      isUrgent: true,
      completed: false
    },
    {
      id: 'step_dl_2',
      title: 'Obtain Lost Report from Traffic Police / Khidmat Markaz',
      titleUrdu: 'ٹریفک پولیس یا خدمت مرکز سے گمشدگی رپورٹ حاصل کریں',
      description: 'Get an official DDR/Roznamcha slip indicating your lost driving license number and personal CNIC.',
      authority: 'City Traffic Police / DLIMS',
      completed: false
    },
    {
      id: 'step_dl_3',
      title: 'Check online records on provincial DLIMS portal',
      titleUrdu: 'صوبائی DLIMS پورٹل پر اپنا ریکارڈ تصدیق کریں',
      description: 'Verify your digital driving license record (e.g. DLIMS Punjab, Sindh Police DL, or Islamabad Traffic Police).',
      actionLabel: 'DLIMS Record Check (Demo)',
      actionUrl: 'https://dlims.punjab.gov.pk/',
      completed: false
    },
    {
      id: 'step_dl_4',
      title: 'Prepare Medical Fitness Form (Form B) & CNIC Copies',
      titleUrdu: 'میڈیکل فارم اور شناختی کارڈ کی کاپیاں تیار کریں',
      description: 'Ensure medical fitness certificate signed by authorized practitioner (if applicable for renewal/duplicate) and 2 passport photos.',
      completed: false
    },
    {
      id: 'step_dl_5',
      title: 'Submit Duplicate License Application at Licensing Center',
      titleUrdu: 'لائسنسنگ سینٹر میں ڈپلیکیٹ لائسنس کی فیس اور فائل جمع کریں',
      description: 'Visit your city traffic licensing branch or e-Khidmat Center. Duplicate licenses typically do NOT require retaking the driving road test.',
      authority: 'Licensing Authority / e-Khidmat',
      completed: false
    },
    {
      id: 'step_dl_6',
      title: 'Collect new card or download e-License QR',
      titleUrdu: 'نیا کارڈ وصول کریں یا ڈیجیٹل ای لائسنس محفوظ کریں',
      description: 'Receive your physical card or save the verified QR code e-license on your phone.',
      completed: false
    }
  ],

  bank_card: [
    {
      id: 'step_card_1',
      title: 'IMMEDIATELY Block Card via Mobile App or 24/7 Helpline',
      titleUrdu: 'فوری طور پر موبائل ایپ یا ہیلپ لائن سے کارڈ بلاک کروائیں',
      description: 'Call your bank 24/7 helpline immediately (e.g., HBL, Meezan, Alfalah, MCB, UBL, Allied, Standard Chartered, EasyPaisa, Nayapay, SadaPay).',
      detailTips: [
        'Most modern banking apps allow a 1-tap instant "Freeze Card" toggle in the Card Management screen.',
        'Ask the representative for the Card Blocking Reference Number.'
      ],
      isUrgent: true,
      completed: false
    },
    {
      id: 'step_card_2',
      title: 'Review Recent Statements for Unauthorized Transactions',
      titleUrdu: 'حالیہ ٹرانزیکشنز چیک کریں تاکہ کوئی غیر مجاز کٹوتی نہ ہوئی ہو',
      description: 'Examine recent SMS alerts and mini-statements for any unapproved POS, ATM, or online international spending.',
      detailTips: [
        'If any fraudulent debit occurred, file an immediate "Dispute Form" with your bank.',
        'Banks have specific dispute resolution windows (typically 7-14 days).'
      ],
      isUrgent: true,
      completed: false
    },
    {
      id: 'step_card_3',
      title: 'Request Reissuance of Replacement Debit/Credit Card',
      titleUrdu: 'نئے ڈیبٹ یا کریڈٹ کارڈ کے اجراء کی درخواست دیں',
      description: 'Order a replacement card with a new 16-digit number and fresh CVV through mobile banking or branch visit.',
      authority: 'Bank Branch / Card Services',
      completed: false
    },
    {
      id: 'step_card_4',
      title: 'Update Recurring Subscriptions & Digital Wallets',
      titleUrdu: 'آن لائن سروسز اور ڈیجیٹل والٹس میں کارڈ کی معلومات تبدیل کریں',
      description: 'Once your new card arrives and is activated, update billing info on Careem, Foodpanda, Netflix, Google Play, Daraz, etc.',
      completed: false
    }
  ],

  mobile_phone: [
    {
      id: 'step_phone_1',
      title: 'Block SIM Cards via Telecom Customer Franchise',
      titleUrdu: 'سب سے پہلے ٹیلی کام فرنچائز سے اپنی سم بلاک کروائیں',
      description: 'Call customer support (Jazz 111, Zong 310, Telenor 345, Ufone 333) or visit franchise to prevent OTP theft and unauthorized calls.',
      detailTips: [
        'Do this immediately to protect WhatsApp, Banking Apps, and EasyPaisa accounts.',
        'You can get a replacement SIM issued on your CNIC at any franchise.'
      ],
      isUrgent: true,
      completed: false
    },
    {
      id: 'step_phone_2',
      title: 'Remotely Lock / Erase Device via Find My or Google Find Hub',
      titleUrdu: 'فون کو ریموٹ لاک یا ڈیٹا صاف (Wipe) کریں',
      description: 'Use Google "Find My Device" (Android) or Apple "Find My" (iPhone) to lock your screen with a contact message or wipe sensitive files.',
      isUrgent: true,
      completed: false
    },
    {
      id: 'step_phone_3',
      title: 'Block Phone IMEI Number on PTA DIRBS System',
      titleUrdu: 'پی ٹی اے کے ذریعے فون کا آئی ایم ای آئی (IMEI) بلاک کروائیں',
      description: 'Block the handset nationwide so it cannot be used on any cellular network in Pakistan.',
      detailTips: [
        'PTA Toll-Free Helpline: 0800-55055 or online portal complaint.',
        'Provide 15-digit IMEI number (from original box or invoice), CNIC, and police lost report if required.'
      ],
      authority: 'Pakistan Telecommunication Authority (PTA)',
      actionLabel: 'PTA Lost Device Portal (Demo)',
      actionUrl: 'https://dirbs.pta.gov.pk/',
      completed: false
    },
    {
      id: 'step_phone_4',
      title: 'Change Passwords for Google, Apple ID, WhatsApp & Bank Apps',
      titleUrdu: 'گوگل، ایپل آئی ڈی اور بینکنگ ایپس کے پاسورڈز تبدیل کریں',
      description: 'Log out of all active sessions from another trusted browser and update primary email/financial security passwords.',
      completed: false
    },
    {
      id: 'step_phone_5',
      title: 'Report at CPLC (Karachi/Sindh) or Police 15 (Punjab/Capital)',
      titleUrdu: 'سی پی ایل سی یا ون فائیو پولیس کو گمشدگی کی اطلاع دیں',
      description: 'Record the lost mobile handset IMEI in the stolen/lost police database.',
      authority: 'CPLC / Police 15',
      completed: false
    }
  ],

  educational_certificate: [
    {
      id: 'step_edu_1',
      title: 'Search Academic Portfolios, Old Attestation Files & Scans',
      titleUrdu: 'گھر، یونیورسٹی فائلز اور پرانے اسکینز میں تلاش کریں',
      description: 'Check previous admission packets, employer submissions, and email drives for scanned PDF copies with Roll Number and Registration Number.',
      completed: false
    },
    {
      id: 'step_edu_2',
      title: 'Publish Classified Notice in Recognized Daily Newspaper',
      titleUrdu: 'تسلیم شدہ قومی روزنامے میں گمشدگی کا اشتہار شائع کروائیں',
      description: 'Most Pakistani Education Boards (BISE Lahore, Federal Board FBISE, BISE Rawalpindi, Karachi Board) and Universities mandate a newspaper advertisement regarding lost certificate.',
      detailTips: [
        'Sample text: "My Matric Sanad/DMC Roll No. [XXXX], Registration [XXXX], Session [XXXX] has been lost. If found contact..."',
        'Buy 2-3 original complete copies of the published newspaper containing the ad.'
      ],
      authority: 'National Daily Newspaper Classifieds',
      completed: false
    },
    {
      id: 'step_edu_3',
      title: 'Obtain Police Roznamcha / Lost Document Report',
      titleUrdu: 'تھانے سے تعلیمی اسناد کی گمشدگی کی تصدیق حاصل کریں',
      description: 'Visit local police station/Khidmat Markaz to obtain an entry report specifying the certificate details and board name.',
      authority: 'Police Station / Khidmat Markaz',
      completed: false
    },
    {
      id: 'step_edu_4',
      title: 'Prepare Notarized Affidavit on Stamp Paper',
      titleUrdu: 'اسٹامپ پیپر پر بیانِ حلفی نوٹری پبلک سے تصدیق کروائیں',
      description: 'Execute an affidavit on Rs. 50/100 Judicial Stamp paper declaring the accidental loss of original certificate and indemnifying the board.',
      completed: false
    },
    {
      id: 'step_edu_5',
      title: 'Submit Duplicate Sanad Form & Bank Challan to BISE / University',
      titleUrdu: 'بورڈ یا یونیورسٹی میں فارم اور فیس چالان جمع کروائیں',
      description: 'Attach the original newspaper cutting, police report, stamp paper affidavit, CNIC copy, and paid bank fee challan (HBL/NBP/MCB).',
      authority: 'BISE Board of Intermediate & Secondary Education / University Examination Dept',
      completed: false
    }
  ],

  vehicle_document: [
    {
      id: 'step_veh_1',
      title: 'Verify vehicle chassis & engine number from purchase file / insurance',
      titleUrdu: 'گاڑی کے چیسس اور انجن نمبر کی پرانی کاپی چیک کریں',
      description: 'Locate any previous photocopy, insurance slip, or sales receipt showing complete registration details.',
      completed: false
    },
    {
      id: 'step_veh_2',
      title: 'Lodge FIR / Roznamcha at Local Police Station',
      titleUrdu: 'تھانے میں رجسٹریشن بک / اسمارٹ کارڈ گمشدگی کی رپورٹ درج کروائیں',
      description: 'Police report is essential to prevent misuse of your vehicle registration credentials in criminal activities.',
      authority: 'Police Station / Khidmat Markaz',
      isUrgent: true,
      completed: false
    },
    {
      id: 'step_veh_3',
      title: 'Publish Loss Notice in Daily Newspaper (If required by province)',
      titleUrdu: 'اخبار میں گمشدگی کا اشتہار دیں (اگر متعلقہ ایکسائز کا تقاضا ہو)',
      description: 'Check provincial Excise & Taxation rules (Punjab, Sindh, KPK, Islamabad) for duplicate smart card or registration book guidelines.',
      completed: false
    },
    {
      id: 'step_veh_4',
      title: 'Prepare Excise Form "F", CNIC Copy & Clearance',
      titleUrdu: 'ایکسائز فارم F، چالان اور کلیئرنس سرٹیفکیٹ تیار کریں',
      description: 'Download Form F (Application for Duplicate Certificate), attach owner CNIC copy, token tax update proof, and police report.',
      authority: 'Excise, Taxation & Narcotics Control Department',
      completed: false
    },
    {
      id: 'step_veh_5',
      title: 'Submit Application & Biometric at Excise Office / e-Khidmat',
      titleUrdu: 'ایکسائز دفتر یا ای خدمت مرکز میں بائیو میٹرک اور فیس جمع کریں',
      description: 'Visit Excise office with the vehicle for physical inspection if demanded, complete owner biometric, and receive duplicate Smart Card receipt.',
      authority: 'Provincial Excise & Taxation Office',
      completed: false
    }
  ],

  keys: [
    {
      id: 'step_key_1',
      title: 'Assess security risk & restrict access to property or vehicle',
      titleUrdu: 'فوری طور پر گھر، گاڑی یا دفتر کی سیکیورٹی محفوظ بنائیں',
      description: 'If keys were lost along with any bag or document containing your home address, change door cylinders or padlocks immediately!',
      isUrgent: true,
      completed: false
    },
    {
      id: 'step_key_2',
      title: 'Search last transit locations (Rickshaw, Cab, Metro, Mosques, Markets)',
      titleUrdu: 'رکشہ، ٹیکسی، میٹروبس، مسجد یا مارکیٹ میں تلاش کریں',
      description: 'Contact ride-hailing support (Careem, Yango, InDrive) or mosque caretakers where prayer ablution areas often collect dropped keys.',
      completed: false
    },
    {
      id: 'step_key_3',
      title: 'Locate backup spare master key',
      titleUrdu: 'اسپیئر چابی کا انتظام کریں',
      description: 'Retrieve duplicate master keys from trusted family member, landlord, or safe deposit.',
      completed: false
    },
    {
      id: 'step_key_4',
      title: 'Hire licensed locksmith to rekey locks or cut duplicate key',
      titleUrdu: 'لاک اسمتھ (چابی بنانے والے) سے نیا تالا لگوائیں یا چابی بنوائیں',
      description: 'For vehicle transponder keys, contact authorized dealership or specialized automotive locksmith for key-fob reprogramming.',
      completed: false
    }
  ],

  other: [
    {
      id: 'step_oth_1',
      title: 'Document details of the lost item and last known location',
      titleUrdu: 'گمشدہ چیز اور آخری مقام کی تمام تفصیلات لکھ لیں',
      description: 'Write down description, approximate date/time, identifiable marks, and surrounding circumstances.',
      completed: false
    },
    {
      id: 'step_oth_2',
      title: 'File lost property DDR at Police Khidmat Markaz',
      titleUrdu: 'پولیس خدمت مرکز یا تھانے میں گمشدگی کا اندراج کروائیں',
      description: 'Obtain an official entry report to establish proof of loss for administration or insurance purposes.',
      authority: 'Police Khidmat Markaz',
      completed: false
    },
    {
      id: 'step_oth_3',
      title: 'Contact the issuing authority or department for duplicate protocol',
      titleUrdu: 'متعلقہ محکمے یا ادارے سے ڈپلیکیٹ کا طریقہ کار معلوم کریں',
      description: 'Inquire about required stamp papers, newspaper ads, or identity verifications.',
      completed: false
    },
    {
      id: 'step_oth_4',
      title: 'Submit replacement request and follow up until received',
      titleUrdu: 'درخواست جمع کروائیں اور وصولی تک فالو اپ کریں',
      description: 'Complete departmental requirements and maintain copies of all submitted vouchers.',
      completed: false
    }
  ]
};

export const CATEGORY_GUIDANCE_INFO: Record<ItemCategory, ItemGuidance> = {
  cnic: {
    whatToPrepare: [
      'Your 13-digit CNIC number (if memorized or found on any old utility bill/photocopy).',
      'Existing clear photocopy or mobile picture of old CNIC (if available).',
      'Original CNIC of any blood relative (Father, Mother, Brother, Sister, or Spouse) for relationship verification.',
      'Police Lost Document Report (Roznamcha / DDR slip) from Police Khidmat Markaz.',
      'Required NADRA processing fee (Normal, Urgent, or Executive category).'
    ],
    keepSafeTips: [
      '⚠️ Do NOT post your 13-digit CNIC number or mother\'s maiden name on public social media groups.',
      '⚠️ Do NOT send unmasked front/back pictures of your CNIC to unknown numbers on WhatsApp.',
      '⚠️ If you visit photostat shops, always double-check the glass scanner bed before leaving.'
    ],
    officialAuthority: 'NADRA (National Database and Registration Authority)',
    officialUrl: 'https://id.nadra.gov.pk/',
    estimatedTimeline: 'Executive: 7 Days | Urgent: 15 Days | Normal: 30 Days (Demo Estimate)',
    estimatedFeeNote: 'Fees vary by processing urgency. Verify exact fee on Pak-ID or NRC counter.',
    demoNotice: 'Demo Guidance: Official NADRA requirements may be updated. Always verify on official portal.'
  },

  passport: {
    whatToPrepare: [
      'Original valid CNIC or NICOP and 2 clear photocopies.',
      'Certified Police Report (FIR / DDR) stating loss of passport.',
      'Previous passport number & photocopy (if available).',
      'National Bank (NBP) / Asaan Passport App paid fee voucher (Lost Category 1st/2nd time).',
      'Departmental NOC (for Government/Semi-Govt employees).'
    ],
    keepSafeTips: [
      '⚠️ Never share high-resolution passport biodata pages online.',
      '⚠️ Inform foreign embassies immediately if your passport contained active multi-year visas.'
    ],
    officialAuthority: 'Directorate General of Immigration & Passports (DGIP)',
    officialUrl: 'https://dgip.gov.pk/',
    estimatedTimeline: 'Urgent: 4-5 working days | Normal: 10-15 working days (Demo Estimate)',
    estimatedFeeNote: 'Lost passport categories have separate penalty slabs set by DGIP.',
    demoNotice: 'Demo Guidance: Verify official fees and appointment token system on DGIP website.'
  },

  driving_license: {
    whatToPrepare: [
      'Original CNIC and 2 photocopies.',
      'Police Lost Report (DDR) from Traffic Police Khidmat Markaz.',
      'Medical Fitness Form (Form B) attested by registered medical practitioner (if applicable).',
      '2 passport-size photographs with blue background.',
      'Fee ticket / challan paid at authorized post office or bank.'
    ],
    keepSafeTips: [
      '⚠️ Do not drive without temporary police authorization slip.',
      '⚠️ Download official digital license app (e.g. Punjab e-License / DLIMS) for instant roadside proof.'
    ],
    officialAuthority: 'Provincial Traffic Police & DLIMS',
    officialUrl: 'https://dlims.punjab.gov.pk/',
    estimatedTimeline: 'Same-day counter issuance or 7-10 days by courier',
    estimatedFeeNote: 'Standard duplicate card fee + postal charges apply.',
    demoNotice: 'Demo Guidance: Traffic licensing rules vary slightly by province (Punjab, Sindh, KPK, Balochistan, ICT).'
  },

  bank_card: {
    whatToPrepare: [
      'Account holder full name & registered mobile number.',
      'CNIC number and mother\'s name for telephone banking verification.',
      'Branch name or IBAN number.',
      'Approximate date & location of last legitimate transaction.'
    ],
    keepSafeTips: [
      '🚨 NEVER disclose your 4-digit ATM PIN, CVV code, or OTP to anyone, including callers claiming to be from the State Bank or Bank Fraud Cell!',
      '🚨 Bank officials will NEVER ask for your password or SMS verification code.'
    ],
    officialAuthority: 'Your Respective Commercial Bank Helpline (24/7)',
    estimatedTimeline: 'Card blocked instantly (1 minute) | New card dispatched in 3-7 business days',
    estimatedFeeNote: 'Standard card replacement charges apply as per bank Schedule of Charges (SOC).',
    demoNotice: 'Demo Guidance: Immediate freezing via mobile app is the safest first step.'
  },

  mobile_phone: {
    whatToPrepare: [
      '15-digit IMEI number (found on mobile purchase box, receipt, or Google Find My info).',
      'SIM card numbers registered in the handset.',
      'Original CNIC of SIM owner.',
      'Police / CPLC report number.'
    ],
    keepSafeTips: [
      '⚠️ Change your banking apps, Google/Apple ID, WhatsApp PIN, and email credentials immediately.',
      '⚠️ Do not accept suspicious OTP verification requests sent to backup recovery numbers.'
    ],
    officialAuthority: 'Pakistan Telecommunication Authority (PTA DIRBS) & CPLC',
    officialUrl: 'https://dirbs.pta.gov.pk/',
    estimatedTimeline: 'IMEI blocking takes 12-24 hours across all Pakistani telecom networks.',
    estimatedFeeNote: 'PTA blocking is completely free of cost.',
    demoNotice: 'Demo Guidance: Make sure to block both SIM cards and handset IMEI.'
  },

  educational_certificate: {
    whatToPrepare: [
      '2 Original copies of published newspaper containing loss announcement.',
      'Police report / DDR from local station.',
      'Attested affidavit on Rs. 50/100 Stamp paper.',
      'CNIC copy of applicant and Father/Guardian.',
      'Original paid bank challan for duplicate certificate fee.'
    ],
    keepSafeTips: [
      '⚠️ Verify roll number and registration number carefully with board records before submitting form.',
      '⚠️ Keep attested copies of the duplicate application and receipt slip safe.'
    ],
    officialAuthority: 'BISE Board / University Examination Department / HEC',
    estimatedTimeline: 'Urgent: 15-20 Days | Normal: 30-45 Days',
    estimatedFeeNote: 'Board duplicate fees vary depending on certificate level and urgency.',
    demoNotice: 'Demo Guidance: Specific board forms may require attestation by School/College Principal.'
  },

  vehicle_document: {
    whatToPrepare: [
      'Vehicle Chassis and Engine number records.',
      'Police Station FIR / Roznamcha copy.',
      'Owner original CNIC & photocopies.',
      'Up-to-date Token Tax payment receipts.',
      'Excise Form "F" signed by registered vehicle owner.'
    ],
    keepSafeTips: [
      '⚠️ Do not transfer or sell vehicle on open letter without official duplicate papers.',
      '⚠️ Beware of touts outside Excise offices; always use official e-Khidmat / Excise counters.'
    ],
    officialAuthority: 'Provincial Excise, Taxation & Narcotics Department',
    estimatedTimeline: '10 to 20 business days for Smart Card printing & delivery',
    estimatedFeeNote: 'Duplicate smart card fee + biometric verification fee apply.',
    demoNotice: 'Demo Guidance: Physical vehicle chassis verification may be required by certain excise branches.'
  },

  keys: {
    whatToPrepare: [
      'List of all locks accessible by the lost key bundle (main gate, room, locker, ignition).',
      'Make and model of vehicle (if car key).',
      'Spare emergency master key.'
    ],
    keepSafeTips: [
      '⚠️ If you suspect the keys were stolen along with address IDs, change lock cylinders without delay.',
      '⚠️ Do not leave spare keys under doormats or flower pots.'
    ],
    officialAuthority: 'Local Certified Locksmith / Vehicle Brand Dealership',
    estimatedTimeline: 'Standard lock change: 1-2 hours | Transponder key programming: 2-24 hours',
    estimatedFeeNote: 'Costs depend on security grade and electronic immobilizer programming.',
    demoNotice: 'Demo Guidance: Prioritize physical security of your premises.'
  },

  other: {
    whatToPrepare: [
      'Detailed physical description and identifying marks of the document/item.',
      'Any previous photocopy, invoice, or reference identifier.',
      'Owner CNIC copy and police lost report.'
    ],
    keepSafeTips: [
      '⚠️ Avoid sharing private family details or sensitive financial numbers in public queries.',
      '⚠️ Maintain a secure digital scanned folder of all household important papers for emergency reference.'
    ],
    officialAuthority: 'Relevant District Administration / Issuing Office',
    estimatedTimeline: 'Depends on specific administrative body',
    estimatedFeeNote: 'Verify with the concerned department.',
    demoNotice: 'Demo Guidance: Always check with local authorities for document-specific recovery rules.'
  }
};
