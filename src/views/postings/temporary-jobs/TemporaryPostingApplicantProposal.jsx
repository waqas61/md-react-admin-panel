import React, { useEffect, useState } from 'react';
import { Grid, Button, Box } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { SignalWifiStatusbarNullRounded } from '@mui/icons-material';

import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SendProposalModal from './SendProposalModal';



import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';



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
import StarRating from '../../../ui-component/StarRating';
import SuccessModal from '../../../ui-component/SuccessModal';
import ErrorModal from '../../../ui-component/ErrorModal';

import ProposalsDataGrid from './ProposalsDataGrid';
import ProposalFilterSidebar from './ProposalFilterSidebar';
import CancelProposalModal from './CancelProposalModal';
import HiringProfessionalModal from './HiringProfessionalModal';
import '../temporary-jobs/PostingApplicants.css';

//Store
import { gridSpacing } from '../../../store/constant';


const CusButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));


const TemporaryPostingApplicantProposal = () => {
  const theme = useTheme();
  const [applicants, setApplicants] = useState(null);
  const [temporaryJobs, setTemporaryJobs] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [gridWidth, setGridWidth] = useState();

  const [showFilter, setShowFilter] = useState(false);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [hiringRate, setHiringRate] = useState([]);
  const [proposalDate, setProposalDate] = useState('');
  const [selectStatus, setSelectStatus] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [showFilteredApplicants, setShowFilteredApplicants] = useState(false);
  const [interviewDetailsOpen, setInterviewDetailsOpen] = useState(false);
  const [openFailModal, setOpenFailModal] = useState(false);


  const [userLocations, setUserLocations] = useState([]);
  const [userCurrentLocation, setUserCurrentLocation] = useState(null);
  const [applicant, setApplicant] = useState(null);
  const [proposalModal, setProposalModal] = useState(false);

  const [cancelProposalModal, setCancelProposalModal] = useState(false);
  const [hiringModal, setHiringModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [postingSchedule, setPostingSchedule] = useState([]);
  const authToken = localStorage.getItem('auth_token');
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);
  const scheduleId = url.substring(url.lastIndexOf('/') + 1);

  const [postingTimeZone, setPostingTimeZone] = useState(null);
  const [postingTimeZoneOffset, setPostingTimeZoneOffset] = useState(null);

  const navigate = useNavigate();
  const applicant_user = url.split('/')[7];
  const post = url.split('/')[9];


  const getSchedule = async () => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/postings/schedules/applied/post/${post}/applicant/${applicant_user}`,
        {
          headers: {
            method: 'GET',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setPostingSchedule(res.data.data);
        // setPostingTimeZone(res.data.data.posting.time_zone.time_zone);
        // setPostingTimeZoneOffset(res.data.data.posting.time_zone.zone_name);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getApplicant = async (selectedApplicant) => {
    axios
      .get(`https://api.mddentalstaffing.com/api/v1/owner/application-profile/${applicant_user}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((response) => {
        setApplicant(response.data.data);
        setUserLocations(response.data.data.user_locations);
        setUserCurrentLocation(() => {
          return response.data.data.user_locations.find(location => location.is_current == true);
        })
      });
  };

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

  const fetchPosting = () => {
    axios
      .get(`https://api.mddentalstaffing.com/api/v1/owner/postings/${post}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setTemporaryJobs(res.data);
        // setPostingTimeZone(res.data.data.posting.time_zone.time_zone);
        // setPostingTimeZoneOffset(res.data.data.posting.time_zone.zone_name);
      })
      .catch((e) => console.log(e));
  };

  const fetchProposal = (page, limit) => {

    let endpoint = `https://api.mddentalstaffing.com/api/v1/owner/proposals?posting_id=${post}&applicant=${applicant_user}&scheduleId=${scheduleId}&page=${page}&limit=${limit}`;

    if (selectStatus && selectStatus != null && selectStatus != '') {
      endpoint += `&proposal_status=${selectStatus}`;
    }

    if (hiringRate != null && hiringRate != '') {
      endpoint += `&hiringRate=${hiringRate}`;
    }

    if (proposalDate && proposalDate != null && proposalDate != '') {
      endpoint += `&from=${proposalDate}`;
    }



    axios
      .get(endpoint, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((response) => {
        setProposals(response.data);
      })
      .catch((e) => {
        console.log(e);
      });



  };

  useEffect(() => {
    // fetchApplicants(1, 10);
    fetchProposal(1, 10);
    getApplicant();
    fetchPosting();
    getSchedule();
  }, []);

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

  const columns = [
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'hiring_rate', headerName: 'Hiring Rate($/h)', width: 150 },
    // { field: 'rate', headerName: 'Rate($/h)', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'days', headerName: 'Days', width: 150 },
    { field: 'applicants_count', headerName: '', width: 150 },
  ];

  const closeFilterHandler = () => {
    setHiringRate([]);
    setSelectStatus([]);
    setProposalDate(null);
    fetchProposal(1, 10);
  };

  const cancelProposal = () => {
    if (selectedItem !== null) {
      axios.delete(
        `https://api.mddentalstaffing.com/api/v1/owner/proposals/${selectedItem.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      ).then((res) => {
        fetchProposal(1, 10);
        setCancelProposalModal(false);
      }).catch((e) => console.log(e));
    }
  };


  return (
    <>


      <MainCard
        title="Proposals"
        darkTitle={temporaryJobs?.data?.title}
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
                <Grid item xs={4}>
                  <Box sx={{
                    // px: 3,
                    // pt: 2,
                    pb: 1,
                    // width: 'auto',
                    // flexGrow: 1
                  }}>
                    <Grid item xs={8}>
                      <div
                        style={{
                          display: 'flex',
                          gap: 10,
                          alignItems: 'left',
                        }}
                      >
                        {applicant ? (
                          <Avatar alt="Remy Sharp"
                            src={`https://api.mddentalstaffing.com/api/v1/assets/${applicant?.avatar}`}
                            sx={{ width: 75, height: 75 }
                            }
                          />
                        ) : (
                          <AccountCircle style={{ fontSize: '75px' }} />
                        )}
                        <div>
                          <div>
                            <p>
                              {applicant?.first_name}{' '}
                              {applicant?.last_name}
                            </p>
                          </div>
                          <div>
                            <StarRating rating={applicant?.average_score ? applicant?.average_score : 0} />
                          </div>
                        </div>
                      </div >
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>


            {temporaryJobs && (
              <>

                <Box sx={{ flexGrow: 1, backgroundColor: '#F5F5F5', }}>
                  <Grid container spacing={1} justifyContent="flex-end" >

                    <Grid item xs={8} >
                      <CusButton
                        style={{
                          backgroundColor: theme.palette.background.defaultSideBar,
                          color: '#fff',
                          border: 0,
                          borderRadius: 5,
                        }}
                        onClick={() => setProposalModal(true)}
                      >
                        Send Proposal
                      </CusButton>

                      <CusButton
                        onClick={() => setCancelProposalModal(true)}
                        style={{
                          border: selectedItem ? "1px solid #2561B0" : "1px solid #D9D9D9",
                          color: selectedItem ? "#595959" : "#BFBFBF",
                          backgroundColor: selectedItem ? "#fff" : "#F5F5F5",
                          display: `${gridWidth ? 'none' : ''}`
                        }}

                      >
                        Cancel Proposal
                      </CusButton>

                      <CusButton
                        onClick={() => {
                          // console.log('slected Item click hire === > ', selectedItem.proposal_status);
                          setHiringModal(true);
                        }}
                        style={{
                          border: selectedItem?.proposal_status == 'accepted' ? "1px solid #2561B0" : "1px solid #D9D9D9",
                          color: selectedItem?.proposal_status == 'accepted' ? "#595959" : "#BFBFBF",
                          backgroundColor: selectedItem?.proposal_status == 'accepted' ? "#fff" : "#F5F5F5",
                          display: `${gridWidth ? 'none' : ''}`
                        }}
                      >
                        HIRE
                      </CusButton>
                    </Grid>


                    <Grid
                      item
                      xs={4}

                    >

                      <CusButton
                        onClick={() => setIsSidebarOpen(true)}
                        style={{
                          backgroundColor: theme.palette.background.defaultSideBar,
                          color: '#fff',
                          border: 0,
                          borderRadius: 5,
                        }}
                      >
                        <IconFilter stroke={1} />
                      </CusButton>

                      <CusButton
                        onClick={() => fetchProposal(1, 10)}
                        style={{
                          color: theme.palette.background.defaultSideBar,
                          backgroundColor: '#fff',
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

            {proposals && proposals.data && (
              <Box sx={{ flexGrow: 1, border: '1px solid #D9D9D9', mt: 2 }}>
                <ProposalsDataGrid
                  columns={columns}
                  // rows={applicants.data}
                  // rows={rowss}
                  rows={proposals.data}
                  paging={proposals.paging}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  fetchApplicants={fetchApplicants}
                  postingId={id}
                  setInterviewDetailsOpen={setInterviewDetailsOpen}
                />
              </Box>
            )}

            {isSidebarOpen && (
              <ProposalFilterSidebar
                fetchProposal={() => {
                  fetchProposal(1, 10);
                }}
                resetFilter={closeFilterHandler}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                hiringRate={hiringRate}
                setHiringRate={setHiringRate}
                selectStatus={selectStatus}
                setSelectStatus={setSelectStatus}
                proposalDate={proposalDate}
                setProposalDate={setProposalDate}
                gridWidth={gridWidth}
              />
            )}

            {proposalModal && (
              <SendProposalModal
                open={proposalModal}
                handleClose={() => setProposalModal(false)}
                fetchProposal={() => fetchProposal(1, 10)}
                applicant={applicant}
                userCurrentLocation={userCurrentLocation}
                permanentJob={temporaryJobs.data}
                postingSchedule={postingSchedule}
                setPostingSchedule={setPostingSchedule}
                successModal={() => setOpenSuccessModal(true)}
              />
            )}

            {openSuccessModal && (
              <SuccessModal
                open={openSuccessModal}
                handleClose={() => setOpenSuccessModal(false)}
                successMessage={successMessage}
              />
            )}

            {openErrorModal && (
              <ErrorModal
                open={openErrorModal}
                handleClose={() => setOpenErrorModal(false)}
                errorMessage={errorMessage}
              />
            )}

            {hiringModal && selectedItem && (
              <HiringProfessionalModal
                isOpen={hiringModal}
                onClose={() => setHiringModal(false)}
                item={selectedItem}
                setOpenSuccessModal={setOpenSuccessModal}
                setOpenErrorModal={setOpenErrorModal}
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
                fetchProposal={() => fetchProposal(1, 10)}
              />
            )}

            {cancelProposalModal && (
              <CancelProposalModal
                open={cancelProposalModal}
                handleClose={() => setCancelProposalModal(false)}
                selectedItem={selectedItem}
                cancelProposal={cancelProposal}
                fetchData={() => fetchApplicants(1, 10)}
              />
            )}

          </Grid>
        </Grid>
      </MainCard >
    </>
  );

  // return (
  //   <Layout
  //     items={[
  //       {
  //         name: 'Postings',
  //         link: '/',
  //       },
  //       {
  //         name: 'Temporary Job',
  //         link: '/owner/postings/temporary',
  //       },
  //       {
  //         name: 'Assignment Applicants',
  //         link: `/owner/postings/temporary/${post}/applicants/${id}`,
  //       },
  //     ]}
  //   >



  //   </Layout>
  // );
};

export default TemporaryPostingApplicantProposal;
