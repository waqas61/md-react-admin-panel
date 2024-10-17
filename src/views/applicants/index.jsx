import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTheme } from '@mui/material';
import axios from 'axios';
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
import { Group } from '@mui/icons-material';
import { styled } from '@mui/material/styles';


import { IconCalendarDue } from '@tabler/icons-react';
import { IconReload } from '@tabler/icons-react';
import { IconFilter } from '@tabler/icons-react';
import { IconCalendarEvent } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';

// project imports
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';
import CustomDataGrid from '../../ui-component/CustomDataGrid';
import GreenSwitch from '../../ui-component/GreenSwitch';
import StarRating from '../../ui-component/StarRating';
import ApplicantPopup from '../../ui-component/ApplicantPopup';
import BlockModal from './BlockModal';
import UnblockModal from './UnbloackModal';


import FilterIcon from '../../assets/icons/filter.svg';
import RefreshIcon from '../../assets/icons/arrow-clockwise.svg';


import FiltersSidebar from './FilterSidebar';

import { gridSpacing } from '../../store/constant';

const CusButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));
const CusBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Applicants = () => {
  const theme = useTheme();
  const [applicants, setApplicants] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [applicantPopupModal, setApplicantPopupModal] = useState(false);
  const [blockModal, setBlockModal] = useState(false);
  const [unblockModal, setUnblockModal] = useState(false);
  const [isFiltersSidebarOpen, setIsFiltersSidebarOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [applicant, setApplicant] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [rate, setRate] = useState(null);
  const [location, setLocation] = useState(null);
  const [selectRating, setSelectRating] = useState([]);
  const [gridWidth, setGridWidth] = useState();
  const resetFilter = () => {
    setStatus([]);
    setApplicant('');
    setSpecialty('');
    setRate('');
    setLocation('');
    setSelectRating([]);
    fetchApplicants(1, 10);
  };

  const handleFilterData = (page, limit) => {

    let endpoint = `https://api.mddentalstaffing.com/api/v1/owner/applicants?page=${page}&limit=${limit}`;

    if (status) {
      endpoint += `&status=${status}`;
    }

    if (specialty) {
      endpoint += `&specialty=${specialty}`;
    }

    if (applicant) {
      endpoint += `&applicant=${applicant}`;
    }

    if (rate) {
      endpoint += `&rate=${rate}`;
    }

    if (location) {
      endpoint += `&location=${location}`;
    }

    if (selectRating && selectRating != '') {
      endpoint += `&score=${selectRating}`;
    }

    axios
      .get(endpoint, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((response) => {
        setApplicants(response.data);
        setIsFiltersSidebarOpen(false);
      })
      .catch((e) => {
        console.log(e);
        setIsFiltersSidebarOpen(false);
      });
  };

  const fetchApplicants = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/applicants?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((response) => {
        setApplicants(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchApplicants(1, 10);
  }, []);

  const columns = [
    { field: 'applicant', headerName: 'Applicant', width: 150 },
    { field: 'specialty', headerName: 'Specialty', width: 200 },
    { field: 'desired_rate', headerName: 'Rate($/h)', width: 100 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'score', headerName: 'Average Score', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    // { field: 'action', headerName: '', width: 150 },
  ];

  const rows = applicants?.data?.map((item) => {
    const current_location = item.user_locations.filter((location) => {
      return location.is_current == true;
    });

    return {
      id: item.id,
      applicant: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
          onClick={() => {
            setSelectedItem(item);
            setApplicantPopupModal(true);
          }}
        >
          <img
            src={
              item.avatar
                ? `https://api.mddentalstaffing.com/api/v1/assets/${item.avatar}`
                : item.profile_photo_path
                  ? item.profile_photo_path
                  : 'https://via.placeholder.com/150'
            }
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
          >
            {item.first_name} {item.last_name}
          </span>
        </div>
      ),
      specialty: (
        <>
          {item.user_sub_categories &&
            item.user_sub_categories.map((sub, index) => (
              <span key={sub.sub_category.id}>
                {sub.sub_category.name}
                {index < item.user_sub_categories.length - 1 ? ', ' : ''}
              </span>
            ))}
        </>
      ),
      // rate: item.user_current_location.length > 0 ? item.user_current_location[0].desired_rate : 'w',
      desired_rate: current_location.length > 0 ? current_location[0].desired_rate : '-',
      location: current_location[0].place_name,
      score: (
        <>
          <StarRating rating={item.average_score} />
        </>
      ),
      status: '-',
      // action: (
      //   <div
      //     style={{
      //       display: 'flex',
      //       gap: 10,
      //       alignItems: 'center',
      //       justifyContent: 'end',
      //     }}
      //   >
      //     <Button
      //       variant='primary'
      //       style={{
      //         border: '1px solid #2561B0',
      //         color: '#fff',
      //         backgroundColor: '#2561B0',
      //       }}
      //     >
      //       History
      //     </Button>
      //   </div>
      // ),
      ...item,
    };
  });

  return (

    <>


      <MainCard
        title="All posting assignment applicants"
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
                    variant='outlined'
                    style={{
                      border:
                        selectedItem !== null
                          ? '1px solid #2561B0'
                          : '1px solid #D9D9D9',
                      color: selectedItem !== null ? '#595959' : '#BFBFBF',
                      backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                    }}
                    disabled={selectedItem === null}
                    onClick={() => setBlockModal(true)}
                  >
                    Block
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
                    disabled={selectedItem === null}
                    onClick={() => setUnblockModal(true)}
                  >
                    Unblock
                  </CusButton>
                  <CusBox
                    sx={{ display: 'inline' }}
                  >
                    View All Blocked Applicants   {"    "}
                    <GreenSwitch />
                  </CusBox>

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
                    onClick={() => {
                      fetchApplicants(1, 10);
                    }}

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
                status={status}
                setStatus={setStatus}
                applicant={applicant}
                setApplicant={setApplicant}
                specialty={specialty}
                setSpecialty={setSpecialty}
                rate={rate}
                setRate={setRate}
                location={location}
                setLocation={setLocation}
                selectRating={selectRating}
                setSelectRating={setSelectRating}
                resetFilter={resetFilter}
                gridWidth={gridWidth}
                handleFilterData={() => {
                  handleFilterData(1, 10);
                }}
              />
            )}

            {applicants.data && (
              <CustomDataGrid
                rows={rows}
                columns={columns}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                paging={{
                  total: 1,
                  per_page: 1,
                  current_page: 1,
                }}
              />
            )}

            {applicantPopupModal && selectedItem && (
              <ApplicantPopup
                isOpen={applicantPopupModal}
                onClose={() => setApplicantPopupModal(false)}
                selectedApplicant={selectedItem}
              />
            )}

            {blockModal && (
              <BlockModal
                open={blockModal}
                handleClose={() => setBlockModal(false)}
                selectedItem={selectedItem}
                fetchData={() => fetchApplicants(1, 10)}
              />
            )}

            {unblockModal && (
              <UnblockModal
                open={unblockModal}
                handleClose={() => setUnblockModal(false)}
                selectedItem={selectedItem}
                fetchData={() => fetchApplicants(1, 10)}
              />
            )}

          </Grid>
        </Grid>
      </MainCard>

      {/* <Layout
        items={[
          {
            name: 'Applicants',
            link: '/',
            icon: <Group sx={{ py: 0.2 }} />,
          },
        ]}
        basicHeader={{
          title: 'Applicants',
          description: 'All posting assignment applicants',
        }}
      >
        <div
          className='d-flex justify-content-between'
          style={{
            backgroundColor: '#F5F5F5',
            padding: '12px 20px',
            borderBottom: '1px solid #D9D9D9',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 20,
              alignItems: 'center',
            }}
          >
            <Button
              variant='outlined'
              style={{
                border:
                  selectedItem !== null
                    ? '1px solid #2561B0'
                    : '1px solid #D9D9D9',
                color: selectedItem !== null ? '#595959' : '#BFBFBF',
                backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
              }}
              disabled={selectedItem === null}
              onClick={() => setBlockModal(true)}
            >
              Block
            </Button>
            <Button
              variant='outlined'
              style={{
                border:
                  selectedItem !== null
                    ? '1px solid #2561B0'
                    : '1px solid #D9D9D9',
                color: selectedItem !== null ? '#595959' : '#BFBFBF',
                backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
              }}
              disabled={selectedItem === null}
              onClick={() => setUnblockModal(true)}
            >
              Unblock
            </Button>
            <div
              style={{
                borderLeft: '1px solid #D9D9D9',
                height: '100%',
              }}
            ></div>
            <div
              className='d-flex'
              style={{
                gap: 20,
                alignItems: 'center',
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: '#595959',
                  fontSize: '0.8rem',
                }}
              >
                View All Blocked Applicants
              </p>
              <GreenSwitch />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 20,
            }}
          >
            <Button
              style={{
                border: '1px solid #2561B0',
                color: '#595959',
                backgroundColor: '#2561B0',
              }}
              onClick={() => setIsFiltersSidebarOpen(true)}
            >
              <img src={FilterIcon} alt='' />
              <span
                style={{
                  marginLeft: 10,
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
              onClick={() => fetchApplicants(1, 10)}
            >
              <img src={RefreshIcon} alt='' />
              <span
                style={{
                  marginLeft: 10,
                  color: '#2561B0',
                }}
              >
                Reset filters
              </span>
            </Button>
          </div>
        </div>

        {isFiltersSidebarOpen && (
          <FiltersSidebar
            isSidebarOpen={isFiltersSidebarOpen}
            setIsSidebarOpen={setIsFiltersSidebarOpen}
            status={status}
            setStatus={setStatus}
            applicant={applicant}
            setApplicant={setApplicant}
            specialty={specialty}
            setSpecialty={setSpecialty}
            rate={rate}
            setRate={setRate}
            location={location}
            setLocation={setLocation}
            selectRating={selectRating}
            setSelectRating={setSelectRating}
            resetFilter={resetFilter}
            handleFilterData={() => {
              handleFilterData(1, 10);
            }}
          />
        )}

        {applicants.data && (
          <CustomDataGrid
            rows={rows}
            columns={columns}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            paging={{
              total: 1,
              per_page: 1,
              current_page: 1,
            }}
          />
        )}

        {applicantPopupModal && selectedItem && (
          <ApplicantPopup
            isOpen={applicantPopupModal}
            onClose={() => setApplicantPopupModal(false)}
            selectedApplicant={selectedItem}
          />
        )}

        {blockModal && (
          <BlockModal
            open={blockModal}
            handleClose={() => setBlockModal(false)}
            selectedItem={selectedItem}
            fetchData={() => fetchApplicants(1, 10)}
          />
        )}

        {unblockModal && (
          <UnblockModal
            open={unblockModal}
            handleClose={() => setUnblockModal(false)}
            selectedItem={selectedItem}
            fetchData={() => fetchApplicants(1, 10)}
          />
        )}
      </Layout> */}
    </>
  );
};

export default Applicants;
