import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';

const Reports: React.FC = () => {
  const [bookingSummaries, setBookingSummaries] = useState<any[]>([]);
  const [revenueReports, setRevenueReports] = useState<any[]>([]);
  const [vehicleUtilization, setVehicleUtilization] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const bookingSummariesResponse = await axios.get('http://localhost:8000/api/bookings');
        // ('http://localhost:8000/api/reports/booking-summaries');
        setBookingSummaries(bookingSummariesResponse.data);

        const revenueReportsResponse = await axios.get('http://localhost:8000/api/reports/payments');
        // ('http://localhost:8000/api/reports/revenue-reports');
        setRevenueReports(revenueReportsResponse.data);

        const vehicleUtilizationResponse = await axios.get('http://localhost:8000/api/users');
        // ('http://localhost:8000/api/reports/vehicle-utilization');
        setVehicleUtilization(vehicleUtilizationResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setError('Failed to fetch reports');
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h5">Error: {error}</Typography>;
  }

  const handleDownloadReport = (reportType: string) => {
    // Placeholder for download functionality
    console.log(`Downloading ${reportType} report...`);
  };

  return (
    <Box className="bg-white p-4 rounded-lg shadow-md">
      <Typography variant="h5" className="font-bold mb-4">
        Reports
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card className="bg-gray-100">
            <CardContent>
              <Typography variant="h6" className="mb-2">
                Booking Summaries
              </Typography>
              {bookingSummaries.map((summary, index) => (
                <Typography key={index} className="text-gray-700">
                  {summary.date}: {summary.count} bookings
                </Typography>
              ))}
              <Button variant="contained" color="primary" className="mt-4" onClick={() => handleDownloadReport('booking-summaries')}>
                Download
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="bg-gray-100">
            <CardContent>
              <Typography variant="h6" className="mb-2">
                Revenue Reports
              </Typography>
              {revenueReports.map((report, index) => (
                <Typography key={index} className="text-gray-700">
                  {report.month}: ${report.revenue}
                </Typography>
              ))}
              <Button variant="contained" color="primary" className="mt-4" onClick={() => handleDownloadReport('revenue-reports')}>
                Download
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="bg-gray-100">
            <CardContent>
              <Typography variant="h6" className="mb-2">
                Vehicle Utilization Statistics
              </Typography>
              {vehicleUtilization.map((utilization, index) => (
                <Typography key={index} className="text-gray-700">
                  {utilization.vehicle}: {utilization.utilization}%
                </Typography>
              ))}
              <Button variant="contained" color="primary" className="mt-4" onClick={() => handleDownloadReport('vehicle-utilization')}>
                Download
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;
