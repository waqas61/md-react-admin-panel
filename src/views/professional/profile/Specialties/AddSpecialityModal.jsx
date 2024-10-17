import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from 'axios';
import { useEffect } from 'react';
import FormLabel from '@mui/material/FormLabel';

const AddSpecialityModal = ({
  open,
  handleClose,
  subCategories,
  userCategory,
  subCategory,
  userId,
  fetchSpecialties,
}) => {
  const [selectedSubCategories, setSelectedSubCategories] =
    useState(subCategories);

  const [states, setStates] = useState([]);

  useEffect(() => {
    axios.get('https://api.mddentalstaffing.com/api/v1/states').then((res) => {
      setStates(res.data.data);
    });
  }, []);

  const handleAddSpeciality = () => {
    if (selectedSubCategories.length > 0) {
      axios
        .put(
          `https://api.mddentalstaffing.com/api/v1/specialties/${userId}`,
          {
            sub_category_ids: selectedSubCategories.map((sub) => sub.id),
          },
          {
            headers: {
              method: 'PUT',
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
          }
        )
        .then((res) => {
          fetchSpecialties(1, 10);
          handleClose();
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth={10}
    >
      <DialogTitle
        id='alert-dialog-title'
        style={{ fontWeight: 'bold', maxWidth: '800px' }}
      >
        Add Speciality
      </DialogTitle>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex' }}>
          <Box style={{ margin: '10px 20px 20px 0', width: '250px' }}>
            <TextField
              id='outlined-text-input'
              label='Category'
              disabled={true}
              required={false}
              fullWidth
              value={userCategory?.name}
              variant='outlined'
              inputProps={{
                style: {
                  fontSize: '16px',
                  fontWeight: '400',
                  padding: '10px',
                },
              }}
            />
            {subCategory && subCategory.length > 0 && (
              <FormControl fullWidth style={{ marginTop: '20px' }}>
                <InputLabel
                  id='sub-category'
                  style={{
                    fontSize: '16px',
                    fontWeight: '400',
                    padding: '0px',
                    maxWidth: '250px',
                    textAlign: 'left',
                  }}
                >
                  Sub Category
                </InputLabel>
                <Select
                  label='Sub Category'
                  placeholder='Sub Category'
                  labelId='sub-category'
                  id='sub-category'
                  MenuProps={{
                    style: {
                      fontSize: '16px',
                      fontWeight: '400',
                      padding: '0px',
                      maxWidth: '250px',
                      maxHeight: '300px',
                      textAlign: 'left',
                    },
                  }}
                  inputProps={{
                    style: {
                      fontSize: '16px',
                      fontWeight: '400',
                      padding: '10px',
                      maxWidth: '250px',
                      maxHeight: '300px',
                      textAlign: 'left',
                    },
                  }}
                >
                  {subCategory
                    .filter(
                      (sub) =>
                        !selectedSubCategories.find(
                          (selected) => selected.id === sub.id
                        )
                    )
                    .map((sub) => (
                      <MenuItem
                        key={sub.id}
                        value={sub}
                        style={{
                          fontSize: '16px',
                          fontWeight: '400',
                          padding: '10px',
                          width: '250px',
                          textAlign: 'left',
                        }}
                        onClick={() => {
                          setSelectedSubCategories([
                            ...selectedSubCategories,
                            sub,
                          ]);
                        }}
                      >
                        {sub?.name}
                      </MenuItem>
                    ))}
                </Select>
                <div
                  style={{
                    // marginLeft: '10px',
                    // marginRight: '10px',
                    backgroundColor: '#FFF8E1',
                    padding: '8px',
                    borderRadius: '6px',
                    display: 'flex',
                    marginTop: '5px'
                  }}
                >
                  <FormLabel
                    id='demo-radio-buttons-group-label'
                    required={true}
                    style={{ fontSize: '14px' }}
                  >
                    Select all that apply.
                  </FormLabel>
                </div>
                <div >

                </div>

              </FormControl>
            )}
          </Box>
          <div
            style={{
              marginLeft: '10px',
              marginRight: '10px',
              backgroundColor: '#FFF8E1',
              padding: '20px',
              borderRadius: '6px',
              display: 'flex',
              width: '380px',
            }}
          >
            <InfoOutlinedIcon
              style={{ color: '#FFC400', marginRight: '20px' }}
            />
            <div>
              <h1
                style={{
                  color: '#B28900',
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'Roboto',
                }}
              >
                Attention!
              </h1>
              <p
                style={{
                  fontSize: '12px',
                  lineHeight: '20px',
                  fontFamily: 'Roboto',
                  color: '#B28900',
                }}
              >
                Please Select subcategories that you feel comfortable working
                within. <br />{' '}
                <strong>
                  Ex: RDAEF click on the RDA and DA instead of just RDAEF
                </strong>
              </p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {selectedSubCategories.length > 0 &&
            selectedSubCategories.map((arr, index) => (
              <button
                style={{
                  border: '1px solid #2561B0',
                  backgroundColor: '#2561B0',
                  padding: '1px 8px 1px 8px',
                  borderRadius: '16px',
                  gap: '5px',
                  fontSize: '12px',
                  fontWeight: '400',
                  color: '#fff',
                  fontFamily: 'Roboto',
                  display: 'flex',
                  flexWrap: 'wrap',
                  marginTop: '10px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '7px',
                }}
              >
                {arr?.name}{' '}
                <CloseOutlinedIcon
                  onClick={() => {
                    const temp = [...selectedSubCategories];
                    temp.splice(index, 1);
                    setSelectedSubCategories(temp);
                  }}
                  style={{
                    color: 'hsl(0, 0%, 50%)',
                    padding: '1px',
                    borderRadius: '50%',
                    backgroundColor: '#D9D9D9',
                    fontSize: '15px',
                  }}
                />{' '}
              </button>
            ))}
        </div>
        <FormGroup
          style={{
            maxwidth: '560px',
            minWidth: '300px',
            width: '560px',
            marginTop: '20px',
          }}
        >
          <FormControlLabel
            style={{
              fontSize: '0.9rem',
              fontWeight: '400',
              fontFamily: 'Roboto',
              color: '#595959',
              lineHeight: '20px',
              textAlign: 'left',
              display: 'flex',
              gap: '10px',
            }}
            control={<Checkbox />}
            label='I verify I am fully certified to practice in the following states and have no violations or restrictions against my license'
          />
        </FormGroup>

        <FormControl fullWidth style={{ marginTop: '20px', width: '250px' }}>
          <InputLabel id='demo-simple-select-label'> States</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='States'
            placeholder='States'
            MenuProps={{
              style: {
                fontSize: '16px',
                fontWeight: '400',
                padding: '10px',
                maxWidth: '250px',
                maxHeight: '300px',
                textAlign: 'left',
              },
            }}
            inputProps={{
              style: {
                fontSize: '16px',
                fontWeight: '400',
                padding: '10px',
                maxWidth: '250px',
                maxHeight: '300px',
                textAlign: 'left',
              },
            }}
          >
            {states &&
              states.map((arr) => (
                <MenuItem
                  key={arr.id}
                  value={arr}
                  style={{
                    fontSize: '16px',
                    fontWeight: '400',
                    padding: '10px',
                    width: '250px',
                    textAlign: 'left',
                  }}
                >
                  {arr?.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <div
          style={{
            marginTop: '20px',
            backgroundColor: '#FFF8E1',
            padding: '20px',
            borderRadius: '6px',
            display: 'flex',
            width: '660px',
          }}
        >
          <InfoOutlinedIcon style={{ color: '#FFC400', marginRight: '20px' }} />
          <div>
            <h1
              style={{
                color: '#B28900',
                fontSize: '14px',
                fontWeight: '500',
                fontFamily: 'Roboto',
              }}
            >
              Attention!
            </h1>
            <p
              style={{
                fontSize: '12px',
                lineHeight: '20px',
                fontFamily: 'Roboto',
                color: '#B28900',
              }}
            >
              Please visit Add/Edit Certificates section to upload
              licenses/certificates. Your status will be pending review by
              Mayday Dental
            </p>
          </div>
        </div>
      </div>
      <DialogActions
        style={{
          display: 'flex',
          padding: '10px 30px',
        }}
      >
        <Button
          style={{
            background: 'none',
            border: 'none',
            color: '#2561B0',
            fontWeight: '500',
            fontSize: '16px',
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          style={{
            background: 'none',
            border: 'none',
            color: '#2561B0',
            fontWeight: '500',
            fontSize: '16px',
          }}
          disabled={selectedSubCategories.length === 0}
          onClick={() => {
            handleAddSpeciality();
          }}
          autoFocus
        >
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSpecialityModal;
