import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import PredictionForm from './PredictionForm';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';

const PredictionPage = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <PredictionForm />
    </motion.div>
  </Container>
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#1565C0',       // deep blue
      light: '#1E88E5',
      dark: '#0D47A1',
    },
    secondary: {
      main: '#00B0FF',       // accent light blue
      light: '#40C4FF',
      dark: '#0091EA',
    },
    background: {
      default: '#EFF6FF',    // very light blue tint
      paper: '#FFFFFF',
    },
    success: {
      main: '#00C853',
      light: '#69F0AE',
    },
    error: {
      main: '#D32F2F',
      light: '#EF9A9A',
    },
    text: {
      primary: '#0D2140',
      secondary: '#4A6080',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)',
          boxShadow: '0 4px 16px rgba(21, 101, 192, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)',
            boxShadow: '0 6px 20px rgba(21, 101, 192, 0.45)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 16px rgba(21, 101, 192, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1565C0',
            },
          },
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/prediction" element={<PredictionPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
