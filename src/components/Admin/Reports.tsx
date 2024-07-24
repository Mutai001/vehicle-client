import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Divider, Avatar, Modal, Backdrop, Fade } from '@mui/material';
import { SaveAlt as SaveAltIcon, AttachMoney, Book, Person, LocationOn, SupportAgent } from '@mui/icons-material';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Footer from '../Common/Footer';
import AdminSidebar from './sidebar';
import AdminHeader from './AdminHeader';


const Reports: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [reportTitle, setReportTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentsResponse = await axios.get('https://car-rental-backend-c5h2.onrender.com/api/payments');
        setPayments(paymentsResponse.data);

        const bookingsResponse = await axios.get('https://car-rental-backend-c5h2.onrender.com/api/bookings');
        setBookings(bookingsResponse.data);

        const usersResponse = await axios.get('https://car-rental-backend-c5h2.onrender.com/api/users');
        setUsers(usersResponse.data);

        const locationsResponse = await axios.get('https://car-rental-backend-c5h2.onrender.com/api/locations');
        setLocations(locationsResponse.data);

        const ticketsResponse = await axios.get('https://car-rental-backend-c5h2.onrender.com/api/customer-support-tickets');
        setTickets(ticketsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (data: any[], title: string) => {
    setSelectedReport(data);
    setReportTitle(title);
    setOpenModal(true);
  };

  const handleDownloadPDF = async () => {
    const input = document.getElementById('report-content');

    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${reportTitle}.pdf`);
    }
  };

  const handleConfirmDownload = () => {
    setOpenModal(false);
    setTimeout(handleDownloadPDF, 500); // Ensure the modal is closed before starting the download
  };

  // Calculate total counts for each category
  const totalPayments = payments.length;
  const totalBookings = bookings.length;
  const totalUsers = users.length;
  const totalLocations = locations.length;
  const totalTickets = tickets.length;

  const statCards = [
    { title: 'Payments Report', count: totalPayments, icon: <AttachMoney fontSize="large" />, color: 'green', data: payments },
    { title: 'Bookings Report', count: totalBookings, icon: <Book fontSize="large" />, color: 'blue', data: bookings },
    { title: 'Users Report', count: totalUsers, icon: <Person fontSize="large" />, color: 'purple', data: users },
    { title: 'Locations Report', count: totalLocations, icon: <LocationOn fontSize="large" />, color: 'orange', data: locations },
    { title: 'Customer Support Tickets Report', count: totalTickets, icon: <SupportAgent fontSize="large" />, color: 'red', data: tickets },
  ];

  return (
    <>
      <AdminHeader onToggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } } isSidebarCollapsed={false} />
      <div className="flex">
        <AdminSidebar />
        <Box className="bg-white p-4 rounded-lg shadow-md" style={{ flex: 1 }}>
          <Typography variant="h2" className="text-xl font-bold mb-2">
            Reports
          </Typography>
          <Grid container spacing={4}>
            {statCards.map((card, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  onClick={() => handleOpenModal(card.data, card.title)}
                  style={{ borderLeft: `5px solid ${card.color}`, cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <CardContent>
                    <Avatar style={{ backgroundColor: card.color, marginBottom: '10px' }}>{card.icon}</Avatar>
                    <Typography variant="h5" gutterBottom>
                      {card.title} ({card.count})
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box id="report-content" style={{ display: 'none' }}>
          <Typography variant="h3" className="text-xl font-bold mb-2">
            Detailed Report
          </Typography>
          <Box p={2} className="bg-white rounded-lg shadow-md">
            {selectedReport.map((item: any, index: number) => (
              <Box key={index} mb={2}>
                <Typography variant="body1">
                  {Object.entries(item).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong> {value as React.ReactNode}
                    </div>
                  ))}
                </Typography>
                {index !== selectedReport.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        </Box>
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            component="div"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              backgroundColor: 'white',
              boxShadow: '24px',
              padding: 24,
            }}
          >
            <Typography variant="h3" className="text-xl font-bold mb-2">
              {reportTitle}
            </Typography>
            <Box p={2} className="bg-white rounded-lg shadow-md" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {selectedReport.map((item: any, index: number) => (
                <Box key={index} mb={2}>
                  <Typography variant="body1">
                    {Object.entries(item).map(([key, value]) => (
                      <div key={key}>
                        <strong>{key}:</strong> {value as React.ReactNode}
                      </div>
                    ))}
                  </Typography>
                  {index !== selectedReport.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>
            <Box mt={4} textAlign="right">
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveAltIcon />}
                onClick={handleConfirmDownload}
              >
                Download PDF
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Footer />
    </>
  );
};

export default Reports;
