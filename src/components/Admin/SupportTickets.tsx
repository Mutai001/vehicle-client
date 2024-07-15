import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from '@mui/material';

// Define styles using makeStyles with proper typings
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'white',
      padding: theme.spacing(4),
      borderRadius: theme.spacing(2),
      boxShadow: theme.shadows[4],
    },
    ticketContainer: {
      marginBottom: theme.spacing(4),
    },
    ticketImage: {
      width: '100%',
      height: 200,
      objectFit: 'cover',
      borderRadius: theme.spacing(1),
    },
    ticketTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
    },
    ticketDescription: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(1),
    },
    ticketDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(2),
    },
    viewDetailsButton: {
      color: theme.palette.primary.main,
      textTransform: 'none',
      fontWeight: 'bold',
    },
  })
);

const SupportTickets: React.FC = () => {
  const classes = useStyles(); // Use useStyles to apply styles
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
    <div className={classes.root}>
      <Typography variant="h5" component="h2" gutterBottom>
        Customer Support Tickets
      </Typography>
      {tickets.map((ticket) => (
        <Card key={ticket.id} className={classes.ticketContainer}>
          <CardContent>
            <img src={ticket.image_url} alt="Customer Support" className={classes.ticketImage} />
            <Typography variant="h6" className={classes.ticketTitle}>
              {ticket.subject}
            </Typography>
            <Typography variant="body2" className={classes.ticketDescription}>
              {ticket.description}
            </Typography>
          </CardContent>
          <div className={classes.ticketDetails}>
            <Typography variant="body2" className={classes.ticketDate}>
              {ticket.created_at}
            </Typography>
            <Button variant="text" className={classes.viewDetailsButton}>
              View Details
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SupportTickets;
