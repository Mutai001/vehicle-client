import React, { useEffect, useState } from 'react';
import UserImage from '../../assets/images/user-icon.png';

interface User {
  id: number;
  full_name: string;
  email: string;
  contact_phone?: string;
  address?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<Partial<User> | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://car-rental-backend-c5h2.onrender.com/api/users');
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setUpdatedUser({
            full_name: data.full_name,
            email: data.email,
            contact_phone: data.contact_phone,
            address: data.address,
          });
        } else {
          throw new Error('Failed to fetch user data.');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || !updatedUser) return;

    try {
      const response = await fetch(`https://car-rental-backend-c5h2.onrender.com/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: updatedUser.full_name || user.full_name,
          email: updatedUser.email || user.email,
          contact_phone: updatedUser.contact_phone || user.contact_phone,
          address: updatedUser.address || user.address,
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUser(updatedData);
        setEditMode(false);
        setError(null);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update user.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    try {
      const response = await fetch(`https://car-rental-backend-c5h2.onrender.com/api/users/${user.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUser(null);
        setError(null);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete user.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex">
      <div className="flex-grow bg-gray-100">
        <main className="container mx-auto py-8 px-4">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-96">
            <div className="flex items-center space-x-4">
              <img src={UserImage} alt="User" className="w-16 h-16 rounded-full" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {user?.full_name}
                </h2>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
            <hr className="my-4" />
            {editMode ? (
              <form onSubmit={handleUpdate}>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Edit Profile</h3>
                <div className="grid grid-cols-2 gap-x-4">
                  <label className="text-sm text-gray-600">Full Name:</label>
                  <input
                    type="text"
                    name="full_name"
                    value={updatedUser?.full_name || ''}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md mb-4"
                    required
                  />
                  <label className="text-sm text-gray-600">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={updatedUser?.email || ''}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md mb-4"
                    required
                  />
                  <label className="text-sm text-gray-600">Contact Phone:</label>
                  <input
                    type="text"
                    name="contact_phone"
                    value={updatedUser?.contact_phone || ''}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md mb-4"
                  />
                  <label className="text-sm text-gray-600">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={updatedUser?.address || ''}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md mb-4"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 ml-4"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Profile Information</h3>
                <div className="grid grid-cols-2 gap-x-4">
                  <p className="text-sm text-gray-600">Full Name:</p>
                  <p className="text-sm text-gray-800">{user?.full_name}</p>
                  <p className="text-sm text-gray-600">Email:</p>
                  <p className="text-sm text-gray-800">{user?.email}</p>
                  {user?.contact_phone && (
                    <>
                      <p className="text-sm text-gray-600">Contact Phone:</p>
                      <p className="text-sm text-gray-800">{user.contact_phone}</p>
                    </>
                  )}
                  {user?.address && (
                    <>
                      <p className="text-sm text-gray-600">Address:</p>
                      <p className="text-sm text-gray-800">{user.address}</p>
                    </>
                  )}
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 ml-4 mt-4"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
