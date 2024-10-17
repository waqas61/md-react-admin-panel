import {
  FormControl,
  Grid,
  InputLabel,
  Typography,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { FormControlLabel } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LocationCandidate.css";

export default function LocationCandidate({
  selectedLocation,
  setSelectedLocation,
  selectedRadio,
  setSelectedRadio,
  errorState,
  successState,
  viewMode,
}) {
  const [locations, setLocations] = useState([]);
  const authToken = localStorage.getItem("auth_token");

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  useEffect(() => {
    axios
      .get("https://api.mddentalstaffing.com/api/v1/owner/locations", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setLocations(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, [authToken]);

  return (
    <Grid
      id="locationCandidate"
      className="rounded"
      sx={{
        m: 3,
        pt: 2.5,
        px: 2,
        pb: 7,
        border: "1px solid",
        borderColor: successState
          ? "#4CAF50"
          : errorState
          ? "#FA5A16"
          : "#D9D9D9",
        position: "relative",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <h6 style={{ color: "#262626" }} className="fw-semibold ms-2">
            Location / Candidate
          </h6>

          <FormControl
            sx={{ p: 0 }}
            size="small"
            variant="outlined"
            className="my-form-control"
            required
            disabled={viewMode}
          >
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedLocation}
              label="Location"
              required
              onChange={(e) => handleLocationChange(e)}
              error={errorState && selectedLocation === ''}
            >
              {locations.map((location) => (
                <MenuItem
                  key={location.id}
                  value={
                    location.id === selectedLocation.id
                      ? selectedLocation
                      : location
                  }
                  style={{
                    display: "block",
                    paddingLeft: "15px",
                    margin: "5px",
                  }}
                >
                  {location.place_name}
                </MenuItem>
              ))}
            </Select>

            {errorState && selectedLocation === '' && (
                <FormHelperText style={{ color: '#FA5A16' }}>
                  Please choose an option.
                </FormHelperText>
              )}
          </FormControl>

          <InputLabel sx={{ mt: 2, ml: 1 }} required>
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: "#595959",
                display: "inline",
                mt: 2,
              }}
            >
              Candidate Needed
            </Typography>
          </InputLabel>
          <Grid container spacing={2}>
            <Grid sx={{ ml: 1 }} item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="bookingType"
                  name="bookingType"
                  value={selectedRadio}
                  onChange={handleRadioChange}
                  row
                >
                  <FormControlLabel
                    sx={{ color: "#595959" }}
                    disabled={viewMode}
                    value="all"
                    control={<Radio size="small" />}
                    label="Any Available. This posting will be available to all qualified candidates."
                  />
                  <FormControlLabel
                    sx={{ color: "#595959" }}
                    value="direct"
                    disabled={viewMode}
                    control={<Radio size="small" />}
                    label="Direct Booking. You can choose a specific candidate that worked for you in the past. If the candidate does not accept booking, please clone the posting and make it available for all candidates."
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid
            className="rounded"
            container
            spacing={1}
            sx={{ backgroundColor: "#D7E8FF", p: 1 }}
          >
            <Grid item xs={1}>
              <ErrorOutlineOutlinedIcon
                sx={{ color: "#4A93F0", transform: "rotate(180deg)" }}
              />
            </Grid>
            <Grid item xs={11} sx={{ fontSize: "0.9rem" }}>
              <p style={{ color: "#194378" }} className="fw-semibold mb-0">
                Please Note
              </p>
              <p style={{ color: "#194378" }}>
                You must have at least one location for your account to create
                posting. To add a location click "My Account", then "Location"
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div
        style={{ position: "absolute", bottom: 0, right: 0, margin: "16px" }}
      >
        {errorState ? (
          <CloseIcon color="sunset" />
        ) : successState ? (
          <DoneAllIcon color="success" />
        ) : null}
      </div>
    </Grid>
  );
}
