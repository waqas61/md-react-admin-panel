import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

import { useTheme } from '@mui/material';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import CalendarIcon from '../../../assets/icons/calendar2.svg';
import FilterIcon from '../../../assets/icons/filter.svg';
import RefreshIcon from '../../../assets/icons/arrow-clockwise.svg';
import { IconReload } from '@tabler/icons-react';
import { IconFilter } from '@tabler/icons-react';
import { IconCalendarEvent } from '@tabler/icons-react';


// project imports
import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import PanelCard from '../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../ui-component/cards/CardSecondaryAction';
import CustomDataGrid from '../../../ui-component/CustomDataGrid';
import CustomDaysFilled from '../../../ui-component/CustomDaysFilled';
import ApplicantsAlertPopup from '../../../ui-component/ApplicantsAlertPopup';
import SuccessModal from '../../../ui-component/SuccessModal';


import DeletePostingModal from './DeletePostingModal';
import FiltersSidebar from './FiltersSidebar';
import ApplicantsSidebar from './ApplicantsSidebar';
import CancelPostingModal from './CancelPostingModal';


import { capitalizeFirstLetter } from '../../../utils/helper';
import { getStatusStyle } from '../../../utils/CustomDataGridStyle';


//Store
import { gridSpacing } from '../../../store/constant';





const CusButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const TemporaryJobs = () => {
  const location = useLocation();
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);
  const [temporaryJobs, setTemporaryJobs] = useState({});
  const [open, setOpen] = useState(false);
  const [cancelPosting, setCancelPosting] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isFiltersSidebarOpen, setIsFiltersSidebarOpen] = useState(false);
  const [isApplicantsSidebarOpen, setIsApplicantsSidebarOpen] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const { successMessage } = location.state || {};
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const authToken = localStorage.getItem('auth_token');
  const navigate = useNavigate();
  const [actions, setActions] = useState(false);
  const [gridWidth, setGridWidth] = useState();





  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [postingTitle, setPostingTitle] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [postingType, setPostingType] = useState('');


  useEffect(() => {
    const handleResize = () => {
      setGridWidth(window.innerWidth < 800 ? true : false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line
  }, [window.innerWidth]);

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
        `https://api.mddentalstaffing.com/api/v1/owner/postings?posting_type=temporary&page=${page}&limit=${limit}&order_by=created_at&order_type=desc`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setTemporaryJobs(res.data);
      })
      .catch((e) => console.log(e));
  };

  const handleFilterData = (page, limit) => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/owner/postings?posting_type=temporary&page=${page}&limit=${limit}`;

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

    if (endDate) {
      endpoint += `&to=${endDate}`;
    }

    if (postingType) {
      endpoint += `&posting_schedule=${postingType}`;
    }

    axios
      .get(endpoint, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setTemporaryJobs(res.data);
        setIsFiltersSidebarOpen(false);
      })
      .catch((e) => {
        setIsFiltersSidebarOpen(false);
        console.log(e)
      });


  };


  const resetFilter = () => {
    setPostingTitle('');
    setLocationFilter('');
    setStatus('');
    setStartDate('');
    setEndDate('');
    setPostingType('');
    fetchData(1, 10);
  };


  const buttons = [
    {
      type: 'button',
      label: 'Edit',
      onClick: () => {
        if (selectedItem?.applicants_count > 0) {
          setIsOpenPopup(true);
        } else {
          navigate(`/posting/edit/temporary/${selectedItem?.id}`);
        }
        setActions(false);
      },
      disabled: selectedItem?.posting_status === 'cancelled',
      backgroundColor: '#fff',
      borderColor: '#2561B0',
      color: '#595959',
      marginTop: '30px',
    },
    {
      type: 'button',
      label: 'Clone',
      onClick: () => {
        navigate(`/posting/clone/temporary/${selectedItem?.id}`);
        setActions(false);
      },
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
      disabled: selectedItem?.posting_status === 'cancelled',
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
      onClick: () => navigate(`/posting/temporary/${selectedItem.id}`),
      backgroundColor: '#fff',
      borderColor: '#2561B0',
      color: '#595959',
      marginTop: '20px',
    }
  ];


  const columns = [
    { field: 'title', headerName: 'Posting Title', width: 250 },
    { field: 'place_name', headerName: 'Location', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'startDate', headerName: 'Start Date', width: 150 },
    { field: 'endDate', headerName: 'End Date', width: 150 },
    { field: 'applicantsCount', headerName: 'Applicants', width: 150 },
    { field: 'filled_days', headerName: 'Days Filled', width: 150 },
    { field: 'col2', headerName: '', width: 150 },
  ];
  const rows = temporaryJobs?.data?.map((item) => {
    const statusStyle = getStatusStyle(item.current_posting_status);
    return {
      id: item.id,
      title: item.title,
      place_name: item.user_location.place_name,
      status: (
        <span style={statusStyle}>
          {capitalizeFirstLetter(item.current_posting_status)}
        </span>
      ),
      startDate: (
        <div
          aria-describedby={selectedItem && selectedItem.id}
          style={{
            position: 'relative',
            color: '#000000',
          }}
        >
          {moment(item.start_date).format('MM/DD/YYYY')}
        </div>
      ),
      endDate: moment(item.end_date).format('MM/DD/YYYY'),
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
      filled_days: (
        <CustomDaysFilled
          schedulesCount={item.schedules_count}
          selectedCandidateCount={item.selected_candidate_count}
          status={item?.posting_status}
          cancelledCount={item.cancelled_count}
        />
      ),
      col2: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={() => navigate(`/posting/temporary/${item.id}`)}
            style={{ backgroundColor: '#2561B0', border: 0 }}
          >
            Postings
          </Button>
        </div>
      ),
      ...item,
    };
  });

  const OnClick = () => {
    setIsOpenPopup((prev) => {
      return !prev;
    });
  };


  return (
    <>
      <PanelCard
        title="Management of Postings"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>

            <ApplicantsAlertPopup
              type={'temporary'}
              isOpen={isOpenPopup}
              handleOnClick={OnClick}
              id={selectedItem && selectedItem.id}
            />


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
                    onClick={() => navigate('/posting/create/temporary')}
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
                        navigate(`/posting/edit/temporary/${selectedItem?.id}`);
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
                      navigate(`/posting/clone/temporary/${selectedItem?.id}`)
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
                    onClick={() =>
                      navigate(`/posting/temporary/${selectedItem?.id}`)
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


            {temporaryJobs && temporaryJobs.data && (
              <CustomDataGrid
                rows={rows}
                columns={columns}
                paging={temporaryJobs?.paging}
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

            <div style={{ backgroundColor: "red" }}>
              {isApplicantsSidebarOpen && selectedItem && (
                <ApplicantsSidebar
                  isSidebarOpen={isApplicantsSidebarOpen}
                  setIsSidebarOpen={setIsApplicantsSidebarOpen}
                  selectedItem={selectedItem}
                  gridWidth={gridWidth}
                />
              )}
            </div>

            {isFiltersSidebarOpen && (
              <FiltersSidebar
                isSidebarOpen={isFiltersSidebarOpen}
                setIsSidebarOpen={setIsFiltersSidebarOpen}
                setTemporaryJobs={setTemporaryJobs}
                gridWidth={gridWidth}
                showMoreFilters={showMoreFilters}
                setShowMoreFilters={setShowMoreFilters}
                postingTitle={postingTitle}
                setPostingTitle={setPostingTitle}
                locationFilter={locationFilter}
                setLocationFilter={setLocationFilter}
                status={status}
                setStatus={setStatus}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                postingType={postingType}
                setPostingType={setPostingType}
                resetFilter={resetFilter}
                handleFilterData={() => {
                  handleFilterData(1, 10);
                }}
              />
            )}

          </Grid>
        </Grid>
      </PanelCard>
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
  //         name: 'Temporary Job',
  //         link: '/owner/postings/temporary',
  //       },
  //     ]}
  //   >


  //   </Layout>
  // );
};

export default TemporaryJobs;
