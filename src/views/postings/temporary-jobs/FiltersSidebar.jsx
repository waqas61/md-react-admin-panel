import {
  Drawer,
  TextField,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  IconButton,
  Button
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import { KeyboardArrowDown } from '@mui/icons-material';

import CustomDatePicker from '../../../ui-component/CustomDatePicker';


import CloseIcon from '@mui/icons-material/Close';

const FiltersSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  setTemporaryJobs,
  gridWidth,

  showMoreFilters,
  setShowMoreFilters,
  postingTitle,
  setPostingTitle,
  locationFilter,
  setLocationFilter,
  status,
  setStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  postingType,
  setPostingType,
  handleFilterData,
  resetFilter

}) => {
  // const [showMoreFilters, setShowMoreFilters] = useState(false);
  // const [postingTitle, setPostingTitle] = useState('');
  // const [location, setLocation] = useState('');
  // const [status, setStatus] = useState('');
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');
  // const [postingType, setPostingType] = useState('');

  const handleMoreFiltersToggle = () => {
    setShowMoreFilters(!showMoreFilters);
  };

  const authToken = localStorage.getItem('auth_token');



  return (
    <Drawer
      anchor='right'
      open={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
      PaperProps={{
        style: {
          width: `${gridWidth ? '80%' : '20vw'}`,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        },
      }}
    >
      <Typography variant='h6' component='h2'>
        Filters
      </Typography>
      
      <IconButton onClick={() => setIsSidebarOpen(false)}>
        <CloseIcon style={{
          marginLeft: '220px',
          position: 'absolute',
          top: '-47px'
        }} />
      </IconButton>

      <TextField
        variant='outlined'
        fullWidth
        label='Posting Title'
        id='postingTitle'
        value={postingTitle}
        onChange={(e) => setPostingTitle(e.target.value)}
        InputProps={{
          style: {
            textAlign: 'center',
            padding: '10px',
          },
        }}
      />

      <TextField
        variant='outlined'
        fullWidth
        label='Location'
        id='location'
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
        InputProps={{
          style: {
            textAlign: 'center',
            padding: '10px',
          },
        }}
      />
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Status</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={status}
          label='Status'
          onChange={(e) => setStatus(e.target.value)}
          style={{
            textAlign: 'center',
            padding: '10px',
          }}
        >
          <MenuItem
            value='new'
            style={{
              display: 'block',
              paddingLeft: '15px',
              margin: '5px',
            }}
          >
            New
          </MenuItem>
          <MenuItem
            value='active'
            style={{
              display: 'block',
              paddingLeft: '15px',
              margin: '5px',
            }}
          >
            Active
          </MenuItem>
          <MenuItem
            value='cancelled'
            style={{
              display: 'block',
              paddingLeft: '15px',
              margin: '5px',
            }}
          >
            Cancelled
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        
        <CustomDatePicker
          label='Start Date'
          onChange={(date) => setStartDate(date)}
          value={startDate}
          size="medium"
        />
      </FormControl>
      <FormControl fullWidth>
        <CustomDatePicker
          label='End Date'
          onChange={(date) => setEndDate(date)}
          value={endDate}
          size="medium"
        />
      </FormControl>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {showMoreFilters && (
          <>
            <FormControl fullWidth style={{ marginBottom: '10px' }}>
              <InputLabel id='demo-simple-select-label'>
                Posting Type
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={postingType}
                onChange={(e) => setPostingType(e.target.value)}
                label='Posting Type'
                style={{
                  textAlign: 'center',
                  padding: '10px',
                }}
              >
                <MenuItem
                  value='simple'
                  style={{
                    display: 'block',
                    paddingLeft: '15px',
                    margin: '5px',
                  }}
                >
                  Simple
                </MenuItem>
                <MenuItem
                  value='weekly'
                  style={{
                    display: 'block',
                    paddingLeft: '15px',
                    margin: '5px',
                  }}
                >
                  Weekly
                </MenuItem>
                <MenuItem
                  value='complex'
                  style={{
                    display: 'block',
                    paddingLeft: '15px',
                    margin: '5px',
                  }}
                >
                  Complex
                </MenuItem>
              </Select>
            </FormControl>
          </>
        )}
        <Button
          variant='text'
          style={{
            color: '#595959',
            border: '1px solid #E8E8E8',
            borderRadius: '40px',
            padding: '6px 20px',
          }}
          onClick={handleMoreFiltersToggle}
        >
          {showMoreFilters ? (
            <>
              <KeyboardArrowUp style={{ marginRight: '5px' }} />
              Hide Filters
            </>
          ) : (
            <>
              <KeyboardArrowDown style={{ marginRight: '5px' }} />
              More Filters
            </>
          )}
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
          marginTop: '50px',
        }}
      >
        <Button
          variant='outline-primary'
          style={{
            width: '100%',
            border: '1px solid #2561B0',
            color: '#595959',
          }}
          onClick={resetFilter}
        >
          Reset
        </Button>
        <Button
          variant='primary'
          style={{
            width: '100%',
            backgroundColor: '#2561B0',
            border: 0,
          }}
          disabled={
            // if there is start date, there must be end date
            (startDate && !endDate) ||
            // if there is end date, there must be start date
            (!startDate && endDate) ||
            // if there is start date, end date must be after start date
            (startDate && endDate && startDate > endDate)
          }
          onClick={handleFilterData}
        >
          Find
        </Button>
      </div>
    </Drawer>
  );
};

export default FiltersSidebar;
