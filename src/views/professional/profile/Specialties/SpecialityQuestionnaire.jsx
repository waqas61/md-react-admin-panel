import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CircularProgress, Button } from '@mui/material';

import ForAssistant from '../../../auth/professional-reg/ForAssistant';
import ForFrontOffice from '../../../auth/professional-reg/ForFrontOffice';
import ForHygeinist from '../../../auth/professional-reg/ForHygeinist';
import ForSpecialist from '../../../auth/professional-reg/ForSpecialist';


import { selectUser, setUser } from '../../../../store/slices/userSlice';





export const SpecialityQuestionnaire = ({
  setAdditionalInfo,
  additionalInfo,
  setSpecialties,
  setYearsAsRDA,
  yearsAsRDA,
  specialties,
  setYearsWorked,
  yearsWorked,
  handleKeyDownPrc,
  handleKeyDown,
  handleChipDeletePrc,
  handleChipDelete,
  practiceManagementSoftware,
  prcValue,
  setPrcValue,
  radiographySystems,
  setRinputValue,
  rinputValue,
  setYearsAsRDH,
  yearsAsRDH,
  setYearsAsTreatmentCoord,
  yearsAsTreatmentCoord,
  setYearsAsDDS,
  yearsAsDDS,
  setResponsibilities,
  responsibilities,
}) => {
  let dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    setIsLoading(true);
    const answers = {
      additional_info: additionalInfo,
      practice_management_software: practiceManagementSoftware,
      radiography_systems: radiographySystems,
      responsibilities: responsibilities,
      specialties: specialties,
      years_as_dds: yearsAsDDS,
      years_as_rda: yearsAsRDA,
      years_as_rdh: yearsAsRDH,
      years_as_treatment_coord: yearsAsTreatmentCoord,
      years_worked: yearsWorked,
    };
    const stringifiedAnswers = JSON.stringify(answers);
    const encode = encodeURIComponent(stringifiedAnswers);
    const API_BASE_URL = 'https://api.mddentalstaffing.com/api/v1';
    await axios
      .put(
        `${API_BASE_URL}/profile/questionnaire?questionnaire_answers=${encode}`,
        null,
        {
          headers: {
            method: 'PUT',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .then((res) => {
        const updatedUser = {
          ...user,
          questionnaire_answers: encode,
        };
        dispatch(setUser(updatedUser));
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsLoading(false);
        navigate('/professional/account/specialties');
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  return (
    <div
      style={{
        padding: '0px 20px',
      }}
    >
      {user && user.category_id === 1 ? (
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
      ) : user.category_id === 2 ? (
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
      ) : user.category_id === 3 ? (
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
      ) : user.category_id === 4 ? (
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
      <Button
        type='submit'
        disabled={isLoading || !yearsWorked?.years || !yearsWorked?.months}
        style={{
          color: '#fff',
          backgroundColor: '#2561B0',
          padding: '8px 27px',
          border: 'none',
          marginTop: '40px',
          borderRadius: '4px',
        }}
        onClick={() => {
          handleSave();
        }}
      >
        {isLoading ? <CircularProgress /> : 'Save'}
      </Button>
    </div>
  );
};
