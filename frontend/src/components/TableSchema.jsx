import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Typography, Button } from '@mui/material';

const DataTable = ({ data }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Data Type</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.data_type}</TableCell>
            <TableCell>{""}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const TableSchema = () => {
  const { tableName } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/get_table_columns?table_name=${tableName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName]);

  const navigateToRoot = () => {
    navigate('/');
  };

  const navigateToNewScreen = () => {
    navigate(`/table_metrics/${tableName}`);
  };

  return (
    <div>
        <div>
            <Typography variant="h4" style={{marginTop: '1rem'}}>
              Table: {tableName}
            </Typography>
            <Button variant="contained" color="primary" onClick={navigateToNewScreen}>
              Show Table Metrics
            </Button>
        </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {data.length === 0 ? (
            <>
              <Typography variant="body1">No data available for this table.</Typography>
              <Button variant="contained" color="primary" onClick={navigateToRoot}>
                Go Back to Home
              </Button>
            </>
          ) : (
            <DataTable data={data} />
          )}
        </>
      )}
    </div>
  );
};
