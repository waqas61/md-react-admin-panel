import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useTheme } from '@mui/material';
import { useNavigate } from "react-router-dom";


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
import Paper from '@mui/material/Paper';

import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterIcon from "../../../assets/icons/filter.svg";
import RefreshIcon from "../../../assets/icons/arrow-clockwise.svg";
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
import ApplicantPopup from '../../../ui-component//ApplicantPopup';
import { capitalizeFirstLetter } from "../../../utils/helper";
import { getStatusStyle } from "../../../utils/CustomDataGridStyle";

import CheckInModal from "./CheckInModal";
import NoShowModal from "./NoShowModal";
import CancelModal from "./CancelModal";
import SendAlertModal from "./SendAlertModal";
import BlacklistModal from "./BlacklistModal";
import UnblacklistModal from "./UnblacklistModal";
import FiltersSidebar from './FilterSidebar';



//Store
import { gridSpacing } from '../../../store/constant';

const CusButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const CurrentlyBooked = () => {
  const theme = useTheme();
  const authToken = localStorage.getItem('auth_token');
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFiltersSidebarOpen, setIsFiltersSidebarOpen] = useState(false);

  const [postingTitle, setPostingTitle] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [isApplicantDataOpen, setIsApplicantDataOpen] = useState(false);
  const [gridWidth, setGridWidth] = useState();
  const resetFilter = () => {
    setPostingTitle('');
    setLocationFilter('');
    setStatus('');
    setStartDate('');
    setEndDate('');
    fetchCurrentlyBooked(1, 10);
  };

  const handleNameClick = (item) => {
    setSelectedApplicant(item);
    setIsApplicantDataOpen(true);
  };

  const handleApplicantDataClose = () => {
    setSelectedApplicant(null);
    setIsApplicantDataOpen(false);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event, item) => {

    if (anchorEl !== null) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
      setSelectedApplicantId(item);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [filtersSidebar, setFiltersSidebar] = useState(false);
  const [openCheckInModal, setOpenCheckInModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openSendAlertModal, setOpenSendAlertModal] = useState(false);
  const [openNoShowModal, setOpenNoShowModal] = useState(false);
  const [openSOSModal, setOpenSOSModal] = useState(false);
  const [openBlacklistModal, setOpenBlacklistModal] = useState(false);
  const [openUnblacklistModal, setOpenUnblacklistModal] = useState(false);
  const [currentlyBooked, setCurrentlyBooked] = useState({});
  const navigate = useNavigate();

  const fetchCurrentlyBooked = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/applicants/currently-booked?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((response) => {
        setCurrentlyBooked(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFilterData = (page, limit) => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/owner/applicants/currently-booked?page=${page}&limit=${limit}`;

    if (postingTitle) {
      endpoint += `&title=${postingTitle}`;
    }

    if (locationFilter) {
      endpoint += `&location=${locationFilter}`;
    }

    if (status) {
      endpoint += `&working_status=${status}`;
    }

    if (startDate) {
      endpoint += `&from=${startDate}`;
    }

    if (endDate) {
      endpoint += `&to=${endDate}`;
    }

    axios
      .get(endpoint, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setCurrentlyBooked(res.data);
        setIsFiltersSidebarOpen(false);
      })
      .catch((e) => {
        console.log(e);
        setIsFiltersSidebarOpen(false);
      });
  };

  // useEffect(() => {
  //   // console.log("Zeest ==== > ", currentlyBooked);
  // }, [currentlyBooked]);

  const columns = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "start_time", headerName: "Start Time", width: 150 },
    { field: "end_time", headerName: "End Time", width: 150 },
    { field: "professional", headerName: "Professional", width: 150 },
    { field: "specialty", headerName: "Specialty", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    // { field: "actions", headerName: "", width: 50 },
  ];

  const rows = currentlyBooked?.data?.map((item) => {

    const user = item.user_id;
    const posting_id = item.posting_id;
    const statusStyle = getStatusStyle(item.working_status);
    return {
      id: item.id,
      date: moment(item.schedule_date).format("MM/DD/YYYY"),
      start_time: item?.posting_schedule ? moment(item.posting_schedule.start_time, "HH:mm:ss").format("hh:mm A") : moment().format("hh:mm A"),
      end_time: item?.posting_schedule ? moment(item.posting_schedule.end_time, "HH:mm:ss").format("hh:mm A") : moment().format("hh:mm A"),
      // end_time: moment(item.posting_schedule.end_time, "HH:mm:ss").format("hh:mm A"),
      professional: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <img
            src={item?.user?.avatar ? `https://api.mddentalstaffing.com/api/v1/assets/${item?.user?.avatar}` : 'https://via.placeholder.com/150'}
            alt=""
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
            }}
          />
          <span
            style={{
              color: "#2561B0",
              fontWeight: 400,
              fontSize: "14px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => {
              handleNameClick(item.user);
            }}
          >
            {item.user.first_name} {item.user.last_name}
          </span>
        </div>
      ),
      specialty: (
        <>
          {item.user.user_sub_categories &&
            item.user.user_sub_categories.map((sub, index) => (
              <span key={sub.sub_category.id}>
                {sub.sub_category.name}
                {index < item.user.user_sub_categories.length - 1 ? ", " : ""}
              </span>
            ))}
        </>
      ),
      status: (
        <span style={statusStyle}>
          {capitalizeFirstLetter(item.working_status)}
        </span>
      ),
      location: item.posting.user_location.place_name ? item.posting.user_location.place_name : "-",
      // actions: (
      //   <div
      //     style={{
      //       display: "flex",
      //       gap: 10,
      //       alignItems: "center",
      //       justifyContent: "end",
      //     }}
      //   >
      //     <MoreVertIcon
      //       style={{
      //         color: "#fff",
      //         cursor: "pointer",
      //         backgroundColor: "#2561B0",
      //         padding: 4,
      //         borderRadius: 4,
      //         fontSize: 31,
      //       }}
      //       onClick={(e) => {
      //         handleClick(e, item);
      //       }}
      //     />

      //     <Menu
      //       id="basic-menu"
      //       anchorEl={anchorEl}
      //       open={open}
      //       onClose={handleClose}
      //       MenuListProps={{
      //         "aria-labelledby": "basic-button",
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
      //           console.log('selectedApplicant === > ', selectedApplicantId);
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
      //           }}
      //         >
      //           Banned
      //         </MenuItem>
      //       ) : (
      //         <MenuItem
      //           style={{
      //             width: 200,
      //             fontSize: 14,
      //           }}
      //           onClick={() => {
      //             handleClose();
      //             setOpenUnblacklistModal(true);
      //           }}
      //         >
      //           Unbanned
      //         </MenuItem>
      //       )} */}
      //     </Menu>
      //   </div >
      // ),
      ...item,
    };
  });

  useEffect(() => {
    fetchCurrentlyBooked(1, 10);
  }, []);


  return (
    <>

      <MainCard
        title="Management of Currently Booked Applicants"
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
                  <CusButton
                    variant="outlined"
                    style={{
                      border:
                        selectedItem !== null
                          ? "1px solid #2561B0"
                          : "1px solid #D9D9D9",
                      color: selectedItem !== null ? "#595959" : "#BFBFBF",
                      backgroundColor: selectedItem != null ? "#fff" : "#F5F5F5",
                    }}
                    disabled={
                      selectedItem === null
                      // ||
                      // selectedItem?.posting?.posting_status === 'cancelled'
                    }
                    onClick={() => setOpenCheckInModal(true)}
                  >
                    Check In
                  </CusButton>
                  <CusButton
                    variant="outlined"
                    style={{
                      border:
                        selectedItem != null
                          ? "1px solid #FA5A16"
                          : "1px solid #D9D9D9",
                      color: selectedItem != null ? "#FA5A16" : "#BFBFBF",
                      backgroundColor: selectedItem != null ? "#fff" : "#F5F5F5",
                    }}
                    // disabled={
                    //   selectedItem == null
                    //   // || selectedItem.posting.posting_status === 'cancelled'
                    // }
                    onClick={() => {
                      setOpenCancelModal(true);
                    }}
                  >
                    Cancel.
                  </CusButton>
                  <CusButton
                    variant="outlined"
                    style={{
                      border:
                        selectedItem !== null
                          ? "1px solid #2561B0"
                          : "1px solid #D9D9D9",
                      color: selectedItem !== null ? "#595959" : "#BFBFBF",
                      backgroundColor: selectedItem != null ? "#fff" : "#F5F5F5",
                    }}
                    disabled={
                      selectedItem === null
                      // ||selectedItem.posting.posting_status === 'cancelled'
                    }
                    onClick={() => setOpenSendAlertModal(true)}
                  >
                    Send Alert
                  </CusButton>
                  <CusButton
                    variant="outlined"
                    style={{
                      border:
                        selectedItem != null
                          ? "1px solid #2561B0"
                          : "1px solid #D9D9D9",
                      color: selectedItem != null ? "#595959" : "#BFBFBF",
                      backgroundColor: selectedItem != null ? "#fff" : "#F5F5F5",
                    }}
                    disabled={
                      selectedItem == null
                      // ||
                      // selectedItem.posting.posting_status === 'cancelled'
                    }
                    onClick={() => setOpenNoShowModal(true)}
                  >
                    No Show
                  </CusButton>
                  <CusButton
                    variant="outlined"
                    style={{
                      border:
                        selectedItem != null
                          ? "1px solid #2561B0"
                          : "1px solid #D9D9D9",
                      color: selectedItem != null ? "#595959" : "#BFBFBF",
                      backgroundColor: selectedItem != null ? "#fff" : "#F5F5F5",
                    }}
                    disabled={
                      selectedItem == null
                      // ||
                      // selectedItem.posting.posting_status === 'cancelled'
                    }
                    onClick={() => setOpenSOSModal(true)}
                  >
                    SOS
                  </CusButton>
                </Grid>
                <Grid item xs={2} >
                  <CusButton
                    style={{
                      border: "1px solid #2561B0",
                      backgroundColor: theme.palette.background.defaultSideBar,
                      color: theme.palette.background.paper,
                    }}
                    onClick={() => setIsFiltersSidebarOpen(true)}
                  >
                    <IconFilter stroke={1} />
                  </CusButton>
                  <CusButton
                    style={{
                      border: "1px solid #2561B0",
                      color: theme.palette.background.defaultSideBar,
                      backgroundColor: theme.palette.background.paper,
                    }}
                    onClick={() => fetchCurrentlyBooked(1, 10)}

                  >
                    <IconReload stroke={1} />
                  </CusButton>
                </Grid>
              </Grid>
            </Box>

            {isFiltersSidebarOpen && (
              <FiltersSidebar
                isSidebarOpen={isFiltersSidebarOpen}
                setIsSidebarOpen={setIsFiltersSidebarOpen}
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
                endDate={endDate}
                setEndDate={setEndDate}
                gridWidth={gridWidth}
              />
            )}

            {currentlyBooked && currentlyBooked.data && (
              <CustomDataGrid
                rows={rows}
                columns={columns}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                paging={currentlyBooked.paging}
              />
            )}

            {openCheckInModal && selectedItem && (
              <CheckInModal
                open={openCheckInModal}
                handleClose={() => setOpenCheckInModal(false)}
                selectedItem={selectedItem}
                fetchData={() => {
                  fetchCurrentlyBooked(1, 10);
                }}
              />
            )}

            {openCancelModal && selectedItem && (
              <CancelModal
                open={openCancelModal}
                handleClose={() => setOpenCancelModal(false)}
                selectedItem={selectedItem}
                fetchData={() => {
                  fetchCurrentlyBooked(1, 10);
                }}
              />
            )}

            {openSendAlertModal && selectedItem && (
              <SendAlertModal
                open={openSendAlertModal}
                handleClose={() => setOpenSendAlertModal(false)}
                selectedItem={selectedItem}
                fetchData={() => {
                  fetchCurrentlyBooked(1, 10);
                }}
              />
            )}

            {openNoShowModal && selectedItem && (
              <NoShowModal
                open={openNoShowModal}
                handleClose={() => setOpenNoShowModal(false)}
                selectedItem={selectedItem}
                fetchData={() => {
                  fetchCurrentlyBooked(1, 10);
                }}
              />
            )}

            {openBlacklistModal && selectedItem && (
              <BlacklistModal
                open={openBlacklistModal}
                handleClose={() => setOpenBlacklistModal(false)}
                selectedItem={selectedItem}
                fetchData={() => {
                  fetchCurrentlyBooked(1, 10);
                }}
              />
            )}

            {openUnblacklistModal && selectedItem && (
              <UnblacklistModal
                open={openUnblacklistModal}
                handleClose={() => setOpenUnblacklistModal(false)}
                selectedItem={selectedItem}
                fetchData={() => {
                  fetchCurrentlyBooked(1, 10);
                }}
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

      {/* <Layout
        items={[{ link: "/owner/booked/currently", name: "Booked Postings" }]}
      >

      </Layout> */}
    </>
  );
};

export default CurrentlyBooked;
