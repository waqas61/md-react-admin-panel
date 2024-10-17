import { RouterProvider } from 'react-router-dom';
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Pusher from 'pusher-js';


import {
  setNotification,
  addNotification,
  getNotificationsStatus,
  fetchNotifications,
  selectAllNotifications
} from './store/slices/notificationSlice';

import { selectMenuList, setMenuList, setAsyncMenuList } from './store/slices/menuListSlice';

import { selectUser } from "./store/slices/userSlice";
import { setAuthToken, setIsloggedin } from './store/slices/authSlice';
import { selectAuthToken, selectIsloggedin } from "./store/slices/authSlice";

//menu 
import storeMenuItems from './menu-items/store-menu-items';

// routing
import router from './routes';

// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';

// Pusher
const initPusher = () => {
  const pusher = new Pusher('9327abb9d05e103ead60', {
    cluster: 'mt1',
  });
  return pusher;
};

const useChannel = (channelName) => {
  const pusher = initPusher();
  const channel = useMemo(() => {
    if (!channelName) return null;
    if (!pusher.channel(channelName)) {
      return pusher.subscribe(channelName);
    }
    return pusher.channel(channelName);
  }, [channelName]);

  return channel;
};

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const audioPlayer = useRef(null);
  const dispatch = useDispatch();

  const redUser = useSelector(selectUser);
  const authToken = useSelector(selectAuthToken);
  const isloggedin = useSelector(selectIsloggedin);
  const currentUser = useSelector(selectUser);
  const notificationsStatus = useSelector(getNotificationsStatus);
  const notifications = useSelector(selectAllNotifications);

  useEffect(() => {
    if (redUser.is_profile_completed) {
      const pusher = new Pusher('9327abb9d05e103ead60', {
        cluster: 'mt1',
      });
      const channel = pusher.channel(currentUser?.socket_channel) || pusher.subscribe(currentUser?.socket_channel);
      channel.bind('notification', function (data) {
        dispatch(addNotification(data));
        playAudio();
      });
      return (() => {
        pusher.unsubscribe(currentUser?.socket_channel)
      })
    } else {
      // console.log('Wakeel');
    }

    if (redUser.roleType == 'owner') {
      dispatch(setAsyncMenuList(storeMenuItems.ownerMenuList));
    } else {
      dispatch(setAsyncMenuList(storeMenuItems.professionalMenuList));
    }

  }, [redUser]);

  useEffect(() => {
    if (notificationsStatus === 'idle' && redUser.is_profile_completed) {
      dispatch(fetchNotifications(redUser.authToken));
    } else {

    }
  }, [redUser]);

  const playAudio = () => {
    audioPlayer.current.play();
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <RouterProvider router={router} />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;