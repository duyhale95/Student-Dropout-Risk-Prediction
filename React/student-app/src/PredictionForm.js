import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid, TextField, MenuItem,
  Button, CircularProgress, Paper, Chip, Divider,
  FormControl, InputLabel, Select, FormHelperText
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Person, School, Group,
  SentimentVeryDissatisfied, SentimentVerySatisfied,
  CheckCircle, ErrorOutline, TrendingUp
} from '@mui/icons-material';
import api from './api';

/* ─── Data arrays ────────────────────────────────────────────────────────── */
const QUALIFICATION_OPTIONS = [
  { value: 5, label: 'Higher Education — Doctorate' },
  { value: 34, label: 'Higher Education — Doctorate (3rd cycle)' },
  { value: 4, label: "Higher Education — Master's degree" },
  { value: 33, label: "Higher Education — Master's degree (2nd cycle)" },
  { value: 3, label: 'Higher Education — Degree' },
  { value: 30, label: 'Higher Education — Degree (1st cycle)' },
  { value: 2, label: "Higher Education — Bachelor's degree" },
  { value: 31, label: 'Specialized Higher Studies Course' },
  { value: 32, label: 'Professional Higher Technical Course' },
  { value: 6, label: 'Frequency of Higher Education' },
  { value: 1, label: 'Secondary Education — 12th Year or Equivalent' },
  { value: 29, label: 'Technological Specialization Course' },
  { value: 15, label: 'Complementary High School Course' },
  { value: 16, label: 'Technical-Professional Course' },
  { value: 11, label: '2nd Year Complementary High School Course' },
  { value: 19, label: '2nd Cycle of the General High School Course' },
  { value: 14, label: 'Basic Education 3rd Cycle (9th–11th Year)' },
  { value: 28, label: 'Basic Education 2nd Cycle (6th–8th Year)' },
  { value: 27, label: 'Basic Education 1st Cycle (4th–5th Year)' },
  { value: 13, label: 'General Commerce Course' },
  { value: 23, label: 'Supplementary Accounting and Administration' },
  { value: 22, label: 'General Course of Administration and Commerce' },
  { value: 7, label: '12th Year — Not Completed' },
  { value: 17, label: 'Complementary High School — Not Concluded' },
  { value: 8, label: '11th Year — Not Completed' },
  { value: 10, label: 'Other — 11th Year of Schooling' },
  { value: 12, label: '10th Year of Schooling' },
  { value: 20, label: '9th Year — Not Completed' },
  { value: 21, label: '8th Year of Schooling' },
  { value: 18, label: '7th Year of Schooling' },
  { value: 9, label: '7th Year (Old)' },
  { value: 26, label: 'Can Read Without 4th Year' },
  { value: 25, label: 'Cannot Read or Write' },
  { value: 24, label: 'Unknown' },
];

const OCCUPATION_OPTIONS = [
  { value: 2, label: 'Legislative / Executive Managers' },
  { value: 17, label: 'Admin & Commercial Directors' },
  { value: 18, label: 'Hotel, Trade & Services Directors' },
  { value: 3, label: 'Intellectual & Scientific Specialists' },
  { value: 19, label: 'Sciences & Engineering Specialists' },
  { value: 20, label: 'Health Professionals' },
  { value: 21, label: 'Teachers' },
  { value: 22, label: 'Finance & Accounting Specialists' },
  { value: 4, label: 'Intermediate Level Technicians' },
  { value: 23, label: 'Science & Engineering Technicians' },
  { value: 24, label: 'Health Technicians' },
  { value: 25, label: 'Legal, Social & Cultural Technicians' },
  { value: 26, label: 'ICT Technicians' },
  { value: 5, label: 'Administrative Staff' },
  { value: 27, label: 'Office & Data Processing Workers' },
  { value: 28, label: 'Accounting & Statistical Operators' },
  { value: 29, label: 'Other Admin Support Staff' },
  { value: 6, label: 'Personal Services & Sellers' },
  { value: 30, label: 'Personal Service Workers' },
  { value: 31, label: 'Sellers' },
  { value: 32, label: 'Personal Care Workers' },
  { value: 33, label: 'Protection & Security Personnel' },
  { value: 7, label: 'Agriculture & Forestry Workers' },
  { value: 34, label: 'Market-oriented Farmers' },
  { value: 35, label: 'Subsistence Farmers & Fishermen' },
  { value: 8, label: 'Industry & Construction Workers' },
  { value: 36, label: 'Skilled Construction Workers' },
  { value: 37, label: 'Skilled Metalworking Workers' },
  { value: 38, label: 'Electrical & Electronics Workers' },
  { value: 39, label: 'Food & Crafts Workers' },
  { value: 9, label: 'Machine Operators & Assembly' },
  { value: 40, label: 'Fixed Plant & Machine Operators' },
  { value: 41, label: 'Assembly Workers' },
  { value: 42, label: 'Vehicle & Equipment Operators' },
  { value: 10, label: 'Unskilled Workers' },
  { value: 43, label: 'Unskilled — Agriculture' },
  { value: 44, label: 'Unskilled — Industry & Transport' },
  { value: 45, label: 'Meal Preparation Assistants' },
  { value: 46, label: 'Street Vendors & Providers' },
  { value: 11, label: 'Armed Forces Professions' },
  { value: 14, label: 'Armed Forces Officers' },
  { value: 15, label: 'Armed Forces Sergeants' },
  { value: 16, label: 'Other Armed Forces Personnel' },
  { value: 1, label: 'Student' },
  { value: 12, label: 'Other Situation' },
  { value: 13, label: '(Not Specified)' },
];

