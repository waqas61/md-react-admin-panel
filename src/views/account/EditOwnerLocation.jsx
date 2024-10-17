import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import {
  Person2Outlined,
  MyLocation,
  CloseOutlined,
} from '@mui/icons-material';
import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ErrorOutlineOutlined } from '@mui/icons-material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const EditOwnerLocation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [stateValue, setStateValue] = useState(null);
  const [stateOptions, setStateOptions] = useState([]);
  const [timeZoneOptions, setTimeZoneOptions] = useState([]);
  const [cityValue, setCityValue] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);

  const [location, setLocation] = useState(null);

  const [locationName, setLocationName] = useState(
    location ? location.place_name : ''
  );
  const [firstName, setFirstName] = useState(
    location ? location.contact_first_name : ''
  );
  const [lastName, setLastName] = useState('');
  const [locationEmail, setLocationEmail] = useState('');
  const [locationPhone, setLocationPhone] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [timeZoneId, setTimeZoneId] = useState('');
  const [cityId, setCityId] = useState('');
  const [stateId, setStateId] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openState, setOpenState] = React.useState(false);
  const [openCity, setOpenCity] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [validZip, setValidZip] = React.useState(false);
  const divRef = React.useRef();

  function handleClick() {
    setAnchorEl(divRef.current);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id_pop = open ? "simple-popover" : undefined;

  const handleCityInputChange = (event, value) => {
    getCities(value, 1);
  };

  const fetchLocation = () => {
    axios
      .get(`https://api.mddentalstaffing.com/api/v1/owner/locations/${id}`, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((res) => {
        setLocation(res.data.data);
      })
      .catch((e) => console.log(e));
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
      // setStateOptions(statesArray);
      // if (location.state_id) {
      //   const stateValue = statesArray.find(
      //     (option) => option.value === parseInt(location.state_id)
      //   );
      //   setStateValue(stateValue);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      place_name: locationName,
      contact_first_name: firstName,
      contact_last_name: lastName,
      location_email: locationEmail,
      location_phone: locationPhone,
      address: address,
      zip: zip,
      time_zone_id: timeZoneId,
      city_id: cityId,
      state_id: stateId,
    };

    axios
      .put(
        `https://api.mddentalstaffing.com/api/v1/owner/locations/${id}`,
        data,
        {
          headers: {
            method: 'PUT',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((res) => {
        navigate(`/owner/account/locations`);
      })
      .catch((e) => console.log(e));
  };

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

  const getCities = async (cityQuery, cityPage) => {
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
      } else {
        setCityOptions((prevOptions) => [...prevOptions, ...citiesArray]);
      }

      if (location.city_id) {
        const cityValue = citiesArray.find(
          (option) => option.value === parseInt(location.city_id)
        );
        setCityValue(cityValue);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCityStateByZip = async (zip) => {
    try {
      setLoader(true);
      const response = await axios.get(
        `https://api.mddentalstaffing.com/api/v1/get-city-state/${zip}`
      );

      const { state_city, status, lat_lon, formatted_address } = response.data.data.data;

      if (status === "OK") {
        const statesArray = [{
          value: state_city.id,
          label: state_city.name,
        }];

        const citiesArray = Object.values(state_city.cities).map((city) => ({
          value: city.id,
          label: city.name,
        }));

        setStateOptions(statesArray);
        setCityOptions(citiesArray);
        setStateValue(statesArray[0]);
        setCityValue(citiesArray[0]);
        setStateId(statesArray[0].value);
        setCityId(citiesArray[0].value);
        setLongitude(lat_lon.longitude);
        setLatitude(lat_lon.latitude);
        setAddress(formatted_address);
        setValidZip(true);
        setLoader(false);
        // setOpenState(true);
        // setOpenCity(true);
      } else {
        setStateOptions([]);
        setCityOptions([]);
        setLoader(false);
        setValidZip(false);
        setStateId(null);
        setCityId(null);
        handleClick();
        console.error('No results found for the given ZIP code');
      }
    } catch (error) {
      // Handle error from the API request
      console.error('Error fetching data from Google Maps API:', error);
    }
  };

  const handleZipCodeChange = async (e) => {
    const newZip = e.target.value;
    setZip(e.target.value)
    setValidZip(false);
    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(e.target.value)) {
      await getCityStateByZip(newZip);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    // getStates();
    getTimeZones();
    // getCities('', 1);
  }, []);

  useEffect(() => {
    setLocationName(location ? location.place_name : '');
    setFirstName(location ? location.contact_first_name : '');
    setLastName(location ? location.contact_last_name : '');
    setLocationEmail(location ? location.location_email : '');
    setLocationPhone(location ? location.location_phone : '');
    setAddress(location ? location.address : '');
    setZip(location ? location.zip : '');
    setTimeZoneId(location ? location.time_zone_id : '');
    // setCityId(location ? location.city_id : '');
    // setStateId(location ? location.state_id : '');

    if (location) {
      const citiesArray = [{
        value: location.city.id,
        label: location.city.name,
      }];
      const statesArray = [{
        value: location.state.id,
        label: location.state.name,
      }];
      setCityOptions(citiesArray);
      setCityValue(citiesArray[0]);
      setStateOptions(statesArray);
      setStateValue(statesArray[0]);
    }
  }, [location]);

  return (
    <Layout
      items={[
        {
          name: 'My Account',
          link: '/',
          icon: <Person2Outlined sx={{ py: 0.2 }} />,
        },
        {
          name: 'Locations',
          link: '/owner/account/profile',
          icon: <MyLocation sx={{ py: 0.2 }} />,
        },
      ]}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #D9D9D9',
          padding: '20px',
        }}
      >
        <Grid>
          <h4 className='pb-0 mb-1' style={{ color: '#262626' }}>
            Edit Location
          </h4>
          <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
            Management of Locations
          </p>
        </Grid>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate(`/owner/account/locations`)}
        >
          <p style={{ marginRight: '10px', color: '#808080' }}>Close</p>
          <CloseOutlined
            sx={{
              color: '#000',
              fontSize: '42px',
              borderRadius: '50%',
              border: '1px solid #ccc',
              padding: '8px',
              backgroundColor: '#fff',
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px',
          width: '60%',
        }}
      >
        <Grid
          className='rounded'
          spacing={1}
          sx={{ backgroundColor: '#D7E8FF', p: 1.6 }}
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <Grid item xs={1} style={{ width: '20px' }}>
            <ErrorOutlineOutlined
              sx={{ color: '#4A93F0', transform: 'rotate(180deg)' }}
            />
          </Grid>
          <Grid item xs={11} sx={{ fontSize: '12px' }}>
            <p style={{ color: '#194378' }} className='fw-semibold mb-0'>
              Note
            </p>
            <p style={{ color: '#194378' }}>
              If you want to set up a specific payment type (ie: bank account or
              Credit Card) for payments on the new added location, you will need
              to create a new Mayday Dental account. If you wish to use the same
              credit card or ACH for all locations, then please proceed with
              adding office locations. Please contact Mayday Dental at
              888-899-4386 with any questions.
            </p>
          </Grid>
        </Grid>
      </div>

      <Grid
        container
        spacing={2}
        sx={{
          padding: '20px',
          gap: '20px',
        }}
      >
        <Grid item xs={4}>
          <FormControl variant='outlined'>
            <TextField
              id='place_name'
              name='place_name'
              label='Practice Name'
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />
          </FormControl>
        </Grid>
      </Grid>
      <hr />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px',
          width: '60%',
        }}
      >
        <h3
          style={{
            color: '#262626',
            fontSize: '16px',
            fontWeight: '500',
          }}
        >
          Location Contact Info
        </h3>

        <Grid
          container
          spacing={2}
          sx={{
            gap: '20px',
          }}
        >
          <Grid item xs={4}>
            <FormControl variant='outlined'>
              <TextField
                id='first_name'
                name='first_name'
                label='First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl variant='outlined'>
              <TextField
                id='location_email'
                name='location_email'
                label='Location E-mail'
                value={locationEmail}
                onChange={(e) => setLocationEmail(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl variant='outlined'>
              <TextField
                id='last_name'
                name='last_name'
                label='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl variant='outlined'>
              <TextField
                id='location_phone'
                name='location_phone'
                label='Location Phone'
                value={locationPhone}
                onChange={(e) => setLocationPhone(e.target.value)}
              />
            </FormControl>
          </Grid>
        </Grid>

        <h3
          style={{
            color: '#262626',
            fontSize: '16px',
            fontWeight: '500',
          }}
        >
          Address Details
        </h3>

        <Grid
          container
          spacing={2}
          sx={{
            gap: '20px',
          }}
        >

          {/* <Grid item xs={4}>
            <FormControl variant='outlined'>
              <TextField
                id='zip'
                name='zip'
                label='Zip'
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </FormControl>
          </Grid> */}


          <Grid item xs={3} ref={divRef}>
            <FormControl variant='outlined'>
              <TextField
                id='zip'
                name='zip'
                label='Zip'
                value={zip}
                onChange={handleZipCodeChange}
                // onChange={(e) => setZip(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <>
                      <InputAdornment position="right">
                        {loader ? (
                          <CircularProgress size='1rem' />
                        ) : (
                          <>
                            {validZip ? (
                              <CheckIcon />
                            ) : (
                              <>
                                {zip.length >= 5 ? (
                                  <ClearIcon onClick={(e) => {
                                  }} />
                                ) : (
                                  <>
                                    <ClearIcon onClick={(e) => {
                                    }} />
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </InputAdornment>
                    </>
                  )
                }}
              />
              <Popover
                id={id_pop}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
              >
                <Typography sx={{ p: 2 }}>Invalid ZipCode.</Typography>
              </Popover>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant='outlined'>

              <Autocomplete
                options={stateOptions}
                getOptionLabel={(option) => option.label}
                value={stateValue}
                onChange={(event, newValue) => {
                  setStateId(newValue ? newValue.value : '');
                  setStateValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label='State' variant='outlined' />
                )}
              />

              {/* {stateValue ? (
                <></>
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
                      <TextField {...params} label='State' variant='outlined' />
                    )}
                  />
                </>
              )} */}
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl variant='outlined' fullWidth>
              <Autocomplete
                options={cityOptions}
                getOptionLabel={(option) => option.label}
                value={cityValue}
                onChange={(event, newValue) => {
                  setCityId(newValue ? newValue.value : '');
                  setCityValue(newValue);
                }}
                // onInputChange={handleCityInputChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='City'
                    variant='outlined'
                    className='w-100 mb-2'
                  />
                )}
              />

              {/* {cityValue ? (
                <></>
              ) : (
                <>
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
                  />
                </>
              )} */}
            </FormControl>
          </Grid>

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
                  <MenuItem value={timeZone.id}>{timeZone.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={5}>
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

        </Grid>

        <p
          style={{
            color: '#595959',
            fontSize: '14px',
            marginTop: '20px',
            width: '70%',
          }}
        >
          <b>Reminder:</b> Click on "Payment Methods" under "My Account" to add
          a valid payment method in order to create a job posting.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          <button
            className='btn btn-primary'
            style={{
              backgroundColor: '#fff',
              color: '#2561B0',
              padding: '10px 20px',
              borderRadius: '5px',
              border: '1px solid #2561B0',
            }}
            onClick={() => navigate(`/owner/account/locations`)}
          >
            Close
          </button>
          <button
            className='btn btn-primary'
            style={{
              backgroundColor: '#2561B0',
              color: '#fff',
              padding: '10px 30px',
              borderRadius: '5px',
              border: 'none',
            }}
            onClick={handleSubmit}
          >
            OK
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default EditOwnerLocation;
