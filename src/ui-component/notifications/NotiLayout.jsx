import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@mui/styles'
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Divider from '@mui/material/Divider';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

import { selectUser } from '../../store/slices/userSlice';
import {
  setNotification,
  addNotification,
  getNotificationsStatus,
  fetchNotifications,
  selectAllNotifications
} from '../../store/slices/notificationSlice';


const Timer = ({ timeLeft }) => {

  const [timer, setTimer] = useState(timeLeft);

  const timerToString = () => {
    let hours = ('0' + Math.floor(timer / 3600)).slice(-2);
    let minutes = ('0' + Math.floor(timer % 3600 / 60)).slice(-2);
    let seconds = ('0' + Math.floor(timer % 3600 % 60)).slice(-2);
    // return hours + ":" + minutes + ":" + seconds;
    return minutes + ":" + seconds;
  }
  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000)
    }
  }, [timer]);

  return (
    <div>
      <p>{timerToString()}<HistoryOutlinedIcon color={'sYellow'} /></p>
    </div>
  );
}

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    drawer: {
      width: 340,
      flexShrink: 0,
    },
    drawerPaper: {
      padding: theme.spacing(2),
      width: 340,
    },
    heading: {
      margin: theme.spacing(2),
    },
    specialtyBox: {
      margin: theme.spacing(1),
    },
    ratingBox: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      minWidth: '100%',
    }
  };
});


const DirectBookingNotification = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  const posting = notification.notificationable.posting_type;
  const navigate = useNavigate();
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: posting === 'temporary' ? '#1CCBC0' : '#c1e0c2',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        <p>Direct Booking</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#595959',
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: serverString }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <button
            style={{
              backgroundColor: '#2561B0',
              color: '#fff',
              border: 'none',
              padding: '5px 20px',
              borderRadius: '6px',
              margin: '2px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px',
            }}

            onClick={() => {

              if (posting == 'temporary') {
                navigate(
                  `/professional/jobs/temporary/${notification.notificationable_id}/calendar/`
                )
                navigate(0);
              } else {
                navigate(
                  `/professional/jobs/permanent`
                )
                navigate(0);
              }

            }}
          >
            View Posting
            {/* Show Request */}
          </button>
        </div>
      </div>
    </div>
  );
};

const DirectBookingInvitation = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  const posting = notification.notificationable.posting_type;
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: posting === 'temporary' ? '#1CCBC0' : '#E46F85',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        <p>Direct Booking</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#595959',
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: serverString }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <button
            style={{
              backgroundColor: '#2561B0',
              color: '#fff',
              border: 'none',
              padding: '5px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px',
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

const Applied = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  const navigate = useNavigate();
  const posting = notification.notificationable.posting_type;
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#FFC400',
          color: 'black',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>Applied Posting</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            fontSize: '12px',
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '14px',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: serverString }} />


        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <button
            style={{
              backgroundColor: '#2561B0',
              color: '#fff',
              border: 'none',
              padding: '5px 20px',
              borderRadius: '6px',
              margin: '2px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px',
            }}

            onClick={() => {
              if (posting == 'permanent') {
                navigate(
                  `/owner/postings/permanent/applicants/${notification.notificationable.id}`
                )
              } else {

              }
              // navigate(0);
            }}
          >
            View Posting
            {/* Post Applicant */}
          </button>
        </div>


      </div>
    </div>
  );
};

const AppliedPosting = ({ key, notification, currentUser }) => {

  const [timer, setTimer] = useState(() => {
    var startTime = moment(notification.updated_at).tz("America/Los_Angeles");
    var now = moment().tz("America/Los_Angeles");
    var diff_mins = now.diff(startTime, 'minutes');
    var diff_sec = now.diff(startTime, 'seconds');
    var time_left = 600 - diff_sec;
    if (time_left > 0) {
      return time_left;
    } else {
      return 0;
    }
  });

  const serverString = notification.body;
  const navigate = useNavigate();
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor:
            notification.notificationable && notification.notificationable.posting_type === 'temporary'
              ? '#FA5A16'
              : '#E46F85',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        <p>Applied Posting</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p style={{ color: '#FA5A16', fontSize: '14px' }}>
          You have 10 mins to book.
        </p>
        <div
          style={{
            fontSize: '14px',
            color: '#595959',
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: serverString }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <button
            style={{
              backgroundColor: '#2561B0',
              color: '#fff',
              border: 'none',
              padding: '5px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px',
            }}

            onClick={() => {
              navigate(
                `/owner/postings/temporary/${notification.notificationable_id}`
              )
            }}

          >
            Book
          </button>
        </div>
        <Divider />
        <div
          style={{
            borderRadius: '6px 6px 0px 0px',
            display: 'flex',
            marginTop: '5px',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
          }}
        >
          <p>Time Left :</p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
            }}
          >
            <p><Timer timeLeft={timer} /></p>
            {/* <p>{timerToString()}<HistoryOutlinedIcon color={'sYellow'} /></p> */}
          </div>
        </div>
      </div>
    </div >
  );
};

