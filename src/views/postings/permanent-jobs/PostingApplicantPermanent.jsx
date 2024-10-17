import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { useTheme } from '@mui/material';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';



import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { SignalWifiStatusbarNullRounded } from '@mui/icons-material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';


import { IconCalendarDue } from '@tabler/icons-react';
import { IconReload } from '@tabler/icons-react';
import { IconFilter } from '@tabler/icons-react';
import { IconCalendarEvent } from '@tabler/icons-react';


// project imports
import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import SecondaryAction from '../../../ui-component/cards/CardSecondaryAction';
import CustomDataGrid from '../../../ui-component/CustomDataGrid';


import '../temporary-jobs/PostingApplicants.css';

import ApplicantsDataGrid from './ApplicantsDataGrid';
import ApplicantsFilterSidebar from './ApplicantsFilterSidebar';
import InterviewDetailsModal from './interview-details/InterviewDetailsModal';
import ProfessionalProposedInterviewModal from './interview-details/ProfessionalProposedInterviewModal';


//Store
import { gridSpacing } from '../../../store/constant';


const CusButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const CusBox = styled(Box)(({ theme }) => ({
  // margin: theme.spacing(1),
}));


const PostingApplicantPermanent = () => {
  const [applicants, setApplicants] = useState(null);
  const [permanentJobs, setPermanentJobs] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [gridWidth, setGridWidth] = useState();

  const [showFilter, setShowFilter] = useState(false);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [selectSpeciality, setSelectSpeciality] = useState([]);

  const [selectRating, setSelectRating] = useState([]);
  const [selectStatus, setSelectStatus] = useState([]);
  const [specialty, setSpecialty] = useState(null);
  const [desiredRate, setDesiredRate] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [enableProposal, setEnableProposal] = useState(false);

  const [showFilteredApplicants, setShowFilteredApplicants] = useState(false);
  const [interviewDetailsOpen, setInterviewDetailsOpen] = useState(false);
  const [professionalProposedInterviewDetailsOpen, setProfessionalProposedInterviewDetailsOpen] = useState(false);




  const authToken = localStorage.getItem('auth_token');
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);

  const navigate = useNavigate();

  const fetchApplicants = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/applicants?posting_id=${id}&page=${page}&limit=${limit}`,
        {
          headers: {
            method: 'GET',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setApplicants(res.data);
        setSelectedItem(null);
      })
      .catch((e) => console.log(e));
  };

  const fetchFilterApplicants = (page, limit) => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/owner/applicants?posting_id=${id}&page=${page}&limit=${limit}`;

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
        setIsSidebarOpen(false);
      })
      .catch((e) => {
        console.log(e);
        setIsSidebarOpen(false);
      });
  };

  const fetchPosting = () => {
    axios
      .get(`https://api.mddentalstaffing.com/api/v1/owner/postings/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setPermanentJobs(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchApplicants(1, 10);
  }, []);

  useEffect(() => {
    fetchPosting();
  }, []);

  useEffect(() => {
    // console.log('selectedItem  === > ', selectedItem);
  }, [selectedItem]);


  useEffect(() => {
    // console.log('enableProposal  === > ', enableProposal);
  }, [enableProposal]);


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
    if (
      selectRating.length === 0 &&
      selectSpeciality.length === 0 &&
      selectStatus.length === 0
    ) {
      setShowFilteredApplicants(false);
    }
  }, [selectRating, selectSpeciality, selectStatus]);

  const columns = [
    { field: 'first_name', headerName: 'Applicant', width: 150 },
    // { field: 'user_location_id', headerName: 'Specialty', width: 150 },
    { field: 'posting_status', headerName: 'Rate($)', width: 150 },
    { field: 'end_date', headerName: 'Average Score', width: 150 },
    { field: 'applicants_count', headerName: 'Status', width: 200 },
    { field: 'applicants_count', headerName: 'Action', width: 300 },
    // { field: 'applicants_count', headerName: '', width: 150 },
  ];

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

    setFilteredApplicants(filteredApplicants);
    setShowFilteredApplicants(true);
  };

  const closeFilterHandler = () => {
    setSelectRating([]);
    setSelectSpeciality([]);
    setSelectStatus([]);
    setSpecialty(null);
    setDesiredRate(null);
    // setIsSidebarOpen(false);
    fetchApplicants(1, 10);
  };


  return (
    <>
      <MainCard
        darkTitle={permanentJobs?.data?.title}
        title="Postings Applicants"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>

            {permanentJobs && (
              // <div className='postingSchedule'>
              <>

                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={1} >
                    <Grid item xs={5} >


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
                              Start Date
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              {moment(permanentJobs?.data?.start_date).format('MM/DD/YYYY')}
                            </Typography>
                          </Grid>
                          <Grid item xs="auto">
                            <Typography variant="h6" gutterBottom>
                              Location
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              {permanentJobs?.data?.user_location?.place_name}
                            </Typography>
                          </Grid>

                        </Grid>
                      </Box>
                    </Grid>

                    <Grid item xs={7}>

                      <Grid
                        container
                        direction="row"
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Grid item xs={12} >
                          <CusButton
                            style={{
                              border: enableProposal ? "1px solid #2561B0" : "1px solid #D9D9D9",
                              color: enableProposal ? "#595959" : "#BFBFBF",
                              backgroundColor: enableProposal ? "#fff" : "#F5F5F5",
                              display: `${gridWidth ? 'none' : ''}`,
                              textTransform: 'capitalize',
                            }}
                            onClick={() => {
                              // navigate(`/owner/postings/permanent/proposal/applicant/${selectedItem.id}/post/${id}`);
                              navigate(`/posting/permanent/proposal/applicant/${selectedItem.id}/post/${id}`);
                            }}
                          >
                            <IconCalendarEvent stroke={1} />
                            Send/View Proposals
                          </CusButton>

                          <CusButton
                            style={{
                              border: selectedItem ? "1px solid #2561B0" : "1px solid #D9D9D9",
                              color: selectedItem ? "#595959" : "#BFBFBF",
                              backgroundColor: selectedItem ? "#fff" : "#F5F5F5",
                              textTransform: 'capitalize',
                              display: `${gridWidth ? 'none' : ''}`
                            }}
                            onClick={() => {
                              navigate(
                                `/posting/permanent/interview/details/${id}/applicants/${selectedItem.posting_applicants[0].id}/schedule`
                              );
                            }}
                          >

                            <IconCalendarEvent stroke={1} />
                            Interview Schedules
                          </CusButton>

                          <CusButton
                            style={{
                              backgroundColor: '#2561B0',
                              border: 0,
                              borderRadius: 5,
                              color: 'white',
                              textTransform: 'capitalize',
                            }}
                            onClick={() =>
                              navigate(`/posting/permanent/interview-calendar/${id}`)
                            }
                          >
                            <IconCalendarEvent stroke={1} />
                          </CusButton>

                          <CusButton
                            onClick={() => setIsSidebarOpen(true)}
                            style={{
                              backgroundColor: '#2561B0',
                              border: 0,
                              borderRadius: 5,
                              color: 'white',
                              textTransform: 'capitalize',
                            }}
                          >
                            <IconFilter stroke={1} />
                          </CusButton>

                          <CusButton
                            onClick={closeFilterHandler}
                            style={{
                              backgroundColor: '#fff',
                              color: '#595959',
                              borderRadius: 5,
                              border: '1px solid #2561B0',
                              textTransform: 'capitalize',
                            }}
                          >
                            <IconReload stroke={1} />
                          </CusButton>
                        </Grid>
                      </Grid>




                    </Grid>

                  </Grid>
                </Box>

                {/* <div
                  className='d-flex justify-content-between'
                  style={{
                    backgroundColor: '#F5F5F5',
                    padding: '12px 20px',
                    borderBottom: '1px solid #D9D9D9',
                  }}
                >

                  <div
                    className='d-flex'
                    style={{
                      gap: 60,
                    }}
                  >
                    <div>
                      <h6>Start Date</h6>
                      <p>
                        {moment(permanentJobs?.data?.start_date).format('MM/DD/YYYY')}
                      </p>
                    </div>
                    <div>
                      <h6>Location</h6>
                      <p>{permanentJobs?.data?.user_location?.place_name}</p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: 30,
                      alignItems: 'center',
                    }}
                  >

                  </div>
                </div> */}
              </>
            )}

            {showFilteredApplicants ? (
              <ApplicantsDataGrid
                columns={columns}
                rows={filteredApplicants}
                paging={applicants.paging}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                fetchApplicants={fetchApplicants}
                postingId={id}
                setEnableProposal={setEnableProposal}
                setInterviewDetailsOpen={setInterviewDetailsOpen}
              />
            ) : (
              applicants &&
              applicants.data && (
                <ApplicantsDataGrid
                  columns={columns}
                  rows={applicants.data}
                  paging={applicants.paging}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  fetchApplicants={fetchApplicants}
                  postingId={id}
                  setInterviewDetailsOpen={setInterviewDetailsOpen}
                  setProfessionalProposedInterviewDetailsOpen={setProfessionalProposedInterviewDetailsOpen}
                  setEnableProposal={setEnableProposal}
                />
              )
            )}

            {interviewDetailsOpen && selectedItem && (
              <InterviewDetailsModal
                fetchData={fetchApplicants}
                handleClose={() => setInterviewDetailsOpen(false)}
                open={interviewDetailsOpen}
                selectedItem={selectedItem}
                // key={selectedItem?.id}
                postingId={id}
              />
            )}

            {professionalProposedInterviewDetailsOpen && selectedItem && (
              <ProfessionalProposedInterviewModal
                isOpen={professionalProposedInterviewDetailsOpen}
                onClose={() => setProfessionalProposedInterviewDetailsOpen(false)}
                item={selectedItem}
                postingId={id}
              // posting={posting}
              // fetchData={fetchData}
              />
            )}


            {isSidebarOpen && (
              <ApplicantsFilterSidebar

                fetchFilterApplicants={() => {
                  fetchFilterApplicants(1, 10);
                }}

                resetFilter={closeFilterHandler}


                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}

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
            )}
          </Grid >
        </Grid >
      </MainCard >

    </>
  );

};

export default PostingApplicantPermanent;
