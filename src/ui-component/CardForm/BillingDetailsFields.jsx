

// import { Col, Row } from "react-bootstrap";

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


const BillingDetailsFields = () => {
  return (
    <>
      <Box xs={12} md={6} className="">
        <FormControl size="small" variant="outlined" className="w-100 mb-2">
          <TextField
            required
            className="w-100"
            size="small"
            name="name"
            label="Name"
            variant="outlined"
            sx={{ mb: 2 }}

          />
        </FormControl>
        <FormControl size="small" variant="outlined" className="w-100 mb-2">
          <TextField
            required
            className="w-100"
            label="State"
            name="state"
            size="small"
            variant="outlined"
            sx={{ mb: 2 }}

            InputProps={{
              style: {
                borderColor: "#BFBFBF",
              },
            }}
          />
        </FormControl>
      </Box>

      <Box xs={12} md={6} >
        <FormControl size="small" variant='outlined' className='w-100 mb-2'>
          <TextField
            required
            size='small'
            className='w-100'
            type='email'
            name='email'
            label='Email'
            variant='outlined'
            sx={{ mb: 3 }}
          />
        </FormControl>

        <FormControl size="small" variant="outlined" className="w-100 mb-2">
          <TextField
            required
            className="w-100"
            label="Zip"
            name="zip"
            size="small"
            variant="outlined"
            sx={{ mb: 2 }}
            inputProps={{
              pattern: "^\\d{5}$",
              title: "ZIP code can be only 5-digit",
              minLength: 5,
              maxLength: 5,
            }}
          />
        </FormControl>
      </Box>

      <Box xs={12} md={5.5} >
        <FormControl size="small" variant="outlined" className="w-100 mb-2">
          <TextField
            required
            className="w-100"
            name="city"
            label="City"
            size="small"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </FormControl>
      </Box>

      <Box xs={12} md={5.5} >

        <FormControl size="small" variant="outlined" className="w-100 mb-2">
          <TextField
            required
            className="w-100"
            name="address"
            label="Address"
            size="small"
            variant="outlined"
            sx={{ mb: 2 }}

            InputProps={{
              style: {
                borderColor: "#BFBFBF",
              },
            }}
          />
        </FormControl>

      </Box>
    </>
  );
};

export default BillingDetailsFields;
