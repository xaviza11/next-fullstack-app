
import { connectDB } from "@/libs/mongodb";
import {Users, FlightRoutes} from '@/models/index';
import bcrypt from "bcryptjs";
import { validateEmail, validatePassword, validateName } from '@/app/utils/regex';
import routerLanguage from '../../utils/routerLanguage'
import {validateFullRoute} from '@/app/utils/regex'
import { ObjectId, models } from "mongoose";
 
export async function deleteFlightRoute({userId, flightRouteId, language }: {userId: string, flightRouteId: ObjectId, language: string}) {
  await connectDB();

  const languageSelected = await routerLanguage(language);
  if (languageSelected === undefined) throw { message: "fatal language error", status: 500 };

  const user = await Users.findById(userId)

  if(!user) throw {message: languageSelected.userNotExist, status: 400}

  await FlightRoutes.findByIdAndDelete(flightRouteId)

  return {
    status: 200,
    message: languageSelected?.fullRouteCreated
  };
}
