
import { connectDB } from "@/libs/mongodb";
import { Users, FlightRoutes } from '@/models/index';
import bcrypt from "bcryptjs";
import { validateEmail, validatePassword, validateName } from '@/app/utils/regex';
import routerLanguage from '../../utils/routerLanguage'
import { validateFullRoute, validateCoordinates } from '@/app/utils/regex'
import { models } from "mongoose";

export async function newRoute({ departure, arrival, fullRoute, placeMarks, userId, airCraft, isPublic, language }: { departure: string, arrival: string, fullRoute: string, placeMarks: { [key: string]: string }, userId: string, airCraft: string, isPublic: boolean, language: string }) {
  await connectDB();

  const languageSelected = await routerLanguage(language);
  if (languageSelected === undefined) throw { message: "Fatal language error", status: 500 };

  const user = await Users.findById(userId)

  if (!user) throw { message: languageSelected.userNotExist, status: 400 }

  const isValidFullRoute = validateFullRoute(fullRoute, languageSelected)

  function validateCoordinatesObject(coordinatesObj:{ [key: string]: string }): boolean {
    for (let key in coordinatesObj) {
      const coordinate = key; 
      const isCoordinateValid = validateCoordinates(coordinate);
      if (!isCoordinateValid) {
        return false;
      }
    }
    return true;
  }
  const areCoordinatesValid = validateCoordinatesObject(placeMarks)

  if (!areCoordinatesValid) throw {message: languageSelected.invalidCoordinates, status: 400}

  if (!isValidFullRoute.success) throw { message: isValidFullRoute.message, status: 400 }

  const flightRoute = await FlightRoutes.create({ departure, arrival, fullRoute, placeMarks, owner: { id: userId, name: user.name }, airCraft, isPublic })

  return {
    status: 200,
    message: languageSelected?.fullRouteCreated,
    data: { id: flightRoute._id }
  };
}
