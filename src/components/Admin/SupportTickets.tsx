import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
  Grid,
  Box,
  Avatar,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import AdminSidebar from './sidebar';
import Footer from '../Common/Footer';
import Header from '../Common/Header';

// Define your MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#f50057', // Pink
    },
    background: {
      default: '#f0f0f0', // Light grey
    },
  },
});

// Define styles using makeStyles with proper typings
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(4),
      borderRadius: theme.spacing(2),
      boxShadow: theme.shadows[4],
      flex: 1, // Ensure the content area stretches
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(8),
      },
    },
    ticketContainer: {
      marginBottom: theme.spacing(4),
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
        backgroundColor: '#1565c0', // Darker shade for hover
      borderRadius: theme.spacing(2),
      boxShadow: theme.shadows[2],
    },
    ticketAvatar: {
      width: theme.spacing(8),
      height: theme.spacing(8),
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      
    },
    ticketTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
      color: theme.palette.primary.main,
    },
    ticketDescription: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(1),
    },
    ticketDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
    },
    ticketDate: {
      color: theme.palette.text.secondary,
    },
    viewDetailsButton: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      textTransform: 'none',
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: '#1565c0', // Darker shade for hover
      },
    },
  })
);

const SupportTickets: React.FC = () => {
  const classes = useStyles();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/customer-support-tickets');
      setTickets(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching support tickets:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={classes.root}>
        <Typography variant="h5" component="h2" gutterBottom>
          Customer Support Tickets
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <AdminSidebar />
        <Box sx={{ flex: 1 }}>
          <Card className={classes.root}>
            <Typography variant="h2" className="text-2xl font-bold mb-4">
              Customer Support Tickets
            </Typography>
            <Grid container spacing={3}>
              {tickets.map((ticket) => (
                <Grid item key={ticket.ticket_id} xs={12} md={6} lg={4}>
                  <Card className={classes.ticketContainer}>
                    <CardContent>
                      <Avatar className={classes.ticketAvatar}>
                        {ticket.subject.charAt(0)}
                      </Avatar>
                      <Typography variant="h6" className={classes.ticketTitle}>
                        {ticket.subject}
                      </Typography>
                      <Typography variant="body2" className={classes.ticketDescription}>
                        {ticket.description}
                      </Typography>
                    </CardContent>
                    <div className={classes.ticketDetails}>
                      <Typography variant="body2" className={classes.ticketDate}>
                        {new Date(ticket.created_at).toLocaleString()}
                      </Typography>
                      <Button variant="contained" className={classes.viewDetailsButton}>
                        View Details
                      </Button>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

const SupportTicketsContainer: React.FC = () => (
  <ThemeProvider theme={theme}>
    <SupportTickets />
  </ThemeProvider>
);

export default SupportTicketsContainer;
