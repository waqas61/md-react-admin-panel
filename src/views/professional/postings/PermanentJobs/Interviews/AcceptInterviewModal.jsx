import React, { useState, useEffect } from 'react';

import { capitalizeFirstLetter } from '../../../../../utils/helper';
import axios from 'axios';
import moment from 'moment';
import Stack from '@mui/material/Stack';


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
  Box, Modal, Radio, Typography,
  Grid,
  TextareaAutosize,
  Button
} from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '6px',
};

const AcceptInterviewModal = ({ isOpen, onClose, item, setOpenSuccessModal, setSuccessMessage, fetchData }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDecline, setIsDecline] = useState(false);
  const [declineReason, setDeclineReason] = useState(null);


  const AcceptProposal = () => {
    axios.put(
      `https://api.mddentalstaffing.com/api/v1/proposal/${item.proposal[0].id}/accept`,
      {
        proposal_id: item.proposal[0].id,
      },
      {
        headers: {
          method: 'PUT',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    ).then((res) => {
      onClose();
      setSuccessMessage('Proposal Accepted Successfully');
      fetchData(1, 10)
      setOpenSuccessModal(true);

    }).catch((e) => console.log(e));
  };

  const DeclineProposal = () => {
    axios.put(
      `https://api.mddentalstaffing.com/api/v1/proposal/${item.proposal[0].id}/decline`,
      {
        proposal_id: item.proposal[0].id,
        declineReason: declineReason,
      },
      {
        headers: {
          method: 'PUT',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    ).then((res) => {
      onClose();
      fetchData(1, 10)
      setSuccessMessage('Proposal Declined Successfully');
      setOpenSuccessModal(true);
    }).catch((e) => console.log(e));
  };


  useEffect(() => {
    console.log('declineReason === > ', declineReason);
  }, [declineReason])

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        {isDecline ? (
          <>
            <div
              className='d-flex'
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Decline Proposal
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
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              <Box sx={{ flexGrow: 1, mt: 2 }}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  Please explain your reason for declining this proposal.
                </Typography>

                <Grid container spacing={1}>
                  <Grid item xs={12}>



                    <FormControl
                      sx={{ p: 0 }}
                      size="small"
                      variant="outlined"
                      className="my-form-control"
                      required
                      fullWidth
                    >

                      <InputLabel
                        sx={{
                          background: "white",
                          paddingX: "4px",
                          fontSize: "13px",
                          paddingTop: "2px",
                        }}
                        id="demo-simple-select-label"
                      >
                        Decline Reason
                      </InputLabel>

                      <TextareaAutosize
                        value={declineReason}
                        style={{
                          width: "100%",
                          border: "1px solid #BFBFBF",
                          borderRadius: "4px",
                          marginTop: "20px",
                          padding: "10px 14px",
                          fontSize: "14px",
                          fontWeight: "400",
                          fontFamily: "Roboto",
                          resize: "none",
                          height: "",
                        }}
                        rows="6"
                        onChange={(e) => {
                          setDeclineReason(e.target.value);
                        }}
                      ></TextareaAutosize>
                    </FormControl>
                  </Grid>
                </Grid>

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
                <Button
                  onClick={onClose}
                  variant='contained'
                  style={{
                    backgroundColor: 'transparent',
                    color: '#194378',
                    border: 'none',
                  }}
                >
                  Cancel
                </Button>
              </div>

              <div>


                <Button
                  onClick={() => setIsDecline(false)}
                  color='primary'
                  variant='contained'
                  style={{
                    // backgroundColor: '#FA5A16',
                    color: 'black',
                    border: 'none',
                    padding: '5px 20px',
                    borderRadius: '5px',
                    marginRight: '10px',
                  }}
                >
                  Back
                </Button>

                <Button
                  onClick={DeclineProposal}
                  // onClick={() => setIsDecline(true)}
                  color='primary'
                  variant='contained'
                  style={{
                    backgroundColor: '#2561B0',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 20px',
                    borderRadius: '5px',
                    marginRight: '10px',
                  }}
                >
                  Decline
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className='d-flex'
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Accept Proposal,
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
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              <Box sx={{ flexGrow: 1, mt: 2 }}>

                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    Company
                  </Grid>
                  <Grid item xs={8}>
                    -Hidden-
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={4}>
                    Would like to hire to
                  </Grid>
                  <Grid item xs={8}>
                    Permanent Job
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={4}>
                    As
                  </Grid>
                  <Grid item xs={8}>
                    <Box gridColumn="span 8" >
                      <Grid container spacing={0.5}>
                        {item.proposal[0].posting.title}
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={4}>
                    For
                  </Grid>
                  <Grid item xs={8}>
                    {item.proposal[0].proposal_posting_schedules.map((sch, index) => {
                      return (
                        <>
                          <Grid item xs={12}>
                            {sch.schedule_day.toUpperCase()}
                            {'   '}
                            {moment(sch.start_time, 'HH:mm:ss').utc().format("hh:mm A")}
                            {'  -  '}
                            {moment(sch.end_time, 'HH:mm:ss').utc().format("hh:mm A")}
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                </Grid>


                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={4}>
                    At
                  </Grid>
                  <Grid item xs={8}>
                    <Box gridColumn="span 8" >
                      <Grid container spacing={0.5}>
                        ${item.proposal[0].hiring_rate}/hour
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>


                <Stack sx={{ width: '100%', mt: 2 }} spacing={1}>
                  <Alert
                    severity='error'
                    style={{
                      color: 'red',
                      backgroundColor: 'rgb(250, 238, 222)',
                    }}
                  >
                    Please note that if the office asks you to work extra days during the week Mayday Dental Staffing has to know about it and it has to be put in through a system as a temporary assignment. If the office wants to hire you for extra days permanently, Mayday Dental Staffing has to know about it and it has to be put through a system as a permanent assignment.
                  </Alert>
                </Stack>

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
                <Button
                  onClick={onClose}
                  variant='contained'
                  style={{
                    backgroundColor: 'transparent',
                    color: '#194378',
                    border: 'none',
                  }}
                >
                  Cancel
                </Button>
              </div>

              <div>
                <Button
                  // onClick={DeclineProposal}
                  onClick={() => setIsDecline(true)}
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
                  Decline
                </Button>
                <Button
                  onClick={AcceptProposal}
                  color='primary'
                  variant='contained'
                  style={{
                    backgroundColor: '#2561B0',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 20px',
                    borderRadius: '5px',
                    marginRight: '10px',
                  }}
                >
                  Accept
                </Button>
              </div>
            </div>
          </>
        )}


      </Box>
    </Modal>
  );
};

export default AcceptInterviewModal;


