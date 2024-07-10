import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Container,
  Paper,
  Typography,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';

ChartJS.register(Tooltip, Legend);

const LocationsAndBranches: React.FC = () => {
  const data = {
    labels: ['Location A', 'Location B', 'Location C', 'Location D', 'Location E'],
    datasets: [
      {
        label: '# of Branches',
        data: [3, 5, 2, 4, 1],
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
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          <StorefrontIcon fontSize="large" style={{ marginRight: '10px' }} />
          Locations and Branches
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Manage rental locations and branches.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Manage locations and branches content here.
        </Typography>
        <Pie data={data} options={options} />
      </Paper>
    </Container>
  );
};

export default LocationsAndBranches;
