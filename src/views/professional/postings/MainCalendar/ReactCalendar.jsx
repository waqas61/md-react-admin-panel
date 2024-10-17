import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

import { Grid, Button } from '@mui/material';


import CalendarIcon from '../../../../assets/icons/calendar2.svg';
import ActionsOnThisDayModal from './ActionsOnThisDayModal';

import { selectUser } from '../../../../store/slices/userSlice';


const localizer = momentLocalizer(moment);

const ReactCalendar = ({ data }) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(selectUser);
  const lo_user = localStorage.getItem('user');
  const lo_user_ob = JSON.parse(lo_user);


  const events = data ? data.flatMap((item) => {
    if (item.posting_type === 'permanent') {
      return [
        {
          title: item.title,
          // start: new Date( item.start_date + ' ' + item.posting_meta.start_time ),
          // end: new Date(item.start_date + ' ' + item.posting_meta.end_time),
          // start: new Date(moment(item.start_date + ' ' + item.posting_meta.start_time).utcOffset(item.time_zone.offset)),
          // end: new Date(moment(item.start_date + ' ' + item.posting_meta.end_time).utcOffset(item.time_zone.offset)),
          start: new Date(moment.utc(item.start_time, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone)),
          end: new Date(moment.utc(item.end_time, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone)),

          ...item,
        },
      ];
    } else {
      return item.posting_schedules && item.posting_schedules.length > 0 ? item.posting_schedules.map((schedule) => {
        return {
          title: item.title,
          // start: new Date(schedule.schedule_date + ' ' + schedule.start_time ),
          // end: new Date(schedule.schedule_date + ' ' + schedule.end_time),
          // start: new Date(moment(schedule.schedule_date + ' ' + schedule.start_time).utcOffset(item.time_zone.offset)),
          // end: new Date(moment(schedule.schedule_date + ' ' + schedule.end_time).utcOffset(item.time_zone.offset)),
          // start: new Date(moment(schedule.start_time).utcOffset(item.time_zone.offset)),
          // end: new Date(moment(schedule.end_time).utcOffset(item.time_zone.offset)),
          // start: new Date(moment(schedule.start_time)),
          // end: new Date(moment(schedule.end_time)),

          start: new Date(moment.utc(schedule.start_time, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone)),
          end: new Date(moment.utc(schedule.end_time, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone)),
          ...item,
        };
      }) : [];
    }
  }) : [];

  const groupedEvents = events.reduce((acc, event) => {
    const startDate = moment(event.start).format('YYYY-MM-DD');
    if (!acc[startDate]) {
      acc[startDate] = [];
    }
    acc[startDate].push(event);
    return acc;
  }, {});

  const groupedEventsArray = Object.entries(groupedEvents).map(([date, events]) => {
    return ({
      // start: new Date(moment(date).utcOffset(events[0].time_zone.offset)),
      // end: new Date(moment(date).utcOffset(events[0].time_zone.offset)),
      start: new Date(moment(date)),
      end: new Date(moment(date)),
      groupedEvents: events,
    })
  });

  const getSelectedDateEvents = () => {
    if (selectedDate !== null) {
      const selected_date = moment(selectedDate).format('YYYY-MM-DD');
      const selectedDateEvents = events.filter(
        (event) =>
          moment(event.start).format('YYYY-MM-DD') === selected_date ||
          moment(event.end).format('YYYY-MM-DD') === selected_date
      );
      return selectedDateEvents;
    }
  };

  const formats = {
    weekdayFormat: (date, culture, localizer) =>
      localizer.format(date, 'dddd', culture),
  };

  const handleSelectSlot = (slotInfo) => {
    const { start } = slotInfo;
    setSelectedDate(start);
    setShowModal(true);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  return (
    <div className='my-calendar'>
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
          <IconChevronLeft />
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
          <IconChevronRight />
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={groupedEventsArray}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 950 }}
        views={['month']}
        formats={formats}
        components={{
          event: EventTemplates,
          header: () => null,
        }}
        toolbar={false}
        date={currentDate.toDate()}
        onSelectEvent={handleSelectSlot}
        showAllEvents={true}
      />

      {selectedDate && (
        <ActionsOnThisDayModal
          showModal={showModal}
          selectedDate={selectedDate}
          setShowModal={setShowModal}
          events={getSelectedDateEvents()}
        />
      )}
    </div>
  );
};

