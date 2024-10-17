// project imports
import config from 'config';

// action - state management
import * as actionTypes from './actions';





// export const SET_MENU = '@customization/SET_MENU';
// export const MENU_TOGGLE = '@customization/MENU_TOGGLE';
// export const MENU_OPEN = '@customization/MENU_OPEN';
// export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY';
// export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS';



export const initialState = {
  isOpen: [], // for active default menu
  defaultId: 'default',
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isOpen: [id]
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened
      };
    case actionTypes.SET_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.fontFamily
      };
    case actionTypes.SET_BORDER_RADIUS:
      return {
        ...state,
        borderRadius: action.borderRadius
      };
    default:
      return state;
  }
};

export default customizationReducer;
