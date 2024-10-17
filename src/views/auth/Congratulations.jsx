
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import leftShoulder from '../../assets/images/leftShoulderLogin.jpg';
import rightShoulder from '../../assets/images/rightShoulderLogin.jpg';
import { selectUser } from '../../store/slices/userSlice';


import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import logo from '../../assets/icons/Logo.svg';


export default function Congratulations() {
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  useEffect(() => {
    // if (!user.role_type) {
    //   navigate('/login');
    // } else if (user.steps_completed !== 3) {
    //   navigate(`/registration/${user.role_type}`);
    // }
  }, [navigate, user]);

  return (
    <>



      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <img
              style={{ height: '100vh', width: '100%' }}
              className='img-fluid'
              src={leftShoulder}
            />
          </Grid>
          <Grid item xs={8}>

            <Stack >
              <Box
                sx={{
                  textAlign: 'center',
                  alignItems: "center",
                  mt: 5
                }}
              >
                <img src={logo} />
              </Box>
              <Box
                sx={{
                  textAlign: 'center',
                  alignItems: "center",
                  mt: 5
                }}
              >
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    fontWeight: 'bold'
                  }}
                >
                  Congratulations!
                </Typography>

                <Typography
                  variant="body1" gutterBottom
                  sx={{
                    mt: 6,
                    fontWeight: 'bold'
                    // fontSize: '0.73rem'
                  }}
                >
                  You have successfully registered with MayDay Dental Staffing.
                </Typography>

                <Button
                  variant='contained'
                  color='primary'
                  sx={{
                    mt: 6,
                    width: '40%',
                    borderRadius: '4px',
                    height: '56px',
                    background: '#2561B0',
                    boxShadow: 'none',
                    textTransform: 'none',
                  }}
                  onClick={() => {
                    if (
                      user &&
                      user.role_type === 'owner' &&
                      parseInt(user.steps_completed) === 3
                    ) {
                      navigate('/');
                    } else if (
                      user &&
                      user.role_type === 'professional' &&
                      parseInt(user.steps_completed) === 3
                    ) {
                      navigate('/');
                    }
                  }}
                >
                  Ok
                </Button>


              </Box>
            </Stack>

          </Grid>

          <Grid item xs={2}>
            <img
              style={{ height: '100vh', width: '100%' }}
              // className='img-fluid'
              src={rightShoulder}
            />
          </Grid>
        </Grid>
      </Box >


      {/* <Row className='justify-content-between p-0 m-0'>
        <Col className='d-none d-md-grid p-0 m-0' md={2}>
          <img
            style={{ height: '100vh' }}
            className='img-fluid'
            src={leftShoulder}
          />
        </Col>

        <Col
          style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
          className='px-3 m-0'
          md={8}
        >
          <img
            className='mb-5 mt-3 mx-auto'
            style={{ width: '10rem' }}
            src={logo}
          />
          <Col md={6} className='text-center mx-auto my-auto'>
            <h1 className='mt-2 mb-3 fw-semibold text-grey'>Congratulations!</h1>
            <div className=''>
              <h6 className='fw-regular mx-2'>
                You have successfully registered with MayDay Dental Staffing.{' '}
              </h6>

              <br />
              <Button
                variant='contained'
                color='primary'
                sx={{
                  width: '60%',
                  borderRadius: '4px',
                  height: '56px',
                  background: '#2561B0',
                  boxShadow: 'none',
                  textTransform: 'none',
                }}
                onClick={() => {
                  if (
                    user &&
                    user.role_type === 'owner' &&
                    parseInt(user.steps_completed) === 3
                  ) {
                    navigate('/');
                  } else if (
                    user &&
                    user.role_type === 'professional' &&
                    parseInt(user.steps_completed) === 3
                  ) {
                    navigate('/');
                  }
                }}
              >
                Ok
              </Button>
            </div>
          </Col>

          <p
            className='mt-auto text-center mx-auto text-lightgrey'
            style={{ fontSize: '0.73rem' }}
          >
            If you have any questions, please contact us at:{' '}
            <a href='https://maydaydentalstaffing.com'>
              maydaydentalstaffing.com
            </a>{' '}
            <br />. Mayday Dental Staffing is a registered trademark. Copyright ©
            Mayday Dental Staffing. All rights reserved. Patent pending.
          </p>
        </Col>

        <Col className='d-none d-md-grid p-0 m-0' md={2}>
          <img
            style={{ height: '100vh' }}
            className='img-fluid ms-auto'
            src={rightShoulder}
          />
        </Col>
      </Row> */}

    </>
  );
}