export default ReactCalendar;

const EventTemplates = ({ event }) => {
  return (
    <div
      style={{
        height: '100%',
      }}
    >
      {event?.groupedEvents?.length > 1 ? (
        <GroupedEvents event={event} />
      ) : (
        <SingleEvent event={event.groupedEvents[0]} />
      )}
    </div>
  );
};

const SingleEvent = ({ event }) => {


  const user = useSelector(selectUser);
  const title = event.title.length > 10 ? event.title.substring(0, 10) + '...' : event.title;
  const scheduleDate = moment(event.start_date).format('YYYY-MM-DD');
  const schedule = event?.posting_schedules.find(
    (schedule) => schedule.schedule_date === scheduleDate
  );


  return (
    <div
      style={{
        padding: event.posting_type === 'temporary' ? 8 : 0,
        height: '100%',
      }}
    >
      <div
        style={{
          backgroundColor: event.posting_type === 'temporary' ? '#D6FCFF' : '#FFECEF',
          padding: 6,
          borderRadius: 4,
          color: '#262626E5',
          fontSize: 12,
          fontWeight: 500,
          cursor: 'pointer',
          borderTop: event.posting_type === 'temporary' ? '1px solid #1CCBC0' : '1px solid #E46F85',
          borderBottom: event.posting_type === 'temporary' ? '1px solid #1CCBC0' : '1px solid #E46F85',
          borderRight: event.posting_type === 'temporary' ? '1px solid #1CCBC0' : '4px solid #E46F85',
          borderLeft: event.posting_type === 'temporary' ? '4px solid #1CCBC0' : '4px solid #E46F85',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <div>
            <span
              style={{
                backgroundColor: event.posting_type === 'temporary' ? '#1CCBC0' : '#E46F85',
                borderRadius: '50%',
                padding: '2px 5px',
                color: '#FFFFFF',
                fontSize: 10,
                fontWeight: 500,
              }}
            >
              {event.posting_type === 'temporary' ? 'T' : 'P'}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}
          >
            <div>
              <strong>{event.company_name}</strong>
              <p
                style={{
                  margin: 0,
                  fontSize: 10,
                  color: '#262626E5',
                  fontWeight: 400,
                }}
              >
                {title}
              </p>
            </div>
            {event.posting_type === 'temporary' && (
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 10,
                    color: '#262626',
                    fontWeight: 400,
                  }}
                >
                  {moment.utc(schedule.start_time, 'YYYYMMDD HH:mm:ss').tz(user.time_zone.time_zone).format('hh:mm A')}
                  -
                  {moment.utc(schedule.end_time, 'YYYYMMDD HH:mm:ss').tz(user.time_zone.time_zone).format('hh:mm A')}
                </p>
                <div>

                  <Button
                    variant='outline-warning'
                    size='sm'
                    style={{
                      border: '1px solid #2561B0',
                      fontSize: 10,
                      fontWeight: 500,
                      margin: '2px',
                      color: '#2561B0',
                      padding: '2px 6px',
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {event.posting_type === 'permanent' && (
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: '#E46F85',
                  fontWeight: 500,
                }}
              >
                Permanent Job
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const GroupedEvents = ({ event }) => {
  const user = useSelector(selectUser);
  const lo_user = localStorage.getItem('user');
  const lo_user_ob = JSON.parse(lo_user);

  return (
    <div
      style={{
        color: '#262626',
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 10,
          fontWeight: 400,
        }}
      >
        {event.groupedEvents.length} Job(s) on this day:{' '}
      </p>
      <div
        className='d-flex'
        style={{
          gap: 10,
        }}
      >
        {event.groupedEvents.slice(0, 3).map((item) => {

          const companyInitials = item.company_name == '--Hidden--' ? '****' : item.company_name.split(' ').map((word) => word[0]).join('');
          const start_date_time = item?.posting_schedules.find(
            (schedule) => schedule.schedule_date === moment(item.start).format('YYYY-MM-DD')
          );
          const end_date_time = item?.posting_schedules.find(
            (schedule) => schedule.schedule_date === moment(item.end).format('YYYY-MM-DD')
          );

          return (
            <>
              impelement and overlay later
            </>
          );

          // return (
          //   <OverlayTrigger
          //     trigger={['hover', 'focus']}
          //     placement='left'
          //     overlay={
          //       <Popover
          //         id='popover-basic'
          //         style={{
          //           backgroundColor: item.posting_type === 'temporary' ? '#1CCBC0' : '#E46F85',
          //           color: 'white',
          //         }}
          //       >
          //         <Popover.Body
          //           style={{
          //             color: 'white',
          //           }}
          //         >
          //           <div>
          //             <span
          //               style={{
          //                 backgroundColor: item.posting_type === 'temporary' ? '#D6FCFF' : '#FFECEF',
          //                 borderRadius: '50%',
          //                 padding: '2px 5px',
          //                 color: '#000',
          //                 fontSize: 10,
          //                 fontWeight: 500,
          //                 marginRight: 5,
          //               }}
          //             >
          //               {item.posting_type === 'temporary' ? 'T' : 'P'}
          //             </span>
          //             <span>
          //               {item.posting_type === 'temporary' ? 'Temporary Job' : 'Permanent Job'}
          //             </span>
          //           </div>
          //           <div>
          //             <strong>{item.company_name}</strong>
          //             <p>
          //               {item.title.length > 10 ? item.title.substring(0, 10) + '...' : item.title}
          //             </p>
          //           </div>
          //           {item.posting_type === 'temporary' && (
          //             <>
          //               <hr />
          //               <div
          //                 style={{
          //                   display: 'flex',
          //                   alignItems: 'center',
          //                   gap: 10,
          //                 }}
          //               >
          //                 <img src={CalendarIcon} alt='' />
          //                 <span>
          //                   {moment.utc(start_date_time.start_time, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('hh:mm A')}
          //                   -{' '}
          //                   {moment.utc(start_date_time.end_time, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('hh:mm A')}
          //                 </span>
          //               </div>
          //             </>
          //           )}
          //         </Popover.Body>
          //       </Popover>
          //     }
          //   >
          //     <div
          //       style={{
          //         backgroundColor: item.posting_type === 'temporary' ? '#D6FCFF' : '#FFECEF',
          //         padding: 10,
          //         borderRadius: 4,
          //         color: '#262626E5',
          //         fontSize: 12,
          //         fontWeight: 500,
          //         cursor: 'pointer',
          //         borderTop: item.posting_type === 'temporary' ? '1px solid #1CCBC0' : '1px solid #E46F85',
          //         borderBottom: item.posting_type === 'temporary' ? '1px solid #1CCBC0' : '1px solid #E46F85',
          //         borderRight: item.posting_type === 'temporary' ? '1px solid #1CCBC0' : '4px solid #E46F85',
          //         borderLeft: item.posting_type === 'temporary' ? '4px solid #1CCBC0' : '4px solid #E46F85',
          //       }}
          //     >
          //       <p
          //         style={{
          //           margin: 0,
          //           fontSize: 12,
          //           fontWeight: 500,
          //         }}
          //       >
          //         {companyInitials.toUpperCase()}
          //       </p>
          //     </div>
          //   </OverlayTrigger>
          // );
        })}
      </div>
      <div>
        <Button
          variant='primary'
          size='sm'
          style={{
            backgroundColor: '#2561B0',
            border: '1px solid #21589F',
            fontSize: 10,
            fontWeight: 500,
            color: '#FFFFFF',
            padding: '2px 6px',
          }}
        >
          View
        </Button>
      </div>
    </div>
  );
};

// const CustomPopover = ({ item }) => {
//   const popoverStyle = {
//     backgroundColor: item.posting_type === 'temporary' ? '#1CCBC0' : '#E46F85',
//     color: 'white',
//   };

//   return (
//     <Popover id='popover-basic' style={popoverStyle}>
//       <Popover.Body>
//         And here's some <strong>amazing</strong> content. It's very engaging,
//         right?
//       </Popover.Body>
//     </Popover>
//   );
// };
