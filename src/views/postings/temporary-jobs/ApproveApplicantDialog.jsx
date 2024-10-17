import React from 'react';



import {
  Alert,
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Modal,
  Radio,
  RadioGroup,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';





import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';


const ApproveApplicantDialog = ({ isOpen, onClose, onApprove }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        Confirmation{' '}
        <i
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            marginRight: '10px',
            marginTop: '14px',
            cursor: 'pointer',
          }}
        >
          <CloseIcon onClick={onClose} />
        </i>
      </DialogTitle>
      <DialogContent
        style={{
          backgroundColor: '#D7E8FF',
          height: '80px',
          color: '#194378',
          margin: '10px 20px',
          borderRadius: '5px',
        }}
      >
        <i>
          <ErrorOutlineOutlinedIcon />
        </i>{' '}
        Attention <br />
        Are you sure you want to approve this applicant?
      </DialogContent>
      <DialogActions>
        <DialogActions>
          <Button
            onClick={onClose}
            color='primary'
            style={{
              backgroundColor: 'transparent',
              color: '#194378',
              border: 'none',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onApprove}
            color='primary'
            style={{
              backgroundColor: 'transparent',
              color: '#194378',
              border: 'none',
            }}
          >
            Approve
          </Button>
        </DialogActions>
      </DialogActions>
    </Dialog>
  );
};

export default ApproveApplicantDialog;
