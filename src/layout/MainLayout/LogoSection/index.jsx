import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';

// project imports
import config from '../../../config';
import Logo from '../../../ui-component/Logo';
import { MENU_OPEN } from '../../../store/actions';
import { selectOpened, selectDefaultId } from "../../../store/slices/customizationSlice";
import { setOpened, setIsOpen } from "../../../store/slices/customizationSlice";


// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  // const defaultId = useSelector((state) => state.customization.defaultId);
  const defaultId = useSelector(selectDefaultId);
  const dispatch = useDispatch();
  return (
    // <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}>
    <ButtonBase disableRipple onClick={() => dispatch(setIsOpen(defaultId))} component={Link} to={config.defaultPath}>
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
