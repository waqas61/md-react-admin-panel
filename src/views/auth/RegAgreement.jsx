
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'


import hammer from '../../assets/icons/HammerAgreement.svg';
import logo from '../../assets/icons/Logo.svg';
import leftShoulder from '../../assets/images/leftShoulderLogin.jpg';
import rightShoulder from '../../assets/images/rightShoulderLogin.jpg';

import { selectUser } from '../../store/slices/userSlice';
import { setUser } from '../../store/slices/userSlice';

export default function RegAgreement() {
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();



  useEffect(() => {
    // if (!user) {
    //   navigate('/login');
    // } else if (user && user.role_type === 'general') {
    //   navigate('/selectRole');
    // } else if (user && parseInt(user.steps_completed) !== 3) {
    //   navigate(`/registration/${user.role_type}`);
    // }
  }, [navigate, user]);

  const [isLoading, setIsLoading] = useState(false);
  const authToken = localStorage.getItem('auth_token');

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post(
        'https://api.mddentalstaffing.com/api/v1/signup/profile/contracts?is_signed_contract=1',
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        dispatch(setUser(res.data.data));
        localStorage.setItem('user', JSON.stringify(res.data.data));
        navigate('/registration/completed');
      })
      .catch((e) => {
        setError(true);
        console.log(e);
      });
  };

  return (
    <>

      <Box
        display="flex"
        alignItems="center"
        gap={4}
        sx={{
          flexGrow: 1,
          // width: {
          // 	xs: 100,//0
          // 	sm: 200,//600
          // 	md: 300,//900
          // 	lg: 400,//1200
          // 	xl: 500,//1536
          // }
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
            </Stack>
            <Stack >
              <Box
                sx={{
                  m: 15
                  // textAlign: 'center',
                  // alignItems: "center"
                }}
              // justifyContent="center"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        // p: 1,
                        color: '#FA5A16',
                        fontWeight: 'bold'
                      }}
                    >
                      IMPORTANT NOTICE
                    </Typography>

                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{
                        // p: 1,
                        color: '#595959'
                      }}
                    >
                      As per agreed contracts all bookings for personnel must be
                      through the Mayday Dental Staffing application. Any contact for
                      interviews and/or attempts to hire staff either permanently or
                      temporary supplied through Mayday Dental outside the contracted
                      agreements will result in investigation and legal action as
                      defined in the contract.
                    </Typography>
                    <FormControlLabel
                      // className='my-2'
                      control={
                        <Checkbox
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                          color='primary'
                        />
                      }
                      label='Yes, I agree'
                    />

                    <Button
                      variant='contained'
                      type='submit'
                      color='primary'
                      disabled={!isChecked}
                      sx={{
                        width: '75%',
                        borderRadius: '4px',
                        height: '56px',
                        background: '#2561B0',
                        boxShadow: 'none',
                        textTransform: 'none',
                      }}
                      onClick={handleSubmit}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} color='inherit' />
                      ) : (
                        'Join'
                      )}
                    </Button>
                    {error && <p className='text-danger'>Error</p>}

                  </Grid>
                  <Grid item xs={12} md={6}>
                    <img src={hammer} />
                  </Grid>
                </Grid>
              </Box>
            </Stack>


          </Grid>

          <Grid item xs={2}>
            <img
              style={{ height: '100vh', width: '100%' }}
              className='img-fluid'
              src={rightShoulder}
            />
          </Grid>
        </Grid>
      </Box>



      {/* <Row className='justify-content-between p-0 m-0'>
        <Col className='d-none d-md-grid p-0 m-0' md={2}>
          <Image
            style={{ height: '100vh' }}
            className='img-fluid'
            src={leftShoulder}
          />
        </Col>

        <Col
          style={{ display: 'flex', flexDirection: 'column' }}
          className='m-0 align-items-center justify-content-center'
          md={8}
        >
          <Image className='my-3' style={{ height: '5rem' }} src={logo} />
          <Col
            xs={12}
            md={10}
            xxl={7}
            className='d-flex align-items-center justify-content-center my-auto mt-3'
            style={{ height: '75vh' }}
          >
            <Row className='my-auto'>
              <Col className='text-start' sm={8}>
                <h2 className='fw-semibold' style={{ color: '#FA5A16' }}>
                  IMPORTANT NOTICE
                </h2>
                <p className='m-0' style={{ color: '#595959' }}>
                  As per agreed contracts all bookings for personnel must be
                  through the Mayday Dental Staffing application. Any contact for
                  interviews and/or attempts to hire staff either permanently or
                  temporary supplied through Mayday Dental outside the contracted
                  agreements will result in investigation and legal action as
                  defined in the contract.
                </p>
                <FormControlLabel
                  className='my-2'
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      color='primary'
                    />
                  }
                  label='Yes, I agree'
                />
                <Button
                  variant='contained'
                  type='submit'
                  color='primary'
                  disabled={!isChecked}
                  sx={{
                    width: '75%',
                    borderRadius: '4px',
                    height: '56px',
                    background: '#2561B0',
                    boxShadow: 'none',
                    textTransform: 'none',
                  }}
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color='inherit' />
                  ) : (
                    'Join'
                  )}
                </Button>
                {error && <p className='text-danger'>Error</p>}
              </Col>
              <Col className='d-none d-md-block' sm={4}>
                <Image src={hammer} className='img-fluid' />
              </Col>
            </Row>
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
          <Image
            style={{ height: '100vh' }}
            className='img-fluid ms-auto'
            src={rightShoulder}
          />
        </Col>
      </Row> */}
    </>
  );
}
