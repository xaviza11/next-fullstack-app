import { SET_ERROR_MESSAGE, TOGGLE_ALERT, TOGGLE_SESSION, SET_NAME, SET_TOKEN} from "./actions";

type Actions = | { type: typeof SET_ERROR_MESSAGE; payload: string }| { type: typeof TOGGLE_ALERT; payload: boolean } | { type: typeof TOGGLE_SESSION; payload: boolean } | { type: typeof SET_NAME; payload: string | null } | { type: typeof SET_TOKEN; payload: string };

const initialState = {
  errorMessage: 'none',
  isAlertOpen: false,
  hasSession: false,
  name: null,
  token: 'none' 
};

const reducers = (state = initialState, action:Actions) => {
  switch (action.type) {
    case SET_TOKEN:
      return {...state, errorMessage: action.payload}
    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    case TOGGLE_ALERT:
      return  { ...state, isAlertOpen: action.payload };
    case TOGGLE_SESSION:
      return {...state, hasSession: action.payload}
    case SET_NAME:
      return {...state, name: action.payload}
    default:
      return state;
  }
};

export default reducers;