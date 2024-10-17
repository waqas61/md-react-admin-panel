import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


import SubCard from '../../../../ui-component/cards/SubCard';
import MainCard from '../../../../ui-component/cards/MainCard';
import PanelCard from '../../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../../ui-component/cards/CardSecondaryAction';

import Frame from '../../../../assets/images/Frame.png';
import { capitalizeFirstLetter } from '../../../../utils/helper';

import { AddCertificates } from './AddCertificates';
import { gridSpacing } from '../../../../store/constant';

const CertificatesMain = () => {
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [certificates, setCertificates] = useState({});

  const fetchCertificates = () => {
    axios
      .get('https://api.mddentalstaffing.com/api/v1/certificates', {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((res) => {
        setCertificates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCertificates();
  }, []);



  return (
    <>
      <MainCard
        title="My Profile"
        darkTitle=" Add/ Edit Certificates"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>

            {certificates.data && certificates.data?.length === 0 ? (
              <>
                <div style={{ backgroundColor: '#fff', padding: '40px 0 40px 0' }}>
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
                      Add New Certificate
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
                      Сhoose your certificate from the existing
                    </p>
                    <button
                      onClick={() => {
                        setOpen(true);
                      }}
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
                      Select New Certificate
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div
                style={{
                  backgroundColor: '#fff',
                  padding: '20px 0 40px 0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ width: '80%', display: 'flex', flexWrap: 'wrap' }}>
                  {certificates.data &&
                    certificates.data.map((item, index) => (
                      <div
                        style={{
                          backgroundColor: '#FFF6F4',
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
                            {item.document_title}
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




                          {item.certificate_status == 'pending' ? (
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
                                {capitalizeFirstLetter(item.certificate_status)}
                              </button>
                            </>
                          ) : item.certificate_status == 'approved' ? (
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
                                {capitalizeFirstLetter(item.certificate_status)}
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
                                {capitalizeFirstLetter(item.certificate_status)}
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
                            backgroundColor: '#F15642',
                            color: 'white',
                            fontSize: '13.33px',
                          }}
                        >
                          {item.document_title}
                        </button>
                      </div>
                    ))}
                </div>
                <div
                  style={{ display: 'flex', cursor: 'pointer' }}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <AddOutlinedIcon
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
                    Upload Certificate
                  </p>
                </div>
              </div>
            )}
            <AddCertificates
              open={open}
              setOpen={setOpen}
              openAdd={openAdd}
              setOpenAdd={setOpenAdd}
              fetchCertificates={fetchCertificates}
            />
          </Grid>
        </Grid>
      </MainCard >
    </>
  );

};

export default CertificatesMain;
