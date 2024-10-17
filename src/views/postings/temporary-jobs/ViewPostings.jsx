import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import moment from 'moment';

import { useTheme } from '@mui/material';
import { Grid, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconCalendarDue } from '@tabler/icons-react';
import { IconReload } from '@tabler/icons-react';
import { IconFilter } from '@tabler/icons-react';
import { IconCalendarEvent } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';


// project imports


import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import SecondaryAction from '../../../ui-component/cards/CardSecondaryAction';
import CustomDataGrid from '../../../ui-component/CustomDataGrid';

import { gridSpacing } from '../../../store/constant';

import { getStatusStyle } from '../../../utils/CustomDataGridStyle';
import { capitalizeFirstLetter } from '../../../utils/helper';
import PostingUpdateModal from './PostingUpdateModal';
import CancelPostingScheduleModal from './CancelPostingScheduleModal';


const CusButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const ViewPostings = () => {
  const navigate = useNavigate();
  const [postingSchedules, setPostingSchedules] = useState({});
  const [posting, setPosting] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const authToken = localStorage.getItem('auth_token');
  const postingId = window.location.href.split('/').pop();

  useEffect(() => {
    fetchData(1, 10);
  }, []);

  useEffect(() => {
    fetchPosting();
  }, []);

  const fetchData = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/postings/schedules?posting_id=${postingId}&page=${page}&limit=${limit}`,
        {
          headers: {
            method: 'GET',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setPostingSchedules(res.data);
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
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setPosting(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  const convertToAMPM = (time) => {
    const [hour, minutes] = time.split(':');
    let period = 'AM';
    let hour12 = parseInt(hour, 10);
    if (hour12 >= 12) {
      hour12 = hour12 === 12 ? hour12 : hour12 - 12;
      period = 'PM';
    }
    if (hour12 === 0) {
      hour12 = 12;
    }

    return {
      hour: hour12,
      minutes,
      period,
    };
  };

  const columns = [
    { field: 'scheduleDate', headerName: 'Date', width: 150 },
    {
      field: 'start_time1',
      headerName: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          Start Time
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 5,
              color: '#2561B0',
            }}
          >
            {posting?.time_zone?.zone_name}
          </span>
        </div>
      ),
      width: 150,
    },
    {
      field: 'end_time1',
      headerName: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          End Time
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 5,
              color: '#2561B0',
            }}
          >
            {posting?.time_zone?.zone_name}
          </span>
        </div>
      ),
      width: 150,
    },
    { field: 'applicants', headerName: 'Applicants', width: 150 },
  ];

  const rows = postingSchedules?.data?.map((item) => {
    const statusStyle = getStatusStyle(item.schedule_status);
    return {
      id: item.id,
      schedule_day: item.schedule_day,
      scheduleDate: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: '#595959',
            }}
          >
            {item.schedule_day?.toUpperCase()}
          </span>
          <span
            style={{
              fontSize: 20,
              color: '#262626',
              fontWeight: '500',
            }}
          >
            {moment(item.schedule_date).format('MM-DD-YYYY')}
          </span>
        </div>
      ),
      // start_time: item.start_time,
      start_time: moment(item.start_time).format("hh:mm:ss a"),
      start_time1: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 5,
              border: '1px solid #D9D9D9',
              borderRadius: 6,
              padding: '2px 10px',
            }}
          >
            {/* <span>{convertToAMPM(item.start_time)?.hour} xxx {moment(item.start_time).format("hh")}</span> */}
            <span> {moment(item.start_time).format("hh")}</span>
            <span>:</span>
            {/* <span>{convertToAMPM(item.start_time)?.minutes}</span> */}
            <span> {moment(item.start_time).format("mm")}</span>
          </div>
          <div
            style={{
              backgroundColor: '#262626',
              color: '#fff',
              borderRadius: 6,
              padding: '2px 5px',
            }}
          >
            {/* {convertToAMPM(item?.start_time)?.period} */}
            {moment(item.start_time).format("A")}
          </div>
        </div>
      ),
      end_time: item.end_time,
      end_time1: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 5,
              border: '1px solid #D9D9D9',
              borderRadius: 6,
              padding: '2px 10px',
            }}
          >
            {/* <span>{convertToAMPM(item.end_time)?.hour}</span> */}
            <span> {moment(item.end_time).format("hh")}</span>
            <span>:</span>
            {/* <span>{convertToAMPM(item.end_time)?.minutes}</span> */}
            <span> {moment(item.end_time).format("mm")}</span>
          </div>
          <div
            style={{
              backgroundColor: '#262626',
              color: '#fff',
              borderRadius: 6,
              padding: '2px 5px',
            }}
          >
            {/* {convertToAMPM(item.end_time)?.period} */}
            {moment(item.end_time).format("A")}
          </div>
        </div>
      ),
      applicants: (
        <div
          className='d-flex'
          style={{
            alignItems: 'center',
            gap: 10,
          }}
        >

          {/* <a
            href={`/owner/postings/temporary/${item.posting_id}/applicants/${item.id}`}
            className='d-flex'
            style={{
              textDecoration: 'none',
            }}
          >
          </a> */}

          <Button
            size="small"
            onClick={() => {
              navigate(
                `/posting/temporary/${item.posting_id}/applicants/${item.id}`
              );
            }}
          >
            {item.applicants_count === 0 ? (
              <span
                style={{
                  fontSize: 14,
                  color: '#262626',
                }}
              >
                Search in Progress
              </span>
            ) : (
              item.posting_applicants.slice(0, 5).map((applicant, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={`https://api.mddentalstaffing.com/api/v1/assets/${applicant.user.avatar}`}
                    alt=''
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      position: 'relative',
                      zIndex: index,
                    }}
                  />
                  {item.applicants_count === 1 ? (
                    <span
                      style={{
                        fontSize: 14,
                        color: '#262626',
                      }}
                    >
                      {applicant.user.first_name} {applicant.user.last_name}
                    </span>
                  ) : null}
                </div>
              ))
            )}
          </Button>


          <div>
            {item.applicants_count > 5 ? (
              <span
                style={{
                  fontSize: 14,
                  color: '#262626',
                }}
              >
                +{item.applicants_count - 5}
              </span>
            ) : null}
          </div>
        </div>
      ),
      status: (
        <span style={statusStyle}>
          {capitalizeFirstLetter(item.schedule_status)}
        </span>
      ),
      col1: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            padding: 17,
          }}
        >
          <div>
            {item.schedule_status === 'cancelled' ? (
              <p
                style={{
                  color: '#FA5A16',
                }}
              >
                Cancellation Fee(s)
              </p>
            ) : item.schedule_status === 'applied' ||
              item.schedule_status === 'updated' ? (
              <Button
                onClick={() => navigate(`/owner/postings/temporary/${item.id}`)}
                style={{ backgroundColor: '#2561B0', border: 0 }}
              >
                View
              </Button>
            ) : item.schedule_status === 'approved' ? (
              <div
                className='d-flex'
                style={{
                  gap: 10,
                }}
              >
                <Button
                  onClick={() =>
                    navigate(`/owner/postings/temporary/${item.id}`)
                  }
                  style={{ backgroundColor: '#2561B0', border: 0 }}
                >
                  No Show
                </Button>
                <Button
                  onClick={() =>
                    navigate(`/owner/postings/temporary/${item.id}`)
                  }
                  style={{ backgroundColor: '#4CAF50', border: 0 }}
                >
                  Check In
                </Button>
              </div>
            ) : (
              <div
                style={{
                  padding: 18,
                }}
              ></div>
            )}
          </div>
        </div>
      ),
      ...item,
    };
  });

  return (
    <>

      <MainCard
        title="View Postings"
        secondary={
          <SecondaryAction
            icon={<IconX />}
            title="cancel"
            link="/posting/temporary"
          />
        }
        avatar={
          <>
            {posting?.title}: {moment(posting?.stat_date).format('MM-DD-YYYY')} -
            {moment(posting?.end_date).format('MM-DD-YYYY')}
          </>
        }
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>

            <Box sx={{ flexGrow: 1, backgroundColor: '#F5F5F5', }}>
              <Grid container spacing={1} >

                <Grid item xs={8} >

                  <CusButton
                    variant='outlined'
                    style={{
                      border:
                        selectedItem !== null ? '1px solid #FA5A16' : '1px solid #D9D9D9',
                      color: selectedItem !== null ? '#FA5A16' : '#BFBFBF',
                      backgroundColor: selectedItem !== null ? '#fff' : '#F5F5F5',
                    }}
                    disabled={
                      selectedItem === null ||
                      selectedItem?.schedule_status === 'cancelled'
                    }
                    onClick={() => setCancelModalOpen(true)}
                  >
                    Cancel
                  </CusButton>

                  <CusButton
                    variant='outlined'
                    style={{
                      border:
                        selectedItem !== null ? '1px solid #2561B0' : '1px solid #D9D9D9',
                      color: selectedItem !== null ? '#595959' : '#BFBFBF',
                      backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                    }}
                    disabled={
                      selectedItem === null ||
                      selectedItem?.schedule_status === 'cancelled'
                    }
                    onClick={() => setShowUpdateModal(true)}
                  >
                    Update
                  </CusButton>

                </Grid>

              </Grid>
            </Box>











            {rows && postingSchedules && postingSchedules.data && (
              <CustomDataGrid
                rows={rows}
                columns={columns}
                paging={postingSchedules?.paging}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                fetchData={fetchData}
              />
            )}
            {showUpdateModal && selectedItem && (
              <PostingUpdateModal
                open={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                selectedItem={selectedItem}
                fetchData={fetchData}
                posting={posting}
              />
            )}
            {cancelModalOpen && selectedItem && (
              <CancelPostingScheduleModal
                open={cancelModalOpen}
                handleClose={() => setCancelModalOpen(false)}
                selectedItem={selectedItem}
                fetchData={fetchData}
              />
            )}

          </Grid>
        </Grid>
      </MainCard>
    </>
  );


};

export default ViewPostings;
