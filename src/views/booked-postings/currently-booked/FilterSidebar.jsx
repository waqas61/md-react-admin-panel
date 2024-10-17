import axios from 'axios';
import React, { useState } from 'react';

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

import CustomDatePicker from '../../../ui-component/CustomDatePicker';
import CloseIcon from '@mui/icons-material/Close';

import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 340,
    flexShrink: 0,
  },
  drawerPaper: {
    padding: theme.spacing(2),
    width: 340,
  },
  heading: {
    margin: theme.spacing(2),
  },
  specialtyBox: {
    margin: theme.spacing(1),
  },

  ratingBox: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    minWidth: '100%',
  },
}));


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

  endDate,
  setEndDate,

  handleFilterData,
  resetFilter

}) => {


  const authToken = localStorage.getItem('auth_token');
  // const classes = useStyles();

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


      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
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
              value='need_check_in'
              style={{
                display: 'block',
                paddingLeft: '15px',
                margin: '5px',
              }}
            >
              Needs Check-in
            </MenuItem>
            <MenuItem
              value='check_in'
              style={{
                display: 'block',
                paddingLeft: '15px',
                margin: '5px',
              }}
            >
              Checked-in
            </MenuItem>
            <MenuItem
              value='rejected'
              style={{
                display: 'block',
                paddingLeft: '15px',
                margin: '5px',
              }}
            >
              Declined
            </MenuItem>
            <MenuItem
              value='not_show'
              style={{
                display: 'block',
                paddingLeft: '15px',
                margin: '5px',
              }}
            >
              Not Show
            </MenuItem>
          </Select>
        </FormControl>

        <CustomDatePicker
          label='Date'
          value={startDate}
          onChange={(date) => setStartDate(date)}
          size="medium"
        />
        {/* <CustomDatePicker
        label='End Date'
        onChange={(date) => setEndDate(date)}
        value={endDate}
      /> */}
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
      </div>
    </Drawer>
  );
};

export default FiltersSidebar;
