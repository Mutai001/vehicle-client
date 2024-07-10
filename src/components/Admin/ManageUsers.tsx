import React from 'react';
import AdminSidebar from '../Admin/sidebar'; // Assuming this is the correct path to your AdminSidebar component
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group'; // Importing GroupIcon from Material UI icons

ChartJS.register(ArcElement, Tooltip, Legend);

const ManageUsers: React.FC = () => {
  const data = {
    labels: ['Active Users', 'Inactive Users', 'Pending Users'],
    datasets: [
      {
        label: '# of Users',
        data: [300, 50, 100],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
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
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <AdminSidebar /> {/* Include AdminSidebar component */}
      <Container maxWidth="lg" style={{ flexGrow: 1, paddingTop: '20px' }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={9}>
            <Paper className="bg-white p-4 rounded-lg shadow-md">
              <Typography variant="h5" className="font-bold mb-2">
                <GroupIcon fontSize="large" style={{ marginRight: '10px' }} />
                Manage Users
              </Typography>
              <Typography variant="body1" className="text-gray-700 mb-4">
                View and manage user accounts and permissions.
              </Typography>
              <div style={{ height: '400px' }}> {/* Adjust height as necessary */}
                <Pie data={data} options={options} />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ManageUsers;
