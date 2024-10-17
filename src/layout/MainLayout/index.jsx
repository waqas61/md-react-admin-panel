import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// material-ui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import { CssBaseline, styled, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar-new';
import Customization from '../Customization';
import Breadcrumbs from '../../ui-component/extended/Breadcrumbs';
import { SET_MENU } from '../../store/actions';
import { drawerWidth } from '../../store/constant';

import { selectOpened } from "../../store/slices/customizationSlice";
import { setOpened } from "../../store/slices/customizationSlice";
import navigation from '../../menu-items';

import NotificationsSidebar from '../../ui-component/notifications/index';

// assets
import { IconChevronRight } from '@tabler/icons-react';

//store
import {
  selectUser,
  setUser
} from '../../store/slices/userSlice';
import {
  setNotification,
  addNotification,
  getNotificationsStatus,
  fetchNotifications,
  selectAllNotifications
} from '../../store/slices/notificationSlice';
import {
  setAuthToken,
  setIsloggedin
} from '../../store/slices/authSlice';
import {
  selectAuthToken,
  selectIsloggedin
} from "../../store/slices/authSlice";







const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  // p: 0,
  marginRight: '0px',
  transition: theme.transitions.create(
    'margin',
    open
      ? {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }
      : {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? 0 : -(drawerWidth - 4),
    width: `calc(100% - ${drawerWidth}px)`
  },
  [theme.breakpoints.down('md')]: {
    // marginLeft: '20px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px'
  },
  [theme.breakpoints.down('sm')]: {
    // marginLeft: '10px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px',
    // marginRight: '10px'
  }
}));


// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const currentUser = useSelector(selectUser);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const notificationsStatus = useSelector(getNotificationsStatus);
  const notifications = useSelector(selectAllNotifications);
  const [notificationsSidebar, setNotificationsSidebar] = React.useState(false);


  // Handle left drawer
  const leftDrawerOpened = useSelector(selectOpened);

  const handleLeftDrawerToggle = () => {
    // dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    dispatch(setOpened(!leftDrawerOpened));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none',
          "& .MuiToolbar-root": {
            padding: 0,
            paddingRight: 2,
            minHeight: 67
          },
          height: '65px'
        }}
      >
        <Toolbar
          sx={{
            p: 0,
            // background: '#2561B0',
            // '& .MuiToolbar-root': {

            //   [theme.breakpoints.down('md')]: {
            //     paddingLeft: '2px',
            //     paddingRight: '2px',
            //   },
            // },
          }}
        >
          <Header
            handleLeftDrawerToggle={handleLeftDrawerToggle}
            setNotificationsSidebar={setNotificationsSidebar}
            notifications={notifications}
          />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

      {/* main content */}
      <Main theme={theme} open={leftDrawerOpened}>
        {/* breadcrumb */}
        <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
        <Outlet />
      </Main>

      <Customization />

      <NotificationsSidebar
        handleClose={() => setNotificationsSidebar(false)}
        open={notificationsSidebar}
        key={notificationsSidebar}
        notifications={notifications}
      />

    </Box>
  );
};

export default MainLayout;
