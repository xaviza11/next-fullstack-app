import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { validateEmail, validatePassword } from '@/app/utils/regex';
import routerLanguage from '../../utils/routerLanguage'

export async function deleteUser({ email, password, language }: { email: string, password: string, language: string }) {
  await connectDB();

  const languageSelected = await routerLanguage(language);
  if (languageSelected === undefined) throw { message: "Fatal language error", status: 500 };

  const isEmailValid = validateEmail(email, languageSelected);
  const isPasswordValid = validatePassword(password, languageSelected);

  if (!isEmailValid.success) {
    throw { message: isEmailValid.message, status: 400 };
  }

  if (!isPasswordValid.success) {
    throw { message: isPasswordValid.message, status: 400 };
  }

  const userFound = await User.findOne({ email });
  if (!userFound) {
    throw { message: languageSelected?.userNotExist, status: 404 };
  }
  const passwordMach = await bcrypt.compare(password, userFound.password);
  if (!passwordMach) {
    throw { message: languageSelected?.wrongPassword, status: 401 };
  }

  await User.deleteOne({ _id: userFound._id });

  return {
    status: 200,
    message: languageSelected?.userDeletedSuccessfully
  };
}
