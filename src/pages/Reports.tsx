import ReportList from "@/components/ReportList";

const Reports = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <p className="text-muted-foreground">
        View and manage all your property reports in one place.
      </p>
      <ReportList />
    </div>
  );
};

export default Reports;