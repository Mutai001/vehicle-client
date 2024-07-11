import React from 'react';
import { Bar } from 'react-chartjs-2';
import AdminSidebar from '../Admin/sidebar';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Container,
  Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

ChartJS.register(
  Tooltip,
  Legend
);

const AdminOverview: React.FC = () => {
  const theme = useTheme();
  
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Total Bookings',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: theme.palette.primary.light,
        borderColor: theme.palette.primary.main,
        borderWidth: 1,
      },
      {
        label: 'Revenue Generated',
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: theme.palette.secondary.light,
        borderColor: theme.palette.secondary.main,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Total Bookings and Revenue Generated',
      },
    },
  };

  return (
    <>
    <AdminSidebar/>
    <Container maxWidth="md"> {/* Adjusted maxWidth to 'md' for a smaller width */}
      <Typography variant="h5" component="h1" gutterBottom>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                    <DirectionsCarIcon />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6" component="h2">
                    Total Bookings
                  </Typography>
                  <Typography color="textSecondary">
                    Overview of total bookings for the selected period.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar sx={{ backgroundColor: theme.palette.secondary.main }}>
                    <MonetizationOnIcon />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6" component="h2">
                    Revenue Generated
                  </Typography>
                  <Typography color="textSecondary">
                    Overview of revenue generated for the selected period.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Bookings and Revenue Chart
            </Typography>
            <Bar data={data} options={options} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default AdminOverview;
