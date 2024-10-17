import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CustomTime from '../../../ui-component/CustomTime';
import { Grid, Button } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import axios from 'axios';
import { convertTo24Hour } from '../../../utils/helper';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '6px',
};

export default function PostingUpdateModal({
  open,
  handleClose,
  selectedItem,
  fetchData,
  posting,
}) {
  const [updatedPostingSchedule, setUpdatedPostingSchedule] = useState({
    schedule_day: '',
    schedule_date: '',
    start_time: '',
    end_time: '',
  });

  useEffect(() => {
    if (selectedItem) {
      setUpdatedPostingSchedule({
        schedule_day: selectedItem.schedule_day,
        schedule_date: moment(selectedItem.schedule_date).format("HH:mm A"),
        // start_time: selectedItem.start_time,
        // end_time: selectedItem.end_time,
        start_time: moment(selectedItem.start_time).format("HH:mm"),
        end_time: moment(selectedItem.end_time).format("HH:mm"),
      });
    }
  }, [selectedItem]);

  const authToken = localStorage.getItem('auth_token');

  const convertToAMPM = (time) => {
    const [hour, minutes] = time?.split(':');
    let period = 'AM';
    let hour12 = parseInt(hour, 10);
    if (hour12 >= 12) {
      hour12 = hour12 === 12 ? hour12 : hour12 - 12;
      period = 'PM';
    }
    if (hour12 === 0) {
      hour12 = 12;
    }

    return {
      hour: hour12,
      minutes,
      period,
    };
  };

  const convertHourState = (hour, newPeriod) => {
    if (newPeriod === 'AM') {
      return hour - 12;
    } else {
      return hour + 12;
    }
  };

  const handleUpdatePostingSchedule = () => {
    axios
      .put(
        `https://api.mddentalstaffing.com/api/v1/owner/postings/schedules/${selectedItem.id}?start_time=${updatedPostingSchedule.start_time}&end_time=${updatedPostingSchedule.end_time}`,
        null,
        {
          headers: {
            method: 'PUT',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        fetchData(1, 10);
      })
      .catch((e) => console.log(e));
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <div
          className='d-flex'
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Change Time
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              cursor: 'pointer',
            }}
            onClick={handleClose}
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

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: '#595959',
            }}
          >
            {selectedItem?.schedule_day?.toUpperCase()}
          </span>
          <span
            style={{
              fontSize: 20,
              color: '#262626',
              fontWeight: '500',
            }}
          >
            {moment(selectedItem.schedule_date).format('MM/DD/YYYY')}
          </span>
        </div>

        <div
          style={{
            backgroundColor: '#FAFAFA',
            padding: '20px',
          }}
        >
          <div
            className='d-flex justify-content-between'
            style={{
              marginBottom: '20px',
              borderBottom: '1px solid #D9D9D9',
              paddingBottom: '18px',
            }}
          >
            <span
              style={{
                fontSize: 14,
                color: '#262626',
                fontWeight: '500',
              }}
            >
              Start Time{' '}
              <span
                style={{
                  color: '#2561B0',
                  fontWeight: '500',
                }}
              >
                ({posting?.time_zone?.zone_name})
              </span>
            </span>
            <span
              style={{
                fontSize: 14,
                color: '#262626',
                fontWeight: '500',
              }}
            >
              End Time{' '}
              <span
                style={{
                  color: '#2561B0',
                  fontWeight: '500',
                }}
              >
                ({posting?.time_zone?.zone_name})
              </span>
            </span>
          </div>
          <div
            className='d-flex'
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <CustomTime
              hours={convertToAMPM(updatedPostingSchedule?.start_time).hour}
              isActive={true}
              setHours={(newHours) => {
                setUpdatedPostingSchedule((prevState) => ({
                  ...prevState,
                  start_time: `${newHours}:${convertToAMPM(updatedPostingSchedule?.start_time).minutes
                    }:00`,
                }));
              }}
              minutes={
                convertToAMPM(updatedPostingSchedule?.start_time).minutes
              }
              setMinutes={(newMinutes) => {
                setUpdatedPostingSchedule((prevState) => ({
                  ...prevState,
                  start_time: `${convertToAMPM(updatedPostingSchedule?.start_time).hour
                    }:${newMinutes}:00`,
                }));
              }}
              ampm={convertToAMPM(updatedPostingSchedule?.start_time).period}
              setAmpm={(newPeriod) => {
                const time = convertToAMPM(updatedPostingSchedule?.start_time);

                const updatedTime = convertTo24Hour(
                  time.hour,
                  time.minutes,
                  newPeriod
                );
                setUpdatedPostingSchedule((prevState) => ({
                  ...prevState,
                  start_time: updatedTime,
                }));
              }}
            />
            <CustomTime
              hours={convertToAMPM(updatedPostingSchedule?.end_time).hour}
              isActive={true}
              setHours={(newHours) => {
                const time = convertToAMPM(updatedPostingSchedule?.end_time);

                const updatedTime = convertTo24Hour(
                  newHours,
                  time.minutes,
                  time.period
                );

                setUpdatedPostingSchedule((prevState) => ({
                  ...prevState,
                  end_time: updatedTime,
                }));
              }}
              minutes={convertToAMPM(updatedPostingSchedule?.end_time).minutes}
              setMinutes={(newMinutes) => {
                const updatedTime = convertToAMPM(
                  updatedPostingSchedule?.end_time
                );
                const updatedHour = convertHourState(
                  updatedTime.hour,
                  updatedTime.period
                );
                setUpdatedPostingSchedule((prevState) => ({
                  ...prevState,
                  end_time: `${updatedHour}:${newMinutes}:00`,
                }));
              }}
              ampm={convertToAMPM(updatedPostingSchedule?.end_time).period}
              setAmpm={(newPeriod) => {
                const time = convertToAMPM(updatedPostingSchedule?.end_time);
                const updatedTime = convertTo24Hour(
                  time.hour,
                  time.minutes,
                  newPeriod
                );
                setUpdatedPostingSchedule((prevState) => ({
                  ...prevState,
                  end_time: updatedTime,
                }));
              }}
            />
          </div>
        </div>

        <div>
          <h4
            style={{
              color: '#2561B0',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            REVERT TO ORIGINAL TIMEs
          </h4>
          <div
            className='d-flex'
            style={{
              gap: '20px',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #2561B0',
              padding: '18px 25px',
              borderRadius: '6px',
            }}
          >
            <div>
              <h6>
                {selectedItem.schedule_day}{' '}
                {moment(selectedItem.schedule_date).format('MM/DD/YYYY')}
              </h6>
              <p>
                {moment(selectedItem.start_time).format('hh:mm A')}
              </p>
            </div>
            <div>
              <h6>
                {selectedItem.schedule_day}{' '}
                {moment(selectedItem.schedule_date).format('MM/DD/YYYY')}
              </h6>
              <p>
                {moment(selectedItem.end_time).format('hh:mm A')}
                {/* {moment(selectedItem.end_time, 'HH:mm:ss').format('hh:mm A')} */}
              </p>
            </div>
            <div>
              <Button
                variant='primary'
                style={{
                  border: 0,
                  backgroundColor: '#2561B0',
                }}
                onClick={() => {
                  setUpdatedPostingSchedule({
                    schedule_day: selectedItem.schedule_day,
                    schedule_date: moment(selectedItem.schedule_date).format('hh:mm A'),
                    start_time: moment(selectedItem.start_time).format('hh:mm'),
                    end_time: moment(selectedItem.end_time).format('hh:mm'),
                  });
                }}
              >
                Revert Time
              </Button>
            </div>
          </div>
        </div>

        <Grid item xs={12} md={4}>
          <Grid
            className='rounded'
            container
            spacing={1}
            sx={{ backgroundColor: '#D7E8FF', p: 1 }}
          >
            <Grid item xs={1}>
              <ErrorOutlineOutlinedIcon sx={{ color: '#4A93F0' }} />
            </Grid>
            <Grid item xs={11} sx={{ fontSize: '0.9rem' }}>
              <p style={{ color: '#194378' }} className='fw-semibold mb-0'>
                Please Note
              </p>
              <p style={{ color: '#194378' }}>
                Some states will require employer to pay minimum of 4 hours.
                {selectedItem?.approved_count > 0 &&
                  ' If the accepted applicant refuses the updated time slot, you will be charged a cancellation fee. Do you still wish to proceed?'}
              </p>
            </Grid>
          </Grid>
        </Grid>

        <div className='d-flex justify-content-end'>
          <button
            className='btn btn-outline-primary me-2'
            style={{
              border: 0,
              color: '#2561B0',
            }}
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className='btn btn-outline-primary'
            style={{
              border: 0,
              color: '#2561B0',
            }}
            disabled={
              updatedPostingSchedule?.start_time === selectedItem?.start_time &&
              updatedPostingSchedule?.end_time === selectedItem?.end_time
            }
            onClick={handleUpdatePostingSchedule}
          >
            CONFIRM
          </button>
        </div>
      </Box>
    </Modal>
  );
}
