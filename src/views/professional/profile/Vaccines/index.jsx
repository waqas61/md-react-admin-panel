import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';

import { AddOutlined } from '@mui/icons-material';


import SubCard from '../../../../ui-component/cards/SubCard';
import MainCard from '../../../../ui-component/cards/MainCard';
import PanelCard from '../../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../../ui-component/cards/CardSecondaryAction';

import SuccessModal from '../../../../ui-component/SuccessModal';
import Frame from '../../../../assets/images/Frame.png';
import { capitalizeFirstLetter } from '../../../../utils/helper';


import { gridSpacing } from '../../../../store/constant';
import { selectUser } from '../../../../store/slices/userSlice';

import { AddVaccines } from './AddVaccines';


const VaccinesMain = () => {
  const [vaccines, setVaccines] = useState([]);
  const [openAddVaccinesModal, setOpenAddVaccinesModal] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const fetchVaccines = () => {
    axios
      .get('https://api.mddentalstaffing.com/api/v1/vaccines', {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((res) => {
        setVaccines(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchVaccines();
  }, []);




  return (
    <>
      <MainCard
        title=" My Account"
        darkTitle="Add / Edit Vaccines"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>

            {vaccines && vaccines.data && vaccines.data.length > 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  padding: '20px',
                  gap: '25px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '25px',
                  }}
                >
                  {vaccines.data.map((vaccine) => (
                    <VaccineTemplate vaccine={vaccine} />
                  ))}
                </div>
                <div
                  style={{ display: 'flex', cursor: 'pointer' }}
                  onClick={() => {
                    setOpenAddVaccinesModal(true);
                  }}
                >
                  <AddOutlined
                    style={{
                      backgroundColor: '#F5F5F5',
                      borderRadius: '4px',
                      color: '#000',
                      fontSize: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                      cursor: 'pointer',
                    }}
                  />
                  <p
                    style={{
                      color: '#8C8C8C',
                      fontSize: '12px',
                      fontWeight: '400',
                    }}
                  >
                    Upload Vaccine
                  </p>
                </div>
              </div>
            ) : (
              <>
                {vaccines && vaccines.data && vaccines.data.length === 0 && (
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
                          Add New Vaccine
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
                          Сhoose your vaccination certificate from the existing
                        </p>
                        <button
                          onClick={() => setOpenAddVaccinesModal(true)}
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
                          Select New Vaccine
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
            {openAddVaccinesModal && (
              <AddVaccines
                open={openAddVaccinesModal}
                setOpen={setOpenAddVaccinesModal}
                fetchVaccines={fetchVaccines}
                setSuccessOpen={setSuccessOpen}
              />
            )}
            {successOpen && (
              <SuccessModal
                open={successOpen}
                successMessage='Vaccine added successfully'
                handleClose={() => setSuccessOpen(false)}
              />
            )}
          </Grid>
        </Grid>
      </MainCard >
    </>
  );






};

export default VaccinesMain;

const VaccineTemplate = ({ vaccine }) => {
  return (
    <div
      style={{
        backgroundColor:
          vaccine.type === 'hbv'
            ? '#EFF2FF'
            : vaccine.type === 'cov'
              ? '#FFEFEF'
              : '#E2E5E7',
        padding: '10px 10px 20px 10px',
        width: '196px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0px 20px 10px 20px',
        borderRadius: '4px',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex' }}>
        <p
          style={{
            color: '#8C8C8C',
            fontSize: '14px',
            marginRight: '10px',
            fontWeight: '400',
          }}
        >
          Type:
        </p>
        <p
          style={{
            fontWeight: '400',
            fontSize: '14px',
            color: '#262626',
          }}
        >
          {vaccine.type.toUpperCase()}
        </p>
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <p
          style={{
            color: '#8C8C8C',
            fontSize: '14px',
            marginRight: '10px',
            fontWeight: '400',
          }}
        >
          Required:
        </p>
        <p
          style={{
            fontWeight: '400',
            fontSize: '14px',
            color: '#262626',
          }}
        >
          Yes
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '10px',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            color: '#8C8C8C',
            fontSize: '14px',
            marginRight: '10px',
            fontWeight: '400',
          }}
        >
          Status:
        </p>

        {vaccine.vaccine_status == 'pending' ? (
          <>
            <button
              style={{
                fontWeight: '400',
                fontSize: '12px',
                borderRadius: '16px',
                padding: '1px 8px 1px 8px',
                backgroundColor: '#FAAD14',
                color: 'black',
                border: '1px solid #FAAD14',
              }}
            >
              {capitalizeFirstLetter(vaccine.vaccine_status)}
            </button>
          </>
        ) : vaccine.vaccine_status == 'approved' ? (
          <>
            <button
              style={{
                fontWeight: '400',
                fontSize: '12px',
                borderRadius: '16px',
                padding: '1px 8px 1px 8px',
                backgroundColor: '#4CAF50',
                color: 'black',
                border: '1px solid #4CAF50',
              }}
            >
              {capitalizeFirstLetter(vaccine.vaccine_status)}
            </button>
          </>
        ) : (
          <>
            <button
              style={{
                fontWeight: '400',
                fontSize: '12px',
                borderRadius: '16px',
                padding: '1px 8px 1px 8px',
                backgroundColor: '#E54C0B',
                color: 'white',
                border: '1px solid #E54C0B',
              }}
            >
              {capitalizeFirstLetter(vaccine.vaccine_status)}
            </button>
          </>
        )}


      </div>
      <button
        style={{
          position: 'absolute',
          top: '20px',
          right: '-20px',
          border: 'none',
          backgroundColor:
            vaccine.type === 'hbv'
              ? '#6678D4'
              : vaccine.type === 'cov'
                ? '#C90000'
                : '#000000',
          color: 'white',
          fontSize: '13.33px',
        }}
      >
        {vaccine.type.toUpperCase()}
      </button>
    </div>
  );
};
