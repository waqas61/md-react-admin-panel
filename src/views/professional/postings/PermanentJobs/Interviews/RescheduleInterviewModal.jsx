import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import axios from 'axios';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import { Alert } from '@mui/material';
import {
  FormControl,
  Grid,
  InputLabel,
  Typography,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Modal,
  Button
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';


import CustomDatePicker from '../../../../../ui-component/create-posting/CustomDatePicker';
import LoadingButton from '../../../../../ui-component/LoadingButton';
import CustomTime from "../../../../../ui-component/CustomTime";
import { convertTo12Hour, convertTo24Hour } from '../../../../../utils/helper';
import { capitalizeFirstLetter } from '../../../../../utils/helper';


import CustomScheduleBoxes from './CustomScheduleBoxes';

import { selectUser, setUser } from '../../../../../store/slices/userSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '6px',
  width: '50%',
};

const RescheduleInterviewModal = ({ isOpen, onClose, setOpenSuccessModal, setSuccessMessage, fetchData, item }) => {
  const user = useSelector(selectUser);
  const [selectedDate, setSelectedDate] = useState(null);
  const theme = useTheme();
  const authToken = localStorage.getItem("auth_token");
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [maxWidth, setMaxWidth] = React.useState('md');
  const [interviewCount, setInterviewCount] = useState(0);
  const [interviewSlots, setInterviewSlots] = useState([
    {
      "date": null,
      "startHours": 9,
      "endHours": 10,
      "startMinutes": 0,
      "endMinutes": 0,
      "startPeriod": "AM",
      "endPeriod": "AM"
    },
    {
      "date": null,
      "startHours": 9,
      "endHours": 10,
      "startMinutes": 0,
      "endMinutes": 0,
      "startPeriod": "AM",
      "endPeriod": "AM"
    },
    {
      "date": null,
      "startHours": 9,
      "endHours": 10,
      "startMinutes": 0,
      "endMinutes": 0,
      "startPeriod": "AM",
      "endPeriod": "AM"
    },
    {
      "date": null,
      "startHours": 9,
      "endHours": 10,
      "startMinutes": 0,
      "endMinutes": 0,
      "startPeriod": "AM",
      "endPeriod": "AM"
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
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

  const countType = () => {
    const count = interviewSlots.filter(interview => interview.date != null);
    setInterviewCount(count.length);
    return count.length;
  }

  const suggestSchedule = () => {
    var interviewsArray = [];
    interviewSlots.map((slot, index) => {
      var data = {
        type: item.type,
        interview_date: moment(slot.date).format('YYYY-MM-DD'),
        start_time: convertTo24Hour(
          slot.startHours,
          slot.startMinutes,
          slot.startPeriod
        ),
        end_time: convertTo24Hour(
          slot.endHours,
          slot.endMinutes,
          slot.endPeriod
        )
      };
      interviewsArray.push(data);
    });
    var url = `https://api.mddentalstaffing.com/api/v1/interviews`;
    var payload = {
      posting_applicant_id: item.posting_applicant.id,
      interview_schedules: interviewsArray,
      interview_id: item.id,
      interview_type: item.type
    };
    var request_header = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    axios.post(url, payload, request_header).then((res) => {
      setFinished(true);
      onClose();
      fetchData();
    }).catch((e) => {
      console.log(e.message);
      setFinished(true);
    });
  };

  const deleteSuggestedSlots = () => {
    var url = `https://api.mddentalstaffing.com/api/v1/interviews/delete/suggested/schedules/${item.id}`;
    var payload = {
      posting_applicant_id: item.posting_applicant.id,
      interview_id: item.id,
      interview_type: item.type
    };
    var request_header = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    axios.put(url, payload, request_header).then((res) => {
      setFinished(true);
      onClose();
      fetchData();
    }).catch((e) => {
      console.log(e.message);
      setFinished(true);
    });
  };

  useEffect(() => {
    countType();
  }, [interviewSlots])

  return (

    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth="lg"
      maxWidth={maxWidth}
    >
      <DialogTitle id="responsive-dialog-title">
        {"Reschedule Interview"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid
            sx={{
              py: 1,
            }}
          >
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert
                severity='error'
                style={{
                  color: 'red',
                  backgroundColor: 'rgb(250, 238, 222)',
                }}
              >
                <span style={{ fontWeight: 'bold' }}> Important </span>
                Please note that if you are rescheduling an interview, you must wait for the dental office to confirm the new time and day.
              </Alert>
            </Stack>
          </Grid>

          <Grid
            className="rounded"
            sx={{
              px: 0.5,
              py: 1,
              border: "1px solid",
              borderColor: "#D9D9D9",
            }}
          >
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
                Please choose four available dates and times by for the dental office to pick from.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '13px',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#262626',
                    marginBottom: '8px',
                  }}
                >
                  {item.type} interview
                </p>


                {isSuggested ? (
                  <>
                    <CustomScheduleBoxes
                      count={4}
                      type={item.type}
                    />
                  </>
                ) : (
                  <>
                    <CustomScheduleBoxes
                      count={interviewCount}
                      type={item.type}
                    />
                  </>
                )}


              </div>
            </div>
          </Grid>

          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{
              my: 2,
            }}
          >
            Select New Dates and Time
          </Typography>


          {isSuggested ? (
            <>
              <Grid
                className="rounded"
                sx={{
                  my: 2,
                  border: "1px solid",
                  borderColor: "#D9D9D9",
                }}
              >
                <Grid sx={{ my: 2, mx: 1 }} >
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
              </Grid>
            </>
          ) : (
            <>
              {interviewSlots && interviewSlots.map((slote, index) => {
                return (
                  <Grid
                    className="rounded"
                    sx={{
                      my: 2,
                      border: "1px solid",
                      borderColor: "#D9D9D9",
                    }}
                  >
                    <Grid >
                      <Grid sx={{ my: 2, mx: 1 }} container>
                        <Grid className="d-flex align-items-center" xs={4} item>
                          <CustomDatePicker
                            size="medium"
                            label={"Start Date"}
                            value={slote.date}
                            onChange={(newDate) => {
                              let newArray = [...interviewSlots];
                              newArray[index].date = newDate
                              setInterviewSlots(newArray)
                            }}
                          // error={postingSchedules.startDate === "" && errorState}
                          />
                        </Grid>
                        <Grid className={"d-flex justify-content-start"} item md={4}>
                          <Grid
                            item
                            sx={{
                              width: "5rem",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <p
                              className="p-0 m-0"
                              style={{
                                color: "#595959",
                                fontSize: "0.8rem",
                              }}
                            >
                              Start Time:{" "}
                            </p>
                          </Grid>
                          <CustomTime
                            isActive={true}
                            ampm={slote.startPeriod}
                            type="simple"
                            hours={slote.startHours}
                            minutes={slote.startMinutes}
                            setHours={(newHours) => {
                              let newArray = [...interviewSlots];
                              newArray[index].startHours = newHours
                              setInterviewSlots(newArray)
                            }}
                            setMinutes={(newMinutes) => {
                              let newArray = [...interviewSlots];
                              newArray[index].startMinutes = newMinutes
                              setInterviewSlots(newArray)
                            }}
                            setAmpm={(newPeriod) => {
                              let newArray = [...interviewSlots];
                              newArray[index].startPeriod = newPeriod
                              setInterviewSlots(newArray)
                            }}
                          />
                        </Grid>
                        <Grid className={`d-flex justify-content-start`} item md={4} >
                          <Grid
                            item
                            sx={{
                              width: "5rem",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <p
                              className="p-0 m-0"
                              style={{
                                color: "#595959",
                                fontSize: "0.8rem",
                              }}
                            >
                              End Time:{" "}
                            </p>
                          </Grid>
                          <CustomTime
                            isActive={true}
                            ampm={slote.endPeriod}
                            type="simple"
                            hours={slote.endHours}
                            minutes={slote.endMinutes}
                            setHours={(newHours) => {
                              let newArray = [...interviewSlots];
                              newArray[index].endHours = newHours
                              setInterviewSlots(newArray)
                            }}
                            setMinutes={(newMinutes) => {
                              let newArray = [...interviewSlots];
                              newArray[index].endMinutes = newMinutes
                              setInterviewSlots(newArray)
                            }}
                            setAmpm={(newPeriod) => {
                              let newArray = [...interviewSlots];
                              newArray[index].endPeriod = newPeriod
                              setInterviewSlots(newArray)
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: '37px'
          }}
        >

          <Button
            color='primary'
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              color: '#194378',
              border: 'none',
            }}
          >
            Cancel
          </Button>

          {!isSuggested ? (
            <>
              <LoadingButton
                color='primary'
                variant='contained'
                style={{
                  // textTransform: 'none',
                  padding: '5px 20px',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s',
                  // border: "1px solid #2561B0",
                  color: '#fff',
                  backgroundColor: '#FA5A16',
                }}
                loading={loading}
                done={finished}
                onClick={() => {
                  suggestSchedule();
                  setLoading(true);
                }}
              >
                Confirm
              </LoadingButton>
            </>
          ) : (
            <>

              <LoadingButton
                color='primary'
                variant='contained'
                style={{
                  // textTransform: 'none',
                  padding: '5px 20px',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s',
                  // border: "1px solid #2561B0",
                  color: '#fff',
                  backgroundColor: '#FA5A16',
                }}
                loading={loading}
                done={finished}
                onClick={deleteSuggestedSlots}
              >
                Delete
              </LoadingButton>

            </>
          )}

        </div>
      </DialogActions>

    </Dialog>
  );
};

export default RescheduleInterviewModal;


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