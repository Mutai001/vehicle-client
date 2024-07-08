import React from 'react';
import VehicleCard from './VehicleCard'; // Assuming VehicleCard component for displaying each vehicle
// import { object } from 'zod';
import {picOne, picFive, picFour,picThree,picTwo,picSix} from './images';
const FeaturedVehicles: React.FC = () => {
  // Example data for featured vehicles
  const featuredVehicles = [
    {
      id: 1,
      imageUrl: picOne,
      //  '/images/car1.jpg',
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      price: 120,
      description: 'A reliable sedan with advanced features for comfortable travel.',
    },
    {
      id: 2,
      imageUrl: picTwo,
      // '/images/car2.jpg',
      make: 'Ford',
      model: 'F-150',
      year: 2023,
      price: 180,
      description: 'Powerful pickup truck suitable for both work and leisure activities.',
    },
    {
      id: 3,
      imageUrl: picThree,
      // '/images/car3.jpg',
      make: 'Honda',
      model: 'CR-V',
      year: 2022,
      price: 150,
      description: 'Versatile SUV known for its spacious interior and fuel efficiency.',
    },
    {
      id: 4,
      imageUrl: picFour,
      // '/images/car4.jpg',
      make: 'BMW',
      model: 'X5',
      year: 2023,
      price: 250,
      description: 'Luxurious SUV combining elegance with cutting-edge technology.',
    },
    {
      id: 5,
      imageUrl: picFive,
      // '/images/car5.jpg',
      make: 'Tesla',
      model: 'Model S',
      year: 2023,
      price: 300,
      description: 'Electric sedan with unmatched performance and futuristic design.',
    },
     {
      id: 6,
      imageUrl: picSix, 
      // '/images/car5.jpg',
      make: 'Ferrari',
      model: '296 GTS',
      year: 2023,
      price: 330,
      description: 'Electric sedan with unmatched performance and futuristic design.',
    },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Featured Vehicles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
