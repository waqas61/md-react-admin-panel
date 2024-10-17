import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import { useTheme } from '@mui/material';


import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

import SubCard from '../../../../ui-component/cards/SubCard';
import MainCard from '../../../../ui-component/cards/MainCard';
import SecondaryAction from '../../../../ui-component/cards/CardSecondaryAction';

import { IconCalendarDue } from '@tabler/icons-react';
import { IconReload } from '@tabler/icons-react';
import { IconFilter } from '@tabler/icons-react';
import { IconCalendarEvent } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';

import CustomScheduleBoxes from './CustomScheduleBoxes';
import ScheduleInterviewCalendar from './ScheduleInterviewCalendar';


import { gridSpacing } from '../../../../store/constant';

const ScheduleJobInterview = () => {
  const authToken = localStorage.getItem("auth_token");
  const { postingId, applicantId } = useParams();

  const [posting, setPosting] = useState({});
  const [applicant, setApplicant] = useState({});
  const [interviews, setInterviews] = useState({});
  const [events, setEvents] = useState([{}]);
  const [interviewsCount, setInterviewsCount] = useState({
    personal: 0,
    working: 0,
    phone: 0,
  });

  const [interviewsArray, setInterviewsArray] = useState([]);

  const [comments, setComments] = useState('');

  const navigate = useNavigate();

  const getPosting = () => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/postings/${postingId}`,
        {
          headers: {
            method: 'GET',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((response) => {
        setPosting(response.data.data);
      })
      .catch((e) => console.log(e));
  };

  const getApplicant = () => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/applicants/${applicantId}`,
        {
          headers: {
            method: 'GET',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((response) => {
        setApplicant(response.data.data);
      })
      .catch((e) => console.log(e));
  };

  const getInterviews = () => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/interview-schedules`,
        {
          headers: {
            method: 'GET',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((response) => {
        const interviews = response.data.data;
        const filteredInterviews = interviews.filter(
          (interview) =>
            interview.interview.posting_applicant_id === parseInt(applicantId)
            &&
            interview.interview.posting_id === parseInt(postingId)
        );

        console.log('filteredInterviews === > ', filteredInterviews);



        const phoneInterviews = filteredInterviews.filter(
          (interview) => interview.interview.type === 'phone'
        );
        const personalInterviews = filteredInterviews.filter(
          (interview) => interview.interview.type === 'personal'
        );
        const workingInterviews = filteredInterviews.filter(
          (interview) => interview.interview.type === 'working'
        );

        setInterviewsCount({
          phone: phoneInterviews.length > 0 && (phoneInterviews[0].interview.interview_status == 'pass' || phoneInterviews[0].interview.interview_status == 'scheduled') ? 4 : phoneInterviews[0].interview.interview_status == "fail" ? 0 : phoneInterviews.length,
          personal: personalInterviews.length > 0 && (personalInterviews[0].interview.interview_status == 'pass' || personalInterviews[0].interview.interview_status == 'scheduled') ? 4 : personalInterviews[0].interview.interview_status == "fail" ? 0 : personalInterviews.length,
          working: workingInterviews.length > 0 && (workingInterviews[0].interview.interview_status == 'pass' || workingInterviews[0].interview.interview_status == 'scheduled') ? 4 : workingInterviews[0].interview.interview_status == "fail" ? 0 : workingInterviews.length,
        });

        const events = interviews.map((interview, index) => {
          return {
            title: interview.type,
            start: moment(interview.interview_date).toDate(),
            end: moment(interview.interview_date).toDate(),
            ...interview,
            interview: {
              ...interview.interview,
              applicant: {
                // ...interview.interview.posting_applicant.user,
                ...interview.interview.applicant,
              },
            },
          };
        });

        const groupedEvents = events.reduce((acc, event) => {
          const date = moment(event.start).format('YYYY-MM-DD');
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(event);
          return acc;
        }, {});

        const eventList = Object.keys(groupedEvents).map((date) => {
          return {
            start: moment(date).toDate(),
            end: moment(date).toDate(),
            events: groupedEvents[date],
            title: `${groupedEvents[date].length} Interview(s) on this day`,
          };
        });

        setInterviews(interviews);
        setEvents(eventList);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getPosting();
  }, []);

  useEffect(() => {
    getApplicant();
  }, []);

  useEffect(() => {
    // console.log("FIR === > ", applicant);
  }, []);

  useEffect(() => {
    getInterviews();
  }, []);

  const handleSaveInterviewSchedules = async () => {

    var url = `https://api.mddentalstaffing.com/api/v1/owner/interviews`;
    var payload = {
      posting_applicant_id: applicantId,
      interview_schedules: interviewsArray,
      comments: comments,
    };

    var request_header = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    axios.post(url, payload, request_header).then((res) => {
      navigate(`/owner/postings/permanent/applicants/${postingId}`);
    }).catch((e) => {
      console.log(e.message);
    });

  };

  const checkIfDisabled = () => {

    if (interviewsArray.length === 0) {
      return true;
    } else {
      if (interviewsCount.personal !== 0 && interviewsCount.personal !== 4) {
        return true;
      } else if (interviewsCount.working !== 0 && interviewsCount.working !== 4) {
        return true;
      } else if (interviewsCount.phone !== 0 && interviewsCount.phone !== 4) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <>



      <MainCard
        title="Schedule Job Interview"
        secondary={
          <SecondaryAction
            icon={<CloseOutlinedIcon
              sx={{
                color: '#000',
                fontSize: '42px',
                borderRadius: '50%',
                border: '1px solid #ccc',
                padding: '8px',
                backgroundColor: '#fff',
              }}
            />}
            title="cancel"
            link={`/owner/postings/permanent/applicants/${postingId}`}
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
                        <img
                          src={applicant?.avatar ? `https://api.mddentalstaffing.com/api/v1/assets/${applicant?.avatar}` : 'https://via.placeholder.com/150'}
                          alt=''
                          style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '50%',
                          }}
                        />
                      </Grid>
                      <Grid item xs="auto">
                        <Typography variant="h6" gutterBottom>
                          Candidate Name
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          {applicant?.first_name} {applicant?.last_name}
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
                      <Grid item xs="auto">
                        <Typography variant="h6" gutterBottom>
                          Posting Title
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          {posting?.title}
                        </Typography>
                      </Grid>


                    </Grid>
                  </Box>


                </Grid>

                <Grid item xs={6} >

                </Grid>

              </Grid>
            </Box>










            <div
              style={{
                margin: '20px',
                borderBottom: '1px solid #D9D9D9',
                backgroundColor: 'white',
                padding: '7px',
                borderRadius: '6px',
                border: '1px solid #E8E8E8',
                display: 'flex',
                flexDirection: 'column',
                gap: '13px',
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#194378',
                  marginBottom: '0px',
                  backgroundColor: '#D7E8FF',
                  padding: '7px 10px',
                  borderRadius: '3px',
                }}
              >
                <b>Four available dates must be chosen</b> by the dental office for
                any interview type.
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '13px',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#262626',
                      marginBottom: '8px',
                    }}
                  >
                    Personal interview
                  </p>
                  <CustomScheduleBoxes
                    count={interviewsCount.personal}
                    type='personal'
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#262626',
                      marginBottom: '8px',
                    }}
                  >
                    Working interview
                  </p>
                  <CustomScheduleBoxes
                    count={interviewsCount.working}
                    type='working'
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#262626',
                      marginBottom: '8px',
                    }}
                  >
                    Phone interview
                  </p>
                  <CustomScheduleBoxes count={interviewsCount.phone} type='phone' />
                </div>
              </div>
              <div
                style={{
                  padding: '13px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                  }}
                >
                  <ReportProblemOutlinedIcon sx={{ color: '#E54C0B' }} />
                  <p
                    style={{ color: '#E54C0B', fontSize: 14 }}
                    className='fw-semibold mb-0'
                  >
                    Attention!
                  </p>
                </div>
                <p style={{ color: '#E54C0B', marginLeft: '37px', fontSize: '12px' }}>
                  - Personal and phone Interviews are at no cost to the dental
                  practice. Please note that those interviews are limited to 1 hour.{' '}
                  <br />- For the working interviews candidate is paid their hourly
                  rate and a referral fee will be also charged.
                </p>
              </div>
            </div>
            <hr />
            <h3
              style={{
                color: '#262626',
                fontSize: '16px',
                fontWeight: '500',
                margin: '20px',
              }}
            >
              Date and Time Interview options
            </h3>
            {events && (
              <ScheduleInterviewCalendar
                applicant={applicant}
                posting={posting}
                interviewsArray={interviewsArray}
                setInterviewsArray={setInterviewsArray}
                interviews={interviews}
                setInterviewsCount={setInterviewsCount}
                interviewsCount={interviewsCount}
                events={events}
                setEvents={setEvents}
              />
            )}

            <div
              style={{
                backgroundColor: '#D7E8FF',
                borderRadius: '6px',
                padding: '10px',
                margin: '0px 26px',
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                }}
              >
                <ErrorOutlineOutlinedIcon
                  sx={{ color: '#4A93F0', transform: 'rotate(180deg)' }}
                />
                <p style={{ color: '#194378', fontSize: '14px', fontWeight: 500 }}>
                  Please Note
                </p>
              </div>
              <div
                style={{
                  margin: '0px 30px',
                }}
              >
                <p style={{ color: '#194378', fontSize: '12px', fontWeight: '400' }}>
                  Four available dates must be choosen by the dental office for any
                  interview type. If you booked a candidate for a working interview,
                  you will not be able to book another candidate for a phone or
                  personal interview on the same day.
                </p>
              </div>
            </div>

            <div
              style={{
                margin: '26px',
              }}
            >
              <TextField
                variant='outlined'
                fullWidth
                multiline
                label='Comments'
                rows={4}
                value={comments}
                onChange={(e) => {
                  setComments(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                gap: '20px',
                margin: '0px 26px',
              }}
            >
              <Button variant='outline-primary'>Cancel</Button>
              <Button
                variant='primary'
                style={{
                  backgroundColor: '#2561B0',
                  border: '1px solid #2561B0',
                  borderRadius: '4px',
                  padding: '5px 20px',
                }}
                disabled={checkIfDisabled()}
                onClick={handleSaveInterviewSchedules}
              >
                OK
              </Button>
            </div>
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
  //         name: 'Applicant Interviews',
  //         link: `/owner/postings/permanent/applicants/${postingId}`,
  //       },
  //     ]}
  //   >


  //   </Layout>
  // );
};

export default ScheduleJobInterview;
