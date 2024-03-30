import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { validatePassword, validateEmail } from '@/app/utils/regex';
import routerLanguage from '../../utils/routerLanguage';
import { connectDB } from "@/libs/mongodb";
import {setCookie} from '../../utils/cookies'

interface Credentials {
  email: string;
  password: string;
  language: string;
}

export async function authenticate(credentials: Credentials) {
  const languageSelected = await routerLanguage(credentials?.language);
  if (languageSelected === undefined) throw { message: "fatal language error", status: 500 };

  const isPasswordValid = validatePassword(credentials?.password, languageSelected);
  const isEmailValid = validateEmail(credentials?.email, languageSelected);

  if (!isPasswordValid.success) {
    throw { message: isPasswordValid.message, status: 400 };
  }

  if (!isEmailValid.success) {
    throw { message: isEmailValid.message, status: 400 };
  }

  await connectDB();
  const userFound = await User.findOne({email: credentials?.email}).select("+password");

  if (!userFound) throw {message: languageSelected.userNotExist, status: 409};

  const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password);

  if (!passwordMatch) throw {message: languageSelected.badPassword, status: 401};

  const userId = userFound._id
  const userName = userFound.fullname

  return { status: 200, message: languageSelected.authSuccess, data: {userId, userName} };
}
