import React, { useEffect, useState, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import moment from 'moment';

import { ErrorOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';


import StarRating from '../../../ui-component/StarRating';
import PostingTimes from "../../../ui-component/create-posting/PostingTimes";
import SuccessModal from '../../../ui-component/SuccessModal';
import ErrorModal from '../../../ui-component/ErrorModal';

import { convertDataArray, convertTo24Hour } from '../../../utils/helper';

import {
  Alert,
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import FormLabel from '@mui/material/FormLabel';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepButton from '@mui/material/StepButton';

import axios from 'axios';

const steps = [
  'custom',
  'final',
];

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


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function SendProposalModal({
  open,
  handleClose,
  fetchProposal,
  applicant,
  userCurrentLocation,
  permanentJob,
  postingSchedule,
  setPostingSchedule,
  successModal
}) {


  const styles = theme => ({
    modalStyle1: {
      position: 'absolute',
      top: '10%',
      left: '10%',
      overflow: 'scroll',
      height: '100%',
      width: '100%',
      display: 'block'
    }
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const url = window.location.href;
  const scheduleId = url.substring(url.lastIndexOf('/') + 1);
  const authToken = localStorage.getItem("auth_token");
  const [hiringRate, setHiringRate] = useState(null);
  const [isTrue, setIsTrue] = React.useState(false);
  const [selectedSch, setSelectedSch] = React.useState([]);

  const inputRef = useRef(null);

  const focus = () => {
    inputRef.current.focus();
  };


  const [postingSchedules, setPostingSchedules] = useState({
    type: "simple",
    startDate: "",
    endDate: "",
    days: {
      sunday: {
        isActive: false,
        startHours: 9,
        endHours: 5,
        startMinutes: 0,
        endMinutes: 0,
        startPeriod: "AM",
        endPeriod: "PM",
      },
      monday: {
        isActive: false,
        startHours: 9,
        endHours: 5,
        startMinutes: 0,
        endMinutes: 0,
        startPeriod: "AM",
        endPeriod: "PM",
      },
      tuesday: {
        isActive: false,
        startHours: 9,
        endHours: 5,
        startMinutes: 0,
        endMinutes: 0,
        startPeriod: "AM",
        endPeriod: "PM",
      },
      wednesday: {
        isActive: false,
        startHours: 9,
        endHours: 5,
        startMinutes: 0,
        endMinutes: 0,
        startPeriod: "AM",
        endPeriod: "PM",
      },
      thursday: {
        isActive: false,
        startHours: 9,
        endHours: 5,
        startMinutes: 0,
        endMinutes: 0,
        startPeriod: "AM",
        endPeriod: "PM",
      },
      friday: {
        isActive: false,
        startHours: 9,
        endHours: 5,
        startMinutes: 0,
        endMinutes: 0,
        startPeriod: "AM",
        endPeriod: "PM",
      },
      saturday: {
        isActive: false,
        startHours: 9,
        endHours: 5,
        startMinutes: 0,
        endMinutes: 0,
        startPeriod: "AM",
        endPeriod: "PM",
      },
    },
  });

  const postingScheduleArray = [];

  postingSchedule.map((sch, index) => {
    postingScheduleArray.push({
      approved_count: sch.approved_count,
      created_at: sch.created_at,
      deleted_at: sch.deleted_at,
      end_time: sch.end_time,
      id: sch.id,
      is_working: sch.is_working,
      posting_id: sch.posting_id,
      schedule_date: sch.schedule_date,
      schedule_day: sch.schedule_day,
      schedule_status: sch.schedule_status,
      start_time: sch.start_time,
      updated_at: sch.updated_at,
      isActive: scheduleId == sch.id ? true : false
    });
  });

  const [selectedPostingSchedules, setSelectedPostingSchedules] = useState(postingScheduleArray);

  const [activeStep, setActiveStep] = React.useState(0);

  const generateSchedules = (postingSchedules) => {
    const resultArray = [];
    for (const day in postingSchedules.days) {
      if (postingSchedules.days.hasOwnProperty(day)) {
        const scheduleDate = postingSchedules.startDate;
        const scheduleDay = day;
        const startTime = convertTo24Hour(
          postingSchedules.days[day].startHours,
          postingSchedules.days[day].startMinutes,
          postingSchedules.days[day].startPeriod
        );
        const isWorking = postingSchedules.days[day].isActive;
        const endTime = convertTo24Hour(
          postingSchedules.days[day].endHours,
          postingSchedules.days[day].endMinutes,
          postingSchedules.days[day].endPeriod
        );
        if (isWorking) {
          resultArray.push({
            schedule_date: scheduleDate,
            schedule_day: scheduleDay,
            start_time: startTime,
            is_working: isWorking,
            end_time: endTime,
          });
        }
      }
    }

    return resultArray;
  };


  const isSelectedSchedule = () => {
    var sch = selectedPostingSchedules.filter((sch, i) => {
      return sch.isActive == true;
    })
    return sch.length > 0 ? true : false;
  }
  const handleNext = () => {
    if (activeStep === steps.length - 1) {

      var url = `https://api.mddentalstaffing.com/api/v1/owner/proposals`;

      var scheduleIds = selectedPostingSchedules.map((a) => {
        if (a.isActive) {
          return a.id;
        }
      });

      var payload = {
        hiring_rate: hiringRate,
        propsal_schedules: isTrue ? generateSchedules(postingSchedules) : 'original',
        applicant_id: applicant.id,
        posting_id: permanentJob.id,
        applied_schedules: scheduleIds,
        schedule_id: scheduleId,
      };

      var request_header = {
        headers: { Authorization: `Bearer ${authToken}` }
      };

      axios.post(url, payload, request_header).then((res) => {
        handleClose();
        successModal();
        fetchProposal();
      }).catch((e) => {
        console.log(e.message);
      });

      return true;
    }

    if (hiringRate != null && hiringRate != '' && isSelectedSchedule()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleChange = (id) => {
    const clonedData = [...selectedPostingSchedules];
    setSelectedPostingSchedules(
      clonedData.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d))
    );
  };

  useEffect(() => {
    permanentJob.posting_schedules.map((sch, index) => {
      var hour = moment(sch.start_time).format("hh");
      var min = moment(sch.start_time).format("mm");
      var format = moment(sch.start_time).format("A");
    });
  }, [permanentJob]);

  const count = selectedPostingSchedules.reduce((counter, obj) => obj.isActive ? counter += 1 : counter, 0);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    // className={styles.modalStyle1}
    >
      <>
        <Box sx={style}>
          <div
            className='d-flex'
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 4,
              mt: 2,
              width: '100%',
              maxHeight: '75vh',
              overflowY: 'auto'
            }}
          >
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Send Proposal (Step {activeStep + 1}).
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


          <Typography component="div" sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      {/* <StepLabel {...labelProps}>{label}</StepLabel> */}
                    </Step>
                  );
                })}
              </Stepper>
              <React.Fragment>

                <Typography sx={{ mt: 4, mb: 1 }}>
                  {activeStep == 0 ? (
                    <>
                      <Typography component="div" sx={{ mt: 2 }}>
                        {/* sx={{ maxHeight: '75vh', overflowY: 'auto' }} */}
                        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                          <Box gridColumn="span 2">
                            <div
                              style={{
                                display: 'flex',
                                gap: 10,
                                alignItems: 'left',
                              }}
                            >
                              <div>
                                {applicant ? (
                                  <Avatar alt="Remy Sharp"
                                    src={`https://api.mddentalstaffing.com/api/v1/assets/${applicant?.avatar}`}
                                    sx={{ width: 75, height: 75 }}
                                  />
                                ) : (
                                  <AccountCircle style={{ fontSize: '75px' }} />
                                )}
                              </div>
                            </div>
                          </Box>
                          <Box gridColumn="span 4">
                            <div
                              style={{
                                display: 'flex',
                                gap: 10,
                                alignItems: 'left',
                              }}
                            >
                              {applicant?.first_name}{' '}
                              {applicant?.last_name}
                            </div>

                            <div
                              style={{
                                display: 'flex',
                                gap: 10,
                                alignItems: 'left',
                              }}
                            >
                              Review :<StarRating rating={applicant?.average_score ? applicant?.average_score : 0} />
                            </div>
                          </Box>
                          <Box gridColumn="span 4">
                            <div
                              style={{
                                display: 'flex',
                                gap: 10,
                                alignItems: 'left',
                              }}
                            >
                              <p>Rate : {userCurrentLocation ? userCurrentLocation.desired_rate : 0}</p>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                gap: 10,
                                alignItems: 'left',
                              }}
                            >
                              {/* <p>Interview Result : pass</p> */}
                            </div>
                          </Box>
                        </Box>
                      </Typography>
                      <Typography component="div" sx={{ mt: 2 }} >
                        {/* sx={{ maxHeight: '75vh', overflowY: 'auto' }} */}
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                          <Grid item xs={5}>
                            <FormLabel >
                              Your Hiring Rate.
                            </FormLabel>

                            <TextField
                              // style={{ marginRight: '10px' }}
                              ref={inputRef}
                              label='Your Hiring Rate ($/H)'
                              placeholder='0'
                              required={true}
                              id='outlined-start-adornment'
                              // sx={{ m: 1, width: '25ch' }}
                              value={hiringRate}
                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                  setHiringRate(e.target.value);
                                }
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position='start'>($)</InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={7}>
                            <FormLabel >
                              Applied Schedules
                            </FormLabel>
                            <Grid container spacing={0.5}>
                              {selectedPostingSchedules.map((sch, index) => {
                                return (
                                  <>
                                    <Grid item xs={10}>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            disabled={false}
                                            checked={sch.isActive}
                                            onClick={() => handleChange(sch.id)}
                                          // onChange={(e) => {
                                          //   const { checked } = e.target;

                                          //   setSelectedPostingSchedules(
                                          //     postingSchedule.map((ss) => ({
                                          //       ...ss,
                                          //       isActive: ss.id === sch.id ? checked : ss.isActive
                                          //     }))
                                          //   );

                                          //   // var schedule = postingSchedule.find((s) => {
                                          //   //   if (s.id == sch.id) {
                                          //   //     return s;
                                          //   //   }
                                          //   // });

                                          //   // schedule.isActive = checked;
                                          //   // postingSchedule[index] = schedule;
                                          //   // setSelectedPostingSchedules(postingSchedule);

                                          //   // Array.prototype.inArray = function (comparer) {
                                          //   //   for (var i = 0; i < this.length; i++) {
                                          //   //     if (comparer(this[i])) return true;
                                          //   //   }
                                          //   //   return false;
                                          //   // };

                                          //   // Array.prototype.pushIfNotExist = function (element, comparer) {
                                          //   //   if (!this.inArray(comparer)) {
                                          //   //     this.push(element);
                                          //   //   }
                                          //   // };

                                          //   // let items = [...selectedSch];
                                          //   // if (checked) {
                                          //   //   items.pushIfNotExist(sch, function (e) {
                                          //   //     return e.id === sch.id;
                                          //   //   });
                                          //   // } else {
                                          //   //   var index = items.indexOf(sch.id);
                                          //   //   if (index >= 0) {
                                          //   //     items.splice(index, 1);
                                          //   //   }
                                          //   // }
                                          //   // setSelectedSch(items);

                                          //   // setSelectedPostingSchedules(items);






                                          //   // let updatedList = postingSchedule.map(item => {
                                          //   //   if (item.id == sch.id) {
                                          //   //     return { ...item, isActive: checked ? checked : item.isActive }; //gets everything that was already in item, and updates "done"
                                          //   //   }
                                          //   //   return item; // else return unmodified item 
                                          //   // });
                                          //   // setSelectedPostingSchedules(updatedList);
                                          // }}
                                          />
                                        }
                                        label={sch.schedule_day.toUpperCase() + ' ' + moment.utc(sch.start_time, 'YYYYMMDD HH:mm:ss').format('hh:mm A') + ' ' + moment.utc(sch.end_time, 'YYYYMMDD HH:mm:ss').format('hh:mm A')}
                                      />
                                    </Grid>
                                    {/* <Grid item xs={8}>
                                      {moment.utc(sch.start_time, 'YYYYMMDD HH:mm:ss').format('hh:mm A')}{'-'}
                                      {moment.utc(sch.end_time, 'YYYYMMDD HH:mm:ss').format('hh:mm A')}
                                    </Grid> */}
                                  </>
                                );
                              })}
                              {/* ({postingSchedule.length} / days) */}
                            </Grid>
                          </Grid>

                          {/* <Grid item xs={6}>
                            <Item>4</Item>
                          </Grid> */}
                        </Grid>
                        {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                          <Grid item xs={12}>
                            <Accordion expanded={isTrue} >
                              <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                // aria-controls="panel2-content"
                                id="panel2-header"
                                style={{
                                  height: '1px'
                                }}
                              >
                              </AccordionSummary>
                              <AccordionDetails>
                                <PostingTimes
                                  postingSchedules={postingSchedules}
                                  setPostingSchedules={setPostingSchedules}
                                  disabled={viewMode}
                                />
                              </AccordionDetails>
                            </Accordion>
                            <FormGroup>
                              <FormControlLabel control={
                                <Checkbox
                                  checked={isTrue}
                                  onChange={e => {
                                    setIsTrue(e.target.checked)
                                  }}
                                  value="checkedA"
                                  inputProps={{
                                    'aria-label': 'primary checkbox',
                                  }}
                                />
                              } label="Custom Schdules" />
                            </FormGroup>
                          </Grid>
                        </Grid> */}

                      </Typography>

                    </>
                  ) : activeStep == 1 ? (
                    <>
                      <Typography >
                        <Typography>
                          <p>Please be aware that by pressing "Confirm" You are sending proposal :</p>
                        </Typography>

                        <Box sx={{ flexGrow: 1, mt: 2 }}>

                          <Grid container spacing={1}>
                            <Grid item xs={4}>
                              To Professional
                            </Grid>
                            <Grid item xs={8}>
                              {applicant?.first_name}{' '}
                              {applicant?.last_name}
                            </Grid>
                          </Grid>

                          <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={4}>
                              AS
                            </Grid>
                            <Grid item xs={8}>
                              {permanentJob.title}
                            </Grid>
                          </Grid>

                          <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={4}>
                              For
                            </Grid>
                            <Grid item xs={8}>
                              <Box gridColumn="span 8" >
                                <Grid container spacing={0.5}>

                                  {isTrue ? (
                                    <>
                                      {generateSchedules(postingSchedules).map((sch, index) => {
                                        return (
                                          <>
                                            <Grid item xs={4}>
                                              {sch.schedule_day.toUpperCase()}
                                            </Grid>
                                            <Grid item xs={8}>
                                              {moment.utc(sch.start_time, 'HH:mm:ss').format('hh:mm A')}{'-'}
                                              {moment.utc(sch.end_time, 'HH:mm:ss').format('hh:mm A')}
                                            </Grid>
                                          </>
                                        );
                                      })}
                                      <Grid item xs={4}>
                                        ({generateSchedules(postingSchedules).length} Days)
                                      </Grid>
                                    </>
                                  ) : (
                                    <>
                                      {selectedPostingSchedules.map((sch, index) => {

                                        if (sch.isActive) {
                                          return (
                                            <>
                                              <Grid item xs={4}>
                                                {sch.schedule_day.toUpperCase()}
                                              </Grid>
                                              <Grid item xs={8}>
                                                {moment.utc(sch.start_time, 'YYYYMMDD HH:mm:ss').format('hh:mm A')}{'-'}
                                                {moment.utc(sch.end_time, 'YYYYMMDD HH:mm:ss').format('hh:mm A')}
                                              </Grid>
                                            </>
                                          );
                                        }

                                      })}
                                      <Grid item xs={4}>
                                        ({count} Days)
                                      </Grid>
                                    </>
                                  )}
                                </Grid>
                              </Box>
                            </Grid>
                          </Grid>

                          <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={4}>
                              At
                            </Grid>
                            <Grid item xs={8}>
                              ${hiringRate}/hour
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
                              <span style={{ fontWeight: 'bold' }}> Referral </span>
                              will be applied on offical start date
                            </Alert>
                          </Stack>

                          <p required={true} sx={{ width: '100%', mt: 2 }} style={{
                            color: '#f11e1e'
                          }}>
                            You are obligated to notify Mayday Dental Staffing immediately of any additional days whether
                            temporary and permanent by contacting.  Mayday Dental Staffing
                          </p>
                        </Box>
                      </Typography>
                    </>
                  ) : (
                    <></>
                  )}
                </Typography>

                <Typography sx={{ mt: 2, mb: 1 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button
                      disabled={
                        hiringRate == null || hiringRate == '' || isSelectedSchedule() === false
                      }


                      onClick={handleNext}

                    >
                      {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                    </Button>
                  </Box>
                </Typography>

              </React.Fragment>
            </Box>

          </Typography>

          {/* <div className='d-flex justify-content-end'>
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
              onClick={handleConfirm}
            >
              Next
            </button>
          </div> */}


        </Box>
      </>
    </Modal >
  );
}
