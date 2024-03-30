
import { connectDB } from "@/libs/mongodb";
import CustomRoute from "@/models/user";
import bcrypt from "bcryptjs";
import { validateEmail, validatePassword, validateName } from '@/app/utils/regex';
import routerLanguage from '../../utils/routerLanguage'
import {validateFullRoute} from '@/app/utils/regex'
 
export async function newRoute({ departure, arrival, fullRoute, placeMarks, owner, airCraft, isPublic, language }: { departure: string, arrival: string, fullRoute: string, placeMarks: Map<string, string>, owner: {email: string, name: string, id: string}, airCraft: string, isPublic: boolean, language: string}) {
  await connectDB();

  const languageSelected = await routerLanguage(language);
  if (languageSelected === undefined) throw { message: "Fatal language error", status: 500 };

  const isValidFullRoute = validateFullRoute(fullRoute, languageSelected)
  const isValidEmail = validateEmail(owner.email, languageSelected)
  const isNameValid = validateName(owner.name, languageSelected)

  if(!isValidFullRoute.success) throw {message: isValidFullRoute.message, status: 400}
  if (!isValidEmail.success) throw { message: isValidEmail.message, status: 400 }
  if(!isNameValid.success) throw {message: isNameValid.message, status: 400}

  await CustomRoute.create({departure, arrival, fullRoute, placeMarks, owner, airCraft, isPublic})

  return {
    status: 200,
    message: languageSelected?.fullRouteCreated
  };
}
