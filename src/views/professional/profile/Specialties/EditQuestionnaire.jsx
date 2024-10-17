import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';



import { Grid } from '@mui/material';
import { SpecialityQuestionnaire } from './SpecialityQuestionnaire';

import SubCard from '../../../../ui-component/cards/SubCard';
import MainCard from '../../../../ui-component/cards/MainCard';
import PanelCard from '../../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../../ui-component/cards/CardSecondaryAction';


import { selectUser } from '../../../../store/slices/userSlice';
import { gridSpacing } from '../../../../store/constant';

const EditQuestionnaireProfile = () => {
  const user = useSelector(selectUser);
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
  const [rinputValue, setRinputValue] = useState('');
  const [prcValue, setPrcValue] = useState('');

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

  const handleChipDeletePrc = (index) => {
    setPracticeManagementSoftware((prev) => prev.filter((_, i) => i !== index));
  };
  const handleChipDelete = (index) => {
    setRadiographySystems((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const decodedString = decodeURIComponent(user.questionnaire_answers);
    const JSONquestionnaire = JSON.parse(decodedString);
    setAdditionalInfo(JSONquestionnaire?.additional_info);
    setPracticeManagementSoftware(
      JSONquestionnaire?.practice_management_software
    );
    setRadiographySystems(JSONquestionnaire?.radiography_systems);
    setResponsibilities(JSONquestionnaire?.responsibilities);
    setSpecialties(JSONquestionnaire?.specialties);
    setYearsAsDDS(JSONquestionnaire?.years_as_dds);
    setYearsAsRDA(JSONquestionnaire?.years_as_rda);
    setYearsAsRDH(JSONquestionnaire?.years_as_rdh);
    setYearsAsTreatmentCoord(JSONquestionnaire?.years_as_treatment_coord);
    setYearsWorked(JSONquestionnaire?.years_worked);
  }, []);






  return (
    <>
      <MainCard
        title="My Account"
        darkTitle="Edit Questionaire"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <SpecialityQuestionnaire
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
              setYearsAsRDH={setYearsAsRDH}
              yearsAsRDH={yearsAsRDH}
              setYearsAsTreatmentCoord={setYearsAsTreatmentCoord}
              yearsAsTreatmentCoord={yearsAsTreatmentCoord}
              setYearsAsDDS={setYearsAsDDS}
              yearsAsDDS={yearsAsDDS}
              setResponsibilities={setResponsibilities}
              responsibilities={responsibilities}
            />

          </Grid>
        </Grid>
      </MainCard >
    </>
  );





  // return (
  //   <Layout
  //     items={[
  //       { link: '/professional/account/specialties', name: 'My Account' },
  //     ]}
  //   >
  //     <Grid
  //       sx={{
  //         px: 3,
  //         pt: 2,
  //         pb: 1,
  //         borderBottom: '1px solid #D9D9D9',
  //         width: 'auto',
  //       }}
  //     >
  //       <h4 className='pb-0 mb-1' style={{ color: '#262626' }}>
  //         My Account
  //       </h4>
  //       <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
  //         Edit Questionaire
  //       </p>
  //     </Grid>


  //   </Layout>
  // );
};

export default EditQuestionnaireProfile;
