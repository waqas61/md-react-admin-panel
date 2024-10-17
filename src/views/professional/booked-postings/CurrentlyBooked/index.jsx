import React, { useEffect, useState } from "react";
import Layout from "../../../../components/Layout";
import { Grid, Menu, MenuItem } from "@mui/material";
import { Button } from "react-bootstrap";
import FilterIcon from "../../../../assets/icons/filter.svg";
import RefreshIcon from "../../../../assets/icons/arrow-clockwise.svg";
import CustomDataGrid from "../../../../components/General/CustomDataGrid";
import { capitalizeFirstLetter } from "../../../../utils/helper";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getStatusStyle } from "../../../../utils/CustomDataGridStyle";
import FiltersSidebar from './FilterSidebar';

const ProfessionalCurrentlyBooked = () => {
  const authToken = localStorage.getItem('auth_token');
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFiltersSidebarOpen, setIsFiltersSidebarOpen] = useState(false);
  const [postingTitle, setPostingTitle] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isApplicantDataOpen, setIsApplicantDataOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openCheckInModal, setOpenCheckInModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [currentlyBooked, setCurrentlyBooked] = useState({});
  const navigate = useNavigate();

  const fetchCurrentlyBooked = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/currently-booked?page=${page}&limit=${limit}`,
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
    let endpoint = `https://api.mddentalstaffing.com/api/v1/currently-booked?page=${page}&limit=${limit}`;

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

  const resetFilter = () => {
    setPostingTitle('');
    setLocationFilter('');
    setStatus('');
    setStartDate('');
    setEndDate('');
    fetchCurrentlyBooked(1, 10);
  };

  const columns = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "posting_type", headerName: "Post Type", width: 150 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "start_time", headerName: "Start Time", width: 150 },
    { field: "end_time", headerName: "End Time", width: 150 },
    { field: "company", headerName: "Company", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
  ];

  const rows = currentlyBooked?.data?.map((item) => {

    const user = item.user_id;
    const posting_id = item.posting_id;
    const statusStyle = getStatusStyle(item.working_status);
    return {
      id: item.id,
      date: moment(item.schedule_date).format("MM/DD/YYYY"),
      posting_type: item.posting_type.toUpperCase(),
      title: item.posting.title,
      start_time: item?.posting_schedule ? moment(item.posting_schedule.start_time, "HH:mm:ss").format("hh:mm A") : moment().format("hh:mm A"),
      end_time: item?.posting_schedule ? moment(item.posting_schedule.end_time, "HH:mm:ss").format("hh:mm A") : moment().format("hh:mm A"),
      company: item.posting.user.company_name,
      status: (
        <span style={statusStyle}>
          {capitalizeFirstLetter(item.working_status)}
        </span>
      ),
      location: item.posting.user_location.place_name ? item.posting.user_location.place_name : "-",
      // ...item,
    };
  });

  useEffect(() => {
    fetchCurrentlyBooked(1, 10);
  }, []);

  return (
    <Layout
    // items={[{ link: "/owner/booked/currently", name: "Booked Postings" }]}
    >
      <Grid
        sx={{
          px: 3,
          pt: 2,
          pb: 1,
          borderBottom: "1px solid #D9D9D9",
          width: "auto",
        }}
      >
        <h4 className="pb-0 mb-1" style={{ color: "#262626" }}>
          Currently Booked
        </h4>
        <p style={{ color: "#8C8C8C", fontSize: "0.8rem" }}>
          Currently Booked Posts
        </p>
      </Grid>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          padding: "10px 20px",
          backgroundColor: "#F5F5F5",
          borderBottom: "1px solid #D9D9D9",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 20,
          }}
        >
          <Button
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
              selectedItem === null ||
              selectedItem.posting.posting_status === 'cancelled'
            }
            onClick={() => setOpenCheckInModal(true)}
          >
            Check In
          </Button>
          <Button
            variant="outlined"
            style={{
              border:
                selectedItem != null
                  ? "1px solid #FA5A16"
                  : "1px solid #D9D9D9",
              color: selectedItem != null ? "#FA5A16" : "#BFBFBF",
              backgroundColor: selectedItem != null ? "#fff" : "#F5F5F5",
            }}
            disabled={
              selectedItem == null ||
              selectedItem.posting.posting_status === 'cancelled'
            }
            onClick={() => setOpenCancelModal(true)}
          >
            Cancel
          </Button>

        </div>
        <div
          className="d-flex"
          style={{
            gap: 20,
            alignItems: "center",
          }}
        >
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
            onClick={() => fetchCurrentlyBooked(1, 10)}

          >
            <img src={RefreshIcon} alt="" />
            <span>
              <span
                style={{
                  marginLeft: 5,
                }}
              >
                Reset filters
              </span>
            </span>
          </Button>
        </div>
      </div>

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

    </Layout>
  );
};

export default ProfessionalCurrentlyBooked;
