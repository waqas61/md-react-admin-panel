import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Grid, Button, Box } from '@mui/material';

import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import PanelCard from '../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../ui-component/cards/CardSecondaryAction';

import FilterIcon from '../../../assets/icons/filter.svg';
import RefreshIcon from '../../../assets/icons/arrow-clockwise.svg';
import GreenSwitch from '../../../ui-component/GreenSwitch';
import StarRating from '../../../ui-component/StarRating';
import CustomDataGrid from '../../../ui-component/CustomDataGrid';

import BlockOfficeModal from './BlockOfficeModal';
import UnblockOfficeModal from './UnblockOfficeModal';
import ReviewOfficeModal from './ReviewOfficeModal';
import OfficesFiltersSidebar from './OfficesFiltersSidebar';


import { gridSpacing } from '../../../store/constant';
import { selectUser } from '../../../store/slices/userSlice';

const Offices = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [blockOfficeModal, setBlockOfficeModal] = useState(false);
  const [unblockOfficeModal, setUnblockOfficeModal] = useState(false);
  const [reviewOfficeModal, setReviewOfficeModal] = useState(false);
  const [filtersSidebar, setFiltersSidebar] = useState(false);

  const [offices, setOffices] = useState({});

  const fetchOffices = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/offices?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((response) => {
        setOffices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchOffices(1, 10);
  }, []);

  const columns = [
    { field: 'location', headerName: 'Location', width: 200 },
    { field: 'office_name', headerName: 'Office Name', width: 150 },
    { field: 'latest_review', headerName: 'Latest Review', width: 150 },
    { field: 'review_date', headerName: 'Review Date', width: 150 },
    {
      field: 'actions',
      headerName: '',
      width: 150,
    },
  ];

  const rows = offices?.data?.map((item) => {
    return {
      id: item.id,
      location: item?.latest_owner_review?.user_location?.place_name ? item.latest_owner_review.user_location.place_name : '-',
      office_name: item.company_name,
      latest_review: item.last_review_at ? item.last_review_at : '-',
      review_date: item.latest_owner_review ? (
        <StarRating rating={item.latest_owner_review} />
      ) : (
        '-'
      ),
      actions: (
        <div
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            justifyContent: 'end',
          }}
        >
          {item.is_blocked === 0 && (
            <Button
              style={{
                border: '1px solid #2561B0',
                color: '#595959',
                backgroundColor: '#fff',
              }}
              onClick={() => {
                setSelectedItem(item);
                setReviewOfficeModal(true);
              }}
            >
              Review
            </Button>
          )}
          <Button
            style={{
              border: '1px solid #2561B0',
              color: '#fff',
              backgroundColor: '#2561B0',
            }}
            onClick={
              item.is_blocked
                ? () => {
                  setSelectedItem(item);
                  setUnblockOfficeModal(true);
                }
                : () => {
                  setSelectedItem(item);
                  setBlockOfficeModal(true);
                }
            }
          >
            {item.is_blocked === 0 ? 'Block' : 'Unlock'}
          </Button>
        </div>
      ),
      ...item,
    };
  });



  return (
    <>
      <MainCard
        title="Offices"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <div
              className='d-flex justify-content-between align-items-center'
              style={{
                padding: '10px 20px',
                backgroundColor: '#F5F5F5',
                borderBottom: '1px solid #D9D9D9',
              }}
            >
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
                  }}
                >
                  View All Blocked Offices
                </p>
                <GreenSwitch />
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
                </Button>
                <Button
                  style={{
                    border: '1px solid #2561B0',
                    color: '#595959',
                    backgroundColor: '#fff',
                  }}
                >
                  <img src={RefreshIcon} alt='' />
                </Button>
              </div>
            </div>

            <div>
              {offices && offices.data && (
                <CustomDataGrid
                  rows={rows}
                  columns={columns}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  paging={offices.paging}
                />
              )}
            </div>

            {blockOfficeModal && selectedItem && (
              <BlockOfficeModal
                selectedItem={selectedItem}
                open={blockOfficeModal}
                handleClose={() => setBlockOfficeModal(false)}
                fetchData={() => {
                  fetchOffices(1, 10);
                }}
              />
            )}

            {unblockOfficeModal && selectedItem && (
              <UnblockOfficeModal
                selectedItem={selectedItem}
                open={unblockOfficeModal}
                handleClose={() => setUnblockOfficeModal(false)}
                fetchData={() => {
                  fetchOffices(1, 10);
                }}
              />
            )}

            {reviewOfficeModal && selectedItem && (
              <ReviewOfficeModal
                selectedItem={selectedItem}
                open={reviewOfficeModal}
                handleClose={() => setReviewOfficeModal(false)}
                fetchData={() => { }}
              />
            )}

            {filtersSidebar && (
              <OfficesFiltersSidebar
                open={filtersSidebar}
                handleClose={() => setFiltersSidebar(false)}
              />
            )}

          </Grid>
        </Grid>
      </MainCard >
    </>
  );


  // return (
  //   <Layout items={[{ link: '/professional/offices', name: 'Offices' }]}>
  //     <Grid
  //       sx={{
  //         px: 3,
  //         pt: 2,
  //         pb: 1,
  //         borderBottom: '1px solid #D9D9D9',
  //         width: 'auto',
  //       }}
  //     >
  //       <h4 className='pb-0 mb-1' style={{ color: '#262626' }}>
  //         Offices
  //       </h4>
  //       <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>Manage Offices</p>
  //     </Grid>
  //   </Layout>
  // );
};

export default Offices;
