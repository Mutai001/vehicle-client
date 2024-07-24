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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { Add, Delete } from '@mui/icons-material';
import AdminSidebar from './sidebar';
import Footer from '../Common/Footer';
// import Header from '../Common/Header';
import AdminHeader from './AdminHeader';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f0f0f0',
    },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(4),
      borderRadius: theme.spacing(2),
      boxShadow: theme.shadows[4],
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      padding: theme.spacing(4),
    },
    ticketContainer: {
      marginBottom: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
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
        backgroundColor: '#1565c0',
      },
    },
  })
);

const statusColors: { [key: string]: string } = {
  open: '#4caf50',
  pending: '#ff9800',
  resolved: '#2196f3',
  closed: '#f44336',
};

interface Ticket {
  ticket_id: number;
  user_id: number;
  subject: string;
  description: string;
  created_at: string;
  status: string;
}

const SupportTickets: React.FC = () => {
  const classes = useStyles();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [currentTicket, setCurrentTicket] = useState<Partial<Ticket>>({});
  const [dialogType, setDialogType] = useState<'create' | 'edit'>('create');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 2 columns x 2 rows

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get<Ticket[]>('https://car-rental-backend-c5h2.onrender.com/api/customer-support-tickets');
      setTickets(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching support tickets:', error);
      setLoading(false);
    }
  };

  const handleOpenDialog = (type: 'create' | 'edit', ticket?: Ticket) => {
    setDialogType(type);
    if (ticket) {
      setCurrentTicket(ticket);
    } else {
      setCurrentTicket({});
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentTicket({});
  };

  const handleSave = async () => {
    try {
      if (dialogType === 'create') {
        await axios.post('https://car-rental-backend-c5h2.onrender.com/api/customer-support-tickets', currentTicket);
      } else {
        await axios.put(`https://car-rental-backend-c5h2.onrender.com/api/customer-support-tickets/${currentTicket.ticket_id}`, currentTicket);
      }
      fetchTickets();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving ticket data:', error);
    }
  };

  const handleDelete = async (ticket_id: number) => {
    try {
      await axios.delete(`https://car-rental-backend-c5h2.onrender.com/api/customer-support-tickets/${ticket_id}`);
      fetchTickets();
    } catch (error) {
      console.error('Error deleting ticket data:', error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const displayedTickets = tickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
      <AdminHeader onToggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } } isSidebarCollapsed={false} />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <AdminSidebar />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto', padding: 4 }}>
          <Card className={classes.root}>
            <Typography variant="h2" className="text-2xl font-bold mb-4">
              Customer Support Tickets
            </Typography>
            <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenDialog('create')}>
              Add Ticket
            </Button>
            <Grid container spacing={3} style={{ marginTop: 16 }}>
              {displayedTickets.map((ticket) => (
                <Grid item key={ticket.ticket_id} xs={12} sm={6}>
                  <Card className={classes.ticketContainer}>
                    <CardContent>
                      <Avatar className={classes.ticketAvatar} style={{ backgroundColor: statusColors[ticket.status.toLowerCase()] }}>
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
                      <Button variant="contained" className={classes.viewDetailsButton} onClick={() => handleOpenDialog('edit', ticket)}>
                        View Details
                      </Button>
                      <IconButton color="secondary" onClick={() => handleDelete(ticket.ticket_id)}>
                        <Delete />
                      </IconButton>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogType === 'create' ? 'Add Ticket' : 'Edit Ticket'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogType === 'create' ? 'Fill in the details to add a new ticket.' : 'Update the details of the ticket.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Subject"
            type="text"
            fullWidth
            value={currentTicket.subject || ''}
            onChange={(e) => setCurrentTicket({ ...currentTicket, subject: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={currentTicket.description || ''}
            onChange={(e) => setCurrentTicket({ ...currentTicket, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            value={currentTicket.status || ''}
            onChange={(e) => setCurrentTicket({ ...currentTicket, status: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

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
