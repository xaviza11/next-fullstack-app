import { SET_ERROR_MESSAGE, TOGGLE_ALERT} from "./actions";

const initialState = {
  errorMessage: 'none',
  isAlertOpen: false
};

const reducers = (state = initialState, action:any) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    case TOGGLE_ALERT:
      return  { ...state, isAlertOpen: action.payload };
    default:
      return state;
  }
};

export default reducers;