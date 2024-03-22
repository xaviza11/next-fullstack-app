
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { validatePassword, validateEmail, validateName } from "@/app/utils/regex";

interface Credentials {
    email: string;
    password: string;
  }

export async function authorize(credentials:Credentials) {

    const isPasswordValid = validatePassword(credentials?.password);
    const isEmailValid = validateEmail(credentials?.email);
  
    if (!isPasswordValid.success) {
      throw { message: isPasswordValid.message, status: 400 };
    }
  
    if (!isEmailValid.success) {
      throw { message: isEmailValid.message, status: 400 };
    }

  await connectDB();
  const userFound = await User.findOne({
    email: credentials?.email,
  }).select("+password");

  if (!userFound) throw {status: 400, message: 'User not exist'};

  const passwordMatch = await bcrypt.compare(
    credentials!.password,
    userFound.password
  );

  if (!passwordMatch) return {status: 401, message: 'Wrong password'}

  return { status: 200, message: 'Authentication successful', userFound };
}
  
