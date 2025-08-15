/* --------- COMMON TYPES --------- */
export type ISODateString = string;

export type PaymentMethod = 'cash' | 'bank transfer' | 'online' | 'other';
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';
export type GradingSystem = 'percentage' | 'GPA' | 'letter';
export type EntityGender = 'male' | 'female' | 'other';
export type StudentStatus = 'active' | 'inactive' | 'graduated' | 'transferred';

/* --------- SUPERADMIN --------- */
export interface SuperAdmin {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;

  // Access to all schools
  schools: School[];
}

/* --------- TOP-LEVEL ENTITIES --------- */
export interface School {
  id: string;
  superAdminId:string;
  name: string;
  address?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;

  // Core Users
  teachers: Teacher[];
  students: Student[];
  parents: Parent[];

  // Academic structure
  classes: Class[];
  subjects: Subject[];

  // Exams & Results
  exams: Exam[];
  examResults: ExamResult[];

  // Attendance tracking
  attendanceRecords: Attendance[];

  // Fee management
  fees: Fee[];
  feePayments: FeePayment[];

  // Library management
  libraryBooks: LibraryBook[];
  issuedBooks: IssuedBook[];

  // Transport management
  transportVehicles: TransportVehicle[];
  transportRoutes: TransportRoute[];
  transportAssignments: TransportAssignment[];

  // Hostel management
  hostelRooms: HostelRoom[];
  hostelResidents: HostelResident[];

  // Communication modules
  notices: Notice[];
  homeworkAssignments: Homework[];

  // Inventory management
  inventoryItems: InventoryItem[];

  // Events & calendar
  events: Event[];

  // Reports and analytics
  reports: Report[];

  // Config & Settings
  settings: SchoolSettings;

  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

/* --------- CORE USER ENTITIES --------- */
export interface Teacher {
  id: string;
  schoolId: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  gender?: EntityGender | null;
  dateOfBirth?: ISODateString | null;
  email: string;
  phone?: string | null;
  address?: string | null;
  profileImageUrl?: string | null;
  subjectIds: string[];
  qualification?: string | null;
  experienceYears?: number | null;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

export interface Student {
  id: string;
  schoolId: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  gender?: EntityGender | null;
  dateOfBirth?: ISODateString | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  profileImageUrl?: string | null;
  classId: string;
  rollNumber?: string | null;
  admissionNumber?: string | null;
  admissionDate?: ISODateString | null;
  section?: string | null;
  parentIds: string[];
  subjectIds?: string[];
  hostelRoomId?: string | null;
  transportAssignmentId?: string | null;
  status?: StudentStatus | null;
  remarks?: string | null;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

export interface Parent {
  id: string;
  schoolId: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  gender?: EntityGender | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  profileImageUrl?: string | null;
  occupation?: string | null;
  relationshipToStudent?: string | null;
  studentIds: string[];
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

/* --------- ACADEMIC STRUCTURE --------- */
export interface Class {
  id: string;
  schoolId: string;
  name: string;
  teacherIds: string[];
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

export interface Subject {
  id: string;
  schoolId: string;
  name: string;
  classIds: string[];
  teacherIds: string[];
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

/* --------- EXAMS & RESULTS --------- */
export interface Exam {
  id: string;
  schoolId: string;
  name: string;
  classId: string;
  date: ISODateString;
  subjectIds: string[];
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

export interface ExamResult {
  id: string;
  schoolId: string;
  examId: string;
  studentId: string;
  marksObtained: number;
  remarks?: string | null;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

/* --------- ATTENDANCE --------- */
export interface Attendance {
  id: string;
  schoolId: string;
  studentId: string;
  classId: string;
  date: ISODateString;
  status: AttendanceStatus;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

/* --------- FEES & PAYMENTS --------- */
export interface Fee {
  id: string;
  schoolId: string;
  name: string;
  amount: number;
  dueDate: ISODateString;
  classId?: string | null;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

export interface FeePayment {
  id: string;
  schoolId: string;
  feeId: string;
  studentId: string;
  amountPaid: number;
  paymentDate: ISODateString;
  paymentMethod: PaymentMethod;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

/* --------- LIBRARY --------- */
export interface LibraryBook {
  id: string;
  schoolId: string;
  title: string;
  author: string;
  isbn?: string | null;
  quantityAvailable: number;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

export interface IssuedBook {
  id: string;
  schoolId: string;
  bookId: string;
  studentId: string;
  issueDate: ISODateString;
  returnDate?: ISODateString | null;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

/* --------- TRANSPORT --------- */
export interface TransportVehicle {
  id: string;
  schoolId: string;
  vehicleNumber: string;
  driverName: string;
  capacity: number;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

export interface TransportRoute {
  id: string;
  schoolId: string;
  name: string;
  stops: string[];
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

export interface TransportAssignment {
  id: string;
  schoolId: string;
  vehicleId: string;
  routeId: string;
  assignedDate: ISODateString;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

/* --------- HOSTEL --------- */
export interface HostelRoom {
  id: string;
  schoolId: string;
  roomNumber: string;
  capacity: number;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

export interface HostelResident {
  id: string;
  schoolId: string;
  studentId: string;
  roomId: string;
  checkInDate: ISODateString;
  checkOutDate?: ISODateString | null;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

/* --------- COMMUNICATION --------- */
export interface Notice {
  id: string;
  schoolId: string;
  title: string;
  content: string;
  datePosted: ISODateString;
  expiryDate?: ISODateString | null;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

export interface Homework {
  id: string;
  schoolId: string;
  classId: string;
  subjectId: string;
  title: string;
  description: string;
  assignedDate: ISODateString;
  dueDate: ISODateString;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

/* --------- INVENTORY --------- */
export interface InventoryItem {
  id: string;
  schoolId: string;
  name: string;
  quantity: number;
  category?: string | null;
  purchaseDate?: ISODateString | null;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

/* --------- EVENTS --------- */
export interface Event {
  id: string;
  schoolId: string;
  title: string;
  description?: string | null;
  date: ISODateString;
  location?: string | null;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

/* --------- REPORTS --------- */
export interface Report<T = unknown> {
  id: string;
  schoolId: string;
  title: string;
  generatedDate: ISODateString;
  reportType: string;
  data: T;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

/* --------- SETTINGS --------- */
export interface SchoolSettings {
  schoolId: string;
  academicYearStart: ISODateString;
  academicYearEnd: ISODateString;
  gradingSystem: GradingSystem;
  timezone?: string | null;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}



// reuseable form
export type FormFieldOption = {
  label: string;
  value: string;
};

export type FormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: FormFieldOption[]; // <-- only for select fields
};


// types.ts
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}
