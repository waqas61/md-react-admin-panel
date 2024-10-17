import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';


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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

import { makeStyles } from '@mui/styles'
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

import { selectUser, setUser } from '../../../store/slices/userSlice';
import LoadingButton from '../../../ui-component/LoadingButton';


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

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    backgroundColor: '#ffffff',
    color: '#333333',
    display: 'flex',
    alignItems: 'center',
  },
  dialog: {
    maxWidth: '50vw',
    maxHeight: '90vh',
    width: '100%',
    height: '100%',
  },
  categoryButtons: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  categoryButton: {
    padding: theme.spacing(1),
    backgroundColor: '#FAFAFA',
    color: '#333333',
    cursor: 'pointer',
    border: '1px solid #D8D8D8',
    marginLeft: '3px',
  },
  activeCategory: {
    backgroundColor: '#ffffff',
    color: '#2561B0',
    borderBottom: 'none',
  },
  content: {
    fontSize: '16px',
    lineHeight: '1.6',
  },
}));


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

  const user = useSelector(selectUser);
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedValue, setSelectedValue] = useState(3);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [totalAmount, setTotalAmount] = useState(null);


  const gettotalPlacements = async (selectedApplicant) => {
    axios.get(`https://api.mddentalstaffing.com/api/v1/owner/placements`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then((response) => {

      var total_placements = response.data.placements;
      var amount = 0;
      var hours = 0;
      var mins = 0;
      item.proposal_posting_schedules.map((sch, index) => {
        hours = hours + Number(moment.utc(moment(sch.end_time, "HH:mm:ss").diff(moment(sch.start_time, "HH:mm:ss"))).format("HH"));
        mins = mins + Number(moment.utc(moment(sch.end_time, "HH:mm:ss").diff(moment(sch.start_time, "HH:mm:ss"))).format("mm"));
      });
      var minToHours = mins / 60;
      if (minToHours > 1) {
        hours = hours + minToHours;
      }
      var total_amount = hours * 52 * item.hiring_rate;

      if (total_placements >= 0 || total_placements <= 2) {
        amount = (9 / 100) * total_amount;
      } else if (total_placements >= 3 || total_placements <= 4) {
        amount = (8 / 100) * total_amount;
      } else if (total_placements >= 5 || total_placements <= 6) {
        amount = (7 / 100) * total_amount;
      } else if (total_placements >= 7 || total_placements <= 8) {
        amount = (6 / 100) * total_amount;
      } else {
        amount = (5 / 100) * total_amount;
      }

      console.log('total_amount -===== > ', total_amount);
      console.log('Percent -===== > ', amount);
      amount = amount.toFixed(2);

      setTotalAmount(amount);
    }).catch((e) => console.log(e));
  };


  useEffect(() => {
    gettotalPlacements();
  }, []);





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
    <Dialog
      open={isOpen}
      onClose={onClose}
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle className={classes.dialogTitle}>
        Hire This Professional.
        <div
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          <CloseIcon onClick={onClose} />
        </div>
      </DialogTitle>
      <DialogContent>
        <Typography id='modal-modal-title_des' variant='h6' component='h2'>
          Please be aware that by pressing "Confirm" you are agreeing to hire:
        </Typography>

        <Box sx={{ flexGrow: 1, mt: 1 }}>

          <Grid container spacing={1}>
            <Grid item xs={4}>
              Company
            </Grid>
            <Grid item xs={8}>
              {user.companies[0].name}
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
        {totalAmount && (
          <Box sx={{ flexGrow: 1, mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Grid container spacing={2} className={"border border-2 rounded mb-3"} >
                  <Grid className="d-flex ms-3 align-items-center" item xs={6}>
                    <div className="text-start">
                      <label className="text-start" htmlFor={`swsw`} >
                        ${totalAmount}
                        <br />{" "}
                        <span className="fw-semibold">Full Payment</span>
                        {/* <p>Pay the payment placement fee in full</p> */}
                      </label>
                    </div>
                  </Grid>

                  <Grid item xs={1} className="p-3">
                    <FormControl component="fieldset">
                      <RadioGroup aria-label="Waas erw"
                        name="pay_type"
                        value={selectedValue}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio color="primary" />}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container spacing={2} className={"border border-2 rounded mb-3"} >
                  <Grid className="d-flex ms-3 align-items-center" item xs={6}>
                    <div className="text-start">
                      <label className="text-start" htmlFor={`swsw`} >
                        ${(totalAmount / 2).toFixed(2)} x 2
                        <br />{" "}
                        <span className="fw-semibold">Pay 1/2</span>
                      </label>
                    </div>
                  </Grid>

                  <Grid item xs={1} className="p-3">
                    <FormControl component="fieldset">
                      <RadioGroup aria-label="Waas erw"
                        name="pay_type"
                        value={selectedValue}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="2"
                          control={<Radio color="primary" />}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container spacing={2} className={"border border-2 rounded mb-3"} >
                  <Grid className="d-flex ms-1 align-items-center" item xs={6}>
                    <div className="text-start">
                      <label className="text-start" htmlFor={`swsw`} >
                        ${(totalAmount / 3).toFixed(2)} x 3
                        <br />{" "}
                        <span className="fw-semibold">Pay 1/3</span>
                      </label>
                    </div>
                  </Grid>

                  <Grid item xs={1} className="p-3">
                    <FormControl component="fieldset">
                      <RadioGroup aria-label="Waas erw"
                        name="pay_type"
                        value={selectedValue}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="3"
                          control={<Radio color="primary" />}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}


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
      </DialogContent>
      <DialogActions>
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
      </DialogActions>
    </Dialog>
  );





  // return (
  //   <Modal open={isOpen} onClose={onClose}>
  //     <Box sx={style}>
  //       <div
  //         className='d-flex'
  //         style={{
  //           justifyContent: 'space-between',
  //           alignItems: 'center',
  //         }}
  //       >
  //         <Typography id='modal-modal-title' variant='h6' component='h2'>
  //           Hire This Professional.
  //         </Typography>
  //         <div
  //           style={{
  //             display: 'flex',
  //             justifyContent: 'flex-end',
  //             cursor: 'pointer',
  //           }}
  //           onClick={onClose}
  //         >
  //           <svg
  //             xmlns='http://www.w3.org/2000/svg'
  //             width='20'
  //             height='20'
  //             fill='currentColor'
  //             class='bi bi-x'
  //             viewBox='0 0 16 16'
  //           >
  //             <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
  //           </svg>
  //         </div>
  //       </div>


  //       <Typography id='modal-modal-description' sx={{ mt: 1 }}>

  //         <Typography id='modal-modal-title_des' variant='h6' component='h2'>
  //           Please be aware that by pressing "Confirm" you are agreeing to hire:
  //         </Typography>

  //         <Box sx={{ flexGrow: 1, mt: 1 }}>

  //           <Grid container spacing={1}>
  //             <Grid item xs={4}>
  //               Company
  //             </Grid>
  //             <Grid item xs={8}>
  //               {user.companies[0].name}
  //             </Grid>
  //           </Grid>

  //           <Grid container spacing={2} >
  //             <Grid item xs={4}>
  //               Would like to hire to
  //             </Grid>
  //             <Grid item xs={8}>
  //               Permanent Job
  //             </Grid>
  //           </Grid>

  //           <Grid container spacing={2} >
  //             <Grid item xs={4}>
  //               As
  //             </Grid>
  //             <Grid item xs={8}>
  //               <Box gridColumn="span 8" >
  //                 <Grid container spacing={0.5}>
  //                   {item.posting.title}
  //                 </Grid>
  //               </Box>
  //             </Grid>
  //           </Grid>

  //           <Grid container spacing={2} sx={{ mt: 0.5 }}>
  //             <Grid item xs={4}>
  //               For
  //             </Grid>
  //             <Grid item xs={8}>
  //               {item.proposal_posting_schedules.map((sch, index) => {
  //                 return (
  //                   <>
  //                     <Grid item xs={12}>
  //                       {sch.schedule_day.toUpperCase()}
  //                       {'        '}
  //                       {moment(sch.start_time, 'HH:mm:ss').utc().format("hh:mm A")}
  //                       {'  -  '}
  //                       {moment(sch.end_time, 'HH:mm:ss').utc().format("hh:mm A")}
  //                     </Grid>
  //                   </>
  //                 );
  //               })}
  //             </Grid>
  //           </Grid>

  //           <Grid container spacing={2} sx={{ mt: 0.5 }}>
  //             <Grid item xs={4}>
  //               At
  //             </Grid>
  //             <Grid item xs={8}>
  //               <Box gridColumn="span 8" >
  //                 <Grid container spacing={0.5}>
  //                   ${item.hiring_rate}/hour
  //                 </Grid>
  //               </Box>
  //             </Grid>
  //           </Grid>
  //         </Box>
  //         {totalAmount && (
  //           <Box sx={{ flexGrow: 1, mt: 1 }}>
  //             <Grid container spacing={2}>
  //               <Grid item xs={4}>
  //                 <Grid container spacing={2} className={"border border-2 rounded mb-3"} >
  //                   <Grid className="d-flex ms-3 align-items-center" item xs={6}>
  //                     <div className="text-start">
  //                       <label className="text-start" htmlFor={`swsw`} >
  //                         ${totalAmount}
  //                         <br />{" "}
  //                         <span className="fw-semibold">Full Payment</span>
  //                         {/* <p>Pay the payment placement fee in full</p> */}
  //                       </label>
  //                     </div>
  //                   </Grid>

  //                   <Grid item xs={1} className="p-3">
  //                     <FormControl component="fieldset">
  //                       <RadioGroup aria-label="Waas erw"
  //                         name="pay_type"
  //                         value={selectedValue}
  //                         onChange={handleChange}
  //                       >
  //                         <FormControlLabel
  //                           value="1"
  //                           control={<Radio color="primary" />}
  //                         />
  //                       </RadioGroup>
  //                     </FormControl>
  //                   </Grid>
  //                 </Grid>
  //               </Grid>
  //               <Grid item xs={4}>
  //                 <Grid container spacing={2} className={"border border-2 rounded mb-3"} >
  //                   <Grid className="d-flex ms-3 align-items-center" item xs={6}>
  //                     <div className="text-start">
  //                       <label className="text-start" htmlFor={`swsw`} >
  //                         ${(totalAmount / 2).toFixed(2)} x 2
  //                         <br />{" "}
  //                         <span className="fw-semibold">Pay 1/2</span>
  //                       </label>
  //                     </div>
  //                   </Grid>

  //                   <Grid item xs={1} className="p-3">
  //                     <FormControl component="fieldset">
  //                       <RadioGroup aria-label="Waas erw"
  //                         name="pay_type"
  //                         value={selectedValue}
  //                         onChange={handleChange}
  //                       >
  //                         <FormControlLabel
  //                           value="2"
  //                           control={<Radio color="primary" />}
  //                         />
  //                       </RadioGroup>
  //                     </FormControl>
  //                   </Grid>
  //                 </Grid>
  //               </Grid>
  //               <Grid item xs={4}>
  //                 <Grid container spacing={2} className={"border border-2 rounded mb-3"} >
  //                   <Grid className="d-flex ms-1 align-items-center" item xs={6}>
  //                     <div className="text-start">
  //                       <label className="text-start" htmlFor={`swsw`} >
  //                         ${(totalAmount / 3).toFixed(2)} x 3
  //                         <br />{" "}
  //                         <span className="fw-semibold">Pay 1/3</span>
  //                       </label>
  //                     </div>
  //                   </Grid>

  //                   <Grid item xs={1} className="p-3">
  //                     <FormControl component="fieldset">
  //                       <RadioGroup aria-label="Waas erw"
  //                         name="pay_type"
  //                         value={selectedValue}
  //                         onChange={handleChange}
  //                       >
  //                         <FormControlLabel
  //                           value="3"
  //                           control={<Radio color="primary" />}
  //                         />
  //                       </RadioGroup>
  //                     </FormControl>
  //                   </Grid>
  //                 </Grid>
  //               </Grid>
  //             </Grid>
  //           </Box>
  //         )}


  //         <Box sx={{ flexGrow: 1, mt: 1 }}>
  //           <Stack sx={{ width: '100%' }} spacing={1}>
  //             <Alert
  //               severity='error'
  //               style={{
  //                 color: 'red',
  //                 backgroundColor: 'rgb(250, 238, 222)',
  //               }}
  //             >
  //               Referral fee will be applied on official start date.
  //               Please note that if you ask this candidate to work extra days during the week Mayday Dental Staffing has to know about it and it has to be put in through the system as a temporary assignment. If you ask this candidate to be hired for extra days permanently, Mayday Dental Staffing has to know about it and it has to be put through the system as a permanent assignment.
  //               Our calculation is based on 8 working hours. We do not take into consideration less than eight hours or overtime in our calculation of permanent referral fee. Our calculation is always based on 52 working weeks.
  //             </Alert>
  //           </Stack>
  //         </Box>

  //         <Box sx={{ flexGrow: 1, mt: 1 }}>
  //           <p required={true} sx={{ width: '100%', mt: 4 }} style={{
  //             color: '#f11e1e'
  //           }}>
  //             You are obligated to notify Mayday Dental Staffing immediately of any additional days whether
  //             temporary and permanent by contacting.  Mayday Dental Staffing
  //           </p>
  //         </Box>

  //       </Typography>

  //       <div
  //         style={{
  //           display: 'flex',
  //           alignItems: 'center',
  //           justifyContent: 'space-between',
  //         }}
  //       >


  //         <div>
  //           <Button
  //             onClick={onClose}
  //             color='primary'
  //             variant='contained'
  //             style={{
  //               backgroundColor: 'transparent',
  //               color: '#194378',
  //               border: 'none',
  //             }}
  //           >
  //             Cancel
  //           </Button>


  //           <LoadingButton
  //             color='primary'
  //             variant='contained'
  //             style={{
  //               // textTransform: 'none',
  //               padding: '5px 20px',
  //               borderRadius: '4px',
  //               transition: 'background-color 0.3s',
  //               border: "1px solid #2561B0",
  //               color: '#fff',
  //               backgroundColor: '#FA5A16',
  //             }}
  //             loading={loading}
  //             done={finished}
  //             onClick={hireprofessional}
  //           >
  //             Confirm
  //           </LoadingButton>


  //         </div>
  //       </div>
  //     </Box>
  //   </Modal >
  // );
};

export default HiringProfessionalModal;


