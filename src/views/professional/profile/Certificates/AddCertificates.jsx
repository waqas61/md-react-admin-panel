import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import moment from 'moment';
import Certificates from '../../../../ui-component/Certificates';
import Vaccines from '../../../../ui-component/Vaccines';
import { gridSpacing } from '../../../../store/constant';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export const AddCertificates = ({
  open,
  setOpen,
  openAdd,
  setOpenAdd,
  fetchCertificates,
}) => {
  const [addCertificates, setAddCertificates] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [certificateList, setCertificateList] = useState([]);
  const [comments, setComments] = useState('');
  const [documentTitle, setDocumentTitle] = useState(null);

  const fetchCertificateList = () => {
    axios
      .get('https://api.mddentalstaffing.com/api/v1/certificates/list', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((res) => {
        setCertificateList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('certificate_id', addCertificates.id);
    formData.append('document_title', documentTitle);
    formData.append('expired_at', moment(selectedDate).format('YYYY-MM-DD'));
    formData.append('upload_file', selectedFile);
    formData.append('comments', comments);

    axios
      .post('https://api.mddentalstaffing.com/api/v1/certificates', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((res) => {
        setOpenAdd(false);
        fetchCertificates();
        setAddCertificates('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCertificateList();
  }, []);


  useEffect(() => {
    // console.log('xx addCertificates', addCertificates, documentTitle);
  }, [addCertificates, openAdd]);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        maxWidth='md'
        fullWidth
      >
        <DialogTitle
          id='alert-dialog-title'
          style={{ fontWeight: '500', fontSize: '20px' }}
        >
          Choose certificate from the existing
        </DialogTitle>
        <div style={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {certificateList && certificateList?.mandatory?.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <DialogTitle
                id='alert-dialog-title'
                style={{
                  fontWeight: '500',
                  fontSize: '16px',
                  paddingTop: 0,
                  color: '#FA5A16',
                  marginTop: 0,
                }}
              >
                Mandatory certificates
              </DialogTitle>
              <div style={{ display: 'flex', padding: '3px 20px' }}>
                {certificateList.mandatory.map((item) => (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginRight: '10px',
                      cursor: 'pointer',
                    }}
                    key={item.id}
                    onClick={() => {
                      setAddCertificates(item);
                    }}
                  >

                    <img
                      onClick={() => {
                        setAddCertificates({
                          ...addCertificates,
                          [item.name]: !addCertificates[item.name],
                        });
                      }}
                      style={{
                        width: '92px',
                        border: `1px solid ${addCertificates.name === item.name
                          ? '#2561B0'
                          : '#fff'
                          }`,
                        objectFit: 'contain',
                      }}
                      // src={`https://api.mddentalstaffing.com/api/v1/assets/certificates/${item.name}.png`}
                      src={Certificates(item.name)}
                      alt=''
                      srcset=''
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {certificateList && certificateList?.optional?.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <DialogTitle
                id='alert-dialog-title'
                style={{
                  fontWeight: '500',
                  fontSize: '16px',
                  paddingTop: 0,
                  color: '#BFBFBF',
                  marginTop: 0,
                }}
              >
                Optional
              </DialogTitle>
              <div style={{ display: 'flex', padding: '3px 20px' }}>
                {certificateList.optional.map((item) => (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginRight: '10px',
                      cursor: 'pointer',
                    }}
                    key={item.id}
                    onClick={() => {
                      setAddCertificates(item);
                    }}
                  >

                    <div style={{
                      height: '134px;',
                      width: '134px;',
                      borderTopRightRadius: '3px;',
                      borderTopLeftRadius: '3px;',
                    }}>
                      <img
                        onClick={() => {
                          // setAddCertificates({
                          //   ...addCertificates,
                          //   [item.name]: !addCertificates[item.name],
                          // });

                        }}
                        style={{
                          width: '92px',
                          border: `1px solid ${addCertificates.name === item.name
                            ? '#2561B0'
                            : '#fff'
                            }`,
                          objectFit: 'contain',
                        }}
                        // src={`https://api.mddentalstaffing.com/api/v1/assets/${item.name}`}
                        src={Certificates(item.name)}
                        alt=''
                        srcset=''
                      />
                      {/* <h5 style={{
                        padding: '2px',
                        backgroundColor: "#a1b8f3",
                        color: 'white'
                      }}>
                        {item.name}
                      </h5> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>cancel</Button>
          <Button
            disabled={
              addCertificates.name === undefined ||
              addCertificates.name === null ||
              addCertificates.name === ''
            }

            onClick={() => {
              setOpen(false);
              setOpenAdd(true);
              setDocumentTitle(addCertificates.name !== 'Other' ? addCertificates.name : null);
            }}
            autoFocus
          >
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog >

      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        fullWidth
      >
        <DialogTitle
          id='alert-dialog-title'
          style={{ fontWeight: '500', fontSize: '20px' }}
        >
          {`${addCertificates.name} Certificates`}
        </DialogTitle>
        <div
          style={{ display: 'flex', alignItems: 'center', padding: '0 25px' }}
        >
          <p
            style={{ fontSize: '12px', fontWeight: '400', marginRight: '15px' }}
          >
            Status:
          </p>
          <button
            style={{
              borderRadius: '16px',
              backgroundColor: '#F5F5F5',
              color: '#000000',
              border: '1px solid #BFBFBF',
              padding: '1px 8px',
              fontSize: '12px',
            }}
            disabled={true}
          >
            None
          </button>
        </div>
        <div style={{ padding: '20px 23px' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TextField
              disabled={addCertificates.name !== 'Other' ? true : false}
              id='outlined-disabled'
              label='Document Title'
              defaultValue={documentTitle}

              onChange={(e) => {
                setDocumentTitle(e.target.value);
              }}
              style={{ width: '270px', paddingTop: '8px' }}
            />
            <LocalizationProvider
              style={{ width: '300px', marginTop: '0', paddingTop: '0px' }}
              dateAdapter={AdapterDayjs}
            >
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label='Document Expiration'
                  onChange={handleDateChange}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <TextField
              id='standard-read-only-input'
              label='Upload Your Document'
              required={true}
              InputProps={{
                readOnly: true,
              }}
              value={selectedFile?.name}
              defaultValue={selectedFile?.name}
              variant='standard'
              style={{ width: '270px', paddingTop: '8px' }}
            />
            <div
              style={{
                display: 'flex',
                width: '245px',
                justifyContent: 'space-between',
              }}
            >
              <Button
                component='label'
                style={{ backgroundColor: '#2561B0', borderRadius: '4px' }}
                variant='contained'
              >
                Upload/ Edit
                <VisuallyHiddenInput type='file' onChange={handleFileChange} />
              </Button>
              <button
                style={{
                  border: '1px solid #2561B0',
                  padding: '8px 30px 8px 30px',
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  color: '#2561B0',
                  fontSize: '14px',
                }}
              >
                View
              </button>
            </div>
          </div>
          <textarea
            name=''
            id=''
            style={{
              width: '100%',
              border: '1px solid #BFBFBF',
              marginTop: '20px',
              padding: '10px 14px',
              fontSize: '14px',
              fontWeight: '400',
              fontFamily: 'Roboto',
            }}
            rows='6'
            placeholder=''
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </div>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>cancel</Button>
          <Button
            onClick={handleSubmit}
            autoFocus
            disabled={selectedFile === null || selectedDate === null || documentTitle === null || documentTitle === '' || documentTitle === undefined}
          >
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