const StatusPosting = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  const navigate = useNavigate();
  const color = notification.notificationable.applicant_status == 'rejected' ? '#FA5A16' : '#E46F85';
  const posting = notification.notificationable.posting_type;
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor:
            notification.notificationable.posting_type === 'temporary'
              ? color
              : color,
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        <p>Posting Status</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >

          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#595959',
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: serverString }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          {/* Will take the Professional on posting */}
          <button
            style={{
              backgroundColor: '#2561B0',
              color: '#fff',
              border: 'none',
              padding: '5px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px',
            }}
            onClick={() => {

              if (currentUser.role_type == 'owner') {

                if (posting == 'permanent') {

                  navigate(
                    // `/professional/jobs/${notification.notificationable.posting_type}/${notification.notificationable.posting_id}`
                    // `/owner/postings/${notification.notificationable.posting_type}/${notification.notificationable.posting_id}`
                    `/owner/postings/permanent/applicants/${notification.notificationable.posting_id}`
                  )
                } else {
                  navigate(
                    // `/professional/jobs/${notification.notificationable.posting_type}/${notification.notificationable.posting_id}`
                    `/owner/postings/${notification.notificationable.posting_type}/${notification.notificationable.posting_id}`
                    // `/owner/postings/permanent/applicants/${notification.notificationable.posting_id}`
                  )
                }

              } else {
                navigate(
                  `/professional/jobs/${notification.notificationable.posting_type}/${notification.notificationable.posting_id}`
                  // `/owner/postings/${notification.notificationable.posting_type}/${notification.notificationable.posting_id}`
                )
              }
            }}
          >
            View Posting
          </button>
        </div>
      </div>
    </div >
  );
};


const ScheduleInterview = ({ key, notification, currentUser }) => {

  const navigate = useNavigate();
  const serverString = notification.body;

  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#1CCBC0',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        <p>Interview Schedule </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#595959',
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: serverString }}
        />




        {notification.notificationable.interview_status != 'scheduled' ? (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '1rem',
              }}
            >
              <button
                style={{
                  backgroundColor: '#2561B0',
                  color: '#fff',
                  border: 'none',
                  padding: '5px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '14px',
                }}
                onClick={() => {
                  navigate(
                    `/professional/jobs/permanent/${notification.notificationable.posting_id}/interviews`
                  )
                }}
              >
                View Schedule
                {/* Accept Interview */}
              </button>
            </div>
          </>
        ) : (
          <></>
        )}


      </div>
    </div>
  );
};

const ScheduleSuggested = ({ key, notification, currentUser }) => {

  const navigate = useNavigate();
  const serverString = notification.body;

  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#1CCBC0',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        <p>Schedules Suggested</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#595959',
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: serverString }}
        />
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1rem',
            }}
          >
            <button
              style={{
                backgroundColor: '#2561B0',
                color: '#fff',
                border: 'none',
                padding: '5px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                width: '100%',
                fontSize: '14px',
              }}
              onClick={() => {
                navigate(
                  `/owner/postings/permanent/applicant/interview/details/${notification.notificationable.posting_id}/applicants/${notification.notificationable.posting_applicant_id}/schedule`
                )
              }}
            >
              View Schedule
              {/* Accept Interview */}
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

const AcceptedInterview = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  const navigate = useNavigate();
  const posting = notification.notificationable.posting_type;
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#1CCBC0',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        <p>Interview Accepted</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#595959',
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: serverString }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <button
            style={{
              backgroundColor: '#2561B0',
              color: '#fff',
              border: 'none',
              padding: '5px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px',
            }}


            onClick={() => {
              navigate(
                // `/owner/postings/permanent/applicants/${notification.notificationable.posting_id}`
                `/owner/postings/permanent/applicant/interview/details/${notification.notificationable.posting_id}/applicants/${notification.notificationable.posting_applicant_id}/schedule`
              )
            }}

          >
            View Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

