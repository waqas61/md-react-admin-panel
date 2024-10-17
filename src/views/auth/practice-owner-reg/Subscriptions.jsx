

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SubscriptionPlanDuration from './SubscriptionPlanDuration';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  Modal,
  Grid,
  RadioGroup,
  Hidden
} from '@mui/material';

import { BloodtypeOutlined } from '@mui/icons-material';




import crown from '../../../assets/icons/Crown.svg';
import logo from '../../../assets/icons/Logo.svg';
import svgModal from '../../../assets/images/Dialog.png';
import hand from '../../../assets/images/handPhone.png';
import { setUser } from '../../../store/slices/userSlice';
import SubscriptionPlan from './SubscriptionPlan';


const Item = styled(({ theme }) => ({
  backgroundColor: '#FAFAFA',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  boxShadow: '0 4px 50px rgba(0,0,0,0.1)',
  // textAlign: 'center',
}));

//Step 3
export default function Subscriptions({ setActiveStep }) {
  const [selectedValue, setSelectedValue] = useState('1_1');
  const [subs, setSubs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading1, setIsLoading1] = useState(false);
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          'https://api.mddentalstaffing.com/api/v1/subscriptions'
        );
        const filteredData = response.data.data.slice(1);
        setSubs(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {

    setError('');
    e.preventDefault();
    setIsLoading1(true);
    const authToken = localStorage.getItem('auth_token');

    const plan_id = selectedValue.split('_')[1];
    const subscription_plan_id = selectedValue.split('_')[0];

    localStorage.setItem('plan_id', plan_id);
    localStorage.setItem('subscription_plan_id', subscription_plan_id);
    // console.log("SelectedValue Plan === > ", plan_id, subscription_plan_id);
    navigate('/payment-method');

    setIsLoading1(false);
  };

  return (
    <>

      <Box sx={{ mt: 2 }}  >

        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
          >
            <Box
              sx={{
                flexGrow: 1,
                // mt: 2,
                p: 2,
                // width: '80%',
                backgroundColor: '#FFFFFF',
                // width: '65%',
                borderRadius: '4px',
                cursor: 'pointer',
                border: `1px solid ${selectedValue === '1_1' ? '#2561B0' : '#E8E8E8'}`
              }}
              onClick={() => {
                setSelectedValue('1_1');
              }}
            >
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={3}
                >
                  <Typography variant="h5" component="h5" sx={{ mt: 1, mb: 1 }}>
                    Current Plan
                  </Typography>
                  <img
                    className='mb-3 mb-md-0'
                    style={{ width: '6rem' }}
                    src={logo}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={5}
                >
                  <h6 className='fw-semibold'>Free Account</h6>
                  <p className='mt-2 small text-lightgrey'>
                    Standard temporary placement referral fee and no discount on
                    permanent placement referral fee.
                  </p>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                >
                  <h3>
                    {' '}
                    <span className='display-6 p-0 m-0 fw-semibold'>$0</span>
                    <span className='fs-5 p-0 m-0 text-lightgrey fw-semibold'>
                      /month{' '}
                    </span>{' '}
                  </h3>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{
          mt: 2,
          color: 'black',
          borderColor: 'black'
        }} />

        {isLoading ? (
          <>
            <Box
              height={300}
              my={4}
              display="flex"
              alignItems="center"
              gap={4}
              // p={2}
              justifyContent="center"
            >
              <CircularProgress />{' '}
            </Box>
          </>
        ) : (
          <>
            <Box mt={2} >
              <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                {subs.map((plan) => (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                  >
                    {plan.name === 'Elite Plan' ? (
                      <Box
                        className={`${plan.name === 'Elite Plan' ? 'elite-plan-col' : ''}`}
                        key={plan.id}
                        sx={{
                          backgroundColor: '#FAFAFA',
                          padding: '15px',
                          boxShadow: '0 4px 50px rgba(0,0,0,0.1)',
                          overflow: plan.name === 'Elite Plan' ? 'hidden' : 'visible',
                          position: 'relative',
                          p: 2
                        }}

                      >
                        <Box
                          sx={{
                            backgroundColor: '#FAFAFA',
                            position: 'relative'
                          }}
                        >
                          <Badge
                            className='d-felx justify-content-center align-items-center'
                            style={{
                              background:
                                'linear-gradient(90deg, #FFA902 0%, #FFCF33 50%)',
                              position: 'absolute',
                              top: '6rem',
                              right: '-3.8rem',
                              width: '15rem',
                              padding: '0.5rem 1rem',
                              transform: 'rotate(45deg)',
                              border: '30px',
                              borderColor: '#FFE48B',
                              transformOrigin: 'top right',
                              textAlign: 'center',
                            }}
                            overlap='circular'
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                          >
                            <span
                              className='text-center fw-semibold'
                              style={{ color: '#B28900' }}
                            >
                              Most Popular
                            </span>
                          </Badge>

                          <h4>
                            {plan.name}{' '}
                            <img
                              src={crown}
                              alt='Crown'
                              className='img-fluid pb-1'
                              style={{ height: '1.5rem' }}
                            />{' '}
                          </h4>
                          <p style={{ fontSize: '0.9rem', color: '#595959', width: '220px' }} >
                            {plan.features}
                          </p>
                          <Box
                            sx={{
                              mt: 2
                            }}
                          >
                            <p className='mb-0 text-lightgrey'>Starts at</p>
                            <span className='fw-semibold display-6'> {' '} {plan.subscription_plans[0].amount}</span>
                            <span className='text-lightgrey fs-5 fw-semibold'>
                              /month
                            </span>
                          </Box>

                          <SubscriptionPlanDuration
                            plan={plan}
                            selectedValue={selectedValue}
                            handleChange={handleChange}
                          />

                        </Box>
                      </Box>
                    ) : (
                      <Box
                        // className={`${plan.name === 'Elite Plan' ? 'elite-plan-col' : ''}`}
                        // backgroundColor='#FAFAFA'
                        p={2}
                        padding='15px'
                        boxShadow='0 4px 50px rgba(0,0,0,0.1)'
                      >
                        <h4>{plan.name}{' '}</h4>
                        <p style={{
                          fontSize: '0.9rem',
                          color: '#595959',
                          width: '220px'
                        }} >
                          {plan.features}
                        </p>
                        <Box
                          sx={{
                            mt: 2
                          }}
                        >
                          <p className='mb-0 text-lightgrey'>Starts at</p>
                          <span className='fw-semibold display-6'> {' '} {plan.subscription_plans[0].amount}</span>
                          <span className='text-lightgrey fs-5 fw-semibold'>
                            /month
                          </span>
                        </Box>

                        <SubscriptionPlanDuration
                          plan={plan}
                          selectedValue={selectedValue}
                          handleChange={handleChange}
                        />

                      </Box>
                    )}

                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}

        <Divider sx={{
          mt: 5,
          color: 'black',
          borderColor: 'black'
        }} />

        <Box
          sx={{
            backgroundColor: '#21589F',
            height: '10rem',
            mt: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <Box
                component="div"
                sx={{
                  p: 2
                }}
              >
                <img
                  src={hand}
                  alt='Phone in hand'
                  style={{ marginTop: '-2.7rem', marginLeft: '-0.7rem' }}
                  className=''
                />

              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={8}
            >

              <Box
                component="p"
                sx={{
                  // p: 2,
                  // border: '1px dashed grey',
                  color: '#FFFFFF',
                  fontSize: '1.3rem',
                  fontWeight: 'bold'
                }}
              >
                Save money on permanent placement referral fees with the purchase
                of any subscription plan.
              </Box>

              <Box
                component="div"
                sx={{
                  mt: 2,
                }}
              >
                <Button
                  type='submit'
                  className='custom-button'
                  style={{
                    height: '2.8rem',
                    borderRadius: '4px',
                    boxShadow: 'none',
                    background: '#FFFFFF',
                    textTransform: 'none',
                    color: '#595959',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setDialog((state) => !state);
                  }}
                >
                  Learn More
                </Button>

              </Box>


            </Grid>
          </Grid>
        </Box>

        {error && (
          <>
            <Box component="section" sx={{ p: 2, mt: 2, border: '1px dashed grey' }}>
              <p className='text-danger'> {error} </p>
            </Box>
          </>
        )}

        <Box sx={{ mt: 6 }} >
          <Grid container spacing={3}>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <Button
                variant="outlined"
                color="primary"
                style={{ height: "2.5rem", width: "100%" }}
                sx={{
                  borderRadius: "4px",
                  color: "#2561B0",
                  textTransform: "none",
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
                type="submit"
                variant="contained"
                style={{ height: "2.5rem", width: "100%" }}
                color="primary"
                sx={{
                  borderRadius: "4px",
                  // background: "#2561B0",
                  background: '#4CAF50',
                  textTransform: "none",
                }}
                disabled={selectedValue === '' || isLoading1}
                onClick={handleRegister}
              >
                {isLoading1 ? 'Loading...' : 'REGISTER'}
              </Button>
            </Grid>

          </Grid>
        </Box>

        {dialog && (
          <span
            onClick={() => {
              setDialog((state) => !state);
            }}
          >
            <Modal
              open={dialog}
              onClose={() => {
                setDialog((state) => !state);
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '70vh',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  marginTop: '15vh',
                }}
              >
                <div style={{ background: 'none', padding: 0, margin: 0 }}>
                  <img
                    src={svgModal}
                    alt='SVG Image'
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </Modal>
          </span>
        )}

      </Box>



      {/* <div className='w-lg-75' style={{ width: '95%' }}>
        <h4 className='fw-semibold mb-4 d-none d-md-block'>Current Plan</h4>
        <Row
          style={{
            backgroundColor: '#FFFFFF',
            width: '65%',
            cursor: 'pointer',
            border: `1px solid ${selectedValue === '1_1' ? '#2561B0' : '#E8E8E8'}`
          }}
          onClick={() => {
            setSelectedValue('1_1');
          }}
          className='py-3 rounded m-0 mb-4 pe-5 justify-content-start'
        >
          <Col xs={8} md={2} className='me-4 ms-1 mb-1 mb-md-0'>
            <Image
              className='mb-3 mb-md-0'
              style={{ width: '6rem' }}
              src={logo}
            />
            <h4 className='fw-semibold mb-1 d-block d-md-none'>Current Plan</h4>
          </Col>
          <Col md={7}>
            <h6 className='fw-semibold'>Free Account</h6>
            <p className='mt-2 small text-lightgrey'>
              Standard temporary placement referral fee and no discount on
              permanent placement referral fee.
            </p>
          </Col>
          <Col xs={12} md={1}>
            <h3>
              {' '}
              <span className='display-6 p-0 m-0 fw-semibold'>$0</span>
              <span className='fs-5 p-0 m-0 text-lightgrey fw-semibold'>
                /month{' '}
              </span>{' '}
            </h3>
          </Col>
        </Row>
        <br />
        <hr />
        {isLoading ? (
          <div className='text-center m-5'>
            <CircularProgress />{' '}
          </div>
        ) : (
          <Row className='justify-content-between mx-0 my-5'>
            {subs.map((plan) => (
              <Col
                className={`justify-content-center rounded mb-5 mt-2 py-4 px-3 ${plan.name === 'Elite Plan' ? 'elite-plan-col' : ''
                  }`}
                key={plan.id}
                style={{
                  overflow: plan.name === 'Elite Plan' ? 'hidden' : 'visible',
                  backgroundColor: '#FAFAFA',
                  flex: '0 0 31.5%', // Custom column width
                  maxWidth: '31.5%', // Custom column width
                  boxShadow: '0 4px 50px rgba(0,0,0,0.1)',
                }}
              >


                {plan.name === 'Elite Plan' && (
                  <Box sx={{ backgroundColor: '#FAFAFA' }} position='relative'>
                    <Badge
                      className='d-felx justify-content-center align-items-center'
                      style={{
                        background:
                          'linear-gradient(90deg, #FFA902 0%, #FFCF33 50%)',
                        position: 'absolute',
                        top: '6rem',
                        right: '-3.8rem',
                        width: '15rem',
                        padding: '0.5rem 1rem',
                        transform: 'rotate(45deg)',
                        border: '30px',
                        borderColor: '#FFE48B',
                        transformOrigin: 'top right',
                        textAlign: 'center',
                      }}
                      overlap='circular'
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <span
                        className='text-center fw-semibold'
                        style={{ color: '#B28900' }}
                      >
                        Most Popular
                      </span>
                    </Badge>
                    <h4>
                      {plan.name}{' '}
                      <img
                        src={crown}
                        alt='Crown'
                        className='img-fluid pb-1'
                        style={{ height: '1.5rem' }}
                      />{' '}
                    </h4>
                    <p
                      style={{ fontSize: '0.9rem', color: '#595959' }}
                      className='w-75'
                    >
                      {plan.features}
                    </p>
                    <br />
                    <p className='mb-0 text-lightgrey'>Starts at</p>
                    <span className='fw-semibold display-6'>
                      {plan.subscription_plans[0].amount}
                    </span>
                    <span className='text-lightgrey fs-5 fw-semibold'>
                      /month
                    </span>
                    <SubscriptionPlan
                      plan={plan}
                      selectedValue={selectedValue}
                      handleChange={handleChange}
                    />

                    <div className='text-center'>
                      <button
                        type='submit'
                        className='custom-button'
                        style={{
                          width: '45%',
                          height: '2.2rem',
                          borderRadius: '4px',
                          boxShadow: 'none',
                          background: '#2561B0',
                          textTransform: 'none',
                          color: '#fff',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        Try {plan.name.replace(' Plan', '')}
                      </button>
                    </div>
                  </Box>
                )}
                {plan.name !== 'Elite Plan' && (
                  <div style={{ backgroundColor: '#FAFAFA' }}>
                    <h4>{plan.name}</h4>
                    <p
                      style={{ fontSize: '0.9rem', color: '#595959' }}
                      className='w-75'
                    >
                      {plan.features}
                    </p>
                    <br />
                    <p className='mb-0 text-lightgrey'>Starts at</p>
                    <span className='fw-semibold display-6'>
                      {' '}
                      {plan.subscription_plans[0].amount}
                    </span>
                    <span className='text-lightgrey fs-5 fw-semibold'>
                      /month
                    </span>
                    <SubscriptionPlan
                      plan={plan}
                      selectedValue={selectedValue}
                      handleChange={handleChange}
                    />
                    <div className='text-center'>
                      <button
                        type='submit'
                        className='custom-button'
                        style={{
                          width: '45%',
                          height: '2.2rem',
                          borderRadius: '4px',
                          boxShadow: 'none',
                          background: '#2561B0',
                          textTransform: 'none',
                          color: '#fff',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        Try {plan.name.replace(' Plan', '')}
                      </button>
                    </div>
                  </div>
                )}
              </Col>
            ))}
          </Row>
        )}

        {dialog && (
          <span
            onClick={() => {
              setDialog((state) => !state);
            }}
          >
            <Modal
              open={dialog}
              onClose={() => {
                setDialog((state) => !state);
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '70vh',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  marginTop: '15vh',
                }}
              >
                <div style={{ background: 'none', padding: 0, margin: 0 }}>
                  <img
                    src={svgModal}
                    alt='SVG Image'
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </Modal>
          </span>
        )}
        {!dialog && (
          <Row
            style={{ backgroundColor: '#21589F', height: '10rem' }}
            className='mb-4 rounded'
          >
            <Col xs={12} md={3}>
              <img
                src={hand}
                alt='Phone in hand'
                style={{ marginTop: '-2.7rem', marginLeft: '-0.7rem' }}
                className=''
              />
            </Col>
            <Col className='d-grid align-items-center mx-5 w-75'>
              <span
                className='fw-semibold'
                style={{ color: '#FFFFFF', fontSize: '1.3rem' }}
              >
                Save money on permanent placement referral fees with the purchase
                of any subscription plan.
              </span>
              <button
                type='submit'
                className='custom-button'
                style={{
                  width: '20%',
                  height: '2.8rem',
                  borderRadius: '4px',
                  boxShadow: 'none',
                  background: '#FFFFFF',
                  textTransform: 'none',
                  color: '#595959',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setDialog((state) => !state);
                }}
              >
                Learn More
              </button>
            </Col>
          </Row>
        )}

        {error && <p className='text-danger'> {error} </p>}

        <Row>
          <Col xs={12} md={1}>
            <button
              type='button'
              className='custom-button'
              style={{
                width: '100%',
                height: '2.8rem',
                borderRadius: '4px',
                boxShadow: 'none',
                color: '#2561B0',
                textTransform: 'none',
                border: '1px solid #2561B0',
                cursor: 'pointer',
                background: '#FFFFFF',
              }}
              onClick={() => {
                setActiveStep((state) => state - 1);
              }}
            >
              Back
            </button>
          </Col>
          <Col className='my-3 my-md-0' xs={12} md={2}>
            <button
              type='submit'
              className='custom-button'
              style={{
                width: '100%',
                height: '2.8rem',
                borderRadius: '4px',
                boxShadow: 'none',
                background: '#4CAF50',
                textTransform: 'none',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
              disabled={selectedValue === '' || isLoading1}
              onClick={handleRegister}
            >
              {isLoading1 ? 'Loading...' : 'REGISTER'}
            </button>
          </Col>
        </Row>
      </div> */}

    </>
  );
}
