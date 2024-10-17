
import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import { Col, Row, Container } from "react-bootstrap";
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
  Box,
  Grid,
  Typography,
} from "@mui/material";

import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';
import { gridSpacing } from '../../store/constant';

import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';
import BillingDetailsFields from "./BillingDetailsFields";
import CheckoutError from "./CheckoutError";

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
  width: 590px;
  margin: 4px auto;
  // box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
  //   inset 0 1px 0 #829fff;
  border-radius: 4px;
  background-color: #7795f8;
  position: relative;
`;

const AddCardForm = ({
  handleClose,
  getBillingCards,
  setup_intent
}) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const authToken = localStorage.getItem('auth_token');
  const clientSecret = setup_intent.client_secret;


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
        setupIntent: setupIntent
      }

      axios.post(
        `https://api.mddentalstaffing.com/api/v1/owner/save-card`, plan,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }).then((res) => {
          getBillingCards();
          handleClose();
          console.log(res.data);
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
      <Grid container spacing={gridSpacing}>
        <form onSubmit={handleFormSubmit}>
          <Grid item xs={12}>
            <BillingDetailsFields />
          </Grid>

          <Grid item xs={12}>
            <Rows>
              <CardElementContainer>
                <CardElement
                  options={cardElementOpts}
                  onChange={handleCardDetailsChange}
                />
              </CardElementContainer>
            </Rows>
          </Grid>
          <Grid item xs={12}>
            <FormControl size="small" variant="outlined" className="w-100 mb-2">
              {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
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
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
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
              {isProcessing ? "Processing..." : `Save Card`}
            </Button>
          </Grid>
        </form>
      </Grid>
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
                onClick={handleClose}
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
                {isProcessing ? "Processing..." : `Save Card`}
              </button>
            </Col>
          </Row>
        </form>
      </Container > */}
    </>
  );
};


export default AddCardForm;
