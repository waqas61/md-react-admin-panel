import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Autocomplete,
  TextField,
  Box,
  Grid,
  Typography,
  Card,
  Badge,
  Radio,
  RadioGroup,
  Switch,
  FormGroup
} from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { withStyles } from '@mui/styles'
import ScheduleIcon from '@mui/icons-material/Schedule';


import '../temporary-jobs/PostingApplicants.css';

import SubCard from '../../../ui-component/cards/SubCard';

import ApplicantPopup from '../../../ui-component/ApplicantPopup';
import ErrorModal from '../../../ui-component/ErrorModal';
import LoadingButton from '../../../ui-component/LoadingButton';
import MarkPostCompletedDialog from '../../../ui-component/MarkPostCompletedDialog';
import StarRating from '../../../ui-component/StarRating';

import { capitalizeFirstLetter } from '../../../utils/helper';
import { getStatusStyle } from '../../../utils/CustomDataGridStyle';

import AddReviewModal from '../../booked-postings/currently-booked/AddReviewModal';

const styles = {
  table: {},
  cell: {
    padding: '10px',
  },
  newStatus: {
    backgroundColor: '#75B0FA',
    border: '1px solid #4A93F0',
    borderRadius: '16px',
    padding: '1px 8px',
  },
  activeStatus: {
    backgroundColor: '#4CAF50',
    border: '1px solid #388E3C',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },
  cancelledStatus: {
    backgroundColor: '#ff9900',
    border: '1px solid #ff9900',
    borderRadius: '16px',
    padding: '1px 8px',
  },
  completedStatus: {
    backgroundColor: '#ff9900',
    border: '1px solid #ff9900',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },
  // completedStatus: {
  //   backgroundColor: 'transparent',
  //   color: '#4CAF50',
  // },
  updatedStatus: {
    backgroundColor: '#B6A8FF',
    border: '1px solid #7C67EB',
    borderRadius: '16px',
    padding: '1px 8px',
  },
  appliedStatus: {
    backgroundColor: '#FFC400',
    border: '1px solid #FFC400',
    borderRadius: '16px',
    padding: '1px 8px',
  },
  selectedRow: {
    backgroundColor: '#D7E8FF',
  },
  rejectedStatus: {
    backgroundColor: '#FA5A16',
    border: '1px solid #E54C0B',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },
  interviewingStatus: {
    backgroundColor: '#7bd17e',
    border: '1px solid #ffffff',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },
  interviewingPassStatus: {
    backgroundColor: '#8e8fc4',
    border: '1px solid #ffffff',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },

  interviewingSuggestedStatus: {
    backgroundColor: '#659c9f',
    border: '1px solid #659c9f',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },

  interviewingScheduledStatus: {
    backgroundColor: '#ccb8ed',
    border: '1px solid #ccb8ed',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'black'
  },
  interviewingDeclinedStatus: {
    backgroundColor: '#101010',
    border: '1px solid #101010',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },
  interviewingFailStatus: {
    backgroundColor: '#101010',
    border: '1px solid #101010',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },


  approvedStatus: {
    backgroundColor: '#4CAF50',
    border: '1px solid #388E3C',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },
  proposalSentStatus: {
    backgroundColor: '#7bd17e',
    border: '1px solid #ffffff',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },
};

// const getStatusStyle = (status, classes) => {
//   switch (status) {
//     case 'new':
//       return classes.newStatus;
//     case 'active':
//       return classes.activeStatus;
//     case 'cancelled':
//       return classes.cancelledStatus;
//     case 'completed':
//       return classes.completedStatus;
//     case 'updated':
//       return classes.updatedStatus;
//     case 'applied':
//       return classes.appliedStatus;
//     case 'approved':
//       return classes.activeStatus;
//     case 'hired':
//       return classes.activeStatus;
//     case 'rejected':
//       return classes.rejectedStatus;


