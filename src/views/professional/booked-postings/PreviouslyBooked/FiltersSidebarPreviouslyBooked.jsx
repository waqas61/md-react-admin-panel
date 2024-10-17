import React, { useState } from 'react';
import { makeStyles } from '@mui/styles'
import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
  IconButton
} from '@mui/material';
import { Star } from '@mui/icons-material';
import CustomDatePicker from '../../../../components/CreatePosting/CustomDatePicker';
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

function FiltersSidebarPreviouslyBooked({
  open,
  handleClose,
  selectRating,
  setSelectRating,

  professional,
  setProfessional,
  date,
  setDate,
  posting,
  setPosting,
  type,
  setType,
  handleFilterData,
  resetFilter
}) {




  const classes = useStyles();

  const handleSelectRating = (event) => {
    const {
      target: { value },
    } = event;
    setSelectRating(typeof value === 'string' ? value.split(',') : value);
  };

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

        <TextField
          variant='outlined'
          size='small'
          fullWidth
          label='Posting'
          id='posting'
          value={posting}
          onChange={(e) => setPosting(e.target.value)}
          InputProps={{
            style: {
              textAlign: 'center',
              padding: '10px',
            },
          }}
        />
        <CustomDatePicker
          label='Last Worked Date'
          onChange={(date) => setDate(date)}
          value={date}
          size="medium"
        />




      </div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '3rem',
        }}
      >
        <Button
          variant='outlined'
          onClick={resetFilter}
          style={{
            color: '#595959',
            width: '100%',
            marginRight: '1rem',
            borderColor: '#2561B0',
          }}
        >
          Reset
        </Button>
        <Button
          onClick={handleFilterData}
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

export default FiltersSidebarPreviouslyBooked;
