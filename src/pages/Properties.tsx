import { useState, useEffect } from "react";
import { getReports } from "@/api/reports";
import { ReportModel } from "@/types/prisma";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Home, Hotel } from "lucide-react";

const Properties = () => {
  const [reports, setReports] = useState<ReportModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await getReports();
        setReports(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch reports. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Get unique property IDs from reports
  const uniquePropertyIds = [...new Set(reports.map(report => report.propertyId))];
  const uniqueRentalPropertyIds = [...new Set(reports.filter(report => report.rentalPropertyId).map(report => report.rentalPropertyId))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Properties</h1>
      <p className="text-muted-foreground">
        Overview of all properties with reports.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-blue-500" />
              Properties
            </CardTitle>
            <CardDescription>Regular properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{uniquePropertyIds.length}</div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            {uniquePropertyIds.length} properties with reports
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Home className="h-5 w-5 mr-2 text-green-500" />
              Rental Properties
            </CardTitle>
            <CardDescription>Properties for rent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{uniqueRentalPropertyIds.length}</div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            {uniqueRentalPropertyIds.length} rental properties with reports
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Hotel className="h-5 w-5 mr-2 text-amber-500" />
              Hotels
            </CardTitle>
            <CardDescription>Hotel properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {reports.filter(report => report.hotelStaffId).length > 0 ? 1 : 0}
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            {reports.filter(report => report.hotelStaffId).length > 0 ? 1 : 0} hotels with reports
          </CardFooter>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Property Distribution</h2>
        <div className="h-[200px] flex items-end gap-8 justify-center">
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 w-20 rounded-t-md" style={{ height: `${(uniquePropertyIds.length / (uniquePropertyIds.length + uniqueRentalPropertyIds.length + 1)) * 150}px` }}></div>
            <p className="mt-2 font-medium">Properties</p>
            <p className="text-sm text-muted-foreground">{uniquePropertyIds.length}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-green-500 w-20 rounded-t-md" style={{ height: `${(uniqueRentalPropertyIds.length / (uniquePropertyIds.length + uniqueRentalPropertyIds.length + 1)) * 150}px` }}></div>
            <p className="mt-2 font-medium">Rentals</p>
            <p className="text-sm text-muted-foreground">{uniqueRentalPropertyIds.length}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-amber-500 w-20 rounded-t-md" style={{ height: `${(reports.filter(report => report.hotelStaffId).length > 0 ? 1 : 0) / (uniquePropertyIds.length + uniqueRentalPropertyIds.length + 1) * 150}px` }}></div>
            <p className="mt-2 font-medium">Hotels</p>
            <p className="text-sm text-muted-foreground">{reports.filter(report => report.hotelStaffId).length > 0 ? 1 : 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;