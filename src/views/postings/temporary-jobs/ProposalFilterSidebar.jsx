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
import Star from "@mui/icons-material/Star";
import CloseIcon from '@mui/icons-material/Close';


import CustomDatePicker from '../../../ui-component/create-posting/CustomDatePicker';

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


function ProposalFilterSidebar({

  fetchProposal,
  resetFilter,

  isSidebarOpen,
  setIsSidebarOpen,

  hiringRate,
  setHiringRate,

  selectStatus,
  setSelectStatus,

  proposalDate,
  setProposalDate,
  gridWidth

}) {
  // const classes = useStyles();


  const handleSelectStatus = (event) => {
    const {
      target: { value },
    } = event;
    setSelectStatus(typeof value === "string" ? value.split(",") : value);
  };

  return (



    <Drawer
      anchor='right'
      open={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
      PaperProps={{
        style: {
          width: `${gridWidth ? '80%' : '20vw'}`,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        },
      }}
    >
      <Typography variant='h6' component='h2'>
        Filters
      </Typography>







      <IconButton onClick={() => setIsSidebarOpen(false)}>
        <CloseIcon style={{
          marginLeft: '220px',
          position: 'absolute',
          top: '-47px'
        }} />
      </IconButton>


      <CustomDatePicker
        label='Date'
        value={proposalDate}
        onChange={(date) => setProposalDate(date)}
        size="medium"
      />


      <TextField
        variant='outlined'
        fullWidth
        label='Hiring Rate'
        id='hiringRate'
        value={hiringRate}
        onChange={(e) => setHiringRate(e.target.value)}
        InputProps={{
          style: {
            textAlign: 'center',
          },
        }}
      />

      <FormControl sx={{ marginBottom: "1rem" }}>
        <InputLabel id="name-label">Status</InputLabel>
        <Select
          style={{
            width: "100%",
          }}
          label={"Status"}
          labelId="Status-select-label"
          id="Status-select-label"

          value={selectStatus}
          onChange={handleSelectStatus}
        >
          <MenuItem value="new">New</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
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

          onClick={() => {
            resetFilter();
            setIsSidebarOpen(false);
          }}
          style={{
            color: "#2D62ED",
            width: "100%",
            marginRight: "1rem",
          }}
        >
          Reset
        </Button>
        <Button
          onClick={() => {
            fetchProposal();
            setIsSidebarOpen(false);
          }}
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
    </Drawer >
  );
}

export default ProposalFilterSidebar;