const APP_MODE_OPTIONS = [
  // --- Standard Entry Phases ---
  { value: 1, label: '1st Phase — General Contingent' },
  { value: 6, label: '2nd Phase — General Contingent' },
  { value: 7, label: '3rd Phase — General Contingent' },

  // --- Transfers & Changes ---
  { value: 13, label: 'Transfer' },
  { value: 14, label: 'Change of Course' },
  { value: 16, label: 'Change Institution / Course' },
  { value: 18, label: 'Change Institution (International)' },

  // --- Special Groups ---
  { value: 12, label: 'Over 23 Years Old' },
  { value: 8, label: 'International Student' },
  { value: 3, label: '1st Phase — Special (Azores)' },

  // --- Prior Qualification Holders ---
  { value: 4, label: 'Holders of Other Higher Course' },
  { value: 5, label: 'Holders of Post-Secondary Course' },
  { value: 15, label: 'Tech Specialization Diploma' },
  { value: 17, label: 'Short Cycle Diploma Holders' },

  // --- Special Ordinances ---
  { value: 2, label: 'Ordinance No. 612/93' },
  { value: 9, label: 'Ordinance No. 854-B/99' },
  { value: 10, label: 'Ordinance No. 533-A/99 (b2)' },
  { value: 11, label: 'Ordinance No. 533-A/99 (b3)' },
];

const COURSE_OPTIONS = [
  { value: 14, label: 'Advertising & Marketing Mgmt.' },
  { value: 4, label: 'Agronomy' },
  { value: 2, label: 'Animation & Multimedia Design' },
  { value: 1, label: 'Biofuel Production Tech.' },
  { value: 5, label: 'Communication Design' },
  { value: 7, label: 'Computer Science' },
  { value: 16, label: 'Education (Basic Education)' },
  { value: 8, label: 'Equiniculture' },
  { value: 15, label: 'Journalism & Communication' },
  { value: 9, label: 'Management' },
  { value: 17, label: 'Management (Evening)' },
  { value: 12, label: 'Nursing' },
  { value: 13, label: 'Oral Hygiene' },
  { value: 10, label: 'Social Service' },
  { value: 3, label: 'Social Service (Evening)' },
  { value: 11, label: 'Tourism' },
  { value: 6, label: 'Veterinary Nursing' },
];


/* ─── Reusable: labeled select using FormControl ─────────────────────────── */
const LabeledSelect = ({ label, name, value, onChange, options, helperText }) => (
  <FormControl fullWidth size="medium">
    <InputLabel
      id={`${name}-label`}
      shrink
      sx={{
        fontWeight: 600,
        fontSize: '0.95rem',
        backgroundColor: '#fff',
        px: 0.8,
        color: '#1565C0',
      }}
    >
      {label}
    </InputLabel>
    <Select
      labelId={`${name}-label`}
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      displayEmpty
      notched
      sx={{
        borderRadius: 2.5,
        '& .MuiSelect-select': { py: 1.5 },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            maxHeight: 320,
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(21,101,192,0.15)',
            '& .MuiMenuItem-root': {
              fontSize: '0.88rem',
              py: 1,
              '&:hover': { backgroundColor: 'rgba(21,101,192,0.06)' },
              '&.Mui-selected': { backgroundColor: 'rgba(21,101,192,0.1)' },
            },
          },
        },
      }}
    >
      {options.map((o) => (
        <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
      ))}
    </Select>
    {helperText && (
      <FormHelperText sx={{ color: '#7A90A8', ml: 0.5 }}>{helperText}</FormHelperText>
    )}
  </FormControl>
);

