import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import AccountCircle from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';



import logo from "../../assets/icons/Logo.svg";
import { setSignupId } from "../../store/slices/userSlice";



// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
//   ...theme.applyStyles('dark', {
//     backgroundColor: '#1A2027',
//   }),
// }));









export default function SignUp({ phone, setPhone, email, setEmail, setView }) {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [createType, setCreateType] = useState("email");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const [width, setWidth] = useState(window.innerWidth);

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const sm = useMediaQuery(theme.breakpoints.only('sm'));
  const md = useMediaQuery(theme.breakpoints.only('md'));
  const lg = useMediaQuery(theme.breakpoints.only('lg'));
  const xl = useMediaQuery(theme.breakpoints.only('xl'));

  // useEffect(() => {
  //   console.log('xs ==== >', xs);
  //   console.log('sm ==== >', sm);
  // }, [xs, sm]);



  const handleCaptchaVerify = () => {
    setIsCaptchaVerified(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handlePhoneChange = (e) => {
    setErrorMessage("");
    const inputValue = e.target.value;
    if (inputValue === '+') {
    } else {
      setPhone(inputValue.startsWith("+1") ? inputValue : `+1${inputValue}`);
    }

  };

  const dispatch = useDispatch();

  const handleNext = () => {
    setIsLoading(true);

    if (createType === "email") {
      axios
        .post(`https://api.mddentalstaffing.com/api/v1/signup?email=${email}`)
        .then((res) => {
          const { signup_id } = res.data.data;
          dispatch(setSignupId(signup_id));
          localStorage.setItem("signup_id", signup_id);
          setView("verify");
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            setErrorMessage("Account Already Exists");
          } else {
            console.log(error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (createType === "phone") {
      axios
        .post(`https://api.mddentalstaffing.com/api/v1/signup?mobile=${phone}`)
        .then((res) => {
          console.log(res);
          const { signup_id } = res.data.data;
          dispatch(setSignupId(signup_id));
          localStorage.setItem("signup_id", signup_id);
          setView("verify");
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 409) {
            setErrorMessage("Account Already Exists");
          } else {
            console.log(error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>


      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >



        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >

          {createType === "email" && (
            <Grid
              item
              xs={12}
              sm={12}
              md={7}
            >
              <TextField
                required
                fullWidth
                type="email"
                label="E-mail"
                placeholder="example@gmail.com"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                error={errorMessage !== ""}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                    { borderColor: "#FA5A16" },
                }}
                InputProps={{
                  style: { borderColor: errorMessage !== "" ? "#FA5A16" : "" },
                }}
                FormHelperTextProps={{
                  style: { color: "#FA5A16" },
                }}
              />
              {errorMessage && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >

                  <div
                    className="text-start mt-2"
                    style={{ color: "#FA5A16", fontSize: "0.7rem" }}
                  >
                    {errorMessage}
                  </div>

                </Box>
              )}

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  textAlign: 'center',
                  mt: 1
                }}
              >
                <span
                  style={{ cursor: "pointer", color: "#2561B0" }}
                  onClick={() => {
                    setCreateType("phone");
                    setEmail("");
                    setErrorMessage("");
                  }}
                >
                  Use phone number instead
                </span>
              </Box>
            </Grid>
          )}

          {createType === "phone" && (
            <Grid
              item
              xs={12}
              sm={12}
              md={7}
            >
              <TextField
                required
                fullWidth
                // className="w-100"
                label="Phone"
                variant="outlined"
                value={phone}
                onChange={handlePhoneChange}
                error={errorMessage !== ""}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                    { borderColor: "#FA5A16" },
                  mb: 2,
                  // width: {
                  //   xs: 200,//0
                  //   sm: 400,//600
                  //   md: 600,//900
                  //   lg: 600,//1200
                  //   xl: 800,//1536
                  // }
                }}
                inputProps={{ minLength: 12, maxLength: 12, type: "tel" }} // Added minLength and maxLength
                InputProps={{
                  style: {
                    borderColor: errorMessage !== "" ? "#FA5A16" : "",
                  },
                }}
                FormHelperTextProps={{
                  style: { color: "#FA5A16" },
                }}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9+]/g, "")
                    .slice(0, 12);
                }}
              />

              {errorMessage && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >

                  <div
                    className="text-start mt-2"
                    style={{ color: "#FA5A16", fontSize: "0.7rem" }}
                  >
                    {errorMessage}
                  </div>

                </Box>
              )}

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  textAlign: 'start',
                }}
              >
                <span
                  style={{ cursor: "pointer", color: "#2561B0" }}
                  onClick={() => {
                    setCreateType("email");
                    setPhone("");
                    setErrorMessage("");
                  }}
                >
                  Use email instead
                </span>
              </Box>

            </Grid>
          )}

          <Grid
            item
            xs={12}
            sm={12}
            md={7}
          >
            {/* <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={handleCaptchaVerify}
            /> */}



            {xs ? (
              <ReCAPTCHA
                key="compact-recaptcha"
                size="compact"
                theme="light"
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={handleCaptchaVerify}
              />
            ) : (
              <ReCAPTCHA
                key="normal-recaptcha"
                size="normal"
                theme="light"
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={handleCaptchaVerify}
              />
            )}



          </Grid>











          <Grid
            item
            xs={12}
            sm={12}
            md={7}
          >

            <Button
              fullWidth
              variant="contained"
              type="submit"
              color="primary"
              sx={{
                // width: "100%",
                borderRadius: "4px",
                height: "56px",
                background: "#2561B0",
                boxShadow: "none",
                textTransform: "none",
              }}
              disabled={!isCaptchaVerified || isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Next"}
            </Button>
          </Grid>





          <Grid
            item
            xs={12}
            sm={12}
            md={7}
          >



            <Link to={"/login"} sx={{
              textDecorationLine: 'none'
            }}>
              <span style={{
                color: "#2561B0",

              }}> Sign in</span>
            </Link>

          </Grid>

        </Grid>

      </form>
    </>
  );
}
