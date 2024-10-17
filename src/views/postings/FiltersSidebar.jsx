import React, { useState } from 'react';
import { makeStyles } from '@mui/styles'
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

import CloseIcon from '@mui/icons-material/Close';
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

function FiltersSidebar({
  open,
  handleClose,
  setSelectedType,
  selectedType,
  filterInterviews,
  setInterviewStatus,
  interviewStatus,
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
      open={open}
      onClose={handleClose}
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor='right'
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

        <FormControl variant='outlined' size='small' fullWidth>
          <InputLabel id='demo-simple-select-label'>Interview Status</InputLabel>
          <Select
            labelId='demo-simple-select-label-status'
            id='demo-simple-select-status'
            label='Type'
            value={interviewStatus}
            onChange={(e) => setInterviewStatus(e.target.value)}
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
              value='scheduled'
              style={{
                display: 'block',
                paddingLeft: '15px',
                margin: '5px',
              }}
            >
              Scheduled
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
              value='interviewing'
              style={{
                display: 'block',
                paddingLeft: '15px',
                margin: '5px',
              }}
            >
              Interviewing
            </MenuItem>

            <MenuItem
              value='fail'
              style={{
                display: 'block',
                paddingLeft: '15px',
                margin: '5px',
              }}
            >
              Fail
            </MenuItem>

            <MenuItem
              value='pass'
              style={{
                display: 'block',
                paddingLeft: '15px',
                margin: '5px',
              }}
            >
              Pass
            </MenuItem>

            <MenuItem
              value='hired'
              style={{
                display: 'block',
                paddingLeft: '15px',
                margin: '5px',
              }}
            >
              Hired
            </MenuItem>

            <MenuItem
              value='no_show'
              style={{
                display: 'block',
                paddingLeft: '15px',
                margin: '5px',
              }}
            >
              No Show
            </MenuItem>

          </Select>
        </FormControl>

        <FormControl variant='outlined' size='small' fullWidth>
          <InputLabel id='demo-simple-select-label'>Type</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Type'
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <MenuItem
              value='phone'
              style={{
                display: 'block',
                paddingLeft: '15px',
                margin: '5px',
              }}
            >
              Phone
            </MenuItem>
            <MenuItem
              value='personal'
              style={{
                display: 'block',
                paddingLeft: '15px',
                margin: '5px',
              }}
            >
              Personal
            </MenuItem>
            <MenuItem
              value='working'
              style={{
                display: 'block',
                paddingLeft: '15px',
                margin: '5px',
              }}
            >
              Working
            </MenuItem>
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
          onClick={filterInterviews}
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

export default FiltersSidebar;
