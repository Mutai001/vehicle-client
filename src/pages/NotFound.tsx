import React from 'react';
import { Typography, Button, Container, Paper } from '@mui/material';
import { styled } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Root = styled('div')(() => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Icon = styled(ErrorOutlineIcon)(() => ({
  fontSize: '6rem',
  color: '#f44336',
}));

const CustomButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const NotFound: React.FC = () => {
  return (
    <Root>
      <Container maxWidth="sm">
        <CustomPaper elevation={3}>
          <Icon />
          <Typography variant="h2" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" gutterBottom>
            The page you are looking for does not exist.
          </Typography>
          <CustomButton
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            href="/"
          >
            Go to Home
          </CustomButton>
        </CustomPaper>
      </Container>
    </Root>
  );
};

export default NotFound;
