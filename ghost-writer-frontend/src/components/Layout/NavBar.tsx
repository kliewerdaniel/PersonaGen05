// src/components/Layout/NavBar.tsx

import React from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box, Switch, Button } from '@mui/material';
import { Link, useLocation, LinkProps, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { TabProps } from '@mui/material/Tab';
import { useTheme } from '../../context/ThemeContext';

const NavBar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const StyledTab = styled(Tab)<TabProps & LinkProps>(({ theme }) => ({
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'none',
    '&.Mui-selected': {
      color: '#ffffff',
      backgroundColor: '#333333',
      borderRadius: theme.spacing(0.5),
    },
    '&:hover': {
      color: '#aaaaaa',
    },
  }));

  const StyledAppBar = styled(AppBar)({
    backgroundColor: isDarkMode ? '#333333' : '#000000',
    boxShadow: 'none',
  });

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Tabs value={currentPath} TabIndicatorProps={{ style: { backgroundColor: '#ffffff' } }}>
            <StyledTab label="Home" value="/home" component={Link} to="/home" />
            <StyledTab label="Upload Sample" value="/" component={Link} to="/" />
            <StyledTab label="Personas" value="/personas" component={Link} to="/personas" />
            <StyledTab label="Blog Posts" value="/blog-posts" component={Link} to="/blog-posts" />
            <StyledTab label="About" value="/about" component={Link} to="/about" />
            <StyledTab label="Documentation" value="/documentation" component={Link} to="/documentation" />
          </Tabs>
        </Box>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
        <Switch checked={isDarkMode} onChange={toggleTheme} color="default" />
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavBar;
