export type PageId =
  | "home"
  | "meet-the-team"
  | "contact"
  | "ultrasound-scans"
  | "sports-injuries"
  | "wellness-check-ups"
  | "chronic-disease"
  | "dental-care"
  | "eye-care"
  | "iv-therapy"
  | "mental-health"
  | "minor-procedures";

export interface ServiceItem {
  id: PageId;
  title: string;
  heroImage?: string;
  shortDesc: string;
  fullTitle: string;
  subTitle: string;
  longDescParagraphs: string[];
  featuresTitle: string;
  features: string[];
  extraSections?: { title: string; content: string[] }[];
}

export interface Practitioner {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  bio: string;
  avatarText: string;
  avatarGradient: string;
  image?: string;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}
