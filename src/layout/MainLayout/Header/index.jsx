import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useRef, useEffect, useMemo } from 'react';


// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';


// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import NotificationSection from './NotificationSection';
import MessageSection from './MessageSection';
import ProfileSection from './ProfileSection';

// assets
import { IconMenu2 } from '@tabler/icons-react';


// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle, setNotificationsSidebar, notifications }) => {
  const theme = useTheme();


  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 245,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <ButtonBase sx={{
          // borderRadius: '8px',
          overflow: 'hidden',
          background: '#2561B0',
          height: '65px',
          width: '65px',

        }}>
          <Avatar
            variant="square"
            sx={{
              // ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: '#2561B0',
              // background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            onClick={handleLeftDrawerToggle}
          // color="inherit"
          >
            <IconMenu2 stroke={2.5} size="1.3rem" color='white' />
          </Avatar>
        </ButtonBase>

        <Box component="span" sx={{ mt: 1, display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>


      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      {/* <Box sx={{ flexGrow: 1 }} /> */}

      {/* notification & profile */}
      <Divider orientation="vertical" variant="middle" flexItem />
      <MessageSection />
      <Divider orientation="vertical" variant="middle" flexItem />
      <NotificationSection setNotificationsSidebar={setNotificationsSidebar} notifications={notifications} />
      <Divider orientation="vertical" variant="middle" flexItem />
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
