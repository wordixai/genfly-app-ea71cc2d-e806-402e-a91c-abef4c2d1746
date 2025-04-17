import { ReportModel, ProviderModel, PropertyModel, UserModel, HotelStaffModel, RentalPropertyModel } from "@/types/prisma";

// Mock data for reports
const mockReports: ReportModel[] = [
  {
    id: "1",
    cuid: "clq1234abcd",
    title: "Monthly Performance Report",
    content: "This report summarizes the monthly performance metrics for Property A.",
    propertyId: "prop1",
    reservationId: "res1",
    userId: "user1",
    hotelStaffId: "staff1",
    visitors: 245,
    reservations: 32,
    payments: 28,
    amount: 12500,
    checkInDays: 24,
    emptyDays: 6,
    offersCount: 5,
    problems: 2,
    expenses: 3200,
    providerId: "prov1",
    ReportCategory: "Performance",
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-06-15T10:30:00Z",
    slug: "monthly-performance-report-june-2023",
    rentalPropertyId: "rent1"
  },
  {
    id: "2",
    cuid: "clq5678efgh",
    title: "Revenue Analysis Q2",
    content: "Detailed analysis of Q2 revenue streams and booking patterns.",
    propertyId: "prop2",
    reservationId: "res2",
    userId: "user1",
    visitors: 189,
    reservations: 25,
    payments: 22,
    amount: 9800,
    checkInDays: 18,
    emptyDays: 12,
    offersCount: 3,
    problems: 1,
    expenses: 2700,
    providerId: "prov2",
    ReportCategory: "Revenue",
    createdAt: "2023-07-01T14:45:00Z",
    updatedAt: "2023-07-02T09:15:00Z",
    slug: "revenue-analysis-q2-2023"
  },
  {
    id: "3",
    cuid: "clq9012ijkl",
    title: "Booking Volume Report",
    content: "Analysis of booking volumes and patterns for the summer season.",
    propertyId: "prop3",
    reservationId: "res3",
    userId: "user2",
    visitors: 320,
    reservations: 45,
    payments: 42,
    amount: 18500,
    checkInDays: 38,
    emptyDays: 7,
    offersCount: 8,
    problems: 3,
    expenses: 4100,
    providerId: "prov1",
    ReportCategory: "BookingVolume",
    createdAt: "2023-08-10T08:20:00Z",
    updatedAt: "2023-08-11T11:30:00Z",
    slug: "booking-volume-summer-2023",
    rentalPropertyId: "rent2"
  },
  {
    id: "4",
    cuid: "clq3456mnop",
    title: "Expense Tracking Report",
    content: "Detailed breakdown of all expenses for Property C in July.",
    propertyId: "prop1",
    reservationId: "res4",
    userId: "user3",
    visitors: 112,
    reservations: 15,
    payments: 15,
    amount: 6200,
    checkInDays: 12,
    emptyDays: 19,
    offersCount: 2,
    problems: 5,
    expenses: 5800,
    providerId: "prov3",
    ReportCategory: "Expense",
    createdAt: "2023-07-31T16:10:00Z",
    updatedAt: "2023-08-01T09:45:00Z",
    slug: "expense-tracking-july-2023"
  },
  {
    id: "5",
    cuid: "clq7890qrst",
    title: "Commission Summary",
    content: "Summary of all commissions earned from various booking providers.",
    propertyId: "prop2",
    reservationId: "res5",
    userId: "user1",
    visitors: 275,
    reservations: 38,
    payments: 36,
    amount: 15800,
    checkInDays: 32,
    emptyDays: 6,
    offersCount: 7,
    problems: 2,
    expenses: 3900,
    providerId: "prov2",
    ReportCategory: "CommissionSummary",
    createdAt: "2023-09-05T13:25:00Z",
    updatedAt: "2023-09-06T10:15:00Z",
    slug: "commission-summary-q3-2023",
    rentalPropertyId: "rent1"
  }
];

