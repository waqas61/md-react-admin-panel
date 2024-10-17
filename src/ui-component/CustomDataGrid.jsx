import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import { withStyles } from '@material-ui/styles';
import { withStyles } from '@mui/styles'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShowMoreIcon from '../assets/icons/showmore.png';
import ButtonsDialog from './CustomButtonsDialog';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    paddingTop: '16px',
    paddingBottom: '16px'
  },
}));

const CustomDataGrid = ({
  classes,
  rows,
  columns,
  paging,
  selectedItem,
  setSelectedItem,
  fetchData,
  actions,
  setActions,
  buttons,
  padding,
}) => {
  // const { total, per_page, current_page } = paging;
  const [page, setPage] = useState(paging?.current_page - 1);
  const [rowsPerPage, setRowsPerPage] = useState(paging?.per_page);

  const [gridWidth, setGridWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setGridWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line
  }, [window.innerWidth]);

  useEffect(() => {
    setPage(paging?.current_page - 1);
    setRowsPerPage(paging?.per_page);
  }, [paging]);

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
    <>
      {gridWidth > 800 ? (
        <Box sx={{ flexGrow: 1, border: '1px solid #D9D9D9', mt: 2 }}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {columns.map((item, index) => (
                  <StyledTableCell
                    key={index}
                    style={{ width: item.width }}
                    className={classes.cell}
                  >
                    {item.headerName}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={selectedItem && selectedItem.id === row.id ? classes.selectedRow : ''}
                  onClick={() => handleRowClick(row)}
                >
                  {columns.map((column, columnIndex) => (
                    <TableCell key={columnIndex} className={classes.cell}>
                      {row[column.field] ? row[column.field] : column.field}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {paging && (
            <>
              {paging?.total === 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // height: '40vh',
                    color: '#D9D9D9',
                  }}
                >
                  <span></span>
                </div>
              )}
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component='div'
                count={paging?.total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Box>
      ) : (
        <div>
          <Table className={classes.table}>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <div
                  style={{
                    margin: '0 10px',
                    backgroundColor: '#fff',
                    padding: '0 15px',
                    borderRadius: '6px',
                    boxShadow: '0px 2px 8px 0px #00000026',
                    marginBottom: '15px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid rgba(224, 224, 224, 1)',
                    }}
                  >
                    <TableRow
                      key={rowIndex}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleRowClick(row)}
                    >
                      <ExpandMoreIcon />
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          padding: '0 10px',
                        }}
                      >
                        <>
                          {Array.from({ length: 2 }, (_, i) => (
                            <TableCell
                              style={{ borderBottom: 'none' }}
                              key={i}
                              className={classes.cell}
                            >
                              {row[columns[i].field] !== undefined
                                ? row[columns[i].field]
                                : columns[i].field}
                            </TableCell>
                          ))}
                        </>
                      </div>

                      <TableCell
                        style={{ borderBottom: 'none', marginLeft: '10px' }}
                        key={Math.floor(Math.random() * 10000)}
                        className={classes.cell}
                      >
                        {row[columns[2].field] !== undefined
                          ? row[columns[2].field]
                          : columns[2].field}
                      </TableCell>
                    </TableRow>
                    <div
                      onClick={() => {
                        setSelectedItem(row);
                        setActions(true);
                      }}
                      style={{
                        cursor: 'pointer',
                        border: '1px solid #E8E8E8',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={ShowMoreIcon}
                        style={{ padding: '10px' }}
                        alt=''
                      />
                    </div>
                  </div>
                  {selectedItem && selectedItem.id === row.id && (
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between',
                          padding: '0 20px',
                          marginTop: '20px',
                        }}
                      >
                        <>
                          {Array.from(
                            { length: columns.length },
                            (_, i) =>
                              i >= 3 && (
                                <TableCell
                                  style={{
                                    borderBottom: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                  }}
                                  key={i}
                                  className={classes.cell}
                                >
                                  <div>
                                    <p
                                      style={{
                                        fontSize: '13px',
                                        fontFamily: 'Roboto',
                                        color: '#262626',
                                      }}
                                    >
                                      {columns[i]?.headerName}
                                    </p>
                                    <div
                                      style={{
                                        color: '#000000',
                                        fontSize: '15px',
                                        marginTop: '6px',
                                      }}
                                    >
                                      {selectedItem[columns[i]?.field] !==
                                        undefined
                                        ? selectedItem[columns[i]?.field]
                                        : columns[i]?.field}
                                    </div>
                                  </div>
                                </TableCell>
                              )
                          )}
                        </>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </TableBody>
          </Table>
          {paging && (
            <>
              {paging?.total === 0 && (
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
                count={paging?.total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </div>
      )}
      <ButtonsDialog
        actions={actions}
        setActions={setActions}
        selectedItem={selectedItem}
        buttons={buttons}
      />
    </>
  );
};

export default withStyles(styles)(CustomDataGrid);
