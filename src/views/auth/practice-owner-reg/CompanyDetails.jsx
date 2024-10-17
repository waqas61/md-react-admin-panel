
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Autocomplete,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from '@mui/material';
import InputMask from 'react-input-mask';


import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';


import { setUser } from '../../../store/slices/userSlice';

//Step 2
export default function CompanyDetails({ setActiveStep }) {
  const user6 = localStorage.getItem('user');
  const user = JSON.parse(user6);
  const [billingZip, setBillingZip] = useState(
    user.user_billing_addresses[0]?.zip || ''
  );
  const [billingCity, setBillingCity] = useState(
    user.user_billing_addresses[0]?.city_id || ''
  );
  const [billingStreet, setBillingStreet] = useState(
    user.user_billing_addresses[0]?.street || ''
  );
  const [billingState, setBillingState] = useState(
    user.user_billing_addresses[0]?.state_id || ''
  );
  const [companyName, setCompanyName] = useState(user.companies[0]?.name || '');
  const [officeManager, setOfficeManager] = useState(
    user.companies[0]?.office_manager || ''
  );
  const [notes, setNotes] = useState(user.companies[0]?.notes || '');
  const [contactPhone, setContactPhone] = useState(
    user.companies[0]?.contact_phone || ''
  );
  const [secondEmail, setSecondEmail] = useState(
    user.companies[0]?.second_email || ''
  );
  const [companyWeb, setCompanyWeb] = useState(
    user.companies[0]?.website || ''
  );
  const [docCell, setDocCell] = useState(user.companies[0]?.doctor_cell || '');
  const [companySpeciality, setCompanySpeciality] = useState(
    user.companies[0]?.speciality_id || ''
  );
  const [specOptions, setSpecOptions] = useState([]);
  const [fax, setFax] = useState(user.companies[0]?.fax || '');
  const [afterHoursPhone, setAfterHoursPhone] = useState(
    user.companies[0]?.after_work_phone || ''
  );
  const [pracMngSft, setPracMngSft] = useState(
    user.companies[0]?.practice_management_software || ''
  );

  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cityQuery, setCityQuery] = useState('');
  const [cityPage, setCityPage] = useState(1);

  const [billingStateValue, setBillingStateValue] = useState('');
  const [billingCityValue, setBillingCityValue] = useState('');

  const [terms, setTerms] = useState(false);
  const handleClose = () => {
    setTerms(false);
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
      if (user?.user_billing_addresses[0]?.state_id) {
        const billingStateValue = statesArray.find(
          (option) => option.value === billingState
        );
        setBillingStateValue(billingStateValue);
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
      } else {
        setCityOptions((prevOptions) => [...prevOptions, ...citiesArray]);
      }

      if (user?.user_billing_addresses[0]?.city_id) {
        const billingCityValue = citiesArray.find(
          (option) => option.value === parseInt(billingCity)
        );
        setBillingCityValue(billingCityValue);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getSpecialties = async () => {
      try {
        const specRes = await axios.get(
          'https://api.mddentalstaffing.com/api/v1/specialities'
        );

        const specsArray = Object.values(specRes.data.data).map((spec) => ({
          value: spec.id,
          label: spec.name,
        }));
        setSpecOptions(specsArray);
      } catch (error) {
        console.error(error);
      }
    };
    getStates();
    getSpecialties();
  }, []);

  useEffect(() => {
    getCities();
  }, [cityQuery, cityPage]);

  useEffect(() => {
    if (user?.user_billing_addresses[0]?.state_id) {
      const billingStateValue = stateOptions.find(
        (option) => option.value === billingState
      );
      setBillingStateValue(billingStateValue);
    }
  }, [billingState, stateOptions, user.user_billing_addresses]);

  useEffect(() => {
    if (user?.user_billing_addresses[0]?.city_id) {
      const billingCityValue = cityOptions.find(
        (option) => option.value === parseInt(billingCity)
      );
      setBillingCityValue(billingCityValue);
    }
  }, [billingCity, cityOptions, user.user_billing_addresses]);

  const handleCityInputChange = (event, newInputValue) => {
    setCityQuery(newInputValue);
    setCityPage(1);
  };

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const dispatch = useDispatch();
  const token = localStorage.getItem('auth_token');

  const handleSubmit = async (e) => {
    setIsLoading(true);
    await axios
      .post(
        `https://api.mddentalstaffing.com/api/v1/signup/profile/company-details?zip=${billingZip}&street=${billingStreet}&city_id=${billingCity}&state_id=${billingState}&company_name=${companyName}&speciality_id=${companySpeciality}&contact_phone=${contactPhone}&office_manager=${officeManager}&second_email=${secondEmail}&doctor_cell=${docCell}&after_work_phone=${afterHoursPhone}&fax=${fax}&practice_management_software=${pracMngSft}&website=${companyWeb}&notes=${notes}&steps_completed=2`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res) {
          dispatch(setUser(res.data.data));
          localStorage.setItem('user', JSON.stringify(res.data.data));
          setActiveStep((state) => state + 1);
        }
      })
      .catch((error) => {
        alert('Error');
        console.error('Error:', error);
      });
    setIsLoading(false);
  };

  return (
    <>

      <Box sx={{ mt: 2 }} >

        <form
          className='w-lg-75'
          style={{ width: '95%' }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >

          <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
            Billing Address Information
          </Typography>

          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
            >
              <Grid container spacing={1}>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <FormControl required variant='outlined' className='w-100'>
                    <TextField
                      size='small'
                      required
                      className='w-100'
                      label='Billing ZIP'
                      variant='outlined'
                      sx={{ mb: 3 }}
                      value={billingZip}
                      inputProps={{
                        pattern: '^\\d{5}$',
                        title: 'ZIP code can be only 5-digit',
                        minLength: 5,
                        maxLength: 5,
                      }}
                      onChange={(e) => handleInputChange(e, setBillingZip)}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <FormControl
                    required
                    variant='outlined'
                    className='w-100'
                    size='small'
                  >
                    {billingCityValue ? (
                      <Autocomplete
                        size='small'
                        options={cityOptions}
                        getOptionLabel={(option) => option.label}
                        value={billingCityValue ? billingCityValue : ''}
                        onChange={(event, newValue) => {
                          setBillingCity(newValue ? newValue.value : '');
                          setBillingCityValue(newValue);
                        }}
                        onInputChange={handleCityInputChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            required
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
                        size='small'
                        options={cityOptions}
                        getOptionLabel={(option) => option.label}
                        onChange={(event, newValue) => {
                          setBillingCity(newValue ? newValue.value : '');
                          setBillingCityValue(newValue);
                        }}
                        onInputChange={handleCityInputChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            required
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

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <FormControl required variant='outlined' className='w-100'>
                    <TextField
                      size='small'
                      required
                      className='w-100'
                      label='Billing Street'
                      variant='outlined'
                      sx={{ mb: 3 }}
                      value={billingStreet}
                      onChange={(e) => handleInputChange(e, setBillingStreet)}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <FormControl
                    required
                    variant='outlined'
                    className='w-100'
                    size='small'
                  >
                    {billingStateValue ? (
                      <Autocomplete
                        size='small'
                        options={stateOptions}
                        getOptionLabel={(option) => option.label}
                        value={billingStateValue ? billingStateValue : ''}
                        onChange={(event, newValue) => {
                          setBillingState(newValue ? newValue.value : '');
                          setBillingStateValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='State'
                            required
                            variant='outlined'
                            className='w-100 mb-2'
                          />
                        )}
                      />
                    ) : (
                      <Autocomplete
                        size='small'
                        options={stateOptions}
                        getOptionLabel={(option) => option.label}
                        onChange={(event, newValue) => {
                          setBillingState(newValue ? newValue.value : '');
                          setBillingStateValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='State'
                            required
                            variant='outlined'
                            className='w-100 mb-2'
                          />
                        )}
                      />
                    )}
                  </FormControl>
                </Grid>

              </Grid>

            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
            >

              <Grid container spacing={1}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                >

                </Grid>

              </Grid>

            </Grid>
          </Grid>

          <Typography variant="h6"  sx={{ mt: 1, mb: 1 }}>
            Company Details
          </Typography>

          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
            >
              <Grid container spacing={1}>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <FormControl variant='outlined' className='w-100'>
                    <TextField
                      size='small'
                      required
                      className='w-100'
                      label='Company Name'
                      variant='outlined'
                      sx={{ mb: 3 }}
                      value={companyName}
                      onChange={(e) => handleInputChange(e, setCompanyName)}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <FormControl variant='outlined' className='w-100'>
                    <InputMask
                      mask='(999) 999 - 9999'
                      maskChar='_'
                      value={contactPhone}
                      onChange={(e) => handleInputChange(e, setContactPhone)}
                    >
                      {(inputProps) => (
                        <TextField
                          size='small'
                          required
                          className='w-100'
                          label='Contact Phone'
                          variant='outlined'
                          sx={{ mb: 3 }}
                          inputProps={{ ...inputProps, type: 'tel' }}
                        />
                      )}
                    </InputMask>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <FormControl variant='outlined' className='w-100'>
                    <TextField
                      size='small'
                      className='w-100'
                      label='Company Website'
                      variant='outlined'
                      sx={{ mb: 3 }}
                      value={companyWeb}
                      onChange={(e) => handleInputChange(e, setCompanyWeb)}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <FormControl variant='outlined' className='w-100' size='small'>
                    <InputLabel id='state-select-label'>
                      Company Speciality
                    </InputLabel>
                    <Select
                      labelId='city-select-label'
                      id='city-select'
                      value={companySpeciality}
                      sx={{ mb: 3 }}
                      onChange={(e) => setCompanySpeciality(e.target.value)}
                      label='Company Speciality'
                    >
                      {specOptions.length > 0 &&
                        specOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <FormControl variant='outlined' className='w-100'>
                    <InputMask
                      mask='(999) 999 - 9999'
                      maskChar='_'
                      value={afterHoursPhone}
                      onChange={(e) => handleInputChange(e, setAfterHoursPhone)}
                    >
                      {(inputProps) => (
                        <TextField
                          size='small'
                          required
                          className='w-100'
                          label='After working hours phone number'
                          variant='outlined'
                          sx={{ mb: 3 }}
                          inputProps={{ ...inputProps, type: 'tel' }}
                        />
                      )}
                    </InputMask>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <FormControl variant='outlined' className='w-100'>
                    <TextField
                      size='small'
                      className='w-100'
                      label='Office Manager'
                      variant='outlined'
                      sx={{ mb: 3 }}
                      value={officeManager}
                      onChange={(e) => handleInputChange(e, setOfficeManager)}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <FormControl variant='outlined' className='w-100'>
                    <TextField
                      size='small'
                      className='w-100'
                      type='email'
                      label='Alternative Email'
                      variant='outlined'
                      sx={{ mb: 3 }}
                      value={secondEmail}
                      onChange={(e) => handleInputChange(e, setSecondEmail)}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <FormControl variant='outlined' className='w-100'>
                    <InputMask
                      mask='(999) 999 - 9999'
                      maskChar='_'
                      value={docCell}
                      onChange={(e) => handleInputChange(e, setDocCell)}
                    >
                      {(inputProps) => (
                        <TextField
                          size='small'
                          required
                          className='w-100'
                          label='Doctor Cell'
                          variant='outlined'
                          inputProps={{ ...inputProps, type: 'tel' }}
                          sx={{ mb: 3 }}
                        />
                      )}
                    </InputMask>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <FormControl variant='outlined' className='w-100'>
                    <InputMask
                      mask='(999) 999 - 9999'
                      maskChar='_'
                      value={fax}
                      onChange={(e) => handleInputChange(e, setFax)}
                    >
                      {(inputProps) => (
                        <TextField
                          size='small'
                          className='w-100'
                          label='Fax'
                          variant='outlined'
                          sx={{ mb: 3 }}
                          inputProps={{ ...inputProps, type: 'tel' }}
                        />
                      )}
                    </InputMask>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <FormControl variant='outlined' className='w-100'>
                    <TextField
                      size='small'
                      required
                      className='w-100'
                      label='Practice Management Software'
                      variant='outlined'
                      sx={{ mb: 3 }}
                      value={pracMngSft}
                      onChange={(e) => handleInputChange(e, setPracMngSft)}
                    />
                  </FormControl>
                </Grid>

              </Grid>

            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={6}
            >

              <Grid container spacing={1}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                >
                  <FormControl
                    variant='outlined'
                    className='w-100'
                    style={{ height: '100%' }}
                  >
                    <TextField
                      size='small'
                      className='w-100'
                      fullWidth
                      label='Notes'
                      placeholder='2000 characters'
                      variant='outlined'
                      multiline
                      rows={14}
                      value={notes}
                      onChange={(e) => handleInputChange(e, setNotes)}
                    />
                  </FormControl>
                </Grid>

              </Grid>

            </Grid>

          </Grid>

          {user && user.role_type == 'owner' && (
            <Box sx={{ mt: 4 }} >
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                >
                  <span>
                    By creating a Mayday Dental Staffing Account, you agree to Mayday
                    Dental Staffing's{' '}
                    <span
                      onClick={() => {
                        setTerms(true);
                      }}
                      className='text-underline'
                      style={{
                        textDecoration: 'underline',
                        color: '#2561B0',
                        cursor: 'pointer',
                      }}
                    >
                      Terms And Conditions
                    </span>
                  </span>
                </Grid>
              </Grid>
            </Box>
          )}


          <Box sx={{ mt: 4 }} >
            <Grid container spacing={3}>

              <Grid
                item
                xs={12}
                sm={12}
                md={4}
              >
                <Button
                  className='w-100 w-md-75'
                  variant='outlined'
                  color='primary'
                  style={{ height: '2.5rem' }}
                  sx={{
                    borderRadius: '4px',
                    boxShadow: 'none',
                    color: '#2561B0',
                    textTransform: 'none',
                  }}
                  onClick={() => {
                    setActiveStep((state) => state - 1);
                  }}
                >
                  Back
                </Button>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={4}
              >
                <Button
                  className='w-100'
                  type='submit'
                  variant='contained'
                  style={{ height: '2.5rem' }}
                  color='primary'
                  sx={{
                    borderRadius: '4px',
                    boxShadow: 'none',
                    background: '#2561B0',
                    textTransform: 'none',
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color='inherit' />
                  ) : (
                    'Next Step'
                  )}
                </Button>
              </Grid>

            </Grid>
          </Box>

        </form>

      </Box>

      <Modal
        open={terms}
        onClose={() => {
          setTerms(false);
        }}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <div
          className='position-absolute top-50 px-0 px-md-5 pt-0 pt-md-5 pb-0 pb-md-4 text-start start-50 translate-middle bg-white rounded shadow-sm w-75'
          style={{ fontSize: '0.8rem' }}
        >
          <h4 className='font-weight-bold text-black mb-4'>
            Terms and Conditions
          </h4>
          <p className='mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh magnis
            gravida nunc sagittis, odio egestas. Neque risus id varius et
            mattis. Eget gravida urna pellentesque non lobortis bibendum
            consequat. Nisl cursus in euismod tellus ut sapien non. Sed amet
            nec, nunc eget. Dictum quam ipsum nunc, amet. Habitasse egestas
            fermentum nunc scelerisque cursus convallis in aliquam. Integer cras
            rhoncus, nibh dui tellus est et diam. Sit lectus id id sagittis
            turpis. Sit sit donec tellus lorem. Quam viverra dictum amet, arcu.
            Vulputate tellus pellentesque nam eget sagittis urna scelerisque.
            Amet elit justo, praesent et sed in cursus turpis arcu. Quisque
            justo, pretium ullamcorper in sem fermentum. Sit faucibus blandit
            tortor lorem ac ac massa sit mattis. Tempus varius faucibus maecenas
            est, sed risus, tellus egestas. Nunc egestas bibendum adipiscing
            consectetur malesuada nunc vel commodo. Accumsan, suspendisse
            fringilla a gravida sit aliquam enim eu massa. Ac diam felis
            elementum nisi, massa ut ut nisi. Interdum tempus velit id diam
            volutpat. <br /> <br /> Velit sit tellus urna semper enim urna amet
            dictumst nullam. Sed pellentesque egestas pharetra et ultricies
            feugiat pulvinar. Neque mauris elementum gravida scelerisque magna
            mi. Duis molestie arcu, ut scelerisque volutpat. Tortor sed sapien
            turpis sem praesent morbi est sit. Ornare etiam aliquet at sed in.
            Luctus vitae consectetur nulla sed consectetur tempus, tempor. Arcu,
            nec, convallis et orci nisl. Scelerisque diam varius sollicitudin
            non sit. Fusce vitae vel lectus vulputate orci. Eget ornare aliquet
            turpis massa tortor, platea blandit elementum commodo. A, amet sed
            tortor a, ac ridiculus dictum amet. Maecenas nulla mi volutpat
            tellus tellus amet, ac aenean ligula. Urna, ipsum pretium, id turpis
            ultrices lacus, congue. Convallis metus purus dolor accumsan tortor.
            In orci turpis interdum molestie adipiscing dictumst. Aliquam
            malesuada enim arcu egestas elit. Mi purus, mi fusce eget. Tellus
            arcu, diam pharetra vitae urna mauris, parturient nibh neque.
          </p>
          <div className='d-flex justify-content-end'>
            <Button variant='secondary' className='mx-2' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='primary' onClick={handleClose}>
              Ok
            </Button>
          </div>
        </div>
      </Modal>

      {/* <div className='mx-auto mx-lg-0'>
        <Modal
          open={terms}
          onClose={() => {
            setTerms(false);
          }}
          aria-labelledby='modal-title'
          aria-describedby='modal-description'
        >
          <div
            className='position-absolute top-50 px-0 px-md-5 pt-0 pt-md-5 pb-0 pb-md-4 text-start start-50 translate-middle bg-white rounded shadow-sm w-75'
            style={{ fontSize: '0.8rem' }}
          >
            <h4 className='font-weight-bold text-black mb-4'>
              Terms and Conditions
            </h4>
            <p className='mb-4'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh magnis
              gravida nunc sagittis, odio egestas. Neque risus id varius et
              mattis. Eget gravida urna pellentesque non lobortis bibendum
              consequat. Nisl cursus in euismod tellus ut sapien non. Sed amet
              nec, nunc eget. Dictum quam ipsum nunc, amet. Habitasse egestas
              fermentum nunc scelerisque cursus convallis in aliquam. Integer cras
              rhoncus, nibh dui tellus est et diam. Sit lectus id id sagittis
              turpis. Sit sit donec tellus lorem. Quam viverra dictum amet, arcu.
              Vulputate tellus pellentesque nam eget sagittis urna scelerisque.
              Amet elit justo, praesent et sed in cursus turpis arcu. Quisque
              justo, pretium ullamcorper in sem fermentum. Sit faucibus blandit
              tortor lorem ac ac massa sit mattis. Tempus varius faucibus maecenas
              est, sed risus, tellus egestas. Nunc egestas bibendum adipiscing
              consectetur malesuada nunc vel commodo. Accumsan, suspendisse
              fringilla a gravida sit aliquam enim eu massa. Ac diam felis
              elementum nisi, massa ut ut nisi. Interdum tempus velit id diam
              volutpat. <br /> <br /> Velit sit tellus urna semper enim urna amet
              dictumst nullam. Sed pellentesque egestas pharetra et ultricies
              feugiat pulvinar. Neque mauris elementum gravida scelerisque magna
              mi. Duis molestie arcu, ut scelerisque volutpat. Tortor sed sapien
              turpis sem praesent morbi est sit. Ornare etiam aliquet at sed in.
              Luctus vitae consectetur nulla sed consectetur tempus, tempor. Arcu,
              nec, convallis et orci nisl. Scelerisque diam varius sollicitudin
              non sit. Fusce vitae vel lectus vulputate orci. Eget ornare aliquet
              turpis massa tortor, platea blandit elementum commodo. A, amet sed
              tortor a, ac ridiculus dictum amet. Maecenas nulla mi volutpat
              tellus tellus amet, ac aenean ligula. Urna, ipsum pretium, id turpis
              ultrices lacus, congue. Convallis metus purus dolor accumsan tortor.
              In orci turpis interdum molestie adipiscing dictumst. Aliquam
              malesuada enim arcu egestas elit. Mi purus, mi fusce eget. Tellus
              arcu, diam pharetra vitae urna mauris, parturient nibh neque.
            </p>
            <div className='d-flex justify-content-end'>
              <Button variant='secondary' className='mx-2' onClick={handleClose}>
                Cancel
              </Button>
              <Button variant='primary' onClick={handleClose}>
                Ok
              </Button>
            </div>
          </div>
        </Modal>
        <h4
          className='text-start mb-4 fw-semibold'
          style={{ fontSize: '1.25rem' }}
        >
          Billing Address Information
        </h4>
        <form
          className='w-lg-75'
          style={{ width: '95%' }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Row>
            <Col xs={12} md={3}>
              <FormControl required variant='outlined' className='w-100'>
                <TextField
                  size='small'
                  required
                  className='w-100'
                  label='Billing ZIP'
                  variant='outlined'
                  sx={{ mb: 3 }}
                  value={billingZip}
                  inputProps={{
                    pattern: '^\\d{5}$',
                    title: 'ZIP code can be only 5-digit',
                    minLength: 5,
                    maxLength: 5,
                  }}
                  onChange={(e) => handleInputChange(e, setBillingZip)}
                />
              </FormControl>
            </Col>
            <Col xs={12} md={3}>
              <FormControl
                required
                variant='outlined'
                className='w-100'
                size='small'
              >
                {billingCityValue ? (
                  <Autocomplete
                    size='small'
                    options={cityOptions}
                    getOptionLabel={(option) => option.label}
                    value={billingCityValue ? billingCityValue : ''}
                    onChange={(event, newValue) => {
                      setBillingCity(newValue ? newValue.value : '');
                      setBillingCityValue(newValue);
                    }}
                    onInputChange={handleCityInputChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
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
                    size='small'
                    options={cityOptions}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {
                      setBillingCity(newValue ? newValue.value : '');
                      setBillingCityValue(newValue);
                    }}
                    onInputChange={handleCityInputChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
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
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={3}>
              <FormControl required variant='outlined' className='w-100'>
                <TextField
                  size='small'
                  required
                  className='w-100'
                  label='Billing Street'
                  variant='outlined'
                  sx={{ mb: 3 }}
                  value={billingStreet}
                  onChange={(e) => handleInputChange(e, setBillingStreet)}
                />
              </FormControl>
            </Col>
            <Col xs={12} md={3}>
              <FormControl
                required
                variant='outlined'
                className='w-100'
                size='small'
              >
                {billingStateValue ? (
                  <Autocomplete
                    size='small'
                    options={stateOptions}
                    getOptionLabel={(option) => option.label}
                    value={billingStateValue ? billingStateValue : ''}
                    onChange={(event, newValue) => {
                      setBillingState(newValue ? newValue.value : '');
                      setBillingStateValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='State'
                        required
                        variant='outlined'
                        className='w-100 mb-2'
                      />
                    )}
                  />
                ) : (
                  <Autocomplete
                    size='small'
                    options={stateOptions}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {
                      setBillingState(newValue ? newValue.value : '');
                      setBillingStateValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='State'
                        required
                        variant='outlined'
                        className='w-100 mb-2'
                      />
                    )}
                  />
                )}
              </FormControl>
            </Col>
          </Row>
          <h4
            className='text-start my-4 fw-semibold'
            style={{ fontSize: '1.25rem' }}
          >
            Company Details
          </h4>
          <Row>
            <Col xs={12} md={3}>
              <FormControl variant='outlined' className='w-100'>
                <TextField
                  size='small'
                  required
                  className='w-100'
                  label='Company Name'
                  variant='outlined'
                  sx={{ mb: 3 }}
                  value={companyName}
                  onChange={(e) => handleInputChange(e, setCompanyName)}
                />
              </FormControl>
              <FormControl variant='outlined' className='w-100'>
                <InputMask
                  mask='(999) 999 - 9999'
                  maskChar='_'
                  value={contactPhone}
                  onChange={(e) => handleInputChange(e, setContactPhone)}
                >
                  {(inputProps) => (
                    <TextField
                      size='small'
                      required
                      className='w-100'
                      label='Contact Phone'
                      variant='outlined'
                      sx={{ mb: 3 }}
                      inputProps={{ ...inputProps, type: 'tel' }}
                    />
                  )}
                </InputMask>
              </FormControl>
              <FormControl variant='outlined' className='w-100'>
                <TextField
                  size='small'
                  className='w-100'
                  label='Company Website'
                  variant='outlined'
                  sx={{ mb: 3 }}
                  value={companyWeb}
                  onChange={(e) => handleInputChange(e, setCompanyWeb)}
                />
              </FormControl>
              <FormControl variant='outlined' className='w-100' size='small'>
                <InputLabel id='state-select-label'>
                  Company Speciality
                </InputLabel>
                <Select
                  labelId='city-select-label'
                  id='city-select'
                  value={companySpeciality}
                  sx={{ mb: 3 }}
                  onChange={(e) => setCompanySpeciality(e.target.value)}
                  label='Company Speciality'
                >
                  {specOptions.length > 0 &&
                    specOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl variant='outlined' className='w-100'>
                <InputMask
                  mask='(999) 999 - 9999'
                  maskChar='_'
                  value={afterHoursPhone}
                  onChange={(e) => handleInputChange(e, setAfterHoursPhone)}
                >
                  {(inputProps) => (
                    <TextField
                      size='small'
                      required
                      className='w-100'
                      label='After working hours phone number'
                      variant='outlined'
                      sx={{ mb: 3 }}
                      inputProps={{ ...inputProps, type: 'tel' }}
                    />
                  )}
                </InputMask>
              </FormControl>
            </Col>

            <Col xs={12} md={3}>
              <FormControl variant='outlined' className='w-100'>
                <TextField
                  size='small'
                  className='w-100'
                  label='Office Manager'
                  variant='outlined'
                  sx={{ mb: 3 }}
                  value={officeManager}
                  onChange={(e) => handleInputChange(e, setOfficeManager)}
                />
              </FormControl>
              <FormControl variant='outlined' className='w-100'>
                <TextField
                  size='small'
                  className='w-100'
                  type='email'
                  label='Alternative Email'
                  variant='outlined'
                  sx={{ mb: 3 }}
                  value={secondEmail}
                  onChange={(e) => handleInputChange(e, setSecondEmail)}
                />
              </FormControl>
              <FormControl variant='outlined' className='w-100'>
                <InputMask
                  mask='(999) 999 - 9999'
                  maskChar='_'
                  value={docCell}
                  onChange={(e) => handleInputChange(e, setDocCell)}
                >
                  {(inputProps) => (
                    <TextField
                      size='small'
                      required
                      className='w-100'
                      label='Doctor Cell'
                      variant='outlined'
                      inputProps={{ ...inputProps, type: 'tel' }}
                      sx={{ mb: 3 }}
                    />
                  )}
                </InputMask>
              </FormControl>
              <FormControl variant='outlined' className='w-100'>
                <InputMask
                  mask='(999) 999 - 9999'
                  maskChar='_'
                  value={fax}
                  onChange={(e) => handleInputChange(e, setFax)}
                >
                  {(inputProps) => (
                    <TextField
                      size='small'
                      className='w-100'
                      label='Fax'
                      variant='outlined'
                      sx={{ mb: 3 }}
                      inputProps={{ ...inputProps, type: 'tel' }}
                    />
                  )}
                </InputMask>
              </FormControl>
              <FormControl variant='outlined' className='w-100'>
                <TextField
                  size='small'
                  required
                  className='w-100'
                  label='Practice Management Software'
                  variant='outlined'
                  sx={{ mb: 3 }}
                  value={pracMngSft}
                  onChange={(e) => handleInputChange(e, setPracMngSft)}
                />
              </FormControl>
            </Col>
            <Col className='pb-2' style={{ height: '100%' }}>
              <FormControl
                variant='outlined'
                className='w-100'
                style={{ height: '100%' }}
              >
                <TextField
                  size='small'
                  className='w-100'
                  fullWidth
                  label='Notes'
                  placeholder='2000 characters'
                  variant='outlined'
                  multiline
                  rows={12}
                  value={notes}
                  onChange={(e) => handleInputChange(e, setNotes)}
                />
              </FormControl>
            </Col>
          </Row>

          {user && user.role_type == 'owner' && (
            <div className='mb-4'>
              <span>
                By creating a Mayday Dental Staffing Account, you agree to Mayday
                Dental Staffing's{' '}
                <span
                  onClick={() => {
                    setTerms(true);
                  }}
                  className='text-underline'
                  style={{
                    textDecoration: 'underline',
                    color: '#2561B0',
                    cursor: 'pointer',
                  }}
                >
                  Terms And Conditions
                </span>
              </span>
            </div>
          )}
          <Row className='my-0 my-md-4'>
            <Col className='my-1 mt-3 my-md-0 ps-2' xs={12} md={1}>
              <Button
                className='w-100 w-md-75'
                variant='outlined'
                color='primary'
                style={{ height: '2.5rem' }}
                sx={{
                  borderRadius: '4px',
                  boxShadow: 'none',
                  color: '#2561B0',
                  textTransform: 'none',
                }}
                onClick={() => {
                  setActiveStep((state) => state - 1);
                }}
              >
                Back
              </Button>
            </Col>
            <Col className='my-1 mt-3 my-md-0 ps-2' xs={12} md={2}>
              <Button
                className='w-100'
                type='submit'
                variant='contained'
                style={{ height: '2.5rem' }}
                color='primary'
                sx={{
                  borderRadius: '4px',
                  boxShadow: 'none',
                  background: '#2561B0',
                  textTransform: 'none',
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color='inherit' />
                ) : (
                  'Next Step'
                )}
              </Button>
            </Col>
          </Row>
        </form>
      </div> */}
    </>
  );
}
