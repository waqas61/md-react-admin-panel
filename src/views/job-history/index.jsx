import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from '@mui/material';
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

import { styled } from '@mui/material/styles';


import FilterIcon from '../../assets/icons/filter.svg';
import RefreshIcon from '../../assets/icons/arrow-clockwise.svg';

import { IconCalendarDue } from '@tabler/icons-react';
import { IconReload } from '@tabler/icons-react';
import { IconFilter } from '@tabler/icons-react';
import { IconCalendarEvent } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';

import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';
import CustomDataGrid from '../../ui-component/CustomDataGrid';
import { capitalizeFirstLetter } from '../../utils/helper';
import { getStatusStyle } from '../../utils/CustomDataGridStyle';
import FiltersSidebar from './FiltersSidebar';

//Store
import { gridSpacing } from '../../store/constant';

const CusButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

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



const OwnerJobHistory = () => {

  const theme = useTheme();
  const authToken = localStorage.getItem("auth_token");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filtersSidebar, setFiltersSidebar] = useState(false);
  const [isFiltersSidebarOpen, setIsFiltersSidebarOpen] = useState(false);
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
  const [gridWidth, setGridWidth] = useState();

  useEffect(() => {
    fetchJobs(1, 10);
  }, []);

  const fetchJobs = (page, limit) => {
    axios.get(`https://api.mddentalstaffing.com/api/v1/owner/job/history?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
    ).then((res) => {
      setJobs(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  const columns = [
    { field: 'date', headerName: 'Date', width: 250 },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'posting', headerName: 'Title', width: 250 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  const rows = jobs?.data?.map((item) => {
    const statusStyle = getStatusStyle(item.current_posting_status);
    const jobTypeStyle = getStatusStyle(item.posting_type);
    // const date = moment.utc(item.start_date, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('MM/DD/YY hh:mm A') + (item.end_date != null ? ' - ' + moment.utc(item.end_date, 'YYYYMMDD HH:mm:ss').tz(lo_user_ob.user_time_zone).format('MM/DD/YY hh:mm A') : '');
    const date = moment.utc(item.start_date, 'YYYYMMDD HH:mm:ss').format('MM/DD/YY hh:mm A') + (item.end_date != null ? ' - ' + moment.utc(item.end_date, 'YYYYMMDD HH:mm:ss').format('MM/DD/YY hh:mm A') : '');

    return {
      id: item.id,
      // type: capitalizeFirstLetter(item.posting_type),
      type: (
        <span style={jobTypeStyle}>{capitalizeFirstLetter(item.posting_type)}</span>
      ),
      date: date,
      posting: item.title,
      location: item.user_location.place_name,
      company: item.user.company_name,
      status: (
        <span style={statusStyle}>{capitalizeFirstLetter(item.current_posting_status)}</span>
      ),
    };
  });

  const filterJobs = (page, limit) => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/owner/job/history?page=${page}&limit=${limit}`;

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
        title="All History"
        secondary={
          <SecondaryAction
            icon={<IconX />}
            title="cancel"
            link="/posting/temporary"
          />
        }
      >

        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>



            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1} >
                <Grid item xs={10} >


                </Grid>
                <Grid item xs={2} >

                  <CusButton
                    style={{
                      border: "1px solid #2561B0",
                      backgroundColor: theme.palette.background.defaultSideBar,
                      color: theme.palette.background.paper,
                    }}
                    onClick={() => setFiltersSidebar(true)}
                  >
                    <IconFilter stroke={1} />
                  </CusButton>
                  <CusButton
                    style={{
                      border: "1px solid #2561B0",
                      color: theme.palette.background.defaultSideBar,
                      backgroundColor: theme.palette.background.paper,
                    }}
                    onClick={() => {
                      fetchJobs(1, 10);
                    }}

                  >
                    <IconReload stroke={1} />
                  </CusButton>

                </Grid>
              </Grid>
            </Box>



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
              <FiltersSidebar
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
                gridWidth={gridWidth}
              />
            )}
          </Grid>
        </Grid>
      </MainCard>


      {/* <Layout
        items={[
          {
            name: 'Job History',
            link: '/owner/jobHistory',
          },
        ]}
        basicHeader={{
          title: 'Job History',
          description: 'All History',
        }}
      >


      </Layout> */}
    </>
  );
};

export default OwnerJobHistory;
