import { connectDB } from "@/libs/mongodb";
import { FlightRoutes } from '@/models/index';
import routerLanguage from '../../utils/routerLanguage';

export async function randomRoute({ language }: { language: string }) {
  await connectDB();

  const languageSelected = await routerLanguage(language);
  if (languageSelected === undefined) {
    throw { message: "Fatal language error", status: 500 };
  }

    const randomRoute = await FlightRoutes.aggregate([
      { $match: {isPublic: true } }, 
      { $sample: { size: 1 } } 
    ]);

    if (randomRoute.length === 0) {
      throw { message: "No public routes found", status: 404 };
    }

    return {
      status: 200,
      message: languageSelected?.routesFound,
      data: {route: randomRoute[0]}
    };
}
