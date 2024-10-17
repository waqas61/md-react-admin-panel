import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Col, Image } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/Logo.svg";
import { setSignupId } from "../../redux/slices/userSlice";

import Grid from "@material-ui/core/Grid";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import AccountCircle from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'center',
  // color: theme.palette.text.secondary,
}));








export default function SignUp({ phone, setPhone, email, setEmail, setView }) {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [createType, setCreateType] = useState("email");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setPhone(inputValue.startsWith("+1") ? inputValue : `+1${inputValue}`);
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
      <Box >
        <Stack spacing={2}>
          <Box
            sx={{
              textAlign: 'center',
            }}
          >
            <Image className="my-3" src={logo} />
            <Typography variant="h4" gutterBottom>
              Create Password
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
              <h6 className="fw-regular text-grey mx-2">
                Enter the password you would like to use with your account.

              </h6>
              <hr className="pb-2 text-grey" style={{ width: "40px" }} />
            </Box>
          </Box>
        </Stack>



        <Stack spacing={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              p: 1,
              m: 1,
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
            >
              <Grid container spacing={1}>

                <Grid
                  item
                  xs={12}
                  sm={5}
                  md={12}
                >


                  {createType === "email" && (
                    <>
                      <TextField
                        required
                        type="email"
                        className="w-100"
                        label="E-mail"
                        placeholder="example@gmail.com"
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        error={errorMessage !== ""}
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
                      <br />
                      {errorMessage && (
                        <div
                          className="text-start mt-2"
                          style={{ color: "#FA5A16", fontSize: "0.7rem" }}
                        >
                          {errorMessage}
                        </div>
                      )}

                      <div className="d-flex justify-content-between align-items-center my-4 w-100 mx-auto">
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
                      </div>
                    </>
                  )}



                  {createType === "phone" && (
                    <>
                      <TextField
                        required
                        className="w-100"
                        label="Phone"
                        variant="outlined"
                        value={phone}
                        onChange={handlePhoneChange}
                        error={errorMessage !== ""}
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                            { borderColor: "#FA5A16" },
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

                      <br />
                      {errorMessage && (
                        <div
                          className="text-start"
                          style={{ color: "#FA5A16", fontSize: "0.7rem" }}
                        >
                          {errorMessage}
                        </div>
                      )}

                      <div className="d-flex justify-content-between align-items-center my-4 w-100 mx-auto">
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
                      </div>
                    </>
                  )}
                  <div className="mx-auto mb-4 w-100">
                    <ReCAPTCHA
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={handleCaptchaVerify}
                    />
                  </div>


                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={7}
                  md={12}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      width: "100%",
                      borderRadius: "4px",
                      height: "56px",
                      background: "#2561B0",
                      marginTop: "16px",
                      boxShadow: "none",
                      textTransform: "none",
                    }}
                    disabled={!isCaptchaVerified || isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : "Next"}
                  </Button>
                </Grid>

              </Grid>
            </form>
          </Box>
        </Stack>
      </Box>


      {/* <Col md={5} className="text-center mx-auto mt-3">
        <Image className="my-3" src={logo} />
        <h2 className="mt-5 fw-semibold text-grey">Create Account</h2>
        <div className="mb-5 text-grey">
          Already have an account?
          <Link to={"/login"} className="text-decoration-none">
            <span style={{ color: "#2561B0" }}> Sign In</span>
          </Link>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
        >
          {createType === "email" && (
            <>
              <TextField
                required
                type="email"
                className="w-100"
                label="E-mail"
                placeholder="example@gmail.com"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                error={errorMessage !== ""}
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
              <br />
              {errorMessage && (
                <div
                  className="text-start mt-2"
                  style={{ color: "#FA5A16", fontSize: "0.7rem" }}
                >
                  {errorMessage}
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center my-4 w-100 mx-auto">
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
              </div>
            </>
          )}
          {createType === "phone" && (
            <>
              <TextField
                required
                className="w-100"
                label="Phone"
                variant="outlined"
                value={phone}
                onChange={handlePhoneChange}
                error={errorMessage !== ""}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                    { borderColor: "#FA5A16" },
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

              <br />
              {errorMessage && (
                <div
                  className="text-start"
                  style={{ color: "#FA5A16", fontSize: "0.7rem" }}
                >
                  {errorMessage}
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center my-4 w-100 mx-auto">
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
              </div>
            </>
          )}
          <div className="mx-auto mb-4 w-100">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={handleCaptchaVerify}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              width: "100%",
              borderRadius: "4px",
              height: "56px",
              background: "#2561B0",
              marginTop: "16px",
              boxShadow: "none",
              textTransform: "none",
            }}
            disabled={!isCaptchaVerified || isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Next"}
          </Button>
        </form>
      </Col> */}

    </>
  );
}
