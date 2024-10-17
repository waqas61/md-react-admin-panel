import {
  Drawer,
  TextField,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  IconButton,
  Box,
  Rating,
  Button
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
// import { makeStyles } from '@mui/styles'
import { makeStyles } from '@mui/styles'
import { Star } from '@mui/icons-material';

import SubCard from '../../ui-component/cards/SubCard';
import CustomDatePicker from '../../ui-component/CustomDatePicker';

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

  status,
  setStatus,

  applicant,
  setApplicant,

  specialty,
  setSpecialty,

  setRate,
  rate,

  location,
  setLocation,

  selectRating,
  setSelectRating,

  handleFilterData,
  resetFilter,

  gridWidth

}) => {


  const authToken = localStorage.getItem('auth_token');
  // const classes = useStyles();

  const handleSelectRating = (event) => {

    const { target: { value } } = event;
    console.log('event value', value);
    setSelectRating(typeof value === 'string' ? value.split(',') : value);
  };
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
          label='Applicant'
          id='applicant'
          value={applicant}
          onChange={(e) => setApplicant(e.target.value)}
          InputProps={{
            style: {
              textAlign: 'center',
            },
          }}
        />

        <TextField
          variant='outlined'
          fullWidth
          label='Specialty'
          id='specialty'
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          InputProps={{
            style: {
              textAlign: 'center',
            },
          }}
        />

        <TextField
          variant='outlined'
          fullWidth
          label='Hourly Rate'
          id='rate'
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          InputProps={{
            style: {
              textAlign: 'center',
            },
          }}
        />

        <TextField
          variant='outlined'
          fullWidth
          label='Location'
          id='location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          InputProps={{
            style: {
              textAlign: 'center',
            },
          }}
        />

        <FormControl fullWidth>
          <InputLabel id='name-label'>Rating</InputLabel>
          <Select
            style={{
              textAlign: 'center',
            }}
            label='Average Score'
            labelId='Rating-select-label'
            id='Rating-select-label'
            multiple
            value={selectRating}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <>
                    {value},
                    <Star sx={{ color: 'orange' }} />
                  </>
                ))}
              </Box>
            )}
            onChange={handleSelectRating}
          >
            <MenuItem value={5}>
              <Rating name='read-only' value={5} readOnly />
            </MenuItem>
            <MenuItem value={4}>
              <Rating name='read-only' value={4} readOnly />
            </MenuItem>
            <MenuItem value={3}>
              <Rating name='read-only' value={3} readOnly />
            </MenuItem>
            <MenuItem value={2}>
              <Rating name='read-only' value={2} readOnly />
            </MenuItem>
            <MenuItem value={1}>
              <Rating name='read-only' value={1} readOnly />
            </MenuItem>
          </Select>
        </FormControl>

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
            }}
          >
            <MenuItem
              value='1'
              style={{
                display: 'block',
                paddingLeft: '15px',
                margin: '5px',
              }}
            >
              Block
            </MenuItem>
            <MenuItem
              value='0'
              style={{
                display: 'block',
                paddingLeft: '15px',
                margin: '5px',
              }}
            >
              UnBlock
            </MenuItem>

          </Select>
        </FormControl>


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
