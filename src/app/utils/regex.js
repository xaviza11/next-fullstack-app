export function validateEmail(email, language) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return { success: false, message: language.backInvalidEmail };
  return { success: true, message: "Email is valid." };
}

export function validatePassword(password, language) {
  if (password.length < 8) return { success: false, message: language.backPasswordBadLength };
  if (!/[a-z]/.test(password)) return { success: false, message: language.backPasswordOneLowerCase };
  if (!/[A-Z]/.test(password)) return { success: false, message: language.backPasswordOneUpperCase };
  if (!/\d/.test(password)) return { success: false, message: language.backPasswordOneNumber };
  return { success: true, message: "Password is valid." };
}

export function validateName(name, language) {
  if (name.length < 2) return { success: false, message: language.backNameOneCharacter }
  return { success: true, message: language.backValidName};
}

