import CheckIcon from "@mui/icons-material/Check";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { FormControlLabel, IconButton, InputAdornment } from "@mui/material";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/Logo.svg";
import { selectVerifyToken, setAuthToken } from "../../redux/slices/authSlice";
import { selectSignupId, setUser } from "../../redux/slices/userSlice";



import Grid from "@material-ui/core/Grid";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';




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


// Item.propTypes = {
//   /**
//    * The system prop that allows defining system overrides as well as additional CSS styles.
//    */
//   sx: PropTypes.oneOfType([
//     PropTypes.arrayOf(
//       PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
//     ),
//     PropTypes.func,
//     PropTypes.object,
//   ]),
// };





export default function CreatePassword({ setView }) {
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isLowerCase, setIsLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasMinimumLength, setHasMinimumLength] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verify_token = useSelector(selectVerifyToken);
  const signup_id = useSelector(selectSignupId);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handlePasswordChange = (e) => {
    setErrorMessage("");
    const newPassword = e.target.value;
    setPassword(newPassword);

    setIsUpperCase(/[A-Z]/.test(newPassword));
    setIsLowerCase(/[a-z]/.test(newPassword));
    setHasNumber(/[0-9]/.test(newPassword));
    setHasMinimumLength(newPassword.length >= 8);
  };

  const handleConfirmPasswordChange = (e) => {
    setErrorMessage("");
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
  };

  const allRequirementsMet = isUpperCase && isLowerCase && hasNumber && hasMinimumLength;

  const handleNext = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    const url = `https://api.mddentalstaffing.com/api/v1/signup/password`;
    const params = new URLSearchParams({
      verify_token,
      signup_id,
      password,
      password_confirmation: confirmPassword,
    });

    axios
      .post(`${url}?${params.toString()}`)
      .then((res) => {
        console.log(res);
        const token = res.data.data.token;
        dispatch(setAuthToken(token));
        dispatch(setUser(res.data.data.user));
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user", JSON.parse(res.data.data.user));
        setIsLoading(false);
        navigate("/selectRole");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Sign Up Failed");
        setIsLoading(false);
      });
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

          <Grid
            item
            xs={12}
            sm={12}
            md={8}

          >
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              error={errorMessage !== ""}
              sx={{
                "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#FA5A16" },
              }}
              value={password}
              onChange={handlePasswordChange}
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
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={8}
          >
            <TextField
              fullWidth
              label="Confirm Password"
              type={showPassword2 ? "text" : "password"}
              variant="outlined"
              error={errorMessage !== ""}
              sx={{
                "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#FA5A16" },
              }}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      style={{ opacity: 0.6 }}
                      onClick={handleTogglePassword2}
                      edge="end"
                    >
                      {showPassword2 ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={8}
          >
            {errorMessage && (
              <div
                className="text-start mt-2"
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
            md={8}
          >
            <span className="text-grey mb-1 text start fw-semibold">
              Password requirements
            </span>

          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={8}
          >
            {isUpperCase ? (
              <CheckIcon
                style={{
                  color: "green",
                  fontSize: "1rem",
                }}
              />
            ) : (
              <span>&bull;</span>
            )}
            <span className="text-grey">Upper case letters (ABC)</span>

          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={8}
          >
            {isLowerCase ? (
              <CheckIcon
                style={{
                  color: "green",
                  fontSize: "1rem",
                }}
              />
            ) : (
              <span>&bull;</span>
            )}
            <span className="text-grey">Lower case letters (abc)</span>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={8}
          >
            {hasNumber ? (
              <CheckIcon
                style={{
                  color: "green",
                  fontSize: "1rem",
                }}
              />
            ) : (
              <span>&bull;</span>
            )}
            <span className="text-grey">Numbers (123)</span>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={8}
          >
            {hasMinimumLength ? (
              <CheckIcon
                style={{
                  color: "green",
                  fontSize: "1rem",
                }}
              />
            ) : (
              <span>&bull;</span>
            )}

            <span className="text-grey">Minimum characters 8</span>
          </Grid>

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
              md={4}
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
              sm={12}
              md={4}
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
                disabled={!allRequirementsMet || confirmPassword == ""}
                onClick={() => {
                  handleNext();
                }}
              >
                {isLoading ? <CircularProgress /> : "Next"}
              </Button>
            </Grid>


          </Grid>

        </Grid>

      </form>



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
              sm={12}
              md={12}
            >
              <TextField
                className="w-50 mt-3"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                error={errorMessage !== ""}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                    { borderColor: "#FA5A16" },
                }}
                value={password}
                onChange={handlePasswordChange}
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
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
            >
              <TextField
                className="w-50 mt-3"
                label="Confirm Password"
                type={showPassword2 ? "text" : "password"}
                variant="outlined"
                error={errorMessage !== ""}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                    { borderColor: "#FA5A16" },
                }}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        style={{ opacity: 0.6 }}
                        onClick={handleTogglePassword2}
                        edge="end"
                      >
                        {showPassword2 ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOffOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
            >
              {errorMessage && (
                <div
                  className="text-start mt-2"
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
              md={12}
            >
              <span className="text-grey mb-1 text start fw-semibold">
                Password requirements
              </span>

            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
            >
              {isUpperCase ? (
                <CheckIcon
                  style={{
                    color: "green",
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <span>&bull;</span>
              )}
              <span className="text-grey">Upper case letters (ABC)</span>

            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
            >
              {isLowerCase ? (
                <CheckIcon
                  style={{
                    color: "green",
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <span>&bull;</span>
              )}
              <span className="text-grey">Lower case letters (abc)</span>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
            >
              {hasNumber ? (
                <CheckIcon
                  style={{
                    color: "green",
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <span>&bull;</span>
              )}
              <span className="text-grey">Numbers (123)</span>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
            >
              {hasMinimumLength ? (
                <CheckIcon
                  style={{
                    color: "green",
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <span>&bull;</span>
              )}

              <span className="text-grey">Minimum characters 8</span>
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
                </Item>

                <Item>
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
                      minWidth: '250px'
                    }}
                    disabled={!allRequirementsMet || confirmPassword == ""}
                    onClick={() => {
                      handleNext();
                    }}
                  >
                    {isLoading ? <CircularProgress /> : "Next"}
                  </Button>
                </Item>
              </Box>


            </Grid>


          </Grid>

        </Box>
      </Stack> */}


      {/* <Col md={5} className="text-center mx-auto mt-3">
        <Image className="mb-5 mt-3" src={logo} />
        <h2 className="mt-2 fw-semibold text-grey">Create Password</h2>
        <div className="mb-4 text-grey">
          Enter the password you would like to use with your account.
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
        >
          <TextField
            className="w-100 mt-3"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            error={errorMessage !== ""}
            sx={{
              "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                { borderColor: "#FA5A16" },
            }}
            value={password}
            onChange={handlePasswordChange}
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
          <TextField
            className="w-100 mt-3"
            label="Confirm Password"
            type={showPassword2 ? "text" : "password"}
            variant="outlined"
            error={errorMessage !== ""}
            sx={{
              "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                { borderColor: "#FA5A16" },
            }}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    style={{ opacity: 0.6 }}
                    onClick={handleTogglePassword2}
                    edge="end"
                  >
                    {showPassword2 ? (
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
              className="text-start mt-2"
              style={{ color: "#FA5A16", fontSize: "0.7rem" }}
            >
              {errorMessage}
            </div>
          )}
          <Row className="mt-3 fs-small text-start">
            <span className="text-grey mb-1 text start fw-semibold">
              Password requirements
            </span>
            <Col sm={"auto"} className="d-flex align-items-center mb-0.5 mx-auto">
              {isUpperCase ? (
                <CheckIcon
                  style={{
                    color: "green",
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <span>&bull;</span>
              )}
            </Col>
            <Col>
              <span className="text-grey">Upper case letters (ABC)</span>
            </Col>
          </Row>
          <Row className="mt-1 fs-small text-start">
            <Col sm={"auto"} className="d-flex align-items-center mb-0.5 mx-auto">
              {isLowerCase ? (
                <CheckIcon
                  style={{
                    color: "green",
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <span>&bull;</span>
              )}
            </Col>
            <Col>
              <span className="text-grey">Lower case letters (abc)</span>
            </Col>
          </Row>
          <Row className="mt-1 fs-small text-start">
            <Col sm={"auto"} className="d-flex align-items-center mb-0.5 mx-auto">
              {hasNumber ? (
                <CheckIcon
                  style={{
                    color: "green",
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <span>&bull;</span>
              )}
            </Col>
            <Col>
              <span className="text-grey">Numbers (123)</span>
            </Col>
          </Row>
          <Row className="mt-1 fs-small text-start">
            <Col sm={"auto"} className="d-flex align-items-center mb-0.5 mx-auto">
              {hasMinimumLength ? (
                <CheckIcon
                  style={{
                    color: "green",
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <span>&bull;</span>
              )}
            </Col>
            <Col>
              <span className="text-grey">Minimum characters 8</span>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col className="mb-2 mb-lg-0" md={6}>
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
            <Col md={6}>
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
                disabled={!allRequirementsMet || confirmPassword == ""}
              >
                {isLoading ? <CircularProgress /> : "Next"}
              </Button>
            </Col>
          </Row>
        </form>
      </Col> */}


    </>
  );
}
