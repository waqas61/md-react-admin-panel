import React, { useState } from 'react';
import Layout from '../../../../components/Layout';
import { Grid } from '@mui/material';
import FilterIcon from '../../../../assets/icons/filter.svg';
import RefreshIcon from '../../../../assets/icons/arrow-clockwise.svg';
import { Button } from 'react-bootstrap';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomDataGrid from '../../../../components/General/CustomDataGrid';
import moment from "moment";
import FiltersSidebarPreviouslyBooked from './FiltersSidebarPreviouslyBooked';
import axios from 'axios';
import { useEffect } from 'react';

import { useNavigate } from "react-router-dom";

const ProfessionalPreviouslyBooked = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event, item) => {
    if (anchorEl !== null) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
      setSelectedItem(item);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };
  const [selectedItem, setSelectedItem] = useState(null);
  const [filtersSidebar, setFiltersSidebar] = useState(false);
  const [previouslyBooked, setPreviouslyBooked] = useState({});
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isApplicantDataOpen, setIsApplicantDataOpen] = useState(false);
  const [selectRating, setSelectRating] = useState([]);
  const [professional, setProfessional] = useState('');
  const [date, setDate] = useState('');
  const [posting, setPosting] = useState('');
  const [type, setType] = useState('');

  const fetchPreviouslyBooked = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/previously-booked?page=${page}&limit=${limit}`,
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
    { field: "date", headerName: "Date", width: 150 },
    { field: 'posting_title', headerName: 'Posting Title', width: 250 },
    { field: "posting_type", headerName: "Post Type", width: 150 },
    { field: "company", headerName: "Company", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
  ];

  const rows = previouslyBooked?.data?.map((item, index) => {
    var p_type = item.posting_type;
    return {
      id: item.id,
      date: moment(item.schedule_date).format("MM/DD/YYYY"),
      posting_title: item.posting.title,
      posting_type: p_type.toUpperCase(),
      company: item.posting.user.company_name,
      location: item.posting.user_location.place_name ? item.posting.user_location.place_name : "-",
      // ...item,
    };
  });

  const handleFilterData = (page, limit) => {

    let endpoint = `https://api.mddentalstaffing.com/api/v1/previously-booked?page=${page}&limit=${limit}`;

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
    <Layout
      items={[
        { link: '/booked/currently', name: 'Booked Postings' },
        { link: '/booked/previously', name: 'Previously Booked' },
      ]}
    >
      <Grid
        sx={{
          px: 3,
          pt: 2,
          pb: 1,
          borderBottom: '1px solid #D9D9D9',
          width: 'auto',
        }}
      >
        <h4 className='pb-0 mb-1' style={{ color: '#262626' }}>
          Previously Booked
        </h4>
        <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
          Previously Booked Jobs
        </p>
      </Grid>
      <div
        className='d-flex justify-content-between align-items-center'
        style={{
          padding: '10px 20px',
          backgroundColor: '#F5F5F5',
          borderBottom: '1px solid #D9D9D9',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 20,
          }}
        >
        </div>
        <div
          className='d-flex'
          style={{
            gap: 20,
            alignItems: 'center',
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
            onClick={() => {
              fetchPreviouslyBooked(1, 10);
            }}
          >
            <img src={RefreshIcon} alt='' />
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

      {previouslyBooked && previouslyBooked.data && (
        <CustomDataGrid
          columns={columns}
          rows={rows}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          paging={previouslyBooked.paging}
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
        />
      )}




    </Layout>
  );
};

export default ProfessionalPreviouslyBooked;
