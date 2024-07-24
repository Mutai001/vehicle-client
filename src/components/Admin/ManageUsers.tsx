import React, { useState, useEffect } from 'react';
import AdminSidebar from '../Admin/sidebar';
// import Header from '../Common/Header';
import AdminHeader from './AdminHeader';
import Footer from '../Common/Footer';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Pagination,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

interface User {
  user_id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  address: string;
  role: string;
  password?: string;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(4);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://car-rental-backend-c5h2.onrender.com/api/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://car-rental-backend-c5h2.onrender.com/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditMode(true);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setEditMode(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (selectedUser) {
      // Ensure all required fields are filled
      if (!selectedUser.full_name || !selectedUser.email || !selectedUser.contact_phone || !selectedUser.address || !selectedUser.role) {
        console.error('All fields are required');
        return;
      }

      if (!editMode && !selectedUser.password) {
        console.error('Password is required for new users');
        return;
      }

      // Send the request to the server
      try {
        if (editMode) {
          await axios.put(`https://car-rental-backend-c5h2.onrender.com/api/users/${selectedUser.user_id}`, selectedUser);
        } else {
          await axios.post('https://car-rental-backend-c5h2.onrender.com/api/users', selectedUser);
        }
        fetchUsers();
        setOpen(false);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (selectedUser) {
      setSelectedUser({ ...selectedUser, [name]: value });
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    if (selectedUser) {
      setSelectedUser({ ...selectedUser, [name as string]: value });
    }
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

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

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
    <AdminHeader onToggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } } isSidebarCollapsed={false} />
    <div style={{ display: 'flex', height: '100vh' }}>
      <AdminSidebar /> {/* Include AdminSidebar component */}
      <Container maxWidth="lg" style={{ flexGrow: 1, paddingTop: '20px' }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={9}>
            <Paper className="bg-white p-4 rounded-lg shadow-md">
              <Typography variant="h5" className="font-bold mb-2">
                <GroupIcon fontSize="large" style={{ marginRight: '10px' }} />
                Manage Users
              </Typography>
              <Typography variant="body1" className="text-gray-700 mb-4">
                View and manage user accounts and permissions.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                style={{ marginBottom: '20px' }}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white"
              >
                Add User
              </Button>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Full Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Contact Phone</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentUsers.map((user) => (
                      <TableRow key={user.user_id}>
                        <TableCell>{user.user_id}</TableCell>
                        <TableCell>{user.full_name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.contact_phone}</TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleEdit(user)}
                            className="text-blue-500"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(user.user_id)}
                            className="text-red-500"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box display="flex" justifyContent="center" marginTop={2}>
                <Pagination
                  count={Math.ceil(users.length / usersPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  className="bg-gradient-to-r from-purple-400 to-pink-500 text-white"
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper className="bg-white p-4 rounded-lg shadow-md">
              <Typography variant="h6" className="font-bold mb-2">
                User Statistics
              </Typography>
              <div style={{ height: '250px' }}>
                <Pie data={data} options={options} />
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editMode ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {editMode ? 'Edit the details of the user.' : 'Enter the details of the new user.'}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="full_name"
              label="Full Name"
              type="text"
              fullWidth
              value={selectedUser ? selectedUser.full_name : ''}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={selectedUser ? selectedUser.email : ''}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="contact_phone"
              label="Contact Phone"
              type="text"
              fullWidth
              value={selectedUser ? selectedUser.contact_phone : ''}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="address"
              label="Address"
              type="text"
              fullWidth
              value={selectedUser ? selectedUser.address : ''}
              onChange={handleChange}
            />
            {!editMode && (
              <TextField
                margin="dense"
                name="password"
                label="Password"
                type="password"
                fullWidth
                value={selectedUser ? selectedUser.password : ''}
                onChange={handleChange}
              />
            )}
            <FormControl fullWidth margin="dense">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={selectedUser ? selectedUser.role : 'user'}
                onChange={handleSelectChange}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              {editMode ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
    <Footer />
  </>
  );
};

export default ManageUsers;
