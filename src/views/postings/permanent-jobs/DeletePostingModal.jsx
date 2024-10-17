import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { Grid } from '@mui/material';
import axios from 'axios';


export default function DeletePostingModal({
  open,
  handleClose,
  selectedItem,
  fetchData,
  gridWidth
}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: gridWidth ? 350 : 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    gap: '20px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '6px',
  };
  const authToken = localStorage.getItem('auth_token');

  const handleDeletePosting = () => {
    if (selectedItem !== null) {
      axios
        .delete(
          `https://api.mddentalstaffing.com/api/v1/owner/postings/${selectedItem.id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((res) => {
          fetchData(1, 10);
          handleClose();
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <div
          className='d-flex'
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Delete
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              cursor: 'pointer',
            }}
            onClick={handleClose}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              class='bi bi-x'
              viewBox='0 0 16 16'
            >
              <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
            </svg>
          </div>
        </div>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Grid
              className='rounded'
              container
              spacing={1}
              sx={{ backgroundColor: '#FFF3EE', p: 1 }}
            >
              <Grid item xs={1}>
                <ReportProblemOutlinedIcon sx={{ color: '#E54C0B' }} />
              </Grid>
              <Grid item xs={11} sx={{ fontSize: '0.9rem' }}>
                <p style={{ color: '#E54C0B' }} className='fw-semibold mb-0'>
                  Attention!
                </p>
                <p className='w-75' style={{ color: '#E54C0B' }}>
                  Are you sure you want to delete this posting? If deleting a
                  filled posting, cancellation fee will apply
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Typography>

        <div className='d-flex justify-content-end'>
          <button
            className='btn btn-outline-primary me-2'
            style={{
              border: 0,
              color: '#2561B0',
            }}
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className='btn btn-outline-primary'
            style={{
              border: 0,
              color: '#2561B0',
            }}
            onClick={handleDeletePosting}
          >
            Confirm
          </button>
        </div>
      </Box>
    </Modal>
  );
}