const InterviewCanceled = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  const navigate = useNavigate();
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#1CCBC0',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        <p>Interview Canceled</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#595959',
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: serverString }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          {/* Will take the Professional on posting */}
          <button
            style={{
              backgroundColor: '#2561B0',
              color: '#fff',
              border: 'none',
              padding: '5px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px',
            }}
            onClick={() => {
              navigate(
                `/professional/jobs/permanent/${notification.notificationable.posting_id}/interviews`
              )
            }}
          >
            View Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

const StatusInterview = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#1CCBC0',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        <p>Interview Status</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#595959',
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: serverString }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <button
            style={{
              backgroundColor: '#2561B0',
              color: '#fff',
              border: 'none',
              padding: '5px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px',
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

const InterviewPassed = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  const navigate = useNavigate();
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#1CCBC0',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        <p>Status Interview</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#595959',
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: serverString }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <button
            style={{
              backgroundColor: '#2561B0',
              color: '#fff',
              border: 'none',
              padding: '5px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px',
            }}

            onClick={() => {
              navigate(
                `/professional/jobs/permanent/${notification.notificationable.posting_id}/interviews`
              )
            }}

          >
            View Posting
          </button>
        </div>
      </div>
    </div>
  );
};


const ProposalAccepted = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  const navigate = useNavigate();
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#1CCBC0',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        <p>Proposal</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#595959',
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: serverString }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <button
            style={{
              backgroundColor: '#2561B0',
              color: '#fff',
              border: 'none',
              padding: '5px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px',
            }}

            onClick={() => {
              navigate(
                `/owner/postings/permanent/applicants/${notification.notificationable.posting_id}`
              )
            }}
          >
            View Propsal
          </button>
        </div>
      </div>
    </div>
  );
};

const Proposal = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  const navigate = useNavigate();
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#1CCBC0',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        <p>Proposal</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#595959',
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: serverString }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <button
            style={{
              backgroundColor: '#2561B0',
              color: '#fff',
              border: 'none',
              padding: '5px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px',
            }}

            onClick={() => {
              navigate(
                `/professional/jobs/permanent/proposal/post/${notification.notificationable.posting_id}`
              )
            }}
          >
            View Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

const ProposalDeclined = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  const navigate = useNavigate();
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#1CCBC0',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        <p>Proposal</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#595959',
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: serverString }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <button
            style={{
              backgroundColor: '#2561B0',
              color: '#fff',
              border: 'none',
              padding: '5px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px',
            }}

            onClick={() => {
              navigate(
                `/owner/postings/permanent/applicants/${notification.notificationable.posting_id}`
              )
            }}
          >
            View Propsal
          </button>
        </div>
      </div>
    </div>
  );
};

const TimerCheckIn = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#1CCBC0',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        <p>Timer Check In</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#595959',
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: serverString }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <button
            style={{
              backgroundColor: '#2561B0',
              color: '#fff',
              border: 'none',
              padding: '5px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px',
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

const PostTimerCheckIn = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#1CCBC0',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        <p>Post Timer Check In</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#595959',
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: serverString }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <button
            style={{
              backgroundColor: '#2561B0',
              color: '#fff',
              border: 'none',
              padding: '5px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px',
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

const CancelledJobProfessional = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  const posting = 'temporary';
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: posting === 'temporary' ? '#1CCBC0' : '#E46F85',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>Cancelled Job</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            fontSize: '12px',
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '14px',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: serverString }} />
      </div>
    </div>
  );
};

const CancelledJobPracticeOwner = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  const posting = 'temporary';
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: posting === 'temporary' ? '#1CCBC0' : '#E46F85',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>Cancelled Job</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            fontSize: '12px',
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '14px',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: serverString }} />
      </div>
    </div>
  );
};

const DefaultNotification = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#1CCBC0',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* <p>Default Notification</p> */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            fontSize: '12px',
          }}
        >
          <p>..{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('hh:mm A')}</p>
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '14px',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: serverString }} />
      </div>
    </div>
  );
};


const TextPracticeOwner = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#E46F85',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>Text Practice Owner</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            fontSize: '12px',
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '14px',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: serverString }} />
      </div>
    </div>
  );
};

const TextProfessional = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#E46F85',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>Text Professional</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            fontSize: '12px',
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '14px',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: serverString }} />
      </div>
    </div>
  );
};


