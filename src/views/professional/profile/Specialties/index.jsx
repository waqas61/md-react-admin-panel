import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Grid, Button } from '@mui/material';


import SubCard from '../../../../ui-component/cards/SubCard';
import MainCard from '../../../../ui-component/cards/MainCard';
import PanelCard from '../../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../../ui-component/cards/CardSecondaryAction';

import SpecialitiesDataGrid from './SpecialitiesDataGrid';
import { DeleteSpeciality } from './DeleteSpeciality';
import AddSpecialityModal from './AddSpecialityModal';


import Frame from '../../../../assets/images/Frame.png';


import { gridSpacing } from '../../../../store/constant';
import { selectUser } from '../../../../store/slices/userSlice';

const Specialities = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddSpecialityModal, setOpenAddSpecialityModal] = useState(false);

  const currentUser = useSelector(selectUser);
  const [userCategory, setUserCategory] = useState({});
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    if (userCategory?.name) {
      const API_BASE_URL = 'https://api.mddentalstaffing.com/api/v1';
      axios
        .get(`${API_BASE_URL}/subCategories?name=${userCategory?.name}`, {
          headers: {
            method: 'GET',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        })
        .then((res) => {
          setSubCategory(res.data.data);
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  }, [userCategory]);

  useEffect(() => {
    const API_BASE_URL = 'https://api.mddentalstaffing.com/api/v1';
    axios
      .get(`${API_BASE_URL}/categories`, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((res) => {
        const userCategory = res.data.data.filter(
          (category) => category.id === currentUser.category_id
        );
        setUserCategory(userCategory[0]);
      })
      .catch((err) => {
        throw new Error(err);
      });
    //eslint-disable-next-line
  }, []);

  const fetchSpecialties = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/specialties?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((res) => {
        setSpecialties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchSpecialties(1, 10);
  }, []);

  const columns = [
    { field: 'place_name', headerName: 'Category', width: 150 },
    { field: 'address', headerName: 'Sub-Category', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];





  return (
    <>
      <MainCard
        title="My Account"
        darkTitle="Add / Edit Specialties"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            {specialties && specialties.data && specialties.data.length > 0 ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    gap: 20,
                    backgroundColor: '#F5F5F5',
                    padding: '12px 20px',
                    borderBottom: '1px solid #D9D9D9',
                  }}
                >
                  <Button
                    variant='outlined'
                    style={{
                      border: '1px solid #2561B0',
                      color: '#595959',
                      backgroundColor: '#fff',
                    }}
                    onClick={() => setOpenAddSpecialityModal(true)}
                  >
                    Add Specialty
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
                    disabled={
                      selectedItem === null ||
                      selectedItem.posting_status === 'cancelled'
                    }
                    onClick={() => setOpenDeleteModal(true)}
                  >
                    Delete Speciality
                  </Button>

                  <Button
                    variant='outlined'
                    style={{
                      border:
                        selectedItem != null
                          ? '1px solid #2561B0'
                          : '1px solid #D9D9D9',
                      color: selectedItem != null ? '#595959' : '#BFBFBF',
                      backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
                    }}
                    disabled={selectedItem == null}
                    onClick={() => navigate('/professional/account/specialties/edit')}
                  >
                    Edit Questionnaire
                  </Button>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                  }}
                >
                  <div
                    style={{
                      border: '1px solid #D9D9D9',
                      borderRadius: '10px',
                      width: '100%',
                      backgroundColor: '#fff',
                    }}
                  >
                    {specialties && specialties.data && (
                      <SpecialitiesDataGrid
                        columns={columns}
                        paging={specialties.paging}
                        rows={specialties.data}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        fetchData={fetchSpecialties}
                      />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {specialties && specialties.data && specialties.data.length === 0 && (
                  <>
                    <div
                      style={{ backgroundColor: '#fff', padding: '40px 0 40px 0' }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                        }}
                      >
                        <img
                          src={Frame}
                          style={{ height: '236px', width: '241px', opacity: '30%' }}
                          alt=''
                          srcset=''
                        />
                        <h1
                          style={{
                            fontSize: '30px',
                            fontWeight: '400',
                            textAlign: 'center',
                            color: '#D9D9D9',
                          }}
                        >
                          Add New Specialties
                        </h1>
                        <p
                          style={{
                            fontSize: '14px',
                            fontWeight: '400',
                            textAlign: 'center',
                            color: '#BFBFBF',
                            padding: '10px 0 20px 0',
                          }}
                        >
                          Сhoose your Speciality
                        </p>
                        <button
                          onClick={() => setOpenAddSpecialityModal(true)}
                          style={{
                            backgroundColor: '#2561B0',
                            padding: '8px 30px 8px 30px',
                            borderRadius: '4px',
                            textAlign: 'center',
                            fontSize: '16px',
                            fontWeight: '400',
                            border: '1px solid #2561B0',
                            color: '#fff',
                          }}
                        >
                          Add New Speciality
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
            {openDeleteModal && selectedItem && (
              <DeleteSpeciality
                deleteOpen={openDeleteModal}
                handleDeleteClose={() => setOpenDeleteModal(false)}
                selectedItem={selectedItem}
                fetchSpecialties={fetchSpecialties}
              />
            )}
            {openAddSpecialityModal && specialties && (
              <AddSpecialityModal
                handleClose={() => setOpenAddSpecialityModal(false)}
                open={openAddSpecialityModal}
                subCategories={specialties.data.map(
                  (specialty) => specialty.sub_category
                )}
                subCategory={subCategory}
                userCategory={userCategory}
                userId={currentUser.id}
                fetchSpecialties={fetchSpecialties}
              />
            )}
          </Grid>
        </Grid>
      </MainCard >
    </>
  );





};

export default Specialities;
