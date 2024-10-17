import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { withStyles } from '@mui/styles'

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import SubCard from '../../../../ui-component/cards/SubCard';
import MainCard from '../../../../ui-component/cards/MainCard';
import PanelCard from '../../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../../ui-component/cards/CardSecondaryAction';

// import '../TemporaryJobs/PostingApplicants.css';
import { capitalizeFirstLetter } from '../../../../utils/helper';
import { getStatusStyle } from "../../../../utils/CustomDataGridStyle";
import ErrorModal from '../../../../ui-component/ErrorModal';
import ProposalHistoryModal from '../../../../ui-component/ProposalHistoryModal';
import ApplicantPopup from '../../../../ui-component/ApplicantPopup';
import StarRating from '../../../../ui-component/StarRating';

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
    color: 'white'
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
    color: 'white'
  },
  completedStatus: {
    backgroundColor: '#4CAF50',
    border: '1px solid #388E3C',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
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
//     case 'accepted':
//       return classes.activeStatus;
//     case 'hired':
//       return classes.activeStatus;
//     default:
//       return status;
//   }
// };

const ProposalsDataGrid = ({
  classes,
  rows,
  columns,
  paging,
  selectedItem,
  setSelectedItem,
  fetchApplicants,
  postingId,
  setInterviewDetailsOpen,
}) => {
  const { total, per_page, current_page } = paging;
  const [page, setPage] = useState(current_page - 1);
  const [rowsPerPage, setRowsPerPage] = useState(per_page);
  const [errorApproveDialog, setErrorApproveDialog] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [historyModal, setHistoryModal] = useState(false);
  const navigate = useNavigate();

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

  const handleRowClick = (item) => {
    if (selectedItem && selectedItem.id === item.id) {
      setHistoryModal(false);
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
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {

            var statusStyle = getStatusStyle(item.proposal_status.toLowerCase());
            return (
              <TableRow
                key={index}
                onClick={() => handleRowClick(item)}
                className={
                  selectedItem && selectedItem.id === item.id ? classes.selectedRow : ''
                }
              >
                <TableCell className={classes.cell}>
                  {moment(item.date_time).utc().format('MM/DD/YY hh:mm A')}
                </TableCell>

                <TableCell className={classes.cell}>
                  $ {item.hiring_rate}
                </TableCell>

                {/* <TableCell className={classes.cell}>
                    {item.rate}
                  </TableCell> */}

                <TableCell className={classes.cell}>
                  {/* <Chip label={capitalizeFirstLetter(item.proposal_status)} color="secondary" /> */}
                  <span style={statusStyle}>
                    {capitalizeFirstLetter(
                      item.proposal_status
                    )}
                  </span>

                </TableCell>

                <TableCell className={classes.cell}>
                  <Stack spacing={1} alignItems="left">
                    <Stack direction="row" spacing={1}>
                      {item.proposal_posting_schedules.map((day) => {
                        return (
                          <Chip label={capitalizeFirstLetter(day.schedule_day)} color="primary" />
                        );
                      })}
                    </Stack>
                  </Stack>
                </TableCell>

                <TableCell className={classes.cell}>
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
                    onClick={() => {
                      setSelectedItem(item);
                      setHistoryModal(true);
                    }}
                  // disabled={selectedItem != null ? false : true}
                  >
                    History
                  </Button>
                </TableCell>

              </TableRow>
            )
          })}
        </TableBody>
      </Table>
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

      {historyModal && (
        <ProposalHistoryModal
          selectedItem={selectedItem}
          open={historyModal}
          handleClose={() => setHistoryModal(false)}
        />
      )}

    </div>
  );
};
export default withStyles(styles)(ProposalsDataGrid);
