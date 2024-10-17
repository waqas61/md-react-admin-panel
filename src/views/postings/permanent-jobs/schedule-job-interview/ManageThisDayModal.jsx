import React, { useState } from 'react';
import moment from 'moment';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Autocomplete,
  TextField,
  Box,
  Grid,
  Typography,
  Card,
  Badge,
  Radio,
  RadioGroup,
  Switch,
  FormGroup
} from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



import ScheduleIcon from '@mui/icons-material/Schedule';
import ScheduleCard from './ScheduleCard';

import './ManageThisDay.css';

const ManageThisDayModal = ({
  showModal,
  setShowModal,
  selectedDate,
  applicant,
  posting,
  setInterviewsArray,
  setInterviewsCount,
  selectedDateEvents,
  setEvents,
  events,
  deleteSelectedEvent,
}) => {
  const [interviewScheduleError, setInterviewScheduleError] = useState(false);
  const [addEventVisible, setAddEventVisible] = useState(false);
  const [interviewType, setInterviewType] = useState('personal');
  const [interviewSchedule, setInterviewSchedule] = useState({
    start_time: '08:00:00',
    end_time: '09:00:00',
  });

  const handleScheduleInterview = () => {
    const data = {
      type: interviewType,
      interview_date: moment(selectedDate).format('YYYY-MM-DD'),
      start_time: interviewSchedule.start_time,
      end_time: interviewSchedule.end_time,
    };

    setInterviewsArray((prevState) => [...prevState, data]);
    setInterviewType('personal');
    setInterviewSchedule({
      start_time: '08:00:00',
      end_time: '09:00:00',
    });
    setShowModal(false);
    setAddEventVisible(false);
    setInterviewsCount((prevCounts) => ({
      ...prevCounts,
      [interviewType]: prevCounts[interviewType] + 1,
    }));

    const newEvent = {
      start: moment(selectedDate).toDate(),
      end: moment(selectedDate).toDate(),
      interview: {
        applicant: applicant,
      },
      type: interviewType,
      start_time: interviewSchedule.start_time,
      end_time: interviewSchedule.end_time,
      title: interviewType,
      interviewScheduleStatus: 'pending',
    };

    const currentEvents = events.map((event) => event.events);
    let newEvents = [];
    if (currentEvents[0] === undefined) {
      newEvents = [newEvent];
    } else {
      newEvents = [...currentEvents, newEvent].flat();
    }

    const groupedEvents = newEvents.reduce((acc, event) => {
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

    setEvents(eventList);
  };

  const handleSetInterviewSchedule = (newSchedule) => {
    setInterviewSchedule((prevState) => {
      return {
        ...prevState,
        start_time: newSchedule.start_time,
        end_time: newSchedule.end_time,
      };
    });
  };


  return (
    <>
      <Dialog
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setAddEventVisible(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
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
              Manage this day
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
            {applicant && (
              <div
                style={{
                  color: '#2561B0',
                  display: 'flex',
                  minHeight: 140,
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px dotted #2561B0',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '233px',
                  flexDirection: 'column',
                  gap: 4,
                  minWidth: '233px',
                }}
                onClick={() => setAddEventVisible(true)}
              >
                <ScheduleIcon />
                <p>Add Event</p>
              </div>
            )}
            {addEventVisible && (
              <ScheduleCard
                applicant={applicant}
                posting={posting}
                interviewType={interviewType}
                setInterviewType={setInterviewType}
                interviewSchedule={interviewSchedule}
                setInterviewSchedule={setInterviewSchedule}
                deleteNewEvent={() => {
                  setAddEventVisible(false);
                }}
                events={selectedDateEvents}
                setInterviewScheduleError={setInterviewScheduleError}
              />
            )}

            {selectedDateEvents
              .sort((a, b) => {
                if (a.start_time < b.start_time) {
                  return -1;
                }
                if (a.start_time > b.start_time) {
                  return 1;
                }
                return 0;
              })
              .map((event, index) => {
                if (event?.interviewScheduleStatus !== 'pending') {
                  return (
                    <ScheduleCard
                      interviewStatus={event?.interview?.interview_status}
                      applicant={event.interview.applicant}
                      posting={posting}
                      interviewType={event.type}
                      disabled={true}
                      interviewSchedule={{
                        start_time: event.start_time,
                        end_time: event.end_time,
                      }}
                    />
                  );
                } else {
                  return (
                    <ScheduleCard
                      applicant={event.interview.applicant}
                      posting={posting}
                      interviewType={event.type}
                      interviewSchedule={{
                        start_time: event.start_time,
                        end_time: event.end_time,
                      }}
                      setInterviewSchedule={(newSchedule) =>
                        handleSetInterviewSchedule(newSchedule)
                      }
                      setInterviewType={(newType) => setInterviewType(newType)}
                      deleteNewEvent={() => {
                        deleteSelectedEvent(index);
                      }}
                      disabled={true}
                    />
                  );
                }
              })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowModal(false);
              setAddEventVisible(false);
            }}
          >
            Disagree
          </Button>
          {applicant && (

            <Button
              variant='outline-primary'
              style={{ color: '#2561B0', border: 'none' }}
              disabled={!addEventVisible || interviewScheduleError}
              onClick={() => handleScheduleInterview()}
            >
              CONFIRM
            </Button>

          )}
        </DialogActions>
      </Dialog>
    </>
  );

  // return (
  //   <Modal
  //     show={showModal}
  //     onHide={() => {
  //       setShowModal(false);
  //       setAddEventVisible(false);
  //     }}
  //     size='lg'
  //     aria-labelledby='contained-modal-title-vcenter'
  //     centered
  //   >
  //     <Modal.Body
  //       style={{
  //         backgroundColor: '#D7E8FF',
  //         borderRadius: '6px',
  //         display: 'flex',
  //         flexDirection: 'column',
  //         gap: '15px',
  //       }}
  //     >
  //       <div
  //         style={{
  //           display: 'flex',
  //           justifyContent: 'space-between',
  //           color: '#2561B0',
  //         }}
  //       >
  //         <p
  //           style={{
  //             fontSize: '20px',
  //             fontWeight: 500,
  //             marginBottom: '0',
  //           }}
  //         >
  //           Manage this day
  //         </p>
  //         <p
  //           style={{
  //             fontSize: '16px',
  //             fontWeight: 400,
  //             marginBottom: '0',
  //             marginRight: '30px',
  //           }}
  //         >
  //           {moment(selectedDate).format('MMMM D (dddd)')}
  //         </p>
  //       </div>
  //       <div
  //         style={{
  //           display: 'flex',
  //           gap: '15px',
  //           overflow: 'auto',
  //           maxWidth: '1140px',
  //           padding: '15px 0px',
  //         }}
  //       >
  //         {applicant && (
  //           <div
  //             style={{
  //               color: '#2561B0',
  //               display: 'flex',
  //               minHeight: 140,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //               border: '1px dotted #2561B0',
  //               borderRadius: '4px',
  //               cursor: 'pointer',
  //               width: '233px',
  //               flexDirection: 'column',
  //               gap: 4,
  //               minWidth: '233px',
  //             }}
  //             onClick={() => setAddEventVisible(true)}
  //           >
  //             <ScheduleIcon />
  //             <p>Add Event</p>
  //           </div>
  //         )}
  //         {addEventVisible && (
  //           <ScheduleCard
  //             applicant={applicant}
  //             posting={posting}
  //             interviewType={interviewType}
  //             setInterviewType={setInterviewType}
  //             interviewSchedule={interviewSchedule}
  //             setInterviewSchedule={setInterviewSchedule}
  //             deleteNewEvent={() => {
  //               setAddEventVisible(false);
  //             }}
  //             events={selectedDateEvents}
  //             setInterviewScheduleError={setInterviewScheduleError}
  //           />
  //         )}

  //         {selectedDateEvents
  //           .sort((a, b) => {
  //             if (a.start_time < b.start_time) {
  //               return -1;
  //             }
  //             if (a.start_time > b.start_time) {
  //               return 1;
  //             }
  //             return 0;
  //           })
  //           .map((event, index) => {
  //             if (event?.interviewScheduleStatus !== 'pending') {
  //               return (
  //                 <ScheduleCard
  //                   interviewStatus={event?.interview?.interview_status}
  //                   applicant={event.interview.applicant}
  //                   posting={posting}
  //                   interviewType={event.type}
  //                   disabled={true}
  //                   interviewSchedule={{
  //                     start_time: event.start_time,
  //                     end_time: event.end_time,
  //                   }}
  //                 />
  //               );
  //             } else {
  //               return (
  //                 <ScheduleCard
  //                   applicant={event.interview.applicant}
  //                   posting={posting}
  //                   interviewType={event.type}
  //                   interviewSchedule={{
  //                     start_time: event.start_time,
  //                     end_time: event.end_time,
  //                   }}
  //                   setInterviewSchedule={(newSchedule) =>
  //                     handleSetInterviewSchedule(newSchedule)
  //                   }
  //                   setInterviewType={(newType) => setInterviewType(newType)}
  //                   deleteNewEvent={() => {
  //                     deleteSelectedEvent(index);
  //                   }}
  //                   disabled={true}
  //                 />
  //               );
  //             }
  //           })}
  //       </div>
  //       {applicant && (
  //         <div
  //           style={{
  //             display: 'flex',
  //             justifyContent: 'flex-end',
  //             gap: '15px',
  //           }}
  //         >
  //           <Button
  //             variant='outline-primary'
  //             style={{ color: '#2561B0', border: 'none' }}
  //             disabled={!addEventVisible || interviewScheduleError}
  //             onClick={() => handleScheduleInterview()}
  //           >
  //             CONFIRM
  //           </Button>
  //         </div>
  //       )}
  //     </Modal.Body>
  //   </Modal>
  // );
};

export default ManageThisDayModal;
