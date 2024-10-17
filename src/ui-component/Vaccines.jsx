import React, { useState, useEffect } from 'react';



import Other from '../assets/images/certificates/Other.png';
import DEA from '../assets/images/certificates/DEA.png';
import CPFDA from '../assets/images/certificates/CPFDA.png';
import HBV from '../assets/images/certificates/HBV.png';
import COV from '../assets/images/certificates/COV.png';
import DA from '../assets/images/certificates/DA-Certificate.png';
import X_RAY from '../assets/images/certificates/X-RAY.png';
import DDS from '../assets/images/certificates/DDS.png';
import NPI from '../assets/images/certificates/NPI.png';
import RDH from '../assets/images/certificates/RDH.png';
import RDHAP from '../assets/images/certificates/RDHAP.png';
import RDA from '../assets/images/certificates/RDA.png';
import RDAEF from '../assets/images/certificates/RDAEF.png';
import RDAEF1 from '../assets/images/certificates/RDAEF1.png';
import RDAEF2 from '../assets/images/certificates/RDAEF2.png';
import CA from '../assets/images/certificates/CA.png';
import LDA from '../assets/images/certificates/LDA.png';
import LRDA_O from '../assets/images/certificates/LRDA-O.png';
import EFDA from '../assets/images/certificates/EFDA.png';
import COMSA from '../assets/images/certificates/COMSA.png';
import EFODA from '../assets/images/certificates/EFODA.png';
import EFPOA from '../assets/images/certificates/EFPOA.png';
import EDDA from '../assets/images/certificates/EDDA.png';
import QDA from '../assets/images/certificates/QDA.png';
import CRFDA from '../assets/images/certificates/CRFDA.png';
import OJT from '../assets/images/certificates/OJT.png';
import FTDA from '../assets/images/certificates/FTDA.png';
import COA from '../assets/images/certificates/COA.png';
import BLS from '../assets/images/certificates/BLS.png';
import CODA from '../assets/images/certificates/CODA.png';
import DANB from '../assets/images/certificates/DANB.png';
import EF from '../assets/images/certificates/EF.png';
import CDA from '../assets/images/certificates/CDA.png';
import OCDAC from '../assets/images/certificates/OCDAC.png';
import RHS from '../assets/images/certificates/RHS.png';
import AART from '../assets/images/certificates/AART.png';
import Dental_Radiographer from '../assets/images/certificates/Dental-Radiographer.png';
import Diode_Laser from '../assets/images/certificates/Diode-Laser.png';
import Liability_Insurance from '../assets/images/certificates/Liability-Insurance.png';
import COV_19 from '../assets/images/certificates/COV-19.png';



export default function Vaccines(docType) {

  let document = null;

  switch (docType) {
    case 'HBV':
      document = HBV;
      break;
    case 'COV':
      document = COV;
      break;
    case 'DA':
      document = DA;
      break;
    case 'X_RAY':
      document = X_RAY;
      break;
    case 'DDS':
      document = DDS;
      break;
    case 'DEA':
      document = DEA;
      break;
    case 'Liability_Insurance':
      document = Liability_Insurance;
      break;
    case 'NPI':
      document = NPI;
      break;
    case 'RDH':
      document = RDH;
      break;
    case 'RDHAP':
      document = RDHAP;
      break;
    case 'RDA':
      document = RDA;
      break;
    case 'RDAEF':
      document = RDAEF;
      break;
    case 'RDAEF1':
      document = RDAEF1;
      break;
    case 'RDAEF2':
      document = RDAEF2;
      break;
    case 'Diode_Laser':
      document = Diode_Laser;
      break;
    case 'CA':
      document = CA;
      break;
    case 'LDA':
      document = LDA;
      break;
    case 'LRDA_O':
      document = LRDA_O;
      break;
    case 'EFDA':
      document = EFDA;
      break;
    case 'COMSA':
      document = COMSA;
      break;
    case 'EFODA':
      document = EFODA;
      break;
    case 'EFPOA':
      document = EFPOA;
      break;
    case 'EDDA':
      document = EDDA;
      break;
    case 'QDA':
      document = QDA;
      break;
    case 'CRFDA':
      document = CRFDA;
      break;
    case 'OJT':
      document = OJT;
      break;
    case 'FTDA':
      document = FTDA;
      break;
    case 'COA':
      document = COA;
      break;
    case 'CRFDA':
      document = CRFDA;
      break;
    case 'CPFDA':
      document = CPFDA;
      break;
    case 'EDDA':
      document = EDDA;
      break;
    case 'BLS':
      document = BLS;
      break;
    case 'CODA':
      document = CODA;
      break;
    case 'DANB':
      document = DANB;
      break;
    case 'EF':
      document = EF;
      break;
    case 'LDA':
      document = LDA;
      break;
    case 'CDA':
      document = CDA;
      break;
    case 'OCDAC':
      document = OCDAC;
      break;
    case 'RHS':
      document = RHS;
      break;
    case 'Dental_Radiographer':
      document = Dental_Radiographer;
      break;
    case 'AART':
      document = AART;
      break;
    case 'HBV':
      document = HBV;
      break;
    default:
      document = Other;
  }

  return document;
}
