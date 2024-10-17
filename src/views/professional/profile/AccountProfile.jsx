
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import InputMask from 'react-input-mask';

import {
  Stack,
  OutlinedInput,
  Chip,
  Autocomplete,
} from "@mui/material";
import { Grid } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from "@mui/icons-material/Check";
import Button from '@mui/material/Button';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';


import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import PanelCard from '../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../ui-component/cards/CardSecondaryAction';
import SuccessModal from '../../../ui-component/SuccessModal';
import ProfilePicture from '../../../ui-component/ProfilePicture';


import Locations from './Locations';
import ChangeEmailDialog from './ChangeEmailDialog';
import ChangePasswordDialog from './ChangePasswordDialog';

import { setUserTimeZoneGlobally } from "../../../utils/helper";


import { gridSpacing } from '../../../store/constant';
import { selectUser, setUser } from '../../../store/slices/userSlice';


const AccountProfile = () => {
  const User = useSelector(selectUser);
  const dispatch = useDispatch();
  const [open, setOpenEmail] = useState(false);
  const [open1, setOpenPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(User.mobile);
  const [changeEmail, setChangeEmail] = useState({
    password: '',
    email: '',
  });
  const [changePassword, setChangePassword] = useState({
    c_password: '',
    n_password: '',
    confirm_password: '',
  });
  const [gender, setGender] = useState(User.gender);
  const [name, setName] = React.useState({
    first_name: User.first_name,
    last_name: User.last_name,
  });
  const [finalSubmission, setFinalSubmission] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [otherStates, setOtherStates] = useState(User.other_state_available);
  const [relocate, setRelocate] = useState(User.willing_to_relocate);
  const [stateId, setStateId] = useState(User.other_state_id);
  const [states, setStates] = useState([]);
  const [timeZoneOptions, setTimeZoneOptions] = useState([]);
  const [userTimeZone, setUserTimeZone] = useState(User.time_zone_id);

  // const [selectedState, setSelectedState] = useState(User.other_state_id);
  const [selectedState, setSelectedState] = useState(() => {
    let other_stats = [];
    if (Array.isArray(User.other_state_id)) {
      User.other_state_id.map((value, index) => {
        other_stats.push(value);
      });
    }
    return other_stats;
  });

  const [userState, setUserState] = useState(User.state_id);
  // const [selectedState, setSelectedState] = useState(
  //   User.other_state_id && states.length !== 0 && states.filter((state) => state.id === User.other_state_id)[0].name
  // );


  useEffect(() => {
    fetch('https://api.mddentalstaffing.com/api/v1/states')
      .then((response) => response.json())
      .then((data) => {
        setStates(data.data);
      })
      .catch((error) => console.error('Error fetching states:', error));
  }, []);


  const handlefinalsubmit = async () => {
    const API_BASE_URL = 'https://api.mddentalstaffing.com/api/v1';
    const formData = new FormData();
    // const file = dataUrlToFile(cropData, "output.png");
    // const file = await dataUrlToFileUsingFetch(cropData, 'output.png', 'image/png');
    // console.log('Cover uploadFile === >', file, uploadFile);
    // if (file) formData.append('upload_file', file);
    // if (uploadFile) formData.append('upload_file', uploadFile);
    if (name.first_name) formData.append('first_name', name.first_name);
    if (name.last_name) formData.append('last_name', name.last_name);
    if (otherStates) {
      formData.append('other_state_available', otherStates)
    } else {
      formData.append('other_state_available', 0)
    };
    if (relocate) {
      formData.append('willing_to_relocate', relocate);
    } else {
      formData.append('willing_to_relocate', 0);
    }
    if (gender) formData.append('gender', gender);
    // if (stateId) formData.append('other_state_id', stateId);
    if (userState) formData.append('state_id', userState);

    if (userTimeZone) formData.append('time_zone_id', userTimeZone);

    if (phoneNumber) formData.append('mobile', phoneNumber);

    let other_states = [];
    selectedState.map((object, index) => {
      other_states.push(
        {
          'id': object.id,
          'name': object.name,
          "iso_code": object.iso_code,
          "country_id": object.country_id
        }
      );
    });
    formData.append('other_state_id', JSON.stringify(other_states));

    try {
      axios
        .post(`${API_BASE_URL}/profile`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          dispatch(setUser(res.data.data));
          localStorage.setItem('user', JSON.stringify(res.data.data));

          // console.log('Userssss', User.first_name, User.user_time_zone);
          if (userTimeZone) {
            var utz = timeZoneOptions.filter((value, index) => {
              if (userTimeZone == value.id) {
                return value;
              }
            });
            if (utz.length != 0) {
              setUserTimeZoneGlobally(utz[0].time_zone);
            }
          }
          // setImage(null);
          setFinalSubmission(true);
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      console.log(error);
    }
  }
  const handleChangeEmail = async () => {
    const API_BASE_URL = 'https://api.mddentalstaffing.com/api/v1';
    try {
      axios
        .put(
          `${API_BASE_URL}/profile/update-email`,
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
          setOpenEmail(false);
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
          `${API_BASE_URL}/profile/update-password`,
          {
            current_password: changePassword.c_password,
            password: changePassword.n_password,
            password_confirmation: changePassword.confirm_password,
            email: User.email,
          },
          {
            headers: {
              method: 'PUT',
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
          }
        )
        .then((res) => {
          setOpenPassword(false);
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setName({ first_name: User.first_name, last_name: User.last_name });
  }, [User]);


  const handleChange = (event) => {
    setGender(event.target.value);
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
          offset: timeZone.offset,
          time_zone: timeZone.time_zone,
        })
      );
      setTimeZoneOptions(timeZoneArray);
    } catch (error) { }
  };

  useEffect(() => {
    getTimeZones();
  }, []);



  return (
    <>
      <MainCard
        title="My Account"
        darkTitle="My Profile / Edit"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <div
              style={{ width: '100%', display: 'flex', backgroundColor: '#fff' }}
              className='container'
            >
              <div
                style={{ width: '70%', padding: '40px 10px 30px 17px' }}
                className='left-account-container'
              >

                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '25px',
                    width: '750px',
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
                      {User && User.email}
                    </p>
                    <p
                      onClick={() => setOpenEmail(true)}
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
                      onClick={() => setOpenPassword(true)}
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
                    <p style={{ color: '#5c5a5a', fontSize: '0.9rem' }}>Current Date Time</p>
                    <p
                      className='pb-0 mb-1'
                      style={{
                        color: '#262626',
                        fontSize: '15px',
                        fontWeight: '500',
                      }}
                    >
                      {/* {moment().tz("Europe/London").format('Z')} */}
                      {/* {User.user_time_zone} */}
                      {/* {moment().format()} */}
                      {moment().format('MM/DD/YYYY hh:mm A')}

                    </p>
                  </div>

                </div>
                <hr style={{ color: '#5c5a5a' }} />
                <div style={{ paddingTop: '22px' }}>
                  <h4
                    className='pb-0 mb-1'
                    style={{ color: '#262626', fontSize: '19px' }}
                  >
                    Personal Detail
                  </h4>
                  <div
                    style={{ paddingTop: '22px', display: 'flex', flexWrap: 'wrap' }}
                  >
                    {/* <Box
                sx={{ minWidth: 200 }}
                style={{ margin: '10px 20px 10px 0' }}
              >
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>
                    Gender Selection
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={gender}
                    label='Gender Selection'
                    onChange={handleChange}
                  >
                    <MenuItem
                      value='male'
                      selected={
                        User.gender === 'male' || User.gender === 'Male'
                          ? true
                          : false
                      }
                    >
                      Male
                    </MenuItem>
                    <MenuItem
                      value='female'
                      selected={
                        User.gender === 'female' || User.gender === 'Female'
                          ? true
                          : false
                      }
                    >
                      Female
                    </MenuItem>
                    <MenuItem
                      value='other'
                      selected={
                        User.gender === 'other' || User.gender === 'Other'
                          ? true
                          : false
                      }
                    >
                      Other
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box> */}

                    <TextField
                      id='outlined-basic'
                      label='First Name'
                      variant='outlined'
                      required={true}
                      value={User && name.first_name}
                      onChange={(e) => {
                        setName({ ...name, first_name: e.target.value });
                      }}
                      style={{ width: '200px', margin: '10px 20px 10px 0' }}
                    />

                    <TextField
                      id='outlined-basic'
                      label='Last Name.'
                      variant='outlined'
                      required={true}
                      value={User && name.last_name}
                      onChange={(e) => {
                        setName({ ...name, last_name: e.target.value });
                      }}
                      style={{ width: '200px', margin: '10px 20px 10px 0' }}
                    />

                    <Box
                      sx={{ minWidth: 200 }}
                      style={{ margin: '10px 20px 10px 0' }}
                    >
                      <InputMask
                        mask='(999) 999 - 9999'
                        maskChar='_'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      >
                        {(inputProps) => (
                          <TextField
                            size='medium'
                            className='w-15 h-30'
                            label='Contact Phone'
                            variant='outlined'
                            sx={{ mb: 3 }}
                            inputProps={{ ...inputProps, type: 'tel' }}
                          />
                        )}
                      </InputMask>
                    </Box>

                    <Box
                      sx={{ minWidth: 200 }}
                      style={{ margin: '10px 20px 10px 0' }}
                    >
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                          State
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          value={userState}
                          defaultValue={userState}
                          label='State'
                        >
                          {states ? states.map((state, index) => {
                            return (
                              <MenuItem
                                key={state.id}
                                value={state.id}
                                onClick={() => {
                                  setUserState(state.id);
                                }}
                              >
                                {state.name}
                              </MenuItem>
                            )
                          }) : (
                            <></>
                          )}
                        </Select>
                      </FormControl>
                    </Box>


                    <Box
                      sx={{ minWidth: 200 }}
                      style={{ margin: '10px 20px 10px 0' }}
                    >
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label-user-time-zone'>
                          Time Zone
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-label-user-time-zone'
                          id='demo-simple-select-label-user-time-zone-select'

                          label='Time Zone'
                          value={userTimeZone}
                          defaultValue={userTimeZone}
                          onChange={(e) => setUserTimeZone(e.target.value)}
                        >
                          {timeZoneOptions.map((timeZone) => (
                            <MenuItem value={timeZone.id}>
                              {timeZone.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>


                  </div>
                </div>
                <hr style={{ color: '#5c5a5a' }} />
                <div style={{ paddingTop: '22px' }}>
                  <h4
                    className='pb-0 mb-1'
                    style={{ color: '#262626', fontSize: '19px' }}
                  >
                    Preference & Availability
                  </h4>


                  <div
                    style={{ paddingTop: '22px', display: 'flex', flexWrap: 'wrap' }}
                  >

                    <FormGroup>
                      <FormControlLabel
                        style={{ fontSize: '0.9rem' }}
                        checked={otherStates}
                        control={<Checkbox />}
                        label='Other states where you are able to work legally'
                        onClick={() => {
                          setOtherStates(!otherStates);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        style={{ fontSize: '0.9rem' }}
                        control={<Checkbox />}
                        label='Willing to relocate'
                        checked={relocate}
                        onClick={() => {
                          setRelocate(!relocate);
                        }}
                      />
                      <p style={{ color: '#5c5a5a', fontSize: '0.8rem' }}>
                        You will be able to observe all US permanent postings
                      </p>
                    </FormGroup>

                  </div>

                  <div style={{ display: 'flex' }}>
                    <Box
                      sx={{ minWidth: 830 }}
                      style={{ margin: '10px 40px 10px 0' }}
                    >
                      <FormControl fullWidth>
                        {/* <InputLabel id='demo-simple-select-label'>State</InputLabel> */}
                        {/* <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    // value={stateId}
                    defaultValue={selectedState}
                    label='State'
                  >
                    {states ? states.map((state, index) => {
                      return (
                        <MenuItem
                          key={state.id}
                          value={state.id}
                          onClick={() => {
                            setSelectedState(state.name);
                            setStateId(state.id);
                          }}
                        >
                          {state.name}
                        </MenuItem>
                      )
                    }) : (
                      <></>
                    )}
                  </Select> */}

                        <Autocomplete
                          multiple
                          id="other_stats"
                          // options={states}
                          options={states.map(({ id, name }) => ({ id, name }))}
                          getOptionLabel={(option) => option.name}
                          isOptionEqualToValue={(option, newValue) => {
                            return option.id === newValue.id;
                          }}
                          defaultValue={selectedState}
                          // filterSelectedOptions
                          disableCloseOnSelect
                          required
                          onChange={(event, value) => {
                            setSelectedState(value);
                          }}
                          renderOption={(props, option, { selected }) => {
                            return (
                              <MenuItem
                                key={option}
                                value={option}
                                sx={{ justifyContent: "space-between" }}
                                {...props}
                              >
                                {option.name}
                                {/* {selected ? <CheckIcon color="info" /> : null} */}
                                {selectedState.some(item => option.id === item.id) ? (
                                  <CheckIcon color="info" />
                                ) : (
                                  <></>
                                )}
                              </MenuItem>
                            )
                          }}
                          renderInput={(params) => {
                            return (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="States"
                                placeholder="States"
                              />
                            )
                          }}
                        />
                      </FormControl>
                    </Box>

                  </div>
                  <hr style={{ color: '#5c5a5a' }} />
                  <Locations />
                </div>
                <button
                  style={{
                    color: '#fff',
                    backgroundColor: '#2561B0',
                    padding: '8px 27px',
                    border: 'none',
                    marginTop: '40px',
                    borderRadius: '4px',
                  }}
                  onClick={handlefinalsubmit}
                >
                  {' '}
                  Save Changes
                </button>
              </div>

              <ProfilePicture />
            </div>

            {
              open && (
                <ChangeEmailDialog
                  open={open}
                  handleClose={() => setOpenEmail(false)}
                  changeEmail={changeEmail}
                  setChangeEmail={setChangeEmail}
                  handleChangeEmail={handleChangeEmail}
                />
              )
            }
            {
              open1 && (
                <ChangePasswordDialog
                  open={open1}
                  handleClose={() => setOpenPassword(false)}
                  changePassword={changePassword}
                  setChangePassword={setChangePassword}
                  handleChangePassword={handleChangePassword}
                />
              )
            }
            {
              finalSubmission && (
                <SuccessModal
                  open={finalSubmission}
                  handleClose={() => setFinalSubmission(false)}
                  successMessage={'Profile Updated Successfully'}
                />
              )
            }
          </Grid>
        </Grid>
      </MainCard >
    </>
  );



};

export default AccountProfile;
