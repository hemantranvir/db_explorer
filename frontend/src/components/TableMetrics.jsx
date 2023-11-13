import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress } from '@mui/material';

export const TableMetrics = () => {
  const { tableName } = useParams();
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [columnCount, setColumnCount] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableMetrics = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/get_table_metrics?table_name=${tableName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        setRowCount(data.row_count);
        setColumnCount(data.columns.length);
        setTableData(data.columns);
      } catch (error) {
        console.error('Error fetching table metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTableMetrics();
  }, [tableName]);

  return (
    <div>
      <Typography variant="h4" style={{marginTop: '1rem'}}>Table Metrics: {tableName}</Typography>

      {loading ? (
        <CircularProgress style={{ margin: '20px' }} />
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Row Count</Typography>
                <Typography variant="body1">{rowCount}</Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6">Column Count</Typography>
                <Typography variant="body1">{columnCount}</Typography>
              </CardContent>
            </Card>
          </div>

          <Typography variant="h5" style={{ marginTop: '20px' }}>
            Table Details
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Column Name</TableCell>
                <TableCell>Data Type</TableCell>
                <TableCell>Null Percentage</TableCell>
                <TableCell>Unique Percentage</TableCell>
                <TableCell>Valid Values Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((column) => (
                <TableRow key={column.column_name}>
                  <TableCell>{column.column_name}</TableCell>
                  <TableCell>{column.data_type}</TableCell>
                  <TableCell>{column.null_percentage}</TableCell>
                  <TableCell>{column.unique_percentage}</TableCell>
                  <TableCell>{column.valid_values_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};
