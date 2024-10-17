import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DoneIcon from '@mui/icons-material/Done';
import './SuccessModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 240,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '6px',
  padding: 0,
};

export default function SuccessModal({ open, handleClose, successMessage }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      const timeoutId = setTimeout(() => {
        setClosing(true);
        setTimeout(() => {
          handleClose();
        }, 300);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [open, handleClose]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <div style={{ padding: '16px' }}>
          <div
            className='d-flex'
            style={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div></div>
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
          </div>

          <div
            className='d-flex'
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                borderRadius: '50%',
                border: '1px solid #E8E8E8',
                padding: '16px',
              }}
            >
              <DoneIcon fontSize='large' style={{ color: '#4CAF50' }} />
            </div>
            <h2
              id='modal-modal-title'
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginTop: '16px',
                color: '#4CAF50',
              }}
            >
              Success
            </h2>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 'normal',
                marginTop: '8px',
                color: '#595959',
                textAlign: 'center',
              }}
            >
              {successMessage}
            </p>
          </div>
        </div>
        <div className={`loading-bar ${closing ? 'closing' : ''}`}></div>
      </Box>
    </Modal>
  );
}
