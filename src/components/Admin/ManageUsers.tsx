import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Manage Users</h2>
      <img src="path/to/user-image.jpg" alt="Manage Users" className="w-full h-32 object-cover rounded mb-2" />
      <p className="text-gray-700 mb-4">View and manage user accounts and permissions.</p>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ManageUsers;
