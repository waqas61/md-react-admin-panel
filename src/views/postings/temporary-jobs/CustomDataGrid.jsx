import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { withStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomDaysFilled from '../../../../components/General/CustomDaysFilled';
import { capitalizeFirstLetter } from '../../../../utils/helper';
import moment from 'moment';

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
    default:
      return status;
  }
};

const CustomDataGrid = ({
  classes,
  rows,
  columns,
  paging,
  selectedItem,
  setSelectedItem,
  setIsApplicantsSidebarOpen,
  fetchData,
}) => {
  const { total, per_page, current_page } = paging;
  const [page, setPage] = useState(current_page - 1);
  const [rowsPerPage, setRowsPerPage] = useState(per_page);

  const navigate = useNavigate();

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
              <TableCell className={classes.cell}>{item.title}</TableCell>
              <TableCell className={classes.cell}>
                {item.user_location.place_name}
              </TableCell>
              <TableCell className={classes.cell}>
                <span
                  className={`${getStatusStyle(
                    item.posting_status.toLowerCase(),
                    classes
                  )}`}
                >
                  {capitalizeFirstLetter(item.posting_status)}
                </span>
              </TableCell>
              <TableCell
                aria-describedby={selectedItem && selectedItem.id}
                style={{
                  position: 'relative',
                  color: '#000000',
                }}
              >
                {moment(item.start_date).format('MM/DD/YYYY')}
              </TableCell>
              <TableCell className={classes.cell}>
                {moment(item.end_date).format('MM/DD/YYYY')}
              </TableCell>
              <TableCell className={classes.cell}>
                {item.applicants_count > 0 ? (
                  <p
                    style={{
                      color: '#2561B0',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                    onClick={() => setIsApplicantsSidebarOpen(true)}
                  >
                    {item.applicants_count}
                  </p>
                ) : (
                  <>{item.applicants_count}</>
                )}
              </TableCell>
              <TableCell className={classes.cell}>
                <CustomDaysFilled
                  schedulesCount={item.schedules_count}
                  selectedCandidateCount={item.selected_candidate_count}
                  status={item.posting_status}
                  cancelledCount={item.cancelled_count}
                />
              </TableCell>
              <TableCell className={classes.cell}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    onClick={() =>
                      navigate(`/owner/postings/temporary/${item.id}`)
                    }
                    style={{ backgroundColor: '#2561B0', border: 0 }}
                  >
                    Postings
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {total === 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '40vh',
            color: '#D9D9D9',
          }}
        >
          <h1>Create New Posting</h1>
        </div>
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
    </div>
  );
};

export default withStyles(styles)(CustomDataGrid);
