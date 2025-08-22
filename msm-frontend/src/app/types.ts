export interface School {
  id: string;
  name: string;
  registrationNumber: string;
  type: "public" | "private" | "international";
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  contactEmail?: string;
  contactPhone?: string;
  websiteUrl?: string;
  logoUrl?: string;
  establishedYear?: number;
  settings?: Record<string, any>;
  status?: "active" | "inactive";
}

export type FieldType = 
  | "text" 
  | "email" 
  | "number" 
  | "select" 
  | "date" 
  | "file" 
  | "url"
  | "textarea";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];   // for select dropdown
  required?: boolean;
  span?: number;        // grid column span
}
