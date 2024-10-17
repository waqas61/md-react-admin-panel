import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';


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
import Paper from '@mui/material/Paper';

import { IconCalendarDue } from '@tabler/icons-react';
import { IconReload } from '@tabler/icons-react';
import { IconFilter } from '@tabler/icons-react';
import { IconCalendarEvent } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';

// project imports
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';

import FilterIcon from '../../assets/icons/filter.svg';
import RefreshIcon from '../../assets/icons/arrow-clockwise.svg';

import CustomDataGrid from '../../ui-component/CustomDataGrid';
import TransactionDetailsModal from './TransactionDetailsModal';
import FiltersSidebar from './FiltersSidebar';

//Store
import { gridSpacing } from '../../store/constant';

const CusButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Subscription = () => {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFiltersSidebarOpen, setIsFiltersSidebarOpen] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [transaction, setTransaction] = useState([]);

  const columns = [
    { field: 'start_at', headerName: 'Start Date', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'cycle_type', headerName: 'Cycle Type', width: 150 },
    { field: 'stripe_status', headerName: 'Stripe Status', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 50 },
    { field: 'action', headerName: 'Action', width: 50 },
  ];

  const getTransaction = (page, limit) => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/owner/subscriptions?page=${page}&limit=${limit}`;
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
    return {
      id: item.id,
      start_at: moment(item.start_at).utc().format('DD:MM:YY HH:MM A'),
      name: item.name,
      cycle_type: item.cycle_type,
      stripe_status: item.stripe_status,
      amount: item.amount,
      action: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
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
              console.log('Test', item);
            }}
          >
            Cancel Subscription
          </span>
        </div>

      ),
    };
  });


  useEffect(() => {
    getTransaction(1, 10);
  }, []);

  return (
    <MainCard
      title="Subscription"
      secondary={
        <SecondaryAction
          icon={<IconX />}
          title="cancel"
          link="/owner/Subscriptions"
        />
      }

    >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1} >

              <Grid item xs={6} >
              </Grid>

              <Grid item xs={6} >


                <CusButton
                  style={{
                    border: '1px solid #2561B0',
                    backgroundColor: theme.palette.background.defaultSideBar,
                    color: theme.palette.background.paper,
                  }}
                  onClick={() => setIsFiltersSidebarOpen(true)}
                >
                  <IconFilter stroke={1} />

                </CusButton>

                <CusButton
                  style={{
                    border: '1px solid #2561B0',
                    color: theme.palette.background.defaultSideBar,
                    backgroundColor: theme.palette.background.paper,
                  }}
                  onClick={() => getTransaction(1, 10)}
                >
                  <IconReload stroke={1} />
                </CusButton>


              </Grid>

            </Grid>
          </Box>

          {
            transaction?.data && (
              <CustomDataGrid
                columns={columns}
                rows={rows}
                paging={transaction.paging}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            )
          }


          {
            detailsModal && selectedItem && (
              <TransactionDetailsModal
                open={detailsModal}
                handleClose={() => setDetailsModal(false)}
                selectedItem={selectedItem}
                fetchData={() => { }}
              />
            )
          }

          {
            isFiltersSidebarOpen && (
              <FiltersSidebar
                isSidebarOpen={isFiltersSidebarOpen}
                setIsSidebarOpen={setIsFiltersSidebarOpen}
                setTransaction={setTransaction}
              />
            )
          }

        </Grid>
      </Grid>
    </MainCard >


  );
};

export default Subscription;
