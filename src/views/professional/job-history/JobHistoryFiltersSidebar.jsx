import React, { useState } from 'react';

import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton
} from '@mui/material';
import CustomDatePicker from '../../../ui-component/create-posting/CustomDatePicker';
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

function JobHistoryFiltersSidebar({
  open,
  handleClose,
  filterJobs,
  postingTitle,
  setPostingTitle,
  location,
  setLocation,
  setDate,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  date,
  setOfficeName,
  officeName,
  setType,
  type,
  resetFilter

}) {
  // const [officeName, setOfficeName] = useState('');
  // const [location, setLocation] = useState('');
  // const [date, setDate] = useState('');
  // const [posting, setPosting] = useState('');
  // const [type, setType] = useState('');

  const classes = useStyles();

  return (
    <Drawer
      style={{ width: '100%' }}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor='right'
      open={open}
      onClose={handleClose}
    >
      <Typography
        style={{ fontWeight: 500, padding: '.5rem 0', marginBottom: '1rem' }}
        variant='h5'
        className={classes.heading}
      >
        Filters
      </Typography>
      <IconButton onClick={handleClose}>
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
        {/* <CustomDatePicker
          label='Date'
          onChange={(date) => setDate(date)}
          value={date}
          size="medium"
        /> */}


        <CustomDatePicker
          label='Start Date'
          onChange={(date) => setStartDate(date)}
          value={startDate}
          size="medium"
        />

        <CustomDatePicker
          label='End Date'
          onChange={(date) => setEndDate(date)}
          value={endDate}
          size="medium"
        />

        <TextField
          variant='outlined'
          size='small'
          fullWidth
          label='Title'
          id='posting'
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
          size='small'
          label='Location'
          id='location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
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
          size='small'
          label='Company'
          id='officeName'
          value={officeName}
          onChange={(e) => setOfficeName(e.target.value)}
          InputProps={{
            style: {
              textAlign: 'center',
              padding: '10px',
            },
          }}
        />

        <FormControl variant='outlined' size='small' fullWidth>
          <InputLabel id='demo-simple-select-label'>Type</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Type'
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
            }}
          >
            <MenuItem value={'temporary'}>Temporary</MenuItem>
            <MenuItem value={'permanent'}>Permanent</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '3rem',
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
          onClick={filterJobs}
          variant='contained'
          style={{
            backgroundColor: '#2561B0',
            color: 'white',
            width: '100%',
          }}
        >
          Find
        </Button>
      </Box>
    </Drawer>
  );
}

export default JobHistoryFiltersSidebar;
