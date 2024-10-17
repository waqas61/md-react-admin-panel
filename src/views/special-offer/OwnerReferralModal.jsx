import React, { useState, useEffect } from 'react';
import { ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Formik, Form, FieldArray, FormikProvider } from "formik";
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Alert from '@mui/material/Alert';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'
import { Box, Modal, Radio, Typography, Button } from '@mui/material';


import LoadingButton from '../../ui-component/LoadingButton';
import referaprofessional from '../../assets/images/refer-a-professional.png';
import referralOwner from '../../assets/images/refer-a-owner.png';
import { capitalizeFirstLetter } from '../../utils/helper';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '6px',
};





const OwnerReferralModal = ({ isOpen, onClose, successModal, errorModal, getReferrals, setSuccessMessage }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [maxWidth, setMaxWidth] = React.useState('lg');
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [states, setStates] = useState([]);

  const schema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    phone: Yup.string().required("Enter Phone Number"),
    state: Yup.string().required("required"),
    city: Yup.string().required("Enter City Name"),
    email: Yup.string()
      .min(5, 'Must be at least 8 characters')
      .max(20, 'Must be less  than 20 characters')
      .required('Email is required')
      .test('Unique Email', 'Email already in use',
        function (value) {
          return new Promise((resolve, reject) => {
            axios.get(`https://api.mddentalstaffing.com/api/v1/available/${value}`)
              .then((res) => {
                resolve(true)
              })
              .catch((error) => {
                resolve(false);
              })
          })
        }
      )
  });

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      state: '',
      city: '',
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      handleSave(values);
    },
  });

  const handleSave = async (data) => {
    setLoading(true);
    data.referral_user_type = 'owner';
    const API_BASE_URL = 'https://api.mddentalstaffing.com/api/v1/referral';
    await axios.post(API_BASE_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then((res) => {
      setSuccessMessage('Owner Added Successfully');
      console.log(res);
      successModal();
      setFinished(true);
      getReferrals();
      onClose();
    }).catch((err) => {
      errorModal();
      setFinished(true);
      onClose();
      console.log(err);
    });
  };

  const getStates = () => {
    fetch('https://api.mddentalstaffing.com/api/v1/states')
      .then((response) => response.json())
      .then((data) => {
        setStates(data.data);
      }).catch((error) => console.error('Error fetching states:', error));
  }

  useEffect(() => {
    getStates();
  }, []);

  return (
    <Dialog
      // fullScreen={fullScreen}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth="lg"
      maxWidth={maxWidth}
    >
      <DialogContent sx={{
        padding: '0px'
      }}>
        <Box>
          <Grid container >
            <Grid
              sx={{
                border: "1px solid",
                borderColor: "#D9D9D9",
              }}
              xs={4}
              md={4}
            >
              <CardMedia
                component="img"
                height="715vh"
                width="25%"
                image={referralOwner}
                alt="Special Offers"
              />
            </Grid>

            <Grid
              sx={{
                border: "1px solid",
                borderColor: "#D9D9D9",
              }}
              xs={8}
              md={8}
            >
              <Box
                sx={{
                  px: 10,
                  pt: 4
                }}
              >
                <Typography id='modal-modal-title' variant='h4' component='h2'>
                  Referr a Dental Practice
                </Typography>
              </Box>

              <Box sx={{
                px: 10,
                pt: 4,
                pb: 1,
              }}>

                <FormikProvider value={formik}>
                  <form>

                    <Box sx={{ display: 'flex' }}>
                      <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ px: 1, pb: 1, pt: 1 }} >
                        Profile Information
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex' }}>
                      <FormControl sx={{ width: '50%', px: 1 }} variant="outlined">
                        <TextField
                          label="Doctor First Name"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                          value={formik.values.first_name}
                          required
                          {...formik.getFieldProps("first_name")}
                        />
                        {formik.errors.first_name && formik.touched.first_name && (
                          <FormHelperText style={{ color: "#FA5A16" }}>
                            Please Enter First Name.
                          </FormHelperText>
                        )}

                      </FormControl>
                      <FormControl sx={{ width: '50%', px: 1 }} variant="outlined">
                        <TextField
                          label="Doctor Last Name"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                          value={formik.values.last_name}
                          required
                          {...formik.getFieldProps("last_name")}
                        />
                        {formik.errors.last_name && formik.touched.last_name && (
                          <FormHelperText style={{ color: "#FA5A16" }}>
                            Please Enter Last Name.
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex' }}>
                      <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ px: 1, pb: 1, pt: 1 }} >
                        Contact Information
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex' }}>
                      <FormControl sx={{ width: '50%', px: 1 }} variant="outlined">
                        <TextField
                          label="Email"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                          value={formik.values.email}
                          required
                          {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email && formik.touched.email && (
                          <FormHelperText style={{ color: "#FA5A16" }}>
                            {formik.errors.email}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl sx={{ width: '50%', px: 1 }} variant="outlined">
                        <TextField
                          label="Phone"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                          value={formik.values.phone}
                          required
                          {...formik.getFieldProps("phone")}
                        />
                        {formik.errors.phone && formik.touched.phone && (
                          <FormHelperText style={{ color: "#FA5A16" }}>
                            Please Enter Phone.
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex' }}>
                      <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ px: 1, pb: 1, pt: 1 }} >
                        Location
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex' }}>
                      <FormControl sx={{ width: '50%', px: 1 }} variant="outlined">
                        <InputLabel id="demo-simple-select-label">
                          States
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="state"
                          name="state"
                          value={formik.values.state}
                          defaultValue={formik.values.state}
                          label="State"
                          required
                          {...formik.getFieldProps("state")}
                        >
                          {states.map((list) => {
                            return (
                              <MenuItem
                                key={list.id}
                                value={list.id}
                              >
                                {list.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        {formik.errors.state && formik.touched.state && (
                          <FormHelperText style={{ color: "#FA5A16" }}>
                            Please choose a state.
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl sx={{ width: '50%', px: 1 }} variant="outlined">
                        <TextField
                          label="City"
                          id="outlined-start-adornment"
                          sx={{ width: '100%' }}
                          value={formik.values.city}
                          required
                          {...formik.getFieldProps("city")}
                        />
                        {formik.errors.city && formik.touched.city && (
                          <FormHelperText style={{ color: "#FA5A16" }}>
                            Please Enter City.
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>


                    {formik.errors.email && formik.touched.email && (
                      <Grid
                        sx={{
                          pt: 1,
                          pb: 1,
                        }}
                      >
                        <Stack sx={{ width: '100%', px: 1, pt: 1 }} spacing={2}>
                          <Alert
                            severity='error'
                            style={{
                              color: 'red',
                              backgroundColor: 'rgb(250, 238, 222)',
                            }}
                          >
                            <span style={{ fontWeight: 'bold' }}> Attention </span>
                            <br />
                            Please note this Owner is already in our system. No referral gift will be awarded.
                          </Alert>
                        </Stack>
                      </Grid>
                    )}

                    <Box sx={{ flexGrow: 5, py: 5, mt: 15 }}>
                      <Grid container  >
                        <Grid item xs={8}>

                        </Grid>
                        <Grid item xs={4}>
                          <LoadingButton
                            color='warning'
                            variant='contained'
                            style={{
                              padding: '5px 20px',
                              margin: '2px',
                              borderRadius: '4px',
                              transition: 'background-color 0.3s',
                              color: 'black',
                              backgroundColor: '#f0ecec',
                            }}
                            onClick={onClose}
                          >
                            Cancel
                          </LoadingButton>
                          <LoadingButton
                            color='primary'
                            variant='contained'
                            style={{
                              padding: '5px 20px',
                              borderRadius: '4px',
                              transition: 'background-color 0.3s',
                              color: '#fff',
                              backgroundColor: '#FA5A16',
                            }}
                            loading={loading}
                            done={finished}
                            // onClick={saveReferal}
                            onClick={formik.handleSubmit}
                          >
                            Confirm
                          </LoadingButton>
                        </Grid>
                      </Grid>
                    </Box>

                  </form>
                </FormikProvider>

              </Box>

            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OwnerReferralModal;


