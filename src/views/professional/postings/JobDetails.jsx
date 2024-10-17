import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';




// project imports
import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import PanelCard from '../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../ui-component/cards/CardSecondaryAction';


import { Grid, Button } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import StarRating from '../../../ui-component/StarRating';
import CheckboxIcon from '../../../assets/icons/checkboxIcon.svg';
import JobRatingDetailsModal from './JobRatingDetailsModal';

import { gridSpacing } from '../../../store/constant';
import { selectUser } from '../../../store/slices/userSlice';




const JobDetails = () => {
  const user = useSelector(selectUser);
  const [jobDetails, setJobDetails] = useState({});
  const [postingApplicants, setPostingApplicants] = useState([]);
  const [postingSchedules, setPostingSchedules] = useState([]);
  const [ratingDetailsOpen, setRatingDetailsOpen] = useState(false);
  const jobId = window.location.href.split('/').pop();
  const authToken = localStorage.getItem('auth_token');
  const navigate = useNavigate();
  const [jobStartDateTime, setJobStartDateTime] = useState(null);
  const [jobEndDateTime, setJobEndDateTime] = useState(null);

  const lo_user = localStorage.getItem('user');
  const lo_user_ob = JSON.parse(lo_user);

  const fetchJobDetails = () => {
    axios
      .get(`https://api.mddentalstaffing.com/api/v1/postings/${jobId}`, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setJobDetails(res.data.data);
        setPostingApplicants(res.data.data.posting_applicants);
        setPostingSchedules(res.data.data.posting_schedules);
        const start = res.data.data.posting_schedules.shift(0);
        const end = res.data.data.posting_schedules.pop();
        if (end == undefined) {
          end = start;
        }
        setJobStartDateTime(start);
        setJobEndDateTime(end);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    // console.log('jobStartDateTime === > ', postingSchedules, jobStartDateTime);
  });

  useEffect(() => {
    fetchJobDetails();
  }, []);


  return (
    <>
      <MainCard
        title={jobDetails?.user?.companies[0]?.name}
        darkTitle={jobDetails?.user_location?.place_name}
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>

            <div
              style={{
                width: '60%',
                borderRadius: '6px',
                border: '1px solid #D9D9D9',
                margin: '30px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div
                style={{
                  backgroundColor: '#FAFAFA',
                  borderBottom: '1px solid #D9D9D9',
                  padding: '25px',
                  borderRadius: '6px 6px 0px 0px',
                }}
              >
                <div
                  className='d-flex'
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div className='d-flex'>
                    {jobDetails?.user?.avatar ? (
                      <img
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          marginRight: '20px',
                        }}
                        src={`https://api.mddentalstaffing.com/api/v1/assets/${jobDetails?.user?.avatar}`}
                        alt=''
                      />
                    ) : (
                      <AccountCircle sx={{ fontSize: '60px' }} />
                    )}
                    <div>
                      <p
                        style={{
                          color: '#262626',
                          fontSize: '20px',
                          fontWeight: 500,
                          margin: '0px',
                        }}
                      >
                        {jobDetails?.user?.first_name} {jobDetails?.user?.last_name}
                      </p>
                      <p
                        style={{
                          color: '#8C8C8C',
                          fontSize: '16px',
                          fontWeight: 400,
                          margin: '0px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {/* Practice Owner of  {(postingApplicants[0] ? jobDetails?.user?.companies[0]?.name : '*****')} */}
                        Practice Owner of  {jobDetails?.user?.companies[0]?.name}
                      </p>
                    </div>
                  </div>
                  <div>

                    {postingApplicants[0] ? (
                      <Button variant='outline-primary' onClick={() => navigate('/messages')}>Open Chat</Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div
                  className='d-flex'
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                  }}
                >
                  <div
                    className='d-flex'
                    style={{
                      gap: '10px',
                    }}
                  >
                    <p
                      style={{
                        color: '#262626',
                        fontSize: '14px',
                        fontWeight: 500,
                        margin: '0px',
                      }}
                    >
                      Average Ratting
                    </p>
                    {jobDetails?.user?.average_score && (
                      <StarRating rating={jobDetails?.user?.average_score} />
                    )}
                    <p
                      style={{
                        color: '#2561B0',
                        fontSize: '14px',
                        fontWeight: 400,
                        margin: '0px',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        marginLeft: '30px',
                      }}
                      onClick={() => setRatingDetailsOpen(true)}
                    >
                      Rate
                    </p>
                  </div>
                  <p
                    style={{
                      color: '#8C8C8C',
                      fontSize: '12px',
                      fontWeight: 400,
                      margin: '0px',
                    }}
                  >
                    Last Review:{' '}
                    <span
                      style={{
                        color: '#262626',
                        fontSize: '12px',
                        fontWeight: 400,
                        margin: '0px',
                      }}
                    >
                      {moment(jobDetails?.user?.last_review_at).format(
                        'MM/DD/YYYY [l] h:mm A'
                      )}
                    </span>
                  </p>
                  <p
                    style={{
                      color: '#2561B0',
                      fontSize: '14px',
                      fontWeight: 400,
                      margin: '0px',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      marginLeft: '30px',
                    }}
                  >
                    Job History
                  </p>
                </div>
              </div>
              <div
                style={{
                  padding: '25px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '0px 0px 6px 6px',
                }}
              >
                <h3
                  style={{
                    color: '#262626',
                    fontSize: '16px',
                    fontWeight: 500,
                  }}
                >
                  Office Details
                </h3>

                <div
                  className='d-flex'
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '260px',
                    }}
                  >
                    <p
                      style={{
                        color: '#595959',
                        fontSize: '12px',
                        fontWeight: 400,
                        margin: '0px',
                      }}
                    >
                      Category
                    </p>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        margin: '0px',
                      }}
                    >
                      {jobDetails?.category?.name}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        color: '#595959',
                        fontSize: '12px',
                        fontWeight: 400,
                        margin: '0px',
                      }}
                    >
                      Location
                    </p>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        margin: '0px',
                      }}
                    >
                      {jobDetails?.user_location?.place_name}
                    </p>
                  </div>
                  <div></div>
                </div>
                <div
                  className='d-flex'
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '260px',
                    }}
                  >
                    <p
                      style={{
                        color: '#595959',
                        fontSize: '12px',
                        fontWeight: 400,
                        margin: '0px',
                      }}
                    >
                      Posting Title
                    </p>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        margin: '0px',
                      }}
                    >
                      {jobDetails.title}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        color: '#595959',
                        fontSize: '12px',
                        fontWeight: 400,
                        margin: '0px',
                      }}
                    >
                      Distance
                    </p>
                    <p>
                      <span
                        style={{
                          color: '#2561B0',
                          textDecoration: 'underline',
                          fontSize: '14px',
                        }}
                      >
                        {jobDetails?.distance}
                      </span>
                      <LocationOnOutlinedIcon
                        style={{ marginLeft: 5, color: '#FA5A16' }}
                      />
                    </p>
                  </div>
                  <div></div>
                </div>
                <hr />
                <h3
                  style={{
                    color: '#262626',
                    fontSize: '16px',
                    fontWeight: 500,
                  }}
                >
                  Duration
                </h3>
                <div
                  className='d-flex'
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '260px',
                    }}
                  >
                    <p
                      style={{
                        color: '#595959',
                        fontSize: '12px',
                        fontWeight: 400,
                        margin: '0px',
                      }}
                    >
                      Start Day
                    </p>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        margin: '0px',
                      }}
                    >

                      {
                        jobStartDateTime ?
                          moment.utc(jobStartDateTime.start_time, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('MM/DD/YY hh:mm A') :
                          '----------'
                      }

                    </p>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        margin: '0px',
                      }}
                    >
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        color: '#595959',
                        fontSize: '12px',
                        fontWeight: 400,
                        margin: '0px',
                      }}
                    >
                      End Day
                    </p>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        margin: '0px',
                      }}
                    >
                      {
                        jobEndDateTime ?
                          moment.utc(jobEndDateTime.end_time, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('MM/DD/YY hh:mm A') :
                          '----------'
                      }
                    </p>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        margin: '0px',
                      }}
                    >
                    </p>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            {jobDetails.posting_type === 'temporary' && (
              <div
                className='d-flex'
                style={{
                  width: '60%',
                  margin: '30px',
                  gap: '15px',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '6px',
                    border: '1px solid #D9D9D9',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    padding: '25px',
                    width: '60%',
                  }}
                >
                  <h3
                    style={{
                      color: '#262626',
                      fontSize: '16px',
                      fontWeight: 500,
                    }}
                  >
                    Job Management
                  </h3>
                  <div
                    className='d-flex'
                    style={{
                      marginTop: '20px',
                      gap: 60,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          color: '#595959',
                          fontSize: '12px',
                          fontWeight: 400,
                          margin: '0px',
                        }}
                      >
                        Days Approved
                      </p>
                      <div
                        className='d-flex'
                        style={{
                          gap: 5,
                          alignItems: 'center',
                        }}
                      >
                        <img src={CheckboxIcon} alt='' />
                        <span>{jobDetails.application_approved_count}</span>
                        <ArrowDropUpIcon sx={{ color: '#262626' }} />
                      </div>
                    </div>
                    <div>
                      <p
                        style={{
                          color: '#595959',
                          fontSize: '12px',
                          fontWeight: 400,
                          margin: '0px',
                        }}
                      >
                        Available Day(s)
                      </p>
                      <p
                        style={{
                          color: '#2561B0',
                          textDecoration: 'underline',
                          fontSize: '14px',
                        }}
                      >
                        {jobDetails.schedules_count}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button
                      style={{
                        width: '100%',
                        marginTop: '20px',
                        backgroundColor: '#4CAF50',
                        border: 0,
                      }}
                      variant='success'
                      onClick={() =>
                        navigate(`/professional/jobs/temporary/${jobId}/calendar`)
                      }
                    >
                      Access Calendar View
                    </Button>



                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: '#FFF8E1',
                    width: '40%',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    height: 'fit-content',
                  }}
                >
                  <div
                    className='d-flex'
                    style={{
                      gap: 11,
                    }}
                  >
                    <ErrorOutlineOutlinedIcon sx={{ color: '#FFC400' }} />
                    <p
                      style={{ color: '#B28900', fontSize: '14px' }}
                      className='fw-semibold mb-0'
                    >
                      Important:
                    </p>
                  </div>
                  <p style={{ color: '#B28900', fontSize: '14px', marginTop: '5px' }}>
                    Please go to Calendar View and choose working day(s) based on your
                    availability. Please be sure to scroll up/down to see all required
                    day(s).
                  </p>
                </div>
              </div>
            )}

            {ratingDetailsOpen && (
              <JobRatingDetailsModal
                handleClose={() => setRatingDetailsOpen(false)}
                open={ratingDetailsOpen}
                selectedItem={jobDetails}
                key={jobDetails.id}
                fetchData={fetchJobDetails}
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
  //         name: 'Jobs',
  //         link: '/',
  //       },
  //       {
  //         name: `${jobDetails.posting_type === 'temporary'
  //           ? 'Temporary Jobs'
  //           : 'Permanent Jobs'
  //           }`,
  //         link:
  //           jobDetails.posting_type === 'temporary'
  //             ? '/professional/jobs/temporary'
  //             : '/professional/jobs/permanent',
  //       },
  //     ]}
  //   >

  //   </Layout>
  // );
};

export default JobDetails;
