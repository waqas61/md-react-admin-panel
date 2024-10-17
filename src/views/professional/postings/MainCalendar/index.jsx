import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Grid, Button } from '@mui/material';

// project imports
import SubCard from '../../../../ui-component/cards/SubCard';
import MainCard from '../../../../ui-component/cards/MainCard';
import PanelCard from '../../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../../ui-component/cards/CardSecondaryAction';
import ReactCalendar from './ReactCalendar';
import { gridSpacing } from '../../../../store/constant';

const MainCalendar = () => {
  const [myJobs, setMyJobs] = useState([]);

  const authToken = localStorage.getItem('auth_token');

  useEffect(() => {
    getMyJobs();
  }, []);

  const getMyJobs = () => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/postings?my_jobs=1&join_schedule=1`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setMyJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      <MainCard
        title="Main Calendar"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>

            <div
              className='d-flex justify-content-end'
              style={{
                borderBottom: '1px solid #D9D9D9',
                alignItems: 'center',
                padding: 16,
              }}
            >
              <Button
                variant='primary'
                style={{
                  backgroundColor: '#2561B0',
                  border: 0,
                }}
              >
                Export To My Calendar
              </Button>
            </div>

            {myJobs && myJobs.data && myJobs.data.length > 0 && (
              <ReactCalendar data={myJobs.data} />
            )}

          </Grid>
        </Grid>
      </MainCard >
    </>
  );



};

export default MainCalendar;
