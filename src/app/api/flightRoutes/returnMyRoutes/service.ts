
import { connectDB } from "@/libs/mongodb";
import { Users, FlightRoutes } from '@/models/index';
import bcrypt from "bcryptjs";
import { validateEmail, validatePassword, validateName } from '@/app/utils/regex';
import routerLanguage from '../../utils/routerLanguage'
import { validateFullRoute, validateCoordinates } from '@/app/utils/regex'
import { models } from "mongoose";

export async function returnMyRoutes({ userId, language }: { userId: string, language: string }) {
  await connectDB();

  const languageSelected = await routerLanguage(language);
  if (languageSelected === undefined) throw { message: "Fatal language error", status: 500 };

  const routesFound = await FlightRoutes.find({ "owner.id": userId }).select('id departure arrival votes');

  return {
    status: 200,
    message: languageSelected?.routesFound,
    data: {routesFound}
  };
}
