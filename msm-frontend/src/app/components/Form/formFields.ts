// components/Form/formFields.ts
import { FormField } from "@/app/types";

// 🔹 School Fields
export const schoolFormFields: FormField[] = [
  { name: "name", label: "School Name", type: "text", required: true },
  { name: "registrationNumber", label: "Registration Number", type: "text" },
  { 
    name: "type", 
    label: "Type", 
    type: "select", 
    options: ["public", "private", "international"], 
    required: true 
  },
  { name: "address", label: "Address", type: "textarea" },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "postalCode", label: "Postal Code", type: "text" },
  { name: "contactEmail", label: "Contact Email", type: "email" },
  { name: "contactPhone", label: "Contact Phone", type: "text" },
  { name: "websiteUrl", label: "Website", type: "url" },
  { name: "logoUrl", label: "Logo", type: "file" },
  { name: "establishedYear", label: "Established Year", type: "number" },
  { 
    name: "status", 
    label: "Status", 
    type: "select", 
    options: ["active", "inactive"], 
    required: true 
  },
];
