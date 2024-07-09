import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
} from 'chart.js';

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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Manage Vehicles</h2>
      <img src="path/to/vehicle-image.jpg" alt="Manage Vehicles" className="w-full h-32 object-cover rounded mb-2" />
      <p className="text-gray-700 mb-4">CRUD operations for adding, editing, and deleting vehicles.</p>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ManageVehicles;
