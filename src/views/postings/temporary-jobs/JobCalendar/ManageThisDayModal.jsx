import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const ManageThisDayModal = ({
  showModal,
  setShowModal,
  selectedDate,
  selectedDateEvents,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Body
        style={{
          backgroundColor: '#D7E8FF',
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: '#2561B0',
          }}
        >
          <p
            style={{
              fontSize: '20px',
              fontWeight: 500,
              marginBottom: '0',
            }}
          >
            Professionals on this day
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
        </div>
        <div
          style={{
            display: 'flex',
            gap: '15px',
            overflow: 'auto',
            maxWidth: '1140px',
            padding: '15px 0px',
          }}
        >
          {selectedDateEvents.map((event) => (
            <ApplicantCard event={event} setShowModal={setShowModal} />
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
          }}
        >
          <Button
            variant='primary'
            style={{
              backgroundColor: '#2561B0',
              border: 'none',
              borderRadius: '34px',
              width: '70px',
            }}
            onClick={() => {
              setShowModal(false);
            }}
          >
            Hide
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ManageThisDayModal;

const ApplicantCard = ({ event, setShowModal }) => {


  const [isLoading1, setIsLoading1] = useState(false);


  useEffect(() => {

  }, []);


  const ApproveTheApplicant = (applicant) => {
    setIsLoading1(true);
    axios
      .put(
        `https://api.mddentalstaffing.com/api/v1/owner/applicants/${applicant.posting_applicants[0].id}/approved`,
        {
          posting_applicant_id: applicant.posting_applicants[0].id,
        },
        {
          headers: {
            method: 'PUT',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((res) => {
        setShowModal(false);
      })
      .catch((res) => {

      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '6px',
        border: '1px solid #4D80CC',
        minWidth: '300px',
        maxWidth: '300px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '5px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '5px',
            alignItems: 'center',
          }}
        >
          <img
            style={{
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
            src={event.applicant.user.avatar ? `https://api.mddentalstaffing.com/api/v1/assets/${event.applicant.user.avatar}` : 'https://via.placeholder.com/150'}
            alt=''
          />
          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: '#262626',
            }}
          >
            {event.applicant.user.first_name} {event.applicant.user.last_name}
          </p>
        </div>
        <p
          style={{
            fontSize: '8px',
            fontWeight: 400,
            color: '#BFBFBF',
          }}
        >
          {moment(event.start_time).format('h:mm A')} -{' '}
          {moment(event.end_time).format('h:mm A')}
        </p>
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            gap: '5px',
          }}
        >
          <p
            style={{
              fontSize: '10px',
              fontWeight: 400,
              color: '#8C8C8C',
            }}
          >
            Position:
          </p>
          <p
            style={{
              fontSize: '10px',
              fontWeight: 500,
              color: '#262626',
            }}
          >
            {event.posting.title}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '5px',
          }}
        >
          <p
            style={{
              fontSize: '10px',
              fontWeight: 400,
              color: '#8C8C8C',
            }}
          >
            Office:
          </p>
          <p
            style={{
              fontSize: '10px',
              fontWeight: 500,
              color: '#262626',
            }}
          >
            {event.posting.user?.companies[0]?.name}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '5px',
          }}
        >
          <p
            style={{
              fontSize: '10px',
              fontWeight: 400,
              color: '#8C8C8C',
            }}
          >
            Location:
          </p>
          <p
            style={{
              fontSize: '10px',
              fontWeight: 500,
              color: '#262626',
            }}
          >
            {event.posting.user_location.place_name}
          </p>

        </div>
        <div
          style={{
            display: 'flex',
            gap: '5px',
            alignItems: 'right',
            justifyContent: 'space-between',
          }}
        >

          {event.applicant.application_status != "approved" && event.applicant.application_status != "hired" ? (
            <Button
              variant='primary'
              style={{
                backgroundColor: '#2561B0',
                border: 'none',
                borderRadius: '10px',
                width: 'auto',
                // margin: '10px',
              }}
              onClick={() => {
                ApproveTheApplicant(event);
              }}
            >
              {isLoading1 ? 'Approving...' : 'Approve'}
            </Button>
          ) : (
            <>
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  color: '#262626',
                }}
              >
                Status: {event.applicant.application_status}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
