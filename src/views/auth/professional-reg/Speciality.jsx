

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  Select,
} from '@mui/material';


import { selectUser, setUser } from '../../../store/slices/userSlice';

//Step 2
export default function Speciality({ setActiveStep }) {
  const user = useSelector(selectUser);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [isVerified, setIsVerified] = useState(null);
  const [selectedStates, setSelectedStates] = useState([]);
  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [verificationOption, setVerificationOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [categoryValue, setCategoryValue] = useState('');
  const [subCategoryValue, setSubCategoryValue] = useState('');

  const authToken = localStorage.getItem('auth_token');
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setCategoryValue(user.category_id);
      setSubCategoryValue(user.user_sub_categories.map((usb) => usb.id));
      setSelectedSubCategories(user.user_sub_categories.map((usb) => usb.id));
    }
  }, [user]);

  useEffect(() => {
    fetch('https://api.mddentalstaffing.com/api/v1/states')
      .then((response) => response.json())
      .then((data) => {
        setStates(data.data);
      })
      .catch((error) => console.error('Error fetching states:', error));
  }, []);

  useEffect(() => {
    fetch('https://api.mddentalstaffing.com/api/v1/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, [categoryValue]);

  useEffect(() => {
    if (selectedCategory) {
      fetch(
        `https://api.mddentalstaffing.com/api/v1/subCategories?name=${categories[selectedCategory - 1].name
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          setSubCategories(data.data);
        })
        .catch((error) =>
          console.error('Error fetching subcategories:', error)
        );
    }
  }, [categories, selectedCategory, categoryValue]);

  const handleNextClick = async () => {
    setIsLoading(true);
    const category_id = selectedCategory;
    const is_certificate_required = isVerified ? true : false;
    const sub_category_ids = selectedSubCategories.join(',');
    const state_ids = selectedStates.join(',');
    const steps_completed = 2;
    const apiUrl = `https://api.mddentalstaffing.com/api/v1/signup/profile/speciality`;

    let requestData = {
      category_id,
      is_certificate_required,
      sub_category_ids,
      steps_completed,
    };

    if (isVerified) {
      requestData = {
        ...requestData,
        state_ids,
      };
    }

    await axios
      .post(
        apiUrl,
        { ...requestData },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data.data));
        dispatch(setUser(response.data.data));
        setActiveStep((state) => state + 1);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
    setIsLoading(false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCategoryValue(event.target.value);
    setSelectedSubCategories([]); // Reset selected subcategories when category changes
  };

  const handleVerificationChange = (event) => {
    const value = event.target.value === 'yes';
    setVerificationOption(value);
    setIsVerified(value);
    console.log(verificationOption, isVerified);
  };

  const handleStateSelect = (event) => {
    let selectedState = event.target.value;
    console.log(selectedState.toString());
    if (!selectedStates.includes(selectedState)) {
      setSelectedStates([...selectedStates, selectedState]);
    }
    console.log(selectedStates);
  };

  const handlePillRemoveState = (index) => {
    const updatedStates = [...selectedStates];
    updatedStates.splice(index, 1);
    setSelectedStates(updatedStates);
  };

  const handleSubCategorySelect = (event) => {
    const selectedSubCategory = event.target.value;
    if (!selectedSubCategories.includes(selectedSubCategory)) {
      setSelectedSubCategories([...selectedSubCategories, selectedSubCategory]);
    }
  };

  const handlePillRemove = (index) => {
    const updatedSubCategories = [...selectedSubCategories];
    updatedSubCategories.splice(index, 1);
    setSelectedSubCategories(updatedSubCategories);
  };

  return (
    <>
      <Typography variant="h5" component="h5" sx={{ mt: 2 }}>
        Speciality
      </Typography>

      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
          >
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
              >
                <FormControl size='small' variant='outlined' fullWidth>
                  <InputLabel id='category-label'>Category</InputLabel>
                  <Select
                    labelId='category-label'
                    fullWidth
                    id='category'
                    label='Category'
                    size="small"
                    value={categoryValue}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
              >
                <FormControl size='small' variant='outlined' fullWidth>
                  <InputLabel id='sub-category-label'>Sub Category</InputLabel>
                  <Select
                    fullWidth
                    labelId='sub-category-label'
                    id='subCategory'
                    size="small"
                    label='Sub Category'
                    value={selectedSubCategories}
                    onChange={handleSubCategorySelect}
                  >
                    {subCategories.map((subCategory) => (
                      <MenuItem key={subCategory.id} value={subCategory.id}>
                        {subCategory.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
          >
            {selectedCategory && (
              <>
                <Box sx={{ color: '#B28900', backgroundColor: '#FFF8E1', p: 5 }}>
                  <span className='fw-semibold'>Attention!</span>
                  <p className='small'>
                    Please click on all subcategories that you feel comfortable
                    working within. <br />
                    {selectedCategory === 1 ? (
                      <span className='fw-semibold'>
                        Ex: RDAEF clicks on RDA and DA instead of just RDAEF
                      </span>
                    ) : selectedCategory === 2 ? (
                      <span className='fw-semibold'>
                        Ex: RDHAP clicks on RDH instead of just RDHAP
                      </span>
                    ) : selectedCategory === 3 ? (
                      <span className='fw-semibold'>
                        Ex: OFFICE MANAGER clicks on TREATMWNT COORDINATOR instead
                        of just OFFICE MANAGER
                      </span>
                    ) : selectedCategory === 4 ? (
                      <span className='fw-semibold'>
                        Ex: SPECIALISTS clicks on ORTHODONTIST
                      </span>
                    ) : null}
                  </p>

                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
          >
            {selectedSubCategories.map((subCategory, index) => {
              const foundCategory = subCategories.find(
                (category) => category.id === subCategory
              );

              if (foundCategory) {
                return (
                  <Chip
                    key={index}
                    label={foundCategory.name}
                    onDelete={() => handlePillRemove(index)}
                    color='primary'
                    size='small'
                    className='ms-0 me-1 my-1'
                    style={{ marginRight: '0.3rem' }}
                  />
                );
              }

              return null; // Handle the case where category is not found
            })}
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{ flexGrow: 1, mt: 2, p: 2 }}
        className={`${isVerified === true ? 'hoverRadioBorder' : 'hoverRadioNoBorder'}`}
      >
        <Grid container spacing={3}>

          <Grid
            item
            xs={12}
            sm={12}
            md={1}
          >

            <Radio
              size='small'
              value='yes'
              checked={verificationOption === true}
              onChange={handleVerificationChange}
            />

          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={11}
          >
            <span>
              I verify that I am fully licensed to practice in the following
              states and have no violations or restrictions against my license.
            </span>
          </Grid>
        </Grid>


        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={1}
          >
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
          >
            <FormControl
              size='small'
              variant='outlined'
              fullWidth
            >
              <InputLabel id='select-label'>States</InputLabel>
              <Select
                labelId='select-label'
                id='select'
                value={selectedStates}
                onChange={handleStateSelect}
                label='States'
              >
                {states
                  ? states.map((state) => (
                    <MenuItem
                      disabled={selectedStates.includes(state)}
                      key={state.id}
                      value={state.id}
                    >
                      {state.name}
                    </MenuItem>
                  ))
                  : null}
              </Select>
            </FormControl>
          </Grid>
        </Grid>


        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={1}
          >
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={9}
          >
            {selectedStates.map((istate, index) => {
              const foundState = states.find((state) => state.id === istate);

              if (foundState) {
                return (
                  <Chip
                    key={foundState.id}
                    label={foundState.name}
                    onDelete={() => handlePillRemoveState(index)}
                    color='primary'
                    size='small'
                    style={{ margin: '4px' }}
                  />
                );
              }
              return null; // Handle the case where category is not found
            })}
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{ flexGrow: 1, mt: 2, p: 2 }}
        className={`${isVerified === false ? 'hoverRadioBorder' : 'hoverRadioNoBorder'}`}
      >
        <Grid container spacing={3}>

          <Grid
            item
            xs={12}
            sm={12}
            md={1}
            alignIText="center"
            justifyContent="center"
            alignItems="center"
          >
            <Radio
              size='small'
              value='no'
              checked={verificationOption === false}
              onChange={handleVerificationChange}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={11}
          >
            <span>
              I do not require any certifications or licenses in order to work
              in my specialty
            </span>
          </Grid>
        </Grid>

      </Box>

      <Box sx={{ mt: 4 }} >
        <Grid container spacing={3}>

          <Grid
            item
            xs={12}
            sm={12}
            md={4}
          >
            <Button
              variant='outlined'
              fullWidth
              color='primary'
              style={{ height: '3rem' }}
              sx={{
                borderRadius: '4px',
                color: '#2561B0',
                boxShadow: 'none',
                textTransform: 'none',
              }}
              onClick={() => {
                setActiveStep((state) => state - 1);
              }}
            >
              Back
            </Button>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={4}
          >
            <Button
              fullWidth
              type='submit'
              // className='w-100'
              disabled={
                !selectedCategory ||
                !selectedSubCategories.length ||
                (verificationOption && selectedStates.length < 1)
              }
              variant='contained'
              style={{ height: '3rem' }}
              color='primary'
              sx={{
                borderRadius: '4px',
                boxShadow: 'none',
                background: '#2561B0',
                textTransform: 'none',
              }}
              onClick={handleNextClick}
            >
              {isLoading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                'Next'
              )}
            </Button>
          </Grid>

        </Grid>
      </Box>





      {/* <div className='mx-auto mx-lg-0' style={{ width: '95%' }}>
        <h4
          className='text-start mb-2 fw-semibold'
          style={{ fontSize: '1.25rem' }}
        >
          Speciality
        </h4>
        <Row className='ms-1'>
          <Col xs={11} md={3} className='pe-0'>
            <Row className='my-2'>
              <FormControl size='small' variant='outlined' className='w-75'>
                <InputLabel id='category-label'>Category</InputLabel>
                <Select
                  labelId='category-label'
                  id='category'
                  label='Category'
                  value={categoryValue}
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Row>
            <Row className='my-3'>
              <FormControl size='small' variant='outlined' className='w-75'>
                <InputLabel id='sub-category-label'>Sub Category</InputLabel>
                <Select
                  labelId='sub-category-label'
                  id='subCategory'
                  label='Sub Category'
                  value={selectedSubCategories}
                  onChange={handleSubCategorySelect}
                >
                  {subCategories.map((subCategory) => (
                    <MenuItem key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div
                className='my-2 ps-0'
                style={{ display: 'flex', flexWrap: 'wrap' }}
              >
                {selectedSubCategories.map((subCategory, index) => {
                  const foundCategory = subCategories.find(
                    (category) => category.id === subCategory
                  );

                  if (foundCategory) {
                    return (
                      <Chip
                        key={index}
                        label={foundCategory.name}
                        onDelete={() => handlePillRemove(index)}
                        color='primary'
                        size='small'
                        className='ms-0 me-1 my-1'
                        style={{ marginRight: '0.3rem' }}
                      />
                    );
                  }

                  return null; // Handle the case where category is not found
                })}
              </div>
            </Row>
          </Col>
          {selectedCategory && (
            <Col className='justify-content-start ps-0'>
              <div
                className='d-flex rounded'
                style={{ backgroundColor: '#FFF8E1', width: '30rem' }}
              >
                <Col sm={1} className='mt-3 mx-3' style={{ color: '#FFC400' }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='30'
                    fill='currentColor'
                    class='bi bi-exclamation-circle'
                    viewBox='0 0 16 16'
                  >
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                    <path d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z' />
                  </svg>
                </Col>

                <Col md={8} className='mt-3' style={{ color: '#B28900' }}>
                  <span className='fw-semibold'>Attention!</span>

                  <p className='small'>
                    Please click on all subcategories that you feel comfortable
                    working within. <br />
                    {selectedCategory === 1 ? (
                      <span className='fw-semibold'>
                        Ex: RDAEF clicks on RDA and DA instead of just RDAEF
                      </span>
                    ) : selectedCategory === 2 ? (
                      <span className='fw-semibold'>
                        Ex: RDHAP clicks on RDH instead of just RDHAP
                      </span>
                    ) : selectedCategory === 3 ? (
                      <span className='fw-semibold'>
                        Ex: OFFICE MANAGER clicks on TREATMWNT COORDINATOR instead
                        of just OFFICE MANAGER
                      </span>
                    ) : selectedCategory === 4 ? (
                      <span className='fw-semibold'>
                        Ex: SPECIALISTS clicks on ORTHODONTIST
                      </span>
                    ) : null}
                  </p>
                </Col>
              </div>
            </Col>
          )}
        </Row>
        <div
          className={`w-50 w-md-50 ps-2 pe-3 pt-3 mt-4 pb-4 ${isVerified === true ? 'hoverRadioBorder' : 'hoverRadioNoBorder'
            }`}
        >
          <div className='d-flex'>
            <Radio
              size='small'
              value='yes'
              checked={verificationOption === true}
              onChange={handleVerificationChange}
            />

            <div className='ms-4'>
              <span>
                I verify that I am fully licensed to practice in the following
                states and have no violations or restrictions against my license.
              </span>
            </div>
          </div>
          <br />

          <div>
            <FormControl
              size='small'
              variant='outlined'
              className='mb-3 ms-5 w-50'
            >
              <InputLabel id='select-label'>States</InputLabel>
              <Select
                labelId='select-label'
                id='select'
                value={selectedStates}
                onChange={handleStateSelect}
                label='States'
              >
                {states
                  ? states.map((state) => (
                    <MenuItem
                      disabled={selectedStates.includes(state)}
                      key={state.id}
                      value={state.id}
                    >
                      {state.name}
                    </MenuItem>
                  ))
                  : null}
              </Select>
            </FormControl>

            <h5 className='ms-5'>Selected States</h5>

            <div className='ms-5' style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selectedStates.map((istate, index) => {
                const foundState = states.find((state) => state.id === istate);

                if (foundState) {
                  return (
                    <Chip
                      key={foundState.id}
                      label={foundState.name}
                      onDelete={() => handlePillRemoveState(index)}
                      color='primary'
                      size='small'
                      style={{ margin: '4px' }}
                    />
                  );
                }
                return null; // Handle the case where category is not found
              })}
            </div>
          </div>
        </div>
        <br />
        <div
          className={`w-50 w-md-50 ps-3 pe-3 py-3 mb-2 mt-2 ${isVerified === false ? 'hoverRadioBorder' : 'hoverRadioNoBorder'
            }`}
        >
          <Row>
            <Col sm={'auto'} className='px-0'>
              <Radio
                size='small'
                value='no'
                onChange={handleVerificationChange}
                checked={verificationOption === false}
              />
            </Col>
            <Col className='mt-2 px-0'>
              <span>
                I do not require any certifications or licenses in order to work
                in my specialty
              </span>
            </Col>
          </Row>
        </div>

        <Row className='my-3'>
          <Col xs={12} md={1}>
            <Button
              variant='outlined'
              className='w-100'
              color='primary'
              style={{ height: '3rem' }}
              sx={{
                borderRadius: '4px',
                color: '#2561B0',
                boxShadow: 'none',
                textTransform: 'none',
              }}
              onClick={() => {
                setActiveStep((state) => state - 1);
              }}
            >
              Back
            </Button>
          </Col>
          <Col className='my-3 my-md-0' xs={12} md={2}>
            <Button
              type='submit'
              className='w-100'
              disabled={
                !selectedCategory ||
                !selectedSubCategories.length ||
                (verificationOption && selectedStates.length < 1)
              }
              variant='contained'
              style={{ height: '3rem' }}
              color='primary'
              sx={{
                borderRadius: '4px',
                boxShadow: 'none',
                background: '#2561B0',
                textTransform: 'none',
              }}
              onClick={handleNextClick}
            >
              {isLoading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                'Next'
              )}
            </Button>
          </Col>
        </Row>
      </div> */}
    </>
  );
}
