import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import {
  Grid,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Tabs,
  Tab,
  Box,
  Button,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  Modal,
  IconButton,
  FormHelperText,
} from "@mui/material";


import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";


import { capitalizeFirstLetter, convertTo24Hour } from "../../utils/helper";
import CustomDatePicker from "./CustomDatePicker";


import IOSSwitch from "../IOSSwitch";
import CustomTime from "../CustomTime";
import PostingTimes from "./PostingTimes";


const updateTimeStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  gap: "20px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "6px",
};

export default function PostingDates({
  postingSchedules,
  setPostingSchedules,
  tzone,
  setTzone,
  selectedLocation,
  setSelectedLocation,
  errorState,
  setErrorState,
  successState,
  jobType,
  setGenSchedules,
  genSchedules,
  isGenerated,
  setIsGenerated,
  viewMode,
}) {
  const [tabValue, setTabValue] = useState(0);
  const [zones, setZones] = useState([]);
  const [locations, setLocations] = useState([]);
  const [changeTimeModal, setChangeTimeModal] = useState(false);
  const [displaySchedule, setDisplaySchedule] = useState([]);
  const [datesError, setDatesError] = useState(false);
  const [updateTimeModal, setUpdateTimeModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [updatedSelectedItem, setUpdatedSelectedItem] = useState({});
  const [timeZoneSelected, setTimeZoneSelected] = useState({});

  const authToken = localStorage.getItem("auth_token");

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };





  const handleStartDateChange = (newDate) => {
    const newStartDate = newDate;
    const newEndDate = postingSchedules.endDate;
    setIsGenerated(false);

    if (newStartDate && newEndDate && newStartDate > newEndDate) {
      setDatesError(true);
    } else {
      setDatesError(false);
    }

    setPostingSchedules({
      ...postingSchedules,
      startDate: newStartDate,
    });
  };

  const handleEndDateChange = (newDate) => {
    const newEndDate = newDate;
    const newStartDate = postingSchedules.startDate;
    setIsGenerated(false);
    if (newStartDate && newEndDate && newStartDate > newEndDate) {
      setDatesError(true);
    } else {
      setDatesError(false);
    }

    setPostingSchedules({
      ...postingSchedules,
      endDate: newEndDate,
    });
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




  useEffect(() => {
    if (postingSchedules.startDate && postingSchedules.endDate && viewMode) {
      generatePostingSchedule();
    }
  }, [postingSchedules]);

  const resetSchedule = () => {
    setPostingSchedules((prevState) => ({
      ...prevState,
      days: Object.keys(prevState.days).reduce((acc, day) => {
        acc[day] = {
          isActive: false,
          startHours: "09",
          endHours: "05",
          startMinutes: "00",
          endMinutes: "00",
          startPeriod: "AM",
          endPeriod: "PM",
        };
        return acc;
      }, {}),
    }));
  };

  useEffect(() => {
    axios
      .get("https://api.mddentalstaffing.com/api/v1/zones")
      .then((response) => {
        setZones(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching zones:", error);
      });
  }, []);

  useEffect(() => {
    if (postingSchedules) {
      if (postingSchedules.type === "simple") {
        setTabValue(0);
      } else if (postingSchedules.type === "weekly") {
        setTabValue(1);
      } else if (postingSchedules.type === "complex") {
        setTabValue(2);
      }
    }
  }, [postingSchedules]);

  const handleTabChange = (event, newValue) => {
    resetSchedule();
    if (newValue === 0) {
      setPostingSchedules((prevState) => ({
        ...prevState,
        days: {
          ...prevState.days,
          monday: {
            ...prevState.days.monday,
            isActive: true,
          },
          tuesday: {
            ...prevState.days.tuesday,
            isActive: true,
          },
          wednesday: {
            ...prevState.days.wednesday,
            isActive: true,
          },
          thursday: {
            ...prevState.days.thursday,
            isActive: true,
          },
          friday: {
            ...prevState.days.monday,
            isActive: true,
          },
        },
      }));
    }
    setTabValue(newValue);
    setPostingSchedules((prevState) => ({
      ...prevState,
      type:
        newValue === 0
          ? "simple"
          : newValue === 1
            ? "weekly"
            : newValue === 2
              ? "complex"
              : null,
    }));
  };

  function getCurrentDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function generatePostingSchedule() {


    // var localDate = new Date();
    // var localMoment = moment();
    // var utcMoment = moment.utc();
    // var utcDate = new Date(utcMoment.format());

    // //These are all the same
    // console.log('localData unix = ' + localDate.valueOf());
    // console.log('localMoment unix = ' + localMoment.valueOf());
    // console.log('utcMoment unix = ' + utcMoment.valueOf());

    // console.log('localDate = ' + localDate);
    // console.log('localMoment string = ' + localMoment.format());
    // console.log('utcMoment string = ' + utcMoment.format());
    // console.log('utcDate  = ' + utcDate);

    // //One to show conversion
    // console.log('localDate as UTC format = ' + moment.utc(localDate).format());
    // console.log('localDate as UTC unix = ' + moment.utc(localDate).valueOf());

    const activeDay = Object.keys(postingSchedules.days).find(
      (day) => postingSchedules.days[day].isActive === true
    );
    if (postingSchedules.type === "simple" && (postingSchedules.days[activeDay].startHours === 0 || postingSchedules.days[activeDay].endHours === 0)) {
      setErrorState(true);
      return;
    }

    const selected_tz = zones.filter((tz) => tz.id == tzone);
    const startDate = new Date(moment(postingSchedules.startDate).utcOffset(selected_tz[0].offset));
    const endDate = new Date(moment(postingSchedules.endDate).utcOffset(selected_tz[0].offset));

    // const startDate = new Date(postingSchedules.startDate);
    // const endDate = new Date(postingSchedules.endDate);

    const scheduleArray = [];
    const displayArray = [];
    const dayInMilliseconds = 24 * 60 * 60 * 1000;

    for (
      let currentDate = startDate;
      currentDate <= endDate;
      currentDate = new Date(currentDate.getTime() + dayInMilliseconds)
    ) {
      const day = currentDate.toLocaleString("en-us", { weekday: "long" }).toLowerCase();

      if (postingSchedules.days[day].isActive) {
        const scheduleEntry = {
          schedule_date: getCurrentDate(currentDate),
          schedule_day: day,
          start_time: convertTo24Hour(
            postingSchedules.days[day].startHours,
            postingSchedules.days[day].startMinutes,
            postingSchedules.days[day].startPeriod
          ),
          end_time: convertTo24Hour(
            postingSchedules.days[day].endHours,
            postingSchedules.days[day].endMinutes,
            postingSchedules.days[day].endPeriod
          ),
          is_working: true,
        };
        const displayEntry = {
          date: currentDate.toLocaleDateString(),
          day: day,
          startHours: postingSchedules.days[day].startHours,
          startMinutes: postingSchedules.days[day].startMinutes,
          startPeriod: postingSchedules.days[day].startPeriod,
          endHours: postingSchedules.days[day].endHours,
          endMinutes: postingSchedules.days[day].endMinutes,
          endPeriod: postingSchedules.days[day].endPeriod,
          is_working: true,
        };
        scheduleArray.push(scheduleEntry);
        displayArray.push(displayEntry);
      }
    }
    setGenSchedules(scheduleArray);
    setDisplaySchedule(displayArray);
    setErrorState(false);
    setIsGenerated(true);
    return scheduleArray;
  }

  const activeDay = Object.keys(postingSchedules.days).find(
    (day) => postingSchedules.days[day].isActive === true
  );

  const handleUpdatePostingSchedule = () => {
    const updatedSchedule = genSchedules.map((schedule) => {
      if (schedule.schedule_day === selectedItem.day) {
        return {
          ...schedule,
          start_time: convertTo24Hour(
            updatedSelectedItem.startHours,
            updatedSelectedItem.startMinutes,
            updatedSelectedItem.startPeriod
          ),
          end_time: convertTo24Hour(
            updatedSelectedItem.endHours,
            updatedSelectedItem.endMinutes,
            updatedSelectedItem.endPeriod
          ),
        };
      }
      return schedule;
    });

    const updatedPostingSchedule = displaySchedule.map((schedule) => {
      if (schedule.day === selectedItem.day) {
        return {
          ...schedule,
          startHours: updatedSelectedItem.startHours,
          startMinutes: updatedSelectedItem.startMinutes,
          startPeriod: updatedSelectedItem.startPeriod,
          endHours: updatedSelectedItem.endHours,
          endMinutes: updatedSelectedItem.endMinutes,
          endPeriod: updatedSelectedItem.endPeriod,
        };
      }
      return schedule;
    });

    setGenSchedules(updatedSchedule);
    setDisplaySchedule(updatedPostingSchedule);
    setUpdateTimeModal(false);
  };

  const handleUpdateActiveSchedule = (value, schedule) => {
    const updatedSchedule = genSchedules.map((sch) => {
      const scheduleDate = moment(schedule.date).format("YYYY-MM-DD");
      const date = moment(sch.schedule_date).format("YYYY-MM-DD");
      if (date === scheduleDate) {
        return {
          ...sch,
          is_working: value,
        };
      }
      return sch;
    });

    setGenSchedules(updatedSchedule);
  };

  return (
    <>
      {updateTimeModal && selectedItem && (
        <Modal
          open={updateTimeModal}
          onClose={() => setUpdateTimeModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={updateTimeStyle}>
            <div
              className="d-flex"
              style={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Change Time
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  cursor: "pointer",
                }}
                onClick={() => setUpdateTimeModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  color: "#595959",
                }}
              >
                {selectedItem.day.toUpperCase()}
              </span>
              <span
                style={{
                  fontSize: 20,
                  color: "#262626",
                  fontWeight: "500",
                }}
              >
                {selectedItem.date}
              </span>
            </div>

            <div
              style={{
                backgroundColor: "#FAFAFA",
                padding: "20px",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{
                  marginBottom: "20px",
                  borderBottom: "1px solid #D9D9D9",
                  paddingBottom: "18px",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: "#262626",
                    fontWeight: "500",
                  }}
                >
                  Start Time{" "}
                  <span
                    style={{
                      color: "#2561B0",
                      fontWeight: "500",
                    }}
                  >
                    {timeZoneSelected[0].zone_name}

                  </span>
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: "#262626",
                    fontWeight: "500",
                  }}
                >
                  End Time{" "}
                  <span
                    style={{
                      color: "#2561B0",
                      fontWeight: "500",
                    }}
                  >
                    {timeZoneSelected[0].zone_name}
                  </span>
                </span>
              </div>
              <div
                className="d-flex"
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CustomTime
                  hours={updatedSelectedItem.startHours}
                  isActive={true}
                  isError={postingSchedules.startDate === " "}
                  setHours={(newHours) => {
                    setUpdatedSelectedItem((prevState) => ({
                      ...prevState,
                      startHours: newHours,
                    }));
                  }}
                  minutes={updatedSelectedItem.startMinutes}
                  setMinutes={(newMinutes) => {
                    setUpdatedSelectedItem((prevState) => ({
                      ...prevState,
                      startMinutes: newMinutes,
                    }));
                  }}
                  ampm={updatedSelectedItem.startPeriod}
                  setAmpm={(newPeriod) => {
                    setUpdatedSelectedItem((prevState) => ({
                      ...prevState,
                      startPeriod: newPeriod,
                    }));
                  }}
                />
                <CustomTime
                  hours={updatedSelectedItem.endHours}
                  isError={!postingSchedules.endDate && datesError}
                  isActive={true}
                  setHours={(newHours) => {
                    setUpdatedSelectedItem((prevState) => ({
                      ...prevState,
                      endHours: newHours,
                    }));
                  }}
                  minutes={updatedSelectedItem.endMinutes}
                  setMinutes={(newMinutes) => {
                    setUpdatedSelectedItem((prevState) => ({
                      ...prevState,
                      endMinutes: newMinutes,
                    }));
                  }}
                  ampm={updatedSelectedItem.endPeriod}
                  setAmpm={(newPeriod) => {
                    setUpdatedSelectedItem((prevState) => ({
                      ...prevState,
                      endPeriod: newPeriod,
                    }));
                  }}
                />
              </div>
            </div>

            <div>
              <h4
                style={{
                  color: "#2561B0",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                REVERT TO ORIGINAL TIME
              </h4>
              <div
                className="d-flex"
                style={{
                  gap: "20px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #2561B0",
                  padding: "18px 25px",
                  borderRadius: "6px",
                }}
              >
                <div>
                  <h6>
                    {capitalizeFirstLetter(selectedItem.day)}{" "}
                    {selectedItem.date}
                  </h6>
                  <p>
                    {selectedItem.startHours}:{selectedItem.startMinutes}{" "}
                    {selectedItem.startPeriod}
                  </p>
                </div>
                <div>
                  <h6>
                    {capitalizeFirstLetter(selectedItem.day)}{" "}
                    {selectedItem.date}
                  </h6>
                  <p>
                    {selectedItem.endHours}:{selectedItem.endMinutes}{" "}
                    {selectedItem.endPeriod}
                  </p>
                </div>
                <div>
                  <Button
                    variant="primary"
                    style={{
                      border: 0,
                      backgroundColor: "#2561B0",
                      color: "#FFFFFF",
                    }}
                    onClick={() =>
                      setUpdatedSelectedItem({
                        ...selectedItem,
                        startHours: selectedItem.startHours,
                        startMinutes: selectedItem.startMinutes,
                        startPeriod: selectedItem.startPeriod,
                        endHours: selectedItem.endHours,
                        endMinutes: selectedItem.endMinutes,
                        endPeriod: selectedItem.endPeriod,
                      })
                    }
                  >
                    Revert Time
                  </Button>
                </div>
              </div>
            </div>

            <Grid item xs={12} md={4}>
              <Grid
                className="rounded"
                container
                spacing={1}
                sx={{ backgroundColor: "#D7E8FF", p: 1 }}
              >
                <Grid item xs={1}>
                  <ErrorOutlineOutlinedIcon sx={{ color: "#4A93F0" }} />
                </Grid>
                <Grid item xs={11} sx={{ fontSize: "0.9rem" }}>
                  <p style={{ color: "#194378" }} className="fw-semibold mb-0">
                    Please Note
                  </p>
                  <p style={{ color: "#194378" }}>
                    Some states will require employer to pay minimum of 4 hours.
                  </p>
                </Grid>
              </Grid>
            </Grid>

            <div className="d-flex justify-content-end">
              <button
                className="btn btn-outline-primary me-2"
                style={{
                  border: 0,
                  color: "#2561B0",
                }}
                onClick={() => setUpdateTimeModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-outline-primary"
                style={{
                  border: 0,
                  color: "#2561B0",
                }}
                onClick={handleUpdatePostingSchedule}
              >
                Confirm
              </button>
            </div>
          </Box>
        </Modal>
      )}
      {changeTimeModal && (
        <Modal
          open={changeTimeModal}
          onClose={() => {
            setChangeTimeModal(false);
          }}
        >
          <div
            className="rounded"
            style={{
              outline: "none",
              backgroundColor: "#fff",
              paddingTop: "20px",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingBottom: "10px",
              width: "33%",
              marginTop: "35vh",
              borderColor: "#fff",
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 19,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Grid item xs={11}>
                <Typography
                  fontSize={20}
                  color="#000000"
                  variant="h6"
                  align="left"
                >
                  Change Time
                </Typography>
              </Grid>
              <Grid item xs={"auto"}>
                <IconButton
                  onClick={() => {
                    setChangeTimeModal(false);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </div>
            <Grid
              container
              className="rounded"
              sx={{
                backgroundColor: "#FFF3EE",
                py: 1,
                px: 2,
              }}
            >
              <Grid item xs={1}>
                <WarningAmberIcon color="sunset" />
              </Grid>
              <Grid item xs={10}>
                <Typography
                  variant="h6"
                  color="#E54C0B"
                  fontSize={15}
                  textAlign="left"
                  fontWeight={"semibold"}
                >
                  Warning!
                </Typography>
                <Typography
                  variant="p"
                  color="#E54C0B"
                  fontSize={12}
                  textAlign="left"
                  fontWeight={"semibold"}
                >
                  If you want to change start and end times, you need to switch
                  to
                  <b> complex schedule</b>. Do you want to proceed?
                </Typography>
              </Grid>
            </Grid>
            <Grid justifyContent={"right"} sx={{ mt: 2 }} container>
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => {
                  setChangeTimeModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleTabChange(null, 2);
                  setChangeTimeModal(false);
                }}
              >
                Confirm
              </Button>
            </Grid>
          </div>
        </Modal>
      )}
      <Grid
        id="postingDates"
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Grid style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="" style={{ flex: "1" }}>
                <h6 style={{ color: "#262626" }} className="fw-semibold ps-2">
                  {jobType ? "Location / Posting Date" : "Posting Dates"}
                </h6>

                <Grid
                  sx={{ pl: 1, mt: 1 }}
                  container
                  spacing={2}
                  style={{ display: "flex", width: "100%", flex: 1 }}
                >
                  <Grid
                    item
                    xs={12}
                    md={3}
                    style={{ maxWidth: "100%", flex: 1 }}
                  >
                    {jobType ? (
                      <FormControl
                        size="small"
                        variant="outlined"
                        style={{
                          width: "100%",
                          marginTop: "8px",
                          maxWidth: "100%",
                        }}
                        required
                      >
                        <InputLabel id="demo-simple-select-label">
                          Location
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectedLocation}
                          label="Location"
                          required
                          onChange={(e) => handleLocationChange(e)}
                          disabled={viewMode}
                          error={errorState && selectedLocation === ""}
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
                                maxWidth: "100%",
                              }}
                            >
                              {location.place_name}
                            </MenuItem>
                          ))}
                        </Select>

                        {errorState && selectedLocation === "" && (
                          <FormHelperText style={{ color: "#FA5A16" }}>
                            Please choose an option.
                          </FormHelperText>
                        )}
                      </FormControl>
                    ) : (
                      <CustomDatePicker
                        disabled={viewMode}
                        label={"Start Date"}
                        value={postingSchedules.startDate}
                        onChange={handleStartDateChange}
                        error={postingSchedules.startDate === "" && errorState}
                      />
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={3}
                    style={{ maxWidth: "100%", flex: 1 }}
                  >
                    {jobType ? (
                      <CustomDatePicker
                        disabled={viewMode}
                        label={"Start Date"}
                        value={postingSchedules.startDate}
                        onChange={(date) => {
                          setPostingSchedules((sch) => ({
                            ...sch,
                            startDate: date,
                          }));
                        }}
                        error={postingSchedules.startDate === "" && errorState}
                      />
                    ) : (
                      <CustomDatePicker
                        disabled={viewMode}
                        label={"End Date"}
                        value={postingSchedules.endDate}
                        onChange={handleEndDateChange}
                        error={postingSchedules.endDate === "" && errorState}
                      />
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={1.5}
                    style={{ maxWidth: "100%", flex: 1 }}
                  >
                    <FormControl
                      sx={{ p: 0 }}
                      size="small"
                      variant="outlined"
                      fullWidth
                    >
                      <InputLabel sx={{ mt: 1 }} id="timezone-label">
                        Time Zone
                      </InputLabel>
                      <Select
                        sx={{ mt: 1 }}
                        onChange={(e) => {
                          setTzone(e.target.value);
                          const selected_tz = zones.filter((tz) => tz.id == e.target.value);
                          setTimeZoneSelected(selected_tz);
                          console.log('ssselected_tz', selected_tz);
                        }}
                        label="Time Zone"
                        labelId="timezone-label"
                        value={tzone}
                        disabled={viewMode}
                        error={errorState && tzone === ""}
                      >
                        {zones.map((zone) => (
                          <MenuItem id={zone.id} key={zone.id} value={zone.id}>
                            {" "}
                            {zone.zone_name}
                          </MenuItem>
                        ))}
                      </Select>

                      {errorState && tzone === "" && (
                        <FormHelperText style={{ color: "#FA5A16" }}>
                          Please choose an option.
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
              <Grid item xs={12} md={4}>
              </Grid>
            </Grid>
            {jobType ? (
              <Grid container sx={{ mt: 4 }}>
                <Grid item md={8}>
                  <p style={{ color: "#595959", fontSize: "0.95rem" }}>
                    Use for a schedule for a week or more with different
                    start/end times Ex: 5/29 Monday 8-5, 6/4 Monday 10-6.
                  </p>

                  <PostingTimes
                    postingSchedules={postingSchedules}
                    setPostingSchedules={setPostingSchedules}
                    disabled={viewMode}
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid container sx={{ mt: 4 }}>
                <h6
                  style={{ color: "#262626" }}
                  className="fw-semibold ps-2 mb-4"
                >
                  Posting Type
                </h6>
                {!isGenerated ? (
                  <Grid sx={{ ml: 0.01 }} container spacing={2}>
                    <Grid item xs={12}>
                      <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="standard"
                        aria-label="tabs"
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: "#FFFFFF",
                          },
                        }}
                      >
                        <Tab
                          className={`rounded-top border ${tabValue === 0 ? "text-primary" : ""
                            }`}
                          style={{
                            backgroundColor:
                              tabValue === 0 ? "#FFFFFF" : "#F7F9FA",
                          }}
                          sx={{ width: "10rem" }}
                          label="Simple"
                        />
                        <Tab
                          className={`rounded-top border ${tabValue === 1 ? "text-primary" : ""
                            }`}
                          sx={{ width: "10rem", mx: 1 }}
                          style={{
                            backgroundColor:
                              tabValue === 1 ? "#FFFFFF" : "#F7F9FA",
                            borderBottom: "none",
                          }}
                          label="Weekly"
                        />
                        <Tab
                          className={`rounded-top border ${tabValue === 2 ? "text-primary" : ""
                            }`}
                          style={{
                            backgroundColor:
                              tabValue === 2 ? "#FFFFFF" : "#F7F9FA",
                          }}
                          sx={{ width: "10rem" }}
                          label="Complex"
                        />
                      </Tabs>
                    </Grid>

                    <Grid
                      className="border rounded-end rounded-bottom "
                      sx={{ ml: 1.95 }}
                      item
                      xs={12}
                    >
                      <Grid item xs={12} md={10}>
                        <Box
                          p={2}
                          borderTop={1}
                          borderLeft={1}
                          borderRight={1}
                          borderColor={
                            tabValue === 0 ? "transparent" : "grey.500"
                          }
                          borderBottom={0}
                          borderRadius={tabValue === 0 ? "0" : "4px 4px 0 0"}
                          display={tabValue === 0 ? "block" : "none"}
                        >
                          <p style={{ color: "#595959", fontSize: "0.95rem" }}>
                            Use for single days or schedule consecutive days
                            with same start/end time.{" "}
                            <span
                              style={{ color: "#262626", fontStyle: "italic" }}
                            >
                              Ex: 5/29-5/31 from 8:00AM-5:00PM.{" "}
                            </span>{" "}
                            <br />
                            Please note: Saturday and Sunday will be included in
                            this posting type. If you want to avoid them please
                            click on "weekly"
                          </p>
                          <Grid sx={{ my: 2 }} container>
                            <Grid
                              className="d-flex justify-content-start"
                              item
                              md={5}
                            >
                              <Grid
                                item
                                sx={{
                                  width: "5rem",
                                  alignItems: "center",
                                  display: "flex",
                                }}
                              >
                                <p
                                  className="p-0 m-0"
                                  style={{
                                    color: "#595959",
                                    fontSize: "0.8rem",
                                  }}
                                >
                                  Start Time:{" "}
                                </p>
                              </Grid>

                              {activeDay && (
                                <CustomTime
                                  hours={
                                    postingSchedules.days[activeDay].startHours
                                  }
                                  isActive={true}
                                  isError={
                                    errorState &&
                                    postingSchedules.days[activeDay]
                                      .startHours === 0
                                  }
                                  setHours={(newHours) => {
                                    setPostingSchedules((prevState) => {
                                      const updatedDays = Object.keys(
                                        prevState.days
                                      ).reduce((acc, day) => {
                                        return {
                                          ...acc,
                                          [day]: {
                                            ...prevState.days[day],
                                            startHours: newHours,
                                          },
                                        };
                                      }, {});

                                      return {
                                        ...prevState,
                                        days: updatedDays,
                                      };
                                    });
                                  }}
                                  minutes={
                                    postingSchedules.days[activeDay]
                                      .startMinutes
                                  }
                                  setMinutes={(newMinutes) => {
                                    setPostingSchedules((prevState) => {
                                      const updatedDays = Object.keys(
                                        prevState.days
                                      ).reduce((acc, day) => {
                                        return {
                                          ...acc,
                                          [day]: {
                                            ...prevState.days[day],
                                            startMinutes: newMinutes,
                                          },
                                        };
                                      }, {});

                                      return {
                                        ...prevState,
                                        days: updatedDays,
                                      };
                                    });
                                  }}
                                  ampm={
                                    postingSchedules.days[activeDay].startPeriod
                                  }
                                  setAmpm={(newPeriod) => {
                                    setPostingSchedules((prevState) => {
                                      const updatedDays = Object.keys(
                                        prevState.days
                                      ).reduce((acc, day) => {
                                        return {
                                          ...acc,
                                          [day]: {
                                            ...prevState.days[day],
                                            startPeriod: newPeriod,
                                          },
                                        };
                                      }, {});

                                      return {
                                        ...prevState,
                                        days: updatedDays,
                                      };
                                    });
                                  }}
                                />
                              )}
                            </Grid>
                            <Grid
                              className="d-flex justify-content-start"
                              item
                              md={5}
                            >
                              <Grid
                                item
                                sx={{
                                  width: "5rem",
                                  alignItems: "center",
                                  display: "flex",
                                }}
                              >
                                <p
                                  className="p-0 m-0"
                                  style={{
                                    color: "#595959",
                                    fontSize: "0.8rem",
                                  }}
                                >
                                  End Time:{" "}
                                </p>
                              </Grid>
                              {activeDay && (
                                <CustomTime
                                  hours={
                                    postingSchedules.days[activeDay].endHours
                                  }
                                  isActive={true}
                                  isError={
                                    errorState &&
                                    postingSchedules.days[activeDay]
                                      .endHours === 0
                                  }
                                  setHours={(newHours) => {
                                    setPostingSchedules((prevState) => {
                                      const updatedDays = Object.keys(
                                        prevState.days
                                      ).reduce((acc, day) => {
                                        return {
                                          ...acc,
                                          [day]: {
                                            ...prevState.days[day],
                                            endHours: newHours,
                                          },
                                        };
                                      }, {});

                                      return {
                                        ...prevState,
                                        days: updatedDays,
                                      };
                                    });
                                  }}
                                  minutes={
                                    postingSchedules.days[activeDay].endMinutes
                                  }
                                  setMinutes={(newMinutes) => {
                                    setPostingSchedules((prevState) => {
                                      const updatedDays = Object.keys(
                                        prevState.days
                                      ).reduce((acc, day) => {
                                        return {
                                          ...acc,
                                          [day]: {
                                            ...prevState.days[day],
                                            endMinutes: newMinutes,
                                          },
                                        };
                                      }, {});

                                      return {
                                        ...prevState,
                                        days: updatedDays,
                                      };
                                    });
                                  }}
                                  ampm={
                                    postingSchedules.days[activeDay].endPeriod
                                  }
                                  setAmpm={(newPeriod) => {
                                    setPostingSchedules((prevState) => {
                                      const updatedDays = Object.keys(
                                        prevState.days
                                      ).reduce((acc, day) => {
                                        return {
                                          ...acc,
                                          [day]: {
                                            ...prevState.days[day],
                                            endPeriod: newPeriod,
                                          },
                                        };
                                      }, {});

                                      return {
                                        ...prevState,
                                        days: updatedDays,
                                      };
                                    });
                                  }}
                                />
                              )}
                            </Grid>
                          </Grid>
                          <Divider
                            sx={{
                              color: "#D9D9D9",
                              border: "1px solid #D9D9D9",
                            }}
                          />
                          <Grid sx={{ mt: 2 }} gap={3} container>
                            <Grid item>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    size="small"
                                    checked={
                                      postingSchedules.days.saturday.isActive
                                    }
                                    onChange={(e) => {
                                      const { checked } = e.target;
                                      setPostingSchedules((prevState) => ({
                                        ...prevState,
                                        days: {
                                          ...prevState.days,
                                          saturday: {
                                            ...prevState.days.saturday,
                                            isActive: checked,
                                          },
                                        },
                                      }));
                                    }}
                                  />
                                }
                                label={
                                  <Typography
                                    sx={{
                                      color: "#595959",
                                      fontSize: "0.9rem",
                                    }}
                                  >
                                    Saturday Included
                                  </Typography>
                                }
                              />
                            </Grid>
                            <Grid item>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    size="small"
                                    checked={
                                      postingSchedules.days.sunday.isActive
                                    }
                                    onChange={(e) => {
                                      const { checked } = e.target;
                                      setPostingSchedules((prevState) => ({
                                        ...prevState,
                                        days: {
                                          ...prevState.days,
                                          sunday: {
                                            ...prevState.days.sunday,
                                            isActive: checked,
                                          },
                                        },
                                      }));
                                    }}
                                  />
                                }
                                label={
                                  <Typography
                                    sx={{
                                      color: "#595959",
                                      fontSize: "0.9rem",
                                    }}
                                  >
                                    Sunday Included
                                  </Typography>
                                }
                              />
                            </Grid>
                          </Grid>
                        </Box>
                        <Box
                          p={2}
                          borderTop={1}
                          borderLeft={1}
                          borderRight={1}
                          borderColor={
                            tabValue === 1 ? "transparent" : "grey.500"
                          }
                          borderBottom={0}
                          borderRadius={tabValue === 1 ? "0" : "4px 4px 0 0"}
                          display={tabValue === 1 ? "block" : "none"}
                        >
                          <p style={{ color: "#595959", fontSize: "0.95rem" }}>
                            Use for any schedule that is a week or more of
                            nonconsecutive days if start/end times are the same.{" "}
                            <br />
                            <span
                              style={{ color: "#262626", fontStyle: "italic" }}
                            >
                              Ex: 5/29-5/31 from 7:00AM-4:00PM.
                            </span>
                          </p>
                          <Grid container>
                            <Grid item xs={9}>
                              <PostingTimes
                                disabled={viewMode}
                                postingSchedules={postingSchedules}
                                setPostingSchedules={setPostingSchedules}
                                setOpenModal={setChangeTimeModal}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                        <Box
                          p={2}
                          borderTop={1}
                          borderLeft={1}
                          borderRight={1}
                          borderColor={
                            tabValue === 2 ? "transparent" : "grey.500"
                          }
                          borderBottom={0}
                          borderRadius={tabValue === 2 ? "0" : "4px 4px 0 0"}
                          display={tabValue === 2 ? "block" : "none"}
                        >
                          <p style={{ color: "#595959", fontSize: "0.95rem" }}>
                            Use for a schedule for a week or more with different
                            start/end times{" "}
                            <span
                              style={{ color: "#262626", fontStyle: "italic" }}
                            >
                              Ex: 5/29 Monday 8:00AM-5:00PM, 6/4 Monday
                              10:00AM-6:00PM.
                            </span>
                          </p>

                          <PostingTimes
                            disabled={viewMode}
                            postingSchedules={postingSchedules}
                            setPostingSchedules={setPostingSchedules}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid sx={{ mx: 0.8 }} container spacing={2}>
                    <Grid container sx={{ my: 1 }}>
                      <Grid item xs={3}>
                        <Typography
                          variant="p"
                          color="#262626"
                          textAlign="left"
                          className="fw-semibold"
                          fontSize={15}
                        >
                          Date
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="p"
                          color="#262626"
                          textAlign="left"
                          className="fw-semibold"
                          fontSize={15}
                        >
                          Start Time
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="p"
                          color="#262626"
                          textAlign="left"
                          className="fw-semibold"
                          fontSize={15}
                        >
                          End time
                        </Typography>
                      </Grid>
                      <Grid className="d-flex justify-content-end" item xs={3}>
                        <Typography
                          variant="p"
                          color="#262626"
                          className="fw-semibold text-end"
                          fontSize={15}
                        >
                          <span className="ms-auto">Active</span>
                        </Typography>
                      </Grid>
                    </Grid>
                    {displaySchedule.map((schedule, index) => (
                      <Grid
                        container
                        sx={{
                          boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.15)",
                          p: 2,
                          m: 0,
                          my: 1,
                        }}
                      >
                        <Grid className="d-grid" item xs={3}>
                          <Typography
                            variant="p"
                            color="#8C8C8C"
                            textAlign="left"
                            className="fw-semibold"
                            fontSize={14}
                            textTransform={"uppercase"}
                          >
                            {schedule.day}
                          </Typography>
                          <Typography
                            variant="p"
                            color="#262626"
                            textAlign="left"
                            className="fw-semibold"
                            fontSize={18}
                          >
                            {schedule.date}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="p"
                            color="#262626"
                            textAlign="left"
                            className="fw-semibold"
                            fontSize={15}
                          >
                            <CustomTime
                              hours={schedule.startHours}
                              minutes={schedule.startMinutes}
                              ampm={schedule.startPeriod}
                            />
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="p"
                            color="#262626"
                            textAlign="left"
                            className="fw-semibold"
                            fontSize={15}
                          >
                            <CustomTime
                              hours={schedule.endHours}
                              minutes={schedule.endMinutes}
                              ampm={schedule.endPeriod}
                            />
                          </Typography>
                        </Grid>
                        <Grid
                          className="d-flex align-items-center justify-content-end"
                          item
                          gap={2}
                          xs={3}
                        >
                          <Button
                            sx={{
                              height: "2.4rem",
                              width: "10rem",
                              textTransform: "none",
                            }}
                            variant="outlined"
                            disabled={viewMode}
                            onClick={() => {
                              setUpdateTimeModal(true);
                              setSelectedItem(schedule);
                              setUpdatedSelectedItem(schedule);
                            }}
                          >
                            Change Time
                          </Button>
                          <IOSSwitch
                            readOnly={viewMode}
                            value={schedule.is_working}
                            onChange={(value) =>
                              handleUpdateActiveSchedule(value, schedule)
                            }
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
        {!jobType && (
          <>
            {!isGenerated && (
              <Button
                onClick={() => {
                  if (postingSchedules.startDate && postingSchedules.endDate) {
                    generatePostingSchedule();
                  }
                }}
                variant="contained"
                disabled={
                  datesError ||
                  !postingSchedules.startDate ||
                  !postingSchedules.endDate ||
                  ((postingSchedules.type === "weekly" ||
                    postingSchedules.type === "complex") &&
                    !postingSchedules.days.saturday.isActive &&
                    !postingSchedules.days.sunday.isActive &&
                    !postingSchedules.days.monday.isActive &&
                    !postingSchedules.days.tuesday.isActive &&
                    !postingSchedules.days.wednesday.isActive &&
                    !postingSchedules.days.thursday.isActive &&
                    !postingSchedules.days.friday.isActive)
                }
                sx={{
                  backgroundColor: "#2561B0",
                  boxShadow: "none",
                  my: 2,
                  ml: 2,
                  textTransform: "none",
                }}
              >
                <Typography sx={{ fontWeight: "400" }}>Generate</Typography>
              </Button>
            )}
          </>
        )}
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
    </>
  );
}
