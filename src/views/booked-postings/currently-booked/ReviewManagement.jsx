import React, { useState } from 'react';
import Layout from '../../../../components/Layout';
import { Button } from 'react-bootstrap';
import { Grid } from '@mui/material';
import FilterIcon from '../../../../assets/icons/filter.svg';
import RefreshIcon from '../../../../assets/icons/arrow-clockwise.svg';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddReviewModal from './AddReviewModal';
import moment from 'moment';
import CustomDataGrid from '../../../../components/General/CustomDataGrid';
import StarRating from '../../../../components/General/StarRating';

const ReviewManagement = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filtersSidbar, setFiltersSidebar] = useState(null);
  const [reviews, setReviews] = useState(null);

  const [openAddReview, setOpenAddReview] = useState(false);
  const [openEditReview, setOpenEditReview] = useState(false);
  const [openViewReview, setOpenViewReview] = useState(false);

  const [user, setUser] = useState(null);
  const [posting, setPosting] = useState(null);

  const { postingId, id } = useParams();

  const authToken = localStorage.getItem('auth_token');

  const fetchUser = () => {
    axios
      .get(`https://api.mddentalstaffing.com/api/v1/owner/applicant/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setUser(res.data.data);
      });
  };

  const fetchPosting = () => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/postings/${postingId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setPosting(res.data.data);
      });
  };

  const fetchReviews = (page, limit) => {
    axios
      .get(
        `https://api.mddentalstaffing.com/api/v1/owner/reviews?user_id=${id}&page=${page}&posting_id=${postingId}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setReviews(res.data);
      });
  };

  useEffect(() => {
    fetchReviews(1, 10);
  }, []);

  useEffect(() => {
    fetchUser();
    fetchPosting();
  }, []);

  const columns = [
    { field: 'date', headerName: 'Date Reviewed', width: 150 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'posting', headerName: 'Posting', width: 150 },
    { field: 'average_score', headerName: 'Average Score', width: 150 },
  ];

  const rows = reviews?.data?.map((review) => {
    return {
      id: review.id,
      date: moment(review.created_at).format('MM/DD/YYYY'),
      location: review?.posting?.user_location?.place_name
        ? review.posting.user_location.place_name
        : '-',
      posting: review.posting.title,
      average_score: <StarRating rating={review.user.average_score} />,
    };
  });

  return (
    <Layout
      items={[{ link: '/owner/booked/currently', name: 'Booked Postings' }]}
    >
      <Grid
        sx={{
          px: 3,
          pt: 2,
          pb: 1,
          borderBottom: '1px solid #D9D9D9',
          width: 'auto',
        }}
      >
        <div>
          <div>
            <h4 className='pb-0 mb-1' style={{ color: '#262626' }}>
              Review Management
            </h4>
            <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
              Post / See / Edit Review
            </p>
          </div>
        </div>
      </Grid>
      <div
        className='d-flex justify-content-between align-items-center'
        style={{
          padding: '10px 20px',
          backgroundColor: '#F5F5F5',
          borderBottom: '1px solid #D9D9D9',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 20,
          }}
        >
          <Button
            variant='outlined'
            style={{
              border: '1px solid #2561B0',
              color: '#595959',
              backgroundColor: '#fff',
            }}
            onClick={() => setOpenAddReview(true)}
          >
            Add
          </Button>
          <Button
            variant='outlined'
            style={{
              border:
                selectedItem !== null
                  ? '1px solid #2561B0'
                  : '1px solid #D9D9D9',
              color: selectedItem !== null ? '#595959' : '#BFBFBF',
              backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
            }}
            disabled={selectedItem === null}
            onClick={() => setOpenEditReview(true)}
          >
            Edit
          </Button>
          <Button
            variant='outlined'
            style={{
              border:
                selectedItem !== null
                  ? '1px solid #2561B0'
                  : '1px solid #D9D9D9',
              color: selectedItem !== null ? '#595959' : '#BFBFBF',
              backgroundColor: selectedItem != null ? '#fff' : '#F5F5F5',
            }}
            disabled={selectedItem === null}
            onClick={() => setOpenViewReview(true)}
          >
            View
          </Button>
        </div>
        <div
          className='d-flex'
          style={{
            gap: 20,
            alignItems: 'center',
          }}
        >
          <Button
            style={{
              border: '1px solid #2561B0',
              color: '#595959',
              backgroundColor: '#2561B0',
            }}
            onClick={() => setFiltersSidebar(true)}
          >
            <img src={FilterIcon} alt='' />
            <span
              style={{
                marginLeft: 5,
                color: '#fff',
              }}
            >
              Filters
            </span>
          </Button>
          <Button
            style={{
              border: '1px solid #2561B0',
              color: '#595959',
              backgroundColor: '#fff',
            }}
            onClick={() => {
              fetchReviews(1, 10)
            }}
          >
            <img src={RefreshIcon} alt='' />
            <span>
              <span
                style={{
                  marginLeft: 5,
                }}
              >
                Reset filters
              </span>
            </span>
          </Button>
        </div>
      </div>

      {reviews && reviews.data && (
        <CustomDataGrid
          columns={columns}
          rows={rows}
          paging={reviews.paging}
          fetchData={fetchReviews}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}

      {openAddReview && (
        <AddReviewModal
          fetchData={() => {
            fetchReviews(1, 10);
          }}
          handleClose={() => setOpenAddReview(false)}
          open={openAddReview}
          user={user}
          postingId={postingId}
          posting={posting}
          selectedItem={selectedItem}
          isAdd
        />
      )}

      {openEditReview && (
        <AddReviewModal
          fetchData={() => {
            fetchReviews(1, 10);
          }}
          handleClose={() => setOpenEditReview(false)}
          open={openEditReview}
          user={user}
          postingId={postingId}
          posting={posting}
          selectedItem={selectedItem}
          isEdit
        />
      )}

      {openViewReview && (
        <AddReviewModal
          fetchData={() => {
            fetchReviews(1, 10);
          }}
          handleClose={() => setOpenViewReview(false)}
          open={openViewReview}
          user={user}
          postingId={postingId}
          posting={posting}
          selectedItem={selectedItem}
          isView
        />
      )}
    </Layout>
  );
};

export default ReviewManagement;
