import { Drawer, IconButton, Typography, Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const ApplicantsSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedItem,
  gridWidth
}) => {
  const [applicants, setApplicants] = useState([]);
  const authToken = localStorage.getItem('auth_token');


  useEffect(() => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/postings/${selectedItem.id}/applicants`,
        {
          headers: {
            method: 'GET',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setApplicants(res.data.data);
      })
      .catch((e) => console.log(e));
  }, [authToken, selectedItem.id]);

  return (
    <Drawer
      anchor='right'
      open={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
      PaperProps={{
        style: {
          width: `${gridWidth ? '80%' : '25vw'}`,
          // display: 'flex',
          // flexDirection: 'column'
        },
      }}
    >
      <div
        className='d-flex justify-content-between align-items-center'
        style={{
          padding: '20px',
        }}
      >
        <Typography variant='h6' component='h2'>
          Applicants
        </Typography>
        <IconButton onClick={() => setIsSidebarOpen(false)}>
          <Close />
        </IconButton>
      </div>

      <div
        style={{
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          overflow: 'hidden',
          padding: '0px 20px',
        }}
      >
        {applicants.map((applicant) => (
          <div
            key={applicant.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <img
                // src={applicant.profile_photo_path}
                src={applicant.avatar ? `https://api.mddentalstaffing.com/api/v1/assets/${applicant.avatar}` : 'https://via.placeholder.com/150'}
                alt='avatar'
                style={{ borderRadius: '50%', width: '30px' }}
              />
              <h6
                style={{
                  color: '#262626',
                  fontSize: '14px',
                }}
              >
                {applicant.first_name} {applicant.last_name}
              </h6>
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default ApplicantsSidebar;
