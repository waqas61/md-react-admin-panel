import React from 'react';
import Cal from '../../../../components/Calender/Cal';
import Layout from '../../../../components/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Button } from 'react-bootstrap';
import SuccessModal from '../../../../components/General/SuccessModal';
import ErrorModal from '../../../../components/General/ErrorModal';
import ApplyStatusDialog from '../../../../components/General/ApplyStatusDialog';
import LoadingButton from '../../../../components/General/LoadingButton';
import './JobCalendar.css';

import moment from 'moment';
import { selectUser } from '../../../../redux/slices/userSlice';
import { useSelector } from 'react-redux';



function JobCalendar() {
  const user = useSelector(selectUser);
  let { id } = useParams();
  const [selectedDays, setSelectedDays] = useState([]);

  const [postings, setPostings] = useState([]);
  const [slots, setSlots] = useState([]);
  const [postingSchedules, setPostingSchedules] = useState([]);

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFailModal, setOpenFailModal] = useState(false);
  const [applyFailModal, setApplyFailModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [jobStartDateTime, setJobStartDateTime] = useState({
    'start_date_time': null,
    'end_date_time': null
  });
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const authToken = localStorage.getItem('auth_token');
  const lo_user = localStorage.getItem('user');
  const lo_user_ob = JSON.parse(lo_user);

  useEffect(() => {
    getPostings();
    getPostingSchedules();
  }, []);


  useEffect(() => {
    getPostingSchedules();
  }, [selectedDays]);


  const getPostings = () => {
    axios
      .get(`https://api.mddentalstaffing.com/api/v1/postings/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setPostings(res.data);


        var start = res.data.data.posting_schedules.shift(0);
        var end = res.data.data.posting_schedules.pop();
        if (end == undefined) {
          end = start;
        }
        setJobStartDateTime({
          ...jobStartDateTime,
          'start_date_time': start.start_time,
          'end_date_time': end.end_time
        });

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPostingSchedules = () => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/postings/schedules?posting_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setPostingSchedules(res.data);
        // setSelectedDays([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };




  const applySelectedDays = () => {

    if (selectedDays.length !== 0) {
      setLoading(true);
      const scheduleIds = selectedDays.map((item) => item.id);
      setOpenFailModal(false);
      axios
        .post(
          // `https://api.mddentalstaffing.com/api/v1/postings/${id}/apply`,
          `https://api.mddentalstaffing.com/api/v1/postings/${id}/apply-status`,
          {
            posting_schedule_ids: scheduleIds,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((res) => {
          setFinished(true);
          setSelectedDays([]);
          setOpenSuccessModal(true);
          getPostingSchedules();
          setFinished(true);
        }).catch((res) => {
          setSlots(res.response.data.message.allocated_slots);
          // let min = 10 - res.response.data.message.description;
          setOpenFailModal(true)
          getPostingSchedules();
          setFinished(true);
        });
    }
  };

  const applyRestSelectedDays = () => {

    if (selectedDays.length !== 0) {
      const scheduleIds = selectedDays.map((item) => item.id);
      axios
        .post(
          `https://api.mddentalstaffing.com/api/v1/postings/${id}/apply`,
          {
            posting_schedule_ids: scheduleIds,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((res) => {
          setSelectedDays([]);
          setOpenSuccessModal(true);
          getPostingSchedules();
        }).catch((res) => {
          setSelectedDays([]);
          setErrorMessage('Please apply again when the wait time is over.');
          setApplyFailModal(true);
          // getPostingSchedules();
        });
    }
  };

  return (
    <Layout
      items={[
        {
          name: 'Jobs',
          link: '/',
        },
        {
          name: 'Temporary Jobs',
          link: '/professional/jobs/temporary',
        },
        {
          name: 'Job Calendar',
          link: `/professional/jobs/temporary/${id}/calendar`,
        },
      ]}
    >
      <div
        className='d-flex'
        style={{
          alignItems: 'center',
          borderBottom: '1px solid #D9D9D9',
        }}
      >
        <Grid
          sx={{
            px: 3,
            pt: 2,
            pb: 1,
            width: 'auto',
          }}
        >
          <h4 className='pb-0 mb-1' style={{ color: '#262626' }}>
            Job Calendar -{' '}
            {postings && postings.data && postings.data.user.companies[0].name}
          </h4>
          <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
            <p className='clinic-location'>
              Location:{' '}
              {postings &&
                postings.data &&
                postings.data.user_location.place_name}
              | Posting Title:{' '}
              {postings && postings.data && postings.data.title}
            </p>
          </p>
        </Grid>
      </div>
      {/* clinic-details-container */}
      <div
        className='job-details-container'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          borderBottom: '1px solid #E8E8E8',
          paddingLeft: '23px',
          paddingRight: '16px',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
      >
        <div
          className='start-end-container'
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '60%',
            justifyContent: 'space-between',
            // paddingTop: "10px",
          }}
        >
          <div className='job-start'>
            <p
              style={{
                color: '#595959',
              }}
            >
              Starts
            </p>
            <p>
              {/* {postings && postings.data && postings.data.start_date} */}
              {moment.utc(jobStartDateTime.start_date_time, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('MM/DD/YY hh:mm A')}
              {/* {moment(jobStartDateTime.start_date_time).tz(user.time_zone.time_zone).format('YYYY-MM-DD hh:mm A')} */}
            </p>
          </div>
          <div className='job-end'>
            <p
              style={{
                color: '#595959',
              }}
            >
              {' '}
              Ends
            </p>
            <p>
              {/* {postings && postings.data && postings.data.start_date} */}
              {/* {jobStartDateTime.end_date_time} */}
              {moment.utc(jobStartDateTime.end_date_time, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('MM/DD/YY hh:mm A')}
              {/* {moment(jobStartDateTime.end_date_time).tz(user.time_zone.time_zone).format('YYYY-MM-DD hh:mm A')} */}
            </p>
          </div>
          <div>
            <p
              style={{
                color: '#595959',
              }}
            >
              |
            </p>
          </div>
          <div className='approved-days'>
            <p
              style={{
                color: '#595959',
              }}
            >
              Day(s) Approved
            </p>

            <div
              className='days-approved-count'
              style={{
                display: 'flex',
                alignItems: 'center',
                // backgroundColor: "#4CAF50",
                columnGap: '5px',
              }}
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  x='0.5'
                  y='0.5'
                  width='15'
                  height='15'
                  rx='1.5'
                  fill='#4CAF50'
                  stroke='#388E3C'
                />
                <path
                  d='M7.56211 10.8365L5.22867 8.36636L5.89476 7.6601L7.56211 9.42551L11.562 5.18992L12.2285 5.89568L7.56164 10.837L7.56211 10.8365ZM5.56195 10.8365L3.22852 8.36636L3.89508 7.6601L6.22852 10.1308L5.56243 10.8365H5.56195ZM7.56211 8.71924L6.89508 8.01348L9.89508 4.83704L10.5621 5.5428L7.56211 8.71874V8.71924Z'
                  fill='white'
                />
              </svg>

              <p
                style={{
                  marginBottom: '0px',
                }}
              >
                {postings &&
                  postings.data &&
                  postings.data.application_approved_count}
              </p>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='15'
                height='16'
                viewBox='0 0 15 16'
                fill='none'
              >
                <path
                  d='M7.5 9.5625L10.625 6.4375L4.375 6.4375L7.5 9.5625Z'
                  fill='#262626'
                />
              </svg>
            </div>
          </div>
          <div className='selected-days'>
            <p
              style={{
                color: '#595959',
              }}
            >
              Day(s) Selected
            </p>

            <div
              className='days-selected-count'
              style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '5px',
              }}
            >
              <p
                style={{
                  marginBottom: '0px',
                }}
              >
                {selectedDays.length}
              </p>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='15'
                height='16'
                viewBox='0 0 15 16'
                fill='none'
              >
                <path
                  d='M7.5 9.5625L10.625 6.4375L4.375 6.4375L7.5 9.5625Z'
                  fill='#262626'
                />
              </svg>
            </div>
          </div>
          <div className='apply-for-selected'>
            {/* <button
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '6px 14px',
              }}
              onClick={applySelectedDays}
            >
              Apply for selected days
            </button> */}
          </div>
        </div>

        <div
          className='export-calendar'
          style={{
            display: 'flex',
            gap: '10px',
            width: '45%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <LoadingButton
            variant='primary'
            style={{
              backgroundColor: '#4CAF50',
              border: 0,
              color: 'white'
            }}
            loading={loading}
            done={finished}
            onClick={applySelectedDays}
          >
            Apply for selected days
          </LoadingButton>


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
      </div>
      <Cal
        companyName={
          postings && postings.data && postings.data.user.companies[0].name
        }
        postingSchedules={postingSchedules}
        setSelectedDays={setSelectedDays}
        getPostingSchedules={getPostingSchedules}
      />

      <div
        className='calendar-legend'
        style={{
          backgroundColor: 'rgba(237, 237, 237, 0.80)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingTop: '10px',
          paddingLeft: '50px',
          paddingRight: '50px',
          paddingBottom: '10px',
          fontSize: '12px',
        }}
      >
        <div
          className='jobs'
          style={{
            display: 'flex',
            columnGap: '20px',
          }}
        >
          <p
            style={{
              color: '#8C8C8C',
            }}
          >
            JOBS:
          </p>
          <p>
            {' '}
            <span
              style={{
                backgroundColor: '#1CCBC0',
                color: 'white',
                fontWeight: 'bold',
                padding: '2px 5px',
              }}
            >
              T
            </span>{' '}
            – Temporary Job
          </p>
          <p>
            {' '}
            <span
              style={{
                backgroundColor: '#E46F85',
                color: 'white',
                fontWeight: 'bold',
                padding: '2px 5px',
              }}
            >
              P
            </span>
            &nbsp; – &nbsp;Permanent Job
          </p>
        </div>

        <div
          className='interviews'
          style={{
            display: 'flex',
            columnGap: '20px',
          }}
        >
          <p
            style={{
              color: '#8C8C8C',
            }}
          >
            {' '}
            INTERVIEWS:
          </p>
          <p>
            <span
              style={{
                backgroundColor: '#81C784',
                color: 'white',
                fontWeight: 'bold',
                padding: '2px 5px',
              }}
            >
              W
            </span>{' '}
            &nbsp; – &nbsp;Working Interview
          </p>
          <p>
            <span
              style={{
                backgroundColor: '#4D80CC',
                color: 'white',
                fontWeight: 'bold',
                padding: '2px 5px',
              }}
            >
              I
            </span>
            &nbsp; – &nbsp;Interview
          </p>
        </div>

        <div
          className='statuses'
          style={{
            display: 'flex',
            columnGap: '20px',
          }}
        >
          <p
            style={{
              color: '#8C8C8C',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            STATUS:
          </p>
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              className='clock-icon'
              style={{
                backgroundColor: '#FFCF33',
                color: 'white',
                fontWeight: 'bold',
                padding: '2px 5px',
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='14'
                height='13'
                viewBox='0 0 14 13'
                fill='none'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M6.99475 1.08337C4.00475 1.08337 1.5835 3.51004 1.5835 6.50004C1.5835 9.49004 4.00475 11.9167 6.99475 11.9167C9.99016 11.9167 12.4168 9.49004 12.4168 6.50004C12.4168 3.51004 9.99016 1.08337 6.99475 1.08337ZM7.00016 10.8334C4.606 10.8334 2.66683 8.89421 2.66683 6.50004C2.66683 4.10587 4.606 2.16671 7.00016 2.16671C9.39433 2.16671 11.3335 4.10587 11.3335 6.50004C11.3335 8.89421 9.39433 10.8334 7.00016 10.8334ZM6.4585 3.79171H7.271V6.63546L9.7085 8.08171L9.30225 8.74796L6.4585 7.04171V3.79171Z'
                  fill='white'
                />
              </svg>
            </div>
            &nbsp; – &nbsp;Pending
          </p>

          <p
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M17.25 16.125L9 1.875L0.75 16.125H17.25ZM9.75 13.8751H8.24999V12.3751H9.75V13.8751ZM8.24999 10.875H9.75V7.87496H8.24999V10.875Z'
                  fill='#FA5A16'
                />
              </svg>
            </div>
            &nbsp; – &nbsp;Error
          </p>
        </div>
      </div>

      {openSuccessModal && (
        <SuccessModal
          open={openSuccessModal}
          handleClose={() => setOpenSuccessModal(false)}
          successMessage={'Thank you for applying!'}
        />
      )}
      {openFailModal && (
        <ApplyStatusDialog
          openState={openFailModal}
          handleCloseFunction={() => {
            setOpenFailModal(false);
            setSlots([]);
          }}
          applyRestSelectedDays={applyRestSelectedDays}
          slots={slots}
        />

        // <ErrorModal
        //   open={openFailModal}
        //   handleClose={() => setOpenFailModal(false)}
        //   errorMessage={errorMessage}
        // />
      )}
      {applyFailModal && (
        <ErrorModal
          open={applyFailModal}
          handleClose={() => setApplyFailModal(false)}
          errorMessage={errorMessage}
        />
      )}
    </Layout>
  );
}

export default JobCalendar;
