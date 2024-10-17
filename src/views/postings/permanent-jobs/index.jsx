import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

import { useTheme } from '@mui/material';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


// project imports
import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import SecondaryAction from '../../../ui-component/cards/CardSecondaryAction';
import CustomDataGrid from '../../../ui-component/CustomDataGrid';


import SuccessModal from '../../../ui-component/SuccessModal';

// import PopoverCustom from '../../../ui-component/Popover';
import ApplicantsAlertPopup from '../../../ui-component/ApplicantsAlertPopup';


import { IconReload } from '@tabler/icons-react';
import { IconFilter } from '@tabler/icons-react';
import { IconCalendarEvent } from '@tabler/icons-react';





import { getStatusStyle } from '../../../utils/CustomDataGridStyle';
import { calculateDateDifference, capitalizeFirstLetter } from '../../../utils/helper';

import DeletePostingModal from './DeletePostingModal';
import ApplicantsSidebar from '../temporary-jobs/ApplicantsSidebar';
import FiltersSidebar from './FilterSidebar';
import CancelPostingModal from './CancelPostingModal';

//Store
import { gridSpacing } from '../../../store/constant';

const CusButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const PermanentJobs = () => {
  const theme = useTheme();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [permanentJobs, setPermanentJobs] = useState({});
  const [open, setOpen] = useState(false);
  const [isApplicantsSidebarOpen, setIsApplicantsSidebarOpen] = useState(false);
  const [isFiltersSidebarOpen, setIsFiltersSidebarOpen] = useState(false);
  const [cancelPosting, setCancelPosting] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [actions, setActions] = useState(false);
  const [gridWidth, setGridWidth] = useState();
  const [postingTitle, setPostingTitle] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');


  // useEffect(() => {
  //   const handleResize = () => {
  //     setGridWidth(window.innerWidth < 800 ? true : false);
  //   };
  //   handleResize();
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  //   // eslint-disable-next-line
  // }, [window.innerWidth]);


  const OnClick = () => {
    setIsOpenPopup((prev) => {
      return !prev;
    });
  };

  const { successMessage } = location.state || {};
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const authToken = localStorage.getItem('auth_token');
  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage) {
      setOpenSuccessModal(true);
    }
  }, [successMessage]);

  useEffect(() => {
    fetchData(1, 10);
  }, []);

  const fetchData = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/postings?posting_type=permanent&page=${page}&limit=${limit}&order_by=created_at&order_type=desc`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setPermanentJobs(res.data);
      })
      .catch((e) => console.log(e));
  };

  const resetFilter = () => {
    setPostingTitle('');
    setLocationFilter('');
    setStatus('');
    setStartDate('');
    fetchData(1, 10);
  };

  const handleFilterData = (page, limit) => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/owner/postings?posting_type=permanent&page=${page}&limit=${limit}&order_by=created_at&order_type=desc`;

    if (postingTitle) {
      endpoint += `&title=${postingTitle}`;
    }

    if (locationFilter) {
      endpoint += `&location=${locationFilter}`;
    }

    if (status) {
      endpoint += `&posting_status=${status}`;
    }

    if (startDate) {
      endpoint += `&from=${startDate}`;
    }

    axios
      .get(endpoint, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setPermanentJobs(res.data);
        setIsFiltersSidebarOpen(false);
      })
      .catch((e) => {
        console.log(e);
        setIsFiltersSidebarOpen(false);
      });


  };

  const rows = permanentJobs?.data?.map((item) => {
    const statusStyle = getStatusStyle(item.current_posting_status);
    const statusStyleApplicant = getStatusStyle('phone');
    return {
      id: item.id,
      title: item.title,
      place_name: item.user_location.place_name,
      status: (
        <span style={statusStyle}>
          {capitalizeFirstLetter(item.current_posting_status)}
        </span>
      ),
      startDate:
        calculateDateDifference(item.start_date) < 1 ? (
          <></>
          // <PopoverCustom
          //   date={moment(item.start_date).format('MM/DD/YYYY')}
          //   type={'permanent'}
          //   id={item.id}
          // />
        ) : (
          moment(item.start_date).format('MM/DD/YYYY')
        ),
      applicantsCount:
        item.applicants_count > 0 ? (
          <Button onClick={() => setIsApplicantsSidebarOpen(true)} >
            {item.applicants_count}
          </Button>
        ) : (
          <Button >
            {item.applicants_count}
          </Button>
        ),
      posted_date: moment(item.created_at).format('MM/DD/YYYY'),
      calendar:
        item.applicants_count > 0 ? (
          <svg
            width='16'
            height='24'
            viewBox='0 0 16 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M12.6667 18.6666C13.4 18.6666 14 18.0666 14 17.3333V7.99992C14 7.26659 13.4 6.66659 12.6667 6.66659H12V5.33325H10.6667V6.66659H5.33333V5.33325H4V6.66659H3.33333C2.59333 6.66659 2.00667 7.26659 2.00667 7.99992L2 17.3333C2 18.0666 2.59333 18.6666 3.33333 18.6666H12.6667ZM6 11.3333H4.66667V12.6666H6V11.3333ZM3.33333 9.33325H12.6667V7.99992H3.33333V9.33325ZM12.6667 10.6666V17.3333H3.33333V10.6666H12.6667ZM10 12.6666H11.3333V11.3333H10V12.6666ZM8.66667 12.6666H7.33333V11.3333H8.66667V12.6666Z'
              fill='#2561B0'
            />
          </svg>
        ) : (
          <p></p>
        ),
      ...item,
    };
  });

  const buttons = [
    {
      type: 'button',
      label: 'Edit',
      onClick: () => {
        if (selectedItem.applicants_count > 0) {
          setIsOpenPopup(true);
        } else
          navigate(`/owner/postings/edit/permanent/${selectedItem.id}`);
        setActions(false);
      },
      disabled: selectedItem === null ||
        selectedItem?.posting_status === 'cancelled',
      backgroundColor: '#fff',
      borderColor: '#2561B0',
      color: '#595959',
      marginTop: '30px',
    },
    {
      type: 'button',
      label: 'Clone',
      onClick: () => {
        navigate(`/owner/postings/clone/permanent/${selectedItem.id}`)
        setActions(false);
      },
      disabled: selectedItem === null,
      backgroundColor: '#fff',
      borderColor: '#2561B0',
      color: '#595959',
      marginTop: '20px',
    },
    {
      type: 'button',
      label: 'Delete',
      onClick: () => {
        setOpen(true);
        setActions(false);
      },
      disabled: selectedItem === null,
      backgroundColor: '#fff',
      borderColor: '#FA5A16',
      color: '#FA5A16',
      marginTop: '20px',
    },
    {
      type: 'button',
      label: 'Cancel',
      onClick: () => {
        setCancelPosting(true);
        setActions(false);
      },
      disabled: selectedItem == null ||
        selectedItem?.posting_status === 'cancelled',
      backgroundColor: '#fff',
      borderColor: '#FA5A16',
      color: '#FA5A16',
      marginTop: '20px',
    },
    {
      type: 'hr',
      marginTop: '20px',
      color: '#2561B0', // Customize hr color
    },
    {
      type: 'button',
      label: 'View Applicants',
      onClick: () => {
        setIsApplicantsSidebarOpen(true);
        setActions(false);
      },
      disabled: selectedItem?.applicants_count === 0,
      backgroundColor: '#fff',
      borderColor: '#2561B0',
      color: '#595959',
      marginTop: '0px',
    },
    {
      type: 'button',
      label: 'View Postings',
      onClick: () => navigate(`/owner/postings/permanent/applicants/${selectedItem.id}`),
      backgroundColor: '#fff',
      borderColor: '#2561B0',
      color: '#595959',
      marginTop: '20px',
    }
  ];

  const columns = [
    { field: 'title', headerName: 'Posting Title', width: 150 },
    { field: 'place_name', headerName: 'Location', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'startDate', headerName: 'Start Date', width: 150 },
    { field: 'applicantsCount', headerName: 'Applicants', width: 150 },
    { field: 'posted_date', headerName: 'Posted Date', width: 150 },
    { field: 'calendar', headerName: '', width: 50 },
  ];



  return (
    <>
      <MainCard
        title="Manage Postings"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>





            <Box sx={{ flexGrow: 1, backgroundColor: '#F5F5F5', }}>
              <Grid container spacing={1}>

                <Grid item xs={8} >

                  <CusButton
                    variant='outlined'
                    style={{
                      border: '1px solid #2561B0',
                      color: '#595959',
                      backgroundColor: '#fff',
                    }}
                    onClick={() => navigate('/posting/create/permanent')}
                  >
                    Create
                  </CusButton>
                  <CusButton
                    variant='outlined'
                    style={{
                      border:
                        selectedItem !== null
                          ? '1px solid #2561B0'
                          : '1px solid #D9D9D9',
                      color: selectedItem !== null ? '#595959' : '#BFBFBF',
                      backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                      display: `${gridWidth ? 'none' : ''}`
                    }}
                    disabled={
                      selectedItem === null ||
                      selectedItem?.posting_status === 'cancelled'
                    }
                    onClick={() => {
                      if (selectedItem.applicants_count > 0) {
                        setIsOpenPopup(true);
                      } else
                        navigate(`/posting/edit/permanent/${selectedItem.id}`);
                    }}
                  >
                    Edit
                  </CusButton>
                  <CusButton
                    variant='outlined'
                    style={{
                      border:
                        selectedItem != null
                          ? '1px solid #2561B0'
                          : '1px solid #D9D9D9',
                      color: selectedItem != null ? '#595959' : '#BFBFBF',
                      backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                      display: `${gridWidth ? 'none' : ''}`
                    }}
                    disabled={selectedItem == null}
                    onClick={() =>
                      // navigate(`/owner/postings/clone/permanent/${selectedItem.id}`)
                      navigate(`/posting/clone/permanent/${selectedItem.id}`)
                    }
                  >
                    Clone
                  </CusButton>
                  <CusButton
                    variant='outlined'
                    style={{
                      border:
                        selectedItem != null
                          ? '1px solid #FA5A16'
                          : '1px solid #D9D9D9',
                      color: selectedItem != null ? '#FA5A16' : '#BFBFBF',
                      backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                      display: `${gridWidth ? 'none' : ''}`
                    }}
                    disabled={selectedItem == null}
                    onClick={handleOpen}
                  >
                    Delete
                  </CusButton>
                  <CusButton
                    variant='outlined'
                    style={{
                      border:
                        selectedItem != null
                          ? '1px solid #FA5A16'
                          : '1px solid #D9D9D9',
                      color: selectedItem != null ? '#FA5A16' : '#BFBFBF',
                      backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                      display: `${gridWidth ? 'none' : ''}`
                    }}
                    disabled={
                      selectedItem == null ||
                      selectedItem?.posting_status === 'cancelled'
                    }
                    onClick={() => setCancelPosting(true)}
                  >
                    Cancel
                  </CusButton>
                  <CusButton
                    // href={`/owner/postings/permanent/applicants/${selectedItem?.id}`}
                    onClick={() => {
                      navigate(`/posting/permanent/applicants/${selectedItem?.id}`);
                    }}
                    variant='outlined'
                    style={{
                      border:
                        selectedItem != null
                          ? '1px solid #2561B0'
                          : '1px solid #D9D9D9',
                      color: selectedItem != null ? '#595959' : '#BFBFBF',
                      backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                      display: `${gridWidth ? 'none' : ''}`
                    }}
                    disabled={
                      selectedItem == null || selectedItem.applicants_count === 0
                    }
                  >
                    View Applicants
                  </CusButton>

                </Grid>

                <Grid item xs={4}>

                  <CusButton
                    style={{
                      border: '1px solid #2561B0',
                      color: theme.palette.background.paper,
                      backgroundColor: theme.palette.background.defaultSideBar,
                    }}
                    onClick={() => navigate('/posting/calendar')}
                  >
                    <IconCalendarEvent stroke={1} />
                  </CusButton>

                  <CusButton
                    style={{
                      border: '1px solid #2561B0',
                      color: theme.palette.background.paper,
                      backgroundColor: theme.palette.background.defaultSideBar,
                    }}
                    onClick={() => setIsFiltersSidebarOpen(true)}
                  >
                    <IconFilter stroke={1} />
                  </CusButton>

                  <CusButton
                    style={{
                      border: '1px solid #2561B0',
                      color: theme.palette.background.defaultSideBar,
                      backgroundColor: '#fff',
                    }}
                    onClick={() => fetchData(1, 10)}
                  >
                    <IconReload stroke={1} />
                  </CusButton>

                </Grid>

              </Grid>
            </Box>








            {rows && permanentJobs && permanentJobs.data && (
              <CustomDataGrid
                rows={rows}
                columns={columns}
                paging={permanentJobs?.paging}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                setIsApplicantsSidebarOpen={setIsApplicantsSidebarOpen}
                fetchData={fetchData}
                actions={actions}
                setActions={setActions}
                buttons={buttons}
              />
            )}

            {openSuccessModal && (
              <SuccessModal
                open={openSuccessModal}
                handleClose={() => setOpenSuccessModal(false)}
                successMessage={successMessage}
              />
            )}

            {open && (
              <DeletePostingModal
                open={open}
                handleClose={handleClose}
                selectedItem={selectedItem}
                fetchData={fetchData}
                gridWidth={gridWidth}
              />
            )}

            {cancelPosting && selectedItem && (
              <CancelPostingModal
                open={cancelPosting}
                handleClose={() => setCancelPosting(false)}
                selectedItem={selectedItem}
                fetchData={fetchData}
                gridWidth={gridWidth}
              />
            )}

            {isApplicantsSidebarOpen && selectedItem && (
              <ApplicantsSidebar
                isSidebarOpen={isApplicantsSidebarOpen}
                setIsSidebarOpen={setIsApplicantsSidebarOpen}
                selectedItem={selectedItem}
                gridWidth={gridWidth}
              />
            )}

            {isFiltersSidebarOpen && (
              <FiltersSidebar
                isSidebarOpen={isFiltersSidebarOpen}
                setIsSidebarOpen={setIsFiltersSidebarOpen}
                setTemporaryJobs={setPermanentJobs}
                gridWidth={gridWidth}
                handleFilterData={() => {
                  handleFilterData(1, 10);
                }}
                resetFilter={resetFilter}
                postingTitle={postingTitle}
                setPostingTitle={setPostingTitle}
                locationFilter={locationFilter}
                setLocationFilter={setLocationFilter}
                status={status}
                setStatus={setStatus}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            )}

          </Grid>
        </Grid>
      </MainCard>
    </>
  );

  // return (
  //   <Layout
  //     items={[
  //       {
  //         name: 'Postings',
  //         link: '/',
  //       },
  //       {
  //         name: 'Permanent Job',
  //         link: '/owner/postings/permanent',
  //       },
  //     ]}
  //   >
  //     {/* <ApplicantsAlertPopup
  //       type={'permanent'}
  //       isOpen={isOpenPopup}
  //       handleOnClick={OnClick}
  //       id={selectedItem && selectedItem.id}
  //     /> */}

  //   </Layout>
  // );
};

export default PermanentJobs;
