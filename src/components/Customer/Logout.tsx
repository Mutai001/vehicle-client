import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';
import Footer from '../Common/Footer';

const Logout: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing authentication tokens)
    localStorage.removeItem('authToken'); // Example of removing auth token from localStorage

    // Optionally, clear user session or additional data here

    // Redirect to home page
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <UserHeader
        onToggleSidebar={() => {
          // Implement sidebar toggle logic if necessary
          console.log('Sidebar toggle logic here');
        }}
        isSidebarCollapsed={false} // Adjust based on your app state or props
      />
      <main className="flex-grow flex items-center justify-center p-4">
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Logout
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Logout Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleLogout} color="secondary" autoFocus>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default Logout;
