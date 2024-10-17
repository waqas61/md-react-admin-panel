import React, { useState, useEffect } from 'react';
import { Box, Modal, Radio, Typography, Button } from '@mui/material';

import axios from 'axios';
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import { capitalizeFirstLetter } from '../../../../utils/helper';
import LoadingButton from '../../../../ui-component/LoadingButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '6px',
};

const InterviewSchedulesModal = ({ isOpen, onClose, item, fetchData, onRescheduleInterviewModal }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [maxWidth, setMaxWidth] = React.useState('lg');
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const [declineLoading, setDeclineLoading] = useState(false);
  const [declineFinished, setDeclineFinished] = useState(false);

  const [isSuggested, setIsSuggested] = useState(() => {
    var sch = item.interview_schedules.filter((schedule) => {
      return schedule.schedule_status == 'professional_suggested';
    });
    if (sch.length > 0) {
      return true;
    } else {
      return false
    }
  });


  const acceptInterviewSchedule = () => {
    setLoading(true);
    axios.put(
      `https://api.mddentalstaffing.com/api/v1/owner/accept/applicant/interview/schedule`,
      {
        interview_schedule_id: selectedDate,
        interview_id: item.id,
        interview_status: 'scheduled',
        applicant_id: item.applicant_id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    ).then(() => {
      fetchData(1, 10);
      setFinished(true);
      onClose();
    }).catch((e) => console.log(e));
  };

  const RejectSchedule = () => {
    setDeclineLoading(true);
    axios
      .put(
        `https://api.mddentalstaffing.com/api/v1/owner/accept/applicant/interview/schedule`,
        {
          interview_status: 'rejected',
          interview_schedule_id: selectedDate,
          interview_id: item.id,
          applicant_id: item.applicant_id,
        },
        {
          headers: {
            method: 'PUT',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then(() => {
        fetchData(1, 10);
        setDeclineFinished(true);
        onClose();
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    // console.log('useEffect ==== > ApplyInterviewModal');
  }, [])


  return (
    <Dialog
      // fullScreen={fullScreen}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth="lg"
      maxWidth={maxWidth}
    >
      <DialogTitle id="responsive-dialog-title">
        Interview Schedules ({capitalizeFirstLetter(item.type)})
      </DialogTitle>
      <DialogContent>


        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
          >
            <Grid
              className="rounded"
              sx={{
                px: 2,
                py: 1,
                border: "1px solid",
                borderColor: "#D9D9D9",
              }}
              xs={6}
              md={6}
            >
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Previous Slots
              </Typography>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '20px',
                }}
              >
                {item.interview_schedules.map((schedule, index) => {
                  if (schedule.schedule_status == 'suggested') {
                    return (
                      <InterviewTime
                        key={index}
                        schedule={schedule}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                      />
                    )
                  }
                })}
              </div>

            </Grid>


            <Grid
              className="rounded"
              sx={{
                px: 2,
                py: 1,
                border: "1px solid",
                borderColor: "#D9D9D9",
              }}
              xs={6}
              md={6}
            >
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                New Proposed
              </Typography>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '20px',
                }}
              >
                {item.interview_schedules.map((schedule, index) => {
                  if (schedule.schedule_status == 'professional_suggested') {
                    return (
                      <InterviewTime
                        key={index}
                        schedule={schedule}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                      />
                    )
                  }
                })}
              </div>


              {isSuggested ? (
                <Grid
                  sx={{
                    py: 2,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                    </div>
                    <div>

                      <LoadingButton
                        color='warning'
                        variant='contained'
                        style={{
                          padding: '5px 20px',
                          margin: '5px',
                          borderRadius: '4px',
                          transition: 'background-color 0.3s',
                          color: '#fff',
                          backgroundColor: '#891616',
                        }}
                        loading={declineLoading}
                        done={declineFinished}
                        onClick={RejectSchedule}
                      >
                        Decline
                      </LoadingButton>

                      <LoadingButton
                        color='primary'
                        variant='contained'
                        style={{
                          padding: '5px 20px',
                          borderRadius: '4px',
                          transition: 'background-color 0.3s',
                          color: '#fff',
                          backgroundColor: '#FA5A16',
                        }}
                        loading={loading}
                        done={finished}
                        onClick={acceptInterviewSchedule}
                      >
                        Accept
                      </LoadingButton>
                    </div>
                  </div>
                </Grid>
              ) : (
                <></>
              )}



            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewSchedulesModal;

const InterviewTime = ({ schedule, selectedDate, setSelectedDate }) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const day = new Date(schedule.interview_date).getDay();
  const dayName = days[day];
  const lo_user = localStorage.getItem('user');
  const lo_user_ob = JSON.parse(lo_user);
  return (
    <div
      className='d-flex'
      style={{
        flexDirection: 'column',
        gap: 10,
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        padding: '10px',
      }}
    >
      <div className='d-flex' style={{ justifyContent: 'space-between' }}>
        <div className='d-flex' style={{ gap: 13, alignItems: 'center' }}>
          <p
            style={{
              color: '#000000',
              margin: '0',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            {dayName}
          </p>
          <p
            style={{
              color: '#262626',
              margin: '0',
              fontSize: '12px',
              fontWeight: '400',
            }}
          >
            {/* {moment.utc(schedule.interview_date, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('MM/DD/YY hh:mm A')} */}
            {moment.utc(schedule.interview_date, 'YYYYMMDD HH:mm:ss').format('MM/DD/YY hh:mm A')}
            {/* {schedule.interview_date} */}
          </p>
        </div>

        {schedule.schedule_status == 'professional_suggested' ? (
          <>
            <Radio
              checked={selectedDate === schedule.id}
              onChange={() => setSelectedDate(schedule.id)}
            />
          </>
        ) : (
          <>
            <Radio
              checked={true}
            />
          </>
        )}

      </div>
      <div className='d-flex' style={{ gap: 20 }}>
        <p
          style={{
            color: '#8C8C8C',
            margin: '0',
            fontSize: '12px',
            fontWeight: '400',
          }}
        >
          Start Time
        </p>
        <p
          style={{
            color: '#8C8C8C',
            margin: '0',
            fontSize: '12px',
            fontWeight: '400',
          }}
        >
          End Time
        </p>
      </div>
      <p
        style={{
          color: '#262626',
          margin: '0',
          fontSize: '12px',
          fontWeight: '500',
        }}
      >
        {schedule.start_time} - {schedule.end_time}
      </p>
    </div>
  );
};
