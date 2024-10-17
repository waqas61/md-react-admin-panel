import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  Chip,
  Button,
  FormHelperText,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchData } from '../../services/api';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const API_BASE_URL = 'https://api.mddentalstaffing.com/api/v1';

const fetchCategories = async (setCategories) => {
  try {
    const categories = await fetchData(`${API_BASE_URL}/categories`);
    setCategories(categories);
  } catch (error) {
    console.log(error);
  }
};

const fetchSubCategories = async (
  selectedCategory,
  categories,
  setSubCategories,
  selectedSubCategories,
  setSelectedSubCategories
) => {
  if (selectedCategory && categories.length > 0) {
    try {
      const category = categories[selectedCategory - 1];
      const subCategories = await fetchData(
        `${API_BASE_URL}/subCategories?name=${category.name}`
      );
      setSubCategories(subCategories);

      if (selectedSubCategories.length > 0) {
        const updatedSelectedSubCategories = selectedSubCategories.map(
          (selectedSubCategory) => {
            const matchingSubCategory = subCategories.find(
              (subCategory) => subCategory.id === selectedSubCategory.id
            );
            if (matchingSubCategory) {
              return {
                ...selectedSubCategory,
                name: matchingSubCategory.name,
                is_active: 1,
              };
            }
            return selectedSubCategory;
          }
        );
        setSelectedSubCategories(updatedSelectedSubCategories);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default function Position({
  selectedCategory,
  setSelectedCategory,
  title,
  setTitle,
  selectedLanguages,
  setSelectedLanguages,
  comments,
  setComments,
  errorState,
  setErrorState,
  successState,
  jobType,
  selectedSubCategories,
  setSelectedSubCategories,
  editMode,
  viewMode,
}) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [languagesCountVisible, setLanguagesCountVisible] = useState(false);

  useEffect(() => {
    axios
      .get('https://api.mddentalstaffing.com/api/v1/languages')
      .then((response) => {
        setLanguages(response.data.data);
        if (selectedLanguages && selectedLanguages.length !== 0) {
          const updatedSelectedLanguages = selectedLanguages.map(
            (selectedLanguage) => {
              const matchingLanguage = response.data.data.find(
                (language) =>
                  language.language_name === selectedLanguage.language_name
              );
              if (matchingLanguage) {
                return {
                  ...selectedLanguage,
                  id: matchingLanguage.id,
                  iso_code: matchingLanguage.iso_code,
                  native_name: matchingLanguage.native_name,
                  created_at: matchingLanguage.created_at,
                  updated_at: matchingLanguage.updated_at,
                  deleted_at: matchingLanguage.deleted_at,
                  region: matchingLanguage.region,
                };
              }
              return selectedLanguage;
            }
          );
          setSelectedLanguages(updatedSelectedLanguages);
        }
      })
      .catch((error) => {
        console.error('Error fetching languages:', error);
      });
  }, []);

  useEffect(() => {
    fetchCategories(setCategories);
  }, []);

  useEffect(() => {
    fetchSubCategories(
      selectedCategory,
      categories,
      setSubCategories,
      selectedSubCategories,
      setSelectedSubCategories
    );
  }, [categories, selectedCategory]);

  const handleRemoveClick = (language) => {
    handleLanguageRemove(language);
  };

  const hiddenLanguageCount =
    selectedLanguages.length > 4 ? selectedLanguages.length - 4 : 0;

  const handleLanguageRemove = (language) => {
    const languageIndex = selectedLanguages.indexOf(language);
    if (languageIndex !== -1) {
      const updatedSelectedLanguages = [...selectedLanguages];
      updatedSelectedLanguages.splice(languageIndex, 1);
      setSelectedLanguages(updatedSelectedLanguages);
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;

    if (!selectedLanguages.includes(selectedLanguage)) {
      setSelectedLanguages([...selectedLanguages, selectedLanguage]);
    }

    if (selectedLanguages.length === 4) {
      setLanguagesCountVisible(true);
    }
  };

  const handleSubCategoryChange = (subCategory) => {
    const isSubCategorySelected = selectedSubCategories.some(
      (subCat) => subCat.id === subCategory.id
    );

    let updatedSelectedSubCategories = [...selectedSubCategories];

    if (isSubCategorySelected) {
      updatedSelectedSubCategories = updatedSelectedSubCategories.filter(
        (subCat) => subCat.id !== subCategory.id
      );
    } else {
      updatedSelectedSubCategories.push(subCategory);
    }

    setSelectedSubCategories(updatedSelectedSubCategories);

    const selectedSubCategoryNames = updatedSelectedSubCategories.map(
      (subCat) => subCat.name
    );

    const title = selectedSubCategoryNames.join(', ');
    setTitle(title);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubCategories([]);
  };

  return (
    <Grid
      id='position'
      className='rounded'
      sx={{
        m: 3,
        pt: 2.5,
        px: 2,
        pb: 7,
        border: '1px solid',
        borderColor: successState
          ? '#4CAF50'
          : errorState
            ? '#FA5A16'
            : '#D9D9D9',
        position: 'relative',
      }}
    >
      <Grid container spacing={2}>
        <Grid item={true} xs={12} md={8}>
          <h6 style={{ color: '#262626' }} className='fw-semibold'>
            Position
          </h6>
          <br />
          <Grid item={true} xs={12} md={3}>
            <FormControl required className='w-100' size='small'>
              <InputLabel id='category-label'>Category</InputLabel>
              <Select
                error={errorState && !selectedCategory}
                value={selectedCategory}
                label='Category'
                labelId='category-label'
                onChange={(e) => {
                  setErrorState(false);
                  handleCategoryChange(e);
                }}
                disabled={viewMode}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>

              {errorState && !selectedCategory && (
                <FormHelperText style={{ color: '#FA5A16' }}>
                  Please choose an option.
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {!jobType && (
            <Grid
              className='rounded'
              gap={1}
              sx={{
                mt: 2,
                p: 2,
                border: '1px solid',
                borderColor: '#D9D9D9',
              }}
              container
            >

              <Grid item={true} md={4}>
                <p
                  className='mb-4'
                  style={{ color: '#8C8C8C', fontSize: '0.9rem' }}
                >
                  You current plan:{' '}
                  <Chip
                    size='small'
                    sx={{
                      backgroundColor: '#81C784',
                      color: '#FFFFFF',
                      px: 1,
                      mx: 1,
                    }}
                    label='Free'
                  />
                </p>
                <div className='mt-1 d-flex justify-content-between'>
                  <div>
                    <p
                      className='m-0 mb-1 p-0'
                      style={{ color: '#595959', fontSize: '0.9rem' }}
                    >
                      Referral Fee
                    </p>
                    <h6 style={{ color: '#8C8C8C', fontSize: '1rem' }}>
                      <span style={{ color: '#262626', fontSize: '1.25rem' }}>
                        {' '}
                        $60
                      </span>{' '}
                      per day
                    </h6>
                  </div>
                  <div>
                    <p
                      className='m-0 mb-1 p-0'
                      style={{ color: '#595959', fontSize: '0.9rem' }}
                    >
                      Cancellation Fee
                    </p>
                    <h6 style={{ color: '#8C8C8C', fontSize: '1rem' }}>
                      <span style={{ color: '#262626', fontSize: '1.25rem' }}>
                        {' '}
                        $30
                      </span>{' '}
                      per day
                    </h6>
                  </div>
                </div>
              </Grid>
              <Grid
                className='rounded'
                sx={{
                  borderColor: '#FFC400',
                  border: '1px solid #FFC400',
                  p: 1,
                }}
                container
                gap={3}
                md={7.7}
              >
                <Grid sx={{ pl: 1 }} item={true} md={7}>
                  <p
                    className='p-0 mb-3 m-0'
                    style={{ color: '#FFC400', fontWeight: '450' }}
                  >
                    With the Elite Subscription{' '}
                    <Chip
                      size='small'
                      sx={{
                        backgroundColor: '#FFC400',
                        color: '#FFFFFF',
                        px: 1,
                        mx: 1,
                      }}
                      label='Elite'
                    />
                  </p>
                  <div className='mt-1 d-flex justify-content-between'>
                    <div>
                      <p
                        className='m-0 mb-1 p-0'
                        style={{ color: '#595959', fontSize: '0.9rem' }}
                      >
                        Referral Fee
                      </p>
                      <h6 style={{ color: '#8C8C8C', fontSize: '1rem' }}>
                        <span style={{ color: '#262626', fontSize: '1.25rem' }}>
                          {' '}
                          $45
                        </span>{' '}
                        per day
                      </h6>
                    </div>
                    <div>
                      <p
                        className='m-0 mb-1 p-0'
                        style={{ color: '#595959', fontSize: '0.9rem' }}
                      >
                        Cancellation Fee
                      </p>
                      <h6 style={{ color: '#8C8C8C', fontSize: '1rem' }}>
                        <span style={{ color: '#262626', fontSize: '1.25rem' }}>
                          {' '}
                          $22.50
                        </span>{' '}
                        per day
                      </h6>
                    </div>
                  </div>
                </Grid>
                <Grid className='mx-auto' item={true} md={4}>
                  <p
                    className='mb-1 m-0 p-0'
                    style={{ fontSize: '0.8rem', color: '#BFBFBF' }}
                  >
                    Only
                  </p>
                  <h4 style={{ color: '#262626' }}>
                    $59.99{' '}
                    <span style={{ color: '#8C8C8C', fontSize: '0.85rem' }}>
                      /month
                    </span>
                  </h4>
                  <Button
                    disabled={viewMode}
                    sx={{
                      backgroundColor: '#296DC4',
                      boxShadow: 'none',
                      textTransform: 'none',
                    }}
                    variant='contained'
                  >
                    Saving Options
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item={true} xs={12} md={4}>
          {!jobType && (
            <Grid
              className='rounded'
              container
              spacing={1}
              sx={{ backgroundColor: '#D7E8FF', p: 1 }}
            >
              <Grid item={true} xs={1} sx={{}}>
                <ErrorOutlineOutlinedIcon
                  sx={{ color: '#4A93F0', transform: 'rotate(180deg)' }}
                />
              </Grid>
              <Grid item={true} xs={11} sx={{ fontSize: '0.9rem' }}>
                <p
                  style={{ color: '#194378' }}
                  className='fw-semibold mb-0 pb-1'
                >
                  Referral Fee
                </p>
                <p style={{ color: '#194378' }}>
                  Referral fee is a fee charged when the candidate’s assignment
                  begins. <br /> Referral applies to each day of the temporary
                  assignment.
                </p>

                <p
                  style={{ color: '#194378' }}
                  className='fw-semibold mb-0 pb-1'
                >
                  Cancellation fee
                </p>
                <p style={{ color: '#194378' }}>
                  For changes affecting booked candidates a cancellation fee
                  will be charged. <br />
                  No cancellation fee will be applied if this assignment was not
                  filled or cancelled before a candidate was booked.
                </p>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          width: '72%',
          maxWidth: '8',
          mt: 4,
        }}
      >
        {subCategories.map((subCategory) => {
          return (
            <Grid
              item={true}
              xs={12}
              md={2.4}
              sx={{ p: 0, m: 0 }}
              key={subCategory.id}
            >
              <FormControl size='small'>
                <FormControlLabel
                  size='small'
                  control={
                    <Checkbox
                      size='small'
                      checked={selectedSubCategories
                        .map((subCategory) => subCategory.id)
                        .includes(subCategory.id)}
                      onChange={() => handleSubCategoryChange(subCategory)}
                      disabled={viewMode}
                    />
                  }
                  label={
                    <Typography variant='body2' color='textSecondary'>
                      {subCategory.name}
                    </Typography>
                  }
                  sx={{ fontSize: '0.5rem' }}
                />
              </FormControl>
            </Grid>
          );
        })}
      </Grid>

      <Grid
        className='rounded'
        item={true}
        xs={12}
        md={8}
        sx={{ mt: 4, p: 2, backgroundColor: '#FAFAFA' }}
      >
        <h6 style={{ color: '#262626' }} className='fw-semibold'>
          Other
        </h6>
        <br />

        <FormControl required className='w-25' size='small'>
          <InputLabel id='language-label'>Language</InputLabel>
          <Select
            error={errorState && selectedLanguages.length < 1}
            value={selectedLanguages}
            label='Language'
            labelId='language-label'
            onChange={handleLanguageChange}
            disabled={viewMode}
          >
            {languages
              .filter(
                (language) =>
                  !selectedLanguages.find(
                    (selectedLanguage) => selectedLanguage.id === language.id
                  )
              )
              .map((language) => (
                <MenuItem
                  key={language.id}
                  disabled={viewMode}
                  value={language}
                >
                  {language.language_name}
                </MenuItem>
              ))}
          </Select>
          {errorState && selectedLanguages.length < 1 && (
            <FormHelperText style={{ color: '#FA5A16' }}>
              Please choose an option.
            </FormHelperText>
          )}
        </FormControl>
        <br />

        {languagesCountVisible
          ? selectedLanguages.slice(0, 4).map((language) => (
            <Chip
              key={language.id}
              sx={{
                backgroundColor: '#2561B0',
                color: '#FFFFFF',
                mt: 1,
                mr: 1,
              }}
              size='small'
              label={
                <>
                  {language.language_name}
                  <IconButton
                    size='small'
                    disabled={viewMode}
                    onClick={() => handleRemoveClick(language)}
                    sx={{ marginLeft: 1, p: 0 }}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                </>
              }
            />
          ))
          : selectedLanguages.map((language) => (
            <Chip
              key={language.id}
              sx={{
                backgroundColor: '#2561B0',
                color: '#FFFFFF',
                mt: 1,
                mr: 1,
              }}
              size='small'
              label={
                <>
                  {language.language_name}
                  <IconButton
                    disabled={viewMode}
                    size='small'
                    onClick={() => handleRemoveClick(language)}
                    sx={{ marginLeft: 1, p: 0 }}
                  >
                    <ClearIcon
                      style={{
                        fontSize: '12px',
                        color: '#FFFFFF',
                        backgroundColor: '#D9D9D980',
                        borderRadius: '50%',
                      }}
                    />
                  </IconButton>
                </>
              }
            />
          ))}
        {languagesCountVisible > 0 && (
          <Chip
            onClick={() => setLanguagesCountVisible(false)}
            label={
              <>
                {`+${hiddenLanguageCount}`}
                <ArrowCircleRightIcon
                  style={{
                    marginLeft: '0.5rem',
                    color: '#262626',
                  }}
                />
              </>
            }
            sx={{
              backgroundColor: '#FAFAFA',
              color: '#2561B0',
              fontSize: '12px',
              padding: 0,
              mt: 1,
            }}
          />
        )}
        <br />

        <TextField
          variant='outlined'
          fullWidth
          // multiline
          label='Comments'
          rows={4}
          sx={{ mt: 3 }}
          style={{ width: '50%' }}
          id='comments'
          value={comments}
          disabled={viewMode}
          onChange={(e) => {
            setComments(e.target.value);
          }}
        />
      </Grid>
      <div
        style={{ position: 'absolute', bottom: 0, right: 0, margin: '16px' }}
      >
        {errorState ? (
          <CloseIcon color='sunset' />
        ) : successState ? (
          <DoneAllIcon color='success' />
        ) : null}
      </div>
    </Grid>
  );
}
