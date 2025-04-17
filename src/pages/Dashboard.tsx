import { useState, useEffect } from "react";
import { getReports } from "@/api/reports";
import { ReportModel } from "@/types/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Calendar, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";
import ReportCard from "@/components/ReportCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [reports, setReports] = useState<ReportModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleReportClick = (reportId: string) => {
    navigate(`/reports/${reportId}`);
  };

  // Calculate summary metrics
  const totalVisitors = reports.reduce((sum, report) => sum + report.visitors, 0);
  const totalReservations = reports.reduce((sum, report) => sum + report.reservations, 0);
  const totalAmount = reports.reduce((sum, report) => sum + report.amount, 0);
  const totalProblems = reports.reduce((sum, report) => sum + report.problems, 0);
  const totalExpenses = reports.reduce((sum, report) => sum + report.expenses, 0);

  // Get recent reports (last 3)
  const recentReports = [...reports].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 3);

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
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all properties
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reservations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReservations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total bookings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total earnings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProblems.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Reported problems
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>
              Revenue vs. Expenses across all properties
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end gap-2">
              <div className="bg-primary/90 w-full max-w-[60px] rounded-t-md h-[80%] relative group">
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Revenue: ${totalAmount.toLocaleString()}
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
              <div className="bg-destructive/80 w-full max-w-[60px] rounded-t-md h-[40%] relative group">
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Expenses: ${totalExpenses.toLocaleString()}
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>
              <div className="bg-green-500/80 w-full max-w-[60px] rounded-t-md h-[60%] relative group">
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Profit: ${(totalAmount - totalExpenses).toLocaleString()}
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>
              Key metrics summary
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Conversion Rate</span>
              <span className="text-sm font-medium">
                {totalReservations > 0 && totalVisitors > 0 
                  ? `${((totalReservations / totalVisitors) * 100).toFixed(1)}%` 
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Avg. Booking Value</span>
              <span className="text-sm font-medium">
                {totalReservations > 0 
                  ? `$${(totalAmount / totalReservations).toFixed(2)}` 
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Problem Rate</span>
              <span className="text-sm font-medium">
                {totalReservations > 0 
                  ? `${((totalProblems / totalReservations) * 100).toFixed(1)}%` 
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Expense Ratio</span>
              <span className="text-sm font-medium">
                {totalAmount > 0 
                  ? `${((totalExpenses / totalAmount) * 100).toFixed(1)}%` 
                  : "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Reports</h2>
          <button 
            className="text-blue-600 hover:text-blue-800 text-sm"
            onClick={() => navigate("/reports")}
          >
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentReports.map(report => (
            <ReportCard 
              key={report.id} 
              report={report} 
              onClick={() => handleReportClick(report.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;