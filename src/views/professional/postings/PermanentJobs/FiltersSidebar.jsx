import {
  Drawer,
  TextField,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  IconButton,
  Button
} from '@mui/material';
import React from 'react';

import CloseIcon from '@mui/icons-material/Close';


const FiltersSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  handleFilterData,
  postingTitle,
  setPostingTitle,
  filterStatus,
  setFilterStatus,
  location,
  setLocation,
  distance,
  setDistance,
  resetFilter
}) => {
  return (
    <Drawer
      anchor='right'
      open={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
      PaperProps={{
        style: {
          width: '20vw',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        },
      }}
    >
      <Typography variant='h6' component='h2'>
        Permanent Filters
      </Typography>
      <IconButton onClick={() => setIsSidebarOpen(false)}>
        <CloseIcon style={{
          marginLeft: '220px',
          position: 'absolute',
          top: '-47px'
        }} />
      </IconButton>
      <TextField
        variant='outlined'
        fullWidth
        label='Posting'
        id='postingTitle'
        value={postingTitle}
        onChange={(e) => setPostingTitle(e.target.value)}
        InputProps={{
          style: {
            textAlign: 'center',
            padding: '10px',
          },
        }}
      />
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Status</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={filterStatus}
          label='Status'
          onChange={(e) => setFilterStatus(e.target.value)}
          
          style={{
            padding: '10px',
          }}
        >
          <MenuItem
            value='new'
            style={{
              display: 'block',
              paddingLeft: '15px',
              margin: '5px',
            }}
          >
            New
          </MenuItem>
          <MenuItem
            value='applied'
            style={{
              display: 'block',
              paddingLeft: '15px',
              margin: '5px',
            }}
          >
            Applied
          </MenuItem>
          <MenuItem
            value='updated'
            style={{
              display: 'block',
              paddingLeft: '15px',
              margin: '5px',
            }}
          >
            Updated
          </MenuItem>
          <MenuItem
            value='approved'
            style={{
              display: 'block',
              paddingLeft: '15px',
              margin: '5px',
            }}
          >
            Approved
          </MenuItem>
        </Select>
      </FormControl>

      <TextField
        variant='outlined'
        fullWidth
        label='Location'
        id='location'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        InputProps={{
          style: {
            textAlign: 'center',
            padding: '10px',
          },
        }}
      />

      <TextField
        variant='outlined'
        fullWidth
        label='Distance (mi)'
        id='distance'
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        InputProps={{
          style: {
            textAlign: 'center',
            padding: '10px',
          },
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        {/* <Button
          variant='outline-primary'
          style={{
            width: '100%',
            border: '1px solid #2561B0',
            color: '#595959',
          }}
          onClick={() => setIsSidebarOpen(false)}
        >
          Close
        </Button> */}
        <Button
          variant='outline-primary'
          style={{
            width: '100%',
            border: '1px solid #2561B0',
            color: '#595959',
          }}
          onClick={resetFilter}
        >
          Reset
        </Button>
        <Button
          variant='primary'
          style={{
            width: '100%',
            backgroundColor: '#2561B0',
            border: 0,
          }}
          onClick={handleFilterData}
        >
          Find
        </Button>
      </div>
    </Drawer>
  );
};

export default FiltersSidebar;
