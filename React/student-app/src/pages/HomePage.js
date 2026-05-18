import React from 'react';
import { Box, Button, Typography, Container, Stack, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero_image.png';
import { Link as RouterLink } from 'react-router-dom';
import { AutoGraph, Security, Speed } from '@mui/icons-material';

const features = [
  { icon: <AutoGraph sx={{ fontSize: 18 }} />, label: 'ML-Powered' },
  { icon: <Security sx={{ fontSize: 18 }} />, label: 'Data-Driven' },
  { icon: <Speed sx={{ fontSize: 18 }} />, label: 'Real-time' },
];

const HomePage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(150deg, #0D2D6B 0%, #1565C0 50%, #1E88E5 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <Box sx={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)', top: -100, right: -100, zIndex: 0,
      }} />
      <Box sx={{
        position: 'absolute', width: 300, height: 300, borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)', bottom: 50, left: -50, zIndex: 0,
      }} />

      {/* Hero Image */}
      <Box
        component="img"
        src={heroImage}
        alt="Hero"
        sx={{
          position: 'absolute',
          top: { xs: 0, md: -30 },
          left: { xs: 0, md: '900px' },
          width: { xs: '100vw', md: '1800px' },
          height: 'auto',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.85,
        }}
      />

      <Container
        maxWidth={false}
        disableGutters
        sx={{
          maxWidth: 1280,
          ml: { xs: 0, md: '80px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Box sx={{ flex: 1, ml: { xs: 3, md: 12 }, p: { xs: 2, md: 0 } }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Feature chips */}
            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
              {features.map((f) => (
                <Chip
                  key={f.label}
                  icon={f.icon}
                  label={f.label}
                  size="small"
                  sx={{
                    background: 'rgba(255,255,255,0.12)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                    fontWeight: 600,
                    '& .MuiChip-icon': { color: '#40C4FF' },
                  }}
                />
              ))}
            </Stack>

            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: { xs: '1.8rem', md: '2.6rem', lg: '3.2rem' },
                lineHeight: 1.15,
                color: '#fff',
                mb: 3,
              }}
            >
              Student Dropout Risk<br />
              Prediction{' '}
              <Box component="span" sx={{ color: '#40C4FF' }}>WITH ML</Box>
            </Typography>

            <Typography
              sx={{
                color: 'rgba(255,255,255,0.82)',
                maxWidth: 560,
                mb: 5,
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                lineHeight: 1.75,
              }}
            >
              Based on real student data, we recognize the everyday pressures — from academic stress to social challenges. This platform detects early dropout risks to support student success.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/prediction"
                sx={{
                  background: '#fff',
                  color: '#1565C0',
                  fontWeight: 700,
                  fontSize: '1rem',
                  px: 4, py: 1.5,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  '&:hover': { background: '#E3F2FD', boxShadow: '0 6px 24px rgba(0,0,0,0.2)' },
                }}
              >
                START PREDICTING
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/about"
                sx={{
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.5)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  px: 4, py: 1.5,
                  borderRadius: 3,
                  '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,0.08)' },
                }}
              >
                ABOUT US
              </Button>
            </Stack>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;