import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React from 'react';

const ChangePasswordDialog = ({
  open,
  handleClose,
  changePassword,
  setChangePassword,
  handleChangePassword,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      style={{ height: 'auto' }}
    >
      <div
        style={{ height: '320px', backgroundColor: 'rgb(37, 97, 176)' }}
      ></div>
      <DialogTitle id='alert-dialog-title' style={{ fontWeight: 'bold' }}>
        {'Change Password'}
      </DialogTitle>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 'auto', width: '91%' },
        }}
        noValidate
        autoComplete='off'
        style={{
          margin: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          id='outlined-password-input'
          label='Current Password'
          type='password'
          autoComplete='current-password'
          required={true}
          value={changePassword.c_password}
          onChange={(e) => {
            setChangePassword({
              ...changePassword,
              c_password: e.target.value,
            });
          }}
        />
        <Alert severity='info' style={{ width: '91%', margin: '10px 0 0' }}>
          <div>
            <span style={{ fontWeight: 'bold' }}>Password Requirements</span>
          </div>
          <ul style={{ marginTop: '6px', listStyleType: '-' }}>
            <li>Upper case letters (ABC)</li>
            <li style={{ marginTop: '2px', listStyleType: '-' }}>
              Lower case letters (abc)
            </li>
            <li style={{ marginTop: '2px' }}>Numbers (123)</li>
            <li style={{ marginTop: '2px' }}>Minimum characters 8</li>
          </ul>
        </Alert>
        <TextField
          id='outlined-password-input'
          label='New Password'
          type='password'
          autoComplete='current-password'
          required={true}
          value={changePassword.n_password}
          onChange={(e) => {
            setChangePassword({
              ...changePassword,
              n_password: e.target.value,
            });
          }}
          style={{ marginTop: '10px' }}
        />
        <TextField
          id='outlined-password-input'
          label='Confirm Password'
          type='password'
          autoComplete='current-password'
          required={true}
          value={changePassword.confirm_password}
          onChange={(e) => {
            setChangePassword({
              ...changePassword,
              confirm_password: e.target.value,
            });
          }}
          style={{ marginTop: '10px' }}
        />
      </Box>
      <DialogContent style={{ overflow: 'hidden' }}>
        <DialogContentText
          id='alert-dialog-description'
          style={{ width: '462px' }}
        >
          Fields marked "*" are mandatory
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleChangePassword} autoFocus>
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
