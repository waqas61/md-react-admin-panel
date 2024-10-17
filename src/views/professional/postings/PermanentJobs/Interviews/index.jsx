import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';

import SubCard from '../../../../../ui-component/cards/SubCard';
import MainCard from '../../../../../ui-component/cards/MainCard';
import PanelCard from '../../../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../../../ui-component/cards/CardSecondaryAction';


import FilterIcon from '../../../../../assets/icons/filter.svg';
import RefreshIcon from '../../../../../assets/icons/arrow-clockwise.svg';

import InterviewsDataGrid from './InterviewsDataGrid';
import FiltersSidebar from './FiltersSidebar';

import { gridSpacing } from '../../../../../store/constant';
import { selectUser } from '../../../../../store/slices/userSlice';


const PermanentJobInterviewsProfessional = () => {

  const [selectedItem, setSelectedItem] = useState(null);
  const [interviews, setInterviews] = useState({});
  const [posting, setPosting] = useState({});
  const [selectedType, setSelectedType] = useState('');
  const [interviewStatus, setInterviewStatus] = useState('');
  const [filtersSidebar, setFiltersSidebar] = useState(false);
  const [isProposal, setIsProposal] = useState(false);
  const postingId = window.location.pathname.split('/')[4];
  const navigate = useNavigate();
  const getInterviews = (page, limit) => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/interviews?posting_id=${postingId}&page=${page}&limit=${limit}`;

    // if (selectedType) {
    //   endpoint += `&type=${selectedType}`;
    // }

    // if (interviewStatus) {
    //   endpoint += `&interview_status=${interviewStatus}`;
    // }

    axios.get(endpoint, {
      headers: {
        method: 'GET',
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then((response) => {
      setInterviews(response.data);
      if (response.data.data[0].proposal.length > 0) {
        setIsProposal(response.data.data[0].proposal.length);
      }
    }).catch((e) => console.log(e));
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


  useEffect(() => {
    getPosting();
  }, []);

  useEffect(() => {
    console.log('Test best  ==== > ', isProposal, isProposal);
  }, [isProposal]);

  const columns = [
    { field: 'applicant', headerName: 'Interview Type', width: 150 },
    { field: 'user_location_id', headerName: 'Status', width: 150 },
    { field: 'posting_status', headerName: 'Start Time', width: 150 },
    { field: 'start_date', headerName: 'End Time', width: 150 },
    { field: 'end_date', headerName: 'Selected Date', width: 150 },
    { field: 'applicants_count', headerName: 'Address', width: 150 },
    { field: 'action', headerName: 'Action', width: 200 },
  ];

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
    <>
      <MainCard
        title="Interviews"
        darkTitle={
          <>
            <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
              Company Name: {posting?.user?.companies[0]?.name} | {posting?.title}
              , Financial Coordinator | Office Address:{' '}
              {posting?.user_location?.place_name}
            </p>
          </>
        }
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
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
                    border: isProposal > 0 ? '1px solid #2561B0' : '1px solid #D9D9D9',
                    color: isProposal > 0 ? '#595959' : '#BFBFBF',
                    backgroundColor: isProposal > 0 ? '#fff' : '#F5F5F5',
                    textTransform: 'capitalize',
                    borderRadius: '3px',
                    padding: '6px 15px',
                  }}
                  onClick={() => {
                    navigate(`/professional/jobs/permanent/proposal/post/${postingId}`);
                  }}
                >
                  Proposal {isProposal > 0 ? '(' + isProposal + ')' : ''}
                </Button>

                <Button
                  variant='outlined'
                  style={{
                    border:
                      selectedItem !== null
                        ? '1px solid #2561B0'
                        : '1px solid #D9D9D9',
                    color: selectedItem !== null ? '#595959' : '#BFBFBF',
                    backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                    textTransform: 'capitalize',
                    borderRadius: '3px',
                    padding: '6px 15px',
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
                    textTransform: 'capitalize',
                    borderRadius: '3px',
                    padding: '3px 15px',
                  }}
                  onClick={() => {
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
                    textTransform: 'capitalize',
                    borderRadius: '3px',
                    padding: '3px 15px',
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
            {interviews && interviews.data && (
              <InterviewsDataGrid
                columns={columns}
                rows={interviews.data}
                paging={interviews.paging}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                fetchData={() => {
                  getInterviews(1, 10);
                }}
                posting={posting}
              />
            )}

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

          </Grid>
        </Grid>
      </MainCard >
    </>
  );

};

export default PermanentJobInterviewsProfessional;
