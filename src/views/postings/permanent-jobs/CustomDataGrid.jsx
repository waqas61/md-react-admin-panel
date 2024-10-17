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
import {
  calculateDateDifference,
  capitalizeFirstLetter,
} from '../../../../utils/helper';
import PopoverCustom from '../../../../components/General/Popover';
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
                <TableCell aria-describedby={selectedItem && selectedItem.id}>
                  {calculateDateDifference(item.start_date) < 1 ? (
                    <PopoverCustom
                      date={moment(item.start_date).format('MM/DD/YYYY')}
                      type={'permanent'}
                      id={item.id}
                    />
                  ) : (
                    moment(item.start_date).format('MM/DD/YYYY')
                  )}
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
                  {moment(item.created_at).format('MM/DD/YYYY')}
                </TableCell>
                <TableCell className={classes.cell}>
                  {item.applicants_count > 0 && (
                    <svg
                      width='16'
                      height='24'
                      viewBox='0 0 16 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M12.6667 18.6666C13.4 18.6666 14 18.0666 14 17.3333V7.99992C14 7.26659 13.4 6.66659 12.6667 6.66659H12V5.33325H10.6667V6.66659H5.33333V5.33325H4V6.66659H3.33333C2.59333 6.66659 2.00667 7.26659 2.00667 7.99992L2 17.3333C2 18.0666 2.59333 18.6666 3.33333 18.6666H12.6667ZM6 11.3333H4.66667V12.6666H6V11.3333ZM3.33333 9.33325H12.6667V7.99992H3.33333V9.33325ZM12.6667 10.6666V17.3333H3.33333V10.6666H12.6667ZM10 12.6666H11.3333V11.3333H10V12.6666ZM8.66667 12.6666H7.33333V11.3333H8.66667V12.6666Z'
                        fill='#2561B0'
                      />
                    </svg>
                  )}
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
