import React, { useState } from 'react';
import { Box, Typography, Grid, Card, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';
import AdminSidebar from './sidebar';
import Footer from '../Common/Footer';
// import Header from '../Common/Header';
import AdminHeader from './AdminHeader';


const Settings: React.FC = () => {
  const [siteName, setSiteName] = useState('Car Rental Management System');
  const [timezone, setTimezone] = useState('GMT-5');

  const handleSaveSettings = () => {
    // Logic to save settings
    alert(`Settings saved successfully:\nSite Name: ${siteName}\nTimezone: ${timezone}`);
  };

  return (
    <>
      <AdminHeader onToggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } } isSidebarCollapsed={false} />
      <div className="flex">
        <AdminSidebar />
        <Box className="container mx-auto py-8">
          <Card className="bg-white p-6 rounded-lg shadow-md">
            <Typography variant="h2" className="text-2xl font-bold mb-4">
              Settings
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="siteName"
                  label="Site Name"
                  variant="outlined"
                  fullWidth
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="mb-4"
                />
                <FormControl variant="outlined" fullWidth className="mb-4">
                  <InputLabel id="timezone-label">Timezone</InputLabel>
                  <Select
                    labelId="timezone-label"
                    id="timezone"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value as string)}
                    label="Timezone"
                  >
                    <MenuItem value="GMT-8">GMT-8 (Pacific Time)</MenuItem>
                    <MenuItem value="GMT-5">GMT-5 (Eastern Time)</MenuItem>
                    {/* Add more timezone options as needed */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" className="font-bold mb-2">
                  Notification Settings
                </Typography>
                <div className="flex items-center mb-2">
                  <input type="checkbox" id="emailNotifications" className="mr-2" />
                  <label htmlFor="emailNotifications" className="text-sm">Email Notifications</label>
                </div>
                <div className="flex items-center mb-2">
                  <input type="checkbox" id="smsNotifications" className="mr-2" />
                  <label htmlFor="smsNotifications" className="text-sm">SMS Notifications</label>
                </div>
              </Grid>
            </Grid>
            <div className="mt-6">
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveAltIcon />}
                onClick={handleSaveSettings}
              >
                Save Settings
              </Button>
            </div>
          </Card>
        </Box>
      </div>
      <Footer />
    </>
  );
};

export default Settings;
