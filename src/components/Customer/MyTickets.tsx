import React from 'react';
import Footer from '../Common/Footer';
import Sidebar from './Sidebar';
// import TicketIcon from '../../assets/images/ticket-icon.png'; // Replace with your ticket icon

const MyTickets: React.FC = () => {
  // Sample data for tickets
  const tickets = [
    {
      id: 1,
      ticketNumber: 'TCKT001',
      issueDate: '2024-07-09',
      status: 'Open',
      priority: 'High',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      ticketNumber: 'TCKT002',
      issueDate: '2024-07-08',
      status: 'Closed',
      priority: 'Low',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    // Add more tickets as needed
  ];

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow bg-gray-100 min-h-screen">
          <main className="container mx-auto py-8 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">My Tickets</h2>
              <div className="grid grid-cols-1 gap-4">
                {tickets.map(ticket => (
                  <div key={ticket.id} className="bg-gray-200 p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {/* <img src={TicketIcon} alt="Ticket Icon" className="w-6 h-6" /> */}
                        <span className="text-lg font-semibold text-gray-800">Ticket #{ticket.ticketNumber}</span>
                      </div>
                      <span className={`text-sm font-semibold ${ticket.status === 'Open' ? 'text-red-600' : 'text-green-600'}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Issue Date: {ticket.issueDate}</p>
                    <p className="text-sm text-gray-600">Priority: {ticket.priority}</p>
                    <p className="text-sm text-gray-600">{ticket.description}</p>
                    <div className="mt-2">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyTickets;
