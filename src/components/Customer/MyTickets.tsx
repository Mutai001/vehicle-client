import React, { useEffect, useState } from 'react';
import Footer from '../Common/Footer';
import Sidebar from './Sidebar';
// import Header from '../Common/Header';
import UserHeader from './UserHeader';


interface Ticket {
  id: number;
  ticketNumber: string;
  issueDate: string;
  status: string;
  priority: string;
  description: string;
  subject?: string;
  created_at?: string;
  updated_at?: string;
}

const MyTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://car-rental-backend-c5h2.onrender.com/api/customer-support-tickets');
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        const data = await response.json();
        console.log('Fetched Data:', data); // Debugging statement to verify data structure
        setTickets(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleViewDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseDetails = () => {
    setSelectedTicket(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <UserHeader onToggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } } isSidebarCollapsed={false} />
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
                        onClick={() => handleViewDetails(ticket)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {selectedTicket && (
                <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                  <h3 className="text-xl font-bold mb-2">Ticket Details</h3>
                  <p><strong>Subject:</strong> {selectedTicket.subject}</p>
                  <p><strong>Description:</strong> {selectedTicket.description}</p>
                  <p><strong>Status:</strong> {selectedTicket.status}</p>
                  <p><strong>Created At:</strong> {selectedTicket.created_at}</p>
                  <p><strong>Updated At:</strong> {selectedTicket.updated_at}</p>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mt-2"
                    onClick={handleCloseDetails}
                  >
                    Close Details
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyTickets;