const DeclinedTransaction = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#E46F85',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>Declined Transaction</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            fontSize: '12px',
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '14px',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: serverString }} />
      </div>
    </div>
  );
};

const ProcessedTransaction = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#1CCBC0',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>Processed Transaction</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            fontSize: '12px',
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '14px',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: serverString }} />
      </div>
    </div>
  );
};


const RatingByPracticeOwner = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#1CCBC0',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>Rating By Practice Owner</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            fontSize: '12px',
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '14px',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: serverString }} />
      </div>
    </div>
  );
};

const RatingByProfessional = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#1CCBC0',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>Rating By Professional</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            fontSize: '12px',
          }}
        >
          {moment(notification.created_at).diff(moment(), 'days') < 0 ? (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format('MM/DD/YY hh:mm A')}</p>
          ) : (
            <p>{moment.utc(notification.created_at, 'YYYYMMDD HH:mm:ss').tz(currentUser.user_time_zone).format(' hh:mm A')}</p>
          )}
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '14px',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: serverString }} />
      </div>
    </div>
  );
};


const AlertTriggerTimerCheckin = ({ key, notification, currentUser }) => {
  const serverString = notification.body;
  return (
    <div
      style={{
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
      key={key}
    >
      <div
        style={{
          backgroundColor: '#E46F85',
          color: '#fff',
          borderRadius: '6px 6px 0px 0px',
          padding: '3px 10px',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>Alert Trigger Timer Checkin</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            fontSize: '12px',
          }}
        ></div>
      </div>

      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '14px',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: serverString }} />
      </div>
    </div>
  );
};


const NotiLayout = ({ notifications }) => {
  const currentUser = useSelector(selectUser);
  const classes = useStyles();
  const theme = useTheme();

  const ListItemWrapper = ({ children }) => {
    return (
      <Box
        sx={{
          // p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'primary.light'
          }
        }}
      >
        {children}
      </Box>
    );
  };

  const items = (notification) => {
    console.log(notification);
    switch (notification.type) {
      case 'applied':
        return <Applied key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'direct_booking':
        return <DirectBookingNotification key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'direct_booking_invitation':
        return <DirectBookingInvitation key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'applied_posting':
        return <AppliedPosting key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'status_posting':
        return <StatusPosting key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'schedule_suggested':
        return <ScheduleSuggested key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'schedule_interview':
        return <ScheduleInterview key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'accepted_interview':
        return <AcceptedInterview key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'interview_canceled':
        return <InterviewCanceled key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'interview_passed':
        return <InterviewPassed key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'status_interview':
        return <StatusInterview key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'proposal':
        return <Proposal key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'proposal_accepted':
        return <ProposalAccepted key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'proposal_declined':
        return <ProposalDeclined key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'timer_checkin':
        return <TimerCheckIn key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'post_timer_checkin':
        return <PostTimerCheckIn key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'cancelled_job_professional':
        return <CancelledJobProfessional key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'cancelled_job_practice_owner':
        return <CancelledJobPracticeOwner key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'text_practice_owner':
        return <TextPracticeOwner key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'text_professional':
        return <TextProfessional key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'declined_transaction':
        return <DeclinedTransaction key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'processed_transaction':
        return <ProcessedTransaction key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'rating_by_practice_owner':
        return <RatingByPracticeOwner key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'rating_by_professional':
        return <RatingByProfessional key={notification.id} notification={notification} currentUser={currentUser} />;
      case 'alert_trigger_timer_checkin':
        return <AlertTriggerTimerCheckin key={notification.id} notification={notification} currentUser={currentUser} />;
      default:
        return <DefaultNotification key={notification.id} notification={notification} currentUser={currentUser} />;
    }
  };

  ListItemWrapper.propTypes = {
    children: PropTypes.node
  };
  return (
    <>
      <List
        sx={{
          width: '100%',
          maxWidth: 330,
          // py: 0,
          borderRadius: '10px',
          [theme.breakpoints.down('md')]: {
            maxWidth: 300
          },
          '& .MuiListItemSecondaryAction-root': {
            top: 22
          },
          '& .MuiDivider-root': {
            my: 0
          },
          '& .list-container': {
            pl: 7
          }
        }}
      >
        {notifications?.map((notification) => {

          return (
            <>
              <ListItemWrapper>
                <ListItem alignItems="center">
                  {items(notification)}
                </ListItem>
              </ListItemWrapper>
            </>
          );

        })}
      </List>
    </>
  );
}

export default NotiLayout;
