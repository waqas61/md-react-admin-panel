
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


import {
  Step,
  StepConnector,
  StepLabel,
  Stepper,
} from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { withStyles } from '@mui/styles'
import Typography from '@mui/material/Typography';


import logo from '../../assets/icons/Logo.svg';
import shoulder from '../../assets/images/registerProfessional.jpg';

import PersonalDetails from '../../views/auth/practice-owner-reg/PersonalDetails';
import Speciality from '../../views/auth/professional-reg/Speciality';
import Questionnaire from '../../views/auth/professional-reg/Questionnaire';

import { selectUser } from '../../store/slices/userSlice';





// import Grid from '@mui/material/Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


const ColorStepConnector = withStyles({
  active: {
    '& $line': {
      backgroundImage: 'linear-gradient( 95deg,#00c853 0%, #00c853 100%)',
      height: 1.5,
    },
  },
  completed: {
    '& $line': {
      backgroundImage: 'linear-gradient( 95deg, #00c853 0%, #00c853 100%)',
      height: 1.5,
    },
  },
  line: {
    height: 1.5, // Adjusted thickness
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    marginLeft: 12, // Adjusted margin
    marginRight: 12, // Adjusted margin
  },
})(StepConnector);

export default function ProfessionalReg() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  // useEffect(() => {
  //   // if (!user.role_type) {
  //   //   navigate('/login');
  //   // } else if (user && user.role_type === 'general') {
  //   //   navigate('/selectRole');
  //   // } else if (user && user.role_type === 'owner') {
  //   //   navigate('/registration/owner');
  //   // }

  //   if (user.steps_completed === 0) {
  //     setActiveStep(1);
  //   } else if (user.steps_completed === 1) {
  //     setActiveStep(2);
  //   } else if (user.steps_completed === 2) {
  //     setActiveStep(3);
  //   } else if (user.steps_completed === 3) {
  //     if (user.is_contract_signed === true) {
  //       navigate('/registration/completed');
  //     } else {
  //       navigate('/registration/agreement');
  //     }
  //   }
  // }, [navigate, user]);

  const steps = [
    { label: 'Step 1', alternativeLabel: 'Personal Details' },
    { label: 'Step 2', alternativeLabel: 'Add Speciality' },
    { label: 'Step 3', alternativeLabel: 'Questionaire' },
  ];

  return (
    <>

      {/* <Box sx={{ mt: 2 }} > */}
      <Grid
        container
        spacing={1}
      // justifyContent="center"
      // alignItems="center"
      >
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            display: {
              xs: 'flex',
              sm: 'flex',
            }
          }}
        >

          <Box
            sx={{
              p: 5,
            }}
          >
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <img src={logo} />
                {/* <div className='text-grey fs-2 my-4 fw-semibold'>
                  Create an account for Professional.
                </div> */}
                <Typography variant="h5" gutterBottom
                  sx={{
                    mt: 2
                  }}
                >
                  Create an account for Professional.
                </Typography>

              </Grid>
              <Grid item xs={12}>
                <Stepper
                  activeStep={activeStep - 1}
                  connector={<ColorStepConnector />}
                  className='m-0 p-0'
                >
                  {steps.map((step, index) => (
                    <Step key={index}>
                      <StepLabel>
                      </StepLabel>
                      {/* <StepLabel className='text-start'>
                        <span className='fw-semibold'> </span>
                      </StepLabel> */}
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>

                    <Typography variant="subtitle2" gutterBottom>
                      Personal Details
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom
                      sx={{
                        color: 'lightgrey'
                      }}
                    >
                      Step 1
                    </Typography>


                    {/* <span className='fw-semibold'>
                      Login Info / Personal Details
                    </span>
                    <br />
                    <span style={{ fontSize: '0.8rem' }} className='text-lightgrey'>
                      Step 1
                    </span> */}
                  </Grid>
                  <Grid item xs={4}>





                    <Box
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center"
                      }}
                    >

                      <Typography variant="subtitle2" gutterBottom>
                        Specialty
                      </Typography>

                      <Typography variant="subtitle1" gutterBottom
                        sx={{
                          color: 'lightgrey'
                        }}
                      >
                        Step 2
                      </Typography>

                    </Box>





                    {/* <span className='fw-semibold'>Add Specialty</span>
                    <br />
                    <span style={{ fontSize: '0.8rem' }} className='text-lightgrey'>
                      Step 2
                    </span> */}

                  </Grid>
                  <Grid item xs={4}>

                    <Box
                      sx={{
                        justifyContent: "center",
                        alignItems: "end",

                      }}
                      textAlign="end"
                    >

                      <Typography variant="subtitle2" gutterBottom>
                        Questionnaire
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom
                        sx={{
                          color: 'lightgrey'
                        }}
                      >
                        Step 3
                      </Typography>

                    </Box>


                    {/* <span className='fw-semibold mb-0'>Questionnaire</span>
                    <br />
                    <span style={{ fontSize: '0.8rem' }} className='text-lightgrey'>
                      Step 3
                    </span> */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {activeStep === 1 ? (
                  <PersonalDetails setActiveStep={setActiveStep} />
                ) : activeStep === 2 ? (
                  <Speciality setActiveStep={setActiveStep} />
                ) : activeStep === 3 ? (
                  <Questionnaire setActiveStep={setActiveStep} />
                ) : null}

              </Grid>
            </Grid>
          </Box>

        </Grid>

        <Grid
          item
          md={3}
          xs={3}
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'block'
            }
          }}
        >
          {/* <img
            style={{
              // width: '100%',
              // position: 'fixed',
              height: '100vh', position: 'fixed', width: '25%'
            }}
            src={shoulder}
          /> */}

          <img
            style={{ height: '100vh', width: '100%' }}
            className='img-fluid'
            src={shoulder}
          />

        </Grid>

      </Grid>
      {/* </Box> */}
      {/* <Row
        style={{ width: '100vw', margin: '0' }}
        className='justify-content-between'
      >
        <Col className='p-0'>
          <Container className='mx-2 mx-md-5 my-2 my-md-4'>
            <Image src={logo} />
            <div className='text-grey fs-2 my-4 fw-semibold'>
              Create an account for Professional
            </div>
            <hr className='text-lightgrey' />
            <Row className='p-0 m-0 mb-2' style={{ width: '95%' }}>
              <Stepper
                activeStep={activeStep - 1}
                connector={<ColorStepConnector />}
                className='m-0 p-0'
              >
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepLabel className='text-start'>
                      <span className='fw-semibold'> </span>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Row>
            <Row
              className='d-none d-md-flex p-0 pe-3 m-0 mx-2 justify-content-between '
              style={{ width: '95%' }}
            >
              <Col className='px-0 mx-0' sm={3}>
                <span className='fw-semibold'>
                  Login Info / Personal Details
                </span>
                <br />
                <span style={{ fontSize: '0.8rem' }} className='text-lightgrey'>
                  Step 1
                </span>
              </Col>
              <Col className='px-0 mx-0 text-center' sm={3}>
                <span className='fw-semibold'>Add Specialty</span>
                <br />
                <span style={{ fontSize: '0.8rem' }} className='text-lightgrey'>
                  Step 2
                </span>
              </Col>
              <Col className='px-0 mx-0 text-end' sm={3}>
                <span className='fw-semibold mb-0'>Questionnaire</span>
                <br />
                <span style={{ fontSize: '0.8rem' }} className='text-lightgrey'>
                  Step 3
                </span>
              </Col>
            </Row>
            <br />
            {activeStep === 1 ? (
              <PersonalDetails setActiveStep={setActiveStep} />
            ) : activeStep === 2 ? (
              <Speciality setActiveStep={setActiveStep} />
            ) : activeStep === 3 ? (
              <Questionnaire setActiveStep={setActiveStep} />
            ) : null}
          </Container>
        </Col>
        <Col md={3} className='p-0 m-0 d-none d-md-flex justify-content-end'>
          <Image
            style={{ height: '100vh', position: 'fixed', width: '25%' }}
            src={shoulder}
          />
        </Col>
      </Row> */}
    </>
  );
}
