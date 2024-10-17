import React, { useState, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#2561b0',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));



const Timer = ({ timeLeft }) => {

    const [timer, setTimer] = useState(timeLeft);

    const timerToString = () => {
        let hours = ('0' + Math.floor(timer / 3600)).slice(-2);
        let minutes = ('0' + Math.floor(timer % 3600 / 60)).slice(-2);
        let seconds = ('0' + Math.floor(timer % 3600 % 60)).slice(-2);
        // return hours + ":" + minutes + ":" + seconds;
        return minutes + ":" + seconds;
    }
    useEffect(() => {
        if (timer > 0) {
            setTimeout(() => {
                setTimer(timer - 1);
            }, 1000)
        }
    }, [timer]);

    return (
        <div>
            <p>{timerToString()}<HistoryOutlinedIcon color={'sYellow'} /></p>
        </div>
    );
}


export default function ApplyStatusDialog({ openState, handleCloseFunction, slots, applyRestSelectedDays }) {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
        handleCloseFunction();
    };
    const applySelectedDays = () => {
        setOpen(false);
        applyRestSelectedDays();
    }
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Available Slots"}
                    <Divider />
                    <Box >
                        <Typography color="text.primary" variant="body2">
                            (Some of the selected slots have an apply limit of 10 mins. Please apply again when the wait time is over)
                        </Typography>
                    </Box>

                </DialogTitle>
                <DialogContent>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Day</StyledTableCell>
                                    <StyledTableCell align="right">Schedule Date</StyledTableCell>
                                    <StyledTableCell align="right">Start Time</StyledTableCell>
                                    <StyledTableCell align="right">End Time</StyledTableCell>
                                    <StyledTableCell align="right">Waiting Time</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {slots && slots.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.schedule_day.charAt(0).toUpperCase() + row.schedule_day.slice(1)}
                                        </TableCell>
                                        <TableCell align="right">{row.schedule_date}</TableCell>
                                        <TableCell align="right">{row.start_time}</TableCell>
                                        <TableCell align="right">{row.end_time}</TableCell>
                                        <TableCell align="right"><Timer timeLeft={row.waiting_time} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        autoFocus
                        variant='primary'
                        style={{
                            backgroundColor: '#2561B0',
                            border: 0,
                            color: 'white'
                        }}
                        onClick={applySelectedDays}
                    >
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}