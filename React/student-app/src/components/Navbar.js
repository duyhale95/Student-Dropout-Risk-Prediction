import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Container,
  useScrollTrigger, Slide
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Prediction', to: '/prediction' },
  { label: 'History', to: '/history' },
  { label: 'About', to: '/about' },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #0D2D6B 0%, #1565C0 60%, #1E88E5 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 0.5 }}>
            {/* Logo + Title */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <motion.div whileHover={{ rotate: 5, scale: 1.1 }} transition={{ duration: 0.2 }}>
                <Box
                  component="img"
                  src={logo}
                  alt="logo"
                  sx={{ height: 40, mr: 1.5, borderRadius: 1 }}
                />
              </motion.div>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    letterSpacing: '0.08em',
                    lineHeight: 1.1,
                    color: '#fff',
                  }}
                >
                  MACHINE LEARNING
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.04em',
                  }}
                >
                  Student Dropout Predictor
                </Typography>
              </Box>
            </Box>

            {/* Nav Links */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {navLinks.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Button
                    key={link.to}
                    color="inherit"
                    component={RouterLink}
                    to={link.to}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: active ? 700 : 500,
                      fontSize: '0.9rem',
                      color: active ? '#fff' : 'rgba(255,255,255,0.8)',
                      backgroundColor: active ? 'rgba(255,255,255,0.15)' : 'transparent',
                      position: 'relative',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.12)',
                        color: '#fff',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        style={{
                          position: 'absolute',
                          bottom: 4,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 20,
                          height: 2,
                          borderRadius: 2,
                          background: '#40C4FF',
                        }}
                      />
                    )}
                  </Button>
                );
              })}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;