// Mock data for providers
const mockProviders: ProviderModel[] = [
  {
    id: "prov1",
    name: "Airbnb Provider",
    category: "Property",
    apiKey: "airbnb-api-key",
    apiSecret: "airbnb-api-secret",
    baseUrl: "https://api.airbnb.com",
    isActive: true,
    commission: 0.15,
    currency: ["USD", "EUR"],
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
    source: "Airbnb"
  },
  {
    id: "prov2",
    name: "Booking.com Provider",
    category: "Hotel",
    apiKey: "booking-api-key",
    apiSecret: "booking-api-secret",
    baseUrl: "https://api.booking.com",
    isActive: true,
    commission: 0.18,
    currency: ["USD", "GBP", "EUR"],
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-02-01T00:00:00Z",
    source: "Booking"
  },
  {
    id: "prov3",
    name: "Expedia Provider",
    category: "Hotel",
    apiKey: "expedia-api-key",
    apiSecret: "expedia-api-secret",
    baseUrl: "https://api.expedia.com",
    isActive: true,
    commission: 0.17,
    currency: ["USD"],
    createdAt: "2023-02-01T00:00:00Z",
    updatedAt: "2023-02-15T00:00:00Z",
    source: "Expedia"
  }
];

// Mock data for properties
const mockProperties: PropertyModel[] = [
  {
    id: "prop1",
    title: "Luxury Beachfront Villa",
    description: "A stunning beachfront villa with panoramic ocean views.",
    bathrooms: 3,
    size: 2500,
    sizePrefix: "sqft",
    floor: 1,
    buildYear: 2018,
    publishedStatus: "ACTIVE",
    featured: true,
    featuredImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80",
    virtualTour: "https://example.com/virtual-tour/villa1",
    energyEfficiencyRating: "A",
    furnished: true,
    petFriendly: false,
    garageSpaces: 2,
    availabilityDate: "2023-07-01T00:00:00Z",
    isActive: true,
    reviewCount: 28,
    averageRating: 4.8,
    neighborhoodInfo: "Located in an exclusive beachfront community with 24/7 security.",
    saleOff: 0,
    userId: "user1",
    listingId: "list1",
    locationId: "loc1",
    type: "Villa",
    listingType: "ForRent",
    status: "Available",
    contact: "email",
    slug: "luxury-beachfront-villa",
    listingNumber: 1001,
    allowedGuests: 8,
    cancellationPolicy: "Flexible with 48-hour notice",
    checkInTime: "2023-07-01T15:00:00Z",
    checkOutTime: "2023-07-01T11:00:00Z",
    specialNotes: "No parties or events allowed.",
    rules: "No smoking indoors. Quiet hours from 10 PM to 8 AM.",
    nearbyAttractions: "Beach access, restaurants within walking distance.",
    transportOptions: "Car rental recommended, taxi services available.",
    ecoFriendly: true,
    lastUpdated: "2023-06-15T10:30:00Z",
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-06-15T10:30:00Z"
  },
  {
    id: "prop2",
    title: "Modern City Apartment",
    description: "A sleek, modern apartment in the heart of downtown.",
    bathrooms: 2,
    size: 1200,
    sizePrefix: "sqft",
    floor: 15,
    buildYear: 2020,
    publishedStatus: "ACTIVE",
    featured: false,
    featuredImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    virtualTour: "https://example.com/virtual-tour/apt1",
    energyEfficiencyRating: "B",
    furnished: true,
    petFriendly: true,
    garageSpaces: 1,
    availabilityDate: "2023-08-01T00:00:00Z",
    isActive: true,
    reviewCount: 15,
    averageRating: 4.5,
    neighborhoodInfo: "Located in the downtown district, close to shopping and dining.",
    saleOff: 0,
    userId: "user2",
    listingId: "list2",
    locationId: "loc2",
    type: "Apartment",
    listingType: "ForRent",
    status: "Available",
    contact: "phone",
    slug: "modern-city-apartment",
    listingNumber: 1002,
    allowedGuests: 4,
    cancellationPolicy: "Moderate with 7-day notice",
    checkInTime: "2023-08-01T16:00:00Z",
    checkOutTime: "2023-08-01T10:00:00Z",
    specialNotes: "Self check-in with keypad.",
    rules: "No smoking. No parties or events.",
    nearbyAttractions: "Museums, theaters, and restaurants within walking distance.",
    transportOptions: "Public transportation nearby, parking available.",
    ecoFriendly: true,
    lastUpdated: "2023-07-01T14:45:00Z",
    createdAt: "2023-02-20T00:00:00Z",
    updatedAt: "2023-07-01T14:45:00Z"
  },
  {
    id: "prop3",
    title: "Mountain Retreat Cabin",
    description: "A cozy cabin nestled in the mountains with stunning views.",
    bathrooms: 2,
    size: 1800,
    sizePrefix: "sqft",
    floor: 1,
    buildYear: 2015,
    publishedStatus: "ACTIVE",
    featured: true,
    featuredImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2065&q=80",
    virtualTour: "https://example.com/virtual-tour/cabin1",
    energyEfficiencyRating: "B",
    furnished: true,
    petFriendly: true,
    garageSpaces: 1,
    availabilityDate: "2023-09-01T00:00:00Z",
    isActive: true,
    reviewCount: 22,
    averageRating: 4.7,
    neighborhoodInfo: "Located in a peaceful mountain community with hiking trails nearby.",
    saleOff: 10,
    userId: "user3",
    listingId: "list3",
    locationId: "loc3",
    type: "SingleHouse",
    listingType: "ForRent",
    status: "Available",
    contact: "email",
    slug: "mountain-retreat-cabin",
    listingNumber: 1003,
    allowedGuests: 6,
    cancellationPolicy: "Strict with 14-day notice",
    checkInTime: "2023-09-01T15:00:00Z",
    checkOutTime: "2023-09-01T11:00:00Z",
    specialNotes: "4WD vehicle recommended during winter months.",
    rules: "No smoking. Quiet hours from 9 PM to 8 AM.",
    nearbyAttractions: "Hiking trails, lake access, ski resort nearby.",
    transportOptions: "Car required, limited public transportation.",
    ecoFriendly: true,
    lastUpdated: "2023-08-10T08:20:00Z",
    createdAt: "2023-03-10T00:00:00Z",
    updatedAt: "2023-08-10T08:20:00Z"
  }
];

