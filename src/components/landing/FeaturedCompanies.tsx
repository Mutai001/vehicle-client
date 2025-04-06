import { useState } from 'react';

const FeaturedCompanies = () => {
  // Fix the TypeScript error by setting the correct type
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Company data with brand colors that match their logos
  const featuredCompanies = [
    { 
      name: 'Mercedes-Benz', 
      description: 'Luxury mobility partner',
      color: '#00173D',
      logoStyle: 'rounded-full bg-white p-4' // Mercedes logos look best in circular format
    },
    { 
      name: 'Toyota', 
      description: 'Reliable fleet provider',
      color: '#EB0A1E',
      logoStyle: 'p-4' // Toyota oval logo
    },
    { 
      name: 'Honda', 
      description: 'Efficiency specialists',
      color: '#047BBE',
      logoStyle: 'p-4' // Honda "H" logo
    },
    { 
      name: 'BMW', 
      description: 'Premium driving experience',
      color: '#0066B1',
      logoStyle: 'rounded-full bg-white p-4' // BMW circular logo
    },
    { 
      name: 'Tesla', 
      description: 'Electric future innovator',
      color: '#E82127',
      logoStyle: 'p-4' // Tesla "T" logo
    },
    { 
      name: 'Volvo', 
      description: 'Safety-focused collaborator',
      color: '#003057',
      logoStyle: 'p-4' // Volvo circle with arrow
    }
  ];

  // Custom SVG logos for each company - simplified representations
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderLogo = (company: { name: string; description?: string; color: string; logoStyle?: string; }, _index: number) => {
    switch(company.name) {
      case 'Mercedes-Benz':
        return (
          <div className="w-32 h-32 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="#00173D" />
              <circle cx="50" cy="50" r="40" fill="white" stroke="#00173D" strokeWidth="1" />
              <path d="M50 10 L50 90 M10 50 L90 50 M26 26 L74 74 M26 74 L74 26" stroke="#00173D" strokeWidth="3" />
            </svg>
          </div>
        );
      case 'Toyota':
        return (
          <div className="w-32 h-24 flex items-center justify-center">
            <svg viewBox="0 0 100 60" className="w-full h-full">
              <ellipse cx="50" cy="30" rx="45" ry="25" fill="#EB0A1E" />
              <ellipse cx="50" cy="30" rx="40" ry="20" fill="white" />
              <ellipse cx="50" cy="30" rx="20" ry="15" fill="#EB0A1E" />
              <path d="M20 30 H80" stroke="#EB0A1E" strokeWidth="3" />
            </svg>
          </div>
        );
      case 'Honda':
        return (
          <div className="w-32 h-32 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="10" y="20" width="80" height="60" rx="5" fill="#047BBE" />
              <path d="M30 20 L30 80 M70 20 L70 80 M30 50 L70 50" stroke="white" strokeWidth="10" />
            </svg>
          </div>
        );
      case 'BMW':
        return (
          <div className="w-32 h-32 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="#000000" />
              <circle cx="50" cy="50" r="42" fill="white" stroke="#000000" strokeWidth="1" />
              <circle cx="50" cy="50" r="35" fill="#000000" stroke="white" strokeWidth="1" />
              <rect x="15" y="15" width="35" height="35" fill="#0066B1" />
              <rect x="50" y="15" width="35" height="35" fill="white" />
              <rect x="15" y="50" width="35" height="35" fill="white" />
              <rect x="50" y="50" width="35" height="35" fill="#0066B1" />
            </svg>
          </div>
        );
      case 'Tesla':
        return (
          <div className="w-32 h-32 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M50 10 L90 90 H10 Z" fill="#E82127" />
              <path d="M50 20 L75 75 H25 Z" fill="white" />
              <rect x="40" y="25" width="20" height="50" fill="#E82127" />
              <rect x="35" y="75" width="30" height="5" fill="#E82127" />
            </svg>
          </div>
        );
      case 'Volvo':
        return (
          <div className="w-32 h-32 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="#003057" />
              <circle cx="50" cy="50" r="40" fill="white" stroke="#003057" strokeWidth="1" />
              <path d="M50 20 L50 80" stroke="#003057" strokeWidth="5" />
              <path d="M30 50 L70 50" stroke="#003057" strokeWidth="5" />
              <path d="M60 40 L70 50 L60 60" fill="none" stroke="#003057" strokeWidth="5" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-32 h-32 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill={company.color} />
              <text x="50" y="55" fontSize="12" textAnchor="middle" fill="white" fontWeight="bold">{company.name}</text>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Partners</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SwiftRide collaborates with the world's leading automotive brands to bring you unparalleled mobility solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredCompanies.map((company, index) => (
            <div 
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 ease-in-out"
              style={{
                transform: hoveredIndex === index ? 'translateY(-10px)' : 'translateY(0)',
                boxShadow: hoveredIndex === index ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="h-48 bg-white flex items-center justify-center p-6 border-b-4" style={{ borderColor: company.color }}>
                <div className="relative w-full h-full flex items-center justify-center">
                  {renderLogo(company, index)}
                </div>
              </div>
              
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold mb-2" style={{ color: company.color }}>{company.name}</h3>
                <p className="text-gray-600">{company.description}</p>
                
                <div className={`mt-4 overflow-hidden ${hoveredIndex === index ? 'h-10 opacity-100' : 'h-0 opacity-0'} transition-all duration-300`}>
                  <button 
                    className="px-4 py-2 rounded-full text-white text-sm font-medium transition-all"
                    style={{ backgroundColor: company.color }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
              
              <div 
                className="absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300"
                style={{ 
                  opacity: hoveredIndex === index ? 0.05 : 0,
                  background: `linear-gradient(45deg, ${company.color}22, transparent)`
                }}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">Interested in becoming a SwiftRide partner?</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
            Join Our Network
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCompanies;