import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
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
  RadioGroup,
  Switch,
  FormGroup
} from "@mui/material";
import { styled } from '@mui/material/styles';

import FilterIcon from '../../assets/icons/filter.svg';
import RefreshIcon from '../../assets/icons/arrow-clockwise.svg';

import { IconCalendarDue } from '@tabler/icons-react';
import { IconReload } from '@tabler/icons-react';
import { IconFilter } from '@tabler/icons-react';
import { IconCalendarEvent } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';

// project imports
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';
import CustomDataGrid from '../../ui-component/CustomDataGrid';


import TransactionDetailsModal from './TransactionDetailsModal';
import FiltersSidebar from './FiltersSidebar';
import axios from 'axios';
import moment from 'moment';


//Store
import { gridSpacing } from '../../store/constant';

const CusButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Transactions = () => {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFiltersSidebarOpen, setIsFiltersSidebarOpen] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [gridWidth, setGridWidth] = useState();
  const columns = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'posting', headerName: 'Posting', width: 150 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'professional', headerName: 'Professional', width: 150 },
    { field: 'payment_method', headerName: 'Payment Method', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 50 },
  ];


  const getTransaction = (page, limit) => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/owner/transactions?page=${page}&limit=${limit}`;
    axios.get(endpoint, {
      headers: {
        method: 'GET',
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then((response) => {
      setTransaction(response.data);
    }).catch((e) => console.log(e));
  };


  const rows = transaction?.data?.map((item) => {


    let posting_type = item.posting.posting_type.charAt(0).toUpperCase() + item.posting.posting_type.slice(1);
    let payment_method = item.payment_method.toUpperCase();
    return {
      id: item.id,
      date: moment(item.created_at).utc().format('MM/DD/YY hh:mm A'),
      type: posting_type,
      posting: item.posting.title,
      location: item.posting.post_location.place_name,
      professional: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <img
            src={
              item.candidate.avatar
                ? `https://api.mddentalstaffing.com/api/v1/assets/${item.candidate.avatar}`
                : item.candidate.profile_photo_path ? item.candidate.profile_photo_path : 'https://via.placeholder.com/150'
            }
            alt=''
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
            }}
          />
          <span
            style={{
              color: '#2561B0',
              fontWeight: 400,
              fontSize: '14px',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            {item.candidate.first_name} {item.candidate.last_name}
          </span>
        </div>
      ),
      payment_method: payment_method,
      status: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>{item.status}</span>
          <span
            style={{
              color: '#2561B0',
              fontWeight: 400,
              fontSize: '14px',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => {
              setSelectedItem(item);
              setDetailsModal(true);
            }}
          >
            Details
          </span>
        </div>
      ),
      amount: `$${item.amount / 100}`,
    };
  });


  useEffect(() => {
    getTransaction(1, 10);
  }, []);

  return (
    <>


      {/* <MainCard
        title="Management of Locations"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </MainCard> */}

      <MainCard
        title="Transactions"
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
                <Grid item xs={10} >


                </Grid>
                <Grid item xs={2} >

                  <CusButton
                    style={{
                      border: "1px solid #2561B0",
                      backgroundColor: theme.palette.background.defaultSideBar,
                      color: theme.palette.background.paper,
                    }}
                    onClick={() => setIsFiltersSidebarOpen(true)}
                  >
                    <IconFilter stroke={1} />
                  </CusButton>
                  <CusButton
                    style={{
                      border: "1px solid #2561B0",
                      color: theme.palette.background.defaultSideBar,
                      backgroundColor: theme.palette.background.paper,
                    }}
                    onClick={() => {
                      getTransaction(1, 10);
                    }}

                  >
                    <IconReload stroke={1} />
                  </CusButton>

                </Grid>
              </Grid>
            </Box>

            {transaction?.data && (
              <CustomDataGrid
                columns={columns}
                rows={rows}
                paging={transaction.paging}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                fetchData={() => {
                  getTransaction(1, 10);
                }}
              />
            )}

            {detailsModal && selectedItem && (
              <TransactionDetailsModal
                open={detailsModal}
                handleClose={() => setDetailsModal(false)}
                selectedItem={selectedItem}
                fetchData={() => {
                  getTransaction(1, 10);
                }}
              />
            )}

            {isFiltersSidebarOpen && (
              <FiltersSidebar
                isSidebarOpen={isFiltersSidebarOpen}
                setIsSidebarOpen={setIsFiltersSidebarOpen}
                setTransaction={setTransaction}
                gridWidth={gridWidth}
              />
            )}

          </Grid>
        </Grid>
      </MainCard>







    </>
  );
};

export default Transactions;
