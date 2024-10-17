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

import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';


import ErrorIcon from '@mui/icons-material/Error';
import { IconCalendarDue } from '@tabler/icons-react';
import { IconReload } from '@tabler/icons-react';
import { IconFilter } from '@tabler/icons-react';
import { IconCalendarEvent } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';

// project imports
import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import SecondaryAction from '../../../ui-component/cards/CardSecondaryAction';


import CustomDataGrid from '../../../ui-component/CustomDataGrid';
import ErrorModal from '../../../ui-component/ErrorModal';
import LoadingButton from '../../../ui-component/LoadingButton';
import ApplicantPopup from '../../../ui-component/ApplicantPopup';
import StarRating from '../../../ui-component/StarRating';
import MarkPostCompletedDialog from '../../../ui-component/MarkPostCompletedDialog';

import '../temporary-jobs/PostingApplicants.css';
import ApplicantNoShowModal from './ApplicantNoShowModal';
import ApproveApplicantDialog from './ApproveApplicantDialog';
import AddReviewModal from '../../booked-postings/currently-booked/AddReviewModal';
import ApplicantsFilterSidebar from '../permanent-jobs/ApplicantsFilterSidebar';

import { capitalizeFirstLetter } from '../../../utils/helper';
import { getStatusStyle } from '../../../utils/CustomDataGridStyle';

//Store
import { gridSpacing } from '../../../store/constant';

const CusButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const PostingApplicants = () => {
  const theme = useTheme();
  const [applicants, setApplicants] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [postingSchedule, setPostingSchedule] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [showFilteredApplicants, setShowFilteredApplicants] = useState(false);
  const [selectSpeciality, setSelectSpeciality] = useState([]);
  const [specialty, setSpecialty] = useState(null);
  const [desiredRate, setDesiredRate] = useState(null);
  const [selectRating, setSelectRating] = useState([]);
  const [selectStatus, setSelectStatus] = useState([]);
  const [posting, setPosting] = useState({});
  const [postingTimeZone, setPostingTimeZone] = useState(null);
  const [postingTimeZoneOffset, setPostingTimeZoneOffset] = useState(null);
  const [user, setUser] = useState(null);
  const [enableProposal, setEnableProposal] = useState(false);
  const [gridWidth, setGridWidth] = useState();
  const [isMarkPostCompletedDialogOpen, setIsMarkPostCompletedDialogOpen] = useState(false);
  const [openViewReview, setOpenViewReview] = useState(false);
  const [errorApproveDialog, setErrorApproveDialog] = useState(false);
  const [errorMessages, setErrorMessages] = useState('');

  const [loadingButtonArray, setLoadingButtonArray] = useState([]);
  const [declineloadingButtonArray, setDeclineLoadingButtonArray] = useState([]);

  const url = window.location.href;
  const scheduleId = url.split('/')[7];
  const postingId = url.split('/')[5];
  const authToken = localStorage.getItem('auth_token');
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    const handleResize = () => {
      setGridWidth(window.innerWidth < 800 ? true : false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line
  }, [window.innerWidth]);



  useEffect(() => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/postings/schedules/${scheduleId}`,
        {
          headers: {
            method: 'GET',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setPostingSchedule(res.data.data);
        setPostingTimeZone(res.data.data.posting.time_zone.time_zone);
        setPostingTimeZoneOffset(res.data.data.posting.time_zone.zone_name);
      })
      .catch((e) => console.log(e));
  }, [authToken, scheduleId, postingId]);



  const fetchData = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/applicants?posting_id=${postingId}&posting_schedule_id=${scheduleId}&page=${page}&limit=${limit}`,
        {
          headers: {
            method: 'GET',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setApplicants(res.data);
        var btn_array = [];
        res.data.data.map((row, index) => {
          btn_array.push(
            {
              loading: false,
              finished: false,
            }
          );
        });
        setLoadingButtonArray(btn_array);
        setDeclineLoadingButtonArray(btn_array);
      })
      .catch((e) => console.log(e));
  };

  const fetchFilterData = (page, limit) => {

    let endpoint = `https://api.mddentalstaffing.com/api/v1/owner/applicants?posting_id=${postingId}&posting_schedule_id=${scheduleId}&page=${page}&limit=${limit}`;


    if (selectStatus && selectStatus != '') {
      endpoint += `&applicant_status=${selectStatus}`;
    }

    if (specialty) {
      endpoint += `&specialty=${specialty}`;
    }

    if (selectRating && selectRating != '') {
      endpoint += `&score=${selectRating}`;
    }

    if (desiredRate && desiredRate != '') {
      endpoint += `&desired_rate=${desiredRate}`;
    }


    axios
      .get(endpoint, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((response) => {
        setApplicants(response.data);
        setShowFilter(false);
      })
      .catch((e) => {
        console.log(e);
        setShowFilter(false);
      });
  };

  const fetchPosting = () => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/postings/${postingId}`,
        {
          headers: {
            method: 'GET',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setPosting(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  const fetchUser = () => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/all-applicants/${postingId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setUser(res.data.data);
      });
  };

  useEffect(() => {
    fetchData(1, 10);
  }, [postingId]);


  useEffect(() => {
    if (selectedItem != null) {
      setEnableProposal(true);
    } else {
      setEnableProposal(false)
    }
  }, [selectedItem]);

  useEffect(() => {
    // console.log('postingSchedule === > ', postingTimeZone);
  }, [postingTimeZone]);

  useEffect(() => {
    fetchPosting();
    fetchUser();
  }, []);

  useEffect(() => {
    if (
      selectRating.length === 0 &&
      selectSpeciality.length === 0 &&
      selectStatus.length === 0
    ) {
      setShowFilteredApplicants(false);
    }
  }, [selectRating, selectSpeciality, selectStatus]);

  const handleFilter = () => {
    if (
      selectRating.length === 0 &&
      selectSpeciality.length === 0 &&
      selectStatus.length === 0
    ) {
      setShowFilteredApplicants(false);
      return;
    }

    const filteredApplicants = applicants?.data?.filter((applicant) => {
      if (
        selectRating.length > 0 &&
        selectSpeciality.length > 0 &&
        selectStatus.length > 0
      ) {
        return (
          selectSpeciality.includes(applicant.specialty) &&
          selectRating.includes(applicant.average_score) &&
          selectStatus.includes(applicant.status)
        );
      }
      if (selectRating.length > 0 && selectSpeciality.length > 0) {
        return (
          selectSpeciality.includes(applicant.specialty) &&
          selectRating.includes(applicant.average_score)
        );
      }
      if (selectRating.length > 0 && selectStatus.length > 0) {
        return (
          selectRating.includes(applicant.average_score) &&
          selectStatus.includes(applicant.status)
        );
      }
      if (selectSpeciality.length > 0 && selectStatus.length > 0) {
        return (
          selectSpeciality.includes(applicant.specialty) &&
          selectStatus.includes(applicant.status)
        );
      }
      if (selectRating.length > 0) {
        return selectRating.includes(applicant.average_score);
      }
      if (selectSpeciality.length > 0) {
        return selectSpeciality.includes(applicant.specialty);
      }
      if (selectStatus.length > 0) {
        return selectStatus.includes(applicant.status);
      }
      return false;
    });
    setFilteredApplicants(DynamicRows(filteredApplicants));
    setShowFilteredApplicants(true);
  };

  const closeFilterHandler = () => {
    setSelectRating([]);
    setSelectSpeciality([]);
    setSelectStatus([]);
    setSpecialty([]);
    setDesiredRate([]);
    fetchData(1, 10);
  };

  const [isApplicantDataOpen, setIsApplicantDataOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [openNoShowModal, setOpenNoShowModal] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApproveAction = () => {
    axios
      .put(
        `https://api.mddentalstaffing.com/api/v1/owner/applicants/${selectedItem.posting_applicants[0].id}/approved`,
        {
          posting_applicant_id: selectedItem.posting_applicants[0].id,
        },

        {
          headers: {
            method: 'PUT',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((res) => {
        fetchData(1, 10);
        setIsDialogOpen(false);
      })
      .catch((res) => {
        setErrorApproveDialog(true);
        setErrorMessages(res.response.data.message.description);
        setIsDialogOpen(false);
      });

  };

  const declineAction = (item, index) => {
    updateButtonChanged('decline', index, 'loading', true);
    axios.put(`https://api.mddentalstaffing.com/api/v1/owner/applicants/${item.posting_applicants[0].id}/decline`, {
      posting_applicant_id: item.posting_applicants[0].id,
    }, {
      headers: {
        method: 'PUT',
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }
    ).then((res) => {
      fetchData(1, 10);
      updateButtonChanged('decline', index, 'finished', true);
      setIsDialogOpen(false);
    }).catch((res) => {
      setErrorApproveDialog(true);
      setErrorMessages(res.response.data.message.description);
      setIsDialogOpen(false);
      updateButtonChanged('decline', index, 'finished', true);
    });
  };

  const reinviteAction = (item, index) => {
    updateButtonChanged('reinvite', index, 'loading', true);
    axios
      .put(
        `https://api.mddentalstaffing.com/api/v1/owner/applicants/${item.posting_applicants[0].id}/re-invite`,
        {
          posting_applicant_id: item.posting_applicants[0].id,
        },

        {
          headers: {
            method: 'PUT',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((res) => {
        fetchData(1, 10);
        setIsDialogOpen(false);
        updateButtonChanged('reinvite', index, 'finished', true);
      })
      .catch((res) => {
        setErrorApproveDialog(true);
        setErrorMessages(res.response.data.message.description);
        setIsDialogOpen(false);
        updateButtonChanged('reinvite', index, 'finished', true);
      });

  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  const handleApproveClick = () => {
    setIsDialogOpen(true);
  };

  const handleNameClick = (item) => {
    setSelectedApplicant(item);
    setIsApplicantDataOpen(true);
  };
  const handleApplicantDataClose = () => {
    setSelectedApplicant(null);
    setIsApplicantDataOpen(false);
  };

  const getCurrentLocationHourlyRate = (user_locations) => {
    let current_location = user_locations.find(location => location.is_current == true);
    return current_location ? current_location.desired_rate : 0.00;
  };


  const columns = [
    { field: 'applicant', headerName: 'Applicant', width: 150 },
    // { field: 'user_speciality', headerName: 'Specialty', width: 150 },
    { field: 'rate', headerName: 'Rate($)', width: 100 },
    {
      field: 'professional_score',
      headerName: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <span>Professional Scores</span>
          <ErrorIcon
            style={{
              color: '#595959',
              fontSize: '18px',
            }}
          />
        </div>
      ),
      width: 180,
    },
    {
      field: 'average_score',
      headerName: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <span>Average Score</span>
          <ErrorIcon
            style={{
              color: '#595959',
              fontSize: '18px',
            }}
          />
        </div>
      ),
      width: 180,
    },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'col1', headerName: 'Action', width: 150 },
  ];

  const DynamicRows = (data) => {
    const rows = data?.map((item, index) => {
      const statusStyle = getStatusStyle(
        item.posting_applicants[0].applicant_status.toLowerCase()
      );
      return {
        id: item.id,
        posting_applicants: item.posting_applicants,
        applicant: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <img
              src={`https://api.mddentalstaffing.com/api/v1/assets/${item.avatar}`}
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                cursor: 'pointer',
              }}
              onClick={() => handleNameClick(item)}
              alt=''
            />
            <p
              style={{
                fontSize: 14,
                color: '#2561B0',
                textDecoration: 'underline',
                paddingTop: '15px',
                cursor: 'pointer',
                margin: 0,
                padding: 0,
              }}
              onClick={() => {
                handleNameClick(item);
              }}
            >
              {item.first_name} {item.last_name}
            </p>
          </div>
        ),
        // user_speciality:
        //   item.user_sub_categories &&
        //   item.user_sub_categories.map((sub, index) => (
        //     <span key={sub.sub_category.id}>
        //       {sub.sub_category.name}
        //       {index < item.user_sub_categories.length - 1 ? ', ' : ''}
        //     </span>
        //   )),
        rate: getCurrentLocationHourlyRate(item.user_locations),
        // professional_score: <StarRating rating={item.professional_score} />,
        professional_score: <StarRating rating={item.professional_review[0] ? item.professional_review[0].professionalism : 0} />,
        average_score: <StarRating rating={item.average_score} />,
        status: (
          <span style={statusStyle ?? ''}>
            {capitalizeFirstLetter(
              item.posting_applicants[0].applicant_status
            )}
          </span>
        ),
        col1: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'left',
            }}
          >
            {item.posting_applicants[0].application_status === 'applied' ? (
              <>
                {item.proposal.length > 0 ? (
                  <></>
                ) : (

                  <LoadingButton
                    style={{
                      padding: '3px 12px',
                      borderRadius: '4px',
                      transition: 'background-color 0.3s',
                      color: '#fff',
                      backgroundColor: '#FA5A16',
                    }}
                    loading={loadingButtonArray[index].loading}
                    done={loadingButtonArray[index].finished}
                    onClick={(() => declineAction(item, index))}
                  >
                    Decline
                  </LoadingButton>

                  // <Button
                  //   style={{ backgroundColor: '#2561B0', border: 0 }}
                  //   onClick={(() => {
                  //     // setSelectedItem(item);
                  //     declineAction(item);
                  //   })}
                  // >
                  //   Decline
                  // </Button>
                )}
              </>
            ) : item.posting_applicants[0].application_status === 'job_offered' || item.posting_applicants[0].application_status === 'offer_accepted' ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'end',
                  gap: 15,
                }}
              >
                {item.posting_applicants[0].application_status === 'offer_accepted' ? ' ' : 'Waiting for Response'}
              </div>
            ) : item.posting_applicants[0].application_status === 'rejected' ? (
              <>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={8}>
                      {/* <Button
                        style={{ backgroundColor: '#2561B0', border: 0 }}
                        onClick={(() => {
                          reinviteAction(item, index);
                        })}
                      >
                        Re-Invite
                      </Button> */}

                      <LoadingButton
                        style={{

                          padding: '3px 12px',
                          borderRadius: '4px',
                          transition: 'background-color 0.3s',
                          color: '#fff',
                          backgroundColor: '#2561B0',
                          border: 0


                        }}

                        loading={declineloadingButtonArray[index].loading}
                        done={declineloadingButtonArray[index].finished}

                        onClick={(() => reinviteAction(item, index))}
                      >
                        Re-Invite
                      </LoadingButton>



                    </Grid>
                    <Grid item xs={4}>
                      <CancelOutlinedIcon
                        style={{ fontSize: '38px', paddingBottom: '2px' }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : item.posting_applicants[0].application_status === 'completed' ? (
              <>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={10}>
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
                        }}
                        onClick={() => {
                          setOpenViewReview(true);
                          setSelectedItem({ id: item?.id });
                          setPosting(item.posting_applicants[0].posting)
                          setUser(item);
                        }}
                      >
                        Review
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'end',
                  gap: 15,
                }}
              >
                {/* <Button
                  style={{
                    backgroundColor: '#2561B0',
                    border: 0,
                    height: '32px',
                    width: '84px',
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                  onClick={() => setOpenNoShowModal(true)}
                >
                  No Show
                </Button>
                <Button
                  style={{
                    backgroundColor: '#2561B0',
                    border: 0,
                    width: '64px',
                    height: '32px',
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                  onClick={() => {
                    setOpenViewReview(true);
                    setSelectedItem({ id: item?.id });
                    setUser(item);
                  }}
                >
                  Score
                </Button> */}

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
                  }}
                >
                  Mark Complete
                </Button>


              </div>
            )}
          </div >
        ),
      };
    });
    return rows;
  };
  const rows = DynamicRows(applicants?.data);


  const updateButtonChanged = (state, index, key, value) => {
    if (state == 'decline') {
      var updatedAreas = [...loadingButtonArray];
      updatedAreas[index][key] = value;
      setLoadingButtonArray(updatedAreas);
    }
    if (state == 'reinvite') {
      var updatedAreas = [...declineloadingButtonArray];
      updatedAreas[index][key] = value;
      setDeclineLoadingButtonArray(updatedAreas);
    }
  }


  return (
    <>

      <MainCard
        title="Posting Applicants"
        secondary={
          <SecondaryAction
            icon={<IconX />}
            title="cancel"
            link="/posting/temporary"
          />
        }
        avatar={
          <>
            {posting?.title}
          </>
        }
      >

        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            
            <div
              style={{
                opacity: showFilter ? 1 : 0,
                display: showFilter ? 'block' : 'none',
                transition: 'all 0.25s ease',
                zIndex: 151,
              }}
            >
              <ApplicantsFilterSidebar
                fetchFilterApplicants={() => {
                  fetchFilterData(1, 10);
                }}

                resetFilter={closeFilterHandler}

                isSidebarOpen={showFilter}
                setIsSidebarOpen={setShowFilter}

                selectRating={selectRating}
                setSelectRating={setSelectRating}

                selectSpeciality={selectSpeciality}
                setSelectSpeciality={setSelectSpeciality}


                selectStatus={selectStatus}
                setSelectStatus={setSelectStatus}

                specialty={specialty}
                setSpecialty={setSpecialty}

                desiredRate={desiredRate}
                setDesiredRate={setDesiredRate}
              />

            </div>





            {postingSchedule && (
              <>

                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={1} >

                    <Grid item xs={6} >


                      <Box sx={{ flexGrow: 2 }}>
                        <Grid
                          container
                          direction="row"
                          sx={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                          spacing={4}
                        >
                          <Grid item xs="auto">
                            <Typography variant="h6" gutterBottom>
                              Date
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              {postingSchedule && postingTimeZone && (
                                <>{moment.utc(postingSchedule.schedule_date, 'YYYYMMDD HH:mm:ss').format('MM-DD-YYYY')}</>
                              )}
                            </Typography>
                          </Grid>
                          <Grid item xs="auto">
                            <Typography variant="h6" gutterBottom>
                              Start Time
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              {postingSchedule && postingTimeZone && (
                                <>{moment.utc(postingSchedule.start_time, 'YYYYMMDD HH:mm:ss').format('hh:mm A')}</>
                              )}
                            </Typography>
                          </Grid>
                          <Grid item xs="auto">
                            <Typography variant="h6" gutterBottom>
                              End Time
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              {postingSchedule && postingTimeZone && (
                                <>{moment.utc(postingSchedule.end_time, 'YYYYMMDD HH:mm:ss').format('hh:mm A')}</>
                              )}
                            </Typography>
                          </Grid>
                          <Grid item xs="auto">
                            <Typography variant="h6" gutterBottom>
                              Time Zone
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              {postingTimeZoneOffset}
                            </Typography>
                          </Grid>
                          <Grid item xs="auto">
                            <Typography variant="h6" gutterBottom>
                              Location
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              {posting?.user_location?.place_name}
                            </Typography>
                          </Grid>

                        </Grid>
                      </Box>


                    </Grid>

                    <Grid item xs={6} >

                      <CusButton
                        style={{
                          border: enableProposal ? "1px solid #2561B0" : "1px solid #D9D9D9",
                          color: enableProposal ? "#595959" : "#BFBFBF",
                          backgroundColor: enableProposal ? "#fff" : "#F5F5F5",
                          display: `${gridWidth ? 'none' : ''}`
                        }}
                        onClick={() => {
                          navigate(`/posting/temporary/proposal/applicant/${selectedItem.id}/post/${postingId}/schedule/${scheduleId}`);
                        }}
                      >
                        <IconCalendarEvent stroke={1} /> Send/View Proposals
                      </CusButton>

                      <CusButton
                        style={{
                          backgroundColor: theme.palette.background.defaultSideBar,
                          color: theme.palette.background.paper,
                          border: 0,
                          borderRadius: 5,
                        }}
                        onClick={() =>
                          navigate(`/posting/temporary/${postingId}/calendar/`)
                        }
                      >
                        <IconCalendarEvent stroke={1} />
                        Job Calendar
                      </CusButton>

                      <CusButton
                        style={{
                          backgroundColor: theme.palette.background.defaultSideBar,
                          color: theme.palette.background.paper,
                          border: 0,
                          borderRadius: 5,
                        }}
                        onClick={() => setShowFilter(true)}
                      >
                        <IconFilter stroke={1} />
                      </CusButton>

                      <CusButton
                        onClick={() => {
                          fetchData(1, 10);
                          setSelectRating([]);
                          setSelectSpeciality([]);
                          setSelectStatus([]);
                          setShowFilteredApplicants(false);
                        }}
                        style={{
                          color: theme.palette.background.defaultSideBar,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: 5,
                          border: '1px solid #2561B0',
                        }}
                      >
                        <IconReload stroke={1} />
                      </CusButton>
                    </Grid>

                  </Grid>
                </Box>


              </>
            )}

            {showFilteredApplicants ? (
              <CustomDataGrid
                columns={columns}
                rows={filteredApplicants}
                paging={applicants.paging}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                fetchData={fetchData}
                postingSchedule={postingSchedule}
              />
            ) : (
              applicants &&
              applicants.data && (
                <CustomDataGrid
                  columns={columns}
                  rows={rows}
                  paging={applicants.paging}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  fetchData={fetchData}
                  postingSchedule={postingSchedule}
                />
              )
            )}>

            {selectedApplicant && (
              <ApplicantPopup
                isOpen={isApplicantDataOpen}
                onClose={handleApplicantDataClose}
                selectedApplicant={selectedApplicant}
              />
            )}

            {openNoShowModal && selectedItem && (
              <ApplicantNoShowModal
                isOpen={openNoShowModal}
                onClose={() => setOpenNoShowModal(false)}
                applicant={selectedItem}
                fetchData={fetchData}
                postingSchedule={postingSchedule}
              />
            )}

            {selectedItem && selectedItem.id && (
              <ApproveApplicantDialog
                isOpen={isDialogOpen}
                onClose={handleDialogClose}
                onApprove={handleApproveAction}
              />
            )}

            {openViewReview && (
              <AddReviewModal
                fetchData={() => {
                  fetchData(1, 10)
                }}
                handleClose={() => {
                  setOpenViewReview(false);
                  setSelectedItem({});
                }}
                open={openViewReview}
                user={user}
                postingId={postingId}
                posting={posting}
                selectedItem={selectedItem}
                isScore
              />
            )}

            {errorApproveDialog && (
              <ErrorModal
                open={errorApproveDialog}
                handleClose={() => setErrorApproveDialog(false)}
                errorMessage={errorMessages}
              />
            )}


            {isMarkPostCompletedDialogOpen && (
              <MarkPostCompletedDialog
                isOpen={isMarkPostCompletedDialogOpen}
                onClose={() => {
                  setIsMarkPostCompletedDialogOpen(false);
                  setSelectedItem(null);
                }}
                item={selectedItem}
                fetchData={() => {
                  fetchData(1, 10)
                }}
                type="owner"
              />
            )}

          </Grid>
        </Grid>
      </MainCard>
    </>
  );

  // return (
  //   <Layout
  //     items={[
  //       {
  //         name: 'Temporary Job',
  //         link: '/owner/postings/temporary',
  //       },
  //       {
  //         name: 'View Postings',
  //         link: `/owner/postings/temporary/${postingId}`,
  //       },
  //       {
  //         name: 'Posting Applicants',
  //         link: `/owner/postings/temporary/${postingId}/applicants/${scheduleId}`,
  //       },
  //     ]}
  //   >


  //   </Layout>
  // );
};

export default PostingApplicants;
