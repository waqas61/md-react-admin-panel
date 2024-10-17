import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import { Checkbox, FormControlLabel } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


import StarRating from '../../../ui-component//StarRating';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '6px',
};

export default function AddReviewModal({
  open,
  handleClose,
  fetchData,
  user,
  postingId,
  posting,
  isView,
  selectedItem,
  isEdit,
  isAdd,
  isScore,
}) {
  const [editModeOpen, setEditModeOpen] = useState(isEdit || isAdd || isScore);
  const [isChecked, setIsChecked] = useState(true);
  const authToken = localStorage.getItem('auth_token');

  const [editedRatings, setEditedRatings] = useState({
    professionalism: 1,
    communication: 1,
    work_quality: 1,
    punctuality: 1,
    appearance: 1,
  });




  const [professionalRatings, setProfessionalRatings] = useState({
    cleanliness: 0.1,
    communication: 0.1,
    organization: 0.1,
    professionalism: 0.1,
    standard_of_care: 0.1,
  });

  const handleRatingChange = (category, newRating) => {
    setEditedRatings({
      ...editedRatings,
      [category]: newRating,
    });
  };

  const handleDoneClick = () => {

    const data = {
      user_id: user.id,
      posting_id: postingId,
      professionalism: editedRatings.professionalism,
      communication: editedRatings.communication,
      work_quality: editedRatings.work_quality,
      punctuality: editedRatings.punctuality,
      appearance: editedRatings.appearance,
    };

    if (isAdd || isScore) {
      axios
        .post('https://api.mddentalstaffing.com/api/v1/owner/reviews', data, {
          headers: {
            method: 'POST',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        })
        .then((res) => {
          fetchData();
          handleClose();
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .put(
          `https://api.mddentalstaffing.com/api/v1/owner/reviews/${selectedItem.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then(() => {
          fetchData();
          handleClose();
        });
    }
    setEditModeOpen(false);
  };

  useEffect(() => {
    if (selectedItem) {
      axios.get(
        `https://api.mddentalstaffing.com/api/v1/owner${isScore ? '/users' : ''}/reviews/${selectedItem.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      ).then((res) => {
        setEditedRatings({
          professionalism: res.data.data.professionalism,
          communication: res.data.data.communication,
          work_quality: res.data.data.work_quality,
          punctuality: res.data.data.punctuality,
          appearance: res.data.data.appearance,
        });



        if (res.data.data.owner_review != null) {
          setProfessionalRatings({
            cleanliness: res.data.data.owner_review.cleanliness,
            communication: res.data.data.owner_review.communication,
            organization: res.data.data.owner_review.organization,
            professionalism: res.data.data.owner_review.professionalism,
            standard_of_care: res.data.data.owner_review.standard_of_care,
          });
        }

        console.log('editedRatings', editedRatings, professionalRatings);
      }).catch((res) => {

        console.log('1st', res);
      });
    }
  }, [selectedItem, authToken]);

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setEditModeOpen(false);
      }}

      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <div
          className='d-flex'
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}
          >
            {/* <img
              src={`https://api.mddentalstaffing.com/api/v1/assets/${user.avatar}`}
              alt=''
              style={{
                width: '35px',
                height: '35px',
                borderRadius: '100px',
              }}
            /> */}




            {user.avatar ? (
              <Avatar alt="Remy Sharp" src={`https://api.mddentalstaffing.com/api/v1/assets/${user.avatar}`}
                sx={{ width: 50, height: 50 }} />
            ) : (
              <AccountCircle sx={{ color: '#262626' }} />
            )}


            <h3
              style={{
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              {user.first_name} {user.last_name}
            </h3>

          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              cursor: 'pointer',
            }}
            onClick={handleClose}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              class='bi bi-x'
              viewBox='0 0 16 16'
            >
              <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
            </svg>
          </div>
        </div>

        <div className='d-flex' >
          <div
            className='flex'
            style={{
              flexDirection: 'column',
              gap: 20,
              // backgroundColor: '#d6dcff',
              borderRadius: '5px',
              padding: '5px'
            }}
          >


            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 145,
              }}
            >

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#595959',
                  }}
                >
                  Worked Stated
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  {posting.start_date}
                </p>
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#595959',
                  }}
                >
                  Work Ended
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  {posting.end_date}
                </p>
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#595959',
                  }}
                >
                  Category
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  {/* {posting.category.name} */}
                </p>
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#595959',
                  }}
                >
                  Posting Title
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  {posting.title}
                </p>
              </div>


            </div>
          </div>
        </div>


        <hr />

        <div className='d-flex'>
          <div
            className='flex'
            style={{
              flexDirection: 'column',
              gap: 20,
              backgroundColor: '#d6dcff',
              borderRadius: '5px',
              padding: '5px'
            }}
          >


            <h3
              style={{
                // marginTop: '10px',
                fontSize: 16,
                fontWeight: 500,
                color: '#262626',
              }}
            >
              Rating From Professional
            </h3>

            {/* <hr /> */}





            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 40,
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#595959',
                  }}
                >
                  Cleanliness
                </p>
                {professionalRatings.cleanliness ? (
                  <StarRating rating={professionalRatings.cleanliness} />
                ) : (
                  <Stack spacing={1}>
                    <Skeleton variant="rectangular" height={60} />
                  </Stack>
                )}
              </div>

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#595959',
                  }}
                >
                  Communication
                </p>
                {professionalRatings.communication && (
                  <StarRating rating={professionalRatings.communication} />
                )}
              </div>

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#595959',
                  }}
                >
                  Organization
                </p>
                {professionalRatings.organization && (
                  <StarRating rating={professionalRatings.organization} />
                )}
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#595959',
                  }}
                >
                  Professionalism
                </p>
                {professionalRatings.professionalism && (
                  <StarRating rating={professionalRatings.professionalism} />
                )}
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#595959',
                  }}
                >
                  Standard of Care
                </p>
                {professionalRatings.standard_of_care && (
                  <StarRating rating={professionalRatings.standard_of_care} />
                )}
              </div>

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 800,
                    color: '#595959',
                  }}
                >
                  Average Rating
                </p>



                {professionalRatings.cleanliness && (
                  <StarRating
                    rating={
                      (professionalRatings.cleanliness +
                        professionalRatings.communication +
                        professionalRatings.organization +
                        professionalRatings.professionalism +
                        professionalRatings.standard_of_care) /
                      5
                    }
                  />
                )}
              </div>
            </div>








          </div>
        </div>

        <div className='d-flex'>
          <div
            className='flex'
            style={{
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: '#262626',
              }}
            >
              Rate this Candidate
            </h3>
            <hr />
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 40,
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#595959',
                  }}
                >
                  Professionalism
                </p>
                {editModeOpen ? (
                  <StarRating
                    rating={editedRatings.professionalism}
                    onChange={(newRating) =>
                      handleRatingChange('professionalism', newRating)
                    }
                  />
                ) : (
                  <StarRating rating={editedRatings.professionalism} />
                )}
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#595959',
                  }}
                >
                  Communication
                </p>
                {editModeOpen ? (
                  <StarRating
                    rating={editedRatings.communication}
                    onChange={(newRating) =>
                      handleRatingChange('communication', newRating)
                    }
                  />
                ) : (
                  <StarRating rating={editedRatings.communication} />
                )}
              </div>

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#595959',
                  }}
                >
                  Work Quality
                </p>
                {editModeOpen ? (
                  <StarRating
                    rating={editedRatings.work_quality}
                    onChange={(newRating) =>
                      handleRatingChange('work_quality', newRating)
                    }
                  />
                ) : (
                  <StarRating rating={editedRatings.work_quality} />
                )}
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#595959',
                  }}
                >
                  Punctuality
                </p>
                {editModeOpen ? (
                  <StarRating
                    rating={editedRatings.punctuality}
                    onChange={(newRating) =>
                      handleRatingChange('punctuality', newRating)
                    }
                  />
                ) : (
                  <StarRating rating={editedRatings.punctuality} />
                )}
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#595959',
                  }}
                >
                  Appearance
                </p>
                {editModeOpen ? (
                  <StarRating
                    rating={editedRatings.appearance}
                    onChange={(newRating) =>
                      handleRatingChange('appearance', newRating)
                    }
                  />
                ) : (
                  <StarRating rating={editedRatings.appearance} />
                )}
              </div>
            </div>

            <div
              style={{
                margin: '26px 0px',
              }}
            >
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#262626',
                }}
              >
                Candidate Average Rating
              </h3>
              <StarRating
                rating={
                  (editedRatings.professionalism +
                    editedRatings.communication +
                    editedRatings.work_quality +
                    editedRatings.punctuality +
                    editedRatings.appearance) /
                  5
                }
              />
            </div>

            {!isScore && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    color='primary'
                  />
                }
                label={
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#595959',
                    }}
                  >
                    I want to hire this professional permanently
                  </span>
                }
              />
            )}
          </div>
        </div>


        <div className='d-flex justify-content-end'>
          <button
            className='btn btn-outline-primary me-2'
            style={{
              border: 0,
              color: '#2561B0',
            }}
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className='btn btn-outline-primary'
            style={{
              border: 0,
              color: isView ? '#BFBFBF' : '#2561B0',
            }}
            disabled={isView}
            onClick={
              isView
                ? handleClose
                : () => {
                  handleDoneClick();
                }
            }
          >
            Confirm
          </button>
        </div>
      </Box>
    </Modal>
  );
}
