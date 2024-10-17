
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
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

import logo from '../../assets/icons/Logo.svg';
import shoulder from '../../assets/images/registerPracticeOwner.jpg';
import PersonalDetails from './practice-owner-reg/PersonalDetails';
import CompanyDetails from './practice-owner-reg/CompanyDetails';
import Subscriptions from './practice-owner-reg/Subscriptions';
import { selectUser } from '../../store/slices/userSlice';

import { makeStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  root: {
    // height: "auto",
    paddingBottom: "100%",
    display: "block",
    position: "relative"
    // position:"relative",
    // top:0
    // maxHeight:0,
    // minHeight:"372px"
  },
  media: {
    position: "absolute",
    // position: "absolute",
    left: 0,
    top: 0,
    height: "100%", //auto
    // maxWidth:"100%"
    objectFit: "scale-down"
  }
}));

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



export default function PracticeOwnerReg() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [activeStep, setActiveStep] = useState(
    user && user.steps_completed ? parseInt(user.steps_completed) + 1 : 0
  );
  const classes = styles();


  useEffect(() => {
    //   // if (!user.role_type) {
    //   //   navigate('/login');
    //   // } else if (user && user.role_type === 'general') {
    //   //   navigate('/selectRole');
    //   // } else if (user && user.role_type === 'professional') {
    //   //   navigate('/registration/professional');
    //   // }

    if (user.steps_completed === 0 || user.steps_completed == null) {
      setActiveStep(1);
    } else if (user.steps_completed === 1) {
      setActiveStep(2);
    } else if (user.steps_completed === 2) {
      setActiveStep(3);
    } else if (user.steps_completed === 3) {
      console.log('Btu ');
      // if (user.is_contract_signed === true) {
      //   navigate('/registration/completed');
      // } else {
      //   navigate('/registration/agreement');
      // }
    } else {
      console.log('BTADADA', user.steps_completed);
    }

  }, [navigate, user]);

  const steps = [
    { label: 'Step 1', alternativeLabel: 'Personal Details' },
    { label: 'Step 2', alternativeLabel: 'Company Details' },
    { label: 'Step 3', alternativeLabel: 'Subscription' },
  ];

  return (
    <>

      <Grid
        container
        spacing={1}
      // justifyContent="center"
      // alignItems="center"
      >
        <Grid item
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

                <Box >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <img src={logo} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Typography
                        variant="h5"
                        sx={{
                          marginTop: '32px'
                        }}
                      >
                        Create an account for Practice Owner
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Box
                  sx={{
                    mt: 2
                  }}
                >

                  <Stepper
                    activeStep={activeStep - 1}
                    connector={<ColorStepConnector />}
                    className='m-0 p-0'
                  >
                    {steps.map((step, index) => (
                      <Step key={index}>
                        <StepLabel >
                          {/* <span className='fw-semibold'> </span> */}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>

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
                        Address
                      </Typography>

                      <Typography variant="subtitle1" gutterBottom
                        sx={{
                          color: 'lightgrey'
                        }}
                      >
                        Step 2
                      </Typography>

                    </Box>

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
                        Subscription
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom
                        sx={{
                          color: 'lightgrey'
                        }}
                      >
                        Step 3
                      </Typography>

                    </Box>

                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {activeStep === 1 ? (
                  <PersonalDetails setActiveStep={setActiveStep} />
                ) : activeStep === 2 ? (
                  <CompanyDetails setActiveStep={setActiveStep} />
                ) : activeStep === 3 ? (
                  <Subscriptions setActiveStep={setActiveStep} />
                ) : null}
              </Grid>
            </Grid>
          </Box >

        </Grid >

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
          <img
            style={{
              // width: '100%',
              // position: 'fixed',
              height: '100vh', position: 'fixed', width: '25%'
            }}
            src={shoulder}
          />
        </Grid>

      </Grid >


      {/* <Row
        style={{ width: '100vw', margin: '0' }}
        className='justify-content-between'
      >
        <Col className='p-0'>
          <Container className='mx-2 mx-md-5 my-2 my-md-4'>
            <Image src={logo} />
            <div className='text-grey fs-2 my-4 fw-semibold'>
              Create an account for Practice Owner
            </div>
            <hr className='text-lightgrey' style={{ width: '95%' }} />
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
                <span className='fw-semibold'>Address / Company Details</span>
                <br />
                <span style={{ fontSize: '0.8rem' }} className='text-lightgrey'>
                  Step 2
                </span>
              </Col>
              <Col className='px-0 mx-0 text-end' sm={3}>
                <span className='fw-semibold mb-0'>Subscription</span>
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
              <CompanyDetails setActiveStep={setActiveStep} />
            ) : activeStep === 3 ? (
              <Subscriptions setActiveStep={setActiveStep} />
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
