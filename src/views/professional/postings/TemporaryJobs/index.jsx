import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// import Layout from "../../../../components/Layout";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";

import Stack from '@mui/material/Stack';
import { Alert } from '@mui/material';
import { FormControl, Grid, InputLabel, MenuItem, Select, Box, Button } from "@mui/material";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import QrCodeScannerRoundedIcon from "@mui/icons-material/QrCodeScannerRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";


// project imports
import SubCard from '../../../../ui-component/cards/SubCard';
import MainCard from '../../../../ui-component/cards/MainCard';
import PanelCard from '../../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../../ui-component/cards/CardSecondaryAction';


import CalendarIcon from "../../../../assets/icons/calendar2.svg";
import FilterIcon from "../../../../assets/icons/filter.svg";
import RefreshIcon from "../../../../assets/icons/arrow-clockwise.svg";

import FiltersSidebar from "./ProposalFilterSidebar";
import { capitalizeFirstLetter } from "../../../../utils/helper";
import { getStatusStyle } from "./../../../../utils/CustomDataGridStyle";


import MapDirectionDialog from '../../../../ui-component/MapDirectionDialog';
import GreenSwitch from "../../../../ui-component/GreenSwitch";
import LoadingButton from '../../../../ui-component/LoadingButton';
import CustomDataGrid from "../../../../ui-component/CustomDataGrid";
import MarkPostCompletedDialog from '../../../../ui-component/MarkPostCompletedDialog';

//store
import { gridSpacing } from '../../../../store/constant';
import { selectUser } from '../../../../store/slices/userSlice';


import "./ProfessionalTemporaryJobs.css";






function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



