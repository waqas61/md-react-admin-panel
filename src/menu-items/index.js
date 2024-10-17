import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Autocomplete,
  TextField,
  Box,
  Grid,
  Typography,
  Card,
  Badge,
  Radio,
  RadioGroup,
  Switch,
  FormGroup
} from "@mui/material";


import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import calender from './calender';
import posting from './posting';
import booked from './booked';
import jobHistory from './job-history';
import applicants from './applicants';
import subscription from './subscription';
import specialOffers from './special-offers';
import userManual from './user-manual';
import transactions from './transactions';
import account from './account';

import professionalDashboard from './pro-menu-items/dashboard';
import professionalPosting from './pro-menu-items/professionalPosting';
import offices from './pro-menu-items/offices';
import proJobHistory from './pro-menu-items/job-history';
import professionalAccount from './pro-menu-items/professionalAccount';
import proSpecialOffers from './pro-menu-items/special-offers';
import proUserManual from './pro-menu-items/user-manual';

import { store } from "../store/store";
const state = store.getState();
// ==============================|| MENU ITEMS ||============================== //


const appMenu = state?.user?.role_type == 'owner' ? [
  // calender,
  dashboard,
  posting,
  booked,
  jobHistory,
  transactions,
  applicants,
  account,
  specialOffers,
  subscription,
  userManual,
] : [

  dashboard,
  posting,
  booked,
  jobHistory,
  transactions,
  applicants,
  account,
  specialOffers,
  subscription,
  userManual,

  // professionalDashboard,
  // professionalPosting,
  // offices,
  // proJobHistory,
  // professionalAccount,
  // proSpecialOffers,
  // proUserManual
];

const menuItems = {
  items: appMenu
  // items: [
  //   // calender,
  //   dashboard,
  //   posting,
  //   booked,
  //   jobHistory,
  //   transactions,
  //   applicants,
  //   account,
  //   specialOffers,
  //   subscription,
  //   userManual,
  // ]
};

export default menuItems;