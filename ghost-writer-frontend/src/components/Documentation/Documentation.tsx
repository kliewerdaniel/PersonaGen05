import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const Documentation: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Documentation
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to the PersonaGen documentation. Here you will find all the information you need to get started
        and make the most out of our application.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Introduction
      </Typography>
      <Typography variant="body1" paragraph>
        PersonaGen is a powerful tool designed to help users generate personalized AI-driven content effortlessly.
        This documentation provides a comprehensive guide to setting up, using, and troubleshooting the application.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Installation and Setup
      </Typography>
      <Typography variant="body1" paragraph>
        To install PersonaGen, ensure you have Node.js and npm installed. Clone the repository and run 'npm install'
        to install dependencies. Follow the setup guide in the README.md for detailed instructions.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Features
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="AI-Driven Content Generation" secondary="Create personalized content using advanced AI algorithms." />
        </ListItem>
        <ListItem>
          <ListItemText primary="User-Friendly Interface" secondary="Navigate easily with an intuitive and responsive design." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Customizable Personas" secondary="Tailor personas to suit your specific content needs." />
        </ListItem>
      </List>
      <Typography variant="h5" gutterBottom>
        Usage Examples
      </Typography>
      <Typography variant="body1" paragraph>
        Explore our tutorials to learn how to effectively use PersonaGen for your content creation needs. Visit our
        website for more detailed examples and guides.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Troubleshooting
      </Typography>
      <Typography variant="body1" paragraph>
        If you encounter any issues, refer to the FAQ section or contact our support team for assistance. Common issues
        include installation errors and API connectivity problems.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Contact Information
      </Typography>
      <Typography variant="body1" paragraph>
        For support and feedback, reach out to us at support@personagen.com or visit our support page.
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Getting Started Guide" secondary="Learn how to set up and use PersonaGen." />
        </ListItem>
        <ListItem>
          <ListItemText primary="API Reference" secondary="Detailed information about our API endpoints and how to use them." />
        </ListItem>
        <ListItem>
          <ListItemText primary="FAQs" secondary="Find answers to the most frequently asked questions." />
        </ListItem>
      </List>
    </Box>
  );
};

export default Documentation;
