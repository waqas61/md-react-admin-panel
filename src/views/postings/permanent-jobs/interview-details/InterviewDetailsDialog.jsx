import * as React from 'react';
import axios from 'axios';
import moment from 'moment';

import { Done } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import StarRating from '../../../../ui-component/StarRating';
import CustomDataGrid from '../../../../ui-component/CustomDataGrid';

import { getStatusStyle } from '../../../../utils/CustomDataGridStyle';
import { capitalizeFirstLetter } from '../../../../utils/helper';

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

export default function InterviewDetailsDialog({
  open,
  handleClose,
  selectedItem,
  fetchData,
  postingId,
  applicantId
}) {
  const [interviews, setInterviews] = React.useState([]);
  const [selectedInterview, setSelectedInterview] = React.useState(null);

  const getInterviews = async () => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/interviews?posting_id=${postingId}&applicant_id=${applicantId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((res) => {
        setInterviews(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getInterviews();
  }, []);

  const columns = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'type_interview', headerName: 'Type Interview', width: 150 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'summary', headerName: 'Summary', width: 250 },
  ];

  if (interviews?.some((item) => item.interview_status === 'scheduled')) {
    columns.push({
      field: 'accept',
      headerName: '',
      width: 50,
    });
  }

  const rows = interviews?.map((item) => {
    const statusStyle = getStatusStyle(item.interview_status);
    const typeStyle = getStatusStyle(item.type);
    return {
      id: item.id,
      date: item.interview_date
        ? moment(item.interview_date).format('MM/DD/YYYY')
        : '-',
      type_interview: (
        <span style={typeStyle}>
          {item.type ? capitalizeFirstLetter(item.type) : '-'}
        </span>
      ),
      status: (
        <>
          {item.interview_status === 'scheduled' ? (
            <select
              className='form-control'
              value={item.interview_result}
              onChange={(e) => {
                const newInterviews = [...interviews];
                const index = newInterviews.findIndex(
                  (interview) => interview.id === item.id
                );
                newInterviews[index].interview_result = e.target.value;
                setInterviews(newInterviews);
              }}
            >
              <option value=''></option>
              <option value='pass'>Pass</option>
              <option value='fail'>Fail</option>
            </select>
          ) : (
            <span style={statusStyle}>
              {item.interview_status
                ? capitalizeFirstLetter(item.interview_status)
                : '-'}
            </span>
          )}
        </>
      ),
      summary:
        item.interview_status === 'scheduled' ? (
          <input
            type='text'
            className='form-control'
            placeholder='Add Summary'
            value={item.summary}
            onChange={(e) => {
              const newInterviews = [...interviews];
              const index = newInterviews.findIndex(
                (interview) => interview.id === item.id
              );
              newInterviews[index].summary = e.target.value;
              setInterviews(newInterviews);
            }}
          />
        ) : (
          <span>{item.summary ? item.summary : '-'}</span>
        ),
      accept: (
        <>
          {item.interview_status === 'scheduled' && (
            <button
              className='btn btn-primary'
              style={{
                border: 0,
                backgroundColor: '#2561B0',
              }}
              disabled={
                !item.summary ||
                item.summary === '' ||
                !item.interview_result ||
                item.interview_result === ''
              }
              onClick={() => {
                axios
                  .post(
                    `https://api.mddentalstaffing.com/api/v1/owner/interviews/results?interview_id=${item.id}`,
                    {
                      interview_status: item.interview_result,
                      summary: item.summary,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          'auth_token'
                        )}`,
                      },
                    }
                  )
                  .then((res) => {
                    fetchData(1, 10);
                    handleClose();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <Done />
            </button>
          )}
        </>
      ),
    };
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
            Interview Details
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

        <div
          className='d-flex'
          style={{
            alignItems: 'center',
            gap: 40,
          }}
        >
          <img
            src={`https://api.mddentalstaffing.com/api/v1/assets/${selectedItem.avatar}`}
            alt=''
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <div>
            <div
              className='d-flex'
              style={{
                gap: 40,
              }}
            >
              <div>
                <p
                  style={{
                    color: '#595959',
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                >
                  Candidate Name
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 400,
                  }}
                >
                  {selectedItem.first_name} {selectedItem.last_name}
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: '#595959',
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                >
                  Location
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 400,
                  }}
                >
                  {selectedItem?.user_location
                    ? selectedItem.user_location.place_name
                    : '-'}
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: '#595959',
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                >
                  Rating
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 400,
                  }}
                >
                  <StarRating rating={selectedItem.average_score} />
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: '#595959',
                    fontSize: '12px',
                    fontWeight: 400,
                  }}
                >
                  Rate($)
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 400,
                  }}
                >
                  {selectedItem.rate}
                </p>
              </div>
            </div>
            <div
              style={{
                marginTop: '20px',
              }}
            >
              <p
                style={{
                  color: '#595959',
                  fontSize: '12px',
                  fontWeight: 400,
                }}
              >
                Specialty
              </p>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 400,
                }}
              >
                {selectedItem.user_sub_categories.length > 0 ? (
                  selectedItem.user_sub_categories.map((sub, index) => (
                    <span key={sub.sub_category.id}>
                      {sub.sub_category.name}
                      {index < selectedItem.user_sub_categories.length - 1
                        ? ', '
                        : ''}
                    </span>
                  ))
                ) : (
                  <>-</>
                )}
              </p>
            </div>
          </div>
        </div>

        <hr />

        {interviews && (
          <CustomDataGrid
            columns={columns}
            rows={rows}
            padding='0px'
            selectedItem={selectedInterview}
            setSelectedItem={setSelectedInterview}
          />
        )}

        <div className='d-flex justify-content-end'>
          <button
            className='btn btn-primary'
            style={{
              border: 0,
              backgroundColor: '#2561B0',
            }}
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </Box>
    </Modal>
  );
}
