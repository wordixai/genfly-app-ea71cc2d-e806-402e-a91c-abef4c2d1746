import { ReportModel } from "@/types/prisma";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { BarChart3, Users, Calendar, DollarSign, AlertTriangle } from "lucide-react";

interface ReportCardProps {
  report: ReportModel;
  onClick?: () => void;
}

const ReportCard = ({ report, onClick }: ReportCardProps) => {
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

  const getTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "Unknown date";
    }
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer" 
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{report.title}</CardTitle>
          <Badge variant={getBadgeVariant(report.ReportCategory)}>
            {report.ReportCategory}
          </Badge>
        </div>
        <CardDescription>
          {report.content.length > 100 
            ? `${report.content.substring(0, 100)}...` 
            : report.content}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{report.visitors} visitors</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{report.reservations} reservations</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>${report.amount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <span>{report.problems} issues</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <BarChart3 className="h-3 w-3" />
          <span>Expenses: ${report.expenses.toLocaleString()}</span>
        </div>
        <span>{getTimeAgo(report.createdAt)}</span>
      </CardFooter>
    </Card>
  );
};

export default ReportCard;