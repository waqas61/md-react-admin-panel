import React from 'react';

import Modal from '@mui/material/Modal';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './ActionsOnThisDayModal.css';

const localizer = momentLocalizer(moment);

const ActionsOnThisDayModal = ({
  showModal,
  setShowModal,
  selectedDate,
  events,
}) => {
  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}


      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            color: '#262626',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontSize: '20px',
              fontWeight: 500,
              marginBottom: '0',
            }}
          >
            Actions On This Day
          </p>
          <p
            style={{
              fontSize: '16px',
              fontWeight: 400,
              marginBottom: '0',
              marginRight: '30px',
            }}
          >
            {moment(selectedDate).format('MMMM D (dddd)')}
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor='start'
          endAccessor='end'
          view='day'
          date={selectedDate}
          style={{ height: 500 }}
          toolbar={false}
          components={{
            event: EventComponent,
          }}
          dayLayoutAlgorithm={'no-overlap'}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ActionsOnThisDayModal;

const EventComponent = ({ event }) => {
  return (
    <div
      style={{
        backgroundColor:
          event.posting_type === 'temporary' ? '#D6FCFF' : '#FFECEF',
        color: '#000',
        borderTop:
          event.posting_type === 'temporary'
            ? '1px solid #1CCBC0'
            : '1px solid #E46F85',
        borderBottom:
          event.posting_type === 'temporary'
            ? '1px solid #1CCBC0'
            : '1px solid #E46F85',
        borderRight:
          event.posting_type === 'temporary'
            ? '1px solid #1CCBC0'
            : '4px solid #E46F85',
        borderLeft:
          event.posting_type === 'temporary'
            ? '4px solid #1CCBC0'
            : '4px solid #E46F85',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        gap: '8px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '300px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <div>
          <span
            style={{
              backgroundColor:
                event.posting_type === 'temporary' ? '#1CCBC0' : '#E46F85',
              borderRadius: '50%',
              padding: '2px 5px',
              color: '#FFFFFF',
              fontSize: 10,
              fontWeight: 500,
            }}
          >
            {event.posting_type === 'temporary' ? 'T' : 'P'}
          </span>{' '}
        </div>
        <div>
          {/* <strong>{event.user.companies[0].name}</strong> */}
          <strong>{event.company_name}</strong>

          <div>{event.title}</div>
        </div>
      </div>

      <div>
        {moment(event.start).format('hh:mm A')} -{' '}
        {moment(event.end).format('hh:mm A')}
      </div>
    </div>
  );
};
