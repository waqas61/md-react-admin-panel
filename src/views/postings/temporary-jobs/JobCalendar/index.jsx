import React, { useEffect, useState } from 'react';
import Layout from '../../../../../components/Layout';
import { Grid } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import axios from 'axios';
import moment from 'moment';
import ScheduleCalendar from './Calendar';
import { useParams } from 'react-router-dom';

const OwnerJobCalendar = () => {
  const [events, setEvents] = useState([]);
  const [posting, setPosting] = useState({});
  const [postingTimeZone, setPostingTimeZone] = useState(null);
  const [postingTimeZoneOffset, setPostingTimeZoneOffset] = useState(null);
  const { postingId } = useParams();

  const fetchPostingSchedules = () => {
    let endPoint = `https://api.mddentalstaffing.com/api/v1/owner/postings/schedules`;
    if (postingId) {
      endPoint = `https://api.mddentalstaffing.com/api/v1/owner/postings/schedules?posting_id=${postingId}`;
    } else {
      endPoint = `https://api.mddentalstaffing.com/api/v1/owner/postings/schedules`;
    }
    axios
      .get(`${endPoint}`, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((res) => {
        const schedules = res.data.data;
        const events = schedules.flatMap((schedule) => {
          const sch = schedule.posting_applicants.map((applicant) => {
            return {
              title: schedule.schedule_status,
              start: moment.utc(schedule.start_time, 'YYYYMMDD HH:mm:ss').tz(schedule.posting.time_zone.time_zone).toDate(),
              end: moment.utc(schedule.end_time, 'YYYYMMDD HH:mm:ss').tz(schedule.posting.time_zone.time_zone).toDate(),
              applicant: applicant,
              ...schedule,
            };
          });
          return sch;
        });


        const groupedEvents = events.reduce((acc, event) => {
          const date = moment(event.start).format('YYYY-MM-DD');
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(event);
          return acc;
        }, {});

        const eventList = Object.keys(groupedEvents).map((date) => {
          return {
            start: moment(date).toDate(),
            end: moment(date).toDate(),
            events: groupedEvents[date],
            title: `${groupedEvents[date].length} Professional(s) on this Day:`,
          };
        });

        setEvents(eventList);
      })
      .catch((e) => console.log(e));
  };

  const fetchPosting = () => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/postings/${postingId}`,
        {
          headers: {
            method: 'GET',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((res) => {
        setPosting(res.data.data);
        setPostingTimeZone(res.data.data.time_zone.time_zone);
        setPostingTimeZoneOffset(res.data.data.time_zone.zone_name);

      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    // console.log('Back === > ', postingTimeZone, posting);
  }, [postingTimeZone, posting]);

  useEffect(() => {
    fetchPostingSchedules();
  }, []);

  useEffect(() => {
    if (postingId) {
      fetchPosting();
    }
  }, [postingId]);

  const items = [];

  if (postingId) {
    items.push({
      name: 'Postings',
      link: '/',
    });
    items.push({
      name: 'Temporary Job',
      link: '/owner/postings/temporary',
    });
    items.push({
      name: 'Job Calendar',
      link: `/owner/postings/temporary/${postingId}/calendar`,
    });
  } else {
    items.push({
      name: 'Job Calendar',
      link: '/owner/postings/temporary/calendar',
    });
  }

  return (
    <Layout items={items}>
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
            {postingId ? 'Temporary Job Calendar' : 'Job Calendar'}
          </h4>
          <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
            <p className='clinic-location'>
              {postingId ? posting.title : 'Manage Job Calendar'}
            </p>
          </p>
        </Grid>
      </div>
      {postingId && (
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
              gap: 30,
            }}
          >
            {postingId && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 30,
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
                    {/* {posting &&  moment(posting.start_date).format('MMMM Do YYYY')} */}
                    {posting && postingTimeZone && (
                      <>{moment.utc(posting.start_date, 'YYYYMMDD HH:mm:ss').tz(postingTimeZone).format('MMMM Do YYYY')}</>
                    )}
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
                    {/* {posting && moment(posting.end_date).format('MMMM Do YYYY')} */}
                    {posting && postingTimeZone && (
                      <>{moment.utc(posting.end_date, 'YYYYMMDD HH:mm:ss').tz(postingTimeZone).format('MMMM Do YYYY')}</>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <ScheduleCalendar events={events} />
    </Layout>
  );
};

export default OwnerJobCalendar;
