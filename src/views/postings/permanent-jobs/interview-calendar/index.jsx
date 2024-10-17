import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Autocomplete,
  TextField,
  Box,
  Grid,
  Typography,
  Card,
  Badge,
  Radio,
  RadioGroup,
  Switch,
  FormGroup
} from "@mui/material";


// project imports
import SubCard from '../../../../ui-component/cards/SubCard';
import MainCard from '../../../../ui-component/cards/MainCard';
import SecondaryAction from '../../../../ui-component/cards/CardSecondaryAction';
import ScheduleInterviewCalendar from '../schedule-job-interview/ScheduleInterviewCalendar';
import { gridSpacing } from '../../../../store/constant';

const InterviewCalendar = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([{}]);
  const [interviews, setInterviews] = useState([]);
  const [posting, setPosting] = useState({});

  const getInterviews = () => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/interview-schedules`,
        {
          headers: {
            method: 'GET',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((response) => {
        const interviews = response.data.data;

        const events = interviews.map((interview) => {
          return {
            title: interview.type,
            start: moment(interview.interview_date).toDate(),
            end: moment(interview.interview_date).toDate(),
            ...interview,
            interview: {
              ...interview.interview,
              applicant: {
                ...interview.interview.posting_applicant.user,
              },
            },
          };
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
            title: `${groupedEvents[date].length} Interview(s) on this day`,
          };
        });
        setInterviews(interviews);
        setEvents(eventList);
      })
      .catch((e) => console.log(e));
  };

  const getPosting = () => {
    axios
      .get(`https://api.mddentalstaffing.com/api/v1/owner/postings/${id}`, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((response) => {
        setPosting(response.data.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getInterviews();
  }, []);

  useEffect(() => {
    getPosting();
  }, []);




  return (
    <>
      <MainCard
        title=" Interview Calendar"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            {events && (
              <ScheduleInterviewCalendar
                interviews={interviews}
                events={events}
                setEvents={setEvents}
                posting={posting}
              />
            )}
          </Grid>
        </Grid>
      </MainCard>
    </>
  );



};

export default InterviewCalendar;
