import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import StarRating from '../../../ui-component/StarRating';

import { gridSpacing } from '../../../store/constant';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '6px',
};

export default function JobRatingDetailsModal({
  open,
  handleClose,
  selectedItem,
  fetchData,
}) {

  const [editModeOpen, setEditModeOpen] = useState(false);
  const authToken = localStorage.getItem('auth_token');
  // const [editedRatings, setEditedRatings] = useState({
  //   cleanliness: 5,
  //   professionalism: 5,
  //   communication: 5,
  //   standard_of_care: 5,
  //   organization: 5,
  // });

  const [ownerRatings, setOwnerRatings] = useState({
    professionalism: 0.1,
    communication: 0.1,
    work_quality: 0.1,
    punctuality: 0.1,
    appearance: 0.1,
  });


  const [editedRatings, setEditedRatings] = useState();

  const handleRatingChange = (category, newRating) => {
    setEditedRatings({
      ...editedRatings,
      [category]: newRating,
    });
  };

  const handleDoneClick = () => {
    axios
      .post(
        `https://api.mddentalstaffing.com/api/v1/reviews`,
        {
          user_location_id: selectedItem.user_location_id,
          posting_id: selectedItem.id,
          cleanliness: editedRatings.cleanliness,
          professionalism: editedRatings.professionalism,
          communication: editedRatings.communication,
          standard_of_care: editedRatings.standard_of_care,
          organization: editedRatings.organization,
        },
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
    setEditModeOpen(false);
  };

  useEffect(() => {
    if (selectedItem) {
      axios.get(`https://api.mddentalstaffing.com/api/v1/reviews?user_ids=${selectedItem.user.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
      ).then((res) => {
        setEditedRatings(res.data.data[0]);


        if (res.data.data.length > 0 && res.data.data[0].professional_review != null) {
          setOwnerRatings({
            professionalism: res.data.data[0].professional_review.professionalism,
            communication: res.data.data[0].professional_review.communication,
            work_quality: res.data.data[0].professional_review.work_quality,
            punctuality: res.data.data[0].professional_review.punctuality,
            appearance: res.data.data[0].professional_review.appearance,
          });
        }

      });
    }
  }, []);



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
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Rating
          </Typography>
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


        <div className='d-flex'>

          <div
            className='flex'
            style={{
              flexDirection: 'column',
              gap: 20,
              backgroundColor: '#d6dcff',
              borderRadius: '5px',
              padding: '5px',
              width: '100%'
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: '#262626',
              }}
            >
              Rating From Pratice Onwer
            </h3>

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
                {ownerRatings.professionalism && (
                  <StarRating rating={ownerRatings.professionalism} />
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
                {ownerRatings.communication && (
                  <StarRating rating={ownerRatings.communication} />
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
                {ownerRatings.work_quality && (
                  <StarRating rating={ownerRatings.work_quality} />
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
                {ownerRatings.punctuality && (
                  <StarRating rating={ownerRatings.punctuality} />
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
                {ownerRatings.appearance && (
                  <StarRating rating={ownerRatings.appearance} />
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

                {ownerRatings.professionalism && (
                  <StarRating
                    rating={
                      (ownerRatings.professionalism +
                        ownerRatings.communication +
                        ownerRatings.work_quality +
                        ownerRatings.punctuality +
                        ownerRatings.appearance) /
                      5
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <hr />
        {/* <div
          className='d-flex'
          style={{
            alignItems: 'center',
            gap: 10,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 500,
              color: '#262626',
            }}
          >
            Average Rating
          </h3>
          <StarRating rating={selectedItem?.user?.average_score} />
        </div>

        <hr /> */}



        <div className='d-flex'>
          <div
            className='flex'
            style={{
              flexDirection: 'column',
              gap: 20,
              // backgroundColor: '#d6dcff',
              // borderRadius: '5px',
              padding: '5px'
            }}
          >
            <h3
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: '#262626',
              }}
            >
              Rate to Practice Owner
            </h3>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 50,
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
                {editModeOpen ? (
                  <StarRating
                    rating={editedRatings?.cleanliness ? editedRatings.cleanliness : 0}
                    onChange={(newRating) =>
                      handleRatingChange('cleanliness', newRating)
                    }
                  />
                ) : (
                  <StarRating rating={editedRatings?.cleanliness ? editedRatings.cleanliness : 0} />
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
                {editModeOpen ? (
                  <StarRating
                    rating={editedRatings?.professionalism ? editedRatings.professionalism : 0}
                    onChange={(newRating) =>
                      handleRatingChange('professionalism', newRating)
                    }
                  />
                ) : (
                  <>
                    <StarRating rating={editedRatings?.professionalism ? editedRatings.professionalism : 0} />
                  </>

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
                    rating={editedRatings?.communication ? editedRatings.communication : 0}
                    onChange={(newRating) =>
                      handleRatingChange('communication', newRating)
                    }
                  />
                ) : (
                  <>
                    <StarRating rating={editedRatings?.communication ? editedRatings.communication : 0} />
                  </>
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
                {editModeOpen ? (
                  <StarRating
                    rating={editedRatings?.standard_of_care ? editedRatings.standard_of_care : 0}
                    onChange={(newRating) =>
                      handleRatingChange('standard_of_care', newRating)
                    }
                  />
                ) : (
                  <>
                    <StarRating rating={editedRatings?.standard_of_care ? editedRatings.standard_of_care : 0} />
                  </>
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
                {editModeOpen ? (
                  <StarRating
                    rating={editedRatings?.organization ? editedRatings.organization : 0}
                    onChange={(newRating) =>
                      handleRatingChange('organization', newRating)
                    }
                  />
                ) : (
                  <>
                    <StarRating rating={editedRatings?.organization ? editedRatings.organization : 0} />
                  </>
                )}
              </div>
            </div>
          </div>

        </div>






        <div
          className='d-flex'
          style={{
            alignItems: 'center',
            gap: 10,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 500,
              color: '#262626',
            }}
          >
            Average Rating
          </h3>
          <StarRating rating={selectedItem?.user?.average_score} />
          <p
            style={{
              margin: 0,
              fontSize: 38,
              fontWeight: 500,
              color: '#FA8214',
            }}
          >
            {selectedItem?.user?.average_score}
          </p>
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
          {!editModeOpen ? (
            <button
              className='btn btn-outline-primary'
              style={{
                border: 0,
                color: '#2561B0',
              }}
              onClick={() => setEditModeOpen(true)}
            >
              Edit
            </button>
          ) : (
            <button
              className='btn btn-outline-primary'
              style={{
                border: 0,
                color: '#2561B0',
              }}
              onClick={handleDoneClick}
            >
              Done
            </button>
          )}
        </div>
      </Box>
    </Modal>
  );
}
