
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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
  Card,
  Badge,
  Radio,
  RadioGroup
} from "@mui/material";
import { ErrorOutline } from '@mui/icons-material';

import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import Skeleton from '@mui/material/Skeleton';

import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import logo from '../assets/icons/Logo.svg';
import crown from '../assets/icons/Crown.svg';
import svgModal from '../assets/images/Dialog.png';
import hand from '../assets/images/handPhone.png';

import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { gridSpacing } from '../store/constant';

import AddCardForm from './CardForm/AddCardForm';




export default function CardForm({ open, handleClose, getBillingCards }) {

  const stripePromise = loadStripe("pk_test_51EsUJQCdRcJh67FUP7Ajf7V03zXzGxPs6TdzYsku2J8oQLgrSYImKhMrFWMAL2Z2K93XsMKl1Za4lPMaJoh1mZzn00ibjyh3x1");
  const [selectedValue, setSelectedValue] = useState('1_1');
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

  const fetchIntent = async function () {
    const authToken = localStorage.getItem('auth_token');
    return new Promise((resolve, reject) => {
      const setup_intent_response = axios.post(`https://api.mddentalstaffing.com/api/v1/owner/create-intent`, {},
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }).then((res) => {
          setPaymentDialog(true);
          setClientSecret(res.data.setup_intent.client_secret);
          setSetupIntent(res.data.setup_intent);
        }).catch((e) => {
          setError(e.message);
        });
    })
  }

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
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


  // useEffect(() => {
  //   getBillingCards();
  // }, [open]);

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


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 600,
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    gap: '20px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '6px',
  };

  return (

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <div
          className='d-flex'
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Card Details
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              cursor: 'pointer',
            }}
            onClick={handleClose}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              class='bi bi-x'
              viewBox='0 0 16 16'
            >
              <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
            </svg>
          </div>
        </div>


        <Box
          style={{ width: 'auto', margin: '0' }}
        >
          <Grid container spacing={gridSpacing}>

            <Grid item xs={12}>
              <div style={{ backgroundColor: '#FAFAFA' }}>
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
                    <AddCardForm handleClose={handleClose} getBillingCards={getBillingCards} setup_intent={setupIntent} />
                  </Elements>
                )}
              </div>
            </Grid>

          </Grid>
        </Box>

        {/* <Row
          style={{ width: 'auto', margin: '0' }}
          className='justify-content-between'
        >
          <Col className='p-0'>
            <Container className='mx-2 mx-md-5 my-2 my-md-4'>
              <div className='w-lg-75' style={{ width: '95%' }}>
                <hr />
                <Row className='justify-content-between mx-0 my-5'>
                  <Col
                  // className={`justify-content-center rounded mb-5 mt-2 py-4 px-3`}
                  // style={{
                  //   overflow: 'hidden',
                  //   backgroundColor: '#FAFAFA',
                  //   flex: '0 0 60%', // Custom column width
                  //   maxWidth: '60%', // Custom column width
                  //   boxShadow: '0 4px 50px rgba(0,0,0,0.1)',
                  // }}
                  >
                    <div style={{ backgroundColor: '#FAFAFA' }}>
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
                          <AddCardForm handleClose={handleClose} getBillingCards={getBillingCards} setup_intent={setupIntent} />
                        </Elements>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </Col>
        </Row > */}
      </Box>
    </Modal>
  );
}

