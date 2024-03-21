export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const TOGGLE_ALERT = 'TOGGLE_ALERT'

export const setError = (errorMessage:string) => ({
  type: SET_ERROR_MESSAGE,
  payload: errorMessage
});

export const toggleAlert = (isAlertToggled:boolean) => ({
    type: TOGGLE_ALERT,
    payload: isAlertToggled
})