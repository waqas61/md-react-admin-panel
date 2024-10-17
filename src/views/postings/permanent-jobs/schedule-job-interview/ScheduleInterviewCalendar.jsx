import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
// import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import moment from "moment";
import ManageThisDayModal from "./ManageThisDayModal";
import { useCallback } from "react";


import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ScheduleInterviewCalendar = ({
  applicant,
  posting,
  interviewsArray,
  setInterviewsArray,
  setInterviewsCount,
  interviewsCount,
  events,
  setEvents,
}) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const formats = {
    weekdayFormat: (date, culture, localizer) =>
      localizer.format(date, "dddd", culture),
  };

  const getSelectedDateEvents = () => {
    if (selectedDate !== null) {
      const selectedDateEvents = events.filter((event) => {
        return (
          moment(event.start).format("YYYY-MM-DD") ===
          moment(selectedDate).format("YYYY-MM-DD")
        );
      });

      const selectedDateEventsArray = selectedDateEvents.map((event) => {
        return event.events;
      });

      return selectedDateEventsArray.flat();
    }
  };

  const deleteSelectedEvent = (index) => {
    if (selectedDate !== null) {
      const updatedEvents = [...events]; // Create a shallow copy of the events array

      const selectedDateEventsIndex = updatedEvents.findIndex((event) => {
        return (
          moment(event.start).format("YYYY-MM-DD") ===
          moment(selectedDate).format("YYYY-MM-DD")
        );
      });

      if (selectedDateEventsIndex !== -1) {
        setInterviewsCount((prevCounts) => ({
          ...prevCounts,
          [updatedEvents[selectedDateEventsIndex].events[index]?.type]:
            prevCounts[
            updatedEvents[selectedDateEventsIndex].events[index]?.type
            ] - 1,
        }));

        updatedEvents[selectedDateEventsIndex].events.splice(index, 1);

        if (updatedEvents[selectedDateEventsIndex].events?.length === 0)
          updatedEvents.splice(selectedDateEventsIndex, 1);
        else
          updatedEvents[selectedDateEventsIndex].title =
            updatedEvents[selectedDateEventsIndex].events?.length +
            " Interview(s) on this day";

        setEvents(updatedEvents);
      }
    }
  };

  const onSelectSlot = useCallback((slotInfo) => {
    const { start } = slotInfo;
    setSelectedDate(start);
    setShowModal(true);
  }, []);

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, "month"));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="my-calendar">
      <div
        className="d-flex"
        style={{
          gap: 25,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
          }}
          onClick={handlePreviousMonth}
        >
          <IconChevronLeft />
        </button>
        <h3
          style={{
            margin: 0,
            color: "#262626",
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          <span className="month-name">{currentDate.format("MMMM YYYY")}</span>
        </h3>
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
          }}
          onClick={handleNextMonth}
        >
          <IconChevronRight />
        </button>
      </div>
      <Calendar
        selectable={true}
        events={events}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        views={["month"]}
        formats={formats}
        toolbar={false}
        date={currentDate.toDate()}
        onSelectEvent={onSelectSlot}
        onSelectSlot={onSelectSlot}
        elementProps={{ style: { height: "100%" } }}
        components={{
          event: InterviewEventTemplate,
        }}
      />

      {selectedDate && (
        <ManageThisDayModal
          showModal={showModal}
          selectedDate={selectedDate}
          setShowModal={setShowModal}
          handleCloseModal={handleCloseModal}
          applicant={applicant}
          posting={posting}
          interviewsArray={interviewsArray}
          setInterviewsArray={setInterviewsArray}
          deleteSelectedEvent={deleteSelectedEvent}
          setInterviewsCount={setInterviewsCount}
          interviewsCount={interviewsCount}
          selectedDateEvents={getSelectedDateEvents()}
          setEvents={setEvents}
          events={events}
        />
      )}
    </div>
  );
};

export default ScheduleInterviewCalendar;

const InterviewEventTemplate = ({ event }) => {
  return (
    <div
      style={{
        height: "100%",
      }}
    >
      {event?.events?.length > 1 ? (
        <GroupedEvents event={event} title={event.title} />
      ) : (
        <SingleEvent event={event.events[0]} title={event.title} />
      )}
    </div>
  );
};

const GroupedEvents = ({ event, title }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        padding: "10px",
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 400,
          color: "#262626",
        }}
      >
        {title}
      </p>
      <UserImages event={event} />
    </div>
  );
};

const SingleEvent = ({ event, title }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        padding: "10px",
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 400,
          color: "#262626",
        }}
      >
        {title}
      </p>
      <img
        style={{
          width: 25,
          height: 25,
          borderRadius: "50%",
        }}
        src={event?.interview.applicant?.avatar ? `https://api.mddentalstaffing.com/api/v1/assets/${event?.interview.applicant?.avatar}` : 'https://via.placeholder.com/150'}
        alt=""
      />
    </div>
  );
};

const UserImages = ({ event }) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {event.events.slice(0, 3).map((event, index) => (
        <img
          key={index}
          style={{
            width: 25,
            height: 25,
            borderRadius: "50%",
          }}
          // src={event.interview.applicant?.profile_photo_path}
          src={event?.interview.applicant?.avatar ? `https://api.mddentalstaffing.com/api/v1/assets/${event?.interview.applicant?.avatar}` : 'https://via.placeholder.com/150'}
          alt=""
        />
      ))}
      {event.events.length > 3 && (
        <div
          style={{
            width: 25,
            height: 25,
            borderRadius: "50%",
            backgroundColor: "#E8E8E8",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 400,
              color: "#000",
            }}
          >
            +{event.events.length - 3}
          </p>
        </div>
      )}
    </div>
  );
};
