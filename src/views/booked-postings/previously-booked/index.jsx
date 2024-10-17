import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material';
import { useNavigate } from "react-router-dom";
import moment from 'moment';

import { Grid, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconCalendarDue } from '@tabler/icons-react';
import { IconReload } from '@tabler/icons-react';
import { IconFilter } from '@tabler/icons-react';
import { IconCalendarEvent } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';

import FilterIcon from '../../../assets/icons/filter.svg';
import RefreshIcon from '../../../assets/icons/arrow-clockwise.svg';


// project imports
import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import SecondaryAction from '../../../ui-component/cards/CardSecondaryAction';
import CustomDataGrid from '../../../ui-component/CustomDataGrid';
import ApplicantPopup from '../../../ui-component/ApplicantPopup';
import StarRating from '../../../ui-component/StarRating';
import BlacklistModal from '../currently-booked/BlacklistModal';
import UnblacklistModal from '../currently-booked/UnblacklistModal';

import { capitalizeFirstLetter } from "../../../utils/helper";
import { getStatusStyle } from "../../../utils/CustomDataGridStyle";

import FiltersSidebarPreviouslyBooked from './FiltersSidebarPreviouslyBooked';

//Store
import { gridSpacing } from '../../../store/constant';

const CusButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));


const PreviouslyBooked = () => {

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [gridWidth, setGridWidth] = useState();
  const handleClick = (event, item) => {
    if (anchorEl !== null) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
      setSelectedItem(item);
      setSelectedApplicantId(item);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };
  const [selectedItem, setSelectedItem] = useState(null);
  const [banned, setBanned] = useState(null);
  const [filtersSidebar, setFiltersSidebar] = useState(false);
  const [openBlacklistModal, setOpenBlacklistModal] = useState(false);
  const [openUnblacklistModal, setOpenUnblacklistModal] = useState(false);
  const [previouslyBooked, setPreviouslyBooked] = useState({});
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isApplicantDataOpen, setIsApplicantDataOpen] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [selectRating, setSelectRating] = useState([]);
  const [professional, setProfessional] = useState('');
  const [date, setDate] = useState('');
  const [posting, setPosting] = useState('');
  const [type, setType] = useState('');

  const handleNameClick = (item) => {
    setSelectedApplicant(item);
    setIsApplicantDataOpen(true);
  };

  const handleApplicantDataClose = () => {
    setSelectedApplicant(null);
    setIsApplicantDataOpen(false);
  };

  const fetchPreviouslyBooked = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/applicants/previously-booked?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((response) => {
        setPreviouslyBooked(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPreviouslyBooked(1, 10);
  }, []);

  const columns = [
    { field: 'professional', headerName: 'Professional', width: 130 },
    { field: 'posting_title', headerName: 'Posting Title', width: 250 },
    { field: 'last_worked_date', headerName: 'Last Worked Date', width: 150 },
    { field: 'blacklisted', headerName: 'Banned', width: 150 },
    { field: 'total_rating', headerName: 'Total Rating', width: 150 },
    // { field: 'actions', headerName: '', width: 50 },
  ];

  const rows = previouslyBooked?.data?.map((item, index) => {
    return {
      id: item.id,
      professional: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <img
            src={`https://api.mddentalstaffing.com/api/v1/assets/${item.user.avatar}`}
            alt=''
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
            }}
          />
          <span
            style={{
              color: '#2561B0',
              fontWeight: 400,
              fontSize: '14px',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => {
              handleNameClick(item.user);
            }}
          >
            {item.user.first_name} {item.user.last_name}
          </span>
        </div>
      ),
      posting_title: item.posting.title,
      last_worked_date: item?.posting_schedule?.schedule_date ? moment(item.posting_schedule.schedule_date).utc().format('MM/DD/YY') : '-',
      blacklisted:
        item.user.is_blocked !== 0 ? (
          <div
            style={{
              backgroundColor: '#FA5A16',
              height: 10,
              width: 10,
              borderRadius: '50%',
            }}
          >
            {/* Banned */}
          </div>
        ) : (
          <>
            {/* <div
              style={{
                backgroundColor: '#FA5A16',
                height: 10,
                width: 10,
                borderRadius: '50%',
              }}
            >Unbanned</div> */}
          </>
        ),
      total_rating: <StarRating rating={item.user.average_score} />,
      // actions: (
      //   <div
      //     style={{
      //       display: 'flex',
      //       gap: 10,
      //       alignItems: 'center',
      //       justifyContent: 'end',
      //     }}
      //     onClick={(event) => handleClick(event, item)}
      //   >
      //     <MoreVertIcon
      //       style={{
      //         color: '#fff',
      //         cursor: 'pointer',
      //         backgroundColor: '#2561B0',
      //         padding: 4,
      //         borderRadius: 4,
      //         fontSize: 31,
      //       }}
      //     />

      //     <Menu
      //       id={index}
      //       anchorEl={anchorEl}
      //       open={open}
      //       onClose={handleClose}
      //       MenuListProps={{
      //         'aria-labelledby': 'basic-button',
      //       }}
      //       style={{
      //         width: 200,
      //       }}
      //     >
      //       <MenuItem
      //         style={{
      //           width: 200,
      //           fontSize: 14,
      //         }}
      //         value={item.posting_id}
      //         onClick={() => {
      //           navigate(
      //             `/owner/booked/currently/${selectedApplicantId.posting_id}/review/${selectedApplicantId.user_id}`
      //           )
      //         }}
      //       >
      //         Review this Candidate
      //       </MenuItem>

      //       {/* {item.user.is_blocked === 0 ? (
      //         <MenuItem
      //           style={{
      //             width: 200,
      //             fontSize: 14,
      //           }}
      //           onClick={() => {
      //             handleClose();
      //             setOpenBlacklistModal(true);
      //             setBanned(selectedItem.user_id);
      //             console.log('item.user_id', item.user_id, selectedItem.user_id);
      //           }}
      //         >
      //           Banned {item.user.is_blocked}
      //         </MenuItem>
      //       ) : (
      //         <MenuItem
      //           style={{
      //             width: 200,
      //             fontSize: 14,
      //           }}
      //           onClick={() => {
      //             handleClose();
      //             setBanned(selectedItem.user_id);
      //             setOpenUnblacklistModal(true);
      //           }}
      //         >
      //           Unbanned
      //         </MenuItem>
      //       )} */}
      //     </Menu>
      //   </div>
      // ),
      ...item,
    };
  });

  const handleFilterData = (page, limit) => {

    let endpoint = `https://api.mddentalstaffing.com/api/v1/owner/applicants/previously-booked?page=${page}&limit=${limit}`;

    if (selectRating) {
      endpoint += `&rating=${selectRating}`;
    }

    if (professional) {
      endpoint += `&professional=${professional}`;
    }

    if (date) {
      endpoint += `&from=${date}`;
    }

    if (posting) {
      endpoint += `&title=${posting}`;
    }

    if (type) {
      endpoint += `&type=${type}`;
    }

    axios
      .get(endpoint, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((response) => {
        setPreviouslyBooked(response.data);
        setFiltersSidebar(false);
      })
      .catch((e) => {
        console.log(e);
        setFiltersSidebar(false);
      });
  };

  const resetFilter = () => {
    setProfessional('');
    setPosting('');
    setDate('');
    setSelectRating([]);
    setType('');
    fetchPreviouslyBooked(1, 10);
  };

  return (

    <>

      <MainCard
        title=" Management of Previously Booked Professionals"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>


            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1} >
                <Grid item xs={10} >

                  <CusButton
                    variant='outlined'
                    style={{
                      border:
                        selectedItem !== null
                          ? '1px solid #2561B0'
                          : '1px solid #D9D9D9',
                      color: selectedItem !== null ? '#595959' : '#BFBFBF',
                      backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                    }}
                    disabled={
                      selectedItem === null ||
                      selectedItem.posting_status === 'cancelled'
                    }
                  >
                    Post / See Review
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
                    }}
                    disabled={
                      selectedItem === null || selectedItem.blacklisted === true
                    }
                  >
                    Hire for Permanent Job
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
                    }}
                    disabled={
                      selectedItem == null || selectedItem.applicants_count === 0
                    }
                  >
                    Book Again
                  </CusButton>
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
                      fetchPreviouslyBooked(1, 10);
                    }}

                  >
                    <IconReload stroke={1} />
                  </CusButton>

                </Grid>
              </Grid>
            </Box>



            {previouslyBooked && previouslyBooked.data && (
              <CustomDataGrid
                columns={columns}
                rows={rows}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                paging={previouslyBooked.paging}
              />
            )}

            {openBlacklistModal && selectedItem && (
              <BlacklistModal
                open={openBlacklistModal}
                handleClose={() => setOpenBlacklistModal(false)}
                fetchData={() => {
                  fetchPreviouslyBooked(1, 10);
                }}
                selectedItem={selectedItem}
                banned={banned}
              />
            )}

            {openUnblacklistModal && selectedItem && (
              <UnblacklistModal
                open={openUnblacklistModal}
                handleClose={() => setOpenUnblacklistModal(false)}
                fetchData={() => {
                  fetchPreviouslyBooked(1, 10);
                }}
                selectedItem={selectedItem}
                unblacklist={true}
                banned={banned}
              />
            )}

            {filtersSidebar && (
              <FiltersSidebarPreviouslyBooked
                handleClose={() => setFiltersSidebar(false)}
                open={filtersSidebar}
                selectRating={selectRating}
                setSelectRating={setSelectRating}
                professional={professional}
                setProfessional={setProfessional}
                date={date}
                setDate={setDate}
                posting={posting}
                setPosting={setPosting}
                type={type}
                setType={setType}
                handleFilterData={() => {
                  handleFilterData(1, 10);
                }}

                resetFilter={resetFilter}
                gridWidth={gridWidth}
              />
            )}

            {selectedApplicant && (
              <ApplicantPopup
                isOpen={isApplicantDataOpen}
                onClose={handleApplicantDataClose}
                selectedApplicant={selectedApplicant}
              />
            )}

          </Grid>
        </Grid>
      </MainCard>

    </>
  );
};

export default PreviouslyBooked;
