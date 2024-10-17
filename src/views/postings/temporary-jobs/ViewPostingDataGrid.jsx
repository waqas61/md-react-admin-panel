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
import { useNavigate } from 'react-router-dom';
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
    default:
      return status;
  }
};

const ViewPostingDataGrid = ({
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

  const convertToAMPM = (time) => {
    const [hour, minutes] = time.split(':');
    let period = 'AM';
    let hour12 = parseInt(hour, 10);
    if (hour12 >= 12) {
      hour12 = hour12 === 12 ? hour12 : hour12 - 12;
      period = 'PM';
    }
    if (hour12 === 0) {
      hour12 = 12;
    }

    return {
      hour: hour12,
      minutes,
      period,
    };
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
                    flexDirection: 'column',
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      color: '#595959',
                    }}
                  >
                    {item.schedule_day.toUpperCase()}
                  </span>
                  <span
                    style={{
                      fontSize: 20,
                      color: '#262626',
                      fontWeight: '500',
                    }}
                  >
                    {moment(item.schedule_date).format('MM/DD/YYYY')}
                  </span>
                </div>
              </TableCell>
              <TableCell className={classes.cell}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: 5,
                      border: '1px solid #D9D9D9',
                      borderRadius: 6,
                      padding: '2px 10px',
                    }}
                  >
                    <span>{convertToAMPM(item.start_time)?.hour}</span>
                    <span>:</span>
                    <span>{convertToAMPM(item.start_time)?.minutes}</span>
                  </div>
                  <div
                    style={{
                      backgroundColor: '#262626',
                      color: '#fff',
                      borderRadius: 6,
                      padding: '2px 5px',
                    }}
                  >
                    {convertToAMPM(item.start_time)?.period}
                  </div>
                </div>
              </TableCell>
              <TableCell className={classes.cell}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: 5,
                      border: '1px solid #D9D9D9',
                      borderRadius: 6,
                      padding: '2px 10px',
                    }}
                  >
                    <span>{convertToAMPM(item.end_time)?.hour}</span>
                    <span>:</span>
                    <span>{convertToAMPM(item.end_time)?.minutes}</span>
                  </div>
                  <div
                    style={{
                      backgroundColor: '#262626',
                      color: '#fff',
                      borderRadius: 6,
                      padding: '2px 5px',
                    }}
                  >
                    {convertToAMPM(item.end_time)?.period}
                  </div>
                </div>
              </TableCell>
              <TableCell className={classes.cell}>
                <div
                  className='d-flex'
                  style={{
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <a
                    href={`/owner/postings/temporary/${item.posting_id}/applicants/${item.id}`}
                    className='d-flex'
                    style={{
                      textDecoration: 'none',
                    }}
                  >
                    {item.applicants_count === 0 ? (
                      <span
                        style={{
                          fontSize: 14,
                          color: '#262626',
                        }}
                      >
                        Search in Progress
                      </span>
                    ) : (
                      item.posting_applicants
                        .slice(0, 5)
                        .map((applicant, index) => (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              position: 'relative',
                              cursor: 'pointer',
                            }}
                          >
                            <img
                              src={applicant.user.profile_photo_path}
                              alt=''
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: '50%',
                                position: 'relative',
                                zIndex: index,
                                // margin: `-${index * 6}px 0 0 -${index * 6}px`,
                              }}
                            />
                            {item.applicants_count === 1 ? (
                              <span
                                style={{
                                  fontSize: 14,
                                  color: '#262626',
                                }}
                              >
                                {applicant.user.first_name}{' '}
                                {applicant.user.last_name}
                              </span>
                            ) : null}
                          </div>
                        ))
                    )}
                  </a>
                  <div>
                    {item.applicants_count > 5 ? (
                      <span
                        style={{
                          fontSize: 14,
                          color: '#262626',
                        }}
                      >
                        +{item.applicants_count - 5}
                      </span>
                    ) : null}
                  </div>
                </div>
              </TableCell>
              <TableCell className={classes.cell}>
                <span
                  className={`${getStatusStyle(
                    item.schedule_status.toLowerCase(),
                    classes
                  )}`}
                >
                  {capitalizeFirstLetter(item.schedule_status)}
                </span>
              </TableCell>
              <TableCell
                className={classes.cell}
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  padding: 17,
                }}
              >
                <div>
                  {item.schedule_status === 'cancelled' ? (
                    <p
                      style={{
                        color: '#FA5A16',
                      }}
                    >
                      Cancellation Fee(s)
                    </p>
                  ) : item.schedule_status === 'applied' ||
                    item.schedule_status === 'updated' ? (
                    <Button
                      onClick={() =>
                        navigate(`/owner/postings/temporary/${item.id}`)
                      }
                      style={{ backgroundColor: '#2561B0', border: 0 }}
                    >
                      View
                    </Button>
                  ) : item.schedule_status === 'approved' ? (
                    <div
                      className='d-flex'
                      style={{
                        gap: 10,
                      }}
                    >
                      <Button
                        onClick={() =>
                          navigate(`/owner/postings/temporary/${item.id}`)
                        }
                        style={{ backgroundColor: '#2561B0', border: 0 }}
                      >
                        No Show
                      </Button>
                      <Button
                        onClick={() =>
                          navigate(`/owner/postings/temporary/${item.id}`)
                        }
                        style={{ backgroundColor: '#4CAF50', border: 0 }}
                      >
                        Check In
                      </Button>
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: 18,
                      }}
                    ></div>
                  )}
                </div>
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
    </div>
  );
};

export default withStyles(styles)(ViewPostingDataGrid);
