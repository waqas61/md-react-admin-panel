import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

// material-ui
// import { useTheme } from '@mui/material/styles';
import { Person2Outlined } from '@mui/icons-material';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Card
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';

import ChangeEmailDialog from '../../ui-component/ChangeEmailDialog';
import ChangePasswordDialog from '../../ui-component/ChangePasswordDialog';

import SuccessModal from '../../ui-component/SuccessModal';
import ProfilePicture from '../../ui-component/ProfilePicture';

//store
import { selectUser, setUser } from '../../store/slices/userSlice';
import { gridSpacing } from '../../store/constant';


// ===============================|| COLOR BOX ||=============================== //

const ColorBox = ({ bgcolor, title, data, dark }) => (
  <>
    <Card sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4.5,
          bgcolor,
          color: dark ? 'grey.800' : '#ffffff'
        }}
      >
        {title && (
          <Typography variant="subtitle1" color="inherit">
            {title}
          </Typography>
        )}
        {!title && <Box sx={{ p: 1.15 }} />}
      </Box>
    </Card>
    {data && (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="subtitle2">{data.label}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
            {data.color}
          </Typography>
        </Grid>
      </Grid>
    )}
  </>
);

ColorBox.propTypes = {
  bgcolor: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object.isRequired,
  dark: PropTypes.bool
};




