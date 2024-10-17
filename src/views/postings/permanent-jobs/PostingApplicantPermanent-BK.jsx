import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Layout from '../../../../components/Layout';
import '../TemporaryJobs/PostingApplicants.css';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import ApplicantsDataGrid from './ApplicantsDataGrid';
import ApplicantsFilterSidebar from './ApplicantsFilterSidebar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import InterviewDetailsModal from './InterviewDetails/InterviewDetailsModal';

const PostingApplicantPermanent = () => {
  const [applicants, setApplicants] = useState(null);
  const [permanentJobs, setPermanentJobs] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [showFilter, setShowFilter] = useState(false);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [selectSpeciality, setSelectSpeciality] = useState([]);

  const [selectRating, setSelectRating] = useState([]);
  const [selectStatus, setSelectStatus] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFiltersSidebarOpen, setIsFiltersSidebarOpen] = useState(false);


  const [showFilteredApplicants, setShowFilteredApplicants] = useState(false);
  const [interviewDetailsOpen, setInterviewDetailsOpen] = useState(false);

  const authToken = localStorage.getItem('auth_token');
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);

  const navigate = useNavigate();

  const fetchApplicants = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/applicants?posting_id=${id}&page=${page}&limit=${limit}`,
        {
          headers: {
            method: 'GET',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setApplicants(res.data);
      })
      .catch((e) => console.log(e));
  };

  const fetchPosting = () => {
    axios
      .get(`https://api.mddentalstaffing.com/api/v1/owner/postings/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setPermanentJobs(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchApplicants(1, 10);
  }, []);

  useEffect(() => {
    fetchPosting();
  }, []);

  useEffect(() => {
    if (
      selectRating.length === 0 &&
      selectSpeciality.length === 0 &&
      selectStatus.length === 0
    ) {
      setShowFilteredApplicants(false);
    }
  }, [selectRating, selectSpeciality, selectStatus]);

  const columns = [
    { field: 'first_name', headerName: 'Applicant', width: 200 },
    { field: 'user_location_id', headerName: 'Specialty', width: 150 },
    { field: 'posting_status', headerName: 'Rate($)', width: 150 },
    { field: 'end_date', headerName: 'Rating', width: 150 },
    { field: 'applicants_count', headerName: 'Status', width: 150 },
    { field: 'applicants_count', headerName: 'Interview', width: 150 },
    { field: 'applicants_count', headerName: '', width: 150 },
  ];

  const handleFilter = () => {
    if (
      selectRating.length === 0 &&
      selectSpeciality.length === 0 &&
      selectStatus.length === 0
    ) {
      setShowFilteredApplicants(false);
      return;
    }

    const filteredApplicants = applicants?.data?.filter((applicant) => {
      if (
        selectRating.length > 0 &&
        selectSpeciality.length > 0 &&
        selectStatus.length > 0
      ) {
        return (
          selectSpeciality.includes(applicant.specialty) &&
          selectRating.includes(applicant.average_score) &&
          selectStatus.includes(applicant.status)
        );
      }
      if (selectRating.length > 0 && selectSpeciality.length > 0) {
        return (
          selectSpeciality.includes(applicant.specialty) &&
          selectRating.includes(applicant.average_score)
        );
      }
      if (selectRating.length > 0 && selectStatus.length > 0) {
        return (
          selectRating.includes(applicant.average_score) &&
          selectStatus.includes(applicant.status)
        );
      }
      if (selectSpeciality.length > 0 && selectStatus.length > 0) {
        return (
          selectSpeciality.includes(applicant.specialty) &&
          selectStatus.includes(applicant.status)
        );
      }
      if (selectRating.length > 0) {
        return selectRating.includes(applicant.average_score);
      }
      if (selectSpeciality.length > 0) {
        return selectSpeciality.includes(applicant.specialty);
      }
      if (selectStatus.length > 0) {
        return selectStatus.includes(applicant.status);
      }
      return false;
    });

    setFilteredApplicants(filteredApplicants);
    setShowFilteredApplicants(true);
  };

  const closeFilterHandler = () => {
    setSelectRating([]);
    setSelectSpeciality([]);
    setSelectStatus([]);
    setShowFilter(false);
  };

  return (
    <Layout
      items={[
        {
          name: 'Postings',
          link: '/',
        },
        {
          name: 'Permanent Job',
          link: '/owner/postings/permanent',
        },
        {
          name: 'Applicants for Specialty',
          link: `/owner/postings/permanent/applicants/${id}`,
        },
      ]}
    >
      {/* <div
        style={{
          opacity: isFiltersSidebarOpen ? 1 : 0,
          display: isFiltersSidebarOpen ? 'block' : 'none',
          transition: 'all 0.25s ease',
          zIndex: 151,
        }}
      >
        <ApplicantsFilterSidebar
          handleFilter={handleFilter}
          closeFilter={closeFilterHandler}
          isSidebarOpen={isFiltersSidebarOpen}
          setIsSidebarOpen={setIsFiltersSidebarOpen}
          selectRating={selectRating}
          setSelectRating={setSelectRating}
          selectSpeciality={selectSpeciality}
          setSelectSpeciality={setSelectSpeciality}
          selectStatus={selectStatus}
          setSelectStatus={setSelectStatus}
        />
      </div> */}



      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: showFilter ? 0.5 : 0,
          backgroundColor: '#000',
          zIndex: 150,
          display: showFilter ? 'block' : 'none',
          transition: 'all 0.25s ease',
        }}
        onClick={() => {
          setShowFilter(false);
        }}
      />
      <Grid
        sx={{
          px: 3,
          pt: 2,
          pb: 1,
          borderBottom: '1px solid #D9D9D9',
          width: 'auto',
        }}
      >
        <div className='postingHeading'>
          <h4>Assignment Applicants</h4>
          <p>{permanentJobs?.data?.title}</p>
        </div>
      </Grid>

      {permanentJobs && (
        <div className='postingSchedule'>
          <div
            className='d-flex'
            style={{
              gap: 60,
            }}
          >
            <div>
              <h6>Start Date</h6>
              <p>
                {moment(permanentJobs?.data?.start_date).format('MM/DD/YYYY')}
              </p>
            </div>
            <div>
              <h6>Location</h6>
              <p>{permanentJobs?.data?.user_location?.place_name}</p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 30,
              alignItems: 'center',
            }}
          >
            <Button
              style={{
                backgroundColor: '#2561B0',
                border: 0,
                borderRadius: 5,
              }}
              onClick={() =>
                navigate(`/owner/postings/permanent/interview-calendar/${id}`)
              }
            >
              <i>
                {' '}
                <DateRangeOutlinedIcon
                  style={{ fontSize: '18px', paddingBottom: '2px' }}
                />{' '}
              </i>
              Interview Calendar
            </Button>
            <Button
              onClick={() => setShowFilter(true)}
              style={{
                backgroundColor: '#2561B0',
                border: 0,
                borderRadius: 5,
              }}
            >
              <i>
                {' '}
                <FilterListOutlinedIcon
                  style={{ fontSize: '18px', paddingBottom: '2px' }}
                />{' '}
              </i>
              Filters
            </Button>
            <Button
              onClick={closeFilterHandler}
              style={{
                backgroundColor: '#fff',
                color: '#595959',
                borderRadius: 5,
                border: '1px solid #2561B0',
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}

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
          }}
        >
          {showFilteredApplicants ? (
            <ApplicantsDataGrid
              columns={columns}
              rows={filteredApplicants}
              paging={applicants.paging}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              fetchApplicants={fetchApplicants}
              postingId={id}
            />
          ) : (
            applicants &&
            applicants.data && (
              <ApplicantsDataGrid
                columns={columns}
                rows={applicants.data}
                paging={applicants.paging}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                fetchApplicants={fetchApplicants}
                postingId={id}
                setInterviewDetailsOpen={setInterviewDetailsOpen}
              />
            )
          )}
        </div>
      </div>

      {interviewDetailsOpen && selectedItem && (
        <InterviewDetailsModal
          fetchData={fetchApplicants}
          handleClose={() => setInterviewDetailsOpen(false)}
          open={interviewDetailsOpen}
          selectedItem={selectedItem}
          key={selectedItem?.id}
          postingId={id}
        />
      )}


      {isFiltersSidebarOpen && (
        <ApplicantsFilterSidebar


          isSidebarOpen={isFiltersSidebarOpen}
          setIsSidebarOpen={setIsFiltersSidebarOpen}

          selectRating={selectRating}
          setSelectRating={setSelectRating}

          selectSpeciality={selectSpeciality}
          setSelectSpeciality={setSelectSpeciality}

          selectStatus={selectStatus}
          setSelectStatus={setSelectStatus}
        />
      )}
    </Layout>
  );
};

export default PostingApplicantPermanent;
