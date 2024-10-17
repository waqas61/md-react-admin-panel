import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';


import logo from "../../assets/icons/Logo.svg";
import { setVerifyToken } from "../../store/slices/authSlice";


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


const VerifyEmail = ({ email, phone, setView }) => {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleResend = () => {
    setCodes(["", "", "", "", "", ""]);
    setErrorMessage("");
    if (email.length > phone.length) {
      axios
        .post(`https://api.mddentalstaffing.com/api/v1/signup?email=${email}`)
        .then((response) => {
          alert("Email Sent Again");
        })
        .catch((error) => {
          console.error("Error sending POST request:", error);
        });
    } else if (phone.length > email.length) {
      axios
        .post(`https://api.mddentalstaffing.com/api/v1/signup?mobile=${phone}`)
        .then((response) => {
          alert("Text Sent Again");
        })
        .catch((error) => {
          console.error("Error sending POST request:", error);
        });
    }
  };

  const handleArrowKey = (index, direction) => {
    const newIndex = direction === "left" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < 6) {
      document.getElementById(`code-input-${newIndex}`).focus();
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.key === "ArrowLeft") {
      handleArrowKey(index, "left");
    } else if (e.key === "ArrowRight") {
      handleArrowKey(index, "right");
    }
  };

  const handleChange = (index, value) => {
    const newCodes = [...codes];
    newCodes[index] = value;

    if (value && index < 5) {
      document.getElementById(`code-input-${index + 1}`).focus();
    } else if (!value && index > 0) {
      document.getElementById(`code-input-${index - 1}`).focus();
    }

    setCodes(newCodes);
  };

  const handleNext = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true);
    const verificationCode = codes.join("");

    axios
      .post(
        `https://api.mddentalstaffing.com/api/v1/signup/verify?verify_token=${verificationCode}`
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch(setVerifyToken(verificationCode));
          localStorage.setItem("verify_token", verificationCode);
          setView("createpass");
        } else {
          console.error(`Unexpected status code: ${response.status}`);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setErrorMessage("Code Incorrect");
        } else {
          console.error(error);
        }
      });
    setIsLoading(false);
  };

  return (
    <>

      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        {codes.map((code, index) => (
          <Grid
            item
            xs={2}
            sm={2}
            md={1}
          // gap={1}
          >
            <TextField
              id={`code-input-${index}`}
              // className="form-control text-end"
              placeholder="0"
              error={errorMessage != ""}
              value={code}
              onChange={(e) => {
                setErrorMessage("");
                const value = e.target.value;
                if (/^[0-9]?$/.test(value)) {
                  handleChange(index, value);
                } else if (value === "") {
                  handleChange(index, "");
                }
              }}
              inputProps={{
                style: { textAlign: "center" },
                maxLength: 1,
                type: "tel",
              }}
              onKeyDown={(e) => handleKeyPress(index, e)}
            />
          </Grid>
        ))}

        {errorMessage && (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
          >
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
          </Grid>
        )}
      </Grid>


      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
        >
          <Box
            sx={{
              // display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              // p: 1,
              // m: 1,
            }}
          >
            Didn't recieve it? Please wait for a few minutes and
            <Link to={"#"} className="text-decoration-none">
              <span onClick={handleResend} style={{ color: "#2561B0" }}>
                {" "}
                resend the code.
              </span>
            </Link>
          </Box>
        </Grid>
      </Grid>


      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
        >
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            sx={{
              borderRadius: "4px",
              height: "56px",
              border: "2px solid #2561B0",
              color: "#2561B0",
              boxShadow: "none",
              textTransform: "none",
              // minWidth: '250px'
            }}
            onClick={() => {
              setView("signup");
            }}
          >
            Back
          </Button>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={3}
        >
          <Button
            fullWidth
            disabled={!codes[codes.length - 1].length}
            onClick={handleNext}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "4px",
              height: "56px",
              border: "2px solid #2561B0",
              color: "#2561B0",
              boxShadow: "none",
              textTransform: "none",
              // minWidth: '250px'
            }}
          >
            {isLoading ? <CircularProgress /> : "Next"}
          </Button>
        </Grid>

      </Grid>



      {/* <Stack spacing={2}>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            p: 1,
            m: 1,
          }}
          alignItems="center"
        >

          <Grid container spacing={1}>

            <Grid
              item
              xs={12}
              sm={7}
              md={12}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                {codes.map((code, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    md={1}
                    gap={4}
                  >
                    <TextField
                      id={`code-input-${index}`}
                      className="form-control text-end"
                      placeholder="0"
                      error={errorMessage != ""}
                      value={code}
                      onChange={(e) => {
                        setErrorMessage("");
                        const value = e.target.value;
                        if (/^[0-9]?$/.test(value)) {
                          handleChange(index, value);
                        } else if (value === "") {
                          handleChange(index, "");
                        }
                      }}
                      inputProps={{
                        style: { textAlign: "center" },
                        maxLength: 1,
                        type: "tel",
                      }}
                      onKeyDown={(e) => handleKeyPress(index, e)}
                    />
                  </Grid>
                ))}
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={7}
              md={12}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                  // p: 1,
                  // m: 1,
                }}
              >
                {errorMessage && (
                  <div
                    className="text-start mt-2"
                    style={{ color: "#FA5A16", fontSize: "0.7rem" }}
                  >
                    {errorMessage}
                  </div>
                )}
              </Box>












            </Grid>

            <Grid
              item
              xs={12}
              sm={7}
              md={12}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                  // p: 1,
                  // m: 1,
                }}
              >
                Didn't recieve it? Please wait for a few minutes and
                <Link to={"#"} className="text-decoration-none">
                  <span onClick={handleResend} style={{ color: "#2561B0" }}>
                    {" "}
                    resend the code.
                  </span>
                </Link>
              </Box>
            </Grid>


            <Grid
              item
              xs={12}
              sm={12}
              md={12}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 1,
                  m: 1,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                }}
              >

                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    width: "100%",
                    borderRadius: "4px",
                    height: "56px",
                    border: "2px solid #2561B0",
                    color: "#2561B0",
                    boxShadow: "none",
                    textTransform: "none",
                    minWidth: '250px'
                  }}
                  onClick={() => {
                    setView("signup");
                  }}
                >
                  Back
                </Button>
                <Button
                  disabled={!codes[codes.length - 1].length}
                  onClick={handleNext}
                  variant="contained"
                  color="primary"
                  sx={{
                    width: "100%",
                    borderRadius: "4px",
                    height: "56px",
                    background: "#2561B0",
                    boxShadow: "none",
                    textTransform: "none",
                    minWidth: '250px'
                  }}
                >
                  {isLoading ? <CircularProgress /> : "Next"}
                </Button>
              </Box>

            </Grid>


          </Grid>

        </Box>
      </Stack> */}


      {/* <Box >
        <Stack spacing={2}>
          <Box
            sx={{
              textAlign: 'center',
            }}
          >
            <Image className="my-3" src={logo} />
            <Typography variant="h4" gutterBottom>
              Verify {email.length > phone.length ? "Email" : "Phone Number"}
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
                We just sent a code to
                <Link to={"#"} className="text-decoration-none">
                  <span style={{ color: "#2561B0" }}>
                    {" "}
                    {email.length > phone.length ? email : phone}
                  </span>
                </Link>
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
            <Grid container spacing={1}>

              <Grid
                item
                xs={12}
                sm={7}
                md={12}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  {codes.map((code, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={1}
                      md={1}
                      gap={4}
                    >
                      <TextField
                        id={`code-input-${index}`}
                        className="form-control text-end"
                        placeholder="0"
                        error={errorMessage != ""}
                        value={code}
                        onChange={(e) => {
                          setErrorMessage("");
                          const value = e.target.value;
                          if (/^[0-9]?$/.test(value)) {
                            handleChange(index, value);
                          } else if (value === "") {
                            handleChange(index, "");
                          }
                        }}
                        inputProps={{
                          style: { textAlign: "center" },
                          maxLength: 1,
                          type: "tel",
                        }}
                        onKeyDown={(e) => handleKeyPress(index, e)}
                      />
                    </Grid>
                  ))}
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sm={7}
                md={12}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    // p: 1,
                    // m: 1,
                  }}
                >
                  {errorMessage && (
                    <div
                      className="text-start mt-2"
                      style={{ color: "#FA5A16", fontSize: "0.7rem" }}
                    >
                      {errorMessage}
                    </div>
                  )}
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sm={7}
                md={12}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    // p: 1,
                    // m: 1,
                  }}
                >
                  Didn't recieve it? Please wait for a few minutes and
                  <Link to={"#"} className="text-decoration-none">
                    <span onClick={handleResend} style={{ color: "#2561B0" }}>
                      {" "}
                      resend the code.
                    </span>
                  </Link>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                  }}
                >
                  <Item>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        width: "50%",
                        borderRadius: "4px",
                        height: "56px",
                        border: "2px solid #2561B0",
                        color: "#2561B0",
                        boxShadow: "none",
                        textTransform: "none",
                        minWidth: '250px'
                      }}
                      onClick={() => {
                        setView("signup");
                      }}
                    >
                      Back
                    </Button>
                  </Item>

                  <Item>

                    <Button
                      disabled={!codes[codes.length - 1].length}
                      onClick={handleNext}
                      variant="contained"
                      color="primary"
                      sx={{
                        width: "50%",
                        borderRadius: "4px",
                        height: "56px",
                        background: "#2561B0",
                        boxShadow: "none",
                        textTransform: "none",
                        minWidth: '250px'
                      }}
                    >
                      {isLoading ? <CircularProgress /> : "Next"}
                    </Button>

                  </Item>

                </Box>


              </Grid>

            </Grid>
          </Box>
        </Stack>
      </Box> */}

      {/* <Col
        xs={10}
        sm={6}
        md={5}
        lg={5}
        xxl={4}
        className="text-center mx-auto mt-3"
      >
        <Image className="mt-3 mb-5" src={logo} />
        <h2 className="mt-3 fw-semibold text-grey">
          Verify {email.length > phone.length ? "Email" : "Phone Number"}
        </h2>
        <div className="mb-5 text-grey fs-small">
          We just sent a code to
          <Link to={"#"} className="text-decoration-none">
            <span style={{ color: "#2561B0" }}>
              {" "}
              {email.length > phone.length ? email : phone}
            </span>
          </Link>
        </div>
        <Row className="text-center justify-content-center mb-3">
          {codes.map((code, index) => (
            <Col className="mx-1 p-0 text-center" key={index}>
              <TextField
                id={`code-input-${index}`}
                className="form-control text-end"
                placeholder="0"
                error={errorMessage != ""}
                value={code}
                onChange={(e) => {
                  setErrorMessage("");
                  const value = e.target.value;
                  if (/^[0-9]?$/.test(value)) {
                    handleChange(index, value);
                  } else if (value === "") {
                    handleChange(index, "");
                  }
                }}
                inputProps={{
                  style: { textAlign: "center" },
                  maxLength: 1,
                  type: "tel",
                }}
                onKeyDown={(e) => handleKeyPress(index, e)}
              />
            </Col>
          ))}
          {errorMessage && (
            <div
              className="text-start mt-2"
              style={{ color: "#FA5A16", fontSize: "0.7rem" }}
            >
              {errorMessage}
            </div>
          )}
        </Row>
        <div className="mb-4 fs-small text-grey text-start mt-2">
          Didn't recieve it? Please wait for a few minutes and
          <Link to={"#"} className="text-decoration-none">
            <span onClick={handleResend} style={{ color: "#2561B0" }}>
              {" "}
              resend the code.
            </span>
          </Link>
        </div>

        <Row>
          <Col xs={4}>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                width: "100%",
                borderRadius: "4px",
                height: "56px",
                border: "2px solid #2561B0",
                color: "#2561B0",
                boxShadow: "none",
                textTransform: "none",
              }}
              onClick={() => {
                setView("signup");
              }}
            >
              Back
            </Button>
          </Col>
          <Col xs={8}>
            <Button
              disabled={!codes[codes.length - 1].length}
              onClick={handleNext}
              variant="contained"
              color="primary"
              sx={{
                width: "100%",
                borderRadius: "4px",
                height: "56px",
                background: "#2561B0",
                boxShadow: "none",
                textTransform: "none",
              }}
            >
              {isLoading ? <CircularProgress /> : "Next"}
            </Button>
          </Col>
        </Row>
      </Col> */}

    </>
  );
};

export default VerifyEmail;
