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
import SubCard from '../../../ui-component/cards/SubCard';
import CustomDatePicker from '../../../ui-component/CustomDatePicker';
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
  resetFilter,
  gridWidth
}) {




  // const classes = useStyles();

  const handleSelectRating = (event) => {
    const {
      target: { value },
    } = event;
    setSelectRating(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={handleClose}
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
          fullWidth
          size='small'
          label='Professional'
          id='professional'
          value={professional}
          onChange={(e) => setProfessional(e.target.value)}
          InputProps={{
            style: {
              textAlign: 'center',
              padding: '10px',
            },
          }}
        />






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

        <FormControl variant='outlined' size='small' fullWidth>
          <InputLabel id='demo-simple-select-label'>Status</InputLabel>
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
            <MenuItem value='1'>Banned</MenuItem>
            <MenuItem value='0'>Unbanned</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id='name-label'>Rating</InputLabel>
          <Select
            style={{
              width: '100%',
              padding: '10px',
            }}
            size='small'
            label='Rating'
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
