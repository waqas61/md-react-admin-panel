import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { redirect } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';



import menuItem from '../../menu-items';
import storeMenuItems from '../../menu-items/store-menu-items';

import { selectMenuList, setMenuList } from '../../store/slices/menuListSlice';
import { setAuthToken } from '../../store/slices/authSlice';
import { selectAuthToken, selectIsloggedin } from "../../store/slices/authSlice";
import { selectUser, setUser, setIsloggedin } from '../../store/slices/userSlice';

import logo from "../../assets/icons/Logo.svg";
import leftShoulder from '../../assets/images/leftShoulderLogin.jpg';
import rightShoulder from '../../assets/images/rightShoulderLogin.jpg';
import Login from './Login';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));


export default function LoginPage() {
  const menu = useSelector(selectMenuList);
  const user = useSelector(selectUser);
  const authToken = useSelector(selectAuthToken);
  const isloggedin = useSelector(selectIsloggedin);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log('menu s==== > menu ', menu, menuItem);
  // }, [menu, menuItem]);

  useEffect(() => {
    // if (user.role_type && user.role_type === 'general') {
    //   navigate('/selectRole');
    // } else if (user.role_type && user.role_type === 'owner') {
    //   if (user.is_profile_completed) {
    //     navigate('/');
    //   } else {
    //     navigate('/registration/owner');
    //   }
    // } else if (user.role_type && user.role_type === 'professional') {
    //   if (user.is_profile_completed) {
    //     navigate('/');
    //   } else {
    //     navigate('/registration/professional');
    //   }
    // }
  }, [navigate, user.role_type, user.is_profile_completed]);

  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (email, password) => {
    setIsLoading(true);

    const requestData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        'https://api.mddentalstaffing.com/api/v1/login',
        requestData
      );
      const userData = response.data.data;
      userData['user']['authToken'] = userData.token;

      dispatch(setUser(userData.user));
      dispatch(setAuthToken(userData.token));
      dispatch(setIsloggedin(true));
      if (userData.user.role_type === 'professional') {
        dispatch(setMenuList(storeMenuItems.professionalMenuList));
      } else {
        dispatch(setMenuList(storeMenuItems.ownerMenuList));
      }

      localStorage.setItem('auth_token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData.user));

      console.log('Login ....');
      navigate('/');

      // if (userData.user.is_profile_completed) {
      //   if (userData.user.role_type === 'owner') {
      //     navigate('/dashboard');
      //   } else if (userData.user.role_type === 'professional') {
      //     navigate('/dashboard');
      //   } else {
      //     navigate('/dashboard');
      //   }
      // } else if (!userData.user.is_verified) {
      //   navigate('/signup');
      // } else if (userData.user.role_type === 'general') {
      //   navigate('/registration/selectRole');
      // } else if (userData.user.role_type === 'owner') {
      //   navigate('/registration/owner');
      // } else if (userData.user.role_type === 'professional') {
      //   navigate('/registration/professional');
      // } else {
      //   navigate('/');
      // }
    } catch (error) {
      setErrorMessage('Invalid Credentials');
    }

    setIsLoading(false);
  };

  const handleSignInPhone = (phone, password) => {
    setIsLoading(true);
    axios
      .post(`https://api.mddentalstaffing.com/api/v1/login`, {
        mobile: phone,
        password: password,
      })
      .then((response) => {
        dispatch(setAuthToken(response.data.data.token));
        dispatch(setUser(response.data.data.user));
        localStorage.setItem('auth_token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        console.log(user);

        if (user.is_verified !== true) {
          navigate('/signup');
        } else if (user.role_type === 'general') {
          navigate('/selectRole');
        } else if (user.role_type === 'owner') {
          navigate('/registration/owner');
        } else if (user.role_type === 'professional') {
          navigate('/registration/professional');
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        setErrorMessage('Invalid Credential');
      });
    setIsLoading(false);
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

            <Stack spacing={2}>
              <Box
                sx={{
                  textAlign: 'center',
                }}
                alignItems="center"
              >
                <img className="my-3" src={logo} />
                <Typography variant="h4" gutterBottom>
                  Welcome!
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                  }}
                >
                  {/* <hr className="pb-2 text-grey" style={{ width: "40px" }} /> */}
                  <h6 className="fw-regular text-grey mx-2"> Sign In </h6>
                  {/* <hr className="pb-2 text-grey" style={{ width: "40px" }} /> */}
                </Box>
              </Box>
            </Stack>

            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Login
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                handleSignIn={handleSignIn}
                handleSignInPhone={handleSignInPhone}
                isLoading={isLoading}
              />
            </Stack>

            <Box
              sx={{
                mt: 20
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





      {/* <Box
        display="flex"
        alignItems="center"
        gap={4}
        sx={{ flexGrow: 1 }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={2} //0
            sm={6} //600
            md={6} //900
            lg={6} //1200
            xl={6} //1536
          >
            <Image
              style={{ height: '100vh', width: '100%' }}
              className='img-fluid'
              src={leftShoulder}
            />
          </Grid>
          <Grid item xs={8}>

            <Box
              display="flex"
              alignItems="center"
              gap={4}
              p={2}
            >
              <Login
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                handleSignIn={handleSignIn}
                handleSignInPhone={handleSignInPhone}
                isLoading={isLoading}
              />
            </Box>

          </Grid>
          <Grid item xs={2}>
            <Image
              style={{ height: '100vh', width: '100%' }}
              className='img-fluid'
              src={rightShoulder}
            />
          </Grid>
        </Grid>
      </Box> */}









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
          <Login
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            handleSignIn={handleSignIn}
            handleSignInPhone={handleSignInPhone}
            isLoading={isLoading}
          />
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
