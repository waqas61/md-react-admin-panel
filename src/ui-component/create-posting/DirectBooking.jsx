import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  TextField,
  FormHelperText,
} from '@mui/material';

import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AddIcon from '@mui/icons-material/Add';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import React, { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import axios from 'axios';
import { makeStyles } from '@mui/styles'

export default function DirectBooking({
  selectedSubCategories,
  selectedCategory,
  selectedPros,
  setSelectedPros,
  confirmationHours,
  setConfirmationHours,
  errorState,
  setErrorState,
  successState,
  jobType,
  selectedBookingType,
  viewMode,
  applicantsExist,
}) {
  const classes = useStyles({ size: 1.4 });
  const [professionals, setProfessionals] = useState([]);
  const [professionalsCountVisible, setProfessionalsCountVisible] =
    useState(false);

  const authToken = localStorage.getItem('auth_token');

  useEffect(() => {
    getProfessional();
  }, [selectedSubCategories]);


  const getProfessional = () => {
    axios
      .get(`https://api.mddentalstaffing.com/api/v1/owner/professionals?subcats=${JSON.stringify(selectedSubCategories)}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setProfessionals(res.data.data);
        if (res.data.data.length > 0) {
          applicantsExist(true);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getProfessional();
  }, [authToken, applicantsExist]);

  const handleProfDelete = (deletedPro) => {
    setSelectedPros((prevSelectedPros) =>
      prevSelectedPros.filter((pro) => pro.id !== deletedPro.id)
    );
  };

  const handleProfessionalSelect = (pro) => {
    if (!selectedPros.find((selectedPro) => selectedPro.id === pro.id)) {
      setSelectedPros((prevSelectedPros) => [...prevSelectedPros, pro]);
    }
    if (selectedPros.length > 2) {
      setProfessionalsCountVisible(true);
    }
    setErrorState(false);
  };

  return (
    <Grid
      id='directBooking'
      className='rounded'
      sx={{
        m: 3,
        pt: 2.5,
        px: 2.5,
        pb: 2.5,
        border: '1px solid',
        borderColor: successState
          ? '#4CAF50'
          : errorState
            ? '#FA5A16'
            : '#D9D9D9',
        position: 'relative',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <h6 style={{ color: '#262626' }} className='fw-semibold'>
            Direct Booking
          </h6>

          <FormControl
            required={selectedBookingType === 'direct'}
            sx={{ width: '39%', mt: 2 }}
            disabled={viewMode}
            size='small'
          >
            <InputLabel id='applicant-label'>Professionals</InputLabel>
            <Select
              error={errorState && selectedPros.length < 1}
              label='Add Someone'
              placeholder='Add Someone'
              labelId='applicant-label'
              IconComponent={AddIcon}
              onChange={(e) => handleProfessionalSelect(e.target.value)}
            >
              {professionals
                .filter(
                  (pro) =>
                    !selectedPros.find(
                      (selectedPro) => selectedPro.id === pro.id
                    )
                )
                .map((pro) => (
                  <MenuItem key={pro.id} value={pro}>
                    {pro.first_name} {pro.last_name}
                  </MenuItem>
                ))}
            </Select>

            {errorState && selectedPros.length < 1 && (
              <FormHelperText style={{ color: '#FA5A16' }}>
                Please choose an option.
              </FormHelperText>
            )}
          </FormControl>
          <Button
            sx={{ mt: 2, mx: 2, width: '7rem', textTransform: 'none' }}
            disabled={!selectedPros.length}
            variant='contained'
            onClick={() => setSelectedPros([])}
          >
            Clear All
          </Button>
          <Grid item xs={12}>
            {selectedPros.length > 0 && (
              <div>
                <p
                  style={{
                    color: '#8C8C8C',
                    fontSize: '14px',
                    fontWeight: '500',
                    margin: '20px 0px',
                  }}
                >
                  Added applicants
                </p>
              </div>
            )}
            <Grid
              container
              spacing={2}
              style={{
                display: 'flex',
                gap: '10px',
                marginTop: '1rem',
                alignItems: 'center',
                padding: '0px 0.9rem',
              }}
            >
              {professionalsCountVisible
                ? selectedPros.slice(0, 3).map((selpro) => (
                  <Chip
                    key={selpro.id}
                    size='small'
                    className={classes.customChip}
                    style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow:
                        '0px 1.64912px 6.59649px 0px rgba(0, 0, 0, 0.15)',
                      color: '#2561B0',
                      fontSize: '12px',
                      height: '47px',
                      borderRadius: '9999px',
                      padding: '8px',
                    }}
                    avatar={
                      <Avatar
                        alt={`${selpro.first_name}`}
                        src={`https://api.mddentalstaffing.com/api/v1/assets/${selpro?.avatar}`}
                        className={classes.avatar}
                        style={{
                          height: '30px',
                          width: '30px',
                          fontSize: `${1.4 * 0.75}rem`,
                        }}
                      />
                    }
                    label={`${selpro.first_name} ${selpro.last_name}`}
                    deleteIcon={
                      <ClearIcon
                        className={classes.deleteIcon}
                        style={{
                          height: `${1.4 * 13}px`,
                          width: `${1.4 * 13}px`,
                          marginRight: '1rem',
                          color: '#262626',
                        }}
                      />
                    }
                    onDelete={() => handleProfDelete(selpro)}
                  />
                ))
                : selectedPros.map((selpro) => (
                  <Chip
                    key={selpro.id}
                    size='small'
                    className={classes.customChip}
                    style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow:
                        '0px 1.64912px 6.59649px 0px rgba(0, 0, 0, 0.15)',
                      color: '#2561B0',
                      fontSize: '12px',
                      height: '47px',
                      borderRadius: '9999px',
                      padding: '8px',
                    }}
                    avatar={
                      <Avatar
                        alt={`${selpro.first_name}`}
                        src={`https://api.mddentalstaffing.com/api/v1/assets/${selpro?.avatar}`}
                        className={classes.avatar}
                        style={{
                          height: '30px',
                          width: '30px',
                          fontSize: `${1.4 * 0.75}rem`,
                        }}
                      />
                    }
                    label={`${selpro.first_name} ${selpro.last_name}`}
                    deleteIcon={
                      <ClearIcon
                        className={classes.deleteIcon}
                        style={{
                          height: `${1.4 * 13}px`,
                          width: `${1.4 * 13}px`,
                          marginRight: '1rem',
                          color: '#262626',
                        }}
                      />
                    }
                    onDelete={() => handleProfDelete(selpro)}
                  />
                ))}
              {selectedPros.length > 3 && professionalsCountVisible && (
                <Chip
                  onClick={() => {
                    setProfessionalsCountVisible(false);
                  }}
                  label={
                    <>
                      {`+${selectedPros.length - 3}`}
                      <ArrowCircleRightIcon
                        style={{
                          marginLeft: '0.5rem',
                          color: '#262626',
                        }}
                      />
                    </>
                  }
                  sx={{
                    backgroundColor: '#FFFFFF',
                    color: '#2561B0',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                />
              )}
            </Grid>
          </Grid>

          {jobType === 'temporary' && (
            <>
              <Grid spacing={2} container className='ms-1 align-items-center'>
                <Grid item xs={3.5}>
                  <h6 className='fw-semibold' style={{ color: '#262626' }}>
                    Number of hours for direct booking confirmation:
                  </h6>
                </Grid>
                <Grid item xs={2}>
                  <Grid container className='flex-column align-items-center'>
                    <Grid className='text-center' item xs={6}>
                      <KeyboardArrowUpIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          if (!viewMode)
                            setConfirmationHours(confirmationHours + 1);
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      className='rounded'
                      sx={{
                        border: '1px solid #D9D9D9',
                        p: 0,
                        color: '#262626',
                        width: '2.5rem',
                        height: '2.35rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <TextField
                        disabled={viewMode}
                        className='custom-input text-center'
                        onChange={(e) => {
                          setConfirmationHours(e.target.value);
                        }}
                        value={confirmationHours}
                        sx={{
                          p: 0,
                          color: '#262626',
                          m: 0,
                          width: '90%',

                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                          {
                            border: '1.5px solid #ADCDF6',
                          },
                        }}
                      />
                    </Grid>
                    <Grid className='text-center' item xs={6}>
                      <KeyboardArrowDownIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          if (!viewMode && parseInt(confirmationHours) > 0) {
                            setConfirmationHours(confirmationHours - 1);
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid
            className='rounded'
            container
            spacing={1}
            sx={{ backgroundColor: '#D7E8FF', p: 1 }}
          >
            <Grid item xs={1}>
              <ErrorOutlineOutlinedIcon
                sx={{ color: '#4A93F0', transform: 'rotate(180deg)' }}
              />
            </Grid>
            <Grid item xs={11} sx={{ fontSize: '0.9rem' }}>
              <p style={{ color: '#194378' }} className='fw-semibold mb-0'>
                Please Note
              </p>
              <p style={{ color: '#194378' }}>
                This field permits you to book a candidate who previously worked
                in your dental practice.
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div
        style={{ position: 'absolute', bottom: 0, right: 0, margin: '16px' }}
      >
        {errorState ? (
          <CloseIcon color='sunset' />
        ) : successState ? (
          <DoneAllIcon color='success' />
        ) : null}
      </div>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  customChip: (props) => ({
    fontSize: `${props.size * 0.8125}rem`,
    height: `${props.size * 33}px`,
    borderRadius: '9999px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 1.64912px 6.59649px 0px rgba(0, 0, 0, 0.15)',
    color: '#2561B0',
    marginRight: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: 8,
    '& .MuiButtonBase-root': {
      backgroundColor: '#FFFFFF',
    },
  }),
  avatar: (props) => ({
    '&&': {
      height: `${props.size * 24}px`,
      width: `${props.size * 24}px`,
      fontSize: `${props.size * 0.75}rem`,
    },
  }),
  deleteIcon: (props) => ({
    height: `${props.size * 13}px`,
    width: `${props.size * 13}px`,
    marginRight: '1rem',
    color: '#262626',
  }),
}));
