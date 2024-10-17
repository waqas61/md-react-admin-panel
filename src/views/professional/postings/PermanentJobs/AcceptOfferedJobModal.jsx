import React, { useState, useEffect } from 'react';
import { Box, Modal, Radio, Typography, Button } from '@mui/material';
import { capitalizeFirstLetter } from '../../../../utils/helper';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import LoadingButton from '../../../../ui-component/LoadingButton';



import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Alert from '@mui/material/Alert';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '6px',
};

const AcceptOfferedJobModal = ({ isOpen, onClose, fetchData, selectedItem, successModal, errorModal, setSuccessMessage }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [maxWidth, setMaxWidth] = React.useState('md');
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [states, setStates] = useState([]);

  const handleSave = async (data) => {
    setLoading(true);
    const API_BASE_URL = `https://api.mddentalstaffing.com/api/v1/postings/applicants/${selectedItem.posting_applicant.id}/accept`;
    await axios.put(API_BASE_URL, {
      'posting_applicant_id': selectedItem.posting_applicant.id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then((res) => {
      setSuccessMessage('Job Offer Accept Successfully');
      successModal();
      setFinished(true);
      fetchData();
      onClose();
    }).catch((err) => {
      errorModal();
      setFinished(true);
      onClose();
    });
  };


  return (
    <Dialog
      // fullScreen={fullScreen}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth="md"
      maxWidth={maxWidth}
    >
      <DialogTitle id="responsive-dialog-title">
        {"Accept Job Offer"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          color='warning'
          variant='contained'
          style={{
            padding: '5px 20px',
            margin: '2px',
            borderRadius: '4px',
            transition: 'background-color 0.3s',
            color: 'black',
            backgroundColor: '#f0ecec',
          }}
          onClick={onClose}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          color='primary'
          variant='contained'
          style={{
            padding: '5px 20px',
            borderRadius: '4px',
            transition: 'background-color 0.3s',
            color: '#fff',
            backgroundColor: '#FA5A16',
          }}
          loading={loading}
          done={finished}
          onClick={handleSave}
        // onClick={onClose}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AcceptOfferedJobModal;


