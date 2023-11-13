import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export const TableList = () => {
  const [tableNames, setTableNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTableNames = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/get_tables', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setTableNames(data);
    } catch (error) {
      console.error('Error fetching table names:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableNames();
  }, []);

  return (
    <Container style={{ height: '100vh', overflowY: 'auto' }}>
      <Typography variant="h4" style={{marginTop: '1rem'}}>
        List of Tables
      </Typography>
      <Button variant="contained" color="primary" onClick={fetchTableNames} disabled={loading}>
        {loading ? 'Loading...' : 'Re-Fetch Table Names'}
      </Button>

      {loading && <Typography variant="h6">Loading...</Typography>}

      {!loading && (tableNames.length === 0 || tableNames.length === undefined) && (
        <Typography variant="h6" style={{marginTop: '5rem'}}>No tables available. Please Connect To DB To See Tables</Typography>
      )}

      {!loading && tableNames.length > 0 && (
        <Grid container spacing={2}>
          {tableNames.map((tableName, index) => (
            <Grid item xs={12} key={index}>
              <Link to={`/table/${tableName.table_name}`}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {tableName.table_name}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
