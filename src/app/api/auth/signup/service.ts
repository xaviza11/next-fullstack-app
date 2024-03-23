import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { validateEmail, validatePassword, validateName } from '@/app/utils/regex';
import routerLanguage from '../../utils/routerLanguage'

export async function signupService({ fullname, email, password, language }: { fullname: string, email: string, password: string, language: string }) {
  await connectDB();

  const languageSelected = await routerLanguage(language)
  if (languageSelected === undefined) throw {message: "fatal language error", status: 500 }

  const isPasswordValid = validatePassword(password, languageSelected);
  const isEmailValid = validateEmail(email, languageSelected);
  const isValidName = validateName(fullname, languageSelected)

  if (!isValidName.success) {
    throw { message: isValidName.message, status: 400 };
  }

  if (!isPasswordValid.success) {
    throw { message: isPasswordValid.message, status: 400 };
  }

  if (!isEmailValid.success) {
    throw { message: isEmailValid.message, status: 400 };
  }

  const userFound = await User.findOne({ email });
  if (userFound) {
    throw { message: languageSelected?.backUserAlreadyExist, status: 409 };
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({ fullname, email, password: hashedPassword });
  const savedUser = await user.save();

  return {
    status: 201,
    data: { fullname, email, createdAt: savedUser.createdAt, updatedAt: savedUser.updatedAt },
    message: languageSelected?.backUserRegister
  };
}
