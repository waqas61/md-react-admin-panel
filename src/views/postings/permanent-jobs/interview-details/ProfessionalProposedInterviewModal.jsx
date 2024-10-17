import React, { useState, useEffect } from 'react';

import { Box, Modal, Radio, Typography, Button } from '@mui/material';
import { capitalizeFirstLetter } from '../../../../utils/helper';
import axios from 'axios';

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

const ProfessionalProposedInterviewModal = ({ isOpen, onClose, item, postingId }) => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [interviews, setInterviews] = React.useState([]);

  const ConfirmSchedule = () => {
    axios.put(
      `https://api.mddentalstaffing.com/api/v1/interviews/${item.id}`,
      {
        interview_schedule_id: selectedDate,
        interview_status: 'scheduled',
      },
      {
        headers: {
          method: 'PUT',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    ).then(() => {
      onClose();

    }).catch((e) => console.log(e));
  };

  const RejectSchedule = () => {
    axios.put(
      `https://api.mddentalstaffing.com/api/v1/interviews/${item.id}`,
      {
        interview_status: 'rejected',
      },
      {
        headers: {
          method: 'PUT',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    ).then(() => {
      onClose();

    }).catch((e) => console.log(e));
  };

  const getInterviews = async () => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/interviews?posting_id=${postingId}&applicant_id=${item.posting_applicants[0].id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((res) => {
        setInterviews(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInterviews();
  }, []);


  useEffect(() => {
    console.log('interviews ==== > ', interviews);
  }, [interviews]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <div
          className='d-flex'
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Applying For Job Interview
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              cursor: 'pointer',
            }}
            onClick={onClose}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              class='bi bi-x'
              viewBox='0 0 16 16'
            >
              <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
            </svg>
          </div>
        </div>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          <div
            className='d-flex'
            style={{
              gap: '20px',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                width: '40%',
              }}
            >
              <h3
                style={{
                  color: '#262626',
                  margin: '0',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                General Information
              </h3>
              <div>
                <p
                  style={{
                    color: '#595959',
                    margin: '0',
                    fontSize: '12px',
                    fontWeight: '400',
                  }}
                >
                  Interview Type
                </p>
                <p
                  style={{
                    margin: '0',
                    fontSize: '14px',
                    fontWeight: '400',
                  }}
                >
                  {/* {capitalizeFirstLetter(item.type)} */}
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: '#595959',
                    margin: '0',
                    fontSize: '12px',
                    fontWeight: '400',
                  }}
                >
                  Company
                </p>
                <p
                  style={{
                    margin: '0',
                    fontSize: '14px',
                    fontWeight: '400',
                  }}
                >
                  {/* {posting.user.companies[0].name} */}
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: '#595959',
                    margin: '0',
                    fontSize: '12px',
                    fontWeight: '400',
                  }}
                >
                  Location
                </p>
                <p
                  style={{
                    margin: '0',
                    fontSize: '14px',
                    fontWeight: '400',
                  }}
                >
                  {/* {posting.user_location.place_name} */}
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: '#595959',
                    margin: '0',
                    fontSize: '12px',
                    fontWeight: '400',
                  }}
                >
                  Posting Name
                </p>
                <p
                  style={{
                    margin: '0',
                    fontSize: '14px',
                    fontWeight: '400',
                  }}
                >
                  {/* {item.posting_applicant.posting.title} */}
                </p>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                width: '60%',
              }}
            >
              <h3
                style={{
                  color: '#262626',
                  margin: '0',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                Date & Time Interview Options
              </h3>

              <div
                style={{
                  backgroundColor: '#D7E8FF',
                  padding: '7px 13px',
                  borderRadius: '3px',
                }}
              >
                <p
                  style={{
                    color: '#194378',
                    margin: '0',
                    fontSize: '12px',
                    fontWeight: '400',
                  }}
                >
                  Please choose one option that will be sent to the Doctor. Only
                  one option can be chosen.
                </p>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '20px',
                }}
              >
                {/* {item.interview_schedules.map((schedule, index) => (
                  <InterviewTime
                    key={index}
                    schedule={schedule}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                ))} */}
              </div>
              <div
                style={{
                  backgroundColor: '#D7E8FF',
                  padding: '7px 13px',
                  borderRadius: '3px',
                }}
              >
                <p
                  style={{
                    color: '#194378',
                    margin: '0',
                    fontSize: '12px',
                    fontWeight: '400',
                  }}
                >
                  If you are not available for these dates/times, click on
                  Decline button and office will provide new options.
                </p>
              </div>
            </div>
          </div>
        </Typography>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>

            <Button
              onClick={onClose}
              color='primary'
              style={{
                backgroundColor: 'transparent',
                color: '#194378',
                border: 'none',
              }}
            >
              Cancel
            </Button>

          </div>
          <div>

            <Button
              variant='contained'
              style={{
                backgroundColor: '#FA5A16',
                color: '#fff',
                border: 'none',
                padding: '5px 20px',
                borderRadius: '5px',
                marginRight: '10px',
              }}
              onClick={RejectSchedule}
            >
              Decline
            </Button>



            <Button
              onClick={ConfirmSchedule}
              // color='primary'
              style={{
                backgroundColor: '#2561B0',
                // color: '#194378',
                border: 'none',
              }}
              disabled={selectedDate === null}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ProfessionalProposedInterviewModal;

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
            {schedule.interview_date}
          </p>
        </div>
        <Radio
          checked={selectedDate === schedule.id}
          onChange={() => setSelectedDate(schedule.id)}
        />
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