const ProfessionalTemporaryJobs = () => {
  const user = useSelector(selectUser);
  const [value, setValue] = React.useState(0);


  const [activeTab, setActiveTab] = useState("availableJobs");
  const [availableJobs, setAvailableJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const [acceptLoading, setAcceptLoading] = useState(false);
  const [acceptFinished, setAcceptFinished] = useState(false);
  const [isMarkPostCompletedDialogOpen, setIsMarkPostCompletedDialogOpen] = useState(false);
  const [postApplicantId, setPostApplicantId] = useState(null);
  const [userCurrentLocation, setUserCurrentLocation] = useState(() => {
    let user_current_location = [];
    user.user_locations?.map((location, index) => {
      if (location.is_current) {
        user_current_location.push(location);
      }
    });

    if (user_current_location.length > 0) {
      return {
        latitude: user_current_location[0].latitude,
        longitude: user_current_location[0].longitude,
        place_name: user_current_location[0].place_name
      };
    } else {
      return {
        latitude: null,
        longitude: null,
        place_name: null,
      };
    }
  });

  const [postLocation, setPostLocation] = useState({
    latitude: null,
    longitude: null,
    place_name: null
  });

  const [postLocationLatLng, setPostLocationsLatLng] = useState({
    latitude: null,
    longitude: null,
    place_name: null
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [myJobs, setMyJobs] = useState([]);
  const [isFiltersSidebarOpen, setIsFiltersSidebarOpen] = useState(false);
  const [isMyJobsFiltersSidebarOpen, setIsMyJobsFiltersSidebarOpen] = useState(false);
  const [viewHiddenJobs, setViewHiddenJobs] = useState(0);
  const [postingTitle, setPostingTitle] = useState("");
  const [status, setStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [openDirectionModal, setOpenDirectionModal] = useState(false);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("auth_token");
  const [actions, setActions] = useState(false);
  const [gridWidth, setGridWidth] = useState();


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

  const buttonStyle = {
    backgroundColor: isHovered ? "#b28900" : "#FFCF33",
    textTransform: "none",
    padding: "7px 18px",
    color: "#262626",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  };

  useEffect(() => {
    getAvailableJobs(1, 10);
  }, [viewHiddenJobs]);

  useEffect(() => {
    getMyJobs(1, 10);
  }, []);

  const getAvailableJobs = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/postings?posting_type=temporary&page=${page}&limit=${limit}&view_hidden=${viewHiddenJobs}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setAvailableJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredJobsOnStatus = (page, limit, e) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/postings?posting_type=temporary&page=${page}&limit=${limit}&posting_status=${e.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setAvailableJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMyJobs = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/postings?posting_type=temporary&page=${page}&limit=${limit}&my_jobs=1`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setMyJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilterAvailableJobs = () => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/postings?posting_type=temporary&page=1&limit=10`;

    if (postingTitle) {
      endpoint += `&title=${postingTitle}`;
    }

    if (location) {
      endpoint += `&location=${location}`;
    }

    if (filterStatus) {
      endpoint += `&posting_status=${filterStatus}`;
    }

    if (distance) {
      endpoint += `&distance=${distance}`;
    }

    axios
      .get(endpoint, {
        headers: {
          method: "GET",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setAvailableJobs(res.data);
        setIsFiltersSidebarOpen(false);
      })
      .catch((e) => console.log(e));
  };

  const handleFilterMyJobs = () => {
    let endpoint = `https://api.mddentalstaffing.com/api/v1/postings?posting_type=temporary&page=1&limit=10&my_jobs=1`;

    if (postingTitle) {
      endpoint += `&title=${postingTitle}`;
    }

    if (location) {
      endpoint += `&location=${location}`;
    }

    if (status) {
      endpoint += `&posting_status=${status}`;
    }

    if (distance) {
      endpoint += `&distance=${distance}`;
    }

    axios
      .get(endpoint, {
        headers: {
          method: "GET",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setMyJobs(res.data);
        setIsMyJobsFiltersSidebarOpen(false);
      })
      .catch((e) => console.log(e));
  };


  const resetFilter = () => {
    setPostingTitle('');
    setFilterStatus('');
    setLocation('');
    setDistance('');
  };

  useEffect(() => {
    handleFilterAvailableJobs();
  }, [status]);

  const declineAction = (id) => {
    setLoading(true);
    axios.put(`https://api.mddentalstaffing.com/api/v1/postings/applicants/${id}/modification`, {
      modify_status: 'rejected'
    }, {
      headers: {
        method: 'PUT',
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then((res) => {
      getMyJobs(1, 10);
      setFinished(true);
    }).catch((res) => {

    });
  };

  const handleHidePosting = (id) => {
    axios
      .put(
        `https://api.mddentalstaffing.com/api/v1/postings/${id}/hide`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then(() => {
        getAvailableJobs(1, 10);
      });
  };

  const rows = availableJobs?.data?.map((item) => {
    const statusStyle = getStatusStyle(item.applicant_status);
    return {
      id: item.id,
      posting: item.title,
      status: (
        <span style={statusStyle}>
          {capitalizeFirstLetter(item.applicant_status)}
        </span>
      ),
      // company_name: item.applicant_status == 'approved' ? item.user.companies[0].name : '*****',
      company_name: item.company_name,
      location: item.user_location.place_name,
      total_days: (
        <div
          style={{
            padding: 4,
            borderRadius: 3,
            borderColor: "#E8E8E8",
            borderWidth: 1,
          }}
        >
          <span
            style={{
              backgroundColor: "#F5F5F5",
              padding: "2px 10px",
              borderRadius: "2px",
            }}
          >
            {item.schedules_count}
          </span>
        </div>
      ),

      distance: (
        <div>
          <Button
            style={{ border: 0 }}
            onClick={() => {
              setPostLocation({
                place_name: item.user_location.place_name,
                latitude: item.user_location.latitude,
                longitude: item.user_location.longitude,
              });
              setPostLocationsLatLng({
                place_name: item.post_location_name,
                latitude: item.post_location_lat,
                longitude: item.post_location_lng,
              });
              setOpenDirectionModal(true);
            }}
          >
            <span
              style={{
                color: "#f1f1f1",
                textDecoration: "underline",
              }}
            >
              {item.distance}
            </span>
            <LocationOnOutlinedIcon style={{ marginLeft: 5, color: "#FA5A16" }} />
          </Button>
        </div>
      ),
      visible: (
        <div>
          {item.applicant_status === "new" ? (
            <GreenSwitch
              checked={item.is_hidden === 0}
              label=""
              onChange={() => handleHidePosting(item.id)}
            />
          ) : (
            ""
          )}
        </div>
      ),
      col2: (
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          {item.applicant_status === "new" || item.applicant_status === "applied" && item.applicant_status != "completed" ? (
            <Button
              style={{ backgroundColor: "#2561B0", border: 0 }}
              onClick={() => {
                navigate(`/professional/jobs/temporary/${item.id}/calendar`);
              }}
            >
              <CalendarMonthOutlinedIcon
                style={{
                  height: 24,
                }}
              />{" "}
              Apply
            </Button>
          ) : item.applicant_status === "updated" ? (
            <Button style={{ backgroundColor: "#2561B0", border: 0 }}>
              View
            </Button>
          ) : item.applicant_status === 'job_offered' && item.applicant_status != 'offer_accepted' && item.applicant_status != 'rejected' ? (
            <>
              <Box >
                <Grid container >
                  <Grid item xs={6}>
                    <LoadingButton
                      color='primary'
                      variant='contained'
                      loading={acceptLoading}
                      done={acceptFinished}
                      onClick={() => {
                        navigate(`/professional/jobs/temporary/${item.id}/calendar`);
                      }}
                      style={{ backgroundColor: '#2561B0', border: 0 }}
                    >
                      Accept
                    </LoadingButton>
                  </Grid>
                  {/* {item.applicant_status == 'job_offered' && (
                    <Grid item xs={6}>
                      <LoadingButton
                        color='primary'
                        variant='contained'
                        style={{ backgroundColor: '#4caf50', border: 0 }}
                        loading={loading}
                        done={finished}
                        onClick={(() => {
                          setSelectedItem(item);
                          declineAction(item.posting_applicant.id);
                        })}
                      >
                        Decline
                      </LoadingButton>
                    </Grid>
                  )} */}
                </Grid>
              </Box>
            </>
          ) : item.proposal.length > 0 && item.applicant_status != 'hired' ? (
            <Button
              style={{ backgroundColor: "#2561B0", border: 0 }}
              onClick={() => {
                navigate(`/professional/jobs/temporary/proposal/post/${item.id}`);
              }}
            >
              View Proposal
            </Button>
          ) : item.applicant_status == 'completed' ? (
            <></>
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <Button
                    size="small"
                    variant='outline-primary'
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid #2561B0',
                      borderRadius: '3px',
                      color: '#2561B0',
                      width: '100%',
                      fontSize: 'bold',
                      padding: '3px 15px',
                      fontSize: 'bold',
                    }}
                    onClick={() => {
                      console.log('Peru');
                      setSelectedItem(item);
                      setIsMarkPostCompletedDialogOpen(true);
                      setPostApplicantId(item.posting_applicant.id);
                    }}
                  >
                    Mark Complete
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )
          }
        </div >
      ),
    };
  });

  const myJobsRows = myJobs?.data?.map((item) => {
    const statusStyle = getStatusStyle(item.applicant_status);
    return {
      id: item.id,
      posting: item.title,
      status: (
        <span style={statusStyle}>
          {capitalizeFirstLetter(item.applicant_status)}
        </span>
      ),
      // company_name: item.user.companies[0].name,
      company_name: item.company_name,
      location: item.user_location.place_name,

      total_days: (
        <div
          style={{
            padding: 4,
            borderRadius: 3,
            borderColor: "#E8E8E8",
            borderWidth: 1,
          }}
        >
          <span
            style={{
              backgroundColor: "#F5F5F5",
              padding: "2px 10px",
              borderRadius: "2px",
            }}
          >
            {item.schedules_count}
          </span>
        </div>
      ),

      distance: (
        <div>
          <span
            style={{
              color: "#2561B0",
              textDecoration: "underline",
            }}
          >
            {item.distance}
          </span>
          <LocationOnOutlinedIcon style={{ marginLeft: 5, color: "#FA5A16" }} />
        </div>
      ),
    };
  });

  const buttonsMyJobs = [
    {
      type: 'button',
      label: 'View Job',
      onClick: () => {
        navigate(`/professional/jobs/temporary/${selectedItem.id}`)
        setActions(false);
      },
      disabled: selectedItem === null,
      backgroundColor: selectedItem != null ? "#fff" : "#F5F5F5",
      borderColor: selectedItem !== null
        ? "#2561B0"
        : "#D9D9D9",
      color: selectedItem !== null ? "#595959" : "#BFBFBF",
      marginTop: '30px',
    },
    {
      type: 'button',
      label: 'Cancel',
      onClick: () => {
        setActions(false);
      },
      disabled: selectedItem === null,
      backgroundColor: selectedItem != null ? "#fff" : "#F5F5F5",
      borderColor: '#2561B0',
      color: selectedItem !== null ? "#595959" : "#BFBFBF",
      marginTop: '20px',
    }
  ];

  const buttonsAvailableJobs = [
    {
      type: 'button',
      label: 'Job Details',
      onClick: () => {
        navigate(`/professional/jobs/temporary/${selectedItem.id}`)
        setActions(false);
      },
      disabled: selectedItem === null,
      backgroundColor: selectedItem != null ? "#fff" : "#F5F5F5",
      borderColor: selectedItem !== null
        ? "#2561B0"
        : "#D9D9D9",
      color: selectedItem !== null ? "#595959" : "#BFBFBF",
      marginTop: '30px',
    },
    {
      type: 'button',
      label: 'Cancel',
      onClick: () => {
        setSelectedItem(null)
        setActions(false);
      },
      disabled: selectedItem === null,
      backgroundColor: selectedItem != null ? "#fff" : "#F5F5F5",
      borderColor: '#2561B0',
      color: selectedItem !== null ? "#595959" : "#BFBFBF",
      marginTop: '20px',
    }
  ];

  const columns = [
    { field: "posting", headerName: "Posting", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "company_name", headerName: "Company Name", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "total_days", headerName: "Total Days", width: 150 },
    { field: "distance", headerName: "Distance (mi)", width: 150 },
    { field: "visible", headerName: "Visible", width: 150 },
    { field: "col2", headerName: "", width: 200 },
  ];

  const myJobsColumns = [
    { field: "posting", headerName: "Posting", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "company_name", headerName: "Company Name", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "total_days", headerName: "Total Days", width: 150 },
    { field: "distance", headerName: "Distance (mi)", width: 200 },
  ];

  const handleChange = (event, newValue) => {
    console.log('newValue ==== > ', newValue);
    setValue(newValue);
  };

  return (
    <>
      <MainCard
        title="Temporary Jobs"
        darkTitle="Manage My Temporary Jobs"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>

            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Item One" {...a11yProps(0)} />
                  <Tab label="Item Two" {...a11yProps(1)} />
                </Tabs>
              </Box>

              <CustomTabPanel value={value} index={0}>
                <div
                  className="d-flex justify-content-between"
                  style={{
                    backgroundColor: "#F5F5F5",
                    padding: "12px 20px",
                    borderBottom: "1px solid #D9D9D9",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 20,
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="outlined"
                      style={{
                        border: selectedItem !== null ? "1px solid #2561B0" : "1px solid #D9D9D9",
                        color: selectedItem !== null ? "#595959" : "#BFBFBF",
                        backgroundColor: selectedItem != null ? "#fff" : "#F5F5F5",
                        display: `${gridWidth ? 'none' : ''}`
                      }}
                      onClick={() =>
                        navigate(`/professional/jobs/temporary/${selectedItem.id}`)
                      }
                    >
                      Job Details
                    </Button>
                    <Button
                      variant="outlined"
                      style={{
                        border:
                          selectedItem !== null
                            ? "1px solid #2561B0"
                            : "1px solid #D9D9D9",
                        color: selectedItem !== null ? "#595959" : "#BFBFBF",
                        backgroundColor: selectedItem != null ? "#fff" : "#F5F5F5",
                        display: `${gridWidth ? 'none' : ''}`
                      }}
                      disabled={selectedItem === null}
                      onClick={() => setSelectedItem(null)}
                    >
                      Cancel
                    </Button>

                    <div
                      style={{
                        borderLeft: "1px solid #D9D9D9",
                        height: "100%",
                        display: `${gridWidth ? 'none' : ''}`
                      }}
                    ></div>
                    <div
                      className="d-flex"
                      style={{
                        gap: 20,
                        alignItems: "center",
                        fontSize: "13px"
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                        }}
                      >
                        View All Hidden Jobs
                      </p>
                      <GreenSwitch
                        onChange={() => setViewHiddenJobs(viewHiddenJobs === 0 ? 1 : 0)}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 20,
                    }}
                  >
                    <Button
                      style={{
                        border: "1px solid #2561B0",
                        color: "#fff",
                        backgroundColor: "#2561B0",
                      }}
                      onClick={() => navigate("/professional/jobs/calendar")}
                    >
                      <img src={CalendarIcon} alt="" />
                      <span
                        style={{
                          marginLeft: 5,
                          color: "#fff",
                          display: `${gridWidth ? 'none' : ''}`
                        }}
                      >
                        Job Calendar
                      </span>
                    </Button>
                    <div
                      style={{
                        borderLeft: "1px solid #D9D9D9",
                        height: "100%",
                        display: `${gridWidth ? 'none' : ''}`
                      }}
                    ></div>
                    <Button
                      style={{
                        border: "1px solid #2561B0",
                        color: "#595959",
                        backgroundColor: "#2561B0",
                      }}
                      onClick={() => setIsFiltersSidebarOpen(true)}
                    >
                      <img src={FilterIcon} alt="" />
                      <span
                        style={{
                          marginLeft: 5,
                          color: "#fff",
                          display: `${gridWidth ? 'none' : ''}`
                        }}
                      >
                        Filters
                      </span>
                    </Button>
                    <Button
                      style={{
                        border: "1px solid #2561B0",
                        color: "#595959",
                        backgroundColor: "#fff",
                      }}
                      onClick={() => getAvailableJobs(1, 10)}
                    >
                      <img src={RefreshIcon} alt="" />
                      <span
                        style={{
                          marginLeft: 5,
                          color: "#2561B0",
                          display: `${gridWidth ? 'none' : ''}`
                        }}
                      >
                        Reset Filters
                      </span>
                    </Button>
                  </div>
                </div>
                <Grid
                  sx={{
                    px: 3,
                    pt: 2,
                    pb: 1,
                    width: 'auto',
                  }}
                >
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert
                      severity='error'
                      style={{
                        color: 'red',
                        backgroundColor: 'rgb(250, 238, 222)',
                      }}
                    >
                      <span style={{ fontWeight: 'bold' }}> Important </span>
                      If you want to see more jobs, please go back to your profile and update your availability.

                    </Alert>
                  </Stack>
                </Grid>
                {availableJobs && availableJobs.data && (
                  <CustomDataGrid
                    rows={rows}
                    columns={columns}
                    paging={availableJobs?.paging}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    fetchData={getAvailableJobs}
                    actions={actions}
                    setActions={setActions}
                    buttons={buttonsAvailableJobs}
                  />
                )}
              </CustomTabPanel>

              <CustomTabPanel value={value} index={1}>
                <div
                  className="d-flex justify-content-between"
                  style={{
                    backgroundColor: "#F5F5F5",
                    padding: "12px 20px",
                    borderBottom: "1px solid #D9D9D9",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 20,
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="text"
                      style={buttonStyle}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <QrCodeScannerRoundedIcon
                        sx={{ mx: 0.5 }}
                        style={{ fontSize: "1.2rem" }}
                      />{" "}
                      Check In
                    </Button>
                    <Button
                      variant="outlined"
                      style={{
                        border:
                          selectedItem !== null
                            ? "1px solid #2561B0"
                            : "1px solid #D9D9D9",
                        color: selectedItem !== null ? "#595959" : "#BFBFBF",
                        backgroundColor: selectedItem != null ? "#fff" : "#F5F5F5",
                        display: `${gridWidth ? 'none' : ''}`
                      }}
                      onClick={() =>
                        navigate(`/professional/jobs/temporary/${selectedItem.id}`)
                      }
                    >
                      View Job
                    </Button>
                    <Button
                      variant="outlined"
                      style={{
                        border:
                          selectedItem !== null
                            ? "1px solid #2561B0"
                            : "1px solid #D9D9D9",
                        color: selectedItem !== null ? "#595959" : "#BFBFBF",
                        backgroundColor: selectedItem != null ? "#fff" : "#F5F5F5",
                        display: `${gridWidth ? 'none' : ''}`
                      }}
                      disabled={selectedItem === null}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 20,
                    }}
                  >
                    <Button
                      style={{
                        border: "1px solid #2561B0",
                        color: "#fff",
                        backgroundColor: "#2561B0",
                      }}
                      onClick={() => navigate("/professional/jobs/calendar")}
                    >
                      <img src={CalendarIcon} alt="" />
                      <span
                        style={{
                          marginLeft: 5,
                          color: "#fff",
                          display: `${gridWidth ? 'none' : ''}`
                        }}
                      >
                        Job Calendar
                      </span>
                    </Button>
                    <Button
                      style={{
                        border: "1px solid #2561B0",
                        color: "#595959",
                        backgroundColor: "#2561B0",
                      }}
                      onClick={() => setIsMyJobsFiltersSidebarOpen(true)}
                    >
                      <img src={FilterIcon} alt="" />
                      <span
                        style={{
                          marginLeft: 5,
                          color: "#fff",
                          display: `${gridWidth ? 'none' : ''}`
                        }}
                      >
                        Filters
                      </span>
                    </Button>
                    <Button
                      style={{
                        border: "1px solid #2561B0",
                        color: "#595959",
                        backgroundColor: "#fff",
                      }}
                      onClick={() => getMyJobs(1, 10)}
                    >
                      <img src={RefreshIcon} alt="" />
                      <span
                        style={{
                          marginLeft: 5,
                          color: "#2561B0",
                          display: `${gridWidth ? 'none' : ''}`
                        }}
                      >
                        Reset Filters
                      </span>
                    </Button>
                  </div>
                </div>
                <Grid
                  sx={{
                    px: 3,
                    pt: 2,
                    pb: 1,
                    width: 'auto',
                  }}
                >
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert
                      severity='error'
                      style={{
                        color: 'red',
                        backgroundColor: 'rgb(250, 238, 222)',
                      }}
                    >
                      <span style={{ fontWeight: 'bold' }}> Important </span>
                      If you want to see more jobs, please go back to your profile and update your availability.

                    </Alert>
                  </Stack>
                </Grid>
                {myJobs && myJobs.data && (
                  <CustomDataGrid
                    rows={myJobsRows}
                    columns={myJobsColumns}
                    paging={myJobs?.paging}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    fetchData={getMyJobs}
                    actions={actions}
                    setActions={setActions}
                    buttons={buttonsMyJobs}
                  />
                )}
              </CustomTabPanel>

            </Box>

            {isFiltersSidebarOpen && (
              <FiltersSidebar
                isSidebarOpen={isFiltersSidebarOpen}
                setIsSidebarOpen={setIsFiltersSidebarOpen}
                handleFilterData={handleFilterAvailableJobs}
                postingTitle={postingTitle}
                setPostingTitle={setPostingTitle}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                location={location}
                setLocation={setLocation}
                distance={distance}
                setDistance={setDistance}
                resetFilter={resetFilter}
              />
            )}

            {isMyJobsFiltersSidebarOpen && (
              <FiltersSidebar
                isSidebarOpen={isMyJobsFiltersSidebarOpen}
                setIsSidebarOpen={setIsMyJobsFiltersSidebarOpen}
                handleFilterData={handleFilterMyJobs}
                postingTitle={postingTitle}
                setPostingTitle={setPostingTitle}
                status={status}
                setStatus={setStatus}
                location={location}
                setLocation={setLocation}
                distance={distance}
                setDistance={setDistance}
                resetFilter={resetFilter}
              />
            )}

            {openDirectionModal && (
              <MapDirectionDialog
                openState={openDirectionModal}
                userCurrentLocation={userCurrentLocation}
                postLocation={postLocation}
                postLocationLatLng={postLocationLatLng}
                handleCloseFunction={() => {
                  setOpenDirectionModal(false);
                }}
              />
            )}

            {isMarkPostCompletedDialogOpen && (
              <MarkPostCompletedDialog
                isOpen={isMarkPostCompletedDialogOpen}
                onClose={() => {
                  setIsMarkPostCompletedDialogOpen(false);
                  setSelectedItem(null);
                }}
                item={postApplicantId}
                fetchData={() => {
                  getAvailableJobs(1, 10)
                }}
              />
            )}
            
          </Grid>
        </Grid>
      </MainCard >
    </>
  );





};

export default ProfessionalTemporaryJobs;
