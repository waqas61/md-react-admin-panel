import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { IconCalendarDue } from '@tabler/icons-react';
import { IconReload } from '@tabler/icons-react';
import { IconFilter } from '@tabler/icons-react';
import { IconCalendarEvent } from '@tabler/icons-react';


import StarRating from '../../../../ui-component/StarRating';
import FilterIcon from '../../../../assets/icons/filter.svg';
import RefreshIcon from '../../../../assets/icons/arrow-clockwise.svg';
import InterviewDetailsDialog from './InterviewDetailsDialog';
import InterviewsDataGrid from './InterviewsDataGrid';
import FiltersSidebar from './FiltersSidebar';

import MainCard from '../../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../../store/constant';

import '../../temporary-jobs/PostingApplicants.css';
const CusButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));
const PostingApplicantInterviews = () => {

  const navigate = useNavigate();
  const theme = useTheme();
  const [interviews, setInterviews] = useState({});
  const [selectedType, setSelectedType] = useState('');
  const [interviewStatus, setInterviewStatus] = useState('');
  const [filtersSidebar, setFiltersSidebar] = useState(false);
  const [permanentJobs, setPermanentJobs] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [interviewDetailsOpen, setInterviewDetailsOpen] = useState(false);
  const [gridWidth, setGridWidth] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userLocations, setUserLocations] = useState([]);
  const [userCurrentLocation, setUserCurrentLocation] = useState(null);
  const [applicant, setApplicant] = useState(null);
  const [cancelProposalModal, setCancelProposalModal] = useState(false);
  const [hiringModal, setHiringModal] = useState(false);

  const authToken = localStorage.getItem('auth_token');
  const url = window.location.href;

  const { postingId, applicantId } = useParams();



  // useEffect(() => {
  //   const handleResize = () => {
  //     setGridWidth(window.innerWidth < 800 ? true : false);
  //   };
  //   handleResize();
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  //   // eslint-disable-next-line
  // }, [window.innerWidth]);


  const getApplicant = async (selectedApplicant) => {
    axios
      .get(`https://api.mddentalstaffing.com/api/v1/owner/applicants/${applicantId}`, {
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

  const fetchPosting = () => {
    axios
      .get(`https://api.mddentalstaffing.com/api/v1/owner/postings/${postingId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setPermanentJobs(res.data);
      })
      .catch((e) => console.log(e));
  };

  const getInterviews = (page, limit) => {

    let endpoint = `https://api.mddentalstaffing.com/api/v1/owner/applicant/${applicantId}/interview/schedule?page=${page}&limit=${limit}`;

    if (selectedType) {
      endpoint += `&type=${selectedType}`;
    }

    if (interviewStatus) {
      endpoint += `&interview_status=${interviewStatus}`;
    }

    axios
      .get(endpoint, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((response) => {
        setInterviews(response.data);
      })
      .catch((e) => console.log(e));

  };

  const columns = [
    { field: 'applicant', headerName: 'Interview Type', width: 200 },
    { field: 'user_location_id', headerName: 'Status', width: 150 },
    { field: 'posting_status', headerName: 'Start Time', width: 150 },
    { field: 'start_date', headerName: 'End Time', width: 150 },
    { field: 'end_date', headerName: 'Selected Date', width: 150 },
    { field: 'applicants_count', headerName: '', width: 150 },
  ];

  useEffect(() => {
    getApplicant();
    fetchPosting();
    getInterviews(1, 10);
  }, []);

  const resetFilter = () => {
    setSelectedType('');
    setInterviewStatus('');
    getInterviews(1, 10);
  };


  return (
    <>

      <MainCard
        title="Interviews Details"
        darkTitle={permanentJobs?.data?.title}

      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>




            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1} >


              </Grid>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1} >

                <Grid item xs={3}>
                  <Box sx={{
                    pb: 1,
                    width: 'auto',
                    flexGrow: 1
                  }}>
                    <Grid container spacing={2}>
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
                    </Grid>
                  </Box>
                </Grid>

                <Grid item xs={9} >
                  <CusButton
                    variant='outlined'
                    style={{
                      border: '1px solid #2561B0',
                      color: '#fff',
                      backgroundColor: '#2561B0',
                      textTransform: 'capitalize',
                    }}
                    onClick={() => {
                      navigate(
                        `/owner/postings/permanent/applicants/${postingId}`
                      );
                    }}
                  >
                    Postings Applicants
                  </CusButton>

                  <CusButton
                    variant='outlined'
                    style={{
                      border: '1px solid #2561B0',
                      color: '#fff',
                      backgroundColor: '#2561B0',
                      textTransform: 'capitalize',
                    }}
                    onClick={() => {
                      navigate(
                        `/posting/permanent/${postingId}/applicants/${applicantId}/schedule`
                      );
                    }}
                  >
                    Schedule For An Interview
                  </CusButton>

                  <CusButton
                    variant='outlined'
                    style={{
                      border: '1px solid #2561B0',
                      color: '#fff',
                      backgroundColor: '#2561B0',
                      textTransform: 'capitalize',
                    }}
                    onClick={() => {
                      setInterviewDetailsOpen(true);
                    }}
                  >
                    Interview Details
                  </CusButton>

                  <CusButton
                    variant='outlined'
                    style={{
                      border:
                        selectedItem !== null
                          ? '1px solid #2561B0'
                          : '1px solid #D9D9D9',
                      color: selectedItem !== null ? '#595959' : '#BFBFBF',
                      backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                      textTransform: 'capitalize',

                    }}
                    disabled={selectedItem === null}
                    onClick={() => setSelectedItem(null)}
                  >
                    Cancel
                  </CusButton>

                  <CusButton
                    style={{
                      border: '1px solid #2561B0',
                      backgroundColor: theme.palette.background.defaultSideBar,
                      color: '#fff',
                      textTransform: 'capitalize',
                    }}
                    onClick={() => {
                      setFiltersSidebar(true);
                    }}
                  >
                    <IconFilter stroke={1} />
                  </CusButton>

                  <CusButton
                    style={{
                      border: '1px solid #2561B0',
                      color: theme.palette.background.defaultSideBar,
                      backgroundColor: '#fff',
                      textTransform: 'capitalize',
                    }}
                    onClick={() => {
                      setSelectedItem(null);
                      setSelectedType('');
                      getInterviews(1, 10);
                    }}
                  >
                    <IconReload stroke={1} />
                  </CusButton>
                </Grid>

              </Grid>
            </Box>


            {interviews && interviews.data && (
              <InterviewsDataGrid
                columns={columns}
                rows={interviews.data}
                paging={interviews.paging}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                fetchData={() => {
                  getInterviews(1, 10);
                }}
              />
            )}

            {filtersSidebar && (
              <FiltersSidebar
                handleClose={() => setFiltersSidebar(false)}
                open={filtersSidebar}
                setSelectedType={setSelectedType}
                selectedType={selectedType}
                setInterviewStatus={setInterviewStatus}
                interviewStatus={interviewStatus}
                resetFilter={resetFilter}
                filterInterviews={() => {
                  getInterviews(1, 10)
                  setFiltersSidebar(false);
                }}
                gridWidth={gridWidth}
              />
            )}


            {interviewDetailsOpen && (
              <InterviewDetailsDialog
                fetchData={() => {
                  getInterviews(1, 10);
                }}
                handleClose={() => setInterviewDetailsOpen(false)}
                open={interviewDetailsOpen}
                selectedItem={applicant}
                applicantId={applicantId}
                postingId={postingId}
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
  //         link: `/owner/postings/permanent/applicants/${postingId} `,
  //       },
  //     ]}
  //   >












  //     {/* 888888888888888888888888888888 */}


  //     {/* <div
  //       style={{
  //         opacity: isSidebarOpen ? 1 : 0,
  //         display: isSidebarOpen ? 'block' : 'none',
  //         transition: 'all 0.25s ease',
  //         zIndex: 151,
  //       }}
  //     >
  //     </div>

  //     <div
  //       className='d-flex'
  //       style={{
  //         alignItems: 'center',
  //         borderBottom: '1px solid #D9D9D9',
  //       }}
  //     >
  //       <Grid
  //         sx={{
  //           px: 3,
  //           pt: 2,
  //           pb: 1,
  //           borderBottom: '1px solid #D9D9D9',
  //           // width: 'auto',
  //         }}
  //       >
  //         <div
  //           className='postingSchedule'
  //           style={{
  //             gap: '250px',
  //           }}>
  //           <div
  //             className='d-flex'
  //             style={{
  //               gap: 60,
  //             }}
  //           >
  //             <div>
  //               <h4>Interviews Details</h4>
  //               <p>{permanentJobs?.data?.title}</p>
  //             </div>
  //           </div>

  //           <div
  //             style={{
  //               display: 'flex',
  //               gap: 10,
  //               alignItems: 'left',
  //             }}
  //           >
  //             {applicant ? (
  //               <Avatar alt="Remy Sharp"
  //                 src={`https://api.mddentalstaffing.com/api/v1/assets/${applicant?.avatar}`}
  //                 sx={{ width: 75, height: 75 }
  //                 }
  //               />
  //             ) : (
  //               <AccountCircle style={{ fontSize: '75px' }} />
  //             )}
  //             <div>
  //               <div>
  //                 <p>
  //                   {applicant?.first_name}{' '}
  //                   {applicant?.last_name}
  //                 </p>
  //               </div>
  //               <div>
  //                 <StarRating rating={applicant?.average_score ? applicant?.average_score : 0} />
  //               </div>
  //             </div>
  //           </div >
  //         </div >

  //       </Grid >
  //     </div>



  //     <div
  //       className='d-flex justify-content-between'
  //       style={{
  //         backgroundColor: '#F5F5F5',
  //         padding: '12px 20px',
  //         borderBottom: '1px solid #D9D9D9',
  //       }}
  //     >
  //       <div
  //         style={{
  //           display: 'flex',
  //           gap: 20,
  //           alignItems: 'center',
  //         }}
  //       >
  //         <Button
  //           variant='outlined'
  //           style={{
  //             border: '1px solid #2561B0',
  //             color: '#fff',
  //             backgroundColor: '#2561B0',
  //           }}
  //           onClick={() => {
  //             navigate(
  //               `/owner/postings/permanent/applicants/${postingId}`
  //             );
  //           }}
  //         >
  //           Postings Applicants
  //         </Button>
  //         <Button
  //           variant='outlined'
  //           style={{
  //             border: '1px solid #2561B0',
  //             color: '#fff',
  //             backgroundColor: '#2561B0',
  //           }}
  //           onClick={() => {
  //             navigate(
  //               `/owner/postings/permanent/${postingId}/applicants/${applicantId}/schedule`
  //             );
  //           }}
  //         >
  //           Schedule For An Interview
  //         </Button>
  //         <Button
  //           variant='outlined'
  //           style={{
  //             border: '1px solid #2561B0',
  //             color: '#fff',
  //             backgroundColor: '#2561B0',
  //           }}
  //           onClick={() => {
  //             setInterviewDetailsOpen(true);
  //           }}
  //         >
  //           Interview Details
  //         </Button>

  //         <Button
  //           variant='outlined'
  //           style={{
  //             border:
  //               selectedItem !== null
  //                 ? '1px solid #2561B0'
  //                 : '1px solid #D9D9D9',
  //             color: selectedItem !== null ? '#595959' : '#BFBFBF',
  //             backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
  //           }}
  //           disabled={selectedItem === null}
  //           onClick={() => setSelectedItem(null)}
  //         >
  //           Cancel
  //         </Button>
  //         <Grid
  //           style={{
  //             width: '200px',
  //             height: '40px',
  //           }}
  //         >

  //         </Grid>
  //       </div>



  //       <div
  //         style={{
  //           display: 'flex',
  //           gap: 20,
  //         }}
  //       >
  //         <Button
  //           style={{
  //             border: '1px solid #2561B0',
  //             color: '#595959',
  //             backgroundColor: '#2561B0',
  //           }}
  //           onClick={() => {
  //             setFiltersSidebar(true);
  //           }}
  //         >
  //           <img src={FilterIcon} alt='' />
  //           <span
  //             style={{
  //               marginLeft: 5,
  //               color: '#fff',
  //             }}
  //           >
  //             Filters
  //           </span>
  //         </Button>
  //         <Button
  //           style={{
  //             border: '1px solid #2561B0',
  //             color: '#595959',
  //             backgroundColor: '#fff',
  //           }}
  //           onClick={() => {
  //             setSelectedItem(null);
  //             setSelectedType('');
  //             getInterviews(1, 10);
  //           }}
  //         >
  //           <img src={RefreshIcon} alt='' />
  //           <span
  //             style={{
  //               marginLeft: 5,
  //               color: '#2561B0',
  //             }}
  //           >
  //             Reset Filters
  //           </span>
  //         </Button>
  //       </div>
  //     </div>


  //     <div
  //       style={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         padding: 20,
  //       }}
  //     >
  //       <div
  //         style={{
  //           border: '1px solid #D9D9D9',
  //           borderRadius: '10px',
  //           width: '100%',
  //         }}
  //       >

  //         {interviews && interviews.data && (
  //           <InterviewsDataGrid
  //             columns={columns}
  //             rows={interviews.data}
  //             paging={interviews.paging}
  //             selectedItem={selectedItem}
  //             setSelectedItem={setSelectedItem}
  //             fetchData={() => {
  //               getInterviews(1, 10);
  //             }}
  //           />
  //         )}
  //       </div>

  //     </div>

  //     {filtersSidebar && (
  //       <FiltersSidebar
  //         handleClose={() => setFiltersSidebar(false)}
  //         open={filtersSidebar}
  //         setSelectedType={setSelectedType}
  //         selectedType={selectedType}
  //         setInterviewStatus={setInterviewStatus}
  //         interviewStatus={interviewStatus}
  //         resetFilter={resetFilter}
  //         filterInterviews={() => {
  //           getInterviews(1, 10)
  //           setFiltersSidebar(false);
  //         }}
  //       />
  //     )}


  //     {interviewDetailsOpen && (
  //       <InterviewDetailsDialog
  //         fetchData={() => {
  //           getInterviews(1, 10);
  //         }}
  //         handleClose={() => setInterviewDetailsOpen(false)}
  //         open={interviewDetailsOpen}
  //         selectedItem={applicant}
  //         applicantId={applicantId}
  //         postingId={postingId}
  //       />
  //     )} */}

  //   </Layout >
  // );
};

export default PostingApplicantInterviews;
