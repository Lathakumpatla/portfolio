'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/store/slices/themeSlice';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import LayersIcon from '@mui/icons-material/Layers';
import MessageIcon from '@mui/icons-material/Message';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const SideNav = () => {
  const theme = useTheme();
    const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home', icon: <HomeIcon /> },
    { name: 'About', id: 'about', icon: <PersonIcon /> },
    { name: 'Skills & Tools', id: 'skills', icon: <StarIcon /> },
    { name: 'Experience', id: 'experience', icon: <WorkIcon /> },
    { name: 'Projects', id: 'projects', icon: <LayersIcon /> },
    { name: 'Education', id: 'education', icon: <SchoolIcon /> },
  ];

  const scrollToSection = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    setDrawerOpen(false);
  };

  const navBar = (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        bgcolor: theme.palette.background.default,
        color: '#8b8b9e',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1200,
        boxShadow: 3,
        borderRight: '1px solid #8b8b9e',   
        backgroundImage: theme.palette.background.default,
      }}
    >
      <Box>
        {/* Theme toggle button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
           <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
        </Box>
        
        <List sx={{ mt: 2 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              sx={{
                p: 1.5,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: theme.palette.background.default,
                  '& .MuiListItemText-primary': {
                    color: '#9c27b0',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#9c27b0',
                  },
                },
              }}
            >
              <Box
                component="span"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mr: 2,
                  color: 'inherit',
                  transition: 'color 0.3s ease-in-out',
                  '& .MuiSvgIcon-root': {
                    color: '#8b8b9e',
                  },
                }}
              >
                {item.icon}
              </Box>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: 500,
                  color: 'inherit',
                  transition: 'color 0.3s ease-in-out',
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
      
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <IconButton
  component="a"
  href="https://wa.me/916301774138"
  target="_blank"
  rel="noopener noreferrer"
>
  <WhatsAppIcon sx={{ fontSize: 32 }} />
</IconButton>
        <Typography variant="body2" sx={{ color: '#8b8b9e', textAlign: 'center' }}>
          &copy; 2025 Latha Kumpatla.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <Box
            sx={{
              position: 'fixed',
              top: 16,
              left: 16,
              zIndex: 1300,
              bgcolor: 'rgba(45, 45, 68, 0.8)',
              borderRadius: '50%',
            }}
          >
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#ffc107' }}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 250,
              },
            }}
          >
            <Box
              sx={{
                height: '100%',
                bgcolor: '#2d2d44',
                color: '#8b8b9e',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundImage: 'linear-gradient(180deg, #2d2d44, #1a1a2e)',
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <IconButton  color="inherit">
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#ffc107' }}>
                  <CloseIcon />
                </IconButton>
              </Box>
              
              <List sx={{ mt: 5 }}>
                {navItems.map((item) => (
                  <ListItemButton
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.08)',
                        '& .MuiListItemText-primary': {
                          color: '#ffc107',
                        },
                        '& .MuiSvgIcon-root': {
                          color: '#ffc107',
                        },
                      },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mr: 2,
                        color: 'inherit',
                        transition: 'color 0.3s ease-in-out',
                        '& .MuiSvgIcon-root': {
                          color: '#8b8b9e',
                        },
                      }}
                    >
                      {item.icon}
                    </Box>
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        color: 'inherit',
                        transition: 'color 0.3s ease-in-out',
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconButton sx={{ color: '#8b8b9e', mb: 1 }}>
                  <WhatsAppIcon sx={{ fontSize: 32 }} />
                </IconButton>
                <Typography variant="body2" sx={{ color: '#8b8b9e', textAlign: 'center' }}>
                  &copy; 2025 Latha Kumpatla.
                </Typography>
              </Box>
            </Box>
          </Drawer>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {navBar}
        </motion.div>
      )}
    </>
  );
};

export default SideNav;