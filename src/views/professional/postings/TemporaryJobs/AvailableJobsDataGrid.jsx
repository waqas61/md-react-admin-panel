import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Button } from 'react-bootstrap';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { capitalizeFirstLetter } from '../../../../utils/helper';
import GreenSwitch from '../../../../components/General/GreenSwitch';
import axios from 'axios';

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
  appliedStatus: {
    backgroundColor: '#FFC400',
    border: '1px solid #FFC400',
    borderRadius: '16px',
    padding: '1px 8px',
  },
  updatedStatus: {
    backgroundColor: '#8F00FF',
    border: '1px solid #8F00FF',
    borderRadius: '16px',
    padding: '1px 8px',
  },
  approvedStatus: {
    backgroundColor: '#4CAF50',
    border: '1px solid #388E3C',
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
    case 'applied':
      return classes.appliedStatus;
    case 'updated':
      return classes.updatedStatus;
    case 'approved':
      return classes.approvedStatus;
    default:
      return status;
  }
};

const AvailableJobsDataGrid = ({
  classes,
  rows,
  columns,
  paging,
  selectedItem,
  setSelectedItem,
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

  const handleHidePosting = (id) => {
    axios
      .put(
        `https://api.mddentalstaffing.com/api/v1/postings/${id}/hide`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then(() => {
        fetchData(current_page, rowsPerPage);
      });
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
                <span
                  className={`${getStatusStyle(
                    item.applicant_status.toLowerCase(),
                    classes
                  )}`}
                >
                  {capitalizeFirstLetter(item.applicant_status)}
                </span>
              </TableCell>
              <TableCell className={classes.cell}>
                {item.user.companies[0].name}
              </TableCell>
              <TableCell className={classes.cell}>
                {item.user_location.place_name}
              </TableCell>
              <TableCell className={classes.cell}>
                <div
                  style={{
                    padding: 4,
                    borderRadius: 3,
                    borderColor: '#E8E8E8',
                    borderWidth: 1,
                  }}
                >
                  <span
                    style={{
                      backgroundColor: '#F5F5F5',
                      padding: '2px 10px',
                      borderRadius: '2px',
                    }}
                  >
                    {item.schedules_count}
                  </span>
                </div>
              </TableCell>
              <TableCell className={classes.cell}>
                <div>
                  <span
                    style={{
                      color: '#2561B0',
                      textDecoration: 'underline',
                    }}
                  >
                    {item.distance}
                  </span>
                  <LocationOnOutlinedIcon
                    style={{ marginLeft: 5, color: '#FA5A16' }}
                  />
                </div>
              </TableCell>
              <TableCell className={classes.cell}>
                {item.applicant_status === 'new' && (
                  <GreenSwitch
                    checked={item.is_hidden === 0}
                    label=''
                    onChange={() => handleHidePosting(item.id)}
                  />
                )}
              </TableCell>
              <TableCell className={classes.cell}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                  }}
                >
                  {item.applicant_status === 'new' ? (
                    <Button
                      style={{ backgroundColor: '#2561B0', border: 0 }}
                      onClick={() => {
                        navigate(
                          `/professional/jobs/temporary/${item.id}/calendar`
                        );
                      }}
                    >
                      <CalendarMonthOutlinedIcon
                        style={{
                          height: 24,
                        }}
                      />{' '}
                      Apply
                    </Button>
                  ) : item.applicant_status === 'updated' ? (
                    <Button style={{ backgroundColor: '#2561B0', border: 0 }}>
                      View
                    </Button>
                  ) : (
                    <></>
                  )}
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
          <span></span>
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

export default withStyles(styles)(AvailableJobsDataGrid);