/* ─── Reusable: labeled number input ─────────────────────────────────────── */
const LabeledInput = ({ label, name, value, onChange, helperText, ...rest }) => (
  <TextField
    fullWidth
    type="number"
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    required
    InputLabelProps={{
      shrink: true,
      sx: { fontWeight: 600, fontSize: '0.95rem', color: '#1565C0' },
    }}
    helperText={helperText}
    FormHelperTextProps={{ sx: { color: '#7A90A8', ml: 0.5 } }}
    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5 } }}
    {...rest}
  />
);

/* ─── Reusable: Yes/No toggle field ──────────────────────────────────────── */
const YesNoSelect = ({ label, name, value, onChange, helperText, yesFirst = true }) => (
  <FormControl fullWidth size="medium">
    <InputLabel
      id={`${name}-label`}
      shrink
      sx={{
        fontWeight: 600,
        fontSize: '0.95rem',
        backgroundColor: '#fff',
        px: 0.8,
        color: '#1565C0',
      }}
    >
      {label}
    </InputLabel>
    <Select
      labelId={`${name}-label`}
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      notched
      sx={{ borderRadius: 2.5, '& .MuiSelect-select': { py: 1.5 } }}
    >
      {yesFirst
        ? [<MenuItem key={1} value={1}>Yes</MenuItem>, <MenuItem key={0} value={0}>No</MenuItem>]
        : [<MenuItem key={0} value={0}>No</MenuItem>, <MenuItem key={1} value={1}>Yes</MenuItem>]
      }
    </Select>
    {helperText && (
      <FormHelperText sx={{ color: '#7A90A8', ml: 0.5 }}>{helperText}</FormHelperText>
    )}
  </FormControl>
);