//     case 'interviewing':
//       return classes.interviewingStatus;
//     case 'interview_pass':
//       return classes.interviewingPassStatus;
//     case 'interview_declined':
//       return classes.interviewingDeclinedStatus;
//     case 'interviewing_scheduled':
//       return classes.interviewingScheduledStatus;
//     case 'interviewing_scheduled_suggested':
//       return classes.interviewingSuggestedStatus;
//     case 'interview_fail':
//       return classes.interviewingFailStatus;


//     case 'proposal_sent':
//       return classes.approvedStatus;
//     case 'proposal_accepted':
//       return classes.approvedStatus;
//     case 'proposal_decline':
//       return classes.approvedStatus;
//     case 'job_offered':
//       return classes.proposalSentStatus;
//     case 'offer_accepted':
//       return classes.proposalSentStatus;

//     default:
//       return status;
//   }
// };

const ApplicantsDataGrid = ({
  classes,
  rows,
  columns,
  paging,
  selectedItem,
  setSelectedItem,
  fetchApplicants,
  postingId,
  setInterviewDetailsOpen,
  setEnableProposal,
  setProfessionalProposedInterviewDetailsOpen
}) => {
  const { total, per_page, current_page } = paging;
  const [page, setPage] = useState(current_page - 1);
  const [rowsPerPage, setRowsPerPage] = useState(per_page);

  const [errorApproveDialog, setErrorApproveDialog] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [openViewReview, setOpenViewReview] = useState(false);
  const [user, setUser] = useState(null);
  const [posting, setPosting] = useState({});
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const [reLoading, setReLoading] = useState(false);
  const [reFinished, setReFinished] = useState(false);

  const [isMarkPostCompletedDialogOpen, setIsMarkPostCompletedDialogOpen] = useState(false);

  const [loadingButtonArray, setLoadingButtonArray] = useState(() => {
    var btn_array = [];
    rows.map((row, index) => {
      btn_array.push(
        {
          loading: false,
          finished: false,
        }
      );
    });
    return btn_array;
  });

  const [declineloadingButtonArray, setDeclineLoadingButtonArray] = useState(() => {
    var btn_array = [];
    rows.map((row, index) => {
      btn_array.push(
        {
          loading: false,
          finished: false,
        }
      );
    });
    return btn_array;
  });

  const navigate = useNavigate();

  useEffect(() => {
  }, []);


  const getRate = (user_location) => {
    var rate = user_location.filter((location) => {
      return location.is_current == true;
    });
    if (rate.length != 0) {
      return rate[0].desired_rate;
    } else {
      return 0;
    }
  }

  useEffect(() => {
    setPage(current_page - 1);
    setRowsPerPage(per_page);
  }, [paging, current_page, per_page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSelectedItem(null);
    fetchApplicants(newPage + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    setSelectedItem(null);
    fetchApplicants(1, newRowsPerPage);
  };


  const isProposal = (item) => {
    if (item.posting_applicants[0].interview_count > 0) {
      return true;
    }
    return false;
  }

  const handleRowClick = (item) => {

    if (selectedItem && selectedItem.id === item.id) {
      setSelectedItem(null);
      setEnableProposal(isProposal(item));
      return;
    } else if (selectedItem && selectedItem.id !== item.id) {
      setSelectedItem(item);
      setEnableProposal(isProposal(item))
      return;
    } else {
      setSelectedItem(item);
      setEnableProposal(isProposal(item))
      return;
    }
  };

  const updateButtonChanged = (state, index, key, value) => {
    if (state == 'decline') {
      var updatedAreas = [...loadingButtonArray];
      updatedAreas[index][key] = value;
      setLoadingButtonArray(updatedAreas);
    }
    if (state == 'reinvite') {
      var updatedAreas = [...declineloadingButtonArray];
      console.log('reinvite ==== > ', updatedAreas[index], index);
      updatedAreas[index][key] = value;
      setDeclineLoadingButtonArray(updatedAreas);
    }
  }


  useEffect(() => {

  }, [declineloadingButtonArray]);

  const declineAction = (item, index) => {
    updateButtonChanged('decline', index, 'loading', true);
    // setLoading(true);
    axios.put(
      `https://api.mddentalstaffing.com/api/v1/owner/applicants/${item.posting_applicants[0].id}/decline`,
      {
        posting_applicant_id: item.posting_applicants[0].id,
      },
      {
        headers: {
          method: 'PUT',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    ).then((res) => {
      fetchApplicants(1, 10);
      updateButtonChanged('decline', index, 'finished', true);
      // setFinished(true);
    }).catch((res) => {
      updateButtonChanged('decline', index, 'finished', true);
      // setFinished(true);
      // setErrorApproveDialog(true);
      // setErrorMessages(res.response.data.message.description);
      // setIsDialogOpen(false);
    });
  };

  const reinviteAction = (item, index) => {
    updateButtonChanged('reinvite', index, 'loading', true);
    axios.put(`https://api.mddentalstaffing.com/api/v1/owner/applicants/${item.posting_applicants[0].id}/re-invite`,
      {
        posting_applicant_id: item.posting_applicants[0].id,
      },
      {
        headers: {
          method: 'PUT',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    ).then((res) => {
      fetchApplicants(1, 10);
      updateButtonChanged('reinvite', index, 'finished', true);
    }).catch((res) => {
      updateButtonChanged('reinvite', index, 'finished', true);
      // setErrorApproveDialog(true);
      // setErrorMessages(res.response.data.message.description);
      // setIsDialogOpen(false);
    });

  };


  const [isApplicantDataOpen, setIsApplicantDataOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const handleNameClick = (item) => {
    setSelectedApplicant(item);
    setIsApplicantDataOpen(true);
  };
  const handleApplicantDataClose = () => {
    setSelectedApplicant(null);
    setIsApplicantDataOpen(false);
  };

  const hireApplicant = (id) => {
    if (id) {
      axios
        .put(
          `https://api.mddentalstaffing.com/api/v1/owner/applicants/${id}/hire`,
          null,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
          }
        )
        .then((res) => {
          fetchApplicants(page + 1, rowsPerPage);
        })
        .catch((res) => {
          setErrorApproveDialog(true);
          setErrorMessages(res.response.data.message.description);
        });
    }
  };

  return (
    <div>

      <Box sx={{ flexGrow: 1, border: '1px solid #D9D9D9', mt: 2 }}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {columns.map((item, index) => (
                <TableCell
                  key={index}
                  style={{ width: item.width }}
                  className={classes.cell}
                >
                  {item.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(item)}
                  className={
                    selectedItem && selectedItem.id === item.id
                      ? classes.selectedRow
                      : ''
                  }
                >
                  <TableCell className={classes.cell}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      <img
                        src={`https://api.mddentalstaffing.com/api/v1/assets/${item?.avatar}`}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: '50%',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleNameClick(item)}
                        alt=''
                      />
                      <p
                        style={{
                          fontSize: 14,
                          color: '#2561B0',
                          textDecoration: 'underline',
                          paddingTop: '15px',
                          cursor: 'pointer',
                          padding: 0,
                        }}
                        onClick={() => handleNameClick(item)}
                      >
                        {item.first_name} {item.last_name}
                      </p>
                    </div>
                  </TableCell>
                  {/* <TableCell className={classes.cell}>
                  {item.user_sub_categories &&
                    item.user_sub_categories.map((sub, index) => (
                      <span key={sub.sub_category.id}>
                        {sub.sub_category.name}
                        {index < item.user_sub_categories.length - 1
                          ? ', '
                          : ''}
                      </span>
                    ))}
                </TableCell> */}
                  {/* <TableCell className={classes.cell}>{item.rate}</TableCell> */}
                  <TableCell className={classes.cell}>{getRate(item.user_locations)}</TableCell>
                  <TableCell className={classes.cell}>
                    <StarRating rating={item.average_score} />
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <span
                      style={getStatusStyle(item.posting_applicants[0].applicant_status.toLowerCase())}
                    >
                      {capitalizeFirstLetter(
                        item.posting_applicants[0].applicant_status
                      )}
                    </span>
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                      }}
                    >
                      {/* {item.posting_applicants[0].application_status !== 'hired' && (
                      <Button
                        variant='outline-primary'
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '1px solid #2561B0',
                          borderRadius: '6px',
                          color: '#2561B0',
                          width: '100%',
                          whiteSpace: 'nowrap',
                          fontSize: 'bold',
                        }}
                        onClick={() =>
                          navigate(
                            `/owner/postings/permanent/${postingId}/applicants/${item.posting_applicants[0].id}/schedule`
                          )
                        }
                      >
                        Schedule for an Interview
                      </Button>
                    )}
                    {item.posting_applicants[0].interview_count > 0 && (
                      <Button
                        variant='outline-primary'
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '1px solid #2561B0',
                          borderRadius: '6px',
                          color: '#2561B0',
                          width: '100%',
                          whiteSpace: 'nowrap',
                          fontSize: 'bold',
                        }}
                        onClick={() => setInterviewDetailsOpen(true)}
                      >
                        Interview Details
                      </Button>
                    )} */}

                      {item.posting_applicants[0].application_status == 'rejected' ? (
                        <>
                          <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={1}>
                              <Grid item xs={10}>
                                <LoadingButton
                                  style={{



                                    backgroundColor: '#2561B0',
                                    border: 0,
                                    color: 'white',

                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #2561B0',
                                    borderRadius: '3px',

                                    width: '100%',
                                    fontSize: 'bold',
                                    padding: '3px 15px',
                                    fontSize: 'bold',

                                  }}



                                  loading={declineloadingButtonArray[index].loading}
                                  done={declineloadingButtonArray[index].finished}
                                  onClick={(() => reinviteAction(item, index))}
                                >
                                  Re-Invite
                                </LoadingButton>
                              </Grid>
                              {/* <Grid item xs={4}>
                              <CancelOutlinedIcon
                                style={{ fontSize: '38px', paddingBottom: '2px' }}
                              />
                            </Grid> */}
                            </Grid>
                          </Box>
                        </>
                      ) : item.posting_applicants[0].application_status == 'hired' ? (
                        <>
                          <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={1}>
                              <Grid item xs={10}>
                                <Button
                                  size="small"
                                  variant='outline-primary'
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #2561B0',
                                    borderRadius: '3px',
                                    color: '#2561B0',
                                    width: '100%',
                                    fontSize: 'bold',
                                    padding: '3px 15px',
                                    fontSize: 'bold',
                                  }}
                                  onClick={() => {
                                    setSelectedItem({ id: item?.id });
                                    setIsMarkPostCompletedDialogOpen(true);
                                  }}
                                >
                                  Mark Complete
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </>
                      ) : item.posting_applicants[0].application_status == 'completed' ? (
                        <>
                          <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={1}>
                              <Grid item xs={10}>
                                <Button
                                  size="small"
                                  variant='outline-primary'
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #2561B0',
                                    borderRadius: '3px',
                                    color: '#2561B0',
                                    width: '100%',
                                    fontSize: 'bold',
                                    padding: '3px 15px',
                                    fontSize: 'bold',
                                  }}
                                  onClick={() => {
                                    setOpenViewReview(true);
                                    setSelectedItem({ id: item?.id });
                                    setPosting(item.posting_applicants[0].posting)
                                    setUser(item);
                                  }}
                                >
                                  Review
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={1}>
                              <Grid item xs={5}>
                                <Button
                                  size="small"
                                  variant='outline-primary'
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #2561B0',
                                    borderRadius: '3px',
                                    color: '#2561B0',
                                    width: '100%',
                                    // whiteSpace: 'nowrap',
                                    fontSize: 'bold',
                                    padding: '3px 15px',
                                    fontSize: 'bold',
                                  }}
                                  onClick={() => {
                                    navigate(
                                      `/posting/permanent/interview/details/${postingId}/applicants/${item.posting_applicants[0].id}/schedule`
                                    );
                                    // setProfessionalProposedInterviewDetailsOpen(true)
                                  }}
                                >
                                  <i>{''}<ScheduleIcon style={{ fontSize: '18px', paddingBottom: '2px' }} />{''} </i>
                                  Interviews {item.posting_applicants[0].is_interviewing > 0 ? '(' + item.posting_applicants[0].is_interviewing + ')' : ''}
                                </Button>
                              </Grid>
                              <Grid item xs={5}>
                                {/* <Button
                                // variant='outline-primary'
                                style={{ backgroundColor: '#2561B0', border: 0 }}
                                onClick={(() => setSelectedItem(item), declineAction)}
                              >
                                Decline
                              </Button> */}
                                <LoadingButton
                                  size="small"
                                  color='primary'
                                  variant='contained'
                                  style={{
                                    width: '100%',
                                    whiteSpace: 'nowrap',
                                    fontSize: 'bold',
                                    // padding: '6px 12px',
                                    borderRadius: '3px',
                                    transition: 'background-color 0.3s',
                                    color: '#fff',
                                    backgroundColor: '#FA5A16',
                                  }}
                                  loading={loadingButtonArray[index]?.loading}
                                  done={loadingButtonArray[index]?.finished}
                                  // loading={loading}
                                  // done={finished}
                                  onClick={(() => declineAction(item, index))}
                                >
                                  Decline
                                </LoadingButton>
                              </Grid>
                            </Grid>
                          </Box>
                        </>
                      )}
                    </div>
                  </TableCell>
                  {/* <TableCell className={classes.cell}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'end',
                    }}
                  >
                    {item.posting_applicants[0].application_status !==
                      'hired' && (
                        <Button
                          variant='primary'
                          style={{
                            backgroundColor:
                              item.posting_applicants[0].application_status ===
                                'new'
                                ? '#D9D9D9'
                                : '#2561B0',
                            color:
                              item.posting_applicants[0].application_status ===
                                'new'
                                ? '#8C8C8C'
                                : '#fff',
                            borderRadius: '6px',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          disabled={
                            item.posting_applicants[0].application_status ===
                            'new'
                          }
                          onClick={() => {
                            hireApplicant(item.posting_applicants[0].id);
                          }}
                        >
                          Hire
                        </Button>
                      )}
                  </div>
                </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
      {selectedApplicant && (
        <ApplicantPopup
          isOpen={isApplicantDataOpen}
          onClose={handleApplicantDataClose}
          selectedApplicant={selectedApplicant}
        />
      )}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component='div'
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {errorApproveDialog && (
        <ErrorModal
          open={errorApproveDialog}
          handleClose={() => setErrorApproveDialog(false)}
          errorMessage={errorMessages}
        />
      )}



      {openViewReview && (
        <AddReviewModal
          fetchData={() => {
            fetchApplicants(1, 10)
          }}
          handleClose={() => {
            setOpenViewReview(false);
            setSelectedItem({});
          }}
          open={openViewReview}
          user={user}
          postingId={postingId}
          posting={posting}
          selectedItem={selectedItem}
          isScore
        />
      )}


      {isMarkPostCompletedDialogOpen && (
        <MarkPostCompletedDialog
          isOpen={isMarkPostCompletedDialogOpen}
          onClose={() => setIsMarkPostCompletedDialogOpen(false)}
          item={selectedItem}
          fetchData={() => {
            fetchApplicants(1, 10)
          }}
          type='owner'
        />
      )}

    </div>
  );
};
export default withStyles(styles)(ApplicantsDataGrid);
