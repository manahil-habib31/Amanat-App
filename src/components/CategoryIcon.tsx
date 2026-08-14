import React from 'react';
import { 
  CreditCard, 
  BookMarked, 
  Car, 
  Landmark, 
  Smartphone, 
  GraduationCap, 
  FileText, 
  KeyRound, 
  ShieldQuestion, 
  HelpCircle,
  type LucideProps 
} from 'lucide-react';
import type { ItemCategory } from '../types';

interface CategoryIconProps extends LucideProps {
  category: ItemCategory | string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ category, className = 'w-6 h-6', ...props }) => {
  switch (category) {
    case 'cnic':
      return <CreditCard className={className} {...props} />;
    case 'passport':
      return <BookMarked className={className} {...props} />;
    case 'driving_license':
      return <Car className={className} {...props} />;
    case 'bank_card':
      return <Landmark className={className} {...props} />;
    case 'mobile_phone':
      return <Smartphone className={className} {...props} />;
    case 'educational_certificate':
      return <GraduationCap className={className} {...props} />;
    case 'vehicle_document':
      return <FileText className={className} {...props} />;
    case 'keys':
      return <KeyRound className={className} {...props} />;
    case 'other':
      return <ShieldQuestion className={className} {...props} />;
    default:
      return <HelpCircle className={className} {...props} />;
  }
};
