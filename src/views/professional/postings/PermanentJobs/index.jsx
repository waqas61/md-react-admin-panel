import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Button
} from '@mui/material';

import Stack from '@mui/material/Stack';
import { Alert } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ReceiptIcon from '@mui/icons-material/Receipt';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';


// project imports
import CalendarIcon from '../../../../assets/icons/calendar2.svg';
import FilterIcon from '../../../../assets/icons/filter.svg';
import RefreshIcon from '../../../../assets/icons/arrow-clockwise.svg';

import SubCard from '../../../../ui-component/cards/SubCard';
import MainCard from '../../../../ui-component/cards/MainCard';
import PanelCard from '../../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../../ui-component/cards/CardSecondaryAction';

import GreenSwitch from '../../../../ui-component/GreenSwitch';
import CustomDataGrid from '../../../../ui-component/CustomDataGrid';
import SuccessModal from '../../../../ui-component/SuccessModal';
import ErrorModal from '../../../../ui-component/ErrorModal';
import MapDirectionDialog from '../../../../ui-component/MapDirectionDialog';
import LoadingButton from '../../../../ui-component/LoadingButton';
import MarkPostCompletedDialog from '../../../../ui-component/MarkPostCompletedDialog';


import MyJobsDataGrid from './DataGrids/MyJobsDataGrid';
import AvailableJobsDataGrid from './DataGrids/AvailableJobsDataGrid';
import FiltersSidebar from './FiltersSidebar';
import AcceptOfferedJobModal from './AcceptOfferedJobModal';

import { getStatusStyle } from '../../../../utils/CustomDataGridStyle';
import { capitalizeFirstLetter } from '../../../../utils/helper';

