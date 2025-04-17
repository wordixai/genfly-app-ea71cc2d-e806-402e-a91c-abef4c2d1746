// Generated types based on Prisma schema

export enum ReportCategory {
  Income = "Income",
  Expense = "Expense",
  Numbers = "Numbers",
  Problems = "Problems",
  Tasks = "Tasks",
  Offers = "Offers",
  Price = "Price",
  CommissionSummary = "CommissionSummary",
  BookingVolume = "BookingVolume",
  Revenue = "Revenue",
  Performance = "Performance"
}

export enum BookingSource {
  Direct = "Direct",
  Airbnb = "Airbnb",
  Booking = "Booking",
  Expedia = "Expedia",
  Other = "Other",
  Agency = "Agency",
  Provider = "Provider"
}

export enum Currency {
  TL = "TL",
  EUR = "EUR",
  USD = "USD",
  GBP = "GBP",
  CAD = "CAD",
  YEN = "YEN",
  AUD = "AUD",
  CHF = "CHF",
  SEK = "SEK",
  NZD = "NZD",
  Crypto = "Crypto"
}

export enum Category {
  Hotel = "Hotel",
  Property = "Property",
  Car = "Car",
  Experience = "Experience",
  Ticket = "Ticket"
}

export interface ReportModel {
  id: string;
  cuid: string;
  title: string;
  content: string;
  propertyId: string;
  reservationId: string;
  userId: string;
  hotelStaffId?: string;
  visitors: number;
  reservations: number;
  payments: number;
  amount: number;
  checkInDays: number;
  emptyDays: number;
  offersCount: number;
  problems: number;
  expenses: number;
  providerId: string;
  ReportCategory: ReportCategory;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  slug: string;
  rentalPropertyId?: string;
}

export interface ProviderModel {
  id: string;
  name: string;
  category: Category;
  apiKey?: string;
  apiSecret?: string;
  baseUrl?: string;
  isActive: boolean;
  commission: number;
  currency: Currency[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  source: BookingSource;
}

export interface PropertyModel {
  id: string;
  title: string;
  description: string;
  bathrooms: number;
  size: number;
  sizePrefix: string;
  floor: number;
  buildYear: number;
  publishedStatus: string;
  featured: boolean;
  featuredImage?: string;
  virtualTour?: string;
  energyEfficiencyRating?: string;
  videoUrl?: string;
  furnished: boolean;
  petFriendly: boolean;
  garageSpaces: number;
  availabilityDate: string;
  isActive: boolean;
  reviewCount?: number;
  averageRating?: number;
  neighborhoodInfo?: string;
  saleOff?: number;
  userId: string;
  listingId?: string;
  locationId?: string;
  facilityId?: string;
  agencyId?: string;
  type: string;
  listingType: string;
  status: string;
  contact: string;
  slug: string;
  listingNumber?: number;
  allowedGuests?: number;
  cancellationPolicy?: string;
  checkInTime?: string;
  checkOutTime?: string;
  specialNotes?: string;
  rules?: string;
  nearbyAttractions?: string;
  transportOptions?: string;
  ecoFriendly: boolean;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface UserModel {
  id: string;
  cuid: string;
  userName?: string;
  name?: string;
  type: string;
  image?: string;
  bgImage?: string;
  profileUrl?: string;
  email?: string;
  emailVerified?: string;
  responseRate?: number;
  responseTime?: string;
  isVerified: boolean;
  password?: string;
  status: string;
  language: string[];
  phone?: string;
  count: number;
  href?: string;
  jobName?: string;
  bio?: string;
  gender?: string;
  birthday?: string;
  starRating?: number;
  slug?: string;
  lastActiveAt?: string;
  permissions: string[];
  locationId?: string;
  offerId?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  lastLoginAt?: string;
  token?: string;
  insuranceId?: string;
  resetToken?: string;
  resetTokenExpiry?: string;
  socialMedia?: any;
}

export interface HotelStaffModel {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  image?: string;
  bio?: string;
  joinedDate: string;
  responseRate?: number;
  responseTime?: string;
  hotelId: string;
  userId?: string;
  averageRating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface RentalPropertyModel {
  id: string;
  cuid: string;
  title: string;
  description: string;
  type: string;
  sizePrefix?: string;
  propertyRoomId?: string;
  bathroom: number;
  size: number;
  sizeUnit: string;
  floor: number;
  insuranceId?: string;
  ownerId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  lastUpdatedById?: string;
  featuredImage?: string;
  isAvailable: boolean;
  totalExpenses?: number;
  totalPayments?: number;
  lastPaymentDate?: string;
  nextPaymentDate?: string;
  taskStatus: string;
  averageRating?: number;
  contractStartDate?: string;
  contractEndDate?: string;
  securityDeposit?: number;
  condition?: string;
}