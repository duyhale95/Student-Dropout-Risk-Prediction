import React from 'react';
import { Box, Typography, Grid, Avatar, Paper, Container, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import GroupIcon from '@mui/icons-material/Group';
import CodeIcon from '@mui/icons-material/Code';
import StarIcon from '@mui/icons-material/Star';

const teamMembers = [
  {
    name: 'Hà Lê Duy',
    role: 'Team Member',
    tag: 'Dev',
    gradient: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)',
    tagColor: 'primary',
  },
  {
    name: 'Dương Nhật Hào',
    role: 'Team Member',
    tag: 'Dev',
    gradient: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)',
    tagColor: 'info',
  },
  {
    name: 'Chu Nguyễn Tùng Dương',
    role: 'Team Leader',
    tag: 'Lead',
    gradient: 'linear-gradient(135deg, #023E8A 0%, #0096C7 100%)',
    tagColor: 'info',
  },
  {
    name: 'Võ Khải Duy',
    role: 'Team Member',
    tag: 'Dev',
    gradient: 'linear-gradient(135deg, #1B4F72 0%, #2E86C1 100%)',
    tagColor: 'info',
  },
  {
    name: 'Đặng Vân Duy',
    role: 'Team Member',
    tag: 'Dev',
    gradient: 'linear-gradient(135deg, #1B4F72 0%, #2E86C1 100%)',
    tagColor: 'info',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

const AboutPage = () => (
  <Box sx={{ background: '#EFF6FF', minHeight: '100vh', py: 8 }}>
    <Container maxWidth="lg">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div variants={itemVariants}>
          <Box sx={{ textAlign: 'center', mb: 7 }}>
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 64, height: 64, borderRadius: 3, mb: 2,
              background: 'linear-gradient(135deg,#1565C0,#1E88E5)',
              boxShadow: '0 4px 20px rgba(21,101,192,0.3)',
            }}>
              <GroupIcon sx={{ fontSize: 32, color: '#fff' }} />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#0D2140', mb: 1 }}>
              Project Team
            </Typography>
            <Typography variant="body1" sx={{ color: '#4A6080', maxWidth: 480, mx: 'auto' }}>
              Meet the team behind the Student Dropout Risk Prediction platform.
            </Typography>
          </Box>
        </motion.div>

        {/* Team Cards */}
        <Grid container spacing={3} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div variants={itemVariants} whileHover={{ y: -8, transition: { duration: 0.25 } }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3.5,
                    borderRadius: 4,
                    border: '1.5px solid rgba(21,101,192,0.12)',
                    background: '#fff',
                    boxShadow: '0 4px 24px rgba(21,101,192,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s ease',
                    '&:hover': { boxShadow: '0 12px 40px rgba(21,101,192,0.18)' },
                  }}
                >
                  {/* top accent bar */}
                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: member.gradient }} />

                  <Avatar sx={{
                    width: 88, height: 88, mb: 2,
                    background: member.gradient,
                    fontSize: '2rem', fontWeight: 800, color: '#fff',
                    boxShadow: '0 4px 16px rgba(21,101,192,0.25)',
                  }}>
                    {member.name.charAt(0)}
                  </Avatar>

                  <Chip
                    icon={index === 0 ? <StarIcon sx={{ fontSize: '14px !important' }} /> : <CodeIcon sx={{ fontSize: '14px !important' }} />}
                    label={member.tag}
                    color={member.tagColor}
                    size="small"
                    sx={{ mb: 1.5, fontWeight: 700, fontSize: '0.72rem' }}
                  />

                  <Typography variant="h6" align="center" sx={{ fontWeight: 700, color: '#0D2140', lineHeight: 1.3, mb: 0.5 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" align="center" sx={{ color: '#4A6080', fontWeight: 500 }}>
                    {member.role}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  </Box>
);

export default AboutPage;