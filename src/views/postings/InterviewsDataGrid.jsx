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
import { capitalizeFirstLetter } from '../../../utils/helper';
import CalendarIcon from '../../../assets/icons/calendar2.svg';
// import ApplyInterviewModal from './ApplyInterviewModal';
// import AcceptInterviewModal from './AcceptInterviewModal';
import SuccessModal from '../../../components/General/SuccessModal';

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
    case 'scheduled':
      return classes.activeStatus;
    case 'rejected':
      return classes.cancelledStatus;
    default:
      return status;
  }
};

const InterviewsDataGrid = ({
  classes,
  rows,
  columns,
  paging,
  selectedItem,
  setSelectedItem,
  fetchData,
  posting,
}) => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const { total, per_page, current_page } = paging;
  const [page, setPage] = useState(current_page - 1);
  const [rowsPerPage, setRowsPerPage] = useState(per_page);

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false);

  const handleApplyClick = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
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
                {capitalizeFirstLetter(item.type)}
              </TableCell>
              <TableCell className={classes.cell}>
                <span
                  className={`${getStatusStyle(
                    item.interview_status.toLowerCase(),
                    classes
                  )}`}
                >
                  {item.interview_status == 'rejected' ? 'Decline' : capitalizeFirstLetter(item.interview_status)}
                </span>
              </TableCell>
              <TableCell className={classes.cell}>
                {item.start_time ? item.start_time : '-'}
              </TableCell>
              <TableCell className={classes.cell}>
                {item.end_time ? item.end_time : '-'}
              </TableCell>
              <TableCell className={classes.cell}>
                {item.interview_date ? item.interview_date : '-'}
              </TableCell>
              <TableCell className={classes.cell}>- Hidden -</TableCell>

              <TableCell
                className={classes.cell}
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  padding: 18,
                }}
              >
                {item.interview_status === 'new' ? (
                  <Button
                    style={{ backgroundColor: '#2561B0', border: 0 }}
                    onClick={() => handleApplyClick(item)}
                  >
                    <img src={CalendarIcon} alt='' style={{ marginRight: 5 }} />
                    Apply
                  </Button>
                ) : item.interview_status === 'pass' && item.proposal[0]?.proposal_status == 'new' ? (
                  <>
                    <Button
                      style={{ backgroundColor: '#2561B0', border: 0 }}
                      onClick={() => setIsProposalDialogOpen(true)}
                    >
                      View Proposal
                    </Button>
                  </>
                ) : item.interview_status === 'pass' && item.proposal[0]?.proposal_status == 'accepted' ? (
                  <>Accepted Proposal</>
                ) : item.interview_status === 'pass' && item.proposal[0]?.proposal_status == 'cancelled' ? (
                  <>Declined</>
                ) : (
                  <></>
                )}
              </TableCell>
            </TableRow>
          ))}
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

      {/* {isDialogOpen && selectedItem && (
        <ApplyInterviewModal
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          item={selectedItem}
          posting={posting}
          fetchData={fetchData}
        />
      )} */}

      {/* {isProposalDialogOpen && selectedItem && (
        <AcceptInterviewModal
          isOpen={isProposalDialogOpen}
          onClose={() => setIsProposalDialogOpen(false)}
          item={selectedItem}
          setOpenSuccessModal={setOpenSuccessModal}
          setSuccessMessage={setSuccessMessage}
          fetchData={fetchData}
        />
      )} */}

      {openSuccessModal && (
        <SuccessModal
          open={openSuccessModal}
          handleClose={() => setOpenSuccessModal(false)}
          successMessage={successMessage}
        />
      )}


    </div>
  );
};

export default withStyles(styles)(InterviewsDataGrid);
