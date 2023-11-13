import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ConnectionForm = () => {
  const [formData, setFormData] = useState({
    connection_scheme: '',
    username: '',
    password: '',
    database_url: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/connect_db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus('success');
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleNextScreen = () => {
    navigate('/table_list');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography style={{ marginTop: '5rem' }}>
        Connect To Database
      </Typography>
      <Paper elevation={3} style={{  padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="connectionScheme-label">Connection Scheme</InputLabel>
              <Select
                labelId="connectionScheme-label"
                label="Connection Scheme"
                name="connection_scheme"
                value={formData.connection_scheme}
                onChange={handleChange}
                required
              >
                <MenuItem value="postgresql">postgresql</MenuItem>
                <MenuItem value="mysql+pymysql">mysql+pymysql</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
              <TextField
                label="Username"
                name="username"
                variant="outlined"
                fullWidth
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Database URL"
                name="database_url"
                variant="outlined"
                fullWidth
                value={formData.database_url}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Test Connection'}
          </Button>
        </form>

        {submissionStatus === 'success' && (
          <Typography style={{ color: 'green', marginTop: 10 }}>
            Connection successful! <span role="img" aria-label="success">✅</span>
          </Typography>
        )}

        {submissionStatus === 'error' && (
          <Typography style={{ color: 'red', marginTop: 10 }}>
            Connection failed! <span role="img" aria-label="error">❌</span>
          </Typography>
        )}

        {submissionStatus === 'success' && (
          <Button variant="outlined" color="primary" onClick={handleNextScreen} style={{ marginTop: 20 }}>
            Explore Database 🔍
          </Button>
        )}
      </Paper>
    </Container>
  );
};
