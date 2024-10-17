import React, { useEffect, useState } from 'react';

// import { capitalizeFirstLetter } from '../../../../../utils/helper';
import axios from 'axios';
import moment from 'moment';
import Stack from '@mui/material/Stack';
import LoadingButton from '../../../ui-component/LoadingButton';

import {
  Alert,
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Modal,
  Radio,
  RadioGroup,
  Typography,
  Grid,
  Button
} from '@mui/material';


import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '6px',
};





const HiringProfessionalModal = ({
  isOpen,
  onClose,
  item,
  setOpenSuccessModal,
  setSuccessMessage,
  fetchProposal,
  setOpenErrorModal,
  setErrorMessage
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedValue, setSelectedValue] = useState(3);

  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);



  // useEffect(() => {
  //   console.log(" selectedValue === > ", selectedValue, item)
  // }, [selectedValue]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const hireprofessional = () => {
    setLoading(true);
    axios.put(`https://api.mddentalstaffing.com/api/v1/owner/applicant/hire`,
      {
        applicant_id: item.applicant_id,
        posting_id: item.posting_id,
        payment_type: selectedValue,
        proposal_id: item.id,
        posting_type: 'temporary',
      },
      {
        headers: {
          method: 'PUT',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    ).then((res) => {
      onClose();
      setSuccessMessage('Thank you for hiring the professional!');
      setOpenSuccessModal(true);
      fetchProposal();
      setFinished(true);
    }).catch((res) => {
      setErrorMessage(res.response.data.message.description);
      setOpenErrorModal(true);
      console.log(res.response.data.message.description)
      setFinished(true);
    });
  };



  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <div
          className='d-flex'
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Hire This Professional..
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              cursor: 'pointer',
            }}
            onClick={onClose}
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


        <Typography id='modal-modal-description' sx={{ mt: 1 }}>

          <Typography id='modal-modal-title_des' variant='h6' component='h2'>
            Please be aware that by pressing "Confirm" you are agreeing to hire:,
          </Typography>

          <Box sx={{ flexGrow: 1, mt: 1 }}>

            <Grid container spacing={1}>
              <Grid item xs={4}>
                Company
              </Grid>
              <Grid item xs={8}>
                -Hidden-
              </Grid>
            </Grid>

            <Grid container spacing={2} >
              <Grid item xs={4}>
                Would like to hire to
              </Grid>
              <Grid item xs={8}>
                Permanent Job
              </Grid>
            </Grid>

            <Grid container spacing={2} >
              <Grid item xs={4}>
                As
              </Grid>
              <Grid item xs={8}>
                <Box gridColumn="span 8" >
                  <Grid container spacing={0.5}>
                    {item.posting.title}
                  </Grid>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={4}>
                For
              </Grid>
              <Grid item xs={8}>
                {item.proposal_posting_schedules.map((sch, index) => {
                  return (
                    <>
                      <Grid item xs={12}>
                        {sch.schedule_day.toUpperCase()}
                        {'        '}
                        {moment(sch.start_time, 'HH:mm:ss').utc().format("hh:mm A")}
                        {'  -  '}
                        {moment(sch.end_time, 'HH:mm:ss').utc().format("hh:mm A")}
                      </Grid>
                    </>
                  );
                })}
                <Grid item xs={4}>
                  ({item.proposal_posting_schedules.length} Days)
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={4}>
                At
              </Grid>
              <Grid item xs={8}>
                <Box gridColumn="span 8" >
                  <Grid container spacing={0.5}>
                    ${item.hiring_rate}/hour
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ flexGrow: 1, mt: 2 }}>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2} className={"border border-2 rounded mb-3"} >
                  <Grid className="d-flex ms-3 " item xs={6}>
                    <label >
                      ${item.proposal_posting_schedules.length * 60}
                      <br />{" "}
                      <span className="fw-semibold">Total Payment</span>
                    </label>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>




          </Box>

          <Box sx={{ flexGrow: 1, mt: 1 }}>
            <Stack sx={{ width: '100%' }} spacing={1}>
              <Alert
                severity='error'
                style={{
                  color: 'red',
                  backgroundColor: 'rgb(250, 238, 222)',
                }}
              >
                Referral fee will be applied on official start date.
                Please note that if you ask this candidate to work extra days during the week Mayday Dental Staffing has to know about it and it has to be put in through the system as a temporary assignment. If you ask this candidate to be hired for extra days permanently, Mayday Dental Staffing has to know about it and it has to be put through the system as a permanent assignment.
                Our calculation is based on 8 working hours. We do not take into consideration less than eight hours or overtime in our calculation of permanent referral fee. Our calculation is always based on 52 working weeks.
              </Alert>
            </Stack>
          </Box>

          <Box sx={{ flexGrow: 1, mt: 1 }}>
            <p required={true} sx={{ width: '100%', mt: 4 }} style={{
              color: '#f11e1e'
            }}>
              You are obligated to notify Mayday Dental Staffing immediately of any additional days whether
              temporary and permanent by contacting.  Mayday Dental Staffing
            </p>
          </Box>

        </Typography>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {/* <Button
              onClick={onClose}
              variant='contained'
              style={{
                backgroundColor: 'transparent',
                color: '#194378',
                border: 'none',
              }}
            >
              Cancel
            </Button> */}
          </div>

          <div>
            <Button
              onClick={onClose}
              color='primary'
              variant='contained'
              style={{
                backgroundColor: 'transparent',
                color: '#194378',
                border: 'none',
              }}
            >
              Cancel
            </Button>
            {/* <Button
              onClick={hireprofessional}
              color='primary'
              variant='contained'
              style={{
                backgroundColor: '#FA5A16',
                color: '#fff',
                border: 'none',
                padding: '5px 20px',
                borderRadius: '5px',
                marginRight: '10px',
              }}
            >
              Confirm
            </Button> */}

            <LoadingButton
              color='primary'
              variant='contained'
              style={{
                // textTransform: 'none',
                padding: '5px 20px',
                borderRadius: '4px',
                transition: 'background-color 0.3s',
                border: "1px solid #2561B0",
                color: '#fff',
                backgroundColor: '#FA5A16',
              }}
              loading={loading}
              done={finished}
              onClick={hireprofessional}
            >
              Confirm
            </LoadingButton>


          </div>
        </div>
      </Box>
    </Modal >
  );
};

export default HiringProfessionalModal;


