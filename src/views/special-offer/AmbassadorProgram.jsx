import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from 'moment';


import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  Menu,
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
  FormGroup,
  Paper,
  CardMedia
} from "@mui/material";

import {
  Tab,
  Tabs
} from '@mui/material';

import {
  TabContext,
  TabList,
  TabPanel
} from '@mui/lab';

import { styled } from '@mui/material/styles';



// project imports
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';
import CustomDataGrid from '../../ui-component/CustomDataGrid';

import program from '../../assets/images/program.png';
import SuccessModal from '../../ui-component/SuccessModal';
import ErrorModal from '../../ui-component/ErrorModal';
import ReferralModal from './ReferralModal';
import OwnerReferralModal from './OwnerReferralModal';


//Store
import { gridSpacing } from '../../store/constant';


const AmbassadorProgram = () => {
  const authToken = localStorage.getItem('auth_token');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const [value, setValue] = React.useState('1');
  const [isReferralModal, setIsReferralModal] = useState(false);
  const [isOwnerReferralModal, setIsOwnerReferralModal] = useState(false);
  const [referralSubmit, setReferralSubmit] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const local_storage_user = localStorage.getItem('user');
  const lo_user_ob = JSON.parse(local_storage_user);
  const [referrals, setReferrals] = useState([]);
  const [ownerReferrals, setOwnerReferrals] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getReferrals = (page, limit) => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/referral?page=${page}&limit=${limit}`;
    endpoint += `&referral_user_type=professional`;
    let header = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios.get(endpoint, header).then((res) => {
      setReferrals(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  const getOwnerReferrals = (page, limit) => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/referral?page=${page}&limit=${limit}`;
    endpoint += `&referral_user_type=owner`;
    let header = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios.get(endpoint, header).then((res) => {
      setOwnerReferrals(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  const columns = [
    { field: 'professional', headerName: 'Professional', width: 130 },
    { field: 'referral_date', headerName: 'Referred Date', width: 250 },
    { field: 'signupdate', headerName: 'SignUp Date', width: 150 },
    // { field: 'assignment_date', headerName: 'Assignment Date', width: 150 },
    { field: 'status', headerName: 'Total Rating', width: 150 }
  ];

  const rows = referrals?.data?.map((item, index) => {
    // let ref_date = moment.utc(item.created_at, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('DD-MM-YY hh:mm A');
    // let sign_date = moment.utc(item.created_at, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('DD-MM-YY hh:mm A');


    let ref_date = moment.utc(item.created_at, 'YYYYMMDD HH:mm:ss').format('DD-MM-YY hh:mm A');
    let sign_date = moment.utc(item.created_at, 'YYYYMMDD HH:mm:ss').format('DD-MM-YY hh:mm A');
    return {
      id: item.id,
      professional: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <img
            src={`https://api.mddentalstaffing.com/api/v1/assets/avatar`}
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
            onClick={() => {

            }}
          >
            {item.first_name}{' '}{item.last_name}
          </span>
        </div>
      ),
      referral_date: ref_date,
      signupdate: sign_date,
      status: item.status,
      ...item,
    };
  });


  const owners_rows = ownerReferrals?.data?.map((item, index) => {
    let ref_date = moment.utc(item.created_at, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('DD-MM-YY hh:mm A');
    let sign_date = moment.utc(item.created_at, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('DD-MM-YY hh:mm A');
    return {
      id: item.id,
      professional: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <img
            src={`https://api.mddentalstaffing.com/api/v1/assets/avatar`}
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
            onClick={() => {

            }}
          >
            {item.first_name}{' '}{item.last_name}
          </span>
        </div>
      ),
      referral_date: ref_date,
      signupdate: sign_date,
      status: item.status,
      ...item,
    };
  });

  useEffect(() => {
    getReferrals(1, 10);
    getOwnerReferrals(1, 10);
  }, []);

  return (

    <>
      <MainCard
        title=" Ambassador Program"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>

            <Box
              sx={{
                px: 3,
                pt: 2,
                pb: 1,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card>
                    {/* <CardMedia
                component="img"
                height="auto"
                image={program}
                alt="Special Offers"
              /> */}
                  </Card>
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                px: 3,
                pt: 2,
                pb: 1,
              }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Refer A Professional" value="1" />
                    <Tab label="Refer A Dental Practice" value="2" />
                  </TabList>
                </Box>
                <TabPanel
                  value="1"
                  style={{
                    padding: '2px',
                  }} >
                  <div
                    style={{
                      backgroundColor: '#F5F5F5',
                      padding: '10px',
                      borderBottom: '1px solid #D9D9D9',
                    }}
                  >
                    <div
                      style={{
                        // display: 'flex',
                        // gap: 20,
                        // alignItems: 'center',
                      }}
                    >
                      <Button
                        variant='outlined'
                        style={{
                          border: '1px solid #2561B0',
                          color: '#595959',
                          backgroundColor: '#fff',
                        }}
                        onClick={() => {
                          setIsReferralModal(true);
                        }}
                      >
                        Add Professional Refferral
                      </Button>

                    </div>
                  </div>
                  {referrals && referrals.data && (
                    <CustomDataGrid
                      columns={columns}
                      rows={rows}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      padding={5}
                      paging={referrals.paging}
                      fetchData={() => {
                        getReferrals(1, 10);
                      }}
                    />
                  )}

                </TabPanel>

                <TabPanel
                  value="2"
                  style={{
                    padding: '2px',
                  }} >
                  <div
                    style={{
                      backgroundColor: '#F5F5F5',
                      padding: '10px',
                      borderBottom: '1px solid #D9D9D9',
                    }}
                  >
                    <div
                      style={{
                        // display: 'flex',
                        // gap: 20,
                        // alignItems: 'center',
                      }}
                    >
                      <Button
                        variant='outlined'
                        style={{
                          border: '1px solid #2561B0',
                          color: '#595959',
                          backgroundColor: '#fff',
                        }}
                        onClick={() => {
                          setIsOwnerReferralModal(true);
                        }}
                      >
                        Add Owner Refferral
                      </Button>

                    </div>
                  </div>
                  {referrals && referrals.data && (
                    <CustomDataGrid
                      columns={columns}
                      rows={owners_rows}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      padding={5}
                      paging={ownerReferrals.paging}
                      fetchData={() => {
                        getReferrals(1, 10);
                      }}
                    />
                  )}

                </TabPanel>
              </TabContext>
            </Box>

            {isReferralModal && (
              <ReferralModal
                isOpen={isReferralModal}
                getReferrals={() => {
                  getReferrals(1, 10);
                }}
                onClose={() => setIsReferralModal(false)}
                successModal={() => setReferralSubmit(true)}
                errorModal={() => setOpenErrorModal(true)}
                setSuccessMessage={setSuccessMessage}
              />
            )}

            {isOwnerReferralModal && (
              <OwnerReferralModal
                isOpen={isOwnerReferralModal}
                getReferrals={() => {
                  getOwnerReferrals(1, 10);
                }}
                onClose={() => setIsOwnerReferralModal(false)}
                successModal={() => setReferralSubmit(true)}
                errorModal={() => setOpenErrorModal(true)}
                setSuccessMessage={setSuccessMessage}
              />
            )}

            {referralSubmit && (
              <SuccessModal
                open={referralSubmit}
                handleClose={() => setReferralSubmit(false)}
                successMessage={successMessage}
              />
            )}
            {openErrorModal && (
              <ErrorModal
                open={openErrorModal}
                handleClose={() => setOpenErrorModal(false)}
                errorMessage={'Something went wrong'}
              />
            )}

          </Grid>
        </Grid>
      </MainCard>

      {/* <Layout items={[{ link: "/owner/special/offer", name: "Special Offer / Ambassador Program" }]}>
      </Layout> */}
    </>
  );
};

export default AmbassadorProgram;
