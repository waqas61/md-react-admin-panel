
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import moment from 'moment';

import Stack from '@mui/material/Stack';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';

import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';


import { IconCalendarDue } from '@tabler/icons-react';
import { IconReload } from '@tabler/icons-react';
import { IconFilter } from '@tabler/icons-react';
import { IconCalendarEvent } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';


import { selectUser, setUser } from '../../store/slices/userSlice';


// project imports
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';
import CustomDataGrid from '../../ui-component/CustomDataGrid';
import CardForm from '../../ui-component/CardForm';
import PaymentMethodModal from '../../ui-component/PaymentMethodModal';


import { Person2Outlined } from '@mui/icons-material';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import RefreshIcon from "../../assets/icons/arrow-clockwise.svg";


import { gridSpacing } from '../../store/constant';

const CusButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const CusBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
}));


const Billing = () => {
  const theme = useTheme();
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [billingCards, setBillingCards] = useState([]);
  const [defualtCard, setDefualtCard] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [paymentFormModal, setPaymentFormModal] = useState(false);

  const [defualtPaymentMethodModal, setDefualtPaymentMethodModal] = useState(false);

  const buttonStyle = {
    backgroundColor: isHovered ? '#b28900' : '#FFCF33',
    textTransform: 'none',
    padding: '7px 18px',
    color: '#262626',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  };

  const getBillingCards = async () => {
    axios.get(
      `https://api.mddentalstaffing.com/api/v1/owner/billing-cards`,
      {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    )
      .then((res) => {
        setBillingCards(res.data.data.cards);
        setDefualtCard(res.data.data.default_payment_method);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getBillingCards();
  }, []);


  useEffect(() => {
    console.log('billingCards ==== > ', billingCards);
  }, [billingCards]);


  const columns = [
    { field: 'Card', headerName: 'Card', width: 200 },
    { field: 'LAST_Number', headerName: 'Last Number', width: 200 },
    { field: 'Expire', headerName: 'Expire', width: 150 },
    { field: 'Action', headerName: 'Defualt', width: 150 },
  ];



  const cards = billingCards?.map((item) => {
    return {
      id: item.id,
      Card: item.card.display_brand.toUpperCase(),
      Expire: item.card.exp_month + '/' + item.card.exp_year,
      LAST_Number: `••••••••••••••••${item.card.last4}`,
      Action: (
        <>
          <FormControlLabel
            value='Defualt'
            checked={item.id == defualtCard?.id ? true : false}
            onChange={() => {
              setDefualtPaymentMethodModal(true);
              setSelectedItem(item);
            }}
            control={<Radio />}
            label='Defualt Card'
          />
        </>
      ),
      ...item,
    };
  });


  useEffect(() => {
    console.log('billingCards === > ', billingCards);
  }, [billingCards]);

  return (

    <MainCard
      title="Billings Cards"
      secondary={
        <SecondaryAction
          icon={<IconX />}
          title="cancel"
          link="/posting/temporary"
        />
      }
    >

      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1} >
              <Grid item xs={11} >
                <CusButton
                  variant='text'
                  style={buttonStyle}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => {
                    console.log("Punjab");
                    setPaymentFormModal(true);
                  }}

                >
                  <QrCodeScannerRoundedIcon
                    sx={{ mx: 0.5 }}
                    style={{ fontSize: '1.2rem' }}
                  />{' '}
                  Add New Payment Card
                </CusButton>
              </Grid>
              <Grid item xs={1} >


                <CusButton
                  style={{
                    border: "1px solid #2561B0",
                    color: theme.palette.background.defaultSideBar,
                    backgroundColor: theme.palette.background.paper,
                  }}
                  onClick={() => getBillingCards()}

                >
                  <IconReload stroke={1} />
                </CusButton>

              </Grid>
            </Grid>
          </Box>
          <div>
            {billingCards && (
              <CustomDataGrid
                rows={cards}
                columns={columns}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            )}
          </div>

          {defualtPaymentMethodModal && (
            <PaymentMethodModal
              open={defualtPaymentMethodModal}
              handleClose={() => setDefualtPaymentMethodModal(false)}
              selectedItem={selectedItem}
              fetchData={() => getBillingCards()}
            />
          )}

          {paymentFormModal && (
            <CardForm
              open={paymentFormModal}
              handleClose={() => setPaymentFormModal(false)}
              getBillingCards={() => getBillingCards()}
            />
          )}

        </Grid>
      </Grid>

    </MainCard>
  );
};

export default Billing;
