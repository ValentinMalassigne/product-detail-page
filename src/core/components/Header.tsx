import React from 'react';
import { AppBar, Toolbar, Box, Typography, Container, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="secondary" elevation={0} sx={{width: '100%'}}>
      <Container maxWidth={false}>
        <Toolbar 
          sx={{ 
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              width: '100%' 
            }}
          >
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
                fontWeight: 'bold',
              }}
            >
              Assignment
            </Typography>
            
            <Box sx={{ 
              display: { xs: 'none', sm: 'flex' }, 
              flex: 1, 
              justifyContent: 'center' 
            }}>
              <SearchBar />
            </Box>
            
            <IconButton
              href="https://github.com/ValentinMalassigne/product-detail-page"
              sx={{ color: 'black' }}
            >
              <GitHubIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, width: '100%' }}>
            <SearchBar />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;