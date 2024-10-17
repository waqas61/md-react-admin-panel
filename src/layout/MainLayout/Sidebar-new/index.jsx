import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import MenuCard from './MenuCard';
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import Chip from '../../../ui-component/extended/Chip';

import { drawerWidth } from '../../../store/constant';

// ==============================|| SIDEBAR DRAWER ||============================== //

const DrawerCust = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    top: '64px',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      top: '64px'
    },
    [theme.breakpoints.up('sm')]: {
      top: '64px'
    },
    [theme.breakpoints.up('xs')]: {
      top: '64px'
    },
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  console.log('Theme PA', theme);
  const drawer = (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            marginTop: '75px',
            // paddingLeft: '16px',
            // paddingRight: '16px'
          }}

        >
          <MenuList />
          <MenuCard />

          <Stack direction="row" justifyContent="center" sx={{ mb: 8, p: 2, textAlign: 'center' }}>
            <Typography variant="p"
              sx={{
                color: 'white',
                alignContent: 'center',
                textAlign: 'center',
                alignItems: 'center'
              }}
            >
              Please have professional scan QR code with their device to check in, otherwise choose verification code tab.
            </Typography>
            {/* <Chip
              label={1}
              disabled
              chipcolor="secondary"
              size="small"
              sx={{ cursor: 'pointer' }}
            /> */}
          </Stack>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
          {/* <MenuCard />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip label={1} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
          </Stack> */}
        </Box>
      </MobileView>
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background.defaultSideBar,
            // background: theme.palette.secondary[800],
            color: theme.palette.text.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: '65px',
              bottom: '15px',
            }
          },
          // ...(drawerOpen && {
          //   ...openedMixin(theme),
          //   '& .MuiDrawer-paper': openedMixin(theme),
          // }),
          // ...(!drawerOpen && {
          //   ...closedMixin(theme),
          //   '& .MuiDrawer-paper': closedMixin(theme),
          // }),
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>




      {/* <DrawerCust
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </DrawerCust> */}

    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object
};

export default Sidebar;
