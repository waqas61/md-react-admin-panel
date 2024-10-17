import { useState } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

import Vaccines from '../../../../ui-component/Vaccines';

import other from '../../../../assets/images/other.png';
import HBV from '../../../../assets/images/HBV.png';
import COV from '../../../../assets/images/COV.png';

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

export const AddVaccines = ({
  open,
  setOpen,
  fetchVaccines,
  setSuccessOpen,
}) => {
  const [type, setType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [userVaccination, setUserVaccination] = useState('received');
  const [vaccineName, setVaccineName] = useState('');

  const [openAdd, setOpenAdd] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('type', type);
    if (selectedFile) {
      formData.append('upload_file', selectedFile);
    }
    formData.append('user_vaccination', userVaccination);
    if (vaccineName) {
      formData.append('vaccine_name', vaccineName);
    }

    axios
      .post('https://api.mddentalstaffing.com/api/v1/vaccines', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((res) => {
        setOpenAdd(false);
        setOpen(false);
        setSuccessOpen(true);
        fetchVaccines();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          Сhoose Vaccine From The Existing
        </DialogTitle>
        <div style={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '48%' }}
          >
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
              {/* Mandatory Forms */}
            </DialogTitle>
            <div style={{ display: 'flex', padding: '3px 20px' }}>
              <img
                onClick={() => {
                  setType('hbv');
                }}
                style={{
                  height: '158px',
                  width: '122px',
                  marginRight: '10px',
                  cursor: 'pointer',
                  border: `${type === 'hbv' ? '2px solid #2561B0' : ''}`,
                }}
                src={Vaccines('HBV')}
                alt=''
                srcset=''
              />
              <img
                onClick={() => {
                  setType('cov');
                }}
                style={{
                  height: '158px',
                  width: '122px',
                  cursor: 'pointer',
                  marginRight: '10px',
                  border: `${type === 'cov' ? '2px solid #2561B0' : ''}`,
                }}
                src={Vaccines('COV')}
                alt=''
                srcset=''
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '1px dotted #BFBFBF',
            }}
          ></div>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '48%' }}
          >
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
              {/* Optional */}
            </DialogTitle>
            <div style={{ display: 'flex', padding: '3px 20px' }}>
              <img
                onClick={() => {
                  setType('other');
                }}
                style={{
                  height: '158px',
                  cursor: 'pointer',
                  width: '122px',
                  border: `${type === 'other' ? '2px solid #2561B0' : ''}`,
                }}
                src={Vaccines('on')}
                alt=''
                srcset=''
              />
            </div>
          </div>
        </div>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>cancel</Button>
          <Button
            disabled={type === ''}
            onClick={() => setOpenAdd(true)}
            autoFocus
          >
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>

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
          {`${type === 'hbv'
            ? 'Hepatitis B'
            : type === 'cov'
              ? 'COVID-19'
              : type === 'other'
                ? 'Other'
                : ''
            } Vaccine Verification`}
        </DialogTitle>
        <div
          style={{
            padding: '0 25px',
          }}
        >
          <p
            style={{ fontSize: '12px', fontWeight: '400', marginRight: '15px' }}
          >
            Status
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
        <p
          style={{
            fontSize: '14px',
            fontWeight: '400',
            marginRight: '15px',
            padding: '15px 25px',
          }}
        >
          {type === 'hbv'
            ? 'I understand that due to my occupational exposure to blood or other potential infectious materials I may be at risk of HBV (Hepatitis B Virus) infection while I work in various dental offices on a temporary assignment.'
            : type === 'cov'
              ? 'I understand that due to my occupational exposure to patients, I may be at risk of Corona Virus (Covid-19) while I work in various dental offices on a temporary assignment.'
              : type === 'other'
                ? 'I understand that due to my occupational exposure to patients, I may be at risk of other diseases while I work in various dental offices on a temporary assignment.'
                : ''}
        </p>
        <div style={{ padding: '20px 23px' }}>
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
              label={`
              ${type === 'hbv'
                  ? 'Hepatitis B'
                  : type === 'cov'
                    ? 'COVID-19'
                    : type === 'other'
                      ? 'Other'
                      : ''
                } Vaccination Record (Optional):`}
              variant='standard'
              style={{ width: '270px', paddingTop: '8px' }}
              value={vaccineName}
              onChange={(e) => setVaccineName(e.target.value)}
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
        </div>

        <FormControl
          style={{
            display: 'flex',
            padding: '0 25px',
          }}
        >
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='received'
            name='radio-buttons-group'
            value={userVaccination}
            onChange={(e) => setUserVaccination(e.target.value)}
          >
            <FormControlLabel
              value='received'
              control={<Radio />}
              label={`I have received the 
              (${type === 'hbv'
                  ? 'Hepatitis B'
                  : type === 'cov'
                    ? 'COVID-19'
                    : type === 'other'
                      ? 'Other'
                      : ''
                })
              vaccine.`}
            />
            <FormControlLabel
              value='not_received'
              control={<Radio />}
              label={`I have not received the
              (${type === 'hbv'
                  ? 'Hepatitis B'
                  : type === 'cov'
                    ? 'COVID-19'
                    : type === 'other'
                      ? 'Other'
                      : ''
                })
              vaccine.`}
            />
            <FormControlLabel
              value='receiving'
              control={<Radio />}
              label={`I am currently receiving the
              (${type === 'hbv'
                  ? 'Hepatitis B'
                  : type === 'cov'
                    ? 'COVID-19'
                    : type === 'other'
                      ? 'Other'
                      : ''
                })
              vaccine.`}
            />
          </RadioGroup>
        </FormControl>

        <div
          style={{
            display: 'flex',
            padding: '15px 20px',
          }}
        >
          <Checkbox checked={true} style={{ color: '#2561B0' }} />
          <p
            style={{
              fontSize: '14px',
              fontWeight: '400',
              marginRight: '15px',
              color: '#595959',
            }}
          >
            I understand that I must comply with all federal, state, and county mandates for COVID-19 and Hepatitis B vaccination status in location of my assignment.
          </p>
        </div>
        <DialogActions
          style={{
            display: 'flex',
            padding: '20px 25px',
          }}
        >
          <Button onClick={() => setOpenAdd(false)}>cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
