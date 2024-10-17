// material-ui
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// project imports
import NavGroup from './NavGroup';
import menuItem from '../../../../menu-items';

import { selectMenuList, setMenuList, setAsyncMenuList  } from '../../../../store/slices/menuListSlice';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const dispatch = useDispatch();
  const menuItem = useSelector(selectMenuList);

  // const navItems = menuItem.items.map((item) => {
  //   switch (item.type) {
  //     case 'group':
  //       return <NavGroup key={item.id} item={item} />;
  //     default:
  //       return (
  //         <Typography key={item.id} variant="h6" color="error" align="center">
  //           Menu Items Error
  //         </Typography>
  //       );
  //   }
  // });
  

  const navItems = menuItem.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
