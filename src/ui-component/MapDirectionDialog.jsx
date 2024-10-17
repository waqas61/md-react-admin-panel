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
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api';
import Map from './Map';
import LaunchIcon from '@mui/icons-material/Launch';
import Link from '@mui/material/Link';

export default function MapDirectionDialog({ openState, handleCloseFunction, postLocation, postLocationLatLng, userCurrentLocation }) {
    const [open, setOpen] = React.useState(true);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const map_url = `https://www.google.com/maps/dir/?api=1&origin=${parseFloat(userCurrentLocation.latitude)},${parseFloat(userCurrentLocation.longitude)}&destination=${parseFloat(postLocationLatLng.latitude)},${parseFloat(postLocationLatLng.longitude)}`;
    useEffect(() => {
        if (distance && duration) {
            console.log("Distance & Duration have updated", distance, duration);
        }
    }, [distance, duration]);
    const onLoad = React.useCallback(function callback(map) {
        // Get directions
        const google = window.google;
        const directionsService = new google.maps.DirectionsService();
        const final_destination_server = { lat: parseFloat(postLocationLatLng.latitude), lng: parseFloat(postLocationLatLng.longitude) };
        directionsService.route(
            {
                // origin: "Liverpool, UK",
                // destination: "Oxford, UK",
                origin: { lat: parseFloat(userCurrentLocation.latitude), lng: parseFloat(userCurrentLocation.longitude) },
                destination: final_destination_server,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDistance(result.routes[0].legs[0].distance.value);
                    setDuration(result.routes[0].legs[0].duration.value);
                } else {
                    console.error("error fetching directions", result, status);
                }
            }
        );
    }, []);

    const handleClose = () => {
        setOpen(false);
        handleCloseFunction();
    };
    const lib = ['places'];
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
                    {"Map Directions"}
                    <>
                        <Link target="_blank" href={map_url}>
                            <LaunchIcon />
                        </Link>
                    </>
                    <Divider />
                </DialogTitle>
                <DialogContent>
                    <LoadScript
                        googleMapsApiKey={"AIzaSyBSMQjyWwCSc9CD12_omp_UGdqflsDLT-E"}
                        // loadingElement={<div />}
                        // containerElement={<div />}
                        // mapElement={<div />}
                        onLoad={onLoad}
                        libraries={lib}
                    >
                        {/* <div>Distance: {distance}</div> */}
                        {/* <div>Duration: {duration}</div> */}
                        <Map
                            userCurrentLocation={userCurrentLocation}
                            postLocation={postLocation}
                            postLocationLatLng={postLocationLatLng}
                            setDistance={setDistance}
                        />
                    </LoadScript>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}