import React, { useState } from 'react';
import Footer from '../Common/Footer';
import Sidebar from './Sidebar';
import UserHeader from './UserHeader';


const NewTicket: React.FC = () => {
  // State variables for form fields
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'Low',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Sample user_id, replace with actual user_id in a real application
    const user_id = 2;

    const ticketData = {
      user_id,
      subject: formData.subject,
      description: formData.description,
      status: 'Open',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const response = await fetch('https://car-rental-backend-c5h2.onrender.com/api/customer-support-tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit ticket');
      }

      const data = await response.json();
      console.log(data);
      alert('Ticket submitted successfully!');
      
      // Reset form fields
      setFormData({
        subject: '',
        description: '',
        priority: 'Low',
      });
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

  // Function to handle form field changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

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
              <h2 className="text-xl font-bold mb-4">New Ticket</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-800 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-800 mb-1">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="priority" className="block text-sm font-semibold text-gray-800 mb-1">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit Ticket'}
                  </button>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewTicket;