const OwnerProfile = () => {
  const [stateOptions, setStateOptions] = useState([]);
  const [billingStateValue, setBillingStateValue] = useState(null);
  const [stateValue, setStateValue] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [billingCityOptions, setBillingCityOptions] = useState([]);
  const [cityValue, setCityValue] = useState(null);
  const [cityQuery, setCityQuery] = useState('');
  const [cityPage, setCityPage] = useState(1);
  const [billingCityQuery, setBillingCityQuery] = useState('');
  const [billingCityPage, setBillingCityPage] = useState(1);
  const [billingCityValue, setBillingCityValue] = useState(null);
  const [specialityOptions, setSpecialityOptions] = useState([]);
  const [timeZoneOptions, setTimeZoneOptions] = useState([]);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [changeEmail, setChangeEmail] = useState({
    password: '',
    email: '',
  });
  const [changePassword, setChangePassword] = useState({
    c_password: '',
    n_password: '',
    confirm_password: '',
  });

  const [profileSubmit, setProfileSubmit] = useState(false);

  const currentUser = useSelector(selectUser);

  const dispatch = useDispatch();
  const [website, setWebsite] = useState(
    currentUser && currentUser.website ? currentUser.website : null
  );
  const [title, setTitle] = useState(
    currentUser && currentUser.title ? currentUser.title : ''
  );
  const [firstName, setFirstName] = useState(
    currentUser && currentUser.first_name ? currentUser.first_name : ''
  );
  const [lastName, setLastName] = useState(
    currentUser && currentUser.last_name ? currentUser.last_name : ''
  );
  const [address, setAddress] = useState(
    currentUser && currentUser.street ? currentUser.street : ''
  );
  const [cityId, setCityId] = useState(
    currentUser && currentUser.city_id ? currentUser.city_id : ''
  );
  const [stateId, setStateId] = useState(
    currentUser && currentUser.state_id ? currentUser.state_id : ''
  );
  const [zip, setZip] = useState(
    currentUser && currentUser.zip ? currentUser.zip : ''
  );
  const [timeZoneId, setTimeZoneId] = useState(
    currentUser && currentUser.time_zone_id ? currentUser.time_zone_id : null
  );

  const [billingAddressSameAsPersonal, setBillingAddressSameAsPersonal] = useState(false);

  const [billingAddress, setBillingAddress] = useState(
    currentUser && currentUser.user_billing_addresses
      ? currentUser.user_billing_addresses[0]?.street
      : ''
  );

  const [billingCityId, setBillingCityId] = useState(
    currentUser && currentUser.user_billing_addresses
      ? currentUser.user_billing_addresses[0]?.city_id
      : ''
  );

  const [billingStateId, setBillingStateId] = useState(
    currentUser && currentUser.user_billing_addresses
      ? currentUser.user_billing_addresses[0]?.state_id
      : ''
  );

  const [billingZip, setBillingZip] = useState(
    currentUser && currentUser.user_billing_addresses
      ? currentUser.user_billing_addresses[0]?.zip
      : ''
  );

  const [companyName, setCompanyName] = useState(
    currentUser && currentUser.companies ? currentUser.companies[0]?.name : ''
  );

  const [officeManager, setOfficeManager] = useState(
    currentUser && currentUser.companies ? currentUser.companies[0]?.office_manager : ''
  );

  const [contactPhone, setContactPhone] = useState(
    currentUser && currentUser.companies ? currentUser.companies[0]?.contact_phone : ''
  );

  const [secondEmail, setSecondEmail] = useState(
    currentUser && currentUser.companies ? currentUser.companies[0]?.second_email : ''
  );

  const [practiceManagementSoftware, setPracticeManagementSoftware] = useState(
    currentUser && currentUser.companies
      ? currentUser.companies[0]?.practice_management_software
      : ''
  );

  const [companyWebsite, setCompanyWebsite] = useState(
    currentUser && currentUser.companies
      ? currentUser.companies[0]?.company_website
      : ''
  );

  const [doctorCell, setDoctorCell] = useState(
    currentUser && currentUser.companies ? currentUser.companies[0]?.doctor_cell : ''
  );

  // const [companySpecialtyId, setCompanySpecialtyId] = useState(
  //   currentUser && currentUser.companies ? currentUser.companies[0]?.speciality_id : ''
  // );

  const [companySpecialtyId, setCompanySpecialtyId] = useState(null);

  const [fax, setFax] = useState(
    currentUser && currentUser.companies ? currentUser.companies[0]?.fax : ''
  );

  const [afterWorkingHoursPhone, setAfterWorkingHoursPhone] = useState(
    currentUser && currentUser.companies ? currentUser.companies[0]?.after_work_phone : null
  );

  const [uploadFile, setUploadFile] = useState(null);

  const getTimeZones = async () => {
    try {
      const timeZoneRes = await axios.get(
        'https://api.mddentalstaffing.com/api/v1/zones'
      );

      const timeZoneArray = Object.values(timeZoneRes.data.data).map(
        (timeZone) => ({
          id: timeZone.id,
          label: timeZone.zone_name,
        })
      );
      setTimeZoneOptions(timeZoneArray);
    } catch (error) { }
  };

  const getStates = async () => {
    try {
      const stateRes = await axios.get(
        'https://api.mddentalstaffing.com/api/v1/states'
      );

      const statesArray = Object.values(stateRes.data.data).map((state) => ({
        value: state.id,
        label: state.name,
      }));
      setStateOptions(statesArray);
      if (currentUser?.user_billing_addresses[0]?.state_id) {
        const billingStateValue = statesArray.find(
          (option) => option.value === parseInt(billingStateId)
        );
        setBillingStateValue(billingStateValue);
      }

      if (currentUser.state_id) {
        const stateValue = statesArray.find(
          (option) => option.value === parseInt(currentUser.state_id)
        );
        setStateValue(stateValue);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   if (currentUser.state_id) {
  //     const stateValue = stateOptions.find(
  //       (option) => option.value === parseInt(currentUser.state_id)
  //     );
  //     setStateValue(stateValue);
  //   }
  // }, [currentUser.state_id]);

  const getSpecialities = async () => {
    try {
      const specialityRes = await axios.get(
        'https://api.mddentalstaffing.com/api/v1/specialities'
      );

      const specialitiesArray = Object.values(specialityRes.data.data).map(
        (speciality) => ({
          id: speciality.id,
          label: speciality.name,
        })
      );

      setSpecialityOptions(specialitiesArray);
      let company_speciality_id = currentUser && currentUser.companies ? currentUser.companies[0]?.speciality_id : null;
      let speciality_id = specialitiesArray.find(speciality => {
        return speciality.id === company_speciality_id
      })


      if (speciality_id != undefined) {
        setCompanySpecialtyId(speciality_id.id);
      }


    } catch (error) {
      console.error(error);
    }
  };

  const getCities = async () => {
    try {
      const cityRes = await axios.get(
        `https://api.mddentalstaffing.com/api/v1/cities?name=${cityQuery}&page=${cityPage}`
      );

      const citiesArray = Object.values(cityRes.data.data).map((city) => ({
        value: city.id,
        label: city.name,
      }));

      if (cityPage === 1) {
        setCityOptions(citiesArray);
        const cityValue = citiesArray.find(
          (option) => option.value === parseInt(currentUser.city_id)
        );
        setCityValue(cityValue);

      } else {
        setCityOptions((prevOptions) => [...prevOptions, ...citiesArray]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getBillingCities = async () => {
    try {
      const cityRes = await axios.get(
        `https://api.mddentalstaffing.com/api/v1/cities?name=${billingCityQuery}&page=${billingCityPage}`
      );

      const citiesArray = Object.values(cityRes.data.data).map((city) => ({
        value: city.id,
        label: city.name,
      }));

      if (cityPage === 1) {
        setBillingCityOptions(citiesArray);
      } else {
        setBillingCityOptions((prevOptions) => [
          ...prevOptions,
          ...citiesArray,
        ]);
      }

      if (currentUser?.user_billing_addresses[0]?.city_id) {
        const billingCityValue = citiesArray.find(
          (option) => option.value === parseInt(billingCityId)
        );
        setBillingCityValue(billingCityValue);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCities();
  }, [cityQuery, cityPage]);



  useEffect(() => {
    getCities();
  }, [cityQuery, cityPage]);

  useEffect(() => {
    getBillingCities();
  }, [billingCityQuery, billingCityPage]);

  useEffect(() => {
    getStates();
    getTimeZones();
    getSpecialities();
  }, []);

  useEffect(() => {
  }, [companySpecialtyId]);

  const handleCityInputChange = (event, newInputValue) => {
    setCityQuery(newInputValue);
    setCityPage(1);
  };

  const handleBillingCityInputChange = (event, newInputValue) => {
    setBillingCityQuery(newInputValue);
    setBillingCityPage(1);
  };

  const handleChangeEmail = async () => {
    const API_BASE_URL = 'https://api.mddentalstaffing.com/api/v1';
    try {
      axios
        .put(
          `${API_BASE_URL}/owner/profile/update-email`,
          {
            current_password: changeEmail.password,
            email: changeEmail.email,
          },
          {
            headers: {
              method: 'PUT',
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
          }
        )
        .then((res) => {
          const data = {
            ...currentUser,
            email: changeEmail.email,
          };
          setUser(data);
          setIsEmailOpen(false);
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePassword = async () => {
    const API_BASE_URL = 'https://api.mddentalstaffing.com/api/v1';
    try {
      axios
        .put(
          `${API_BASE_URL}/owner/profile/update-password`,
          {
            current_password: changePassword.c_password,
            password: changePassword.n_password,
            password_confirmation: changePassword.confirm_password,
            email: currentUser.email,
          },
          {
            headers: {
              method: 'PUT',
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
          }
        )
        .then((res) => {
          alert('password changed');
          setIsPasswordOpen(false);
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    // Add personal details
    if (title && title !== currentUser.title) {
      data.append('title', title);
    }
    if (firstName && firstName !== currentUser.first_name) {
      data.append('first_name', firstName);
    }
    if (lastName && lastName !== currentUser.last_name) {
      data.append('last_name', lastName);
    }
    if (address && address !== currentUser.street) {
      data.append('street', address);
    }
    if (cityId && cityId !== currentUser.city_id) {
      data.append('city_id', cityId);
    }
    if (stateId && stateId !== currentUser.state_id) {
      data.append('state_id', stateId);
    }
    if (zip && zip !== currentUser.zip) {
      data.append('zip', zip);
    }
    if (timeZoneId) {
      data.append('time_zone_id', timeZoneId);
    }
    // Handle billing address
    if (billingAddressSameAsPersonal) {
      if (address) {
        data.append('billing_street', address);
      }
      if (cityId) {
        data.append('billing_city_id', cityId);
      }
      if (stateId) {
        data.append('billing_state_id', stateId);
      }
      if (zip) {
        data.append('billing_zip', zip);
      }
    } else {
      if (billingAddress) {
        data.append('billing_street', billingAddress);
      }
      if (billingCityId) {
        data.append('billing_city_id', billingCityId);
      }
      if (billingStateId) {
        data.append('billing_state_id', billingStateId);
      }
      if (billingZip) {
        data.append('billing_zip', billingZip);
      }
    }

    // Add company details
    if (companyName) {
      data.append('company_name', companyName);
    }

    // if (officeManager && officeManager !== currentUser.companies[0].office_manager) {
    if (officeManager) {
      data.append('office_manager', officeManager);
    }
    if (contactPhone) {
      data.append('contact_phone', contactPhone);
    }
    if (secondEmail) {
      data.append('second_email', secondEmail);
    }
    if (practiceManagementSoftware) {
      data.append('practice_management_software', practiceManagementSoftware);
    }
    if (companyWebsite) {
      data.append('company_website', companyWebsite);
    }
    if (doctorCell) {
      data.append('doctor_cell', doctorCell);
    }
    if (companySpecialtyId) {
      data.append('speciality_id', companySpecialtyId);
    }
    if (fax) {
      data.append('fax', fax);
    }
    if (afterWorkingHoursPhone) {
      data.append('after_work_phone', afterWorkingHoursPhone);
    }

    // Handle file upload
    if (uploadFile) {
      data.append('upload_file', uploadFile);
    }

    axios
      .post(`https://api.mddentalstaffing.com/api/v1/owner/profile`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        dispatch(setUser(res.data.data));
        localStorage.setItem('user', JSON.stringify(res.data.data));
        setProfileSubmit(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  const theme = useTheme();
  return (
    <>
      <MainCard
      // title="Office Profile"
      // secondary={<SecondaryAction link="https://next.material-ui.com/system/palette/" />}
      >
        {/* <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <SubCard title="Primary Color">
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <ColorBox
                    bgcolor="primary.light"
                    data={{ label: 'Blue-50', color: theme.palette.primary.light }}
                    title="primary.light"
                    dark
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <ColorBox bgcolor="primary.200" data={{ label: 'Blue-200', color: theme.palette.primary[200] }} title="primary[200]" dark />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <ColorBox bgcolor="primary.main" data={{ label: 'Blue-500', color: theme.palette.primary.main }} title="primary.main" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <ColorBox bgcolor="primary.dark" data={{ label: 'Blue-600', color: theme.palette.primary.dark }} title="primary.dark" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <ColorBox bgcolor="primary.800" data={{ label: 'Blue-800', color: theme.palette.primary[800] }} title="primary[800]" />
                </Grid>
              </Grid>
            </SubCard>
          </Grid>

        </Grid> */}


        {/* <Grid
          sx={{
            px: 3,
            pt: 2,
            pb: 1,
            borderBottom: '1px solid #D9D9D9',
            width: 'auto',
          }}
        >
          <h4 className='pb-0 mb-1' style={{ color: '#262626' }}>
            Office Profile
          </h4>
          <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
            General Settings of Office Profile
          </p>
        </Grid> */}
        <div
          style={{
            padding: '24px',
            backgroundColor: '#fff',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '270px',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ color: '#5c5a5a', fontSize: '0.9rem' }}>
                Email Address
                <sup
                  style={{
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                  }}
                >
                  *
                </sup>
              </p>
              <p
                className='pb-0 mb-1'
                style={{
                  color: '#262626',
                  fontSize: '15px',
                  fontWeight: '500',
                }}
              >
                {currentUser && currentUser.email}
              </p>
              <p
                onClick={() => setIsEmailOpen(true)}
                style={{
                  textDecoration: 'underline',
                  color: 'blue',
                  fontSize: '0.9rem',
                  marginTop: '10px',
                  cursor: 'pointer',
                }}
              >
                Edit
              </p>
            </div>
            <div>
              <p style={{ color: '#5c5a5a', fontSize: '0.9rem' }}>Password</p>
              <p
                className='pb-0 mb-1'
                style={{
                  color: '#262626',
                  fontSize: '15px',
                  fontWeight: '500',
                }}
              >
                ***********
              </p>
              <p
                onClick={() => setIsPasswordOpen(true)}
                style={{
                  textDecoration: 'underline',
                  color: 'blue',
                  fontSize: '0.9rem',
                  marginTop: '10px',
                  cursor: 'pointer',
                }}
              >
                Edit
              </p>
            </div>
          </div>

          <Grid
            item
            xs={12}
            style={{
              marginTop: '25px',
            }}
          >
            <Typography variant='h6' component='h3'>
              Office Details
            </Typography>
          </Grid>

          <form onSubmit={handleSubmit}>
            <Grid
              container
              sx={{
                pt: 2,
                pb: 1,
                width: 'auto',
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    width: '70%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                  }}
                >
                  <Grid item xs={3}>
                    <FormControl fullWidth variant='outlined'>
                      {/* <Select
                      labelId='select-label'
                      id='title'
                      sx={{ mb: 2 }}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      label='Title'
                      name='title'
                    >
                      <MenuItem value='Mr.'>Mr.</MenuItem>
                      <MenuItem value='Mrs'>Mrs</MenuItem>
                      <MenuItem value='Miss'>Miss</MenuItem>
                    </Select> */}


                      <TextField
                        id='title'
                        name='title'
                        label='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />

                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl variant='outlined'>
                      <TextField
                        id='address'
                        name='address'
                        label='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl variant='outlined' className='w-100'>
                      {stateValue ? (
                        <>
                          <Autocomplete
                            options={stateOptions}
                            getOptionLabel={(option) => option.label}
                            // value={stateValue}
                            key={stateValue}
                            defaultValue={stateValue}
                            onChange={(event, newValue) => {
                              setStateId(newValue ? newValue.value : '');
                              setStateValue(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label='State'
                                variant='outlined'
                                className='w-100 mb-2'
                              />
                            )}
                          />
                        </>
                      ) : (
                        <>
                          <Autocomplete
                            options={stateOptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, newValue) => {
                              setStateId(newValue ? newValue.value : '');
                              setStateValue(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label='State'
                                variant='outlined'
                                className='w-100 mb-2'
                              />
                            )}
                          />
                        </>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        id='firstName'
                        name='first_name'
                        label='First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl variant='outlined' fullWidth>
                      {cityValue ? (
                        <>

                          <Autocomplete
                            options={cityOptions}
                            getOptionLabel={(option) => option.label}
                            // value={cityValue}
                            key={cityValue}
                            defaultValue={cityValue}
                            onChange={(event, newValue) => {
                              setCityId(newValue ? newValue.value : '');
                              setCityValue(newValue);
                            }}
                            onInputChange={handleCityInputChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label='City'
                                variant='outlined'
                                className='w-100 mb-2'
                              />
                            )}
                            MenuProps={{
                              onScroll: (e) => {
                                const target = e.target;
                                if (
                                  target.scrollHeight - target.scrollTop ===
                                  target.clientHeight
                                ) {
                                  setCityPage((page) => page + 1);
                                }
                              },
                            }}
                          />
                        </>
                      ) : (
                        <Autocomplete
                          options={cityOptions}
                          getOptionLabel={(option) => option.label}
                          onChange={(event, newValue) => {
                            setCityId(newValue ? newValue.value : '');
                            setCityValue(newValue);
                          }}
                          onInputChange={handleCityInputChange}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label='City'
                              variant='outlined'
                              className='w-100 mb-2'
                            />
                          )}
                          MenuProps={{
                            onScroll: (e) => {
                              const target = e.target;
                              if (
                                target.scrollHeight - target.scrollTop ===
                                target.clientHeight
                              ) {
                                setCityPage((page) => page + 1);
                              }
                            },
                          }}
                        />
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        id='zip'
                        name='zip'
                        label='Zip'
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        id='lastName'
                        name='last_name'
                        label='Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3} />

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id='timeZone'>Time Zone</InputLabel>
                      <Select
                        id='timeZone'
                        name='timeZone'
                        value={timeZoneId}
                        onChange={(e) => setTimeZoneId(e.target.value)}
                      >
                        {timeZoneOptions.map((timeZone) => (
                          <MenuItem value={timeZone.id}>
                            {timeZone.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id='billingAddressSameAsPersonal'
                          name='billingAddressSameAsPersonal'
                          checked={billingAddressSameAsPersonal}
                          onChange={(e) =>
                            setBillingAddressSameAsPersonal(e.target.checked)
                          }
                        />
                      }
                      label='Billing address is the same as office address.'
                    />
                  </Grid>

                  {billingAddressSameAsPersonal ? null : (
                    <>
                      <Grid item xs={3}>
                        <FormControl fullWidth>
                          <TextField
                            id='user_billing_addresses'
                            name='user_billing_addresses'
                            label='Billing Address'
                            value={billingAddress}
                            onChange={(e) => setBillingAddress(e.target.value)}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={3}>
                        <FormControl variant='outlined' fullWidth>
                          {billingStateValue ? (
                            <Autocomplete
                              options={stateOptions}
                              getOptionLabel={(option) => option.label}
                              // value={billingStateValue ? billingStateValue : ''}
                              key={billingStateValue}
                              defaultValue={billingStateValue}
                              onChange={(event, newValue) => {
                                setBillingStateId(newValue ? newValue.value : '');
                                setBillingStateValue(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label='State'
                                  variant='outlined'
                                  className='w-100 mb-2'
                                />
                              )}
                            />
                          ) : (
                            <Autocomplete
                              options={stateOptions}
                              getOptionLabel={(option) => option.label}
                              onChange={(event, newValue) => {
                                setBillingStateId(newValue ? newValue.value : '');
                                setBillingStateValue(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label='State'
                                  variant='outlined'
                                  className='w-100 mb-2'
                                />
                              )}
                            />
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={3} />

                      <Grid item xs={3}>
                        <FormControl fullWidth variant='outlined'>
                          {billingCityValue ? (
                            <Autocomplete
                              options={billingCityOptions}
                              getOptionLabel={(option) => option.label}
                              // value={billingCityValue ? billingCityValue : ''}
                              key={billingCityValue}
                              defaultValue={billingCityValue}
                              onChange={(event, newValue) => {
                                setBillingCityId(newValue ? newValue.value : '');
                                setBillingCityValue(newValue);
                              }}
                              onInputChange={handleBillingCityInputChange}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label='Billing City'
                                  variant='outlined'
                                  className='w-100 mb-2'
                                />
                              )}
                              MenuProps={{
                                onScroll: (e) => {
                                  const target = e.target;
                                  if (
                                    target.scrollHeight - target.scrollTop ===
                                    target.clientHeight
                                  ) {
                                    setCityPage((page) => page + 1);
                                  }
                                },
                              }}
                            />
                          ) : (
                            <Autocomplete
                              options={billingCityOptions}
                              getOptionLabel={(option) => option.label}
                              onChange={(event, newValue) => {
                                setBillingCityId(newValue ? newValue.value : '');
                                setBillingCityValue(newValue);
                              }}
                              onInputChange={handleBillingCityInputChange}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label='Billing City'
                                  variant='outlined'
                                  className='w-100 mb-2'
                                />
                              )}
                              MenuProps={{
                                onScroll: (e) => {
                                  const target = e.target;
                                  if (
                                    target.scrollHeight - target.scrollTop ===
                                    target.clientHeight
                                  ) {
                                    setCityPage((page) => page + 1);
                                  }
                                },
                              }}
                            />
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={3}>
                        <FormControl fullWidth>
                          <TextField
                            id='billingZip'
                            name='billingZip'
                            label='Billing Zip Code'
                            value={billingZip}
                            onChange={(e) => setBillingZip(e.target.value)}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={3} />
                    </>
                  )}

                  <Grid item xs={12}>
                    <Typography variant='h6' component='h3'>
                      Company Details
                    </Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        id='companyName'
                        name='companyName'
                        label='Company Name'
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        id='officeManager'
                        name='officeManager'
                        label='Office Manager'
                        value={officeManager}
                        onChange={(e) => setOfficeManager(e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        id='afterWorkingHoursPhone'
                        name='afterWorkingHoursPhone'
                        label='After working hours phone number*'
                        value={afterWorkingHoursPhone}
                        onChange={(e) =>
                          setAfterWorkingHoursPhone(e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        id='contactPhone'
                        name='contactPhone'
                        label='Contact Phone'
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        id='secondEmail'
                        name='secondEmail'
                        label='Second Email'
                        value={secondEmail}
                        onChange={(e) => setSecondEmail(e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        id='practiceManagementSoftware'
                        name='practiceManagementSoftware'
                        label='Practice Management Software'
                        value={practiceManagementSoftware}
                        onChange={(e) =>
                          setPracticeManagementSoftware(e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        id='companyWebsite'
                        name='companyWebsite'
                        label='Company Website'
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        id='doctorCell'
                        name='doctorCell'
                        label='Doctor Cell'
                        value={doctorCell}
                        onChange={(e) => setDoctorCell(e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3} />
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-label'>Company Specialty</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='company-specialty-label'
                        // name='company_specialty'
                        value={companySpecialtyId}
                        // defaultValue={companySpecialtyId}
                        onChange={(e) => setCompanySpecialtyId(e.target.value)}
                      >
                        {specialityOptions.map((speciality) => (
                          <MenuItem value={speciality.id}>
                            {speciality.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <TextField
                        id='fax'
                        name='fax'
                        label='Fax'
                        value={fax}
                        onChange={(e) => setFax(e.target.value)}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3} />
                </div>
                {/* <div style={{ width: '30%' }}>
                <div
                  style={{
                    margin: '10px 2px',
                    padding: '20px 10px',
                    backgroundColor: '#f4f4f4',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '6px',
                  }}
                >

                  <img
                    style={{
                      borderRadius: '50%',
                      height: '150px',
                      width: '150px',
                      objectFit: 'cover',
                    }}
                    src={
                      uploadFile
                        ? URL.createObjectURL(uploadFile)
                        : `https://api.mddentalstaffing.com/api/v1/assets/${currentUser.avatar}`
                    }
                    alt=''
                    srcset=''
                  />
                  <Grid
                    sx={{
                      pt: 3,
                      pb: 1,
                      width: 'auto',
                      color: '#8C8C8C',
                      fontSize: '1rem',
                    }}
                  >
                    My Profile Photo
                  </Grid>
                  <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
                    A square image 400x400px is recommended
                  </p>
                  <Button
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid rgb(37, 97, 176)',
                      marginTop: '20px',
                      color: 'rgb(37, 97, 176)',
                      textTransform: 'none',
                      borderRadius: '20px',
                    }}
                    component='label'
                    variant='contained'
                    startIcon={<UploadOutlinedIcon />}
                    onChange={(event) => {
                      setUploadFile(event.target.files[0]);
                    }}
                  >
                    Upload New Photo
                    <VisuallyHiddenInput type='file' />
                  </Button>
                </div>
              </div> */}
                <ProfilePicture />
              </div>
            </Grid>
            <Box paddingTop={2}>
              <Button variant='contained' color='primary' type='submit'>
                Save
              </Button>
            </Box>
          </form>
        </div>

        {isEmailOpen && (
          <ChangeEmailDialog
            open={isEmailOpen}
            handleClose={() => setIsEmailOpen(false)}
            changeEmail={changeEmail}
            setChangeEmail={setChangeEmail}
            handleChangeEmail={handleChangeEmail}
          />
        )}
        {isPasswordOpen && (
          <ChangePasswordDialog
            open={isPasswordOpen}
            handleClose={() => setIsPasswordOpen(false)}
            changePassword={changePassword}
            setChangePassword={setChangePassword}
            handleChangePassword={handleChangePassword}
          />
        )}
        {profileSubmit && (
          <SuccessModal
            open={profileSubmit}
            handleClose={() => setProfileSubmit(false)}
            successMessage={'Profile Updated Successfully'}
          />
        )}




      </MainCard>
    </>

    // <Layout
    //   items={[
    //     {
    //       name: 'My Account',
    //       link: '/',
    //       icon: <Person2Outlined sx={{ py: 0.2 }} />,
    //     },
    //     {
    //       name: 'Office Profile',
    //       link: '/owner/account/profile',
    //       icon: (
    //         <svg
    //           xmlns='http://www.w3.org/2000/svg'
    //           width='15'
    //           height='15'
    //           viewBox='0 0 20 20'
    //           fill='none'
    //         >
    //           <path
    //             fill-rule='evenodd'
    //             clip-rule='evenodd'
    //             d='M16.666 0H3.33268V1.66667H16.666V0ZM16.666 3.33333H3.33268C2.41602 3.33333 1.66602 4.08333 1.66602 5V15C1.66602 15.9167 2.41602 16.6667 3.33268 16.6667H16.666C17.5827 16.6667 18.3327 15.9167 18.3327 15V5C18.3327 4.08333 17.5827 3.33333 16.666 3.33333ZM16.666 15H3.33268V5H16.666V15ZM3.33268 18.3333H16.666V20H3.33268V18.3333ZM14.9993 11.6667H4.99935V13.3333H14.9993V11.6667ZM4.99935 9.16667H14.9993V10.8333H4.99935V9.16667ZM14.9993 6.66667H4.99935V8.33333H14.9993V6.66667Z'
    //             fill={'#0000008A'}
    //           />
    //         </svg>
    //       ),
    //     },
    //   ]}
    // >
    //   <Grid
    //     sx={{
    //       px: 3,
    //       pt: 2,
    //       pb: 1,
    //       borderBottom: '1px solid #D9D9D9',
    //       width: 'auto',
    //     }}
    //   >
    //     <h4 className='pb-0 mb-1' style={{ color: '#262626' }}>
    //       Office Profile
    //     </h4>
    //     <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
    //       General Settings of Office Profile
    //     </p>
    //   </Grid>
    //   <div
    //     style={{
    //       padding: '24px',
    //       backgroundColor: '#fff',
    //     }}
    //   >
    //     <div
    //       style={{
    //         display: 'flex',
    //         width: '270px',
    //         justifyContent: 'space-between',
    //       }}
    //     >
    //       <div>
    //         <p style={{ color: '#5c5a5a', fontSize: '0.9rem' }}>
    //           Email Address
    //           <sup
    //             style={{
    //               color: 'red',
    //               fontWeight: 'bold',
    //               fontSize: '0.9rem',
    //             }}
    //           >
    //             *
    //           </sup>
    //         </p>
    //         <p
    //           className='pb-0 mb-1'
    //           style={{
    //             color: '#262626',
    //             fontSize: '15px',
    //             fontWeight: '500',
    //           }}
    //         >
    //           {currentUser && currentUser.email}
    //         </p>
    //         <p
    //           onClick={() => setIsEmailOpen(true)}
    //           style={{
    //             textDecoration: 'underline',
    //             color: 'blue',
    //             fontSize: '0.9rem',
    //             marginTop: '10px',
    //             cursor: 'pointer',
    //           }}
    //         >
    //           Edit
    //         </p>
    //       </div>
    //       <div>
    //         <p style={{ color: '#5c5a5a', fontSize: '0.9rem' }}>Password</p>
    //         <p
    //           className='pb-0 mb-1'
    //           style={{
    //             color: '#262626',
    //             fontSize: '15px',
    //             fontWeight: '500',
    //           }}
    //         >
    //           ***********
    //         </p>
    //         <p
    //           onClick={() => setIsPasswordOpen(true)}
    //           style={{
    //             textDecoration: 'underline',
    //             color: 'blue',
    //             fontSize: '0.9rem',
    //             marginTop: '10px',
    //             cursor: 'pointer',
    //           }}
    //         >
    //           Edit
    //         </p>
    //       </div>
    //     </div>

    //     <Grid
    //       item
    //       xs={12}
    //       style={{
    //         marginTop: '25px',
    //       }}
    //     >
    //       <Typography variant='h6' component='h3'>
    //         Office Details
    //       </Typography>
    //     </Grid>

    //     <form onSubmit={handleSubmit}>
    //       <Grid
    //         container
    //         sx={{
    //           pt: 2,
    //           pb: 1,
    //           width: 'auto',
    //         }}
    //       >
    //         <div
    //           style={{
    //             width: '100%',
    //             display: 'flex',
    //             justifyContent: 'space-between',
    //           }}
    //         >
    //           <div
    //             style={{
    //               width: '70%',
    //               display: 'flex',
    //               flexWrap: 'wrap',
    //               gap: '20px',
    //             }}
    //           >
    //             <Grid item xs={3}>
    //               <FormControl fullWidth variant='outlined'>
    //                 {/* <Select
    //                   labelId='select-label'
    //                   id='title'
    //                   sx={{ mb: 2 }}
    //                   value={title}
    //                   onChange={(e) => setTitle(e.target.value)}
    //                   label='Title'
    //                   name='title'
    //                 >
    //                   <MenuItem value='Mr.'>Mr.</MenuItem>
    //                   <MenuItem value='Mrs'>Mrs</MenuItem>
    //                   <MenuItem value='Miss'>Miss</MenuItem>
    //                 </Select> */}


    //                 <TextField
    //                   id='title'
    //                   name='title'
    //                   label='Title'
    //                   value={title}
    //                   onChange={(e) => setTitle(e.target.value)}
    //                 />

    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3}>
    //               <FormControl variant='outlined'>
    //                 <TextField
    //                   id='address'
    //                   name='address'
    //                   label='Address'
    //                   value={address}
    //                   onChange={(e) => setAddress(e.target.value)}
    //                 />
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3}>
    //               <FormControl variant='outlined' className='w-100'>
    //                 {stateValue ? (
    //                   <>
    //                     <Autocomplete
    //                       options={stateOptions}
    //                       getOptionLabel={(option) => option.label}
    //                       // value={stateValue}
    //                       key={stateValue}
    //                       defaultValue={stateValue}
    //                       onChange={(event, newValue) => {
    //                         setStateId(newValue ? newValue.value : '');
    //                         setStateValue(newValue);
    //                       }}
    //                       renderInput={(params) => (
    //                         <TextField
    //                           {...params}
    //                           label='State'
    //                           variant='outlined'
    //                           className='w-100 mb-2'
    //                         />
    //                       )}
    //                     />
    //                   </>
    //                 ) : (
    //                   <>
    //                     <Autocomplete
    //                       options={stateOptions}
    //                       getOptionLabel={(option) => option.label}
    //                       onChange={(event, newValue) => {
    //                         setStateId(newValue ? newValue.value : '');
    //                         setStateValue(newValue);
    //                       }}
    //                       renderInput={(params) => (
    //                         <TextField
    //                           {...params}
    //                           label='State'
    //                           variant='outlined'
    //                           className='w-100 mb-2'
    //                         />
    //                       )}
    //                     />
    //                   </>
    //                 )}
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3}>
    //               <FormControl fullWidth>
    //                 <TextField
    //                   id='firstName'
    //                   name='first_name'
    //                   label='First Name'
    //                   value={firstName}
    //                   onChange={(e) => setFirstName(e.target.value)}
    //                 />
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3}>
    //               <FormControl variant='outlined' fullWidth>
    //                 {cityValue ? (
    //                   <>

    //                     <Autocomplete
    //                       options={cityOptions}
    //                       getOptionLabel={(option) => option.label}
    //                       // value={cityValue}
    //                       key={cityValue}
    //                       defaultValue={cityValue}
    //                       onChange={(event, newValue) => {
    //                         setCityId(newValue ? newValue.value : '');
    //                         setCityValue(newValue);
    //                       }}
    //                       onInputChange={handleCityInputChange}
    //                       renderInput={(params) => (
    //                         <TextField
    //                           {...params}
    //                           label='City'
    //                           variant='outlined'
    //                           className='w-100 mb-2'
    //                         />
    //                       )}
    //                       MenuProps={{
    //                         onScroll: (e) => {
    //                           const target = e.target;
    //                           if (
    //                             target.scrollHeight - target.scrollTop ===
    //                             target.clientHeight
    //                           ) {
    //                             setCityPage((page) => page + 1);
    //                           }
    //                         },
    //                       }}
    //                     />
    //                   </>
    //                 ) : (
    //                   <Autocomplete
    //                     options={cityOptions}
    //                     getOptionLabel={(option) => option.label}
    //                     onChange={(event, newValue) => {
    //                       setCityId(newValue ? newValue.value : '');
    //                       setCityValue(newValue);
    //                     }}
    //                     onInputChange={handleCityInputChange}
    //                     renderInput={(params) => (
    //                       <TextField
    //                         {...params}
    //                         label='City'
    //                         variant='outlined'
    //                         className='w-100 mb-2'
    //                       />
    //                     )}
    //                     MenuProps={{
    //                       onScroll: (e) => {
    //                         const target = e.target;
    //                         if (
    //                           target.scrollHeight - target.scrollTop ===
    //                           target.clientHeight
    //                         ) {
    //                           setCityPage((page) => page + 1);
    //                         }
    //                       },
    //                     }}
    //                   />
    //                 )}
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3}>
    //               <FormControl fullWidth>
    //                 <TextField
    //                   id='zip'
    //                   name='zip'
    //                   label='Zip'
    //                   value={zip}
    //                   onChange={(e) => setZip(e.target.value)}
    //                 />
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3}>
    //               <FormControl fullWidth>
    //                 <TextField
    //                   id='lastName'
    //                   name='last_name'
    //                   label='Last Name'
    //                   value={lastName}
    //                   onChange={(e) => setLastName(e.target.value)}
    //                 />
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3} />

    //             <Grid item xs={3}>
    //               <FormControl fullWidth>
    //                 <InputLabel id='timeZone'>Time Zone</InputLabel>
    //                 <Select
    //                   id='timeZone'
    //                   name='timeZone'
    //                   value={timeZoneId}
    //                   onChange={(e) => setTimeZoneId(e.target.value)}
    //                 >
    //                   {timeZoneOptions.map((timeZone) => (
    //                     <MenuItem value={timeZone.id}>
    //                       {timeZone.label}
    //                     </MenuItem>
    //                   ))}
    //                 </Select>
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={12}>
    //               <FormControlLabel
    //                 control={
    //                   <Checkbox
    //                     id='billingAddressSameAsPersonal'
    //                     name='billingAddressSameAsPersonal'
    //                     checked={billingAddressSameAsPersonal}
    //                     onChange={(e) =>
    //                       setBillingAddressSameAsPersonal(e.target.checked)
    //                     }
    //                   />
    //                 }
    //                 label='Billing address is the same as office address.'
    //               />
    //             </Grid>

    //             {billingAddressSameAsPersonal ? null : (
    //               <>
    //                 <Grid item xs={3}>
    //                   <FormControl fullWidth>
    //                     <TextField
    //                       id='user_billing_addresses'
    //                       name='user_billing_addresses'
    //                       label='Billing Address'
    //                       value={billingAddress}
    //                       onChange={(e) => setBillingAddress(e.target.value)}
    //                     />
    //                   </FormControl>
    //                 </Grid>

    //                 <Grid item xs={3}>
    //                   <FormControl variant='outlined' fullWidth>
    //                     {billingStateValue ? (
    //                       <Autocomplete
    //                         options={stateOptions}
    //                         getOptionLabel={(option) => option.label}
    //                         // value={billingStateValue ? billingStateValue : ''}
    //                         key={billingStateValue}
    //                         defaultValue={billingStateValue}
    //                         onChange={(event, newValue) => {
    //                           setBillingStateId(newValue ? newValue.value : '');
    //                           setBillingStateValue(newValue);
    //                         }}
    //                         renderInput={(params) => (
    //                           <TextField
    //                             {...params}
    //                             label='State'
    //                             variant='outlined'
    //                             className='w-100 mb-2'
    //                           />
    //                         )}
    //                       />
    //                     ) : (
    //                       <Autocomplete
    //                         options={stateOptions}
    //                         getOptionLabel={(option) => option.label}
    //                         onChange={(event, newValue) => {
    //                           setBillingStateId(newValue ? newValue.value : '');
    //                           setBillingStateValue(newValue);
    //                         }}
    //                         renderInput={(params) => (
    //                           <TextField
    //                             {...params}
    //                             label='State'
    //                             variant='outlined'
    //                             className='w-100 mb-2'
    //                           />
    //                         )}
    //                       />
    //                     )}
    //                   </FormControl>
    //                 </Grid>

    //                 <Grid item xs={3} />

    //                 <Grid item xs={3}>
    //                   <FormControl fullWidth variant='outlined'>
    //                     {billingCityValue ? (
    //                       <Autocomplete
    //                         options={billingCityOptions}
    //                         getOptionLabel={(option) => option.label}
    //                         // value={billingCityValue ? billingCityValue : ''}
    //                         key={billingCityValue}
    //                         defaultValue={billingCityValue}
    //                         onChange={(event, newValue) => {
    //                           setBillingCityId(newValue ? newValue.value : '');
    //                           setBillingCityValue(newValue);
    //                         }}
    //                         onInputChange={handleBillingCityInputChange}
    //                         renderInput={(params) => (
    //                           <TextField
    //                             {...params}
    //                             label='Billing City'
    //                             variant='outlined'
    //                             className='w-100 mb-2'
    //                           />
    //                         )}
    //                         MenuProps={{
    //                           onScroll: (e) => {
    //                             const target = e.target;
    //                             if (
    //                               target.scrollHeight - target.scrollTop ===
    //                               target.clientHeight
    //                             ) {
    //                               setCityPage((page) => page + 1);
    //                             }
    //                           },
    //                         }}
    //                       />
    //                     ) : (
    //                       <Autocomplete
    //                         options={billingCityOptions}
    //                         getOptionLabel={(option) => option.label}
    //                         onChange={(event, newValue) => {
    //                           setBillingCityId(newValue ? newValue.value : '');
    //                           setBillingCityValue(newValue);
    //                         }}
    //                         onInputChange={handleBillingCityInputChange}
    //                         renderInput={(params) => (
    //                           <TextField
    //                             {...params}
    //                             label='Billing City'
    //                             variant='outlined'
    //                             className='w-100 mb-2'
    //                           />
    //                         )}
    //                         MenuProps={{
    //                           onScroll: (e) => {
    //                             const target = e.target;
    //                             if (
    //                               target.scrollHeight - target.scrollTop ===
    //                               target.clientHeight
    //                             ) {
    //                               setCityPage((page) => page + 1);
    //                             }
    //                           },
    //                         }}
    //                       />
    //                     )}
    //                   </FormControl>
    //                 </Grid>

    //                 <Grid item xs={3}>
    //                   <FormControl fullWidth>
    //                     <TextField
    //                       id='billingZip'
    //                       name='billingZip'
    //                       label='Billing Zip Code'
    //                       value={billingZip}
    //                       onChange={(e) => setBillingZip(e.target.value)}
    //                     />
    //                   </FormControl>
    //                 </Grid>

    //                 <Grid item xs={3} />
    //               </>
    //             )}

    //             <Grid item xs={12}>
    //               <Typography variant='h6' component='h3'>
    //                 Company Details
    //               </Typography>
    //             </Grid>

    //             <Grid item xs={3}>
    //               <FormControl fullWidth>
    //                 <TextField
    //                   id='companyName'
    //                   name='companyName'
    //                   label='Company Name'
    //                   value={companyName}
    //                   onChange={(e) => setCompanyName(e.target.value)}
    //                 />
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3}>
    //               <FormControl fullWidth>
    //                 <TextField
    //                   id='officeManager'
    //                   name='officeManager'
    //                   label='Office Manager'
    //                   value={officeManager}
    //                   onChange={(e) => setOfficeManager(e.target.value)}
    //                 />
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3}>
    //               <FormControl fullWidth>
    //                 <TextField
    //                   id='afterWorkingHoursPhone'
    //                   name='afterWorkingHoursPhone'
    //                   label='After working hours phone number*'
    //                   value={afterWorkingHoursPhone}
    //                   onChange={(e) =>
    //                     setAfterWorkingHoursPhone(e.target.value)
    //                   }
    //                 />
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3}>
    //               <FormControl fullWidth>
    //                 <TextField
    //                   id='contactPhone'
    //                   name='contactPhone'
    //                   label='Contact Phone'
    //                   value={contactPhone}
    //                   onChange={(e) => setContactPhone(e.target.value)}
    //                 />
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3}>
    //               <FormControl fullWidth>
    //                 <TextField
    //                   id='secondEmail'
    //                   name='secondEmail'
    //                   label='Second Email'
    //                   value={secondEmail}
    //                   onChange={(e) => setSecondEmail(e.target.value)}
    //                 />
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3}>
    //               <FormControl fullWidth>
    //                 <TextField
    //                   id='practiceManagementSoftware'
    //                   name='practiceManagementSoftware'
    //                   label='Practice Management Software'
    //                   value={practiceManagementSoftware}
    //                   onChange={(e) =>
    //                     setPracticeManagementSoftware(e.target.value)
    //                   }
    //                 />
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3}>
    //               <FormControl fullWidth>
    //                 <TextField
    //                   id='companyWebsite'
    //                   name='companyWebsite'
    //                   label='Company Website'
    //                   value={website}
    //                   onChange={(e) => setWebsite(e.target.value)}
    //                 />
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3}>
    //               <FormControl fullWidth>
    //                 <TextField
    //                   id='doctorCell'
    //                   name='doctorCell'
    //                   label='Doctor Cell'
    //                   value={doctorCell}
    //                   onChange={(e) => setDoctorCell(e.target.value)}
    //                 />
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3} />
    //             <Grid item xs={3}>
    //               <FormControl fullWidth>
    //                 <InputLabel id='demo-simple-select-label'>Company Specialty</InputLabel>
    //                 <Select
    //                   labelId='demo-simple-select-label'
    //                   id='company-specialty-label'
    //                   // name='company_specialty'
    //                   value={companySpecialtyId}
    //                   // defaultValue={companySpecialtyId}
    //                   onChange={(e) => setCompanySpecialtyId(e.target.value)}
    //                 >
    //                   {specialityOptions.map((speciality) => (
    //                     <MenuItem value={speciality.id}>
    //                       {speciality.label}
    //                     </MenuItem>
    //                   ))}
    //                 </Select>
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3}>
    //               <FormControl fullWidth>
    //                 <TextField
    //                   id='fax'
    //                   name='fax'
    //                   label='Fax'
    //                   value={fax}
    //                   onChange={(e) => setFax(e.target.value)}
    //                 />
    //               </FormControl>
    //             </Grid>

    //             <Grid item xs={3} />
    //           </div>
    //           {/* <div style={{ width: '30%' }}>
    //             <div
    //               style={{
    //                 margin: '10px 2px',
    //                 padding: '20px 10px',
    //                 backgroundColor: '#f4f4f4',
    //                 display: 'flex',
    //                 flexDirection: 'column',
    //                 alignItems: 'center',
    //                 borderRadius: '6px',
    //               }}
    //             >

    //               <img
    //                 style={{
    //                   borderRadius: '50%',
    //                   height: '150px',
    //                   width: '150px',
    //                   objectFit: 'cover',
    //                 }}
    //                 src={
    //                   uploadFile
    //                     ? URL.createObjectURL(uploadFile)
    //                     : `https://api.mddentalstaffing.com/api/v1/assets/${currentUser.avatar}`
    //                 }
    //                 alt=''
    //                 srcset=''
    //               />
    //               <Grid
    //                 sx={{
    //                   pt: 3,
    //                   pb: 1,
    //                   width: 'auto',
    //                   color: '#8C8C8C',
    //                   fontSize: '1rem',
    //                 }}
    //               >
    //                 My Profile Photo
    //               </Grid>
    //               <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
    //                 A square image 400x400px is recommended
    //               </p>
    //               <Button
    //                 style={{
    //                   backgroundColor: 'transparent',
    //                   border: '1px solid rgb(37, 97, 176)',
    //                   marginTop: '20px',
    //                   color: 'rgb(37, 97, 176)',
    //                   textTransform: 'none',
    //                   borderRadius: '20px',
    //                 }}
    //                 component='label'
    //                 variant='contained'
    //                 startIcon={<UploadOutlinedIcon />}
    //                 onChange={(event) => {
    //                   setUploadFile(event.target.files[0]);
    //                 }}
    //               >
    //                 Upload New Photo
    //                 <VisuallyHiddenInput type='file' />
    //               </Button>
    //             </div>
    //           </div> */}
    //           <ProfilePicture />
    //         </div>
    //       </Grid>
    //       <Box paddingTop={2}>
    //         <Button variant='contained' color='primary' type='submit'>
    //           Save
    //         </Button>
    //       </Box>
    //     </form>
    //   </div>

    //   {isEmailOpen && (
    //     <ChangeEmailDialog
    //       open={isEmailOpen}
    //       handleClose={() => setIsEmailOpen(false)}
    //       changeEmail={changeEmail}
    //       setChangeEmail={setChangeEmail}
    //       handleChangeEmail={handleChangeEmail}
    //     />
    //   )}
    //   {isPasswordOpen && (
    //     <ChangePasswordDialog
    //       open={isPasswordOpen}
    //       handleClose={() => setIsPasswordOpen(false)}
    //       changePassword={changePassword}
    //       setChangePassword={setChangePassword}
    //       handleChangePassword={handleChangePassword}
    //     />
    //   )}
    //   {profileSubmit && (
    //     <SuccessModal
    //       open={profileSubmit}
    //       handleClose={() => setProfileSubmit(false)}
    //       successMessage={'Profile Updated Successfully'}
    //     />
    //   )}
    // </Layout>
  );
};

export default OwnerProfile;
