import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getReports } from "@/api/reports";
import { ReportModel } from "@/types/prisma";
import ReportCard from "@/components/ReportCard";
import { Search, Filter } from "lucide-react";

const ReportList = () => {
  const [reports, setReports] = useState<ReportModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
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

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         report.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter ? report.ReportCategory === filter : true;
    
    return matchesSearch && matchesFilter;
  });

  const uniqueCategories = [...new Set(reports.map(report => report.ReportCategory))];

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
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search reports..."
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white"
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value || null)}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          No reports found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map(report => (
            <ReportCard 
              key={report.id} 
              report={report} 
              onClick={() => handleReportClick(report.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportList;