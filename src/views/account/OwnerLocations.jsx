import React, { useEffect, useState } from 'react';
import { Person2Outlined } from '@mui/icons-material';
import { MyLocation } from '@mui/icons-material';
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
  RadioGroup
} from "@mui/material";
import { styled } from '@mui/material/styles';


import { IconCalendarDue } from '@tabler/icons-react';
import { IconReload } from '@tabler/icons-react';
import { IconFilter } from '@tabler/icons-react';
import { IconCalendarEvent } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';



import DeleteLocationModal from './DeleteLocationModal';
import { useNavigate } from 'react-router-dom';

// project imports
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';
import CustomDataGrid from '../../ui-component/CustomDataGrid';


//Store
import { gridSpacing } from '../../store/constant';



const CusButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const CusBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const OwnerLocations = () => {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);
  const [locations, setLocations] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const navigate = useNavigate();

  const fetchLocations = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/locations?page=${page}&limit=${limit}`,
        {
          headers: {
            method: 'GET',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((res) => {
        setLocations(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchLocations(1, 10);
  }, []);

  const ownerLocationRows = locations?.data?.map((item) => {
    return {
      id: item.id,
      place_name: item.place_name ?? '',
      address: item.address ?? '-',
      contact_first_name: (
        <div>
          {item.contact_first_name && item.contact_last_name ? (
            <>
              {item.contact_first_name} {item.contact_last_name}
            </>
          ) : (
            '-'
          )}
        </div>
      ),
      location_email: item.location_email ?? '-',
      location_phone: item.location_phone ?? '-',
    };
  });

  const columns = [
    { field: 'place_name', headerName: 'Practice Name', width: 150 },
    { field: 'address', headerName: 'Address', width: 150 },
    {
      field: 'contact_first_name',
      headerName: 'Contact Person Name',
      width: 150,
    },
    { field: 'location_email', headerName: 'E-mail', width: 150 },
    { field: 'location_phone', headerName: 'Phone', width: 150 },
  ];

  return (
    <>

      <MainCard
        title="Management of Locations"
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
                <Grid item xs={11} >

                  <CusButton
                    variant='outlined'
                    style={{
                      border: '1px solid #2561B0',
                      color: '#595959',
                      backgroundColor: '#fff',
                    }}
                    onClick={() => navigate('/owner/account/locations/add')}
                  >
                    Add
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
                      selectedItem === null || selectedItem.posting_status === 'cancelled'
                    }
                    onClick={() =>
                      navigate(`/owner/account/locations/${selectedItem.id}`)
                    }
                  >
                    Edit
                  </CusButton>

                  <CusButton
                    variant='outlined'
                    style={{
                      border:
                        selectedItem != null ? '1px solid #FA5A16' : '1px solid #D9D9D9',
                      color: selectedItem != null ? '#FA5A16' : '#BFBFBF',
                      backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                    }}
                    disabled={selectedItem == null}
                    onClick={() => setOpenDeleteModal(true)}
                  >
                    Delete
                  </CusButton>

                </Grid>
                <Grid item xs={1} >
                  <CusButton
                    style={{
                      border: "1px solid #2561B0",
                      color: theme.palette.background.defaultSideBar,
                      backgroundColor: theme.palette.background.paper,
                    }}
                    onClick={() => fetchLocations(1, 10)}

                  >
                    <IconReload stroke={1} />
                  </CusButton>
                </Grid>
              </Grid>
            </Box>

            {ownerLocationRows && locations && locations.data && (
              <CustomDataGrid
                rows={ownerLocationRows}
                columns={columns}
                paging={locations?.paging}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                fetchData={fetchLocations}
              />
            )}

            {selectedItem && openDeleteModal && (
              <DeleteLocationModal
                open={openDeleteModal}
                handleClose={() => setOpenDeleteModal(false)}
                selectedItem={selectedItem}
                fetchData={fetchLocations}
              />
            )}
          </Grid>
        </Grid>
      </MainCard>


      {/* <Grid
        sx={{
          px: 3,
          pt: 2,
          pb: 1,
          borderBottom: '1px solid #D9D9D9',
          width: 'auto',
        }}
      >
        <h4 className='pb-0 mb-1' style={{ color: '#262626' }}>
          Locations
        </h4>
        <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
          Management of Locations
        </p>
      </Grid> */}




    </>
  );
};

export default OwnerLocations;
