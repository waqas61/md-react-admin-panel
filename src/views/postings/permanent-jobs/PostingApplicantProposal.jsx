import React, { useEffect, useState } from 'react';
import axios from 'axios';

import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';
import { SignalWifiStatusbarNullRounded } from '@mui/icons-material';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';



import { IconCalendarDue } from '@tabler/icons-react';
import { IconReload } from '@tabler/icons-react';
import { IconFilter } from '@tabler/icons-react';
import { IconCalendarEvent } from '@tabler/icons-react';
// project imports
import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import PanelCard from '../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../ui-component/cards/CardSecondaryAction';
import CustomDataGrid from '../../../ui-component/CustomDataGrid';

import SuccessModal from '../../../ui-component/SuccessModal';
import ErrorModal from '../../../ui-component/ErrorModal';
import StarRating from '../../../ui-component/StarRating';


import SendProposalModal from './SendProposalModal';
import CancelProposalModal from './CancelProposalModal';
import HiringProfessionalModal from './HiringProfessionalModal';
import ProposalsDataGrid from './ProposalsDataGrid';
import ProposalFilterSidebar from './ProposalFilterSidebar';
import InterviewDetailsModal from './interview-details/InterviewDetailsModal';
import '../temporary-jobs/PostingApplicants.css';


//Store
import { gridSpacing } from '../../../store/constant';

const CusButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));


const PostingApplicantProposal = () => {

  const theme = useTheme();
  const [applicants, setApplicants] = useState(null);
  const [permanentJobs, setPermanentJobs] = useState(null);
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

  const authToken = localStorage.getItem('auth_token');
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);

  const navigate = useNavigate();

  const applicant_user = url.split('/')[7];
  const post = url.split('/')[9];


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

  const fetchFilterProposal = () => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/owner/proposals?posting_id=${post}&applicant=${applicant_user}`;

    if (selectStatus && selectStatus != '') {
      endpoint += `&proposal_status=${selectStatus}`;
    }

    if (hiringRate) {
      endpoint += `&hiringRate=${hiringRate}`;
    }

    if (proposalDate) {
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
        setProposals(response.data.data);
        setIsSidebarOpen(false);
      })
      .catch((e) => {
        setIsSidebarOpen(false);
      });
  };


  const fetchProposal = () => {
    axios
      .get(`https://api.mddentalstaffing.com/api/v1/owner/proposals?posting_id=${post}&applicant=${applicant_user}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setProposals(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchApplicants(1, 10);
    fetchProposal();
    getApplicant();
    fetchPosting();
  }, []);


  // useEffect(() => {
  //   console.log('proposals ==== > ', proposals);
  // }, [proposals]);


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
    setProposalDate('');
    fetchProposal();
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
        fetchProposal();
        setCancelProposalModal(false);
      }).catch((e) => console.log(e));
    }
  };


  return (
    <>
      <MainCard
        title="Proposals"
        darkTitle={permanentJobs?.data?.title}
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1} >

              </Grid>
            </Box>






            {permanentJobs && (
              <>
                <Box sx={{ flexGrow: 1, backgroundColor: '#F5F5F5', }}>
                  <Grid container spacing={1} >

                    <Grid item xs={5}>
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

                    <Grid item xs={7} >
                      <CusButton
                        style={{
                          backgroundColor: '#2561B0',
                          border: 0,
                          borderRadius: 5,
                          textTransform: 'capitalize',
                          borderRadius: '3px',
                          padding: '6px 15px',
                          color: 'white'
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
                          display: `${gridWidth ? 'none' : ''}`,
                          textTransform: 'capitalize',
                          borderRadius: '3px',
                          padding: '6px 15px',
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
                          display: `${gridWidth ? 'none' : ''}`,
                          textTransform: 'capitalize',
                          borderRadius: '3px',
                          padding: '6px 15px',
                        }}
                      >
                        HIRE
                      </CusButton>

                      <CusButton
                        onClick={() => setIsSidebarOpen(true)}
                        style={{
                          border: 0,
                          borderRadius: 5,
                          textTransform: 'capitalize',
                          borderRadius: '3px',
                          padding: '6px 15px',
                          backgroundColor: theme.palette.background.defaultSideBar,
                          color: '#fff',
                        }}
                      >
                        <IconFilter stroke={1} />
                      </CusButton>
                      <CusButton
                        onClick={fetchProposal}
                        style={{
                          color: theme.palette.background.defaultSideBar,
                          backgroundColor: '#fff',
                          borderRadius: 5,
                          border: '1px solid #2561B0',
                          textTransform: 'capitalize',
                          borderRadius: '3px',
                          padding: '6px 15px',
                        }}
                      >
                        <IconReload stroke={1} />
                      </CusButton>
                    </Grid>

                  </Grid>
                </Box>
              </>
            )}

            {applicants && applicants.data && (
              <Box sx={{ flexGrow: 1, border: '1px solid #D9D9D9', mt: 2 }}>
                <ProposalsDataGrid
                  columns={columns}
                  // rows={applicants.data}
                  // rows={rowss}
                  rows={proposals}
                  paging={applicants.paging}
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
                  fetchFilterProposal();
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
                fetchProposal={fetchProposal}
                applicant={applicant}
                userCurrentLocation={userCurrentLocation}
                permanentJob={permanentJobs.data}
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
                fetchProposal={fetchProposal}
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
      </MainCard>
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
  //         name: 'Permanent Job',
  //         link: '/owner/postings/permanent',
  //       },
  //       {
  //         name: 'Assignment Applicants',
  //         link: `/owner/postings/permanent/applicants/${id}`,
  //       },
  //     ]}
  //   >
  //     {/* <div
  //       style={{
  //         opacity: isSidebarOpen ? 1 : 0,
  //         display: isSidebarOpen ? 'block' : 'none',
  //         transition: 'all 0.25s ease',
  //         zIndex: 151,
  //       }}
  //     >
  //     </div> */}




  //   </Layout>
  // );
};

export default PostingApplicantProposal;
