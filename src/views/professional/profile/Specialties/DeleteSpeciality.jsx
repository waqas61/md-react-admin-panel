import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import axios from 'axios';

import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';


export const DeleteSpeciality = ({
  deleteOpen,
  handleDeleteClose,
  selectedItem,
  fetchSpecialties,
}) => {
  const handleDelelteSpeciality = () => {
    axios
      .delete(
        `https://api.mddentalstaffing.com/api/v1/specialties/${selectedItem.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((res) => {
        fetchSpecialties(1, 10);
        handleDeleteClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog
      open={deleteOpen}
      onClose={handleDeleteClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle
        id='alert-dialog-title'
        style={{ fontWeight: 'bold', width: '520px' }}
      >
        {'Delete Speciality'}
      </DialogTitle>
      <div
        style={{
          marginLeft: '10px',
          marginRight: '10px',
          backgroundColor: '#FFF3EE',
          padding: '20px',
          borderRadius: '6px',
          display: 'flex',
          width: '480px',
        }}
      >
        <WarningAmberOutlinedIcon
          style={{ color: '#FA5A16', marginRight: '20px' }}
        />
        <div>
          <h1
            style={{
              color: '#E54C0B',
              fontSize: '17px',
              fontWeight: '500',
              fontFamily: 'Roboto',
            }}
          >
            Attention!
          </h1>
          <p
            style={{
              fontSize: '13x',
              lineHeight: '20px',
              fontFamily: 'Roboto',
              color: '#E54C0B',
            }}
          >
            Are you sure you want to delete speciality?
          </p>
        </div>
      </div>
      <DialogActions>
        <Button
          style={{
            background: 'none',
            border: 'none',
            color: '#2561B0',
            fontWeight: '500',
          }}
          onClick={handleDeleteClose}
        >
          Cancel
        </Button>
        <Button
          style={{
            background: 'none',
            border: 'none',
            color: '#2561B0',
            fontWeight: '500',
          }}
          onClick={handleDelelteSpeciality}
          autoFocus
        >
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
};
