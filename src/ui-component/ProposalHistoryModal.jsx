import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

import './SuccessModal.css';



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Close from '@mui/icons-material/Close';

import { getStatusStyle } from '../utils/CustomDataGridStyle';
import { capitalizeFirstLetter } from '../utils/helper';

import {
  Alert,
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Modal,
  Radio,
  RadioGroup,
  Typography,
  Grid
} from '@mui/material';



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
  width: '60%'
};


export default function ProposalHistoryModal({ selectedItem, open, handleClose }) {
  const [closing, setClosing] = useState(false);
  const [history, setHistory] = useState(null);
  const authToken = localStorage.getItem('auth_token');
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);
  const applicant_user = url.split('/')[8];
  const post = url.split('/')[10];

  const fetchProposal = () => {
    axios
      .get(`https://api.mddentalstaffing.com/api/v1/owner/proposal/histroy/${selectedItem.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setHistory(res.data.data[0].proposal_history);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchProposal();
  }, []);


  useEffect(() => {
    console.log('history', history);
  }, [history]);


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>

        {/* <div className='d-flex' style={{ justifyContent: 'space-between', alignItems: 'center' }} >
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              cursor: 'pointer',
            }}
            onClick={handleClose}
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M18 6L6 18'
                stroke='#595959'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M6 6L18 18'
                stroke='#595959'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div> */}
        <Typography id='modal-modal-description' sx={{ mt: 1 }}>

          <Typography id='modal-modal-title_des' variant='h6' component='h2'>
            Action History
          </Typography>

          <Box sx={{ flexGrow: 1, mt: 1 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ width: '200px' }}>Date</TableCell>
                    <TableCell align="left" style={{ width: '200px' }}>Status</TableCell>
                    <TableCell align="left" style={{ width: '200px' }}>Responsible Party</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history && history.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="left">
                        {moment(row.created_at).utc().format('DD:MM:YY HH:MM A')}
                      </TableCell>
                      <TableCell align="left">

                        <span
                          style={getStatusStyle(
                            row.schedule_status.toLowerCase(),
                          )}
                        >
                          {capitalizeFirstLetter(row.schedule_status)}
                        </span>


                      </TableCell>
                      <TableCell align="left">

                        <Box sx={{ flexGrow: 1 }}>
                          <Grid container spacing={1}>
                            <Grid item xs={5}>
                              {row.user.avatar ? (
                                <Avatar alt="Remy Sharp"
                                  src={`https://api.mddentalstaffing.com/api/v1/assets/${row.user.avatar}`}
                                  width='40px'
                                  height='40px'
                                />
                              ) : (
                                <AccountCircle style={{ fontSize: '40px' }} />
                              )}
                            </Grid>
                          </Grid>
                        </Box>





                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Typography>
        {/* <div className={`loading-bar ${closing ? 'closing' : ''}`}></div> */}
      </Box>
    </Modal>
  );
}
