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

import CustomDatePicker from '../../../ui-component/CustomDatePicker';
import SubCard from '../../../ui-component/cards/SubCard';

import CloseIcon from '@mui/icons-material/Close';

const FiltersSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  setTemporaryJobs,
  gridWidth,
  postingTitle,
  setPostingTitle,
  locationFilter,
  setLocationFilter,
  status,
  setStatus,
  startDate,
  setStartDate,
  handleFilterData,
  resetFilter

}) => {


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

      <CustomDatePicker
        label='Start Date'
        value={startDate}
        onChange={(date) => setStartDate(date)}
        size="medium"
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
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
          onClick={handleFilterData}
        >
          Find
        </Button>
      </div>
    </Drawer>
  );
};

export default FiltersSidebar;
