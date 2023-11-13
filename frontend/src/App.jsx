import './App.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { ConnectionForm } from './components/ConnectionForm';
import { TableList } from './components/TableList';
import { TableSchema } from './components/TableSchema';
import { TableMetrics } from './components/TableMetrics';

export const App = () => {
  return (
      <Router>
        <div className='App'>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Connect To DB
            </Typography>
            <Typography variant="h6" component={Link} to="/table_list" style={{ textDecoration: 'none', color: 'white', marginLeft: '20px' }}>
              Table List
            </Typography>
          </Toolbar>
        </AppBar>

          <Routes>
            <Route exact path='/' element={<ConnectionForm/>} />
            <Route exact path='/table_list' element={<TableList/>} />
            <Route exact path='/table/:tableName' element={<TableSchema/>} />
            <Route exact path='/table_metrics/:tableName' element={<TableMetrics/>} />
          </Routes>
        </div>
      </Router>
  );
}
