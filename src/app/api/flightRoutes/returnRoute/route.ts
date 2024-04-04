import { returnRoute } from './service';
import jwtVerifier from '../../utils/jwtVerifier';

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get('Cookie');

    if (!cookieHeader || !cookieHeader.includes('token')) {
      return new Response(JSON.stringify({ message: "Not logged in" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const tokenCookie = cookieHeader.split(';').find(c => c.trim().startsWith('token='));

    if (!tokenCookie) {
      return new Response(JSON.stringify({ message: "Token not found in cookie" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const {userId, language} = jwtVerifier(tokenCookie)
    const { flightRouteId } = await request.json();

    if(typeof userId !== 'string') return new Response(JSON.stringify({ message: 'error on jwt' }))
    if(typeof language !== 'string') return new Response(JSON.stringify({ message: 'error on jwt' }))

    const result = await returnRoute({flightRouteId, language });
    return new Response(JSON.stringify(result.data), { status: result.status, headers: { 'Content-Type': 'application/json' } });
  } catch (error:any) {
    return new Response(JSON.stringify({ message: error.message }), { status: error.status || 500, headers: { 'Content-Type': 'application/json' } });
  }
}