// Mock data for users
const mockUsers: UserModel[] = [
  {
    id: "user1",
    cuid: "clu1234abcd",
    userName: "johndoe",
    name: "John Doe",
    type: "Admin",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    profileUrl: "/users/johndoe",
    email: "john.doe@example.com",
    emailVerified: "2023-01-01T00:00:00Z",
    responseRate: 0.95,
    responseTime: "2023-06-15T10:30:00Z",
    isVerified: true,
    status: "Active",
    language: ["EN", "ES"],
    phone: "+1234567890",
    count: 0,
    jobName: "Property Manager",
    bio: "Experienced property manager with over 10 years in the industry.",
    starRating: 4.8,
    slug: "john-doe",
    lastActiveAt: "2023-09-15T08:30:00Z",
    permissions: ["MANAGE_LISTINGS", "VIEW_ASSETS"],
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-09-15T08:30:00Z"
  },
  {
    id: "user2",
    cuid: "clu5678efgh",
    userName: "janesmith",
    name: "Jane Smith",
    type: "Agent",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    profileUrl: "/users/janesmith",
    email: "jane.smith@example.com",
    emailVerified: "2023-01-15T00:00:00Z",
    responseRate: 0.98,
    responseTime: "2023-06-16T11:45:00Z",
    isVerified: true,
    status: "Active",
    language: ["EN", "FR"],
    phone: "+1987654321",
    count: 0,
    jobName: "Real Estate Agent",
    bio: "Dedicated real estate agent specializing in luxury properties.",
    starRating: 4.9,
    slug: "jane-smith",
    lastActiveAt: "2023-09-16T09:15:00Z",
    permissions: ["VIEW_LISTINGS", "MANAGE_CLIENTS"],
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-09-16T09:15:00Z"
  },
  {
    id: "user3",
    cuid: "clu9012ijkl",
    userName: "mikebrown",
    name: "Mike Brown",
    type: "Owner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    profileUrl: "/users/mikebrown",
    email: "mike.brown@example.com",
    emailVerified: "2023-02-01T00:00:00Z",
    responseRate: 0.9,
    responseTime: "2023-06-17T12:30:00Z",
    isVerified: true,
    status: "Active",
    language: ["EN"],
    phone: "+1122334455",
    count: 0,
    jobName: "Property Owner",
    bio: "Owner of multiple vacation rental properties.",
    starRating: 4.7,
    slug: "mike-brown",
    lastActiveAt: "2023-09-17T10:45:00Z",
    permissions: ["VIEW_OWNED_ASSET", "MANAGE_ASSETS"],
    createdAt: "2023-02-01T00:00:00Z",
    updatedAt: "2023-09-17T10:45:00Z"
  }
];

