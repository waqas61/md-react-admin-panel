import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
// import { MENU_OPEN, SET_MENU } from '../../../../../store/actions';
// import { selectDefaultId } from '../../../../../store/slices/customizationSlice';
import { selectOpened, selectIsOpen } from "../../../../../store/slices/customizationSlice";
import { setOpened, setIsOpen } from "../../../../../store/slices/customizationSlice";
import { selectAuthToken, selectIsloggedin } from "../../../../../store/slices/authSlice";

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const customization = useSelector((state) => state.customization);

  const Opened = useSelector(selectOpened);
  const IsOpen = useSelector(selectIsOpen);

  const authToken = useSelector(selectAuthToken);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.8} size="1.4rem" color='white' />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: IsOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: IsOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    console.log('id == >', id);
    // dispatch({ type: MENU_OPEN, id });
    // if (matchesSM) dispatch({ type: SET_MENU, opened: false });
    dispatch(setIsOpen(id));
    if (matchesSM) dispatch(setOpened(false));
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname.toString().split('/').findIndex((id) => {
      return id === item.id;
    });



    if (currentIndex > -1) {
      // dispatch({ type: MENU_OPEN, id: item.id });
      dispatch(setIsOpen(item.id));
    }
    // eslint-disable-next-line
  }, [pathname]);




  // useEffect(() => {
  //   console.log('Opened', Opened);
  //   console.log('IsOpen', IsOpen);
  // }, [IsOpen, Opened]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 14}px`,
        '&.Mui-selected': {
          backgroundColor: level > 1 ? '#4784cb8a !important' : `${theme.menuSelectedBack} !important`,
          '&:after': {
            content: "''",
            position: 'absolute',
            // left: '32px',
            top: 0,
            height: '100%',
            // width: '1px',
            width: '4px',
            opacity: 1,
            left: '0px',
            background: theme.palette.primary.light
          }
        },
        '&:hover': {
          backgroundColor: level > 1 ? `#4784cb8a !important` : `${theme.menuSelectedBack} !important`,
        }
      }}
      selected={IsOpen.findIndex((id) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{
        minWidth: !item?.icon ? 18 : 36,
      }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={IsOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;
