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

import CustomDatePicker from '../../ui-component/create-posting/CustomDatePicker';

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
  setTransaction,
}) => {
  const classes = useStyles();


  const [postingTitle, setPostingTitle] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [professional, setProfessional] = useState(null);
  const [postingType, setPostingType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState(null);


  const authToken = localStorage.getItem('auth_token');

  const handleFilterData = (page, limit) => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/owner/transactions?page=${page}&limit=${limit}`;

    if (postingTitle) {
      endpoint += `&title=${postingTitle}`;
    }

    if (location) {
      endpoint += `&location=${location}`;
    }

    if (status) {
      endpoint += `&posting_status=${status}`;
    }

    if (startDate) {
      endpoint += `&from=${startDate}`;
    }

    if (endDate) {
      endpoint += `&to=${endDate}`;
    }

    if (postingType) {
      endpoint += `&posting_schedule=${postingType}`;
    }

    if (professional) {
      endpoint += `&professional=${professional}`;
    }

    if (paymentMethod) {
      endpoint += `&payment_method=${paymentMethod}`;
    }

    if (amount) {
      endpoint += `&amount=${amount}`;
    }

    axios
      .get(endpoint, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setTransaction(res.data);
      })
      .catch((e) => console.log(e));

    setIsSidebarOpen(false);
  };

  return (
    <Drawer
      style={{ width: '100%' }}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor='right'
      open={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
    // PaperProps={{
    //   style: {
    //     width: '20vw',
    //     padding: '20px',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     gap: '20px',
    //   },
    // }}
    >
      <Typography
        style={{ fontWeight: 500, padding: '.5rem 0', marginBottom: '1rem' }}
        variant='h5'
        className={classes.heading}
      >
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

        <CustomDatePicker
          label='Date From'
          onChange={(date) => setStartDate(date)}
          value={startDate}
        />
        <CustomDatePicker
          label='Date To'
          onChange={(date) => setEndDate(date)}
          value={endDate}
        />

        <FormControl variant='outlined' size='small' fullWidth>
          <InputLabel id='demo-simple-select-label'>Status</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value={'visa'}>Visa</MenuItem>
            <MenuItem value={'discover'}>Discover</MenuItem>
            <MenuItem value={'master'}>Master</MenuItem>
          </Select>
        </FormControl>

        <TextField
          variant='outlined'
          fullWidth
          size='small'
          label='Posting'
          id='posting'
          value={postingTitle}
          onChange={(e) => setPostingTitle(e.target.value)}
        />

        <TextField
          variant='outlined'
          fullWidth
          label='Location'
          id='location'
          size='small'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          variant='outlined'
          fullWidth
          label='Professional'
          id='location'
          size='small'
          value={professional}
          onChange={(e) => setProfessional(e.target.value)}
        />

        <FormControl fullWidth size='small'>
          <InputLabel id='demo-simple-select-label'>Payment Method</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            label='Posting Type'
          >
            <MenuItem value={'visa'}>Visa</MenuItem>
            <MenuItem value={'discover'}>Discover</MenuItem>
            <MenuItem value={'master'}>Master</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size='small'>
          <InputLabel id='demo-simple-select-label'>Status</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={status}
            size='small'
            label='Status'
            onChange={(e) => setStatus(e.target.value)}
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

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <TextField
            variant='outlined'
            fullWidth
            label='Amount From'
            id='location'
            size='small'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            variant='outlined'
            fullWidth
            label='Amount To'
            id='location'
            size='small'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
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
            onClick={() => setIsSidebarOpen(false)}
          >
            Close
          </Button>
          <Button
            variant='primary'
            style={{
              width: '100%',
              backgroundColor: '#2561B0',
              border: 0,
            }}
            onClick={() => handleFilterData(1, 10)}
          >
            Find
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default FiltersSidebar;
