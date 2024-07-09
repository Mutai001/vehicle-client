import React, { useState } from 'react';
import Footer from '../Common/Footer';
import Sidebar from './Sidebar';

const NewTicket: React.FC = () => {
  // State variables for form fields
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'Low',
  });

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement form submission logic (e.g., send data to backend, show success message, etc.)
    console.log(formData);
    alert('Ticket submitted successfully!');
    // Reset form fields
    setFormData({
      subject: '',
      description: '',
      priority: 'Low',
    });
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
                  >
                    Submit Ticket
                  </button>
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
