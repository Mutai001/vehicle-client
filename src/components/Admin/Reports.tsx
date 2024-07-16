import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Modal, Backdrop, Fade, Divider } from '@mui/material';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';
import axios from 'axios';
import Footer from '../Common/Footer';
import AdminSidebar from './sidebar';
import Header from '../Common/Header';

const Reports: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [modalData, setModalData] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentsResponse = await axios.get('http://localhost:8000/api/payments');
        setPayments(paymentsResponse.data);

        const bookingsResponse = await axios.get('http://localhost:8000/api/bookings');
        setBookings(bookingsResponse.data);

        const usersResponse = await axios.get('http://localhost:8000/api/users');
        setUsers(usersResponse.data);

        const locationsResponse = await axios.get('http://localhost:8000/api/locations');
        setLocations(locationsResponse.data);

        const ticketsResponse = await axios.get('http://localhost:8000/api/customer-support-tickets');
        setTickets(ticketsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDownloadReports = () => {
    // Logic to download reports (mocked for example)
    alert('Downloading reports...');
  };

  const handleOpenModal = (data: any[]) => {
    setModalData(data);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Calculate total counts for each category
  const totalPayments = payments.length;
  const totalBookings = bookings.length;
  const totalUsers = users.length;
  const totalLocations = locations.length;
  const totalTickets = tickets.length;

  return (
    <>
      <Header />
      <div className="flex">
        <AdminSidebar />
        <Box className="bg-white p-4 rounded-lg shadow-md">
          <Typography variant="h2" className="text-xl font-bold mb-2">
            Reports
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card onClick={() => handleOpenModal(payments)}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Payments Report ({totalPayments} payments)
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card onClick={() => handleOpenModal(bookings)}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Bookings Report ({totalBookings} bookings)
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card onClick={() => handleOpenModal(users)}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Users Report ({totalUsers} users)
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card onClick={() => handleOpenModal(locations)}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Locations Report ({totalLocations} locations)
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card onClick={() => handleOpenModal(tickets)}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Customer Support Tickets Report ({totalTickets} tickets)
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box mt={4} textAlign="right">
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveAltIcon />}
              onClick={handleDownloadReports}
            >
              Download Reports
            </Button>
          </Box>
        </Box>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <Box className="modal-paper">
              <Typography variant="h3" className="text-xl font-bold mb-2">
                Detailed Report
              </Typography>
              <Box p={2} className="bg-white rounded-lg shadow-md">
                {modalData.map((item: any, index: number) => (
                  <Box key={index} mb={2}>
                    <Typography variant="body1">
                      {Object.entries(item).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {value as React.ReactNode}
                        </div>
                      ))}
                    </Typography>
                    {index !== modalData.length - 1 && <Divider />}
                  </Box>
                ))}
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default Reports;
