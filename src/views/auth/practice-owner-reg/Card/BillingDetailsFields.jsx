


import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography';


const BillingDetailsFields = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              size="small"
              name="name"
              label="Name"
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
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
          </Grid>
          <Grid item xs={12} md={6}>

            <TextField
              required
              size='small'
              fullWidth
              type='email'
              name='email'
              label='Email'
              variant='outlined'
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>

            <TextField
              required
              fullWidth
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
          </Grid>
          <Grid item xs={12} md={12}>

            <TextField
              required
              fullWidth
              name="city"
              label="City"
              size="small"
              variant="outlined"
              sx={{ mb: 2 }}
            />

          </Grid>
          <Grid item xs={12} md={12}>

            <TextField
              required
              fullWidth
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

          </Grid>
        </Grid>
      </Box>


      {/* <Col xs={12} md={6} className="">
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
      </Col>

      <Col xs={12} md={6} >
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
      </Col>

      <Col xs={12} md={5.5} >
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
      </Col>

      <Col xs={12} md={5.5} >

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

      </Col> */}
    </>
  );
};

export default BillingDetailsFields;
