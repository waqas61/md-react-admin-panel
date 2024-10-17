import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import './Calendar.css';
import axios from 'axios';
import ErrorModal from '../General/ErrorModal';
import { selectUser } from '../../redux/slices/userSlice';
import { selectTimeZone } from '../../redux/slices/userSlice';
import { useSelector } from 'react-redux';


const localizer = momentLocalizer(moment);

let selectedEvents = [];

const commonButtonStyles = {
  backgroundColor: 'transparent',
  border: '1px solid #2561B0',
  color: '#2561B0',
  margin: '2px',
  fontWeight: 'semi-bold',
  borderRadius: '3px',
};


const Cal = ({ postingSchedules, companyName, setSelectedDays, getPostingSchedules }) => {
  const user = useSelector(selectUser);
  // const tz = useSelector(selectTimeZone);
  // const [currentDate, setCurrentDate] = useState(moment());
  const [currentDate, setCurrentDate] = useState(null);
  // const [currentDate, setCurrentDate] = useState(() => {});
  const tz = localStorage.getItem("user_time_zone");

  const lo_user = localStorage.getItem('user');
  const lo_user_ob = JSON.parse(lo_user);

  useEffect(() => {
    selectedEvents = [];
  }, []);


  useEffect(() => {
    if (postingSchedules && postingSchedules.data) {
      // setCurrentDate(moment(postingSchedules.data[0].schedule_date));
      setCurrentDate(moment.utc(postingSchedules.data[0].schedule_date, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone));
      // setCurrentDate(moment(new Date(postingSchedules.data[0].schedule_date).toLocaleString("en", { timeZoneName: "short", timeZone: user.user_time_zone })));
    } else {
      setCurrentDate(moment());
    }
  }, [postingSchedules]);

  useEffect(() => {

  }, [currentDate]);

  let events = [];


  if (postingSchedules && postingSchedules.data) {

    events = postingSchedules.data.map((item, key) => {
      // console.log('ssssssssssssssssssssssssssssssssss === > ', new Date('2024-04-25'), new Date(item.start_time), new Date(moment(item.start_time)));
      // console.log('xxx ==== > ', moment(item.schedule_date).tz(user.user_time_zone).format('DD:MM:YY H:MM Z z'));
      // console.log('ss ==== > ', moment(item.schedule_date).tz(user.user_time_zone).utcOffset(user.time_zone.offset).format('DD:MM:YY H:MM Z z'));
      // console.log('ee ==== > ', moment(item.schedule_date).tz(user.user_time_zone).utcOffset(item.posting.time_zone.offset).format('DD:MM:YY H:MM Z z'));
      // var test = new Date(moment(item.start_time));
      // var start = new Date(item.start_time).toLocaleString("en", { timeZoneName: "short", timeZone: user.user_time_zone });
      // var end = new Date(item.end_time).toLocaleString("en", { timeZoneName: "short", timeZone: user.user_time_zone });
      // var cutoffString = item.start_time; // in utc
      // var utcCutoff = moment.utc(cutoffString, 'YYYYMMDD HH:mm:ss');
      // var displayCutoff = moment.utc(cutoffString, 'YYYYMMDD HH:mm:ss').tz(user.user_time_zone);
      // console.log('utcCutoff:', utcCutoff.format('YYYYMMDD hh:mm:ssa Z')); // => utcCutoff: 20170421 04:30:00pm +00:00
      // console.log('displayCutoffxxxxxxxxxxxx:', displayCutoff.format('YYYYMMDD hh:mm:ssa Z'));
      // console.log('===================================================== ');
      // console.log(item, lo_user_ob.user_time_zone, new Date(moment.utc(item.start_time, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone)));
      // console.log('===================================================== ');

      return {
        title: companyName,
        // start: new Date(item.schedule_date),
        // end: new Date(item.schedule_date),
        // start: new Date(moment(item.start_time).utcOffset(item.posting.time_zone.offset)),
        // end: new Date(moment(item.end_time).utcOffset(item.posting.time_zone.offset)),
        // start: new Date(moment.utc(item.start_time, 'YYYYMMDD HH:mm:ss').tz(user.user_time_zone)),
        // end: new Date(moment.utc(item.end_time, 'YYYYMMDD HH:mm:ss').tz(user.user_time_zone)),
        start: new Date(moment.utc(item.start_time, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone)),
        end: new Date(moment.utc(item.end_time, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone)),
        // start: new Date(item.start_time),
        // end: new Date(item.end_time),
        // 'start': start,
        // 'end': end,
        ...item,
      };
    });
  }

  const formats = {
    weekdayFormat: (date, culture, localizer) =>
      localizer.format(date, 'dddd', culture),
  };

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  return (
    <div className='my-calendar'>
      {currentDate && (
        <>
          <div
            className='d-flex'
            style={{
              gap: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button
              style={{
                border: 'none',
                backgroundColor: 'transparent',
              }}
              onClick={handlePreviousMonth}
            >
              <BsChevronLeft />
            </button>
            <h3
              style={{
                margin: 0,
                color: '#262626',
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              <span className='month-name'>{currentDate.format('MMMM YYYY')}</span>
            </h3>
            <button
              style={{
                border: 'none',
                backgroundColor: 'transparent',
              }}
              onClick={handleNextMonth}
            >
              <BsChevronRight />
            </button>
          </div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor='start'
            endAccessor='end'
            style={{ height: 750 }}
            views={['month']}
            // views={allViews}
            // formats={formats}
            components={{
              event: (eventProps) => (
                <EventComponent
                  companyName={companyName}
                  postingSchedules={postingSchedules}
                  setSelectedDays={setSelectedDays}
                  getPostingSchedules={getPostingSchedules}
                  {...eventProps}
                />
              ),
            }}
            showAllEvents={true}
            toolbar={false}
            date={currentDate.toDate()}
            selectable={false}
          />
        </>
      )}
    </div>
  );
};

const EventComponent = ({ event, setSelectedDays, getPostingSchedules }) => {
  const user = useSelector(selectUser);
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openFailModal, setOpenFailModal] = useState(false);
  const lo_user = localStorage.getItem('user');
  const lo_user_ob = JSON.parse(lo_user);
  const setIsLoadingButton = () => {
    setIsLoading(false);
  };


  useEffect(() => { }, [isSelected]);

  const declineActionEvent = () => {
    setIsLoading2(true);
    axios
      .put(
        `https://api.mddentalstaffing.com/api/v1/postings/applicants/${event.posting_applicants[0].id}/modification`,
        {
          modify_status: 'rejected'
        },

        {
          headers: {
            method: 'PUT',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((res) => {
        setIsLoading2(false);
        getPostingSchedules();
      })
      .catch((res) => {
        setIsLoading2(false);
      });
  };

  const acceptActionEvent = () => {
    setIsLoading(true);
    // axios
    //   .post(
    //     `https://api.mddentalstaffing.com/api/v1/postings/${event.posting.id}/apply`,
    //     {
    //       posting_schedule_ids: [event.posting_applicants[0].posting_schedule_id],
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     setIsLoading(false);
    //     getPostingSchedules();
    //   }).catch((res) => {
    //     setIsLoading(false);
    //   });

    axios
      .put(
        `https://api.mddentalstaffing.com/api/v1/postings/applicants/${event.posting_applicants[0].id}/accept`,
        {
          posting_applicant_id: event.posting_applicants[0].id,
        },
        {
          headers: {
            method: 'PUT',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        getPostingSchedules();
      })
      .catch((res) => {
        setErrorMessage(`Booked Already !`)
        setOpenFailModal(true)
        setIsLoading(false);
      });
  };

  const handleSelectEvent = () => {
    setIsSelected((prevIsSelected) => !prevIsSelected);

    const isEventAlreadySelected = selectedEvents.some(
      (selectedEvent) => selectedEvent.id === event.id
    );
    if (!isEventAlreadySelected) {
      selectedEvents.push(event);
      setSelectedDays([...selectedEvents]);
      // setSelectedDays([event]);
    }
  };

  const handleRemoveEvent = () => {
    setIsSelected((prevIsSelected) => !prevIsSelected);
    const index = selectedEvents.findIndex(
      (selectedEvent) => selectedEvent.id === event.id
    );

    if (index !== -1) {
      selectedEvents.splice(index, 1);
      setSelectedDays([...selectedEvents]);
    }
  };

  const selectedEvent = selectedEvents.some(
    (selectedEvent) => selectedEvent.id === event.id
  );


  const isApplied = event.posting_applicants.length > 0;
  const isCanceled = event.posting_applicants.length > 0 && event.posting_applicants[0].application_status == "cancelled";
  const isApproved = event.posting_applicants.length > 0 && event.posting_applicants[0].application_status == "approved";
  return (
    <>
      {isCanceled ? (
        <></>
      ) : (
        <div
          style={{
            padding: 5,
          }}
        >
          <div
            style={{
              backgroundColor: isApproved ? '#5e65e1' : isApplied ? '#D6FCFF' : 'white',
              // backgroundColor: selectedEvent || isApplied ? '#D6FCFF' :  'white',
              padding: 10,
              borderRadius: '6px',
              color: isApproved ? 'white' : '#262626E5',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              borderTop: '1px solid #1CCBC0',
              borderBottom: '1px solid #1CCBC0',
              borderRight: '1px solid #1CCBC0',
              borderLeft: '7px solid #1CCBC0',
              display: 'flex',
              columnGap: '10px',
            }}
          >
            <div className='t-icon'>
              <p
                style={{
                  // backgroundColor: '#1CCBC0',
                  backgroundColor: isApproved ? 'black' : '#1CCBC0',
                  color: 'white',
                  fontWeight: 'bold',
                  width: '17px',
                  height: '17px',
                  display: 'flex',
                  marginBottom: '0px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                }}
              >
                T
              </p>
            </div>

            <div>
              <strong>{event.title}</strong>
              <p
                style={{
                  margin: 0,
                  marginTop: 5,
                  marginBottom: 2,
                  fontSize: 10,
                  color: isApproved ? 'white' : '#262626E5',
                  fontWeight: 400,
                }}
              >

                {moment.utc(event.start_time, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('hh:mm A')}
                -
                {moment.utc(event.end_time, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('hh:mm A')}
              </p>
              {renderButtons(event, handleRemoveEvent, handleSelectEvent, declineActionEvent, acceptActionEvent, isLoading, isLoading2)}
            </div>
          </div>
        </div>
      )}
      {openFailModal && (
        <ErrorModal
          open={openFailModal}
          handleClose={() => setOpenFailModal(false)}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
};

export default Cal;

const handleActionButton = (event, handleRemoveEvent, handleSelectEvent) => {
  if (selectedEvents.some((selectedEvent) => selectedEvent.id === event.id)) {
    return (
      <button
        style={{
          ...commonButtonStyles,
          backgroundColor: '#2561B0',
          border: 'none',
          color: 'white',
        }}
        onClick={handleRemoveEvent}
      >
        Remove
      </button>
    );
  } else {
    return (
      <button
        style={{
          ...commonButtonStyles,
          backgroundColor: '#2561B0',
          border: 'none',
          color: 'white',
        }}
        onClick={handleSelectEvent}
      >
        Select
      </button>
    );
  }
};

const renderButtons = (event, handleRemoveEvent, handleSelectEvent, declineActionEvent, acceptActionEvent, isLoading, isLoading2) => {
  if (event.posting_applicants.length === 0 && event.is_selected === 0) {
    return handleActionButton(event, handleRemoveEvent, handleSelectEvent);
  } else if (event.posting_applicants.length > 0 && event.is_selected === 1) {
    return <button style={commonButtonStyles}>Cancel</button>;
  } else if (event.posting_applicants.length > 0 && event.posting_applicants[0].is_direct_booking === 1 && event.posting_applicants[0].application_status == 'job_offered') {

    return (
      <>
        <button style={{
          backgroundColor: 'transparent',
          border: '1px solid #2561B0',
          color: '#2561B0',
          margin: '2px',
          fontWeight: 'semi-bold',
          borderRadius: '3px',
          marginLeft: '-20px',
        }}
          onClick={acceptActionEvent}
        >{isLoading ? 'Accepting...' : 'Accept'}</button>

        <button style={{
          backgroundColor: 'red',
          border: '1px solid #f6f6f6',
          color: 'white',
          margin: '2px',
          fontWeight: 'semi-bold',
          borderRadius: '3px',
          marginLeft: '5px',
        }}
          onClick={declineActionEvent}
        >{isLoading2 ? 'Cancelling...' : 'Decline'}</button>

      </>
    );
  } else {
    return <></>;
    // return <button style={commonButtonStyles}></button>;
  }
};
