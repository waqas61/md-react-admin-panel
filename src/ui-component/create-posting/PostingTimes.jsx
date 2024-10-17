import { FormControlLabel, Grid, Checkbox } from "@mui/material";
import React from "react";
import CustomTime from "../CustomTime";

export default function PostingTimes({
  postingSchedules,
  setPostingSchedules,
  setOpenModal,
  disabled,
}) {

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      {/* MONDAY */}
      {/* // ------------------------------------------------------------------------------------------------------------- */}

      <Grid container>
        <Grid sx={{ my: 2 }} container>
          <Grid className="d-flex align-items-center" xs={2} item>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={disabled}
                  checked={postingSchedules.days.monday.isActive}
                  onChange={(e) => {
                    const { checked } = e.target;
                    setPostingSchedules((prevState) => ({
                      ...prevState,
                      days: {
                        ...prevState.days,
                        monday: {
                          ...prevState.days.monday,
                          isActive: checked,
                        },
                      },
                    }));
                  }}
                />
              }
              label="Monday"
            />
          </Grid>
          <Grid className={"d-flex justify-content-start"} item md={5}>
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
            <CustomTime
              disabled={disabled}
              hours={postingSchedules.days.monday.startHours}
              setHours={(newHours) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    monday: {
                      ...prevState.days.monday,
                      startHours: newHours,
                    },
                  },
                }));
              }}
              isActive={postingSchedules.days.monday.isActive}
              minutes={postingSchedules.days.monday.startMinutes}
              setMinutes={(newMinutes) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    monday: {
                      ...prevState.days.monday,
                      startMinutes: newMinutes,
                    },
                  },
                }));
              }}
              ampm={postingSchedules.days.monday.startPeriod}
              setAmpm={(newPeriod) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    monday: {
                      ...prevState.days.monday,
                      startPeriod: newPeriod,
                    },
                  },
                }));
              }}
              onChange={
                postingSchedules.type === "weekly" ? handleOpenModal : null
              }
              type={postingSchedules.type}
            />
          </Grid>
          <Grid
            className={`d-flex justify-content-start 
                        }`}
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
            <CustomTime
              disabled={disabled}
              onChange={
                postingSchedules.type === "weekly" ? handleOpenModal : null
              }
              type={postingSchedules.type}
              hours={postingSchedules.days.monday.endHours}
              isActive={postingSchedules.days.monday.isActive}
              setHours={(newHours) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    monday: {
                      ...prevState.days.monday,
                      endHours: newHours,
                    },
                  },
                }));
              }}
              minutes={postingSchedules.days.monday.endMinutes}
              setMinutes={(newMinutes) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    monday: {
                      ...prevState.days.monday,
                      endMinutes: newMinutes,
                    },
                  },
                }));
              }}
              ampm={postingSchedules.days.monday.endPeriod}
              setAmpm={(newPeriod) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    monday: {
                      ...prevState.days.monday,
                      endPeriod: newPeriod,
                    },
                  },
                }));
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* TUESDAY */}
      {/* --------------------------------------------------------------------------------------------------------------- */}

      <Grid container>
        <Grid sx={{ my: 2 }} container>
          <Grid className="d-flex align-items-center" xs={2} item>
            <FormControlLabel
              disabled={disabled}
              control={
                <Checkbox
                  checked={postingSchedules.days.tuesday.isActive}
                  onChange={(e) => {
                    const { checked } = e.target;
                    setPostingSchedules((prevState) => ({
                      ...prevState,
                      days: {
                        ...prevState.days,
                        tuesday: {
                          ...prevState.days.tuesday,
                          isActive: checked,
                        },
                      },
                    }));
                  }}
                />
              }
              label="Tuesday"
            />
          </Grid>
          <Grid className={"d-flex justify-content-start"} item md={5}>
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
            <CustomTime
              disabled={disabled}
              onChange={
                postingSchedules.type === "weekly" ? handleOpenModal : null
              }
              type={postingSchedules.type}
              hours={postingSchedules.days.tuesday.startHours}
              isActive={postingSchedules.days.tuesday.isActive}
              setHours={(newHours) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    tuesday: {
                      ...prevState.days.tuesday,
                      startHours: newHours,
                    },
                  },
                }));
              }}
              minutes={postingSchedules.days.tuesday.startMinutes}
              setMinutes={(newMinutes) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    tuesday: {
                      ...prevState.days.tuesday,
                      startMinutes: newMinutes,
                    },
                  },
                }));
              }}
              ampm={postingSchedules.days.tuesday.startPeriod}
              setAmpm={(newPeriod) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    tuesday: {
                      ...prevState.days.tuesday,
                      startPeriod: newPeriod,
                    },
                  },
                }));
              }}
            />
          </Grid>
          <Grid
            className={`d-flex justify-content-start 
                        }`}
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
            <CustomTime
              disabled={disabled}
              onChange={
                postingSchedules.type === "weekly" ? handleOpenModal : null
              }
              type={postingSchedules.type}
              hours={postingSchedules.days.tuesday.endHours}
              isActive={postingSchedules.days.tuesday.isActive}
              setHours={(newHours) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    tuesday: {
                      ...prevState.days.tuesday,
                      endHours: newHours,
                    },
                  },
                }));
              }}
              minutes={postingSchedules.days.tuesday.endMinutes}
              setMinutes={(newMinutes) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    tuesday: {
                      ...prevState.days.tuesday,
                      endMinutes: newMinutes,
                    },
                  },
                }));
              }}
              ampm={postingSchedules.days.tuesday.endPeriod}
              setAmpm={(newPeriod) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    tuesday: {
                      ...prevState.days.tuesday,
                      endPeriod: newPeriod,
                    },
                  },
                }));
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* WEDNESDAY */}
      {/* ---------------------------------------------------------------------------------------------------------------- */}

      <Grid container>
        <Grid sx={{ my: 2 }} container>
          <Grid className="d-flex align-items-center" xs={2} item>
            <FormControlLabel
              disabled={disabled}
              control={
                <Checkbox
                  checked={postingSchedules.days.wednesday.isActive}
                  onChange={(e) => {
                    const { checked } = e.target;
                    setPostingSchedules((prevState) => ({
                      ...prevState,
                      days: {
                        ...prevState.days,
                        wednesday: {
                          ...prevState.days.wednesday,
                          isActive: checked,
                        },
                      },
                    }));
                  }}
                />
              }
              label="Wednesday"
            />
          </Grid>
          <Grid className={"d-flex justify-content-start"} item md={5}>
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
            <CustomTime
              disabled={disabled}
              onChange={
                postingSchedules.type === "weekly" ? handleOpenModal : null
              }
              type={postingSchedules.type}
              hours={postingSchedules.days.wednesday.startHours}
              isActive={postingSchedules.days.wednesday.isActive}
              setHours={(newHours) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    wednesday: {
                      ...prevState.days.wednesday,
                      startHours: newHours,
                    },
                  },
                }));
              }}
              minutes={postingSchedules.days.wednesday.startMinutes}
              setMinutes={(newMinutes) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    wednesday: {
                      ...prevState.days.wednesday,
                      startMinutes: newMinutes,
                    },
                  },
                }));
              }}
              ampm={postingSchedules.days.wednesday.startPeriod}
              setAmpm={(newPeriod) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    wednesday: {
                      ...prevState.days.wednesday,
                      startPeriod: newPeriod,
                    },
                  },
                }));
              }}
            />
          </Grid>
          <Grid
            className={`d-flex justify-content-start
                        }`}
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
            <CustomTime
              disabled={disabled}
              onChange={
                postingSchedules.type === "weekly" ? handleOpenModal : null
              }
              type={postingSchedules.type}
              hours={postingSchedules.days.wednesday.endHours}
              isActive={postingSchedules.days.wednesday.isActive}
              setHours={(newHours) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    wednesday: {
                      ...prevState.days.wednesday,
                      endHours: newHours,
                    },
                  },
                }));
              }}
              minutes={postingSchedules.days.wednesday.endMinutes}
              setMinutes={(newMinutes) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    wednesday: {
                      ...prevState.days.wednesday,
                      endMinutes: newMinutes,
                    },
                  },
                }));
              }}
              ampm={postingSchedules.days.wednesday.endPeriod}
              setAmpm={(newPeriod) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    wednesday: {
                      ...prevState.days.wednesday,
                      endPeriod: newPeriod,
                    },
                  },
                }));
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* THURSDAY */}
      {/* -------------------------------------------------------------------------------------------------------- */}
      <Grid container>
        <Grid sx={{ my: 2 }} container>
          <Grid className="d-flex align-items-center" xs={2} item>
            <FormControlLabel
              disabled={disabled}
              control={
                <Checkbox
                  checked={postingSchedules.days.thursday.isActive}
                  onChange={(e) => {
                    const { checked } = e.target;
                    setPostingSchedules((prevState) => ({
                      ...prevState,
                      days: {
                        ...prevState.days,
                        thursday: {
                          ...prevState.days.thursday,
                          isActive: checked,
                        },
                      },
                    }));
                  }}
                />
              }
              label="Thursday"
            />
          </Grid>
          <Grid className={"d-flex justify-content-start"} item md={5}>
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
            <CustomTime
              disabled={disabled}
              onChange={
                postingSchedules.type === "weekly" ? handleOpenModal : null
              }
              type={postingSchedules.type}
              hours={postingSchedules.days.thursday.startHours}
              isActive={postingSchedules.days.thursday.isActive}
              setHours={(newHours) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    thursday: {
                      ...prevState.days.thursday,
                      startHours: newHours,
                    },
                  },
                }));
              }}
              minutes={postingSchedules.days.thursday.startMinutes}
              setMinutes={(newMinutes) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    thursday: {
                      ...prevState.days.thursday,
                      startMinutes: newMinutes,
                    },
                  },
                }));
              }}
              ampm={postingSchedules.days.thursday.startPeriod}
              setAmpm={(newPeriod) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    thursday: {
                      ...prevState.days.thursday,
                      startPeriod: newPeriod,
                    },
                  },
                }));
              }}
            />
          </Grid>
          <Grid
            className={`d-flex justify-content-start 
                        }`}
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
            <CustomTime
              disabled={disabled}
              onChange={
                postingSchedules.type === "weekly" ? handleOpenModal : null
              }
              type={postingSchedules.type}
              hours={postingSchedules.days.thursday.endHours}
              isActive={postingSchedules.days.thursday.isActive}
              setHours={(newHours) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    thursday: {
                      ...prevState.days.thursday,
                      endHours: newHours,
                    },
                  },
                }));
              }}
              minutes={postingSchedules.days.thursday.endMinutes}
              setMinutes={(newMinutes) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    thursday: {
                      ...prevState.days.thursday,
                      endMinutes: newMinutes,
                    },
                  },
                }));
              }}
              ampm={postingSchedules.days.thursday.endPeriod}
              setAmpm={(newPeriod) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    thursday: {
                      ...prevState.days.thursday,
                      endPeriod: newPeriod,
                    },
                  },
                }));
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* FRIDAY */}
      {/* --------------------------------------------------------------------------------------------------------------- */}

      <Grid container>
        <Grid sx={{ my: 2 }} container>
          <Grid className="d-flex align-items-center" xs={2} item>
            <FormControlLabel
              disabled={disabled}
              control={
                <Checkbox
                  checked={postingSchedules.days.friday.isActive}
                  onChange={(e) => {
                    const { checked } = e.target;
                    setPostingSchedules((prevState) => ({
                      ...prevState,
                      days: {
                        ...prevState.days,
                        friday: {
                          ...prevState.days.friday,
                          isActive: checked,
                        },
                      },
                    }));
                  }}
                />
              }
              label="Friday"
            />
          </Grid>
          <Grid className={"d-flex justify-content-start"} item md={5}>
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
            <CustomTime
              disabled={disabled}
              onChange={
                postingSchedules.type === "weekly" ? handleOpenModal : null
              }
              type={postingSchedules.type}
              hours={postingSchedules.days.friday.startHours}
              isActive={postingSchedules.days.friday.isActive}
              setHours={(newHours) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    friday: {
                      ...prevState.days.friday,
                      startHours: newHours,
                    },
                  },
                }));
              }}
              minutes={postingSchedules.days.friday.startMinutes}
              setMinutes={(newMinutes) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    friday: {
                      ...prevState.days.friday,
                      startMinutes: newMinutes,
                    },
                  },
                }));
              }}
              ampm={postingSchedules.days.friday.startPeriod}
              setAmpm={(newPeriod) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    friday: {
                      ...prevState.days.friday,
                      startPeriod: newPeriod,
                    },
                  },
                }));
              }}
            />
          </Grid>
          <Grid
            className={`d-flex justify-content-start
                        }`}
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
            <CustomTime
              disabled={disabled}
              onChange={
                postingSchedules.type === "weekly" ? handleOpenModal : null
              }
              type={postingSchedules.type}
              hours={postingSchedules.days.friday.endHours}
              isActive={postingSchedules.days.friday.isActive}
              setHours={(newHours) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    friday: {
                      ...prevState.days.friday,
                      endHours: newHours,
                    },
                  },
                }));
              }}
              minutes={postingSchedules.days.friday.endMinutes}
              setMinutes={(newMinutes) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    friday: {
                      ...prevState.days.friday,
                      endMinutes: newMinutes,
                    },
                  },
                }));
              }}
              ampm={postingSchedules.days.friday.endPeriod}
              setAmpm={(newPeriod) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    friday: {
                      ...prevState.days.friday,
                      endPeriod: newPeriod,
                    },
                  },
                }));
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* SATURDAY */}
      {/* ---------------------------------------------------------------------------------------------------- */}

      <Grid container>
        <Grid sx={{ my: 2 }} container>
          <Grid className="d-flex align-items-center" xs={2} item>
            <FormControlLabel
              disabled={disabled}
              control={
                <Checkbox
                  checked={postingSchedules.days.saturday.isActive}
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
              label="Saturday"
            />
          </Grid>
          <Grid className={"d-flex justify-content-start"} item md={5}>
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
            <CustomTime
              disabled={disabled}
              onChange={
                postingSchedules.type === "weekly" ? handleOpenModal : null
              }
              type={postingSchedules.type}
              hours={postingSchedules.days.saturday.startHours}
              isActive={postingSchedules.days.saturday.isActive}
              setHours={(newHours) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    saturday: {
                      ...prevState.days.saturday,
                      startHours: newHours,
                    },
                  },
                }));
              }}
              minutes={postingSchedules.days.saturday.startMinutes}
              setMinutes={(newMinutes) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    saturday: {
                      ...prevState.days.saturday,
                      startMinutes: newMinutes,
                    },
                  },
                }));
              }}
              ampm={postingSchedules.days.saturday.startPeriod}
              setAmpm={(newPeriod) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    saturday: {
                      ...prevState.days.saturday,
                      startPeriod: newPeriod,
                    },
                  },
                }));
              }}
            />
          </Grid>
          <Grid
            className={`d-flex justify-content-start
                        }`}
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
            <CustomTime
              disabled={disabled}
              onChange={
                postingSchedules.type === "weekly" ? handleOpenModal : null
              }
              type={postingSchedules.type}
              hours={postingSchedules.days.saturday.endHours}
              isActive={postingSchedules.days.saturday.isActive}
              setHours={(newHours) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    saturday: {
                      ...prevState.days.saturday,
                      endHours: newHours,
                    },
                  },
                }));
              }}
              minutes={postingSchedules.days.saturday.endMinutes}
              setMinutes={(newMinutes) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    saturday: {
                      ...prevState.days.saturday,
                      endMinutes: newMinutes,
                    },
                  },
                }));
              }}
              ampm={postingSchedules.days.saturday.endPeriod}
              setAmpm={(newPeriod) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    saturday: {
                      ...prevState.days.saturday,
                      endPeriod: newPeriod,
                    },
                  },
                }));
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* SUNDAY */}
      {/* ----------------------------------------------------------------------------------------------------- */}

      <Grid container>
        <Grid sx={{ my: 2 }} container>
          <Grid className="d-flex align-items-center" xs={2} item>
            <FormControlLabel
              disabled={disabled}
              control={
                <Checkbox
                  checked={postingSchedules.days.sunday.isActive}
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
              label="Sunday"
            />
          </Grid>
          <Grid className={"d-flex justify-content-start"} item md={5}>
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
            <CustomTime
              disabled={disabled}
              onChange={
                postingSchedules.type === "weekly" ? handleOpenModal : null
              }
              type={postingSchedules.type}
              hours={postingSchedules.days.sunday.startHours}
              isActive={postingSchedules.days.sunday.isActive}
              setHours={(newHours) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    sunday: {
                      ...prevState.days.sunday,
                      startHours: newHours,
                    },
                  },
                }));
              }}
              minutes={postingSchedules.days.sunday.startMinutes}
              setMinutes={(newMinutes) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    sunday: {
                      ...prevState.days.sunday,
                      startMinutes: newMinutes,
                    },
                  },
                }));
              }}
              ampm={postingSchedules.days.sunday.startPeriod}
              setAmpm={(newPeriod) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    sunday: {
                      ...prevState.days.sunday,
                      startPeriod: newPeriod,
                    },
                  },
                }));
              }}
            />
          </Grid>
          <Grid
            className={`d-flex justify-content-start
                        }`}
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
            <CustomTime
              disabled={disabled}
              onChange={
                postingSchedules.type === "weekly" ? handleOpenModal : null
              }
              type={postingSchedules.type}
              hours={postingSchedules.days.sunday.endHours}
              isActive={postingSchedules.days.sunday.isActive}
              setHours={(newHours) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    sunday: {
                      ...prevState.days.sunday,
                      endHours: newHours,
                    },
                  },
                }));
              }}
              minutes={postingSchedules.days.sunday.endMinutes}
              setMinutes={(newMinutes) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    sunday: {
                      ...prevState.days.sunday,
                      endMinutes: newMinutes,
                    },
                  },
                }));
              }}
              ampm={postingSchedules.days.sunday.endPeriod}
              setAmpm={(newPeriod) => {
                setPostingSchedules((prevState) => ({
                  ...prevState,
                  days: {
                    ...prevState.days,
                    sunday: {
                      ...prevState.days.sunday,
                      endPeriod: newPeriod,
                    },
                  },
                }));
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
