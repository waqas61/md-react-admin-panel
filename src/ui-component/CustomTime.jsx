import React from 'react';
import { FormHelperText, Grid, TextField } from '@mui/material';
import './CustomTime.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowUpDropdown from '../assets/icons/ArrowUpDropdown.svg';

export default function CustomTime({
  hours,
  setHours,
  minutes,
  setMinutes,
  ampm,
  setAmpm,
  isActive,
  isError,
  onChange,
  type,
  disabled,
  indicatorsVisible,
  errorMessage,
  displayErrorMessage,
}) {
  const handleHourChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/\D/g, '');
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2);
    }
    if (inputValue !== '' && parseInt(inputValue) > 12) {
      inputValue = '12';
    }
    setHours(inputValue);
  };

  const MINUTE_INTERVAL = 15;

  const handleMinuteChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/\D/g, '');
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2);
    }
    if (inputValue !== '' && parseInt(inputValue) > 59) {
      inputValue = '59';
    }
    setMinutes(inputValue);
  };

  const handleArrowUpClick = (isMinutes) => {
    if (!disabled) {
      if (type !== 'weekly') {
        if (isMinutes) {
          const newMinutes = (parseInt(minutes) + MINUTE_INTERVAL) % 60;
          setMinutes(String(newMinutes).padStart(2, '0'));
        } else {
          if (parseInt(hours) < 12) {
            setHours(String((parseInt(hours) + 1) % 12).padStart(2, '0'));
          }
        }
      }
    }
    if (type === 'weekly') {
      onChange();
    }
  };

  const handleArrowDownClick = (isMinutes) => {
    if (!disabled) {
      if (type !== 'weekly') {
        if (isMinutes) {
          const newMinutes = (parseInt(minutes) - MINUTE_INTERVAL + 60) % 60;
          setMinutes(String(newMinutes).padStart(2, '0'));
        } else {
          if (hours > 0) {
            setHours(String((parseInt(hours) - 1) % 12).padStart(2, '0'));
          }
        }
      }
    }
    if (type === 'weekly') {
      onChange();
    }
  };

  return (
    <div className='d-flex flex-column'>
      <Grid>
        {isActive && (
          <Grid
            sx={{ width: '5rem', justifyContent: 'space-between' }}
            container
          >
            <Grid
              className='text-center'
              item
              xs={6}
              style={{
                display: indicatorsVisible === false ? 'none' : 'block',
              }}
            >
              <KeyboardArrowUpIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => handleArrowUpClick(false)} // For hours
              />
            </Grid>
            <Grid
              className='text-center'
              item
              xs={6}
              style={{
                display: indicatorsVisible === false ? 'none' : 'block',
              }}
            >
              <KeyboardArrowUpIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => handleArrowUpClick(true)} // For minutes
              />
            </Grid>
          </Grid>
        )}
        <Grid sx={{ m: 0 }} container>
          <Grid className='d-flex justify-content-start' item>
            <Grid
              item
              className='rounded'
              sx={{
                border: '1px solid #D9D9D9',
                borderColor: isActive && isError ? '#FA5A16' : '#D9D9D9',
                p: 0,
                color: '#262626',
                width: '5rem',
                height: '2.35rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TextField
                disabled={disabled || !isActive}
                className='custom-input text-center'
                onChange={type !== 'weekly' ? handleHourChange : onChange}
                value={hours ? String(hours).padStart(2, '0') : '00'}
                sx={{
                  p: 0,
                  m: 0,
                  color: '#262626',
                  width: '40%',
                  mr: 0.5,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                    outline: 'none',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                    {
                      border: '1.5px solid #ADCDF6',
                    },
                }}
              />
              :
              <TextField
                disabled={disabled || !isActive}
                className='custom-input text-center'
                onChange={type !== 'weekly' ? handleMinuteChange : onChange}
                value={minutes ? String(minutes).padStart(2, '0') : '00'}
                sx={{
                  p: 0,
                  color: '#262626',
                  m: 0,
                  width: '40%',
                  ml: 0.5,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                    outline: 'none',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                    {
                      border: '1.5px solid #ADCDF6',
                    },
                }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              className='rounded'
              onClick={() => {
                if (!disabled)
                  if (isActive) {
                    if (type !== 'weekly') {
                      if (ampm === 'AM') {
                        setAmpm('PM');
                      } else {
                        setAmpm('AM');
                      }
                    }
                    if (type === 'weekly') {
                      onChange();
                    }
                  }
              }}
              sx={{
                border: '1px solid #D9D9D9',
                backgroundColor: isActive ? '#2561B0' : '#D9D9D9',
                mx: 1,
                p: 0,
                color: '#FFFFFF',
                width: '5rem',
                height: '2.35rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 16,
              }}
              container
            >
              {ampm} <img src={ArrowUpDropdown} alt='' />
            </Grid>
          </Grid>
        </Grid>
        {isActive && (
          <Grid
            sx={{ width: '5rem', justifyContent: 'space-between' }}
            container
          >
            <Grid
              className='text-center'
              item
              xs={6}
              style={{
                display: indicatorsVisible === false ? 'none' : 'block',
              }}
            >
              <KeyboardArrowDownIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => handleArrowDownClick(false)} // For hours
              />
            </Grid>
            <Grid
              className='text-center'
              item
              xs={6}
              style={{
                display: indicatorsVisible === false ? 'none' : 'block',
              }}
            >
              <KeyboardArrowDownIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => handleArrowDownClick(true)} // For minutes
              />
            </Grid>
          </Grid>
        )}
      </Grid>{' '}
      {displayErrorMessage && (
        <>
          {isActive && isError && (
            <FormHelperText sx={{ color: '#FA5A16' }}>
              {errorMessage ? errorMessage : 'Please select a time'}
            </FormHelperText>
          )}
        </>
      )}
    </div>
  );
}
