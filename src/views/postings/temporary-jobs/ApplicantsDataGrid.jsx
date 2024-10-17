import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@mui/material';
import { withStyles } from '@mui/styles'
import { Button } from 'react-bootstrap';
import StarRating from '../../../../components/General/StarRating';
import '../TemporaryJobs/PostingApplicants.css';
import ApproveApplicantDialog from './ApproveApplicantDialog';
import axios from 'axios';
import ApplicantNoShowModal from './ApplicantNoShowModal';
import { capitalizeFirstLetter } from '../../../../utils/helper';
import ApplicantPopup from '../../../../components/General/ApplicantPopup';

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
  },
  cancelledStatus: {
    backgroundColor: '#FA5A16',
    border: '1px solid #E54C0B',
    borderRadius: '16px',
    padding: '1px 8px',
  },
  completedStatus: {
    backgroundColor: 'transparent',
    color: '#4CAF50',
  },
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
};

const getStatusStyle = (status, classes) => {
  switch (status) {
    case 'new':
      return classes.newStatus;
    case 'active':
      return classes.activeStatus;
    case 'cancelled':
      return classes.cancelledStatus;
    case 'completed':
      return classes.completedStatus;
    case 'updated':
      return classes.updatedStatus;
    case 'applied':
      return classes.appliedStatus;
    case 'approved':
      return classes.activeStatus;
    default:
      return status;
  }
};

const ApplicantsDataGrid = ({
  classes,
  rows,
  columns,
  paging,
  selectedItem,
  setSelectedItem,
  fetchData,
  postingSchedule,
}) => {
  const { total, per_page, current_page } = paging;
  const [page, setPage] = useState(current_page - 1);
  const [rowsPerPage, setRowsPerPage] = useState(per_page);
  const [openNoShowModal, setOpenNoShowModal] = useState(false);

  useEffect(() => {
    setPage(current_page - 1);
    setRowsPerPage(per_page);
  }, [paging, current_page, per_page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSelectedItem(null);
    fetchData(newPage + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    setSelectedItem(null);
    fetchData(1, newRowsPerPage);
  };

  const handleRowClick = (item) => {
    if (selectedItem && selectedItem.id === item.id) {
      setSelectedItem(null);
      return;
    } else if (selectedItem && selectedItem.id !== item.id) {
      setSelectedItem(item);
      return;
    } else {
      setSelectedItem(item);
      return;
    }
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApproveClick = () => {
    setIsDialogOpen(true);
  };

  const handleApproveAction = () => {
    axios
      .put(
        `https://api.mddentalstaffing.com/api/v1/owner/applicants/${selectedItem.posting_applicants[0].id}/approved`,
        {
          posting_applicant_id: selectedItem.posting_applicants[0].id,
        },
        {
          headers: {
            method: 'PUT',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((res) => {
        fetchData(1, 10);
        setIsDialogOpen(false);
      })
      .catch((e) => console.log(e));
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
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
          {rows.map((item, index) => (
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
                    src={item.profile_photo_path}
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
                      margin: 0,
                      padding: 0,
                    }}
                    onClick={() => handleNameClick(item)}
                  >
                    {item.first_name} {item.last_name}
                  </p>
                </div>
              </TableCell>
              <TableCell className={classes.cell}>
                {item.user_sub_categories &&
                  item.user_sub_categories.map((sub, index) => (
                    <span key={sub.sub_category.id}>
                      {sub.sub_category.name}
                      {index < item.user_sub_categories.length - 1 ? ', ' : ''}
                    </span>
                  ))}
              </TableCell>
              <TableCell className={classes.cell}>{item.rate}</TableCell>
              <TableCell className={classes.cell}>
                <StarRating rating={item.professional_score} />
              </TableCell>
              <TableCell className={classes.cell}>
                <StarRating rating={item.average_score} />
              </TableCell>
              <TableCell className={classes.cell}>
                <span
                  className={`${getStatusStyle(
                    item.posting_applicants[0].application_status.toLowerCase(),
                    classes
                  )}`}
                >
                  {capitalizeFirstLetter(
                    item.posting_applicants[0].application_status
                  )}
                </span>
              </TableCell>
              <TableCell
                className={classes.cell}
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  padding: 18,
                }}
              >
                {item.posting_applicants[0].application_status === 'applied' ? (
                  <Button
                    style={{ backgroundColor: '#2561B0', border: 0 }}
                    onClick={(() => setSelectedItem(item), handleApproveClick)}
                  >
                    Approve
                  </Button>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'end',
                      gap: 15,
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: '#2561B0',
                        border: 0,
                        height: '32px',
                        width: '84px',
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                      onClick={() => setOpenNoShowModal(true)}
                    >
                      No Show
                    </Button>
                    <Button
                      style={{
                        backgroundColor: '#2561B0',
                        border: 0,
                        width: '64px',
                        height: '32px',
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      Score
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
          <ApplicantPopup
            isOpen={isApplicantDataOpen}
            onClose={handleApplicantDataClose}
            selectedApplicant={selectedApplicant}
          />
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component='div'
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {selectedItem && selectedItem.id && (
        <ApproveApplicantDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          onApprove={handleApproveAction}
        />
      )}

      {openNoShowModal && selectedItem && (
        <ApplicantNoShowModal
          isOpen={openNoShowModal}
          onClose={() => setOpenNoShowModal(false)}
          applicant={selectedItem}
          fetchData={fetchData}
          postingSchedule={postingSchedule}
        />
      )}
    </div>
  );
};

export default withStyles(styles)(ApplicantsDataGrid);
