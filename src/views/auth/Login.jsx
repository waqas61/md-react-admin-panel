import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/Logo.svg";

import { makeStyles } from "@mui/material/styles";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
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


export default function Login({
  errorMessage,
  setErrorMessage,
  handleSignIn,
  handleSignInPhone,
  isLoading,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [createType, setCreateType] = useState("email");
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>


      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (email.length > phone.length) {
            handleSignIn(email, password);
          } else {
            handleSignInPhone(phone, password);
          }
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
                placeholder="example@gmail.com"
                value={email}
                label="E-mail"
                error={errorMessage !== ""}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setErrorMessage("");
                  setEmail(e.target.value);
                }}
              />


              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  textAlign: 'center',
                  // p: 1,
                  // m: 1,
                }}
              >
                <span
                  style={{ cursor: "pointer", color: "#2561B0" }}
                  onClick={() => {
                    setCreateType("phone");
                    setEmail("");
                    localStorage.setItem("createType", "phone");
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
                // className="w-50"
                fullWidth
                required
                name="Phone"
                InputLabelProps={{
                  shrink: true,
                }}
                value={phone}
                label="Phone"
                error={errorMessage !== ""}
                variant="outlined"
                inputProps={{
                  minLength: 12,
                  maxLength: 12,
                  type: "tel",
                }}
                onChange={(e) => {
                  setErrorMessage("");
                  const inputValue = e.target.value;
                  setphone(
                    inputValue.startsWith("+1") ? inputValue : `+1${inputValue}`
                  );
                }}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9+]/g, "")
                    .slice(0, 12);
                }}
              />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  textAlign: 'center',
                  mb: 2
                }}
              >
                <span
                  style={{ cursor: "pointer", color: "#2561B0" }}
                  onClick={() => {
                    setCreateType("email");
                    setphone("");
                    localStorage.setItem("createType", "email");
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

            <TextField
              required
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => {
                setErrorMessage("");
                setPassword(e.target.value);
              }}
              // fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              // className="w-50"
              error={errorMessage !== ""}

              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      style={{ opacity: 0.6 }}
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {errorMessage && (
              <div
                className="text-start"
                style={{ color: "#FA5A16", fontSize: "0.7rem" }}
              >
                {errorMessage}
              </div>
            )}
          </Grid>


          <Grid
            item
            xs={12}
            sm={12}
            md={7}
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
                md={6}
              >
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember Me"
                  sx={{ color: "#595959" }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
              >
                <Link to={"/recover-password"} className="text-decoration-none">
                  <span style={{ color: "#2561B0" }}>Forgot Password?</span>
                </Link>
              </Grid>


            </Grid>

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
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={7}
          >
            Don't have an account?
            <Link to={"/signup"} sx={{
              textDecorationLine: 'none'
            }}>
              <span style={{
                color: "#2561B0",

              }}> Sign Up</span>
            </Link>
            <Link to={"/rere"} sx={{
              textDecorationLine: 'none'
            }}>
              <span style={{
                color: "#2561B0",

              }}> ere</span>
            </Link>
            <Link to={"/registration/selectRole"} sx={{
              textDecorationLine: 'none'
            }}>
              <span style={{
                color: "#2561B0",

              }}> selectType</span>
            </Link>
            <Link to={"/registration/owner"} sx={{
              textDecorationLine: 'none'
            }}>
              <span style={{
                color: "#2561B0",

              }}> registration/owner</span>
            </Link>
          </Grid>

        </Grid>



      </form>



      {/* <Box >
        <Stack spacing={2}>
          <Box
            sx={{
              textAlign: 'center',
            }}
          >
            <Image className="my-3" src={logo} />
            <Typography variant="h4" gutterBottom>
              Welcome
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
              <h6 className="fw-regular text-grey mx-2"> Login </h6>
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
                sm={5}
                md={12}
              >
                {createType === "email" && (
                  <TextField
                    required
                    placeholder="example@gmail.com"
                    className="w-50"
                    value={email}
                    label="E-mail"
                    error={errorMessage !== ""}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      mb: 2,
                    }}
                    onChange={(e) => {
                      setErrorMessage("");
                      setEmail(e.target.value);
                    }}
                  />
                )}
              </Grid>



              <Grid
                item
                xs={12}
                sm={7}
                md={12}
              >
                {createType === "phone" && (
                  <TextField
                    className="w-50"
                    required
                    name="Phone"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={phone}
                    label="Phone"
                    error={errorMessage !== ""}
                    variant="outlined"
                    sx={{
                      mb: 2,
                    }}
                    inputProps={{
                      minLength: 12,
                      maxLength: 12,
                      type: "tel",
                    }}
                    onChange={(e) => {
                      setErrorMessage("");
                      const inputValue = e.target.value;
                      setphone(
                        inputValue.startsWith("+1") ? inputValue : `+1${inputValue}`
                      );
                    }}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9+]/g, "")
                        .slice(0, 12);
                    }}
                  />
                )}
              </Grid>




              <Grid
                item
                xs={12}
                sm={7}
                md={12}
              >
                <TextField
                  required
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => {
                    setErrorMessage("");
                    setPassword(e.target.value);
                  }}
                  // fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className="w-50"
                  error={errorMessage !== ""}
                  sx={{
                    mb: 2,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          style={{ opacity: 0.6 }}
                          onClick={handleTogglePassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOutlined />
                          ) : (
                            <VisibilityOffOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {errorMessage && (
                  <div
                    className="text-start"
                    style={{ color: "#FA5A16", fontSize: "0.7rem" }}
                  >
                    {errorMessage}
                  </div>
                )}

              </Grid>



              <Grid
                item
                xs={12}
                sm={7}
                md={12}
              >
                {createType === "email" && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      textAlign: 'center',
                      // p: 1,
                      // m: 1,
                    }}
                  >
                    <span
                      style={{ cursor: "pointer", color: "#2561B0" }}
                      onClick={() => {
                        setCreateType("phone");
                        setEmail("");
                        localStorage.setItem("createType", "phone");
                        setErrorMessage("");
                      }}
                    >
                      Use phone number instead
                    </span>
                  </Box>
                )}



                {createType === "phone" && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <span
                      style={{ cursor: "pointer", color: "#2561B0" }}
                      onClick={() => {
                        setCreateType("email");
                        setphone("");
                        localStorage.setItem("createType", "email");
                        setErrorMessage("");
                      }}
                    >
                      Use email instead
                    </span>
                  </Box>
                )}

              </Grid>



              <Grid
                item
                xs={12}
                sm={7}
                md={12}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  // gap={4}
                  // p={8}
                  // width={500}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Remember Me"
                        sx={{ color: "#595959" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Link to={"/recover-password"} className="text-decoration-none">
                        <span style={{ color: "#2561B0" }}>Forgot Password?</span>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>

              </Grid>



              <Grid
                item
                xs={12}
                sm={7}
                md={12}
              >
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{
                    width: "50%",
                    borderRadius: "4px",
                    height: "56px",
                    background: "#2561B0",
                    boxShadow: "none",
                    textTransform: "none",
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Grid>

              <Grid
                item
                xs={12}
                sm={7}
                md={12}
              >
                Don't have an account?
                <Link to={"/signup"} className="text-decoration-none">
                  <span style={{ color: "#2561B0" }}> Sign Up</span>
                </Link>
              </Grid>

            </Grid>
          </Box>
        </Stack>
      </Box> */}

      {/* <Col xs={"auto"} xxl={4} className="text-center mx-auto mt-3">
        <Image className="my-3" src={logo} />
        <h2 className="mt-2 fw-semibold text-grey">Welcome!</h2>

        <div className="d-flex justify-content-center align-items-center mb-4">
          <hr className="pb-2 text-grey" style={{ width: "40px" }} />
          <h6 className="fw-regular text-grey mx-2"> Login </h6>
          <hr className="pb-2 text-grey" style={{ width: "40px" }} />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.length > phone.length) {
              handleSignIn(email, password);
            } else {
              handleSignInPhone(phone, password);
            }
          }}
        >
          {createType === "email" && (
            <TextField
              required
              placeholder="example@gmail.com"
              className="w-100"
              value={email}
              label="E-mail"
              error={errorMessage !== ""}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                mb: 2,
              }}
              onChange={(e) => {
                setErrorMessage("");
                setEmail(e.target.value);
              }}
            />
          )}

          {createType === "phone" && (
            <TextField
              className="w-100"
              required
              name="Phone"
              InputLabelProps={{
                shrink: true,
              }}
              value={phone}
              label="Phone"
              error={errorMessage !== ""}
              variant="outlined"
              sx={{
                mb: 2,
              }}
              inputProps={{
                minLength: 12,
                maxLength: 12,
                type: "tel",
              }}
              onChange={(e) => {
                setErrorMessage("");
                const inputValue = e.target.value;
                setphone(
                  inputValue.startsWith("+1") ? inputValue : `+1${inputValue}`
                );
              }}
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9+]/g, "")
                  .slice(0, 12);
              }}
            />
          )}

          <br />
          <TextField
            required
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => {
              setErrorMessage("");
              setPassword(e.target.value);
            }}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            className="w-100"
            error={errorMessage !== ""}
            sx={{
              mb: 2,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    style={{ opacity: 0.6 }}
                    onClick={handleTogglePassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errorMessage && (
            <div
              className="text-start"
              style={{ color: "#FA5A16", fontSize: "0.7rem" }}
            >
              {errorMessage}
            </div>
          )}
          {createType === "email" && (
            <div className="d-flex justify-content-between align-items-center mt-2 mb-4 w-100 mx-auto">
              <span
                style={{ cursor: "pointer", color: "#2561B0" }}
                onClick={() => {
                  setCreateType("phone");
                  setEmail("");
                  localStorage.setItem("createType", "phone");
                  setErrorMessage("");
                }}
              >
                Use phone number instead
              </span>
            </div>
          )}
          {createType === "phone" && (
            <div className="d-flex justify-content-between align-items-center mt-2 mb-4 w-100 mx-auto">
              <span
                style={{ cursor: "pointer", color: "associated" }}
                onClick={() => {
                  setCreateType("email");
                  setphone("");
                  localStorage.setItem("createType", "email");
                  setErrorMessage("");
                }}
              >
                Use email instead
              </span>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mb-4 w-100 mx-auto">
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember Me"
              sx={{ color: "#595959" }}
            />
            <Link to={"/recover-password"} className="text-decoration-none">
              <span style={{ color: "#2561B0" }}>Forgot Password?</span>
            </Link>
          </div>

          <Button
            variant="contained"
            type="submit"
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
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-3 text-grey">
          Don't have an account?
          <Link to={"/signup"} className="text-decoration-none">
            <span style={{ color: "#2561B0" }}> Sign Up</span>
          </Link>
        </div>
      </Col> */}
    </>


  );
}
