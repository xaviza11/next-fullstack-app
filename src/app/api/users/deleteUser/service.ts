import { connectDB } from "@/libs/mongodb";
import {Users} from '@/models/index';
import bcrypt from "bcryptjs";
import { validateEmail, validatePassword } from '@/app/utils/regex';
import routerLanguage from '../../utils/routerLanguage'

export async function deleteUser({ userId, password, language }: { userId: string, password: string, language: string }) {
  await connectDB();

  const languageSelected = await routerLanguage(language);
  if (languageSelected === undefined) throw { message: "Fatal language error", status: 500 };

  const isPasswordValid = validatePassword(password, languageSelected);

  if (!isPasswordValid.success) {
    throw { message: isPasswordValid.message, status: 400 };
  }

  const userFound = await Users.findById(userId);

  if (!userFound) {
    throw { message: languageSelected?.userNotExist, status: 404 };
  }

  const passwordMach = await bcrypt.compare(password, userFound.password);
  if (!passwordMach) {
    throw { message: languageSelected?.badPassword, status: 401 };
  }

  await Users.deleteOne({ _id: userFound._id });

  return {
    status: 200,
    message: languageSelected?.userDeletedSuccessfully
  };
}