/* ─── Section card wrapper ──────────────────────────────────────────────── */
const SectionCard = ({ icon: Icon, title, subtitle, children }) => (
  <Card
    elevation={0}
    sx={{
      mb: 3,
      border: '1.5px solid rgba(21,101,192,0.15)',
      borderRadius: 3,
      overflow: 'visible',
      background: '#fff',
      boxShadow: '0 4px 24px rgba(21,101,192,0.07)',
    }}
  >
    <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        <Box sx={{
          width: 36, height: 36, borderRadius: 2, mr: 1.5,
          background: 'linear-gradient(135deg,#1565C0,#1E88E5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon sx={{ color: '#fff', fontSize: 20 }} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0D2140', lineHeight: 1.2 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" sx={{ color: '#7A90A8' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      <Divider sx={{ my: 2, borderColor: 'rgba(21,101,192,0.1)' }} />
      {children}
    </CardContent>
  </Card>
);

/* ═══════════════════════════════════════════════════════════════════════════ */
const PredictionForm = () => {
  const [formData, setFormData] = useState({
    Application_mode: 1, Application_order: 1, Course: 5,
    Mother_qualification: 22, Father_qualification: 27,
    Mother_occupation: 10, Father_occupation: 10,
    Debtor: 0, Tuition_fees_up_to_date: 1, Gender: 1,
    Scholarship_holder: 0, Age: 19, GDP: 1.74,
    avg_enrolled: 6, avg_approved: 0, avg_grade: 0,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setResult(null); setIsSubmitted(false);
    try {
      const res = await api.post('/predict/', formData);
      setResult(res.data.prediction); setIsSubmitted(true);
    } catch {
      setResult({ error: 'An error occurred. Please try again.' }); setIsSubmitted(true);
    } finally { setLoading(false); }
  };

  /* ── Personal Info ─────────────────────────────────────────────────── */
  const renderPersonalInfo = () => (
    <SectionCard icon={Person} title="Personal Information" subtitle="Basic demographic & financial info">
      <Grid container spacing={2.5}>
        <Grid item xs={6} sm={4}>
          <LabeledInput label="Age" name="Age" value={formData.Age}
            onChange={handleChange} inputProps={{ min: 15, max: 100 }} helperText="15 – 100" />
        </Grid>
        <Grid item xs={6} sm={4}>
          <LabeledSelect label="Gender" name="Gender" value={formData.Gender}
            onChange={handleChange}
            options={[{ value: 1, label: 'Male' }, { value: 0, label: 'Female' }]} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <LabeledInput label="GDP" name="GDP" value={formData.GDP}
            onChange={handleChange} inputProps={{ step: 0.01 }} helperText="e.g. 1.74" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <YesNoSelect label="Debtor" name="Debtor" value={formData.Debtor}
            onChange={handleChange} yesFirst={false} helperText="Has outstanding debts?" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <YesNoSelect label="Tuition Paid" name="Tuition_fees_up_to_date"
            value={formData.Tuition_fees_up_to_date} onChange={handleChange}
            helperText="Fees up to date?" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <YesNoSelect label="Scholarship Holder" name="Scholarship_holder"
            value={formData.Scholarship_holder} onChange={handleChange} yesFirst={false}
            helperText="Receives scholarship?" />
        </Grid>
      </Grid>
    </SectionCard>
  );

  /* ── Academic Info ──────────────────────────────────────────────────── */
  const renderAcademicInfo = () => (
    <SectionCard icon={School} title="Academic Information" subtitle="Enrollment & performance details">
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <LabeledSelect label="Application Mode" name="Application_mode"
            value={formData.Application_mode} onChange={handleChange}
            options={APP_MODE_OPTIONS} helperText="How student was admitted" />
        </Grid>
        <Grid item xs={12} md={6}>
          <LabeledSelect label="Course" name="Course" value={formData.Course}
            onChange={handleChange} options={COURSE_OPTIONS}
            helperText="Enrolled program" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <LabeledInput label="App. Order" name="Application_order"
            value={formData.Application_order} onChange={handleChange}
            inputProps={{ min: 1, max: 9 }} helperText="1 = 1st choice" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <LabeledInput label="Avg. Enrolled" name="avg_enrolled"
            value={formData.avg_enrolled} onChange={handleChange}
            inputProps={{ min: 0, max: 100 }} helperText="Credits enrolled" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <LabeledInput label="Avg. Approved" name="avg_approved"
            value={formData.avg_approved} onChange={handleChange}
            inputProps={{ min: 0, max: 100 }} helperText="Credits approved" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <LabeledInput label="Avg. Grade" name="avg_grade"
            value={formData.avg_grade} onChange={handleChange}
            inputProps={{ step: 0.1, min: 0, max: 20 }} helperText="Scale 0 – 20" />
        </Grid>
      </Grid>
    </SectionCard>
  );

  /* ── Family Info ───────────────────────────────────────────────────── */
  const renderFamilyInfo = () => (
    <SectionCard icon={Group} title="Family Background" subtitle="Parents' education & occupation">
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <LabeledSelect label="Mother's Qualification" name="Mother_qualification"
            value={formData.Mother_qualification} onChange={handleChange}
            options={QUALIFICATION_OPTIONS} helperText="Highest education level" />
        </Grid>
        <Grid item xs={12} md={6}>
          <LabeledSelect label="Father's Qualification" name="Father_qualification"
            value={formData.Father_qualification} onChange={handleChange}
            options={QUALIFICATION_OPTIONS} helperText="Highest education level" />
        </Grid>
        <Grid item xs={12} md={6}>
          <LabeledSelect label="Mother's Occupation" name="Mother_occupation"
            value={formData.Mother_occupation} onChange={handleChange}
            options={OCCUPATION_OPTIONS} helperText="Current profession" />
        </Grid>
        <Grid item xs={12} md={6}>
          <LabeledSelect label="Father's Occupation" name="Father_occupation"
            value={formData.Father_occupation} onChange={handleChange}
            options={OCCUPATION_OPTIONS} helperText="Current profession" />
        </Grid>
      </Grid>
    </SectionCard>
  );

  /* ── Result Panel ──────────────────────────────────────────────────── */
  const renderResult = () => {
    if (!isSubmitted || !result) return null;
    const isErr = !!result.error;
    const isDrop = result === 'Dropout';
    const isGrad = result === 'Graduate';
    const cfg = isErr
      ? {
        bg: 'linear-gradient(135deg,#FFF5F5,#FFE8E8)', bd: '#D32F2F',
        icon: <ErrorOutline sx={{ fontSize: 52, color: '#D32F2F' }} />,
        chip: null, title: 'Prediction Error', desc: result.error, tc: '#D32F2F'
      }
      : isDrop
        ? {
          bg: 'linear-gradient(135deg,#FFF5F5,#FFECEC)', bd: '#EF5350',
          icon: <SentimentVeryDissatisfied sx={{ fontSize: 52, color: '#D32F2F' }} />,
          chip: { label: 'HIGH RISK', color: 'error' },
          title: 'Dropout Risk Detected',
          desc: 'This student is at risk of dropping out. Early intervention is strongly recommended.',
          tc: '#C62828'
        }
        : {
          bg: 'linear-gradient(135deg,#F0FFF4,#E8F5E9)', bd: '#43A047',
          icon: <SentimentVerySatisfied sx={{ fontSize: 52, color: '#2E7D32' }} />,
          chip: { label: 'LOW RISK', color: 'success' },
          title: 'Graduation Predicted',
          desc: 'This student is predicted to successfully graduate.',
          tc: '#1B5E20'
        };

    return (
      <AnimatePresence>
        <motion.div key="result"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}>
          <Box sx={{
            mt: 4, p: { xs: 3, md: 4 }, borderRadius: 4,
            background: cfg.bg, border: `2px solid ${cfg.bd}`,
            boxShadow: `0 8px 32px ${cfg.bd}22`, textAlign: 'center',
          }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
              {cfg.icon}
            </motion.div>
            {cfg.chip && (
              <Box sx={{ mt: 1, mb: 1 }}>
                <Chip label={cfg.chip.label} color={cfg.chip.color}
                  icon={isGrad ? <CheckCircle /> : <TrendingUp />}
                  sx={{ fontWeight: 700, fontSize: '0.85rem', px: 1 }} />
              </Box>
            )}
            <Typography variant="h5" sx={{ fontWeight: 800, color: cfg.tc, mt: 1.5 }}>
              {cfg.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1.5, color: '#4A5568', maxWidth: 480, mx: 'auto', lineHeight: 1.7 }}>
              {cfg.desc}
            </Typography>
            <Button variant="outlined" sx={{
              mt: 3, borderColor: cfg.bd, color: cfg.tc, fontWeight: 600,
              '&:hover': { background: `${cfg.bd}11`, borderColor: cfg.bd },
            }} onClick={() => { setIsSubmitted(false); setResult(null); }}>
              Make Another Prediction
            </Button>
          </Box>
        </motion.div>
      </AnimatePresence>
    );
  };

  /* ── Main render ───────────────────────────────────────────────────── */
  return (
    <Box sx={{ maxWidth: 920, mx: 'auto', width: '100%' }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0D2140', mb: 1 }}>
          Student Dropout Prediction
        </Typography>
        <Typography variant="body1" sx={{ color: '#4A6080', maxWidth: 560, mx: 'auto' }}>
          Fill in the student's information below to predict their dropout risk.
        </Typography>
      </Box>

      <Paper elevation={0} component="form" onSubmit={handleSubmit} sx={{
        p: { xs: 2, md: 4 }, border: '1.5px solid rgba(21,101,192,0.12)',
        borderRadius: 4, background: '#F8FBFF',
        boxShadow: '0 8px 40px rgba(21,101,192,0.09)',
      }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}>
          {renderPersonalInfo()}
          {renderAcademicInfo()}
          {renderFamilyInfo()}
        </motion.div>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button type="submit" variant="contained" disabled={loading} size="large" sx={{
            px: 6, py: 1.5, fontSize: '1rem', fontWeight: 700, borderRadius: 3,
            background: 'linear-gradient(135deg,#1565C0,#1E88E5)',
            boxShadow: '0 4px 20px rgba(21,101,192,0.35)',
            '&:hover': {
              background: 'linear-gradient(135deg,#0D47A1,#1565C0)',
              boxShadow: '0 6px 24px rgba(21,101,192,0.45)',
            },
          }}>
            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : '🔍  Predict Now'}
          </Button>
        </Box>
        {renderResult()}
      </Paper>
    </Box>
  );
};

export default PredictionForm;