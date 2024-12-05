import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const Documentation: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Documentation
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to PersonaGen! This innovative tool is designed to help you create detailed, realistic personas quickly and effortlessly. Whether you're a marketer, game developer, or UX designer, PersonaGen leverages advanced AI technology to generate personas that meet your specific needs.
      </Typography>
      <Typography variant="h5" gutterBottom>
        What is PersonaGen?
      </Typography>
      <Typography variant="body1" paragraph>
        PersonaGen is an open-source project that simplifies the process of persona creation. It uses cutting-edge AI algorithms to generate comprehensive persona profiles, helping you understand your target audience better and make informed decisions.
      </Typography>
    </Box>
  );
};

export default Documentation;
