import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Button, CircularProgress } from '@mui/material';


import ForAssistant from './ForAssistant';
import ForFrontOffice from './ForFrontOffice';
import ForHygeinist from './ForHygeinist';
import ForSpecialist from './ForSpecialist';
import { selectUser, setUser } from '../../../store/slices/userSlice';


// Step 3
export default function Questionnaire({ setActiveStep }) {
  const [rinputValue, setRinputValue] = useState('');
  const [prcValue, setPrcValue] = useState('');
  const [error, setError] = useState(false);
  const user = useSelector(selectUser);

  const handleChipDelete = (index) => {
    setRadiographySystems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChipDeletePrc = (index) => {
    setPracticeManagementSoftware((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && rinputValue.trim() !== '') {
      setRadiographySystems((prev) => [...prev, rinputValue]);
      setRinputValue('');
    } else if (
      e.key === 'Backspace' &&
      rinputValue === '' &&
      radiographySystems.length > 0
    ) {
      setRadiographySystems((prev) => prev.slice(0, prev.length - 1));
    }
  };

  const handleKeyDownPrc = (e) => {
    if (e.key === 'Enter' && prcValue.trim() !== '') {
      setPracticeManagementSoftware((prev) => [...prev, prcValue]);
      setPrcValue('');
    } else if (
      e.key === 'Backspace' &&
      prcValue === '' &&
      practiceManagementSoftware.length > 0
    ) {
      setPracticeManagementSoftware((prev) => prev.slice(0, prev.length - 1));
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const [yearsWorked, setYearsWorked] = useState({
    years: '',
    months: '',
  });

  const [radiographySystems, setRadiographySystems] = useState([]);

  const [yearsAsRDA, setYearsAsRDA] = useState({
    years: '',
    months: '',
  });

  const [yearsAsRDH, setYearsAsRDH] = useState({
    years: '',
    months: '',
  });

  const [yearsAsTreatmentCoord, setYearsAsTreatmentCoord] = useState({
    years: '',
    months: '',
  });

  const [yearsAsDDS, setYearsAsDDS] = useState({
    years: '',
    months: '',
  });

  const [practiceManagementSoftware, setPracticeManagementSoftware] = useState(
    []
  );

  const [specialties, setSpecialties] = useState({
    general: '',
    prostho: '',
    cosmetic: '',
    pedo: '',
    ortho: '',
    perio: '',
    endo: '',
    implants: '',
    oralSurgery: '',
  });

  const [additionalInfo, setAdditionalInfo] = useState({
    cadCam: '',
    pano: '',
    imaging3D: '',
    nomadXRay: '',
    intraoralCameras: '',
    cephalometricXRay: '',
    crossTrained: '',
    nitrousOxide: '',
    anesthesizeSelf: '',
    applyingAntiMicrobials: '',
  });

  const [responsibilities, setResponsibilities] = useState({
    insBilling: '',
    trPresentation: '',
    patCoordination: '',
    patScheduling: '',
    payables: '',
    elegVerification: '',
    finCoordination: '',
    posting: '',
    clSubmission: '',
    trPlanning: '',
    marketing: '',
    officeManagement: '',
    collections: '',
    insPaymentCollection: '',
    hygieneRecall: '',
    payroll: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleNext = (e) => {
    e.preventDefault()
    setIsLoading(true);

    const answers = {
      years_worked: {
        years: yearsWorked.years,
        months: yearsWorked.months,
      },
      radiography_systems: radiographySystems,
      years_as_rda: {
        years: yearsAsRDA.years,
        months: yearsAsRDA.months,
      },
      practice_management_software: practiceManagementSoftware,
      specialties: specialties,
      additional_info: additionalInfo,
      years_as_rdh: {
        years: yearsAsRDH.years,
        months: yearsAsRDH.months,
      },
      years_as_treatment_coord: {
        years: yearsAsTreatmentCoord.years,
        months: yearsAsTreatmentCoord.months,
      },
      years_as_dds: {
        years: yearsAsDDS.years,
        months: yearsAsDDS.months,
      },
      responsibilities: responsibilities,
    };

    const stringifiedAnswers = JSON.stringify(answers);
    const authToken = localStorage.getItem('auth_token');
    const encode = encodeURIComponent(stringifiedAnswers);
    const apiUrl = `https://api.mddentalstaffing.com/api/v1/signup/profile/questionnaire?questionnaire_answers=${encode}&steps_completed=3`;

    axios
      .post(apiUrl, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        // console.log(response.data.data);
        dispatch(setUser(response.data.data));
        localStorage.setItem('user', JSON.stringify(response.data.data));
        setIsLoading(false);
        navigate('/professional/account/profile');
        // setTimeout(
        //   function () {
        //     navigate('/professional/account/profile');
        //   }, 5000);
      })
      .catch((error) => {
        setError(true);
        console.error(error);
      });
    // .finally(() => {
    //   setIsLoading(false);
    // });
  };

  return (
    <>
      {user && user.category_id == 1 ? (
        <ForAssistant
          setAdditionalInfo={setAdditionalInfo}
          additionalInfo={additionalInfo}
          setSpecialties={setSpecialties}
          setYearsAsRDA={setYearsAsRDA}
          yearsAsRDA={yearsAsRDA}
          specialties={specialties}
          setYearsWorked={setYearsWorked}
          yearsWorked={yearsWorked}
          handleKeyDownPrc={handleKeyDownPrc}
          handleKeyDown={handleKeyDown}
          handleChipDeletePrc={handleChipDeletePrc}
          handleChipDelete={handleChipDelete}
          practiceManagementSoftware={practiceManagementSoftware}
          prcValue={prcValue}
          setPrcValue={setPrcValue}
          radiographySystems={radiographySystems}
          setRinputValue={setRinputValue}
          rinputValue={rinputValue}
        />
      ) : user && user.category_id == 2 ? (
        <ForHygeinist
          setAdditionalInfo={setAdditionalInfo}
          additionalInfo={additionalInfo}
          setSpecialties={setSpecialties}
          setYearsAsRDH={setYearsAsRDH}
          yearsAsRDH={yearsAsRDH}
          specialties={specialties}
          setYearsWorked={setYearsWorked}
          yearsWorked={yearsWorked}
          handleKeyDownPrc={handleKeyDownPrc}
          handleKeyDown={handleKeyDown}
          handleChipDeletePrc={handleChipDeletePrc}
          handleChipDelete={handleChipDelete}
          practiceManagementSoftware={practiceManagementSoftware}
          prcValue={prcValue}
          setPrcValue={setPrcValue}
          radiographySystems={radiographySystems}
          setRinputValue={setRinputValue}
          rinputValue={rinputValue}
        />
      ) : user && user.category_id == 3 ? (
        <ForFrontOffice
          setResponsibilities={setResponsibilities}
          responsibilities={responsibilities}
          setSpecialties={setSpecialties}
          setYearsAsTreatmentCoord={setYearsAsTreatmentCoord}
          yearsAsTreatmentCoord={yearsAsTreatmentCoord}
          specialties={specialties}
          setYearsWorked={setYearsWorked}
          yearsWorked={yearsWorked}
          handleKeyDownPrc={handleKeyDownPrc}
          handleKeyDown={handleKeyDown}
          handleChipDeletePrc={handleChipDeletePrc}
          handleChipDelete={handleChipDelete}
          practiceManagementSoftware={practiceManagementSoftware}
          prcValue={prcValue}
          setPrcValue={setPrcValue}
          radiographySystems={radiographySystems}
          setRinputValue={setRinputValue}
          rinputValue={rinputValue}
        />
      ) : user && user.category_id == 4 ? (
        <ForSpecialist
          setAdditionalInfo={setAdditionalInfo}
          additionalInfo={additionalInfo}
          setSpecialties={setSpecialties}
          setYearsAsDDS={setYearsAsDDS}
          yearsAsDDS={yearsAsDDS}
          specialties={specialties}
          setYearsWorked={setYearsWorked}
          yearsWorked={yearsWorked}
          handleKeyDownPrc={handleKeyDownPrc}
          handleKeyDown={handleKeyDown}
          handleChipDeletePrc={handleChipDeletePrc}
          handleChipDelete={handleChipDelete}
          practiceManagementSoftware={practiceManagementSoftware}
          prcValue={prcValue}
          setPrcValue={setPrcValue}
          radiographySystems={radiographySystems}
          setRinputValue={setRinputValue}
          rinputValue={rinputValue}
        />
      ) : null}
      {error && <p className='text-danger'> Error </p>}



      <Box sx={{ mt: 4 }} >
        <Grid container spacing={3}>

          <Grid
            item
            xs={12}
            sm={12}
            md={4}
          >
            <Button
              variant='outlined'
              className='w-100'
              color='primary'
              style={{ height: '3rem' }}
              sx={{
                borderRadius: '4px',
                color: '#2561B0',
                textTransform: 'none',
                boxShadow: 'none',
              }}
              onClick={() => {
                setActiveStep((state) => state - 1);
              }}
            >
              Back
            </Button>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={4}
          >
            <Button
              // type='submit'
              className='w-100'
              variant='contained'
              style={{ height: '3rem' }}
              color='primary'
              disabled={isLoading || !yearsWorked.years || !yearsWorked.months}
              sx={{
                borderRadius: '4px',
                background: '#4CAF50',
                boxShadow: 'none',
                textTransform: 'none',
              }}
              onClick={handleNext}
            // onClick={() => {
            //   handleNext();
            // }}
            >
              {isLoading ? <CircularProgress /> : 'Register'}
            </Button>
          </Grid>

        </Grid>
      </Box>




      {/* <Row className='my-3'>
        <Col xs={12} md={1}>
          <Button
            variant='outlined'
            className='w-100'
            color='primary'
            style={{ height: '3rem' }}
            sx={{
              borderRadius: '4px',
              color: '#2561B0',
              textTransform: 'none',
              boxShadow: 'none',
            }}
            onClick={() => {
              setActiveStep((state) => state - 1);
            }}
          >
            Back
          </Button>
        </Col>
        <Col className='my-3 my-md-0' xs={12} md={2}>
          <Button
            // type='submit'
            className='w-100'
            variant='contained'
            style={{ height: '3rem' }}
            color='primary'
            disabled={isLoading || !yearsWorked.years || !yearsWorked.months}
            sx={{
              borderRadius: '4px',
              background: '#4CAF50',
              boxShadow: 'none',
              textTransform: 'none',
            }}
            onClick={handleNext}
          // onClick={() => {
          //   handleNext();
          // }}
          >
            {isLoading ? <CircularProgress /> : 'Register'}
          </Button>
        </Col>
      </Row> */}
    </>
  );
}
