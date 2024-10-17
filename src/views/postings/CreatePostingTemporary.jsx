import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

// project imports
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';
import Position from '../../ui-component/create-posting/Position';
import DirectBooking from '../../ui-component/create-posting/DirectBooking';
import PostingDates from '../../ui-component/create-posting/PostingDates';
import LocationCandidate from '../../ui-component/create-posting/LocationCandidate';

//Store
import { gridSpacing } from '../../store/constant';
import { convertDataArray } from '../../utils/helper';


export default function CreatePostingsTemporary() {
  const [editMode, setEditMode] = useState(false);
  const [cloneMode, setCloneMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const navigate = useNavigate();

  const jobType = 'temporary';

  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);

  useEffect(() => {
    if (url.includes('edit')) {
      setEditMode(true);
    } else if (url.includes('clone')) {
      setCloneMode(true);
    } else if (url.includes('view')) {
      setViewMode(true);
    }
  }, [url]);

  // Error States
  const [positionError, setPositionError] = useState(false);
  const [dirBookingError, setDirBookingError] = useState(false);
  const [datesError, setDatesError] = useState(false);
  const [locCandidateError, setLocCandidateError] = useState(false);

  // Success States
  const [positionSuccess, setPositionSuccess] = useState(false);
  const [dirBookingSuccess, setDirBookingSuccess] = useState(false);
  const [datesSuccess, setDatesSuccess] = useState(false);
  const [locCandidateSuccess, setLocCandidateSuccess] = useState(false);

  // Position
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [comments, setComments] = useState('');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [postingData, setPostingData] = useState({});

  // Direct Booking
  const [selectedPros, setSelectedPros] = useState([]);
  const [confirmationHours, setConfirmationHours] = useState(0);

  // Location / Candidate
  const [selectedBookingType, setSelectedBookingType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('');
  // Posting Dates
  const [tzone, setTzone] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [postingSchedules, setPostingSchedules] = useState({
    type: 'simple',
    startDate: '',
    endDate: '',
    days: {
      sunday: {
        isActive: true,
        startHours: '09',
        endHours: '05',
        startMinutes: '00',
        endMinutes: '00',
        startPeriod: 'AM',
        endPeriod: 'PM',
      },
      monday: {
        isActive: true,
        startHours: '09',
        endHours: '05',
        startMinutes: '00',
        endMinutes: '00',
        startPeriod: 'AM',
        endPeriod: 'PM',
      },
      tuesday: {
        isActive: true,
        startHours: '09',
        endHours: '05',
        startMinutes: '00',
        endMinutes: '00',
        startPeriod: 'AM',
        endPeriod: 'PM',
      },
      wednesday: {
        isActive: true,
        startHours: '09',
        endHours: '05',
        startMinutes: '00',
        endMinutes: '00',
        startPeriod: 'AM',
        endPeriod: 'PM',
      },
      thursday: {
        isActive: true,
        startHours: '09',
        endHours: '05',
        startMinutes: '00',
        endMinutes: '00',
        startPeriod: 'AM',
        endPeriod: 'PM',
      },
      friday: {
        isActive: true,
        startHours: '09',
        endHours: '05',
        startMinutes: '00',
        endMinutes: '00',
        startPeriod: 'AM',
        endPeriod: 'PM',
      },
      saturday: {
        isActive: false,
        startHours: '09',
        endHours: '05',
        startMinutes: '00',
        endMinutes: '00',
        startPeriod: 'AM',
        endPeriod: 'PM',
      },
    },
  });
  const [genSchedules, setGenSchedules] = useState([]);
  const [applicantsExist, setApplicantsExist] = useState(false);

  const authToken = localStorage.getItem('auth_token');

  const activeDay = Object.keys(postingSchedules.days).find(
    (day) => postingSchedules.days[day].isActive === true
  );

  useEffect(() => {
    if (url.includes('edit') || url.includes('view') || url.includes('clone')) {
      axios
        .get(`https://api.mddentalstaffing.com/api/v1/owner/postings/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          setPostingData(res.data.data);
          setTitle(res.data.data.title);
          setSelectedCategory(res.data.data.category_id);
          setSelectedSubCategories(
            res.data.data.posting_sub_categories.map((sub) => {
              return {
                id: sub.sub_category_id,
                is_active: sub.is_active,
                category_id: res.data.data.category_id,
                deleted_at: null,
              };
            })
          );
          setComments(res.data.data.comments);
          setTzone(res.data.data.time_zone_id);
          setConfirmationHours(res.data.data.direct_booking_conformation_hours);
          const postingSchedules = convertDataArray(
            res.data.data.posting_schedules,
            res.data.data.posting_schedule
          );
          postingSchedules.startDate = res.data.data.start_date;
          postingSchedules.endDate = res.data.data.end_date;
          postingSchedules.type = res.data.data.posting_schedule;

          setPostingSchedules(postingSchedules);
          const languages = res.data.data.post_languages.split(/,\s*|,/);

          const selectedLanguages = languages.map((lang) => {
            return {
              language_name: lang,
            };
          });
          setSelectedLanguages(selectedLanguages);
          setSelectedPros(
            res.data.data.posting_direct_bookings.map((pro) => pro.user)
          );
          const location = res.data.data.user_location;
          setSelectedLocation(location);
          setSelectedBookingType(res.data.data.booking_type);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [authToken, id, url]);


  useEffect(() => {

  }, [selectedCategory]);

  useEffect(() => {
    if (url.includes('view') || postingData.applicants_count > 0) {
      setViewMode(true);
    }
  }, [applicantsExist, setApplicantsExist, url, postingData.applicants_count]);

  const languages = selectedLanguages
    .map((lang) => lang.language_name)
    .join(', ');

  const handleSavePosting = () => {
    let firstErrorElement = null;
    if (!selectedCategory || !selectedLanguages) {
      setPositionError(true);
      setPositionSuccess(false);
      if (!firstErrorElement) {
        firstErrorElement = document.querySelector('#position');
      }
    } else if (selectedCategory && selectedLanguages) {
      setPositionSuccess(true);
      setPositionError(false);
    }

    if (selectedSubCategories.length < 1) {
      setPositionError(true);
      setPositionSuccess(false);
      if (!firstErrorElement) {
        firstErrorElement = document.querySelector('#position');
      }
    } else if (selectedSubCategories.length > 0) {
      setPositionSuccess(true);
      setPositionError(false);
    }

    if (selectedPros.length < 1 && selectedBookingType === 'direct') {
      setDirBookingError(true);
      setDirBookingSuccess(false);
      if (!firstErrorElement) {
        firstErrorElement = document.querySelector('#directBooking');
      }
    } else if (selectedPros.length > 0 && selectedBookingType === 'direct') {
      setDirBookingSuccess(true);
      setDirBookingError(false);
    }

    if (postingSchedules.startDate === '' || selectedLocation === '') {
      setDatesError(true);
      setDatesSuccess(false);
      if (!firstErrorElement) {
        firstErrorElement = document.querySelector('#postingDates');
      }
    } else if (
      postingSchedules.startDate !== '' &&
      postingSchedules.endDate !== ''
    ) {
      setDatesError(false);
      setDatesSuccess(true);
    }

    if (tzone === '') {
      setDatesError(true);
      setDatesSuccess(false);
      if (!firstErrorElement) {
        firstErrorElement = document.querySelector('#postingDates');
      }
    } else if (tzone !== '') {
      setDatesError(false);
      setDatesSuccess(true);
    }

    if (selectedLocation === '') {
      setLocCandidateError(true);
      setLocCandidateSuccess(false);
      if (!firstErrorElement) {
        firstErrorElement = document.querySelector('#locationCandidate');
      }
    } else {
      setLocCandidateError(false);
      setLocCandidateSuccess(true);
    }

    if (selectedBookingType === 'all') {
      setDirBookingError(false);
      setDirBookingSuccess(true);
    }

    if (
      postingSchedules.type === 'simple' &&
      (postingSchedules.days[activeDay].startHours === 0 ||
        postingSchedules.days[activeDay].endHours === 0)
    ) {
      if (!firstErrorElement) {
        firstErrorElement = document.querySelector('#postingDates');
      }
      setDatesError(true);
      setDatesSuccess(false);
      setIsGenerated(false);
    }

    if (!isGenerated) {
      if (!firstErrorElement) {
        firstErrorElement = document.querySelector('#postingDates');
      }
      setDatesError(true);
      setDatesSuccess(false);
    }

    if (editMode && selectedSubCategories.length < 1) {
      if (!firstErrorElement) {
        firstErrorElement = document.querySelector('#position');
      }
      setPositionError(true);
      setPositionSuccess(false);
    }

    const sundayLength = genSchedules.filter(
      (schedule) => schedule.schedule_day === 'sunday'
    ).length;

    const saturdayLength = genSchedules.filter(
      (schedule) => schedule.schedule_day === 'saturday'
    ).length;

    const data = {
      title: title,
      posting_type: 'temporary',
      category_id: selectedCategory,
      post_languages: languages,
      user_location_id: selectedLocation.id,
      comments: comments,
      on_refuses_extendable: false,
      on_refuses_deletable: false,
      start_date: postingSchedules.startDate,
      end_date: postingSchedules.endDate,
      time_zone_id: tzone,
      posting_status: 'new',
      posting_meta: {
        end_time: '15:30:00',
        start_time: '09:30:00',
        saturday_include: sundayLength,
        sunday_included: saturdayLength,
      },
      booking_type: selectedBookingType,
      posting_schedules: genSchedules.filter(
        (schedule) => schedule.is_working === true
      ),
      posting_schedule: postingSchedules.type,
      direct_booking_user_ids: selectedPros.map((pro) => pro.id),
      direct_booking_conformation_hours: confirmationHours,
    };

    if (editMode) {
      data.id = postingData.id;
      data.sub_category_ids = selectedSubCategories.map((sub) => sub.id);
    } else {
      data.sub_categories_ids = selectedSubCategories.map((sub) => sub.id);
    }

    const isFormValid =
      selectedCategory &&
      selectedLanguages &&
      postingSchedules.startDate !== '' &&
      postingSchedules.endDate !== '' &&
      tzone !== '' &&
      selectedLocation !== '' &&
      selectedBookingType !== '' &&
      selectedSubCategories.length > 0 &&
      isGenerated &&
      !(selectedBookingType === 'direct' && selectedPros.length < 1);

    if (isFormValid) {
      if (editMode) {
        handleEditPosting({ data, id });
      } else if (cloneMode) {
        handleCreatePosting({ data });
      } else {
        handleCreatePosting({ data });
      }
    } else {
      firstErrorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCreatePosting = ({ data }) => {
    axios
      .post('https://api.mddentalstaffing.com/api/v1/owner/postings', data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        let successMessage = '';
        if (cloneMode) {
          successMessage = 'Your posting has been successfully cloned!';
        } else {
          successMessage = 'Your posting has been successfully created!';
        }
        navigate('/owner/postings/temporary', { state: { successMessage } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditPosting = ({ data, id }) => {
    axios
      .put(
        `https://api.mddentalstaffing.com/api/v1/owner/postings/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        const successMessage = 'Your posting has been successfully edited!';
        navigate('/owner/postings/temporary', { state: { successMessage } });
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <>
      <MainCard
        title="Management of Locations"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid
              sx={{
                px: 3,
                pt: 2,
                pb: 1,
                borderBottom: '1px solid #D9D9D9',
                width: 'auto',
              }}
            >
              <Grid
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <h4 className='pb-0 mb-1' style={{ color: '#262626' }}>
                  {editMode
                    ? 'Edit Posting'
                    : cloneMode
                      ? 'Clone Posting'
                      : viewMode
                        ? 'View Posting'
                        : 'Create Posting'}
                </h4>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate('/posting/temporary')}
                >
                  <p style={{ marginRight: '10px', color: '#808080' }}>Close</p>
                  <CloseOutlinedIcon
                    sx={{
                      color: '#000',
                      fontSize: '42px',
                      borderRadius: '50%',
                      border: '1px solid #ccc',
                      padding: '8px',
                      backgroundColor: '#fff',
                    }}
                  />
                </div>
              </Grid>

              <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
                {selectedCategory === 1
                  ? 'Assistants'
                  : selectedCategory === 2
                    ? 'Hygienist'
                    : selectedCategory === 3
                      ? 'Front Office'
                      : selectedCategory === 4
                        ? 'Dentist/Specialists'
                        : '-'}
              </p>
            </Grid>

            <Grid
              sx={{
                px: 3,
                pt: 2,
                pb: 1,
                borderBottom: '1px solid #D9D9D9',
                width: 'auto',
              }}
            >
              <p
                className='pb-0 mb-0'
                style={{ color: '#595959', fontSize: '0.8rem' }}
              >
                Posting Title
              </p>
              <p style={{ color: '#000000' }}>{title.length > 0 ? title : '-'}</p>
              <p
                className='pb-0 mb-0'
                style={{ color: '#595959', fontSize: '0.8rem' }}
              >
                Location
              </p>
              <p style={{ color: '#000000' }}>
                {selectedLocation ? selectedLocation.place_name : '-'}
              </p>
            </Grid>

            <Position
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              title={title}
              setTitle={setTitle}
              selectedLanguages={selectedLanguages}
              setSelectedLanguages={setSelectedLanguages}
              errorState={positionError}
              setErrorState={setPositionError}
              successState={positionSuccess}
              comments={comments}
              setComments={setComments}
              selectedSubCategories={selectedSubCategories}
              setSelectedSubCategories={setSelectedSubCategories}
              editMode={editMode}
              viewMode={viewMode}
            />

            <LocationCandidate
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedRadio={selectedBookingType}
              setSelectedRadio={setSelectedBookingType}
              errorState={locCandidateError}
              setErrorState={setLocCandidateError}
              successState={locCandidateSuccess}
              viewMode={viewMode}
            />

            <DirectBooking
              selectedSubCategories={selectedSubCategories}
              selectedCategory={selectedCategory}
              selectedPros={selectedPros}
              setSelectedPros={setSelectedPros}
              errorState={dirBookingError}
              setErrorState={setDirBookingError}
              successState={dirBookingSuccess}
              selectedBookingType={selectedBookingType}
              viewMode={viewMode}
              applicantsExist={setApplicantsExist}
              jobType={jobType}
              confirmationHours={confirmationHours}
              setConfirmationHours={setConfirmationHours}
            />

            <PostingDates
              postingSchedules={postingSchedules}
              setPostingSchedules={setPostingSchedules}
              genSchedules={genSchedules}
              setGenSchedules={setGenSchedules}
              tzone={tzone}
              errorState={datesError}
              successState={datesSuccess}
              setErrorState={setDatesError}
              setTzone={setTzone}
              setIsGenerated={setIsGenerated}
              isGenerated={isGenerated}
              viewMode={viewMode}
            />
            <div className='ms-2'>
              <Button
                onClick={() => {
                  navigate('/posting/temporary');
                }}
                variant='outlined'
                sx={{
                  borderColor: '#2561B0',
                  boxShadow: 'none',
                  my: 2,
                  ml: 2,
                  textTransform: 'none',
                }}
              >
                <Typography sx={{ fontWeight: '400' }}> Close </Typography>
              </Button>
              {!viewMode && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSavePosting();
                  }}
                  variant='contained'
                  sx={{
                    backgroundColor: '#2561B0',
                    boxShadow: 'none',
                    my: 2,
                    ml: 2,
                  }}
                >
                  <Typography sx={{ fontWeight: '400', px: 2 }}>SAVE</Typography>
                </Button>
              )}
            </div>

          </Grid>
        </Grid>
      </MainCard>
    </>
  );


}
