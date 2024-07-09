import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
} from 'chart.js';

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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Location and Branches</h2>
      <img src="path/to/locations-image.jpg" alt="Locations and Branches" className="w-full h-32 object-cover rounded mb-2" />
      <p className="text-gray-700 mb-4">Manage rental locations and branches.</p>
      <p>Manage locations and branches content here.</p>
      <Pie data={data} options={options} />
    </div>
  );
};

export default LocationsAndBranches;
