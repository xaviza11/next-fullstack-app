export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const TOGGLE_ALERT = 'TOGGLE_ALERT'
export const TOGGLE_SESSION = 'TOGGLE_SESSION'
export const SET_NAME = 'SET_NAME'
export const SET_TOKEN = 'SET_TOKEN'

export const setError = (errorMessage: string) => ({
  type: SET_ERROR_MESSAGE,
  payload: errorMessage
});

export const toggleAlert = (isAlertToggled: boolean) => ({
    type: TOGGLE_ALERT,
    payload: isAlertToggled
})

export const toggleSession = (hasSession: boolean) => ({
  type:  TOGGLE_SESSION,
  payload: hasSession
})

export const setName = (setName: string | null) => ({
  type: SET_NAME,
  payload: setName
})

export const setToken = (setToken: string) => ({
  type: SET_TOKEN,
  payload: setToken
})