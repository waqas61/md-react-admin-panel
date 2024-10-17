
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import {
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';


export default function ForFrontOffice({
  setResponsibilities,
  responsibilities,
  setSpecialties,
  specialties,
  setYearsAsTreatmentCoord,
  yearsAsTreatmentCoord,
  setYearsWorked,
  yearsWorked,
  handleKeyDownPrc,
  handleKeyDown,
  handleChipDeletePrc,
  handleChipDelete,
  practiceManagementSoftware,
  setPrcValue,
  prcValue,
  radiographySystems,
  setRinputValue,
  rinputValue,
}) {
  return (
    <>

      <Box sx={{ mt: 2 }} >

        <Typography variant="h5" component="h5" sx={{ mt: 1, mb: 1 }}>
          Questionaire
        </Typography>

        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
          >
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
              >
                <Typography variant="h6" sx={{ color: "#595959", mt: 1, mb: 1 }}>
                  How many years/months did you work in dental field?*
                </Typography>

              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
              >
                <TextField
                  size='small'
                  required
                  className='w-100'
                  label='Years'
                  variant='outlined'
                  sx={{ mb: 2 }}
                  value={yearsWorked?.years}
                  onChange={(e) =>
                    setYearsWorked((state) => ({
                      ...state,
                      years: e.target.value.replace(/\D/, ''),
                    }))
                  }
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
              >
                <TextField
                  size='small'
                  required
                  className='w-100'
                  label='Months'
                  variant='outlined'
                  sx={{ mb: 2 }}
                  value={yearsWorked?.months}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/, '');
                    if (value > 12) value = '12';
                    setYearsWorked((state) => ({
                      ...state,
                      months: value,
                    }));
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
              >


                <Typography variant="h6" sx={{ color: "#595959", mt: 1, mb: 1 }}>
                  Proficient with the following Digital Radiography Systems{" "}
                  <span className="text-lightgrey"> (Up to 50): </span>
                </Typography>

              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
              >
                <TextField
                  size='small'
                  required
                  variant='outlined'
                  sx={{
                    mb: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    height: 'auto',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                      height: '0.3rem',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      borderRadius: '6px',
                      backgroundColor: '#bfbfbf',
                    },
                    '&::-webkit-scrollbar-track': {
                      borderRadius: '6px',
                      backgroundColor: '#eee',
                    },
                    '&::-webkit-scrollbar-button': {
                      display: 'none',
                    },
                  }}
                  value={rinputValue}
                  onChange={(e) => setRinputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        {radiographySystems?.map((system, index) => (
                          <Chip
                            color='primary'
                            className='me-1 rounded'
                            key={index}
                            label={system}
                            onDelete={() => handleChipDelete(index)} // Modified line to handle chip deletion
                            deleteIcon={<CloseIcon />} // Assuming you have an icon component for the "X"
                          />
                        ))}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
          >


            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
              >
                {/* <h6 style={{ color: "#595959" }}>
                  How many years/months as an Treatment Coordinator?
                </h6> */}
                <Typography variant="h6" sx={{ color: "#595959", mt: 1, mb: 1 }}>
                  How many years/months as an Treatment Coordinator?
                </Typography>

              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
              >
                <TextField
                  size='small'
                  className='w-100'
                  label='Years'
                  variant='outlined'
                  sx={{ mb: 2 }}
                  value={yearsAsTreatmentCoord?.years}
                  onChange={(e) =>
                    setYearsAsTreatmentCoord((state) => ({
                      ...state,
                      years: e.target.value.replace(/\D/, ''),
                    }))
                  }
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
              >
                <TextField
                  size='small'
                  required
                  className='w-100'
                  label='Months'
                  variant='outlined'
                  sx={{ mb: 2 }}
                  value={yearsAsTreatmentCoord?.months}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/, '');
                    if (value > 12) value = '12';
                    setYearsAsTreatmentCoord((state) => ({
                      ...state,
                      months: value,
                    }));
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
              >
                {/* <h6 style={{ color: "#595959" }}>
                  Proficient with the following Practice Management Software{" "}
                  <span className="text-lightgrey"> (Up to 50): </span>
                </h6> */}

                <Typography variant="h6" sx={{ color: "#595959", mt: 1, mb: 1 }}>
                  Proficient with the following Practice Management Software{" "}
                  <span className="text-lightgrey"> (Up to 50): </span>
                </Typography>

              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
              >
                <TextField
                  required
                  size='small'
                  className='w-100'
                  variant='outlined'
                  sx={{
                    mb: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    height: 'auto',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                      height: '0.3rem',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      borderRadius: '6px',
                      backgroundColor: '#bfbfbf',
                    },
                    '&::-webkit-scrollbar-track': {
                      borderRadius: '6px',
                      backgroundColor: '#eee',
                    },
                    '&::-webkit-scrollbar-button': {
                      display: 'none',
                    },
                  }}
                  value={prcValue}
                  onChange={(e) => setPrcValue(e.target.value)}
                  onKeyDown={handleKeyDownPrc}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        {practiceManagementSoftware?.map((system, index) => (
                          <Chip
                            color='primary'
                            className='me-1 rounded'
                            key={index}
                            label={system}
                            onDelete={() => handleChipDeletePrc(index)}
                            deleteIcon={<CloseIcon />}
                          />
                        ))}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>


            </Grid>

          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ color: "#595959", mt: 1, mb: 1 }}>
          Experienced in the following specialties:
        </Typography>

        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>General</InputLabel>
              <Select
                required
                fullWidth
                labelId='category-label'
                id='category'
                label='General'
                sx={{ mb: 2 }}
                value={specialties?.general}
                onChange={(e) =>
                  setSpecialties((state) => ({
                    ...state,
                    general: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Prostho</InputLabel>
              <Select
                required
                fullWidth
                labelId='category-label'
                id='category'
                label='Prostho'
                sx={{ mb: 2 }}
                value={specialties?.prostho}
                onChange={(e) =>
                  setSpecialties((state) => ({
                    ...state,
                    prostho: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Pedo</InputLabel>
              <Select
                required
                fullWidth
                labelId='category-label'
                id='category'
                label='Pedo'
                sx={{ mb: 2 }}
                value={specialties?.pedo}
                onChange={(e) =>
                  setSpecialties((state) => ({
                    ...state,
                    pedo: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Cosmetic</InputLabel>
              <Select
                required
                fullWidth
                labelId='category-label'
                id='category'
                label='Cosmetic'
                sx={{ mb: 2 }}
                value={specialties?.cosmetic}
                onChange={(e) =>
                  setSpecialties((state) => ({
                    ...state,
                    cosmetic: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Ortho</InputLabel>
              <Select
                required
                fullWidth
                labelId='category-label'
                id='category'
                label='Ortho'
                sx={{ mb: 2 }}
                value={specialties?.ortho}
                onChange={(e) =>
                  setSpecialties((state) => ({
                    ...state,
                    ortho: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Perio</InputLabel>
              <Select
                required
                fullWidth
                labelId='category-label'
                id='category'
                label='Perio'
                sx={{ mb: 2 }}
                value={specialties?.perio}
                onChange={(e) =>
                  setSpecialties((state) => ({
                    ...state,
                    perio: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Endo</InputLabel>
              <Select
                required
                fullWidth
                labelId='category-label'
                id='category'
                label='Endo'
                sx={{ mb: 2 }}
                value={specialties?.endo}
                onChange={(e) =>
                  setSpecialties((state) => ({
                    ...state,
                    endo: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Implants</InputLabel>
              <Select
                required
                fullWidth
                labelId='category-label'
                id='category'
                label='Implants'
                sx={{ mb: 2 }}
                value={specialties.implants}
                onChange={(e) =>
                  setSpecialties((state) => ({
                    ...state,
                    implants: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Oral Surgery</InputLabel>
              <Select
                required
                fullWidth
                labelId='category-label'
                id='category'
                label='Oral Surgery'
                sx={{ mb: 2 }}
                value={specialties.oralSurgery}
                onChange={(e) =>
                  setSpecialties((state) => ({
                    ...state,
                    oralSurgery: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ color: "#595959", mt: 1, mb: 1 }}>
          What responsibilities are you confident in?
        </Typography>

        <Grid container spacing={1}>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Insurance billing</InputLabel>
              <Select
                required
                className='w-100'
                labelId='category-label'
                id='category'
                label='Insurance billing'
                sx={{ mb: 2 }}
                value={responsibilities.insBilling}
                onChange={(e) =>
                  setResponsibilities((state) => ({
                    ...state,
                    insBilling: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>
                Accounts Receivables/Payables
              </InputLabel>
              <Select
                required
                className='w-100'
                labelId='category-label'
                id='category'
                label='Accounts Receivables/Payables'
                sx={{ mb: 2 }}
                value={responsibilities.payables}
                onChange={(e) =>
                  setResponsibilities((state) => ({
                    ...state,
                    payables: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Posting</InputLabel>
              <Select
                required
                className='w-100'
                labelId='category-label'
                id='category'
                label='Posting'
                sx={{ mb: 2 }}
                value={responsibilities.Posting}
                onChange={(e) =>
                  setResponsibilities((state) => ({
                    ...state,
                    Posting: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>
                Marketing/Social Media Integration
              </InputLabel>
              <Select
                required
                className='w-100'
                labelId='category-label'
                id='category'
                label='Marketing/Social Media Integration '
                sx={{ mb: 2 }}
                value={responsibilities.marketing}
                onChange={(e) =>
                  setResponsibilities((state) => ({
                    ...state,
                    marketing: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>
                Treatment Presentation
              </InputLabel>
              <Select
                required
                className='w-100'
                labelId='category-label'
                id='category'
                label='Treatment Presentation'
                sx={{ mb: 2 }}
                value={responsibilities.trPresentation}
                onChange={(e) =>
                  setResponsibilities((state) => ({
                    ...state,
                    trPresentation: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>
                Eligibility Verification
              </InputLabel>
              <Select
                required
                className='w-100'
                labelId='category-label'
                id='category'
                label='Eligibility Verification'
                sx={{ mb: 2 }}
                value={responsibilities.elegVerification}
                onChange={(e) =>
                  setResponsibilities((state) => ({
                    ...state,
                    elegVerification: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Claim Submission</InputLabel>
              <Select
                required
                className='w-100'
                labelId='category-label'
                id='category'
                label='Claim Submission'
                sx={{ mb: 2 }}
                value={responsibilities.clSubmission}
                onChange={(e) =>
                  setResponsibilities((state) => ({
                    ...state,
                    clSubmission: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>
                Office Management
                <Tooltip
                  style={{
                    backgroundColor: 'white',
                  }}
                  title='Run morning huddles, Build profits and production graphs, supervise'
                >
                  <InfoIcon style={{ fontSize: 22, marginLeft: 4 }} />
                </Tooltip>
              </InputLabel>
              <Select
                required
                className='w-100'
                labelId='category-label'
                id='category'
                label='Office Management  '
                sx={{ mb: 2 }}
                value={responsibilities.officeManagement}
                onChange={(e) =>
                  setResponsibilities((state) => ({
                    ...state,
                    officeManagement: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Patient coordination</InputLabel>
              <Select
                required
                className='w-100'
                labelId='category-label'
                id='category'
                label='Patient coordination'
                sx={{ mb: 2 }}
                value={responsibilities.patCoordination}
                onChange={(e) =>
                  setResponsibilities((state) => ({
                    ...state,
                    patCoordination: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>
                Financial Coordination
              </InputLabel>
              <Select
                required
                className='w-100'
                labelId='category-label'
                id='category'
                label='Financial Coordination'
                sx={{ mb: 2 }}
                value={responsibilities.finCoordination}
                onChange={(e) =>
                  setResponsibilities((state) => ({
                    ...state,
                    finCoordination: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Treatment Planning</InputLabel>
              <Select
                required
                className='w-100'
                labelId='category-label'
                id='category'
                label='Treatment Planning'
                sx={{ mb: 2 }}
                value={responsibilities.trPlanning}
                onChange={(e) =>
                  setResponsibilities((state) => ({
                    ...state,
                    trPlanning: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Collections</InputLabel>
              <Select
                required
                className='w-100'
                labelId='category-label'
                id='category'
                label='Collections'
                sx={{ mb: 2 }}
                value={responsibilities.collections}
                onChange={(e) =>
                  setResponsibilities((state) => ({
                    ...state,
                    collections: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Patient Scheduling</InputLabel>
              <Select
                required
                className='w-100'
                labelId='category-label'
                id='category'
                label='Patient Scheduling'
                sx={{ mb: 2 }}
                value={responsibilities.patScheduling}
                onChange={(e) =>
                  setResponsibilities((state) => ({
                    ...state,
                    patScheduling: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>
                Insurance Payment Collection
              </InputLabel>
              <Select
                required
                className='w-100'
                labelId='category-label'
                id='category'
                label='Insurance Payment Collection'
                sx={{ mb: 2 }}
                value={responsibilities.insPaymentCollection}
                onChange={(e) =>
                  setResponsibilities((state) => ({
                    ...state,
                    insPaymentCollection: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Hygiene Recall</InputLabel>
              <Select
                required
                className='w-100'
                labelId='category-label'
                id='category'
                label='Hygiene Recall'
                sx={{ mb: 2 }}
                value={responsibilities.hygieneRecall}
                onChange={(e) =>
                  setResponsibilities((state) => ({
                    ...state,
                    hygieneRecall: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <FormControl size='small' fullWidth>
              <InputLabel id='category-label'>Payroll</InputLabel>
              <Select
                required
                className='w-100'
                labelId='category-label'
                id='category'
                label='Payroll'
                sx={{ mb: 2 }}
                value={responsibilities.payroll}
                onChange={(e) =>
                  setResponsibilities((state) => ({
                    ...state,
                    payroll: e.target.value,
                  }))
                }
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='Some'>Some</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>


        </Grid>

      </Box>

      {/* <Row style={{ width: '95%' }}>
        <h4
          className='m-0 p-0 my-3 ms-3 fw-semibold'
          style={{ fontSize: '1.25rem' }}
        >
          Questionaire
        </h4>
        <Row className='m-0 p-0'>
          <Col className='m-0 p-0 px-3' xs={12} md={6}>
            <h6 style={{ color: '#595959' }}>
              How many years/months did you work in dental field?*
            </h6>
            <Row className='m-0 p-0 mb-3'>
              <Col className='m-0 p-0 pe-0 pe-md-2' xs={12} md={6}>
                <TextField
                  size='small'
                  required
                  className='w-100'
                  label='Years'
                  variant='outlined'
                  sx={{ mb: 2 }}
                  value={yearsWorked?.years}
                  onChange={(e) =>
                    setYearsWorked((state) => ({
                      ...state,
                      years: e.target.value.replace(/\D/, ''),
                    }))
                  }
                />
              </Col>
              <Col className='m-0 p-0 ps-0 ps-md-2' xs={12} md={6}>
                <TextField
                  size='small'
                  required
                  className='w-100'
                  label='Months'
                  variant='outlined'
                  sx={{ mb: 2 }}
                  value={yearsWorked?.months}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/, '');
                    if (value > 12) value = '12';
                    setYearsWorked((state) => ({
                      ...state,
                      months: value,
                    }));
                  }}
                />
              </Col>
            </Row>
            <h6 style={{ color: '#595959' }}>
              Proficient with the following Digital Radiography Systems{' '}
              <span className='text-lightgrey'> (Up to 50): </span>
            </h6>
            <Row className='m-0 p-0'>
              <TextField
                size='small'
                required
                variant='outlined'
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  height: 'auto',
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    height: '0.3rem',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: '6px',
                    backgroundColor: '#bfbfbf',
                  },
                  '&::-webkit-scrollbar-track': {
                    borderRadius: '6px',
                    backgroundColor: '#eee',
                  },
                  '&::-webkit-scrollbar-button': {
                    display: 'none',
                  },
                }}
                value={rinputValue}
                onChange={(e) => setRinputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {radiographySystems?.map((system, index) => (
                        <Chip
                          color='primary'
                          className='me-1 rounded'
                          key={index}
                          label={system}
                          onDelete={() => handleChipDelete(index)} // Modified line to handle chip deletion
                          deleteIcon={<CloseIcon />} // Assuming you have an icon component for the "X"
                        />
                      ))}
                    </InputAdornment>
                  ),
                }}
              />
            </Row>
          </Col>
          <Col className='m-0 p-0 px-3' xs={12} md={6}>
            <h6 style={{ color: '#595959' }}>
              How many years/months as an Treatment Coordinator?
            </h6>
            <Row className='m-0 p-0 mb-3'>
              <Col className='m-0 p-0 pe-0 pe-md-2' xs={12} md={6}>
                <TextField
                  size='small'
                  className='w-100'
                  label='Years'
                  variant='outlined'
                  sx={{ mb: 2 }}
                  value={yearsAsTreatmentCoord?.years}
                  onChange={(e) =>
                    setYearsAsTreatmentCoord((state) => ({
                      ...state,
                      years: e.target.value.replace(/\D/, ''),
                    }))
                  }
                />
              </Col>
              <Col className='m-0 p-0 ps-0 ps-md-2' xs={12} md={6}>
                <TextField
                  size='small'
                  required
                  className='w-100'
                  label='Months'
                  variant='outlined'
                  sx={{ mb: 2 }}
                  value={yearsAsTreatmentCoord?.months}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/, '');
                    if (value > 12) value = '12';
                    setYearsAsTreatmentCoord((state) => ({
                      ...state,
                      months: value,
                    }));
                  }}
                />
              </Col>
            </Row>
            <h6 style={{ color: '#595959' }}>
              Proficient with the following Practice Management Software{' '}
              <span className='text-lightgrey'> (Up to 50): </span>
            </h6>
            <Row className='m-0 p-0'>
              <TextField
                required
                size='small'
                className='w-100'
                variant='outlined'
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  height: 'auto',
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    height: '0.3rem',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: '6px',
                    backgroundColor: '#bfbfbf',
                  },
                  '&::-webkit-scrollbar-track': {
                    borderRadius: '6px',
                    backgroundColor: '#eee',
                  },
                  '&::-webkit-scrollbar-button': {
                    display: 'none',
                  },
                }}
                value={prcValue}
                onChange={(e) => setPrcValue(e.target.value)}
                onKeyDown={handleKeyDownPrc}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {practiceManagementSoftware?.map((system, index) => (
                        <Chip
                          color='primary'
                          className='me-1 rounded'
                          key={index}
                          label={system}
                          onDelete={() => handleChipDeletePrc(index)}
                          deleteIcon={<CloseIcon />}
                        />
                      ))}
                    </InputAdornment>
                  ),
                }}
              />
            </Row>
          </Col>
        </Row>

        <h4
          className='m-0 p-0 my-3 ms-3 fw-semibold'
          style={{ fontSize: '1.25rem' }}
        >
          Experienced in the following specialties:
        </h4>
        <Row className='m-0 p-0'>
          <Col className='m-0 p-0 px-3' xs={12} md={6}>
            <Row className='m-0 p-0 mb-3'>
              <Col className='m-0 p-0 pe-0 pe-md-2' xs={12} md={6}>
                <FormControl size='small' className='w-100'>
                  <InputLabel id='category-label'>General</InputLabel>
                  <Select
                    required
                    className='w-100'
                    labelId='category-label'
                    id='category'
                    label='General'
                    sx={{ mb: 2 }}
                    value={specialties?.general}
                    onChange={(e) =>
                      setSpecialties((state) => ({
                        ...state,
                        general: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value='Yes'>Yes</MenuItem>
                    <MenuItem value='Some'>Some</MenuItem>
                    <MenuItem value='No'>No</MenuItem>
                  </Select>
                </FormControl>
              </Col>
              <Col className='m-0 p-0 ps-0 ps-md-2' xs={12} md={6}>
                <FormControl size='small' className='w-100'>
                  <InputLabel id='category-label'>Prostho</InputLabel>
                  <Select
                    required
                    className='w-100'
                    labelId='category-label'
                    id='category'
                    label='Prostho'
                    sx={{ mb: 2 }}
                    value={specialties?.prostho}
                    onChange={(e) =>
                      setSpecialties((state) => ({
                        ...state,
                        prostho: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value='Yes'>Yes</MenuItem>
                    <MenuItem value='Some'>Some</MenuItem>
                    <MenuItem value='No'>No</MenuItem>
                  </Select>
                </FormControl>
              </Col>
            </Row>
            <Row className='m-0 p-0 mb-3'>
              <Col className='m-0 p-0 pe-0 pe-md-2' xs={12} md={6}>
                <FormControl size='small' className='w-100'>
                  <InputLabel id='category-label'>Pedo</InputLabel>
                  <Select
                    required
                    className='w-100'
                    labelId='category-label'
                    id='category'
                    label='Pedo'
                    sx={{ mb: 2 }}
                    value={specialties?.pedo}
                    onChange={(e) =>
                      setSpecialties((state) => ({
                        ...state,
                        pedo: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value='Yes'>Yes</MenuItem>
                    <MenuItem value='Some'>Some</MenuItem>
                    <MenuItem value='No'>No</MenuItem>
                  </Select>
                </FormControl>
              </Col>
              <Col className='m-0 p-0 ps-0 ps-md-2' xs={12} md={6}>
                <FormControl size='small' className='w-100'>
                  <InputLabel id='category-label'>Cosmetic</InputLabel>
                  <Select
                    required
                    className='w-100'
                    labelId='category-label'
                    id='category'
                    label='Cosmetic'
                    sx={{ mb: 2 }}
                    value={specialties?.cosmetic}
                    onChange={(e) =>
                      setSpecialties((state) => ({
                        ...state,
                        cosmetic: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value='Yes'>Yes</MenuItem>
                    <MenuItem value='Some'>Some</MenuItem>
                    <MenuItem value='No'>No</MenuItem>
                  </Select>
                </FormControl>
              </Col>
            </Row>
            <Row className='m-0 p-0 mb-3'>
              <Col className='m-0 p-0 pe-0 pe-md-2' xs={12} md={6}>
                <FormControl size='small' className='w-100'>
                  <InputLabel id='category-label'>Ortho</InputLabel>
                  <Select
                    required
                    className='w-100'
                    labelId='category-label'
                    id='category'
                    label='Ortho'
                    sx={{ mb: 2 }}
                    value={specialties?.ortho}
                    onChange={(e) =>
                      setSpecialties((state) => ({
                        ...state,
                        ortho: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value='Yes'>Yes</MenuItem>
                    <MenuItem value='Some'>Some</MenuItem>
                    <MenuItem value='No'>No</MenuItem>
                  </Select>
                </FormControl>
              </Col>
            </Row>
          </Col>
          <Col className='m-0 p-0 px-3' xs={12} md={6}>
            <Row className='m-0 p-0 mb-3'>
              <Col className='m-0 p-0 pe-0 pe-md-2' xs={12} md={6}>
                <FormControl size='small' className='w-100'>
                  <InputLabel id='category-label'>Perio</InputLabel>
                  <Select
                    required
                    className='w-100'
                    labelId='category-label'
                    id='category'
                    label='Perio'
                    sx={{ mb: 2 }}
                    value={specialties?.perio}
                    onChange={(e) =>
                      setSpecialties((state) => ({
                        ...state,
                        perio: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value='Yes'>Yes</MenuItem>
                    <MenuItem value='Some'>Some</MenuItem>
                    <MenuItem value='No'>No</MenuItem>
                  </Select>
                </FormControl>
              </Col>
              <Col className='m-0 p-0 ps-0 ps-md-2' xs={12} md={6}>
                <FormControl size='small' className='w-100'>
                  <InputLabel id='category-label'>Endo</InputLabel>
                  <Select
                    required
                    className='w-100'
                    labelId='category-label'
                    id='category'
                    label='Endo'
                    sx={{ mb: 2 }}
                    value={specialties?.endo}
                    onChange={(e) =>
                      setSpecialties((state) => ({
                        ...state,
                        endo: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value='Yes'>Yes</MenuItem>
                    <MenuItem value='Some'>Some</MenuItem>
                    <MenuItem value='No'>No</MenuItem>
                  </Select>
                </FormControl>
              </Col>
            </Row>
            <Row className='m-0 p-0 mb-3'>
              <Col className='m-0 p-0 pe-0 pe-md-2' xs={12} md={6}>
                <FormControl size='small' className='w-100'>
                  <InputLabel id='category-label'>Implants</InputLabel>
                  <Select
                    required
                    className='w-100'
                    labelId='category-label'
                    id='category'
                    label='Implants'
                    sx={{ mb: 2 }}
                    value={specialties.implants}
                    onChange={(e) =>
                      setSpecialties((state) => ({
                        ...state,
                        implants: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value='Yes'>Yes</MenuItem>
                    <MenuItem value='Some'>Some</MenuItem>
                    <MenuItem value='No'>No</MenuItem>
                  </Select>
                </FormControl>
              </Col>
              <Col className='m-0 p-0 ps-0 ps-md-2' xs={12} md={6}>
                <FormControl size='small' className='w-100'>
                  <InputLabel id='category-label'>Oral Surgery</InputLabel>
                  <Select
                    required
                    className='w-100'
                    labelId='category-label'
                    id='category'
                    label='Oral Surgery'
                    sx={{ mb: 2 }}
                    value={specialties.oralSurgery}
                    onChange={(e) =>
                      setSpecialties((state) => ({
                        ...state,
                        oralSurgery: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value='Yes'>Yes</MenuItem>
                    <MenuItem value='Some'>Some</MenuItem>
                    <MenuItem value='No'>No</MenuItem>
                  </Select>
                </FormControl>
              </Col>
            </Row>
          </Col>
        </Row>

        <h4
          className='m-0 p-0 my-3 ms-3 fw-semibold'
          style={{ fontSize: '1.25rem' }}
        >
          What responsibilities are you confident in?
        </h4>
        <Row className='m-0 p-0'>
          <Col className='m-0 p-0 px-3' xs={12} md={3}>
            <Row className='m-0 p-0'>
              <FormControl size='small'>
                <InputLabel id='category-label'>Insurance billing</InputLabel>
                <Select
                  required
                  className='w-100'
                  labelId='category-label'
                  id='category'
                  label='Insurance billing'
                  sx={{ mb: 2 }}
                  value={responsibilities.insBilling}
                  onChange={(e) =>
                    setResponsibilities((state) => ({
                      ...state,
                      insBilling: e.target.value,
                    }))
                  }
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='Some'>Some</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Row className='m-0 p-0'>
              <FormControl size='small'>
                <InputLabel id='category-label'>
                  Accounts Receivables/Payables
                </InputLabel>
                <Select
                  required
                  className='w-100'
                  labelId='category-label'
                  id='category'
                  label='Accounts Receivables/Payables'
                  sx={{ mb: 2 }}
                  value={responsibilities.payables}
                  onChange={(e) =>
                    setResponsibilities((state) => ({
                      ...state,
                      payables: e.target.value,
                    }))
                  }
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='Some'>Some</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Row className='m-0 p-0'>
              <FormControl size='small'>
                <InputLabel id='category-label'>Posting</InputLabel>
                <Select
                  required
                  className='w-100'
                  labelId='category-label'
                  id='category'
                  label='Posting'
                  sx={{ mb: 2 }}
                  value={responsibilities.Posting}
                  onChange={(e) =>
                    setResponsibilities((state) => ({
                      ...state,
                      Posting: e.target.value,
                    }))
                  }
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='Some'>Some</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Row className='m-0 p-0'>
              <FormControl size='small'>
                <InputLabel id='category-label'>
                  Marketing/Social Media Integration
                </InputLabel>
                <Select
                  required
                  className='w-100'
                  labelId='category-label'
                  id='category'
                  label='Marketing/Social Media Integration '
                  sx={{ mb: 2 }}
                  value={responsibilities.marketing}
                  onChange={(e) =>
                    setResponsibilities((state) => ({
                      ...state,
                      marketing: e.target.value,
                    }))
                  }
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='Some'>Some</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Row>
          </Col>
          <Col className='m-0 p-0 px-3' xs={12} md={3}>
            <Row className='m-0 p-0'>
              <FormControl size='small'>
                <InputLabel id='category-label'>
                  Treatment Presentation
                </InputLabel>
                <Select
                  required
                  className='w-100'
                  labelId='category-label'
                  id='category'
                  label='Treatment Presentation'
                  sx={{ mb: 2 }}
                  value={responsibilities.trPresentation}
                  onChange={(e) =>
                    setResponsibilities((state) => ({
                      ...state,
                      trPresentation: e.target.value,
                    }))
                  }
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='Some'>Some</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Row className='m-0 p-0'>
              <FormControl size='small'>
                <InputLabel id='category-label'>
                  Eligibility Verification
                </InputLabel>
                <Select
                  required
                  className='w-100'
                  labelId='category-label'
                  id='category'
                  label='Eligibility Verification'
                  sx={{ mb: 2 }}
                  value={responsibilities.elegVerification}
                  onChange={(e) =>
                    setResponsibilities((state) => ({
                      ...state,
                      elegVerification: e.target.value,
                    }))
                  }
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='Some'>Some</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Row className='m-0 p-0'>
              <FormControl size='small'>
                <InputLabel id='category-label'>Claim Submission</InputLabel>
                <Select
                  required
                  className='w-100'
                  labelId='category-label'
                  id='category'
                  label='Claim Submission'
                  sx={{ mb: 2 }}
                  value={responsibilities.clSubmission}
                  onChange={(e) =>
                    setResponsibilities((state) => ({
                      ...state,
                      clSubmission: e.target.value,
                    }))
                  }
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='Some'>Some</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Row className='m-0 p-0'>
              <FormControl size='small'>
                <InputLabel id='category-label'>
                  Office Management
                  <Tooltip
                    style={{
                      backgroundColor: 'white',
                    }}
                    title='Run morning huddles, Build profits and production graphs, supervise'
                  >
                    <InfoIcon style={{ fontSize: 22, marginLeft: 4 }} />
                  </Tooltip>
                </InputLabel>
                <Select
                  required
                  className='w-100'
                  labelId='category-label'
                  id='category'
                  label='Office Management  '
                  sx={{ mb: 2 }}
                  value={responsibilities.officeManagement}
                  onChange={(e) =>
                    setResponsibilities((state) => ({
                      ...state,
                      officeManagement: e.target.value,
                    }))
                  }
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='Some'>Some</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Row>
          </Col>
          <Col className='m-0 p-0 px-3' xs={12} md={3}>
            <Row className='m-0 p-0'>
              <FormControl size='small'>
                <InputLabel id='category-label'>Patient coordination</InputLabel>
                <Select
                  required
                  className='w-100'
                  labelId='category-label'
                  id='category'
                  label='Patient coordination'
                  sx={{ mb: 2 }}
                  value={responsibilities.patCoordination}
                  onChange={(e) =>
                    setResponsibilities((state) => ({
                      ...state,
                      patCoordination: e.target.value,
                    }))
                  }
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='Some'>Some</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Row className='m-0 p-0'>
              <FormControl size='small'>
                <InputLabel id='category-label'>
                  Financial Coordination
                </InputLabel>
                <Select
                  required
                  className='w-100'
                  labelId='category-label'
                  id='category'
                  label='Financial Coordination'
                  sx={{ mb: 2 }}
                  value={responsibilities.finCoordination}
                  onChange={(e) =>
                    setResponsibilities((state) => ({
                      ...state,
                      finCoordination: e.target.value,
                    }))
                  }
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='Some'>Some</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Row className='m-0 p-0'>
              <FormControl size='small'>
                <InputLabel id='category-label'>Treatment Planning</InputLabel>
                <Select
                  required
                  className='w-100'
                  labelId='category-label'
                  id='category'
                  label='Treatment Planning'
                  sx={{ mb: 2 }}
                  value={responsibilities.trPlanning}
                  onChange={(e) =>
                    setResponsibilities((state) => ({
                      ...state,
                      trPlanning: e.target.value,
                    }))
                  }
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='Some'>Some</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Row className='m-0 p-0'>
              <FormControl size='small'>
                <InputLabel id='category-label'>Collections</InputLabel>
                <Select
                  required
                  className='w-100'
                  labelId='category-label'
                  id='category'
                  label='Collections'
                  sx={{ mb: 2 }}
                  value={responsibilities.collections}
                  onChange={(e) =>
                    setResponsibilities((state) => ({
                      ...state,
                      collections: e.target.value,
                    }))
                  }
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='Some'>Some</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Row>
          </Col>
          <Col className='m-0 p-0 px-3' xs={12} md={3}>
            <Row className='m-0 p-0'>
              <FormControl size='small'>
                <InputLabel id='category-label'>Patient Scheduling</InputLabel>
                <Select
                  required
                  className='w-100'
                  labelId='category-label'
                  id='category'
                  label='Patient Scheduling'
                  sx={{ mb: 2 }}
                  value={responsibilities.patScheduling}
                  onChange={(e) =>
                    setResponsibilities((state) => ({
                      ...state,
                      patScheduling: e.target.value,
                    }))
                  }
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='Some'>Some</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Row className='m-0 p-0'>
              <FormControl size='small'>
                <InputLabel id='category-label'>
                  Insurance Payment Collection
                </InputLabel>
                <Select
                  required
                  className='w-100'
                  labelId='category-label'
                  id='category'
                  label='Insurance Payment Collection'
                  sx={{ mb: 2 }}
                  value={responsibilities.insPaymentCollection}
                  onChange={(e) =>
                    setResponsibilities((state) => ({
                      ...state,
                      insPaymentCollection: e.target.value,
                    }))
                  }
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='Some'>Some</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Row className='m-0 p-0'>
              <FormControl size='small'>
                <InputLabel id='category-label'>Hygiene Recall</InputLabel>
                <Select
                  required
                  className='w-100'
                  labelId='category-label'
                  id='category'
                  label='Hygiene Recall'
                  sx={{ mb: 2 }}
                  value={responsibilities.hygieneRecall}
                  onChange={(e) =>
                    setResponsibilities((state) => ({
                      ...state,
                      hygieneRecall: e.target.value,
                    }))
                  }
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='Some'>Some</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Row className='m-0 p-0'>
              <FormControl size='small'>
                <InputLabel id='category-label'>Payroll</InputLabel>
                <Select
                  required
                  className='w-100'
                  labelId='category-label'
                  id='category'
                  label='Payroll'
                  sx={{ mb: 2 }}
                  value={responsibilities.payroll}
                  onChange={(e) =>
                    setResponsibilities((state) => ({
                      ...state,
                      payroll: e.target.value,
                    }))
                  }
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='Some'>Some</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Row>
          </Col>
        </Row>
      </Row> */}
    </>
  );
}
