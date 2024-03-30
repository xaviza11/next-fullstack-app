import { newRoute } from './service';
import jwtVerifier from '../../utils/jwtVerifier';

export async function POST(request: Request) {
  try {
    jwtVerifier(request)
    const {departure, arrival, fullRoute, placeMarks, owner, airCraft, isPublic, language } = await request.json();
    const result = await newRoute({ departure, arrival, fullRoute, placeMarks, owner, airCraft, isPublic, language });
    return new Response(JSON.stringify({message: result.message}), { status: result.status, headers: { 'Content-Type': 'application/json' } });
  } catch (error:any) {
    return new Response(JSON.stringify({ message: error.message }), { status: error.status || 500, headers: { 'Content-Type': 'application/json' } });
  }
}
