
import { Link } from "react-router-dom";

import React, { useEffect, useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import leftShoulder from '../assets/images/leftShoulderLogin.jpg';
import rightShoulder from '../assets/images/rightShoulderLogin.jpg';
import logo from "../assets/icons/Logo.svg";


import {
  Button,
  Checkbox,
  CircularProgress,
} from '@mui/material';

import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from "@material-ui/core";
import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }, []);

  return (
    <>

      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Image
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
                <Image src={logo} />
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
                  Sorry !
                </Typography>


                <Divider sx={{
                  mt: 2,
                  mb: 4,
                  color: 'black',
                  borderColor: 'black',
                }} />


                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 'bold'
                  }}
                >
                  Page Not Found (404)
                </Typography>


                <Link to={"/"} >
                  <span style={{ color: "#2561B0" }}>Go Back</span>
                </Link>



                <Box component="p" sx={{ p: 2, mt: 40 }}>
                  <Typography
                    variant="body1" gutterBottom
                    sx={{
                      fontSize: '0.73rem'
                    }}
                  >
                    If you have any questions, please contact us at:{' '}
                    <a href='https://maydaydentalstaffing.com'>
                      maydaydentalstaffing.com
                    </a>{' '}
                    <br />. Mayday Dental Staffing is a registered trademark. Copyright ©
                    Mayday Dental Staffing. All rights reserved. Patent pending.
                  </Typography>
                </Box>



              </Box>
            </Stack>

          </Grid>

          <Grid item xs={2}>
            <Image
              style={{ height: '100vh', width: '100%' }}
              // className='img-fluid'
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
          className='m-0'
          md={8}
        >
          <Col xs={"auto"} xxl={4} className="text-center mx-auto mt-3">
            <Image className="my-3" src={logo} />
            <h2 className="mt-2 fw-semibold text-grey">Sorry!</h2>
            <div className="d-flex justify-content-center align-items-center mb-4">
              <hr className="pb-2 text-grey" style={{ width: "40px" }} />
              <h6 className="fw-regular text-grey mx-5">  Not Found (404) </h6>
              <hr className="pb-2 text-grey" style={{ width: "40px" }} />
            </div>

            <div className="mt-3 text-grey">
              <h1 className="fw-regular text-grey">Page Not Found (404) </h1>
              <Link to={"/"} className="text-decoration-none">
                <span style={{ color: "#2561B0" }}>Go Back</span>
              </Link>
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
