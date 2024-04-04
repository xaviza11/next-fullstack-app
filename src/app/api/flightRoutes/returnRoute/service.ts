import { connectDB } from "@/libs/mongodb";
import { FlightRoutes } from '@/models/index';
import routerLanguage from '../../utils/routerLanguage';

export async function returnRoute({ flightRouteId, language }: { flightRouteId: string, language: string }) {
  await connectDB();

  const languageSelected = await routerLanguage(language);
  if (languageSelected === undefined) {
    throw { message: "Fatal language error", status: 500 };
  }

    const route = await FlightRoutes.findById(flightRouteId)

    if (!route) {
      throw { message: languageSelected.notRoutesFound, status: 404 };
    }

    return {
      status: 200,
      message: languageSelected?.routesFound,
      data: {route}
    };
}
