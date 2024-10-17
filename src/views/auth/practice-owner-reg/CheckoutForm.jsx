
import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "@emotion/styled";
import axios from "axios";

import { useNavigate } from 'react-router-dom';

import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Autocomplete,
  TextField,
  Grid,
  Box
} from "@mui/material";

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography';

import { useDispatch } from 'react-redux';


import { setUser } from '../../../store/slices/userSlice';
import BillingDetailsFields from "./Card/BillingDetailsFields";
import CheckoutError from "./Card/CheckoutError";

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const Rows = styled.div`
  // width: 590px;
  // margin: 4px auto;
  // box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
  //   inset 0 1px 0 #829fff;
  border-radius: 4px;
  // background-color: #7795f8;
  background-color: #000000;
  position: relative;
  color:'white'
`;


const CheckoutForm = (props) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const authToken = localStorage.getItem('auth_token');
  const clientSecret = props.setup_intent.client_secret;

  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async ev => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value
      }
    };

    setProcessingTo(true);
    const cardElement = elements.getElement("card");

    try {

      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const { setupIntent, error } = await stripe.confirmCardSetup(
        clientSecret, {
        'payment_method': {
          card: elements.getElement(CardElement),
          billing_details: billingDetails
        }
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
      } else {
        console.log("setupIntent ==>", setupIntent);
      }

      let plan = {
        plan_id: localStorage.getItem("plan_id"),
        subscription_plan_id: localStorage.getItem("subscription_plan_id"),
        setupIntent: setupIntent
      }

      axios.post(
        `https://api.mddentalstaffing.com/api/v1/save-payment-method`, plan,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }).then((res) => {
          console.log(res.data.user);
          dispatch(setUser(res.data.user));
          localStorage.setItem('user', JSON.stringify(res.data.data));
          navigate('/registration/agreement');

        }).catch((e) => {
          console.log(e.message);
        });


    } catch (err) {
      console.log('err', err);
    }
  };

  const iframeStyles = {
    base: {
      color: "#fff",
      fontSize: "16px",
      iconColor: "#fff",
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE"
    },
    complete: {
      iconColor: "#cbf4c9"
    }
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <BillingDetailsFields />
            </Grid>
            <Grid item xs={12} md={12}>
              <Rows>
                <CardElementContainer>
                  <CardElement
                    options={cardElementOpts}
                    onChange={handleCardDetailsChange}
                  />
                </CardElementContainer>
              </Rows>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl size="small" variant="outlined" fullWidth>
                {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <Box >

                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      variant='contained'
                      style={{
                        height: '2.5rem',
                        borderRadius: '4px',
                        boxShadow: 'none',
                        color: '#2561B0',
                        textTransform: 'none',
                        border: '1px solid #2561B0',
                        cursor: 'pointer',
                        background: '#FFFFFF',
                      }}
                      color='primary'
                      sx={{
                        // borderRadius: '4px',
                        // boxShadow: 'none',
                        // background: '#2561B0',
                        // textTransform: 'none',
                      }}
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      type='submit'
                      variant='contained'
                      style={{
                        height: '2.5rem',
                        borderRadius: '4px',
                        boxShadow: 'none',
                        color: 'white',
                        textTransform: 'none',
                        border: '1px solid #2561B0',
                        cursor: 'pointer',
                        background: '#888ee3',
                      }}
                      color='primary'
                      sx={{
                        // borderRadius: '4px',
                        // boxShadow: 'none',
                        // background: '#2561B0',
                        // textTransform: 'none',
                      }}
                      disabled={isProcessing || !stripe}
                    >
                      {isProcessing ? "Processing..." : `Pay $${props.price}`}
                    </Button>
                  </Grid>

                </Grid>
              </Box>
            </Grid>

          </Grid>
        </Box>
      </form>
      {/* <Container>
        <form onSubmit={handleFormSubmit}>

          <Row >
            <BillingDetailsFields />
          </Row>
          <Row>
            <Rows>
              <Col>
                <CardElementContainer>
                  <CardElement
                    options={cardElementOpts}
                    onChange={handleCardDetailsChange}
                  />
                </CardElementContainer>
              </Col>
            </Rows>
          </Row>
          <Row>
            <Col>
              <FormControl size="small" variant="outlined" className="w-100 mb-2">
                {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
              </FormControl>
            </Col>
          </Row>
          <Row>
            <Col>
              <button
                type='button'
                className='custom-button'
                style={{
                  width: '100%',
                  height: '2.8rem',
                  margin: '20px auto',
                  borderRadius: '4px',
                  boxShadow: 'none',
                  color: '#2561B0',
                  textTransform: 'none',
                  border: '1px solid #2561B0',
                  cursor: 'pointer',
                  background: '#FFFFFF',
                }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </button>
            </Col>

            <Col>
              <button
                type='submit'
                className='custom-button'
                style={{
                  width: '100%',
                  height: '2.8rem',
                  margin: '20px auto',
                  borderRadius: '4px',
                  boxShadow: 'none',
                  color: 'white',
                  textTransform: 'none',
                  border: '1px solid #2561B0',
                  cursor: 'pointer',
                  background: '#888ee3',
                }}
                disabled={isProcessing || !stripe}
              >
                {isProcessing ? "Processing..." : `Pay $${props.price}`}
              </button>
            </Col>
          </Row>
        </form>
      </Container > */}
    </>
  );
};


export default CheckoutForm;
