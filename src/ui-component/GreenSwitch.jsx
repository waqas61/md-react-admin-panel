import React from 'react';
import { alpha, styled } from '@mui/material/styles';



import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Autocomplete,
  TextField,
  Box,
  Grid,
  Typography,
  Card,
  Badge,
  Radio,
  RadioGroup,
  Switch,
  FormGroup
} from "@mui/material";



const MUISwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: alpha('#4CAF50', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#4CAF50',
  },
}));

const GreenSwitch = ({ checked, label, onChange }) => {
  return (
    <>
      <FormControlLabel
        control={<MUISwitch onChange={onChange} checked={checked} />}
        label={label}
      />
    </>
  );
};

export default GreenSwitch;