import { gridSpacing } from '../../../../store/constant';
import { selectUser } from '../../../../store/slices/userSlice';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const ProfessionalPermanentJobs = () => {
  const user = useSelector(selectUser);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [activeTab, setActiveTab] = useState('availableJobs');
  const [availableJobs, setAvailableJobs] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [myJobs, setMyJobs] = useState([]);
  const [isFiltersSidebarOpen, setIsFiltersSidebarOpen] = useState(false);
  const [isMyJobsFiltersSidebarOpen, setIsMyJobsFiltersSidebarOpen] = useState(false);
  const [viewHiddenJobs, setViewHiddenJobs] = useState(0);
  const [isOfferAcceptModal, setIsOfferAcceptModal] = useState(false);
  const [postingTitle, setPostingTitle] = useState('');
  const [status, setStatus] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [postApplicantId, setPostApplicantId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openDirectionModal, setOpenDirectionModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isMarkPostCompletedDialogOpen, setIsMarkPostCompletedDialogOpen] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [acceptFinished, setAcceptFinished] = useState(false);
  const [loadingButtonArray, setLoadingButtonArray] = useState([]);
  const [value, setValue] = React.useState(0);

  const [userCurrentLocation, setUserCurrentLocation] = useState(() => {
    let user_current_location = [];
    user.user_locations?.map((location, index) => {
      if (location.is_current) {
        user_current_location.push(location);
      }
    });

    if (user_current_location.length > 0) {
      return {
        latitude: user_current_location[0].latitude,
        longitude: user_current_location[0].longitude,
        place_name: user_current_location[0].place_name
      };
    } else {
      return {
        latitude: null,
        longitude: null,
        place_name: null,
      };
    }
  });

  const [postLocation, setPostLocation] = useState({
    latitude: null,
    longitude: null,
    place_name: null
  });

  const [postLocationLatLng, setPostLocationsLatLng] = useState({
    latitude: null,
    longitude: null,
    place_name: null
  });

  const buttonStyle = {
    backgroundColor: isHovered ? '#b28900' : '#FFCF33',
    textTransform: 'none',
    padding: '7px 18px',
    color: '#262626',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  };

  const navigate = useNavigate();
  const authToken = localStorage.getItem('auth_token');

  useEffect(() => {
    getAvailableJobs(1, 10);
  }, [viewHiddenJobs]);

  useEffect(() => {
    getMyJobs(1, 10);
  }, []);

  useEffect(() => {
    console.log('selectedItem ==== > ', selectedItem);
  }, [selectedItem]);



  const getAvailableJobs = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/postings?posting_type=permanent&page=${page}&limit=${limit}&view_hidden=${viewHiddenJobs}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setAvailableJobs(res.data);
        var btn_array = [];
        res.data.data.map((row, index) => {
          btn_array.push({ loading: false, finished: false });
        });
        setLoadingButtonArray(btn_array);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMyJobs = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/postings?posting_type=permanent&page=${page}&limit=${limit}&my_jobs=1`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setMyJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilterAvailableJobs = () => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/postings?posting_type=permanent&page=1&limit=10`;

    if (postingTitle) {
      endpoint += `&title=${postingTitle}`;
    }

    if (location) {
      endpoint += `&location=${location}`;
    }

    if (filterStatus) {
      endpoint += `&posting_status=${filterStatus}`;
    }

    if (distance) {
      endpoint += `&distance=${distance}`;
    }

    axios
      .get(endpoint, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setAvailableJobs(res.data);
        setIsFiltersSidebarOpen(false);
      })
      .catch((e) => console.log(e));
  };

  const handleFilterMyJobs = () => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/postings?posting_type=temporary&page=1&limit=10&my_jobs=1`;

    if (postingTitle) {
      endpoint += `&title=${postingTitle}`;
    }

    if (location) {
      endpoint += `&location=${location}`;
    }

    if (filterStatus) {
      endpoint += `&posting_status=${filterStatus}`;
    }

    if (distance) {
      endpoint += `&distance=${distance}`;
    }

    axios
      .get(endpoint, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setMyJobs(res.data);
        setIsMyJobsFiltersSidebarOpen(false);
      })
      .catch((e) => console.log(e));
  };

  const handleHidePosting = (id) => {
    axios
      .put(
        `https://api.mddentalstaffing.com/api/v1/postings/${id}/hide`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then(() => {
        getAvailableJobs(1, 10);
      });
  };

  const handleApply = (id, index) => {
    // setAcceptLoading(true);
    updateButtonChanged('apply', index, 'loading', true);
    axios.post(`https://api.mddentalstaffing.com/api/v1/postings/${id}/apply`, {}, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((res) => {
      setOpenSuccessModal(true);
      // setAcceptFinished(true);
      updateButtonChanged('apply', index, 'finished', true);
      getAvailableJobs(1, 10);
    });
  };

  const declineAction = (id) => {
    setLoading(true);
    axios.put(`https://api.mddentalstaffing.com/api/v1/postings/applicants/${id}/modification`, {
      modify_status: 'rejected'
    }, {
      headers: {
        method: 'PUT',
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then((res) => {
      getAvailableJobs(1, 10);
      setFinished(true);
    }).catch((res) => {

    });
  };

  const rows = availableJobs?.data?.map((item, index) => {

    // if (item.applicant_status === 'completed' && item.posting_applicant == null) {
    //   return false;
    // }
    const statusStyle = getStatusStyle(item.applicant_status);
    return {
      id: item.id,
      posting: item.title,
      status: (
        <span style={statusStyle}>
          {capitalizeFirstLetter(item.applicant_status)}
        </span>
      ),
      // company_name: item.user.companies[0].name,
      company_name: item.company_name,
      location: item.user_location.place_name,
      start_date: item.start_date,
      distance: (
        <div>
          <Button
            variant="outlined"
            style={{ border: 0, color: 'black' }}
            onClick={() => {
              setPostLocation({
                place_name: item.user_location.place_name,
                latitude: item.user_location.latitude,
                longitude: item.user_location.longitude,
              });
              setPostLocationsLatLng({
                place_name: item.post_location_name,
                latitude: item.post_location_lat,
                longitude: item.post_location_lng,
              });
              setOpenDirectionModal(true);
            }}
          >
            <span
              style={{
                textDecoration: "underline",
              }}
            >
              ≈ {item.distance}
            </span>
            <LocationOnOutlinedIcon style={{ marginLeft: 5, color: "#FA5A16" }} />
          </Button>
        </div>
      ),
      // applicants_count: '-',
      // visible: (
      //   <div>
      //     {item.applicant_status === 'new' ? (
      //       <GreenSwitch
      //         checked={item.is_hidden === 1}
      //         label=''
      //         onChange={() => handleHidePosting(item.id)}
      //       />
      //     ) : (
      //       '.'
      //     )}
      //   </div>
      // ),
      col2: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
          }}
        >
          {item.applicant_status === 'new' ? (
            <Grid container >
              <Grid item xs={12}>
                <LoadingButton
                  loading={loadingButtonArray[index].loading}
                  done={loadingButtonArray[index].finished}
                  onClick={() => {
                    handleApply(item.id, index);
                  }}
                  style={{


                    // backgroundColor: '#2561B0',
                    // border: 0,
                    // color: 'white',
                    // width: '100%',
                    // textTransform: 'capitalize',
                    // borderRadius: '3px',
                    // padding: '3px 15px',

                    backgroundColor: '#2561B0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid #2561B0',
                    borderRadius: '3px',
                    color: 'white',
                    width: '100%',
                    fontSize: 'bold',
                    padding: '3px 15px',
                    fontSize: 'bold',
                    textTransform: 'capitalize',


                  }}
                >
                  Apply
                </LoadingButton>
              </Grid>
            </Grid>
          ) : item.applicant_status === 'updated' ? (
            <Button style={{ backgroundColor: '#2561B0', border: 0 }}>  View </Button>
          ) : item.applicant_status === 'interviewing_scheduled'
            || item.applicant_status === 'interviewing_failed'
            || item.applicant_status === 'interviewing_passed'
            // || item.applicant_status === 'hired'
            || item.applicant_status === 'applied'
            || item.applicant_status === 'interviewing'
            || item.applicant_status === 'proposal'
            || item.applicant_status === 'offer_accepted' ? (
            <>
              <Grid container spacing={1} >
                <Grid item xs={6}>
                  <Button
                    size="small"
                    variant='outline-primary'
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid #2561B0',
                      borderRadius: '3px',
                      color: '#2561B0',
                      width: '100%',
                      fontSize: 'bold',
                      padding: '3px 15px',
                      fontSize: 'bold',
                      textTransform: 'capitalize',
                    }}
                    onClick={() =>
                      navigate(`/professional/jobs/permanent/${item.id}/interviews`)
                    }
                  >
                    <i>{''}<ScheduleIcon style={{ fontSize: '18px', paddingBottom: '2px' }} />{''} </i>
                    Interview {item.is_interviewing > 0 ? '(' + item.is_interviewing + ')' : ''}
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    size="small"
                    variant='outline-primary'
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid #2561B0',
                      borderRadius: '3px',
                      color: '#2561B0',
                      width: '100%',
                      fontSize: 'bold',
                      padding: '3px 15px',
                      fontSize: 'bold',
                      textTransform: 'capitalize',
                    }}
                    onClick={() =>
                      navigate(`/professional/jobs/permanent/proposal/post/${item.id}`)
                    }
                  >
                    <i>{''}<ReceiptIcon style={{ fontSize: '18px', paddingBottom: '2px' }} />{''} </i>
                    Proposal {item.proposal.length > 0 ? '(' + item.proposal.length + ')' : ''}
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : item.applicant_status === 'job_offered'
            && item.applicant_status != 'offer_accepted'
            && item.applicant_status != 'rejected' ? (
            <>
              <Box >
                <Grid container spacing={2} >
                  <Grid item xs={6}>
                    <LoadingButton
                      color='primary'
                      variant='contained'
                      // size="small"
                      loading={loadingButtonArray[index].loading}
                      done={loadingButtonArray[index].finished}
                      onClick={() => {
                        handleSave(item.posting_applicant.id, index);
                      }}
                      style={{
                        backgroundColor: '#189ef3',
                        // border: 0,
                        color: 'white',
                        // textTransform: 'capitalize',


                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid #189ef3',
                        borderRadius: '3px',
                        width: '100%',
                        fontSize: 'bold',
                        padding: '3px 15px',
                        fontSize: 'bold',
                        textTransform: 'capitalize',

                      }}
                    >
                      Accept
                    </LoadingButton>
                  </Grid>
                  {item.applicant_status == 'job_offered' && (
                    <Grid item xs={6}>
                      <LoadingButton
                        color='primary'
                        variant='contained'
                        // size="small"
                        style={{
                          backgroundColor: '#4caf50',
                          // border: 0,
                          color: 'white',
                          // textTransform: 'capitalize',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '1px solid #4caf50',
                          borderRadius: '3px',
                          width: '100%',
                          fontSize: 'bold',
                          padding: '3px 15px',
                          fontSize: 'bold',
                          textTransform: 'capitalize'

                        }}

                        loading={loading}
                        done={finished}
                        onClick={(() => {
                          setSelectedItem(item);
                          declineAction(item.posting_applicant.id);
                        })}
                      >
                        Decline
                      </LoadingButton>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </>
          ) : item.applicant_status === 'hired' ? (
            <>
              <Button
                size="small"
                variant='outline-primary'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid #2561B0',
                  borderRadius: '3px',
                  color: '#2561B0',
                  width: '100%',
                  fontSize: 'bold',
                  padding: '3px 15px',
                  fontSize: 'bold',
                  textTransform: 'capitalize',
                }}
                onClick={() => {
                  setSelectedItem(item);
                  setIsMarkPostCompletedDialogOpen(true);
                  setPostApplicantId(item.posting_applicant.id);
                }}
              >
                Mark Complete
              </Button>


            </>
            // ) : item.applicant_status === 'completed' && item.posting_applicant != null ? (
          ) : item.applicant_status === 'completed' ? (
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Button
                    size="small"
                    variant='outline-primary'
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid #2561B0',
                      borderRadius: '3px',
                      color: '#2561B0',
                      width: '100%',
                      fontSize: 'bold',
                      padding: '3px 15px',
                      fontSize: 'bold',
                      textTransform: 'capitalize',
                    }}
                    onClick={() =>
                      navigate(`/professional/jobs/permanent/${item.id}`)
                    }
                  >
                    Job Details
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <>---</>
          )}
        </div>
      ),
      // ...item
    };
  });

  const myJobsRows = myJobs?.data?.map((item) => {
    const statusStyle = getStatusStyle(item.applicant_status);
    return {
      id: item.id,
      posting: item.title,
      status: (
        <span style={statusStyle}>
          {capitalizeFirstLetter(item.applicant_status)}
        </span>
      ),
      // company_name: item.user.companies[0].name,
      company_name: item.company_name,
      location: item.user_location.place_name,
      start_date: item.start_date,
      distance: (
        <div>
          <span
            style={{
              color: '#2561B0',
              textDecoration: 'underline',
            }}
          >
            {item.distance}
          </span>
          <LocationOnOutlinedIcon style={{ marginLeft: 5, color: '#FA5A16' }} />
        </div>
      ),
      applicants_count: '-',
      visible: (
        <div>
          {item.applicant_status === 'new' ? (
            <GreenSwitch
              checked={item.is_hidden === 1}
              label=''
              onChange={() => handleHidePosting(item.id)}
            />
          ) : (
            ''
          )}
        </div>
      ),
    };
  });


  const updateButtonChanged = (state, index, key, value) => {
    if (state == 'apply') {
      var updatedAreas = [...loadingButtonArray];
      updatedAreas[index][key] = value;
      setLoadingButtonArray(updatedAreas);
    }
  }

  const columns = [
    { field: 'posting', headerName: 'Posting', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'company_name', headerName: 'Company Name', width: 150 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'start_date', headerName: 'Start Date', width: 150 },
    { field: 'distance', headerName: 'Distance (mi)', width: 150 },
    // { field: 'applicants_count', headerName: 'Interviews', width: 100 },
    // { field: 'visible', headerName: 'Visible', width: 100 },
    { field: 'col2', headerName: 'Actions', width: 350 },
  ];

  const myJobsColumns = [
    { field: 'posting', headerName: 'Posting', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'company_name', headerName: 'Company Name', width: 150 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'start_date', headerName: 'Start Date', width: 150 },
    { field: 'distance', headerName: 'Distance (mi)', width: 150 },
    { field: 'applicants_count', headerName: 'Interviews', width: 100 },
  ];

  const resetFilter = () => {
    setPostingTitle('');
    setLocation('');
    setDistance('');
    setFilterStatus('');
    getAvailableJobs(1, 10);
    // setIsFiltersSidebarOpen(false);
  };

  const handleSave = async (id, index) => {
    updateButtonChanged('apply', index, 'loading', true);
    const API_BASE_URL = `https://api.mddentalstaffing.com/api/v1/postings/applicants/${id}/accept`;
    await axios.put(API_BASE_URL, {
      'posting_applicant_id': id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then((res) => {
      updateButtonChanged('apply', index, 'finished', true);
      getAvailableJobs(1, 10);
    }).catch((err) => {
      updateButtonChanged('apply', index, 'finished', true);
      getAvailableJobs(1, 10);
    });
  };

  const handleChange = (event, newValue) => {
    console.log('newValue ==== > ', newValue);
    setValue(newValue);
  };

  return (
    <>
      <MainCard
        title="Permanent Jobs"
        darkTitle="Manage My Permanent Jobs"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>

            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Item One" {...a11yProps(0)} />
                  <Tab label="Item Two" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <Grid
                sx={{
                  px: 3,
                  pt: 2,
                  pb: 1,
                  width: 'auto',
                }}
              >

                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert
                    severity='error'
                    style={{
                      color: 'red',
                      backgroundColor: 'rgb(250, 238, 222)',
                    }}
                  >
                    <span style={{ fontWeight: 'bold' }}> Important </span>
                    If you want to see more jobs, please go back to your profile and update your availability.
                  </Alert>
                </Stack>
              </Grid>
              <CustomTabPanel value={value} index={0}>
                <div
                  className='d-flex justify-content-between'
                  style={{
                    backgroundColor: '#F5F5F5',
                    padding: '12px 20px',
                    borderBottom: '1px solid #D9D9D9',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: 20,
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      variant='outlined'
                      style={{
                        border:
                          selectedItem !== null
                            ? '1px solid #2561B0'
                            : '1px solid #D9D9D9',
                        color: selectedItem !== null ? '#595959' : '#BFBFBF',
                        backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                        textTransform: 'capitalize',
                        borderRadius: '3px',
                        padding: '6px 15px',
                      }}
                      onClick={() =>
                        navigate(`/professional/jobs/permanent/${selectedItem.id}`)
                      }
                    >
                      Job Details
                    </Button>
                    <Button
                      variant='outlined'
                      style={{
                        border:
                          selectedItem !== null
                            ? '1px solid #2561B0'
                            : '1px solid #D9D9D9',
                        color: selectedItem !== null ? '#595959' : '#BFBFBF',
                        backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                        textTransform: 'capitalize',
                        borderRadius: '3px',
                        padding: '6px 15px',
                      }}
                      onClick={() =>
                        navigate(`/professional/jobs/permanent/proposal/post/${selectedItem.id}`)
                      }
                    >
                      <i>{''}<ReceiptIcon style={{ fontSize: '18px', paddingBottom: '2px' }} />{''} </i>
                      Proposal
                      {selectedItem && selectedItem?.proposal?.length > 0 ? '(-)' : ''}
                    </Button>
                    <Button
                      variant='outlined'
                      style={{
                        border:
                          selectedItem !== null
                            ? '1px solid #2561B0'
                            : '1px solid #D9D9D9',
                        color: selectedItem !== null ? '#595959' : '#BFBFBF',
                        backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                        textTransform: 'capitalize',
                        borderRadius: '3px',
                        padding: '6px 15px',
                      }}
                      onClick={() =>

                        navigate(`/professional/jobs/permanent/${selectedItem.id}/interviews`)
                      }
                    >
                      <i>{''}<ScheduleIcon style={{ fontSize: '18px', paddingBottom: '2px' }} />{''} </i>
                      Interview
                      {selectedItem != null && selectedItem?.interview?.length > 0 ? '(-)' : ''}
                    </Button>
                    <Button
                      variant='outlined'
                      style={{
                        border:
                          selectedItem !== null
                            ? '1px solid #2561B0'
                            : '1px solid #D9D9D9',
                        color: selectedItem !== null ? '#595959' : '#BFBFBF',
                        backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                        textTransform: 'capitalize',
                        borderRadius: '3px',
                        padding: '6px 15px',
                      }}
                      disabled={selectedItem === null}
                      onClick={() => setSelectedItem(null)}
                    >
                      Cancel
                    </Button>

                    <div
                      style={{
                        borderLeft: '1px solid #D9D9D9',
                        height: '100%',
                      }}
                    ></div>
                    <div
                      className='d-flex'
                      style={{
                        gap: 20,
                        alignItems: 'center',
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                        }}
                      >
                        View All Hidden Jobs
                      </p>
                      <GreenSwitch
                        onChange={() => setViewHiddenJobs(viewHiddenJobs === 0 ? 1 : 0)}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 20,
                    }}
                  >
                    <Button
                      style={{
                        border: '1px solid #2561B0',
                        color: '#fff',
                        backgroundColor: '#2561B0',
                        borderRadius: '3px',
                        padding: '3px 15px',
                      }}
                      onClick={() => navigate('/professional/jobs/calendar')}
                    >
                      <img src={CalendarIcon} alt='' />
                    </Button>
                    <div
                      style={{
                        borderLeft: '1px solid #D9D9D9',
                        height: '100%',
                      }}
                    ></div>
                    <Button
                      style={{
                        border: '1px solid #2561B0',
                        color: '#595959',
                        backgroundColor: '#2561B0',
                        borderRadius: '3px',
                        padding: '3px 15px',
                      }}
                      onClick={() => setIsFiltersSidebarOpen(true)}
                    >
                      <img src={FilterIcon} alt='' />
                    </Button>
                    <Button
                      style={{
                        border: '1px solid #2561B0',
                        color: '#595959',
                        backgroundColor: '#fff',
                      }}
                      onClick={() => getAvailableJobs(1, 10)}
                    >
                      <img src={RefreshIcon} alt='' />
                    </Button>
                  </div>
                </div>
                {availableJobs && availableJobs.data && (
                  <CustomDataGrid
                    rows={rows}
                    columns={columns}
                    paging={availableJobs?.paging}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    fetchData={getAvailableJobs}
                  />
                )}
              </CustomTabPanel>

              <CustomTabPanel value={value} index={1}>
                <div
                  className='d-flex justify-content-between'
                  style={{
                    backgroundColor: '#F5F5F5',
                    padding: '12px 20px',
                    borderBottom: '1px solid #D9D9D9',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: 20,
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      variant='text'
                      style={buttonStyle}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <QrCodeScannerRoundedIcon
                        sx={{ mx: 0.5 }}
                        style={{ fontSize: '1.2rem' }}
                      />{' '}
                      Check In
                    </Button>
                    <Button
                      variant='outlined'
                      style={{
                        border:
                          selectedItem !== null
                            ? '1px solid #2561B0'
                            : '1px solid #D9D9D9',
                        color: selectedItem !== null ? '#595959' : '#BFBFBF',
                        backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                      }}
                      onClick={() =>
                        navigate(`/professional/jobs/temporary/${selectedItem.id}`)
                      }
                    >
                      View Job
                    </Button>
                    <Button
                      variant='outlined'
                      style={{
                        border:
                          selectedItem !== null
                            ? '1px solid #2561B0'
                            : '1px solid #D9D9D9',
                        color: selectedItem !== null ? '#595959' : '#BFBFBF',
                        backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                      }}
                      disabled={selectedItem === null}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 20,
                    }}
                  >
                    <Button
                      style={{
                        border: '1px solid #2561B0',
                        color: '#fff',
                        backgroundColor: '#2561B0',
                      }}
                      onClick={() => navigate('/professional/jobs/calendar')}
                    >
                      <img src={CalendarIcon} alt='' />
                      <span
                        style={{
                          marginLeft: 5,
                          color: '#fff',
                        }}
                      >
                        Job Calendar
                      </span>
                    </Button>
                    <Button
                      style={{
                        border: '1px solid #2561B0',
                        color: '#595959',
                        backgroundColor: '#2561B0',
                      }}
                      onClick={() => setIsMyJobsFiltersSidebarOpen(true)}
                    >
                      <img src={FilterIcon} alt='' />
                      <span
                        style={{
                          marginLeft: 5,
                          color: '#fff',
                        }}
                      >
                        Filters
                      </span>
                    </Button>
                    <Button
                      style={{
                        border: '1px solid #2561B0',
                        color: '#595959',
                        backgroundColor: '#fff',
                      }}
                      onClick={() => getMyJobs(1, 10)}
                    >
                      <img src={RefreshIcon} alt='' />
                      <span
                        style={{
                          marginLeft: 5,
                          color: '#2561B0',
                        }}
                      >
                        Reset Filters
                      </span>
                    </Button>
                  </div>
                </div>
                {myJobs && myJobs.data && (
                  <CustomDataGrid
                    rows={myJobsRows}
                    columns={myJobsColumns}
                    paging={myJobs?.paging}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    fetchData={getMyJobs}
                  />
                )}
              </CustomTabPanel>

            </Box>
            {
              isFiltersSidebarOpen && (
                <FiltersSidebar
                  isSidebarOpen={isFiltersSidebarOpen}
                  setIsSidebarOpen={setIsFiltersSidebarOpen}
                  handleFilterData={handleFilterAvailableJobs}
                  postingTitle={postingTitle}
                  setPostingTitle={setPostingTitle}
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                  location={location}
                  setLocation={setLocation}
                  distance={distance}
                  setDistance={setDistance}
                  resetFilter={resetFilter}
                />
              )
            }

            {
              isMyJobsFiltersSidebarOpen && (
                <FiltersSidebar
                  isSidebarOpen={isMyJobsFiltersSidebarOpen}
                  setIsSidebarOpen={setIsMyJobsFiltersSidebarOpen}
                  handleFilterData={handleFilterMyJobs}
                  postingTitle={postingTitle}
                  setPostingTitle={setPostingTitle}
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                  location={location}
                  setLocation={setLocation}
                  distance={distance}
                  setDistance={setDistance}
                  resetFilter={resetFilter}
                />
              )
            }


            {
              openDirectionModal && (
                <MapDirectionDialog
                  openState={openDirectionModal}
                  userCurrentLocation={userCurrentLocation}
                  postLocation={postLocation}
                  postLocationLatLng={postLocationLatLng}
                  handleCloseFunction={() => {
                    setOpenDirectionModal(false);
                  }}
                />
              )
            }


            {
              openSuccessModal && (
                <SuccessModal
                  open={openSuccessModal}
                  handleClose={() => setOpenSuccessModal(false)}
                  successMessage={successMessage}
                />
              )
            }


            {
              openErrorModal && (
                <ErrorModal
                  open={openErrorModal}
                  handleClose={() => setOpenErrorModal(false)}
                  errorMessage={'Something went wrong'}
                />
              )
            }


            {
              isOfferAcceptModal && (
                <AcceptOfferedJobModal
                  isOpen={isOfferAcceptModal}
                  onClose={() => setIsOfferAcceptModal(false)}
                  fetchData={() => {
                    getAvailableJobs(1, 10);
                  }}
                  selectedItem={selectedItem}
                  successModal={() => setOpenSuccessModal(true)}
                  errorModal={() => setOpenErrorModal(true)}
                  setSuccessMessage={setSuccessMessage}
                />
              )
            }

            {
              isMarkPostCompletedDialogOpen && (
                <MarkPostCompletedDialog
                  isOpen={isMarkPostCompletedDialogOpen}
                  onClose={() => {
                    setIsMarkPostCompletedDialogOpen(false);
                    setSelectedItem(null);

                  }}
                  item={postApplicantId}
                  fetchData={() => {
                    getAvailableJobs(1, 10)
                  }}
                />
              )
            }
          </Grid>
        </Grid>
      </MainCard >
    </>
  );

};

export default ProfessionalPermanentJobs;
