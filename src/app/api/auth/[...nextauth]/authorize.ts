
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { validatePassword, validateEmail, validateName } from "@/app/utils/regex";
import routerLanguage from "../../utils/routerLanguage";

interface Credentials {
    email: string;
    password: string;
    language: string
  }

export async function authorize(credentials:Credentials) {

  const languageSelected = await routerLanguage(credentials?.language)
  if (languageSelected === undefined) throw {message: "fatal language error", status: 500 }

    const isPasswordValid = validatePassword(credentials?.password, languageSelected);
    const isEmailValid = validateEmail(credentials?.email, languageSelected);
  
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

  if (!userFound) throw {status: 409, message: languageSelected.userNotExist};

  const passwordMatch = await bcrypt.compare(
    credentials!.password,
    userFound.password
  );

  if (!passwordMatch) return {status: 401, message: languageSelected.wrongPassword}

  return { status: 200, message: languageSelected.authSuccess, userFound };
}
  
