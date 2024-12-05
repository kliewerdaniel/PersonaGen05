import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleViewPersonas = () => {
    navigate('/personas');
  };

  const handleCreatePersona = () => {
    navigate('/generate');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        User Dashboard
      </Typography>
      <Card sx={{ mb: 2, boxShadow: 1 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Manage Personas
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            View and edit your saved personas.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleViewPersonas} sx={{ mt: 2 }}>
            View Personas
          </Button>
        </CardContent>
      </Card>

    </Box>
  );
};

export default Dashboard;
