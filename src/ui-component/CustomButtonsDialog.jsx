import * as React from 'react';
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
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import { useNavigate } from 'react-router-dom';
import './JobsResponsive.css';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ButtonsDialog({
    actions,
    setActions,
    selectedItem,
    buttons
}) {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Dialog
                open={actions}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => {
                    setActions(false);
                }}
                aria-describedby="alert-dialog-slide-description"
                style={{ top: 'auto', bottom: 0, margin: 0, padding: '0', width: '100vw' }}
                maxWidth="xl"
                fullWidth
            >
                <div style={{ padding: '20px' }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 style={{ color: '#262626', fontSize: '16px', fontWeight: '500' }}>
                            {selectedItem?.title}{' '}
                        </h1>
                        <CloseIcon
                            style={{ color: '#8C8C8C', cursor: 'pointer' }}
                            onClick={() => {
                                setActions(false);
                            }}
                        />
                    </div>
                    <p style={{ color: '#8C8C8C', fontSize: '12px', fontWeight: '400' }}>Manage this posting.</p>
                    {buttons?.map((button, index) => (
                        <React.Fragment key={index}>
                            {button.type === 'button' && (
                                <Button
                                    style={{
                                        width: '100%',
                                        padding: '10px 0',
                                        backgroundColor: button.backgroundColor,
                                        border: `1px solid ${button.borderColor}`,
                                        fontSize: '16px',
                                        color: button.color,
                                        marginTop: button.marginTop,
                                    }}
                                    onClick={button.onClick}
                                    disabled={button.disabled}
                                >
                                    {button.label}
                                </Button>
                            )}
                            {button.type === 'hr' && (
                                <hr
                                    style={{
                                        marginTop: button.marginTop,
                                        borderColor: button.color,
                                    }}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </Dialog>
        </React.Fragment>
    );
}
