import {
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

const ChangeEmailDialog = ({
  open,
  handleClose,
  changeEmail,
  setChangeEmail,
  handleChangeEmail,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <div
        style={{ height: '120px', backgroundColor: 'rgb(37, 97, 176)' }}
      ></div>
      <DialogTitle id='alert-dialog-title' style={{ fontWeight: 'bold' }}>
        {'Change E-mail'}
      </DialogTitle>
      <DialogTitle
        id=''
        style={{ margin: '5px 0', fontSize: '14px', fontWeight: 'normal' }}
      >
        {'Please Enter your new Email Address'}
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
          value={changeEmail.password}
          onChange={(e) => {
            setChangeEmail({ ...changeEmail, password: e.target.value });
          }}
        />
        <TextField
          id='outlined-password-input'
          label='New Email Address'
          type='email'
          autoComplete='current-password'
          style={{ marginTop: '20px' }}
          required={true}
          value={changeEmail.email}
          onChange={(e) => {
            setChangeEmail({ ...changeEmail, email: e.target.value });
          }}
        />
      </Box>
      <DialogContent>
        <DialogContentText
          id='alert-dialog-description'
          style={{ width: '462px' }}
        >
          Fields marked "*" are mandatory
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleChangeEmail} autoFocus>
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeEmailDialog;
