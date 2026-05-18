import React, { useState, useEffect } from 'react';
import {
  Container, Box, Typography, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, InputAdornment,
  Select, MenuItem, FormControl, InputLabel, Grid, Snackbar, Alert,
  Button, Chip, Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

import HistoryIcon from '@mui/icons-material/History';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import api from '../api';

const courseNames = {
  1: 'Biofuel Production Technologies', 2: 'Animation and Multimedia Design',
  3: 'Social Service (evening)', 4: 'Agronomy', 5: 'Communication Design',
  6: 'Veterinary Nursing', 7: 'Informatics Engineering', 8: 'Equiniculture',
  9: 'Management', 10: 'Social Service', 11: 'Tourism', 12: 'Nursing',
  13: 'Oral Hygiene', 14: 'Advertising & Marketing Mgmt.', 15: 'Journalism & Communication',
  16: 'Basic Education', 17: 'Management (evening)',
};

const HistoryPage = () => {
  const [predictions, setPredictions] = useState([]);
  const [filteredPredictions, setFilteredPredictions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    window.addEventListener('load', () => sessionStorage.removeItem('predictions'));
    return () => window.removeEventListener('load', () => {});
  }, []);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await api.get('/predictions/');
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const data = response.data.map(item => ({
          ...item,
          date: formattedDate,
          courseName: courseNames[item.Course] || `Course ${item.Course}`,
        }));
        setPredictions(data);
        setFilteredPredictions(data);
      } catch {
        setSnackbar({ open: true, message: 'Could not load prediction data.', severity: 'error' });
      }
    };
    fetchPredictions();
  }, []);

  useEffect(() => {
    setFilteredPredictions(
      predictions.filter(item =>
        Object.values(item).some(v => v.toString().toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, predictions]);

  useEffect(() => {
    setFilteredPredictions(prev =>
      [...prev].sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      })
    );
  }, [sortField, sortDirection]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/predictions/${id}`);
      const updated = predictions.filter(i => i.id !== id);
      setPredictions(updated);
      setFilteredPredictions(filteredPredictions.filter(i => i.id !== id));
      setSnackbar({ open: true, message: 'Prediction deleted!', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Could not delete. Please try again.', severity: 'error' });
    }
  };

  const EmptyState = () => (
    <Box sx={{ textAlign: 'center', py: 7 }}>
      <HistoryIcon sx={{ fontSize: 60, color: 'rgba(21,101,192,0.2)', mb: 2 }} />
      <Typography variant="h6" sx={{ color: '#4A6080', fontWeight: 600, mb: 1 }}>
        No prediction history yet
      </Typography>
      <Typography variant="body2" sx={{ color: '#7A90A8', mb: 3 }}>
        Make a prediction to see results here.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/prediction"
        sx={{ background: 'linear-gradient(135deg,#1565C0,#1E88E5)', borderRadius: 2 }}>
        Go to Prediction
      </Button>
    </Box>
  );

  return (
    <Box sx={{ background: '#EFF6FF', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Box sx={{
              width: 48, height: 48, borderRadius: 2.5, mr: 2,
              background: 'linear-gradient(135deg,#1565C0,#1E88E5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(21,101,192,0.3)',
            }}>
              <HistoryIcon sx={{ color: '#fff', fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0D2140', lineHeight: 1 }}>
                Prediction History
              </Typography>
              <Typography variant="body2" sx={{ color: '#4A6080', mt: 0.3 }}>
                {filteredPredictions.length} record{filteredPredictions.length !== 1 ? 's' : ''} found
              </Typography>
            </Box>
          </Box>

          {/* Controls */}
          <Paper elevation={0} sx={{
            p: 2.5, mb: 3, borderRadius: 3,
            border: '1.5px solid rgba(21,101,192,0.1)',
            background: '#fff',
          }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField fullWidth placeholder="Search records…" size="small"
                  value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#1565C0' }} /></InputAdornment>,
                    sx: { borderRadius: 2 },
                  }}
                />
              </Grid>
              <Grid item xs={9} md={5}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort by</InputLabel>
                  <Select value={sortField} label="Sort by" onChange={e => setSortField(e.target.value)}
                    sx={{ borderRadius: 2 }}>
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="Age_at_enrollment">Age</MenuItem>
                    <MenuItem value="avg_enrolled">Avg Enrolled</MenuItem>
                    <MenuItem value="avg_approved">Avg Approved</MenuItem>
                    <MenuItem value="avg_grade">Avg Grade</MenuItem>
                    <MenuItem value="courseName">Course</MenuItem>
                    <MenuItem value="Gender">Gender</MenuItem>
                    <MenuItem value="prediction">Result</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3} md={1}>
                <Tooltip title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}>
                  <IconButton onClick={() => setSortDirection(d => d === 'asc' ? 'desc' : 'asc')}
                    sx={{
                      width: '100%', height: 40, borderRadius: 2,
                      border: '1px solid rgba(21,101,192,0.3)',
                      color: '#1565C0',
                      '&:hover': { background: 'rgba(21,101,192,0.06)' },
                    }}>
                    {sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Paper>

          {/* Table */}
          <Paper elevation={0} sx={{
            borderRadius: 3,
            border: '1.5px solid rgba(21,101,192,0.1)',
            overflow: 'hidden',
            background: '#fff',
          }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: 'linear-gradient(135deg,#1565C0,#1E88E5)' }}>
                    {['Date', 'Age', 'Avg Enrolled', 'Avg Approved', 'Avg Grade', 'Course', 'Gender', 'Result', 'Action'].map(col => (
                      <TableCell key={col} sx={{ color: '#fff', fontWeight: 700, fontSize: '0.82rem', py: 1.8, whiteSpace: 'nowrap' }}>
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPredictions.length > 0 ? filteredPredictions.map((item, idx) => (
                    <TableRow key={item.id}
                      sx={{
                        background: idx % 2 === 0 ? '#fff' : '#F8FBFF',
                        '&:hover': { background: '#EFF6FF' },
                        transition: 'background 0.15s',
                      }}>
                      <TableCell sx={{ fontSize: '0.82rem', color: '#4A6080' }}>{item.date}</TableCell>
                      <TableCell sx={{ fontSize: '0.82rem' }}>{item.Age_at_enrollment}</TableCell>
                      <TableCell sx={{ fontSize: '0.82rem' }}>{item.avg_enrolled}</TableCell>
                      <TableCell sx={{ fontSize: '0.82rem' }}>{item.avg_approved}</TableCell>
                      <TableCell sx={{ fontSize: '0.82rem' }}>{item.avg_grade}</TableCell>
                      <TableCell sx={{ fontSize: '0.82rem', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.courseName}
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.82rem' }}>{item.Gender === 1 ? 'Male' : 'Female'}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.prediction === 'Graduate' ? 'Graduate' : 'Dropout'}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            background: item.prediction === 'Graduate'
                              ? 'linear-gradient(135deg,#00C853,#69F0AE)'
                              : 'linear-gradient(135deg,#D32F2F,#EF5350)',
                            color: '#fff',
                            boxShadow: item.prediction === 'Graduate'
                              ? '0 2px 8px rgba(0,200,83,0.3)'
                              : '0 2px 8px rgba(211,47,47,0.3)',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Delete record">
                          <IconButton color="error" onClick={() => handleDelete(item.id)} size="small"
                            sx={{ '&:hover': { background: 'rgba(211,47,47,0.08)' } }}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={9} sx={{ p: 0 }}>
                        <EmptyState />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </motion.div>

        <Snackbar open={snackbar.open} autoHideDuration={4000}
          onClose={() => setSnackbar(s => ({ ...s, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={() => setSnackbar(s => ({ ...s, open: false }))}
            severity={snackbar.severity} sx={{ borderRadius: 2 }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default HistoryPage;