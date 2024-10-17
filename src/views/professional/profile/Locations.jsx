import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api';


import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddIcon from '@mui/icons-material/Add';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';

import {
  Alert,
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import Popover from '@mui/material/Popover';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


import SuccessModal from '../../../ui-component/SuccessModal';

import { selectUser } from '../../../store/slices/userSlice';
import { setUser } from '../../../store/slices/userSlice';


const Locations = () => {
  const User = useSelector(selectUser);
  const dispatch = useDispatch();
  const initials = {
    id: -1,
    is_api_request: false,
    label: '',
    zip: '',
    address: '',
    city: '',
    state: '',
    position: {
      permanent: false,
      temporary: false,
    },
    radius: 30,
    latitude: 40.7128,
    longitude: -74.006,
    time: {
      fulltime: false,
      parttime: false,
    },
    hourlyRate: 0,
    days: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    currentlyLocation: false,
    isSaved: false,
  };

  const [preferredLocations, setPreferredLocations] = useState([initials]);
  const [addDisable, setAddDisabled] = useState(true);
  const [cityOptions, setCityOptions] = useState([]);
  const [cityQuery, setCityQuery] = useState('');
  const [cityPage, setCityPage] = useState(1);

  const [stateValue, setStateValue] = useState(null);
  const [stateOptions, setStateOptions] = useState([]);

  const [states, setStates] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(0);
  const [radius, setRadius] = useState(30);
  const [cityValue, setCityValue] = React.useState('');
  const [city, setCity] = React.useState(
    User && User.city_id ? User.city_id : ''
  );

  const [selectedState, setSelectedState] = useState(null);
  const [openSuccessModalUpdate, setOpenSuccessModalUpdate] = useState(false);
  const [openSuccessModalSubmit, setOpenSuccessModalSubmit] = useState(false);

  const [mapCenter, setMapCenter] = useState({
    lat: preferredLocations[currentLocation]?.latitude || 40.7128,
    lng: preferredLocations[currentLocation]?.longitude || -74.006,
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
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
  const id = open ? "simple-popover" : undefined;


  useEffect(() => {
    setAddDisabled(!checkAdd());
  }, [preferredLocations]);

  // useEffect(() => {
  //   if (User && User.city_id) {
  //     setCityValue(
  //       cityOptions.find((option) => option.value === parseInt(User.city_id))
  //     );
  //   }
  // }, [User]);

  function checkAdd() {
    let isContain = preferredLocations.some((arr) => arr.isSaved === false);
    return !isContain;
  }

  const handleChangeEvent = (event, newValue) => {
    if (preferredLocations[currentLocation].is_api_request) {
      let temp = [...preferredLocations];
      temp[currentLocation].radius = newValue;
      setPreferredLocations([...temp]);
      setRadius(newValue);
    } else {
      let temp = [...preferredLocations];
      temp[currentLocation].radius = newValue;
      setPreferredLocations([...temp]);
      setRadius(newValue);
    }
  };

  function handleDelete(index) {
    axios
      .delete(
        `https://api.mddentalstaffing.com/api/v1/locations/${preferredLocations[index].id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    if (preferredLocations.length === 1) {
      const temp = [...preferredLocations, initials];
      temp.splice(index, 1);
      setPreferredLocations([...temp]);
      return;
    }
    if (index === 0) {
      setCurrentLocation((prevLocation) => prevLocation);
      const temp = [...preferredLocations];
      temp.splice(index, 1);
      setPreferredLocations([...temp]);
      return;
    }
    const temp = [...preferredLocations];
    temp.splice(index, 1);
    setPreferredLocations([...temp]);
    setCurrentLocation(currentLocation - 1);
    return;
  }

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
      } else {
        setCityOptions((prevOptions) => [...prevOptions, ...citiesArray]);
      }

      // if (User.city_id) {
      //   setCityValue(
      //     citiesArray.find((option) => option.value === parseInt(User.city_id))
      //   );
      // }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // getCities();
  }, [cityQuery, cityPage]);

  useEffect(() => {
    // fetch('https://api.mddentalstaffing.com/api/v1/states')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setStates(data.data);
    //   })
    //   .catch((error) => console.error('Error fetching states:', error));
  }, []);

  const handleCityInputChange = (event, newInputValue) => {
    // setCityQuery(newInputValue);
    // setCityPage(1);
  };

  const [locationData, setLocationData] = useState([]);

  const getLocations = useCallback(() => {
    axios
      .get('https://api.mddentalstaffing.com/api/v1/locations', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((res) => {
        setLocationData(res.data.data);
      }).catch((e) => {
        console.log('error loc=== >', e);
      });
  }, []);

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  const handleSaveLocation = () => {
    const temp = [...preferredLocations];
    temp[currentLocation].isSaved = true;
    setPreferredLocations([...temp]);
    const data = {
      place_name: preferredLocations[currentLocation].label,
      is_current:
        preferredLocations[currentLocation].currentlyLocation === true ? 1 : 0,
      latitude: preferredLocations[currentLocation].latitude,
      longitude: preferredLocations[currentLocation].longitude,
      radius: preferredLocations[currentLocation].radius,
      looking_permanent:
        preferredLocations[currentLocation].position.permanent === true ? 1 : 0,
      looking_temporary:
        preferredLocations[currentLocation].position.temporary === true ? 1 : 0,
      looking_full_time: preferredLocations[currentLocation].time.fulltime
        ? 1
        : 0,
      desired_rate: preferredLocations[currentLocation].hourlyRate,
      available_days: Object.entries(preferredLocations[currentLocation].days)
        .filter(([day, isAvailable]) => isAvailable)
        .map(([day]) => day),
      address: preferredLocations[currentLocation].address,
      zip: preferredLocations[currentLocation].zip,
      time_zone_id: 1,
      city_id: preferredLocations[currentLocation].city,
      state_id: preferredLocations[currentLocation].state,
    };

    if (!preferredLocations[currentLocation].is_api_request) {
      axios
        .post('https://api.mddentalstaffing.com/api/v1/locations', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        })
        .then((response) => {
          setOpenSuccessModalSubmit(true);

          dispatch(setUser(response.data.data));
          localStorage.setItem('user', JSON.stringify(response.data.data));

          getLocations();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      data.id = preferredLocations[currentLocation].id;
      axios
        .put(
          `https://api.mddentalstaffing.com/api/v1/locations/${preferredLocations[currentLocation].id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
          }
        )
        .then((response) => {
          setOpenSuccessModalUpdate(true);

          dispatch(setUser(response.data.data));
          localStorage.setItem('user', JSON.stringify(response.data.data));
          getLocations();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (locationData.length !== 0) {
      const tempData = [];
      locationData.map((arr) => {
        tempData.push({
          id: arr.id,
          is_api_request: true,
          label: arr.place_name,
          zip: arr.zip,
          address: arr.address,
          city: arr.city_id,
          state: arr.state_id,
          position: {
            permanent: arr.looking_permanent,
            temporary: arr.looking_temporary,
          },
          time: {
            fulltime: arr.looking_full_time,
          },
          hourlyRate: arr.desired_rate,
          days: {
            monday: arr.available_days.includes('monday'),
            tuesday: arr.available_days.includes('tuesday'),
            wednesday: arr.available_days.includes('wednesday'),
            thursday: arr.available_days.includes('thursday'),
            friday: arr.available_days.includes('friday'),
            saturday: arr.available_days.includes('saturday'),
            sunday: arr.available_days.includes('sunday'),
          },
          currentlyLocation: arr.is_current,
          isSaved: true,
          radius: arr.radius,
          latitude: arr.latitude,
          longitude: arr.longitude,
        });
      });
      setPreferredLocations(tempData);
      setSelectedState({
        "value": locationData[currentLocation].locationcity.id,
        "label": locationData[currentLocation].locationcity.name,
      });
      setStateValue({
        "value": locationData[currentLocation].state.id,
        "label": locationData[currentLocation].state.name,
      });
    }
  }, [locationData]);

  // const handleZipCodeChange = async (e) => {
  //   const newZip = e.target.value;
  //   let temp = [...preferredLocations];
  //   temp[currentLocation].zip = newZip;
  //   if (newZip.length !== 5) {
  //     setPreferredLocations(temp);
  //     return;
  //   } else if (newZip.length === 5 && !/^\d+$/.test(newZip)) {
  //     setPreferredLocations(temp);
  //     return;
  //   } else if (newZip.length === 5 && /^\d+$/.test(newZip)) {
  //     await getLatLong(newZip);
  //     setPreferredLocations(temp);
  //   } else {
  //     setPreferredLocations(temp);
  //   }
  // };

  const handleZipCodeChange = async (e) => {
    const newZip = e.target.value;
    let temp = [...preferredLocations];
    temp[currentLocation].zip = newZip;
    setPreferredLocations(temp);
    if (/(^\d{4}$)|(^\d{5}$)|(^\d{5}-\d{4}$)/.test(e.target.value)) {
      setValidZip(false);
      await getCityStateByZip(newZip);
    }
  };

  const getLatLong = async (zip) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=AIzaSyCScxXwhbI99Rn73IcAse2txSXCyWOcYOk`
        // `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=AIzaSyALvdMW7qY9bDBcT9iOmvfECav8cRNuDCU`
      );

      const { results } = response.data;

      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;

        // Assuming temp is an array of preferred locations
        const temp = [...preferredLocations];
        temp[currentLocation].zip = zip;
        temp[currentLocation].latitude = lat;
        temp[currentLocation].longitude = lng;

        // Update state with the new preferred locations data
        setPreferredLocations(temp);

        setMapCenter({ lat, lng });
      } else {
        // Handle case when no results are found
        console.error('No results found for the given ZIP code');
      }
    } catch (error) {
      // Handle error from the API request
      console.error('Error fetching data from Google Maps API:', error);
    }
  };

  const mapContainerStyle = {
    width: '100%',
    height: '200px',
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


        let temp = [...preferredLocations];
        temp[currentLocation].city = citiesArray[0].value;
        temp[currentLocation].state = statesArray[0].value;
        temp[currentLocation].longitude = lat_lon.longitude;
        temp[currentLocation].latitude = lat_lon.latitude;
        temp[currentLocation].address = formatted_address;
        setPreferredLocations(temp);

        setCityOptions(citiesArray);
        setSelectedState(citiesArray[0]);
        setStateOptions(statesArray);
        setStateValue(statesArray[0]);
        // setLongitude(lat_lon.longitude);
        // setLatitude(lat_lon.longitude);
        var lat = lat_lon.latitude;
        var lng = lat_lon.longitude;
        setMapCenter({ lat, lng });

        setValidZip(true);
        setLoader(false);
        // setOpenState(true);
        // setOpenCity(true);
      } else {
        setStateOptions([]);
        setCityOptions([]);
        setMapCenter({});
        setLoader(false);
        setValidZip(false);
        // handleClick();
        console.log('No results found for the given ZIP code');
      }
    } catch (error) {
      // Handle error from the API request
      console.error('Error fetching data from Google Maps API:', error);
    }
  };


  useEffect(() => {
    // if (preferredLocations[currentLocation].city != '' && locationData[currentLocation] != undefined) {
    if (locationData[currentLocation] != undefined) {
      setSelectedState({
        "value": locationData[currentLocation].locationcity.id,
        "label": locationData[currentLocation].locationcity.name,
      });
      setStateValue({
        "value": locationData[currentLocation].state.id,
        "label": locationData[currentLocation].state.name,
      });
    }
    else {
      setSelectedState(null);
      setStateValue(null);
      // setStateOptions([]);
      // setCityOptions([]);
      let temp = [...preferredLocations];
      if (temp[currentLocation].zip != '') {
        setSelectedState(cityOptions[0]);
        setStateValue(stateOptions[0]);
      }
    }
  }, [currentLocation]);

  return (
    <div style={{ paddingTop: '22px' }}>
      <h4 className='pb-0 mb-1' style={{ color: '#262626', fontSize: '19px' }}>
        Location
      </h4>
      <Stack
        spacing={2}
        style={{
          marginLeft: '20px',
          display: 'flex',
          alignItems: 'center',
        }}
        direction='row ml-3'
      >
        {preferredLocations.map((location, index) => (
          <Button
            onClick={(event) => {
              setCurrentLocation(index);
              event.stopPropagation();
            }}
            variant='contained'
            style={{
              borderBottom: 'none',
              borderRadius: 0,
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              minWidth: '130px',
              height: '40px',
              paddingBottom: '0',
              marginLeft: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: `${currentLocation === index ? '#4A93F0' : '#DADADA'
                } `,
              color: `${currentLocation === index ? '#fff' : 'grey'}`,
            }}
          >
            {location.label}{' '}
            {currentLocation === index && (
              <CloseOutlinedIcon
                style={{ justifySelf: 'flex-end', fontSize: '18px' }}
                onClick={(event) => {
                  event.stopPropagation();
                  handleDelete(index);
                }}
              />
            )}
          </Button>
        ))}
        <Box sx={{ '& button': { m: 1 } }}>
          <div>
            <button
              onClick={() => {
                const updatedLocations = [...preferredLocations, initials];
                setCurrentLocation(currentLocation + 1);
                setPreferredLocations(updatedLocations);
              }}
              disabled={addDisable}
              size='small'
              style={{
                backgroundColor: '#2561B0',
                color: '#fff',
                cursor: `${addDisable ? 'not-allowed' : 'pointer'}`,
                border: 'none',
                borderRadius: '4px',
                padding: '3px 10px',
              }}
            >
              <AddIcon
                style={{
                  border: '1px solid #fff',
                  color: '#fff',
                  padding: '0',
                  fontSize: '16px',
                  marginRight: '5px',
                  fontWeight: 'bold',
                }}
              />
              Add
            </button>
          </div>
        </Box>
      </Stack>
      <div
        style={{
          border: '1px solid rgb(37, 97, 176)',
          borderRadius: '4px',
          padding: '0 10px 10px 10px',
        }}
      >
        <Box
          component='form'
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete='off'
          style={{ marginTop: '20px' }}
        >

          <div
            style={{
              display: 'flex',
              width: '100%',
              gap: '50px',
              flexWrap: 'wrap',
              marginTop: '20px',
            }}
          >
            <TextField
              id='outlined-basic'
              label='Location Label'
              value={preferredLocations[currentLocation]?.label}
              variant='outlined'
              onChange={(e) => {
                let temp = preferredLocations;
                temp[currentLocation].label = e.target.value;
                setPreferredLocations([...temp]);
              }}
              required={true}
              style={{ width: '200px' }}
            />
            <div style={{}}>
              <FormControlLabel
                onClick={() => {
                  let temp = [...preferredLocations];
                  temp[currentLocation].currentlyLocation =
                    !temp[currentLocation].currentlyLocation;
                  setPreferredLocations([...temp]);
                }}
                control={
                  <Checkbox
                    checked={
                      preferredLocations[currentLocation].currentlyLocation
                    }
                  />
                }
                style={{ fontSize: '10px', margin: 0 }}
              />
              <label htmlFor='' style={{ margin: 0 }}>
                Please check this box to view jobs in this location
              </label>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              width: '100%',
              flexWrap: 'wrap',
              marginTop: '20px',
            }}
          >

            <FormControl variant='outlined'>
              <TextField
                id='outlined-basic'
                label='ZIP'
                value={preferredLocations[currentLocation]?.zip || ''}
                variant='outlined'
                onChange={handleZipCodeChange}
                required={true}
                style={{ width: '200px', marginRight: '20px' }}
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
                                {preferredLocations[currentLocation]?.zip.length >= 5 ? (
                                  <ClearIcon onClick={(e) => {
                                  }} />
                                ) : (
                                  <></>
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
                id={id}
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

            <Autocomplete
              options={cityOptions}
              getOptionLabel={(option) => option.label}
              // value={cityValue ? cityValue : ''}
              value={selectedState}
              defaultValue={selectedState}
              onChange={(event, newValue) => {
                setSelectedState(newValue != null ? newValue : null);
                setCityValue(newValue);
                if (newValue) {
                  let temp = [...preferredLocations];
                  temp[currentLocation].city = newValue.value;
                  setPreferredLocations([...temp]);
                }
              }}
              style={{ marginRight: '20px' }}
              onInputChange={handleCityInputChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label='City'
                  variant='outlined'
                  className='w-300 mb-2'
                  style={{ width: '200px' }}
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

            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                {/* <InputLabel id='demo-simple-select-label'>State</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={preferredLocations[currentLocation].state}
                  label='State'
                  onChange={(event) => {
                    let temp = [...preferredLocations];
                    temp[currentLocation].state = event.target.value;
                    setPreferredLocations(temp);
                  }}
                >
                  {states
                    ? states.map((state) => (
                      <MenuItem key={state.id} value={state.id}>
                        {state.name}
                      </MenuItem>
                    ))
                    : null}
                </Select> */}

                <Autocomplete
                  // open={openState}
                  options={stateOptions}
                  getOptionLabel={(option) => option.label}
                  // value={preferredLocations[currentLocation].state}
                  value={stateValue}
                  onChange={(event, newValue) => {
                    let temp = [...preferredLocations];
                    temp[currentLocation].state = event.target.value;
                    setPreferredLocations(temp);
                  }}
                  onClick={(event) => {
                  }}
                  onOpen={(event) => {
                    // setOpenState(true);
                  }}
                  onBlur={() => {
                    // setOpenState(false);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label='State' variant='outlined' />
                  )}
                />

              </FormControl>
            </Box>
          </div>

          <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
            <TextField
              id='outlined-basic'
              label='Address'
              value={preferredLocations[currentLocation]?.address || ''}
              variant='outlined'
              onChange={(e) => {
                let temp = preferredLocations;
                temp[currentLocation].address = e.target.value;
                setPreferredLocations([...temp]);
              }}
              required={true}
              style={{ width: '79%' }}
            />
          </div>
        </Box>
        <div style={{ padding: '10px' }}>
          <hr
            style={{
              color: '#5c5a5a',
              borderStyle: 'dashed',
              borderWidth: '1.5px',
            }}
          />
          <p required={true}>
            <FormLabel
              id='demo-radio-buttons-group-label'
              required={true}
              style={{
                color: '#f11e1e'
              }}
            >
              Radius willing to travel in miles from this Location.
            </FormLabel>
          </p>
          <div
            style={{
              width: '100%',
              height: '200px',
              overflow: 'hidden',
              borderRadius: '7px',
              marginTop: '10px',
            }}
          >
            {/* <LoadScript googleMapsApiKey='AIzaSyALvdMW7qY9bDBcT9iOmvfECav8cRNuDCU'> */}
            <LoadScript googleMapsApiKey='AIzaSyCScxXwhbI99Rn73IcAse2txSXCyWOcYOk'>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={18}
              >
                <Circle
                  center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
                  radius={preferredLocations[currentLocation].radius}
                  options={{
                    fillColor: '#2561B0',
                    fillOpacity: 0.3,
                    strokeColor: '#2561B0',
                  }}
                />
              </GoogleMap>
            </LoadScript>
          </div>
          <Box sx={{ width: '100%', margin: 'auto', marginTop: '20px' }}>
            <Stack
              spacing={2}
              direction='row'
              sx={{ mb: 1 }}
              alignItems='center'
            >
              <p>0 miles</p>
              <Slider
                style={{ width: '76%' }}
                aria-label='Volume'
                value={
                  preferredLocations[currentLocation].is_api_request
                    ? preferredLocations[currentLocation].radius
                    : radius
                }
                valueLabelDisplay='auto'
                onChange={handleChangeEvent}
              />
              <p>100 miles</p>
            </Stack>
            <Typography
              style={{ textAlign: 'center', marginBottom: '20px' }}
              variant='body2'
              gutterBottom
            >
              {preferredLocations
                ? preferredLocations[currentLocation].is_api_request
                  ? preferredLocations[currentLocation].radius
                  : radius
                : 30}{' '}
              miles
            </Typography>
          </Box>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert
              severity='error'
              style={{
                color: 'red',
                backgroundColor: 'rgb(250, 238, 222)',
              }}
            >
              <span style={{ fontWeight: 'bold' }}> Important </span>
              Please note that larger radius will expand your job search.
            </Alert>
          </Stack>
          <hr
            style={{
              color: '#5c5a5a',
              borderStyle: 'dashed',
              borderWidth: '1.5px',
            }}
          />
          <div style={{ width: '100%', display: 'flex' }}>
            <div style={{ width: '40%' }}>
              <FormLabel
                id='demo-radio-buttons-group-label'
                style={{ fontSize: '16px' }}
              >
                Position
              </FormLabel>
              <FormGroup style={{ marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    onClick={() => {
                      let temp = [...preferredLocations];
                      temp[currentLocation].position.permanent =
                        !temp[currentLocation].position.permanent;
                      setPreferredLocations([...temp]);
                    }}
                    checked={
                      preferredLocations[currentLocation].position.permanent
                    }
                    control={<Checkbox />}
                    style={{ fontSize: '10px', margin: 0 }}
                  />
                  <label htmlFor='' style={{ margin: 0 }}>
                    Looking for Permanent Position
                  </label>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    onClick={() => {
                      let temp = [...preferredLocations];
                      temp[currentLocation].position.temporary =
                        !temp[currentLocation].position.temporary;
                      setPreferredLocations([...temp]);
                    }}
                    checked={
                      preferredLocations[currentLocation].position.temporary
                    }
                    control={<Checkbox />}
                    style={{ fontSize: '10px', margin: 0 }}
                  />
                  <label htmlFor='' style={{ margin: 0 }}>
                    Looking for Temporary Position
                  </label>
                </div>
              </FormGroup>
            </div>
            <div
              style={{
                width: '60%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FormControl>
                  <FormLabel
                    id='demo-radio-buttons-group-label'
                    style={{ fontSize: '16px' }}
                  >
                    Time
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    defaultValue='female'
                    name='radio-buttons-group'
                    onChange={(e) => {
                      let temp = [...preferredLocations];
                      if (e.target.value === 'full time') {
                        temp[currentLocation].time.fulltime = true;
                      } else {
                        temp[currentLocation].time.fulltime = false;
                      }
                      setPreferredLocations([...temp]);
                    }}
                  >
                    <FormControlLabel
                      value='full time'
                      checked={
                        preferredLocations[currentLocation].time.fulltime
                      }
                      control={<Radio />}
                      label='Full Time'
                    />
                    <FormControlLabel
                      checked={
                        !preferredLocations[currentLocation].time.fulltime
                      }
                      value='part time'
                      control={<Radio />}
                      label='Part Time'
                    />
                  </RadioGroup>
                </FormControl>
                <TextField
                  style={{ marginRight: '10px' }}
                  label='Desired Rate Per Hour'
                  placeholder='0'
                  required={true}
                  id='outlined-start-adornment'
                  sx={{ m: 1, width: '25ch' }}
                  value={preferredLocations[currentLocation].hourlyRate}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>($)</InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    let temp = [...preferredLocations];
                    temp[currentLocation].hourlyRate = e.target.value;
                    setPreferredLocations(temp);
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              marginTop: '20px',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '43%', marginRight: '20px' }}>
              <FormLabel
                id='demo-radio-buttons-group-label'
                required={true}
                style={{ fontSize: '14px' }}
              >
                Days of the week that you are available to accept temporary placements.
              </FormLabel>
            </div>
            <div
              style={{
                width: '60%',
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              <FormControlLabel
                control={<Checkbox />}
                label='Monday'
                checked={preferredLocations[currentLocation].days.monday}
                onChange={(e) => {
                  let temp = [...preferredLocations];
                  temp[currentLocation].days.monday =
                    !temp[currentLocation].days.monday;
                  setPreferredLocations(temp);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label='Tuesday'
                checked={preferredLocations[currentLocation].days.tuesday}
                onChange={(e) => {
                  let temp = [...preferredLocations];
                  temp[currentLocation].days.tuesday =
                    !temp[currentLocation].days.tuesday;
                  setPreferredLocations(temp);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                checked={preferredLocations[currentLocation].days.wednesday}
                label='Wednesday'
                onChange={(e) => {
                  let temp = [...preferredLocations];
                  temp[currentLocation].days.wednesday =
                    !temp[currentLocation].days.wednesday;
                  setPreferredLocations(temp);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                checked={preferredLocations[currentLocation].days.thursday}
                label='Thursday'
                onChange={(e) => {
                  let temp = [...preferredLocations];
                  temp[currentLocation].days.thursday =
                    !temp[currentLocation].days.thursday;
                  setPreferredLocations(temp);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                checked={preferredLocations[currentLocation].days.friday}
                label='Friday'
                onChange={(e) => {
                  let temp = [...preferredLocations];
                  temp[currentLocation].days.friday =
                    !temp[currentLocation].days.friday;
                  setPreferredLocations(temp);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                checked={preferredLocations[currentLocation].days.saturday}
                label='Saturday'
                onChange={(e) => {
                  let temp = [...preferredLocations];
                  temp[currentLocation].days.saturday =
                    !temp[currentLocation].days.saturday;
                  setPreferredLocations(temp);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                checked={preferredLocations[currentLocation].days.sunday}
                label='Sunday'
                onChange={(e) => {
                  let temp = [...preferredLocations];
                  temp[currentLocation].days.sunday =
                    !temp[currentLocation].days.sunday;
                  setPreferredLocations(temp);
                }}
              />
            </div>
          </div>

          <Grid
            sx={{
              pt: 2,
              pb: 1,
            }}
          >
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert
                severity='error'
                style={{
                  color: 'red',
                  backgroundColor: 'rgb(250, 238, 222)',
                }}
              >
                <span style={{ fontWeight: 'bold' }}> Important </span>
                To be accepted for more jobs, consider lowering your rate and checking more days. Don't forget, you are being rated for your performance by Dental Offices.
              </Alert>
            </Stack>
          </Grid>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>



            <button
              style={{
                color: '#fff',
                backgroundColor: '#2561B0',
                padding: '8px 27px',
                border: 'none',
                marginTop: '40px',
                borderRadius: '4px',
                cursor: `${preferredLocations[currentLocation].label &&
                  preferredLocations[currentLocation].zip &&
                  preferredLocations[currentLocation].address &&
                  preferredLocations[currentLocation].city &&
                  preferredLocations[currentLocation].state
                  ? 'pointer'
                  : 'not-allowed'
                  }`,
              }}
              disabled={
                !preferredLocations[currentLocation].label ||
                !preferredLocations[currentLocation].zip ||
                !preferredLocations[currentLocation].address ||
                !preferredLocations[currentLocation].city ||
                !preferredLocations[currentLocation].state ||
                !preferredLocations[currentLocation].hourlyRate ||
                (preferredLocations[currentLocation].days.monday ||
                  preferredLocations[currentLocation].days.tuesday ||
                  preferredLocations[currentLocation].days.wednesday ||
                  preferredLocations[currentLocation].days.thursday ||
                  preferredLocations[currentLocation].days.friday ||
                  preferredLocations[currentLocation].days.saturday ||
                  preferredLocations[currentLocation].days.sunday) === false
              }
              onClick={() => {
                handleSaveLocation();
              }}
            >
              Save Location
            </button>
          </div>
        </div>
      </div>
      {openSuccessModalUpdate && (
        <SuccessModal
          open={openSuccessModalUpdate}
          handleClose={() => setOpenSuccessModalUpdate(false)}
          successMessage={'Location Added Successfully'}
        />
      )}
      {openSuccessModalSubmit && (
        <SuccessModal
          open={openSuccessModalSubmit}
          handleClose={() => setOpenSuccessModalSubmit(false)}
          successMessage={'Location Updated Successfully'}
        />
      )}
    </div>
  );
};

export default Locations;
