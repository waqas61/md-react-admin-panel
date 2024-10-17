import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import axios from 'axios';
import moment from 'moment';

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

const ApplicantNoShowModal = ({
  isOpen,
  onClose,
  applicant,
  fetchData,
  postingSchedule,
}) => {
  const authToken = localStorage.getItem('auth_token');

  const handleNoShow = () => {
    axios
      .put(
        `https://api.mddentalstaffing.com/api/v1/owner/applicants/${applicant.posting_applicants[0].id}/not-show`,
        {},
        {
          headers: {
            method: 'PUT',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        fetchData(1, 10);
        onClose();
      })
      .catch((e) => console.log(e));
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
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
            No Show
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              cursor: 'pointer',
            }}
            onClick={onClose}
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
          <Grid item xs={12}>
            <Grid
              className='rounded'
              container
              spacing={1}
              sx={{ backgroundColor: '#FFF8E1', p: 1 }}
            >
              <Grid item xs={1}>
                <ErrorOutlineOutlinedIcon sx={{ color: '#FFC400' }} />
              </Grid>
              <Grid item xs={11} sx={{ fontSize: '0.9rem' }}>
                <p style={{ color: '#B28900' }} className='fw-semibold mb-0'>
                  Attention
                </p>
                <p style={{ color: '#B28900' }}>
                  Please confirm that professional did not show up for the
                  assignment. Deleting the No Show record is not possible. After
                  two No Shows the professional will be banned from the use of
                  the platform. Please advised that you have an option to
                  initiate SOS action if you need immediate help from Mayday
                  Dental administrators to help with searching for another
                  professional.
                </p>
              </Grid>
            </Grid>
            <div
              style={{
                marginTop: '16px',
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#595959',
                }}
              >
                {applicant.first_name} {applicant.last_name}
              </h3>
              <div
                className='d-flex'
                style={{
                  gap: 30,
                }}
              >
                <div>
                  <p
                    style={{
                      marginBottom: '0px',
                      fontSize: '12px',
                      fontWeight: 400,
                      color: '#595959',
                    }}
                  >
                    Date
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#000',
                    }}
                  >
                    {moment(postingSchedule.schedule_date).format('MM/DD/YYYY')}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      marginBottom: '0px',
                      fontSize: '12px',
                      fontWeight: 400,
                      color: '#595959',
                    }}
                  >
                    Start Time
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#000',
                    }}
                  >
                    {moment(postingSchedule.start_time, 'HH:mm:ss').format(
                      'hh:mm A'
                    )}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      marginBottom: '0px',
                      fontSize: '12px',
                      fontWeight: 400,
                      color: '#595959',
                    }}
                  >
                    End Time
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#000',
                    }}
                  >
                    {moment(postingSchedule.end_time, 'HH:mm:ss').format(
                      'hh:mm A'
                    )}
                  </p>
                </div>
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={`Cancel all future assignments for ${applicant.first_name} ${applicant.last_name}`}
                />
              </div>
            </div>
          </Grid>
        </Typography>

        <div className='d-flex justify-content-end'>
          <button
            className='btn btn-outline-primary me-2'
            style={{
              border: 0,
              color: '#2561B0',
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='btn btn-outline-primary'
            style={{
              border: 0,
              color: '#2561B0',
            }}
            onClick={handleNoShow}
          >
            Confirm
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default ApplicantNoShowModal;
