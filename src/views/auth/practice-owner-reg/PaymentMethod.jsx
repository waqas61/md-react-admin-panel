

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';



import Skeleton from '@mui/material/Skeleton';

import Badge from '@mui/material/Badge';
import { CircularProgress, Modal } from '@mui/material';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography';


import shoulder from '../../../assets/images/registerPracticeOwner.jpg';
import logo from '../../../assets/icons/Logo.svg';
import crown from '../../../assets/icons/Crown.svg';
import svgModal from '../../../assets/images/Dialog.png';
import hand from '../../../assets/images/handPhone.png';

import { setUser } from '../../../store/slices/userSlice';

import SubscriptionPlan from './SubscriptionPlan';
import CheckoutForm from './CheckoutForm';


import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";


export default function PaymentMethod() {
  const stripePromise = loadStripe("pk_test_51EsUJQCdRcJh67FUP7Ajf7V03zXzGxPs6TdzYsku2J8oQLgrSYImKhMrFWMAL2Z2K93XsMKl1Za4lPMaJoh1mZzn00ibjyh3x1");
  const [selectedValue, setSelectedValue] = useState('1_1');
  const [subs, setSubs] = useState([]);
  const [plan, setSubscription] = useState([]);
  const [subPlan, setSubPlan] = useState(null);
  const [subPlanPrice, setSubPlanPrice] = useState(null);
  const [subPlanDuration, setSubPlanDuration] = useState(null);
  const [subPlanCycle, setSubPlanCycle] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [setupIntent, setSetupIntent] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPlan = async function (plan_id, subscription_plan_id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.mddentalstaffing.com/api/v1/subscriptions?plan_id=${plan_id}&subscription_plan_id=${subscription_plan_id}`)
        .then(response => {
          resolve(response.data.data[0])
        }).catch(error => {
          reject(error)
        })
    });
  }

  const fetchIntent = async function () {
    const authToken = localStorage.getItem('auth_token');
    return new Promise((resolve, reject) => {
      const setup_intent_response = axios.post(`https://api.mddentalstaffing.com/api/v1/intent`, {}, { headers: { Authorization: `Bearer ${authToken}` } }).then((res) => {
        setPaymentDialog(true);
        setClientSecret(res.data.setup_intent.client_secret);
        // setClientSecret(res.data.clientSecret); // For PaymentIntent PaymentElement
        setSetupIntent(res.data.setup_intent);
      }).catch((e) => {
        setError(e.message);
      });
    })
  }

  useEffect(() => {

    setIsLoading(true);
    const plan_id = localStorage.getItem("plan_id");
    const subscription_plan_id = localStorage.getItem("subscription_plan_id");

    if (!plan_id && !subscription_plan_id) {
      navigate(-1);
    }
    async function fetchData() {
      const response = await fetchPlan(plan_id, subscription_plan_id).then((res) => {
        if (!ignore) {
          setSubs(res);
          setSubPlan((...subPlan) => [...subPlan, res.subscription_plans[0]]);
          setSubPlanDuration(res.subscription_plans[0].cycle_type);
          setSubPlanPrice(res.subscription_plans[0].amount);
          setSubPlanCycle(res.subscription_plans[0].cycle);
          setIsLoading(false);
        }
      });

      const intent_response = await fetchIntent((res) => {
        setPaymentDialog(true);
        setClientSecret(res.data.setup_intent.client_secret);
        setSetupIntent(res.data.setup_intent);
      })
    };

    let ignore = false;
    fetchData();
    return () => {
      ignore = true;
    }

  }, []);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '2px',
      borderRadius: '4px',
      // See all possible variables below
    }
  };

  const handleComplete = (event) => {
  }

  const CardPlaceHolder = () => {
    return (
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    )
  }

  const PlanPlaceHolder = () => {
    return (
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    )
  }


  return (
    <>

      <Grid
        container
        spacing={1}
      // justifyContent="center"
      // alignItems="center"
      >
        <Grid item
          xs={12}
          md={9}
          sx={{
            display: {
              xs: 'flex',
              sm: 'flex',
            }
          }}
        >
          <Box
            sx={{
              p: 6,
            }}
          >
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Box >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <img src={logo} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                    </Grid>
                  </Grid>

                  <Divider sx={{
                    mt: 2,
                    mb: 2,
                    color: 'black',
                    borderColor: 'black'
                  }} />


                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      {isLoading ? (
                        <PlanPlaceHolder />
                      ) : (
                        <Box
                          className={`${subs.name === 'Elite Plan' ? 'elite-plan-col' : ''}`}
                          key={subs.id}
                          sx={{
                            backgroundColor: '#FAFAFA',
                            padding: '15px',
                            boxShadow: '0 4px 50px rgba(0,0,0,0.1)',
                            overflow: subs.name === 'Elite Plan' ? 'hidden' : 'visible',
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
                            {subs.name === 'Elite Plan' ? (
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

                            ) : (
                              <></>
                            )}


                            <Typography variant="h5" component="h5"
                            // sx={{
                            //   p: 1
                            // }}
                            >
                              {subs.name}{' '}
                            </Typography>

                            <p style={{ fontSize: '0.9rem', color: '#595959', width: '220px' }} >
                              {subs.features}
                            </p>
                            <Box
                              sx={{
                                mt: 2
                              }}
                            >
                              <p className='mb-0 text-lightgrey'>Starts at</p>
                              <span className='fw-semibold display-6'> {' '} $ {subPlanPrice}</span>
                              <span className='text-lightgrey fs-5 fw-semibold'>
                                /{subPlanDuration}
                              </span>
                            </Box>

                            <Box
                              sx={{ flexGrow: 1, mt: 0.5, p: 2 }}
                              className="hoverRadioNoBorder"
                            >
                              <Grid
                                container
                                spacing={1}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={3}
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <FormControl component="fieldset">
                                    <RadioGroup
                                    >
                                      <FormControlLabel
                                        control={<Radio color="primary" />}
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={9}
                                >
                                  <Box>
                                    <label
                                      className="text-start"
                                      htmlFor={`${plan.id}_${plan.plan_id}`}
                                    >
                                      {subPlanCycle} Month Plan
                                    </label>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>




                          </Box>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Box
                        sx={{
                          // backgroundColor: '#FAFAFA',
                          boxShadow: '0 4px 50px rgba(0,0,0,0.1)',
                          p: 2
                        }}
                      >
                        <Typography variant="h5" component="h5"
                        // sx={{
                        //   p: 1
                        // }}
                        >
                          Card Details
                        </Typography>

                        {!paymentDialog ? (
                          <CardPlaceHolder />
                        ) : (
                          <Elements
                            stripe={stripePromise}
                            options={{
                              clientSecret,
                              onComplete: handleComplete,
                              appearance: appearance
                            }}>
                            <CheckoutForm price={subPlanPrice} setup_intent={setupIntent} />
                          </Elements>
                        )}



                      </Box>
                    </Grid>
                  </Grid>



                </Box>

              </Grid>

            </Grid>
          </Box >
        </Grid >



        <Grid
          item
          md={3}
          xs={3}
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'block'
            }
          }}
        >
          <img
            style={{
              // width: '100%',
              // position: 'fixed',
              height: '100vh', position: 'fixed', width: '25%'
            }}
            src={shoulder}
          />
        </Grid>


      </Grid >







      {/* <Row
        style={{ width: '100vw', margin: '0' }}
        className='justify-content-between'
      >
        <Col className='p-0'>
          <Container className='mx-2 mx-md-5 my-2 my-md-4'>
            <img src={logo} />
            <div className='text-grey fs-2 my-4 fw-semibold'>
              Payment Card Detail
            </div>
            <div className='w-lg-75' style={{ width: '95%' }}>
              <hr />
              <Row className='justify-content-between mx-0 my-5'>
                <Col
                  className={`justify-content-center rounded mb-5 mt-2 py-4 px-3`}
                  style={{
                    overflow: 'hidden',
                    backgroundColor: '#FAFAFA',
                    flex: '0 0 35.5%', // Custom column width
                    maxWidth: '35.5%', // Custom column width
                    boxShadow: '0 4px 50px rgba(0,0,0,0.1)',
                  }}
                >
                  {isLoading ? (
                    <PlanPlaceHolder />
                  ) : (
                    <div style={{ backgroundColor: '#FAFAFA' }}>
                      <h4> {subs.name}</h4>
                      <p style={{ fontSize: '0.9rem', color: '#595959' }} className='w-75'>
                        {subs.features}
                      </p>
                      <br />
                      <p className='mb-0 text-lightgrey'>Starts at</p>
                      <span className='fw-semibold display-6'>
                        $ {subPlanPrice}
                      </span>
                      <span className='text-lightgrey fs-5 fw-semibold'>
                        /  {subPlanDuration}
                      </span>
                      <div
                        className="mt-3"
                        style={{
                          border: "none",
                          borderRadius: "0.5rem",
                          padding: "10px",
                        }}
                      >
                        <Grid
                          container
                          spacing={2}
                          className={"border border-2 rounded mb-3"}
                        >
                          <Grid item xs={1} className="p-3">
                            <FormControl component="fieldset">
                              <RadioGroup
                              >
                                <FormControlLabel
                                  control={<Radio color="primary" />}
                                />
                              </RadioGroup>
                            </FormControl>
                          </Grid>

                          <Grid className="d-flex ms-3 align-items-center" item xs={6}>
                            <div className="text-start">
                              <label
                                className="text-start"
                              >
                                {subPlanCycle} Month Plan
                                <br />{" "}
                                <span className="fw-semibold">0.00</span>
                              </label>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  )}
                </Col>

                <Col
                  className={`justify-content-center rounded mb-5 mt-2 py-4 px-3`}
                  style={{
                    overflow: 'hidden',
                    backgroundColor: '#FAFAFA',
                    flex: '0 0 60%', // Custom column width
                    maxWidth: '60%', // Custom column width
                    boxShadow: '0 4px 50px rgba(0,0,0,0.1)',
                  }}
                >
                  <div style={{ backgroundColor: '#FAFAFA' }}>
                    <Row className='ms-1 mb-4'>
                      <Col xs={12} md={6} className=""><h4> Card Details</h4></Col>
                    </Row>
                    {!paymentDialog ? (
                      <CardPlaceHolder />
                    ) : (
                      <Elements
                        stripe={stripePromise}
                        options={{
                          clientSecret,
                          onComplete: handleComplete,
                          appearance: appearance
                        }}>
                        <CheckoutForm price={subPlanPrice} setup_intent={setupIntent} />
                      </Elements>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </Col>
        <Col md={3} className='p-0 m-0 d-none d-md-flex justify-content-end'>
          <img
            style={{ height: '100vh', position: 'fixed', width: '25%' }}
            src={shoulder}
          />
        </Col>
      </Row > */}
    </>
  );
}
