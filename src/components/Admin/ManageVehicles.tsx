import React from 'react';
import AdminSidebar from '../Admin/sidebar'; // Assuming this is the correct path to your AdminSidebar component
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; // Importing DirectionsCarIcon from Material UI icons

ChartJS.register(Tooltip, Legend);

const ManageVehicles: React.FC = () => {
  const data = {
    labels: ['SUV', 'Sedan', 'Hatchback', 'Truck', 'Van'],
    datasets: [
      {
        label: '# of Vehicles',
        data: [50, 80, 30, 20, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
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
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || '';

            if (label) {
              label += ': ';
            }
            if (context.raw !== null) {
              label += context.raw;
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <AdminSidebar /> {/* Include AdminSidebar component */}
      <Container maxWidth="lg" style={{ flexGrow: 1, paddingTop: '20px' }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={9}>
            <Paper className="bg-white p-4 rounded-lg shadow-md">
              <Typography variant="h5" className="font-bold mb-2">
                <DirectionsCarIcon fontSize="large" style={{ marginRight: '10px' }} />
                Manage Vehicles
              </Typography>
              <Typography variant="body1" className="text-gray-700 mb-4">
                CRUD operations for adding, editing, and deleting vehicles.
              </Typography>
              <div style={{ height: '400px' }}> {/* Adjust height as necessary */}
                <Bar data={data} options={options} />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ManageVehicles;
