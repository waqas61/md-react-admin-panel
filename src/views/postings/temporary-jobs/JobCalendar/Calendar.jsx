import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import moment from 'moment';
import { useCallback } from 'react';
import ManageThisDayModal from './ManageThisDayModal';
import { truncate } from '../../../../../utils/helper';
import { Avatar, AvatarGroup } from '@mui/material';

const localizer = momentLocalizer(moment);

const ScheduleCalendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);


  // console.log("Calander events", events);

  const formats = {
    weekdayFormat: (date, culture, localizer) =>
      localizer.format(date, 'dddd', culture),
  };

  const getSelectedDateEvents = () => {
    if (selectedDate !== null) {
      const selectedDateEvents = events.filter((event) => {
        return (
          moment(event.start).format('YYYY-MM-DD') ===
          moment(selectedDate).format('YYYY-MM-DD')
        );
      });

      const selectedDateEventsArray = selectedDateEvents.map((event) => {
        return event.events;
      });

      return selectedDateEventsArray.flat();
    }
  };

  const onSelectSlot = useCallback((slotInfo) => {
    const { start } = slotInfo;
    setSelectedDate(start);
    setShowModal(true);
  }, []);

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
        selectable={true}
        events={events}
        localizer={localizer}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 850 }}
        views={['month']}
        formats={formats}
        toolbar={false}
        date={currentDate.toDate()}
        onSelectEvent={onSelectSlot}
        onSelectSlot={onSelectSlot}
        elementProps={{ style: { height: '100%' } }}
        components={{
          event: EventTemplate,
        }}
      />

      {selectedDate && (
        <ManageThisDayModal
          showModal={showModal}
          selectedDate={selectedDate}
          setShowModal={setShowModal}
          handleCloseModal={handleCloseModal}
          selectedDateEvents={getSelectedDateEvents()}
          events={events}
        />
      )}
    </div>
  );
};

export default ScheduleCalendar;

const EventTemplate = ({ event }) => {
  return (
    <div
      style={{
        height: '100%',
        margin: '0 7px',
      }}
    >
      {event?.events?.length > 1 ? (
        <>
          {event.events.length === 2 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <SingleEvent event={event.events[0]} />
              <SingleEvent event={event.events[1]} />
            </div>
          ) : (
            <GroupedEvents event={event} />
          )}
        </>
      ) : (
        <SingleEvent event={event.events[0]} />
      )}
    </div>
  );
};

const GroupedEvents = ({ event }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 400,
          color: '#262626',
        }}
      >
        {event.title}
      </p>
      <UserImages event={event} />
    </div>
  );
};

const SingleEvent = ({ event }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '5px',
        padding: '3px 6px',
        backgroundColor: '#E3EFFF',
        borderRadius: 6,
        border: '1px solid #4D80CC',
        borderLeft: '4px solid #4D80CC',
      }}
    >
      <img
        style={{
          width: 25,
          height: 25,
          borderRadius: '50%',
        }}
        src={event.applicant.user.avatar ? `https://api.mddentalstaffing.com/api/v1/assets/${event.applicant.user.avatar}` : 'https://via.placeholder.com/150'}
        alt=''
      />
      <div>
        <p
          style={{
            fontSize: 10,
            fontWeight: 500,
            color: '#262626',
            margin: 0,
          }}
        >
          {event.applicant.user.first_name} {event.applicant.user.last_name}
        </p>
        <p
          style={{
            fontSize: 10,
            fontWeight: 300,
            color: '#262626',
            margin: 0,
          }}
        >
          {truncate(event.posting.title, 16)}
        </p>
      </div>
    </div>
  );
};

const UserImages = ({ event }) => {
  const remainingUsers = event.events.length - 3;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <AvatarGroup max={3}>
        {event.events.slice(0, 3).map((event, index) => (
          <Avatar
            alt={event.applicant.user.first_name}
            src={event.applicant.user.avatar ? `https://api.mddentalstaffing.com/api/v1/assets/${event.applicant.user.avatar}` : 'https://via.placeholder.com/150'}
            key={index}
            style={{
              width: 25,
              height: 25,
              borderRadius: '50%',
            }}
          />
        ))}
      </AvatarGroup>
      {remainingUsers > 0 && (
        <div
          style={{
            color: '#4A93F0',
            fontSize: 10,
            fontWeight: 400,
          }}
        >
          +{remainingUsers} Professionals
        </div>
      )}
    </div>
  );
};
