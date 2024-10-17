import { makeStyles } from '@mui/styles'
import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton
} from "@mui/material";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import React, { useEffect, useState } from "react";
import BorderedSection from "./BorderSection";
import Star from "@mui/icons-material/Star";
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 340,
    flexShrink: 0,
  },
  drawerPaper: {
    padding: theme.spacing(2),
    width: 340,
  },
  heading: {
    margin: theme.spacing(2),
  },
  specialtyBox: {
    margin: theme.spacing(1),
  },

  ratingBox: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    minWidth: '100%',
  },
}));

const specialties = [
  { id: 0, name: "Office Manager" },
  { id: 1, name: "Receptionist" },
  { id: 2, name: "Treatment Coordinator" },
  { id: 3, name: "Insurance Biller" },
  { id: 4, name: "Patient Coordinator" },
  { id: 5, name: "Financial Coordinator" },
];

function ApplicantsFilterSidebar({


  isSidebarOpen,
  setIsSidebarOpen,

  selectRating,
  setSelectRating,

  specialty,
  setSpecialty,


  selectSpeciality,
  setSelectSpeciality,

  selectStatus,
  setSelectStatus,
}) {
  const classes = useStyles();

  const handleSelectSpeciality = (speciality) => {
    const { id } = speciality;
    if (selectSpeciality.includes(id)) {
      setSelectSpeciality(selectSpeciality.filter((item) => item !== id));
    } else {
      setSelectSpeciality([...selectSpeciality, id]);
    }
  };

  const handleSelectRating = (event) => {
    const {
      target: { value },
    } = event;
    setSelectRating(typeof value === "string" ? value.split(",") : value);
  };

  const handleSelectStatus = (event) => {
    const {
      target: { value },
    } = event;
    setSelectStatus(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Drawer
      style={{ width: '100%' }}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor='right'
      open={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
    >
      <Typography
        style={{ fontWeight: 500, padding: ".5rem 0", marginBottom: "1rem" }}
        variant="h5"
        className={classes.heading}
      >
        Filter
      </Typography>

      <IconButton onClick={() => setIsSidebarOpen(false)}>
        <CloseIcon style={{
          marginLeft: '220px',
          position: 'absolute',
          top: '-47px'
        }} />
      </IconButton>
      {/* <BorderedSection title="Specialty">
        <Box className={classes.specialtyBox}>
          {specialties.map((speciality) => (
            <Chip
              key={speciality.id}
              label={speciality.name}
              style={{ margin: ".2rem", fontWeight: 500 }}
              onClick={() => handleSelectSpeciality(speciality)}
              onDelete={() => { }}
              color={
                selectSpeciality.includes(speciality.id) ? "primary" : "default"
              }
              clickable
              deleteIcon={<DoneAllIcon />}
            />
          ))}
        </Box>
      </BorderedSection> */}

      <TextField
        variant='outlined'
        fullWidth
        label='Specialty'
        id='specialty'
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
        InputProps={{
          style: {
            textAlign: 'center',
          },
        }}
      />
      <FormControl sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <InputLabel id="name-label">Rating</InputLabel>
        <Select
          style={{
            width: "100%",
          }}
          label={"Rating"}
          labelId="Rating-select-label"
          id="Rating-select-label"
          multiple
          value={selectRating}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <>
                  {value},
                  <Star sx={{ color: "orange" }} />
                </>
              ))}
            </Box>
          )}
          onChange={handleSelectRating}
        >
          <MenuItem value={5}>
            <Rating name="read-only" value={5} readOnly />
          </MenuItem>
          <MenuItem value={4}>
            <Rating name="read-only" value={4} readOnly />
          </MenuItem>
          <MenuItem value={3}>
            <Rating name="read-only" value={3} readOnly />
          </MenuItem>
          <MenuItem value={2}>
            <Rating name="read-only" value={2} readOnly />
          </MenuItem>
          <MenuItem value={1}>
            <Rating name="read-only" value={1} readOnly />
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <InputLabel id="name-label">Status</InputLabel>
        <Select
          style={{
            width: "100%",
          }}
          label={"Status"}
          labelId="Status-select-label"
          id="Status-select-label"
          multiple
          value={selectStatus}
          onChange={handleSelectStatus}
        >
          <MenuItem value={1}>Applied</MenuItem>
          <MenuItem value={2}>Approved</MenuItem>
          <MenuItem value={3}>New</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "3rem",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => console.log('ssssssssssss')}
          style={{
            color: "#2D62ED",
            width: "100%",
            marginRight: "1rem",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => console.log('ssssssssssss')}
          variant="contained"
          style={{
            backgroundColor: "#2D62ED",
            color: "white",
            width: "100%",
          }}
        >
          Find
        </Button>
      </Box>
    </Drawer>
  );
}

export default ApplicantsFilterSidebar;
