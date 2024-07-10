import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';

const FleetManagement: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Fleet Management
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <IconButton>
              <DirectionsCarIcon fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Typography variant="body1" color="textSecondary">
              View and manage fleet details, including acquisition and maintenance.
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Manage Fleet">
              <IconButton>
                <BuildIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default FleetManagement;
