import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  getReportById, 
  getProviderById, 
  getPropertyById, 
  getUserById,
  getHotelStaffById,
  getRentalPropertyById
} from "@/api/reports";
import { 
  ReportModel, 
  ProviderModel, 
  PropertyModel, 
  UserModel,
  HotelStaffModel,
  RentalPropertyModel
} from "@/types/prisma";
import { 
  ArrowLeft, 
  Building, 
  User, 
  Calendar, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  Tag, 
  Home,
  Hotel,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

const ReportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<ReportModel | null>(null);
  const [provider, setProvider] = useState<ProviderModel | null>(null);
  const [property, setProperty] = useState<PropertyModel | null>(null);
  const [user, setUser] = useState<UserModel | null>(null);
  const [hotelStaff, setHotelStaff] = useState<HotelStaffModel | null>(null);
  const [rentalProperty, setRentalProperty] = useState<RentalPropertyModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        const reportData = await getReportById(id);
        if (!reportData) {
          setError("Report not found");
          return;
        }
        
        setReport(reportData);
        
        // Fetch related data in parallel
        const [providerData, propertyData, userData] = await Promise.all([
          getProviderById(reportData.providerId),
          getPropertyById(reportData.propertyId),
          getUserById(reportData.userId)
        ]);
        
        setProvider(providerData || null);
        setProperty(propertyData || null);
        setUser(userData || null);
        
        // Fetch optional related data if IDs exist
        if (reportData.hotelStaffId) {
          const staffData = await getHotelStaffById(reportData.hotelStaffId);
          setHotelStaff(staffData || null);
        }
        
        if (reportData.rentalPropertyId) {
          const rentalData = await getRentalPropertyById(reportData.rentalPropertyId);
          setRentalProperty(rentalData || null);
        }
        
        setError(null);
      } catch (err) {
        setError("Failed to fetch report details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [id]);

  const getBadgeVariant = (category: string) => {
    switch (category) {
      case "Income":
        return "success";
      case "Expense":
        return "destructive";
      case "Revenue":
        return "success";
      case "Performance":
        return "info";
      case "BookingVolume":
        return "secondary";
      case "CommissionSummary":
        return "warning";
      case "Problems":
        return "destructive";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP");
    } catch (error) {
      return "Unknown date";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error || "Report not found"}</span>
        <button 
          className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
          onClick={() => navigate("/reports")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Reports
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        onClick={() => navigate("/reports")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Reports
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold">{report.title}</h1>
            <Badge variant={getBadgeVariant(report.ReportCategory)}>
              {report.ReportCategory}
            </Badge>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 whitespace-pre-line">{report.content}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">Report Details</h2>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p>{formatDate(report.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p>{formatDate(report.updatedAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Slug</p>
                  <p>{report.slug}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">Performance Metrics</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Visitors</p>
                    <p className="font-medium">{report.visitors}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Reservations</p>
                    <p className="font-medium">{report.reservations}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium">${report.amount.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500">Problems</p>
                    <p className="font-medium">{report.problems}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {property && (
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <Building className="h-5 w-5 mr-2 text-blue-500" />
                  Property
                </h2>
                <div className="flex gap-4">
                  {property.featuredImage && (
                    <img 
                      src={property.featuredImage} 
                      alt={property.title} 
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <p className="font-medium">{property.title}</p>
                    <p className="text-sm text-gray-500">{property.type} • {property.bathrooms} bath • {property.size} {property.sizePrefix}</p>
                    <p className="text-sm text-gray-500">{property.status}</p>
                  </div>
                </div>
              </div>
            )}

            {rentalProperty && (
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <Home className="h-5 w-5 mr-2 text-green-500" />
                  Rental Property
                </h2>
                <div className="flex gap-4">
                  {rentalProperty.featuredImage && (
                    <img 
                      src={rentalProperty.featuredImage} 
                      alt={rentalProperty.title} 
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <p className="font-medium">{rentalProperty.title}</p>
                    <p className="text-sm text-gray-500">{rentalProperty.type} • {rentalProperty.bathroom} bath • {rentalProperty.size} {rentalProperty.sizeUnit}</p>
                    <p className="text-sm text-gray-500">{rentalProperty.status}</p>
                  </div>
                </div>
              </div>
            )}

            {user && (
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2 text-purple-500" />
                  User
                </h2>
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={user.image} />
                    <AvatarFallback>{user.name?.substring(0, 2) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.type}</p>
                  </div>
                </div>
              </div>
            )}

            {hotelStaff && (
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <Hotel className="h-5 w-5 mr-2 text-amber-500" />
                  Hotel Staff
                </h2>
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={hotelStaff.image} />
                    <AvatarFallback>{hotelStaff.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{hotelStaff.name}</p>
                    <p className="text-sm text-gray-500">{hotelStaff.email}</p>
                    <p className="text-sm text-gray-500">{hotelStaff.role}</p>
                  </div>
                </div>
              </div>
            )}

            {provider && (
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-indigo-500" />
                  Provider
                </h2>
                <div>
                  <p className="font-medium">{provider.name}</p>
                  <p className="text-sm text-gray-500">Category: {provider.category}</p>
                  <p className="text-sm text-gray-500">Source: {provider.source}</p>
                  <p className="text-sm text-gray-500">Commission: {(provider.commission * 100).toFixed(1)}%</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;