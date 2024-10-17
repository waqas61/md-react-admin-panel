import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';

import { FormControl, Grid, InputLabel, MenuItem, Select, Button } from '@mui/material';

import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import PanelCard from '../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../ui-component/cards/CardSecondaryAction';
import CustomDataGrid from '../../../ui-component/CustomDataGrid';

import { capitalizeFirstLetter } from '../../../utils/helper';
import { getStatusStyle } from "../../../utils/CustomDataGridStyle";
import FilterIcon from '../../../assets/icons/filter.svg';
import RefreshIcon from '../../../assets/icons/arrow-clockwise.svg';

import JobHistoryFiltersSidebar from './JobHistoryFiltersSidebar';

import { gridSpacing } from '../../../store/constant';
import { selectUser } from '../../../store/slices/userSlice';

const styles = {
  newStatus: {
    backgroundColor: '#75B0FA',
    border: '1px solid #4A93F0',
    borderRadius: '16px',
    padding: '1px 8px',
  },
  activeStatus: {
    backgroundColor: '#4CAF50',
    border: '1px solid #388E3C',
    borderRadius: '16px',
    padding: '1px 8px',
  },
  cancelledStatus: {
    backgroundColor: '#ff9900',
    border: '1px solid #ff9900',
    borderRadius: '16px',
    padding: '5px 8px',
  },
  completedStatus: {
    backgroundColor: '#388E3C',
    border: '1px solid #388E3C',
    borderRadius: '16px',
    padding: '5px 8px',
  },
  updatedStatus: {
    backgroundColor: '#B6A8FF',
    border: '1px solid #7C67EB',
    borderRadius: '16px',
    padding: '1px 8px',
  },
  appliedStatus: {
    backgroundColor: '#FFC400',
    border: '1px solid #FFC400',
    borderRadius: '16px',
    padding: '1px 8px',
  },
  selectedRow: {
    backgroundColor: '#D7E8FF',
  },
};

// const getStatusStyle = (status) => {
//   switch (status) {
//     case 'new':
//       return styles.newStatus;
//     case 'active':
//     case 'approved':
//       return styles.activeStatus;
//     case 'cancelled':
//       return styles.cancelledStatus;
//     case 'completed':
//       return styles.completedStatus;
//     case 'updated':
//       return styles.updatedStatus;
//     case 'applied':
//       return styles.appliedStatus;
//     default:
//       return status;
//   }
// };

const JobHistory = () => {
  const authToken = localStorage.getItem("auth_token");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filtersSidebar, setFiltersSidebar] = useState(false);
  const [jobs, setJobs] = useState([]);



  const [postingTitle, setPostingTitle] = useState("");
  const [status, setStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [officeName, setOfficeName] = useState('');
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const lo_user = localStorage.getItem('user');
  const lo_user_ob = JSON.parse(lo_user);

  useEffect(() => {
    fetchJobs(1, 10);
  }, []);

  const fetchJobs = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/job/history?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const columns = [
    { field: 'date', headerName: 'Date', width: 250 },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'posting', headerName: 'Title', width: 250 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'company', headerName: 'Company', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  const rows = jobs?.data?.map((item) => {
    const statusStyle = getStatusStyle(item.applicant_status);
    // var date = item.start_date + (item.end_date != null ? ' - ' + item.end_date : '');
    const date = moment.utc(item.start_date, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('MM/DD/YY hh:mm A') + (item.end_date != null ? ' - ' + moment.utc(item.end_date, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('MM/DD/YY hh:mm A') : '');

    return {
      id: item.id,
      type: capitalizeFirstLetter(item.posting_type),
      date: date,
      posting: item.title,
      location: item.user_location.place_name,
      company: item.user.company_name,
      status: (
        <span style={statusStyle}>{capitalizeFirstLetter(item.applicant_status)}</span>
      ),
    };
  });


  const filterJobs = (page, limit) => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/job/history?page=${page}&limit=${limit}`;

    if (postingTitle) {
      endpoint += `&title=${postingTitle}`;
    }

    if (location) {
      endpoint += `&location=${location}`;
    }

    if (filterStatus) {
      endpoint += `&posting_status=${filterStatus}`;
    }

    // if (date) {
    //   endpoint += `&date=${date}`;
    // }

    if (startDate) {
      endpoint += `&from=${startDate}`;
    }

    if (endDate) {
      endpoint += `&to=${endDate}`;
    }


    if (officeName) {
      endpoint += `&officeName=${officeName}`;
    }

    if (type) {
      endpoint += `&posting_type=${type}`;
    }

    axios
      .get(endpoint, {
        headers: {
          method: "GET",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setJobs(res.data);
      })
      .catch((e) => console.log(e));
  }

  const resetFilter = () => {
    setPostingTitle('');
    setFilterStatus('');
    setLocation('');
    setDate(null);
    setStartDate('');
    setEndDate('');
    setOfficeName('');
    setType('');
    setFiltersSidebar(false);
    fetchJobs(1, 10);
  };


  return (
    <>
      <MainCard
        title="Job History"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <div
              className='d-flex justify-content-between align-items-center'
              style={{
                padding: '10px 20px',
                backgroundColor: '#F5F5F5',
                borderBottom: '1px solid #D9D9D9',
              }}
            >
              <FormControl
                variant='outlined'
                size='small'
                style={{
                  width: '300px',
                }}
              >

              </FormControl>

              <div
                className='d-flex'
                style={{
                  gap: 20,
                  alignItems: 'left',
                }}
              >
                <Button
                  style={{
                    border: '1px solid #2561B0',
                    color: '#595959',
                    backgroundColor: '#2561B0',
                  }}
                  onClick={() => setFiltersSidebar(true)}
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
                  onClick={() => fetchJobs(1, 10)}
                >
                  <img src={RefreshIcon} alt='' />
                  <span>
                    <span
                      style={{
                        marginLeft: 5,
                      }}
                    >
                      Reset
                    </span>
                  </span>
                </Button>
              </div>
            </div>

            {jobs && jobs.data && (
              <CustomDataGrid
                rows={rows}
                columns={columns}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                paging={{
                  total: 2,
                  per_page: 10,
                  current_page: 1,
                }}
              />
            )}

            {filtersSidebar && (
              <JobHistoryFiltersSidebar
                handleClose={() => setFiltersSidebar(false)}
                open={filtersSidebar}
                filterJobs={() => {
                  filterJobs(1, 10);
                  setFiltersSidebar(false);
                }}
                postingTitle={postingTitle}
                setPostingTitle={setPostingTitle}
                setLocation={setLocation}
                location={location}
                setDate={setDate}
                date={date}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                setOfficeName={setOfficeName}
                officeName={officeName}
                setType={setType}
                type={type}
                resetFilter={resetFilter}
              />
            )}


          </Grid>
        </Grid>
      </MainCard >
    </>
  );

};

export default JobHistory;
