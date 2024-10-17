
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";


import CheckIcon from "@mui/icons-material/Check";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { FormControlLabel, IconButton, InputAdornment } from "@mui/material";
import { Button, CircularProgress, TextField, Grid } from "@mui/material";

import { selectVerifyToken, setAuthToken } from "../../store/slices/authSlice";
import { selectSignupId, setUser, selectUser } from "../../store/slices/userSlice";



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
  const user = useSelector(selectUser);

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

    axios.post(`${url}?${params.toString()}`).then((res) => {

      const token = res.data.data.token;
      const valid_user = res.data.data.user;
      console.log('valid_user === >', typeof valid_user, valid_user);

      dispatch(setAuthToken(token));
      dispatch(setUser(valid_user));
      localStorage.setItem("auth_token", token);
      // localStorage.setItem("user", JSON.parse(res.data.data.user));
      localStorage.setItem("user", JSON.stringify(valid_user));

      setIsLoading(false);
      navigate("/registration/selectRole");
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
            md={7}

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
            md={7}
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
            md={7}
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
            md={7}
          >
            <span className="text-grey mb-1 text start fw-semibold">
              Password requirements
            </span>

          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={7}
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
            md={7}
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
            md={7}
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
            md={7}
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
                md={6}
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

        </Grid>
      </form>
    </>
  );
}
