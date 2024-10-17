import React, { useState, useEffect } from 'react';
import { Box, Modal, Radio, Typography, Button } from '@mui/material';

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
import LoadingButton from './LoadingButton';
import { useSelector } from 'react-redux';


import { capitalizeFirstLetter } from '../utils/helper';
import { selectUser } from '../store/slices/userSlice';


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

const MarkPostCompletedDialog = ({ isOpen, onClose, item, fetchData, type }) => {

  const currentUser = useSelector(selectUser);
  const [selectedDate, setSelectedDate] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const [declineLoading, setDeclineLoading] = useState(false);
  const [declineFinished, setDeclineFinished] = useState(false);


  const handleConfirm = () => {
    console.log('cdecde === > ', item);
    if (item !== null) {

      setLoading(true);
      var url = `https://api.mddentalstaffing.com/api/v1/postings/${item}/post-status`;
      if (type == 'owner') {
        url = `https://api.mddentalstaffing.com/api/v1/owner/applicants/${item.posting_applicants[0].id}/post-status`;
      }
      axios.put(url, {
        status: 'completed',
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }).then((res) => {
        fetchData();
        setFinished(true);
        onClose();
      }).catch((err) => {
        console.log(err);
        setFinished(true);
      });
    }
  };

  useEffect(() => {
    console.log('useEffect ==== > item', item);
  }, [])


  return (
    <Dialog
      // fullScreen={fullScreen}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth="sm"
      maxWidth={maxWidth}
    >
      <DialogTitle id="responsive-dialog-title">
        Mark Posting Complete ....
      </DialogTitle>
      <DialogContent>

        <DialogContentText id="alert-dialog-description">
          Are you sure ?
        </DialogContentText>

        <DialogActions>


          <LoadingButton
            color='warning'
            variant='contained'
            style={{
              padding: '5px 20px',
              margin: '5px',
              borderRadius: '4px',
              transition: 'background-color 0.3s',
              color: '#fff',
              backgroundColor: '#891616',
            }}
            onClick={() => {
              onClose();
            }}
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
            onClick={handleConfirm}
          >
            Complete
          </LoadingButton>

        </DialogActions>

      </DialogContent>
    </Dialog>
  );
};

export default MarkPostCompletedDialog;


