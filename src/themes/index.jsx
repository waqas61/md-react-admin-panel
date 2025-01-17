import { createTheme } from '@mui/material/styles';

// assets
import colors from '../assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
  const color = colors;

  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    backgroundSideBar: color.secondaryDark,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    // menuSelected: color.paper,
    // menuSelectedBack: color.secondaryLightSelected,
    menuSelectedBack: color.darkTextSecondary,
    menuSelectHover: color.secondaryDark,
    menuSelected: color.secondaryDark,
    menuSelectedBackHover: color.darkPrimaryLight,
    menuSelectedTextColor: color.paper,
    successSidebar: color.successSidebar,
    divider: color.grey200,
    customization,
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    typography: themeTypography(themeOption)
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