// Mock data for hotel staff
const mockHotelStaff: HotelStaffModel[] = [
  {
    id: "staff1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Moderator",
    phone: "+1234567890",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Experienced hotel manager with a focus on guest satisfaction.",
    joinedDate: "2023-01-15T00:00:00Z",
    responseRate: 0.95,
    responseTime: "2023-06-15T10:30:00Z",
    hotelId: "hotel1",
    userId: "user1",
    averageRating: 4.8,
    reviewCount: 25,
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-06-15T10:30:00Z"
  }
];

// Mock data for rental properties
const mockRentalProperties: RentalPropertyModel[] = [
  {
    id: "rent1",
    cuid: "clr1234abcd",
    title: "Seaside Apartment",
    description: "Beautiful apartment with ocean views, perfect for a relaxing getaway.",
    type: "Apartment",
    sizePrefix: "sqft",
    propertyRoomId: "room1",
    bathroom: 2,
    size: 1200,
    sizeUnit: "sqft",
    floor: 3,
    insuranceId: "ins1",
    ownerId: "user1",
    status: "Available",
    createdAt: "2023-03-01T00:00:00Z",
    updatedAt: "2023-06-15T10:30:00Z",
    lastUpdatedById: "user1",
    featuredImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
    isAvailable: true,
    totalExpenses: 2500,
    totalPayments: 12000,
    lastPaymentDate: "2023-06-01T00:00:00Z",
    nextPaymentDate: "2023-07-01T00:00:00Z",
    taskStatus: "Completed",
    averageRating: 4.7,
    contractStartDate: "2023-01-01T00:00:00Z",
    contractEndDate: "2023-12-31T00:00:00Z",
    securityDeposit: 1500,
    condition: "Excellent"
  },
  {
    id: "rent2",
    cuid: "clr5678efgh",
    title: "Downtown Loft",
    description: "Modern loft in the heart of downtown, close to restaurants and entertainment.",
    type: "Apartment",
    bathroom: 1,
    size: 950,
    sizeUnit: "sqft",
    floor: 5,
    ownerId: "user2",
    status: "Available",
    createdAt: "2023-04-01T00:00:00Z",
    updatedAt: "2023-07-01T14:45:00Z",
    featuredImage: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    isAvailable: true,
    totalExpenses: 1800,
    totalPayments: 9500,
    lastPaymentDate: "2023-06-15T00:00:00Z",
    nextPaymentDate: "2023-07-15T00:00:00Z",
    taskStatus: "Pending",
    averageRating: 4.5,
    contractStartDate: "2023-02-01T00:00:00Z",
    contractEndDate: "2024-01-31T00:00:00Z",
    securityDeposit: 1200,
    condition: "Good"
  }
];

// API functions
export const getReports = async (): Promise<ReportModel[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockReports;
};

export const getReportById = async (id: string): Promise<ReportModel | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockReports.find(report => report.id === id);
};

export const getReportsByUserId = async (userId: string): Promise<ReportModel[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockReports.filter(report => report.userId === userId);
};

export const getReportsByPropertyId = async (propertyId: string): Promise<ReportModel[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockReports.filter(report => report.propertyId === propertyId);
};

export const getReportsByCategory = async (category: string): Promise<ReportModel[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockReports.filter(report => report.ReportCategory === category);
};

export const getProviderById = async (id: string): Promise<ProviderModel | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProviders.find(provider => provider.id === id);
};

export const getPropertyById = async (id: string): Promise<PropertyModel | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProperties.find(property => property.id === id);
};

export const getUserById = async (id: string): Promise<UserModel | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockUsers.find(user => user.id === id);
};

export const getHotelStaffById = async (id: string): Promise<HotelStaffModel | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockHotelStaff.find(staff => staff.id === id);
};

export const getRentalPropertyById = async (id: string): Promise<RentalPropertyModel | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockRentalProperties.find(property => property.id === id);
};