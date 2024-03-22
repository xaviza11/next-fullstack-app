export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return { success: false, message: "Invalid email format. Please enter a valid email address." };
  return { success: true, message: "Email is valid." };
}

  export function validatePassword(password) {
    if (password.length < 8) return { success: false, message: "Password must be at least 8 characters long." };
    if (!/[a-z]/.test(password)) return { success: false, message: "Password must contain at least one lowercase letter." };
    if (!/[A-Z]/.test(password)) return { success: false, message: "Password must contain at least one uppercase letter." };
    if (!/\d/.test(password)) return { success: false, message: "Password must contain at least one digit." };
    return { success: true, message: "Password is valid." };
  }

  export function validateName(name) {
    if(name.length < 2) return { success: false, message: "Name must have at least two characters" }
    return { success: true, message: "Name is valid" };
  }
  
  