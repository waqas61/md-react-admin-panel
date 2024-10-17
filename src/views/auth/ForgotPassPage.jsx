import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import logo from "../../assets/icons/Logo.svg";
import leftShoulder from '../../assets/images/leftShoulderLogin.jpg';
import rightShoulder from '../../assets/images/rightShoulderLogin.jpg';

import ForgotPass from './ForgotPass';
import ForgotPassPhone from './ForgotPassPhone';

import { selectUser } from '../../store/slices/userSlice';


export default function ForgotPassPage() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const createType = localStorage.getItem('createType');

  useEffect(() => {
    if (user.role_type) {
      navigate('/login');
    }
  }, [navigate, user.role_type]);
  return (
    <>

      <Box
        display="flex"
        alignItems="center"
        gap={4}
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

            {/* <Stack spacing={2}>
              <Box
                sx={{
                  textAlign: 'center',
                }}
                alignItems="center"
              >
                <Image className="my-3" src={logo} />
                <Typography variant="h4" gutterBottom>
                  Password Recovery
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                  }}
                >
                  <hr className="pb-2 text-grey" style={{ width: "40px" }} />
                  <h6 className="fw-regular text-grey mx-2"> Can't Log In? </h6>
                  <hr className="pb-2 text-grey" style={{ width: "40px" }} />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Please enter you email address accociated with your account
                  </Typography>
                </Box>
              </Box>
            </Stack> */}


            {createType && createType === 'phone' ? (
              <ForgotPassPhone />
            ) : (
              <ForgotPass />
            )}

            <Box
              sx={{
                mt: 25
              }}
            >
              <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                >
                  <p
                    className="mt-auto text-center mx-auto text-lightgrey"
                    style={{ fontSize: "0.73rem" }}
                  >
                    If you have any questions, please contact us at:{" "}
                    <a href="https://maydaydentalstaffing.com">
                      maydaydentalstaffing.com
                    </a>{" "}
                    <br />. Mayday Dental Staffing is a registered trademark. Copyright ©
                    Mayday Dental Staffing. All rights reserved. Patent pending.
                  </p>
                </Grid>
              </Grid>
            </Box>



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
          style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
          className='px-3 m-0'
          md={8}
        >
          {createType && createType === 'phone' ? (
            <ForgotPassPhone />
          ) : (
            <ForgotPass />
          )}
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
