import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Button } from 'react-bootstrap';
import FilterIcon from '../../../assets/icons/filter.svg';
import RefreshIcon from '../../../assets/icons/arrow-clockwise.svg';
import axios from 'axios';
import InterviewsDataGrid from './InterviewsDataGrid';
import FiltersSidebar from './FiltersSidebar';

const JobInterviewsGrid = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [interviews, setInterviews] = useState({});
  const [posting, setPosting] = useState({});
  const [selectedType, setSelectedType] = useState('');
  const [interviewStatus, setInterviewStatus] = useState('');
  const [filtersSidebar, setFiltersSidebar] = useState(false);
  const applicant = window.location.pathname.split('/')[6];
  const postingId = window.location.pathname.split('/')[8];
  const schedule_id = window.location.pathname.split('/')[10];


  console.log('applicant', applicant);
  console.log('posting_id', postingId);
  console.log('schedule_id', schedule_id);


  const columns = [
    { field: 'applicant', headerName: 'Interview Type', width: 200 },
    { field: 'user_location_id', headerName: 'Status', width: 150 },
    { field: 'posting_status', headerName: 'Start Time', width: 150 },
    { field: 'start_date', headerName: 'End Time', width: 150 },
    { field: 'end_date', headerName: 'Selected Date', width: 150 },
    { field: 'applicants_count', headerName: 'Address', width: 150 },
    { field: 'applicants_count', headerName: '', width: 150 },
  ];



  const getInterviews = (page, limit) => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/owner/interviews?posting_id=${postingId}&page=${page}&limit=${limit}`;

    // if (selectedType) {
    //   endpoint += `&type=${selectedType}`;
    // }

    // if (interviewStatus) {
    //   endpoint += `&interview_status=${interviewStatus}`;
    // }

    axios
      .get(endpoint, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((response) => {
        setInterviews(response.data);
      })
      .catch((e) => console.log(e));
  };


  const filterInterviews = (page, limit) => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/interviews?posting_id=${postingId}&page=${page}&limit=${limit}`;

    if (selectedType) {
      endpoint += `&type=${selectedType}`;
    }

    if (interviewStatus) {
      endpoint += `&interview_status=${interviewStatus}`;
    }

    axios
      .get(endpoint, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((response) => {
        setInterviews(response.data);
      })
      .catch((e) => console.log(e));
  }

  const getPosting = () => {
    axios
      .get(`https://api.mddentalstaffing.com/api/v1/postings/${postingId}`, {
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


  // useEffect(() => {
  //   getInterviews(1, 10);
  // }, []);


  useEffect(() => {
    getPosting();
  }, []);



  const resetFilter = () => {
    setSelectedType('');
    setInterviewStatus('');
    getInterviews(1, 10);
  };


  useEffect(() => {
    getInterviews(1, 10);
  }, []);
  //selectedType, interviewStatus
  return (
    <Layout
      items={[
        {
          name: 'Jobs',
          link: '/',
        },
        {
          name: 'Permanent Jobs',
          link: '/professional/jobs/permanent',
        },
        {
          name: 'Interview',
          link: `/professional/jobs/permanent/${postingId}/interviews`,
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
            Interviews
          </h4>
          <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
            Company Name: {posting?.user?.companies[0]?.name} | {posting?.title}
            , Financial Coordinator | Office Address:{' '}
            {posting?.user_location?.place_name}
          </p>
        </Grid>
      </div>
      <div
        className='d-flex justify-content-between'
        style={{
          backgroundColor: '#F5F5F5',
          padding: '12px 20px',
          borderBottom: '1px solid #D9D9D9',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 20,
            alignItems: 'center',
          }}
        >

          <Button
            variant='outlined'
            style={{
              border: '1px solid #2561B0',
              color: '#595959',
              backgroundColor: '#fff',
            }}
            onClick={() => {
              console.log('Interview Test');
            }}
          >
            Schedule for an Interview
          </Button>


          <Button
            variant='outlined'
            style={{
              border: selectedItem !== null ? '1px solid #2561B0' : '1px solid #D9D9D9',
              color: selectedItem !== null ? '#595959' : '#BFBFBF',
              backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
            }}
            disabled={selectedItem === null}
            onClick={() => setSelectedItem(null)}
          >
            Summary
          </Button>

          <Button
            variant='outlined'
            style={{
              border: selectedItem !== null ? '1px solid #2561B0' : '1px solid #D9D9D9',
              color: selectedItem !== null ? '#595959' : '#BFBFBF',
              backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
            }}
            disabled={selectedItem === null}
            onClick={() => setSelectedItem(null)}
          >
            Cancel
          </Button>
          <Grid
            style={{
              width: '200px',
              height: '40px',
            }}
          >
            {/* <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Type</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Type'
                style={{
                  padding: 0,
                }}
                sx={{
                  '& .MuiSelect-select': {
                    padding: '8px 10px',
                  },
                }}
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <MenuItem
                  value='phone'
                  style={{
                    display: 'block',
                    paddingLeft: '15px',
                    margin: '5px',
                  }}
                >
                  Phone
                </MenuItem>
                <MenuItem
                  value='personal'
                  style={{
                    display: 'block',
                    paddingLeft: '15px',
                    margin: '5px',
                  }}
                >
                  Personal
                </MenuItem>
                <MenuItem
                  value='working'
                  style={{
                    display: 'block',
                    paddingLeft: '15px',
                    margin: '5px',
                  }}
                >
                  Working
                </MenuItem>
              </Select>
            </FormControl> */}
          </Grid>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 20,
          }}
        >
          <Button
            style={{
              border: '1px solid #2561B0',
              color: '#595959',
              backgroundColor: '#2561B0',
            }}
            onClick={() => {
              console.log(" cdcdcd", filtersSidebar);
              setFiltersSidebar(true);
            }}
          >
            <img src={FilterIcon} alt='' />
            <span
              style={{
                marginLeft: 5,
                color: '#fff',
              }}
            >
              Filters
            </span>
          </Button>
          <Button
            style={{
              border: '1px solid #2561B0',
              color: '#595959',
              backgroundColor: '#fff',
            }}
            onClick={() => {
              setSelectedItem(null);
              setSelectedType('');
              getInterviews(1, 10);
            }}
          >
            <img src={RefreshIcon} alt='' />
            <span
              style={{
                marginLeft: 5,
                color: '#2561B0',
              }}
            >
              Reset Filters
            </span>
          </Button>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <div
          style={{
            border: '1px solid #D9D9D9',
            borderRadius: '10px',
            width: '100%',
            backgroundColor: '#fff',
          }}
        >
          {interviews && interviews.data && (
            <InterviewsDataGrid
              columns={columns}
              rows={interviews.data}
              paging={interviews.paging}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              fetchData={getInterviews}
              posting={posting}
            />
          )}
        </div>
      </div>

      {filtersSidebar && (
        <FiltersSidebar
          handleClose={() => setFiltersSidebar(false)}
          open={filtersSidebar}
          setSelectedType={setSelectedType}
          selectedType={selectedType}
          setInterviewStatus={setInterviewStatus}
          interviewStatus={interviewStatus}
          resetFilter={resetFilter}
          filterInterviews={() => {
            filterInterviews(1, 10)
            setFiltersSidebar(false);
          }}
        />
      )}

    </Layout>
  );
};

export default JobInterviewsGrid;
