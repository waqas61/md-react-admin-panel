import React from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/styles';
import { withStyles } from '@mui/styles'
import { CircularProgress, Modal } from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';



import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';


const styles = theme => ({
    button: {
        margin: theme.spacing,
    },
});

const LoadingButton = (props) => {
    const { classes, loading, done, ...other } = props;

    if (done) {
        return (
            <Button size="small" className={classes.button} {...other} disabled>
                <CheckIcon fontSize="small" />
            </Button>
        );
    }
    else if (loading) {
        return (
            <Button size="small" className={classes.button} >
                <CircularProgress
                    size={25}
                    thickness={4}
                    value={100}
                />
            </Button>
        );
    } else {
        return (
            <Button size="small" className={classes.button} {...other} />
        );
    }
}

LoadingButton.defaultProps = {
    loading: false,
    done: false,
};

LoadingButton.propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    done: PropTypes.bool,
};

export default withStyles(styles)(LoadingButton);