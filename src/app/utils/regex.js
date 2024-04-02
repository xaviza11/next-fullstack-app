export function validateEmail(email, language) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return { success: false, message: language.invalidEmail };
  return { success: true, message: language.emailValid };
}

export function validatePassword(password, language) {
  if (/\s/.test(password)) return { success: false, message: language.passwordNoSpaces }
  if (password.length < 8) return { success: false, message: language.passwordBadLength };
  if (!/[a-z]/.test(password)) return { success: false, message: language.passwordOneLowerCase };
  if (!/[A-Z]/.test(password)) return { success: false, message: language.passwordOneUpperCase };
  if (!/\d/.test(password)) return { success: false, message: language.passwordOneNumber };
  if(/[\'\"<>]/.test(password)) return { success: false, message: language.passwordNotSpecial }
  return { success: true, message: language.passwordValid};
}

export function validateName(name, language) {
  if (name.length < 2) return { success: false, message: language.nameOneCharacter }
  return { success: true, message: language.validName};
}

export function validateFullRoute(route, language) {  
  if(!/^\s*(-?\d+\.\d+)\s+(-?\d+\.\d+)\s+(\d+)\s*(?:,|$)\s*/.test(route)) return {success: false, message: language.fullRouteInvalidFormat}
  return {success: true, message: language.validFullRoute}
}

export function validateCoordinates(coordinates){
  const routeRegex = /^-?\d{1,3}\.\d{6}\s-?\d{1,3}\.\d{6}$/;
  return routeRegex.test(coordinates)
}