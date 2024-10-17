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
} from '@mui/material';
import Rating from '@mui/material/Rating';
import Star from '@mui/icons-material/Star';

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

function OfficesFiltersSidebar({ open, handleClose }) {
  const [selectRating, setSelectRating] = useState([]);
  const [officeName, setOfficeName] = useState('');
  const [location, setLocation] = useState('');

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

      <TextField
        variant='outlined'
        fullWidth
        label='Office Name'
        id='officeName'
        value={officeName}
        onChange={(e) => setOfficeName(e.target.value)}
        InputProps={{
          style: {
            textAlign: 'center',
          },
        }}
      />

      <TextField
        sx={{
          marginTop: '1rem',
        }}
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

      <FormControl sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <InputLabel id='name-label'>Latest Review</InputLabel>
        <Select
          style={{
            width: '100%',
          }}
          label='Latest Review'
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

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '3rem',
        }}
      >
        <Button
          variant='outlined'
          onClick={handleClose}
          style={{
            color: '#595959',
            width: '100%',
            marginRight: '1rem',
            borderColor: '#2561B0',
          }}
        >
          Close
        </Button>
        <Button
          // onClick={handleFilter}
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

export default OfficesFiltersSidebar;
