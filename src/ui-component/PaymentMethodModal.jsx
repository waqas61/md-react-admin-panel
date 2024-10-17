
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingButton from './LoadingButton';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '6px',
};

export default function PaymentMethodModal({
  open,
  handleClose,
  selectedItem,
  fetchData,
}) {

  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);


  const handleConfirm = () => {
    setLoading(true);
    const data = {
      payment_method_id: selectedItem.id,
    };

    axios.put(`https://api.mddentalstaffing.com/api/v1/owner/defualt-payment-method`, data, {
      headers: {
        method: 'PUT',
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then((res) => {
      fetchData();
      setFinished(true);
      handleClose();
    }).catch((e) => console.log(e));
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
            Set This Defualt Payment Method
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
              sx={{ backgroundColor: '#FFF8E1', p: 1 }}
            >
              <Grid item xs={1}>
                <ErrorOutline sx={{ color: '#FFC400' }} />
              </Grid>
              <Grid item xs={11} sx={{ fontSize: '0.9rem' }}>
                <p style={{ color: '#B28900' }} className='fw-semibold mb-0'>
                  Attention!
                </p>
                <p style={{ color: '#B28900' }}>
                  Are you sure ?
                  <strong>
                    {selectedItem?.first_name} {selectedItem?.last_name}
                  </strong>
                  ?
                  <br /> <br />
                  {/* content here */}
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
          <LoadingButton
            style={{
              // textTransform: 'none',
              // padding: '7px 18px',
              borderRadius: '4px',
              transition: 'background-color 0.3s',
              border: "1px solid #2561B0",
              color: "#f1f1f1",
              backgroundColor: "#2561B0",
            }}
            loading={loading}
            done={finished}
            onClick={handleConfirm}
          >
            Confirm
          </LoadingButton>
        </div>
      </Box>
    </Modal>
  );
}
