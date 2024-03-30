import { deleteUser } from './service';
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

    const token = tokenCookie.split('=')[1];

    if (!token) {
      return new Response(JSON.stringify({ message: "Invalid token value" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const userId = jwtVerifier(token);

    if(typeof userId !== 'string') return new Response(JSON.stringify({ message: 'error on jwt' }))

    const { password, language } = await request.json();

    const result = await deleteUser({userId, password, language});

    return new Response(JSON.stringify({ message: result.message }), {
      status: result.status,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error: any) {
    if (error.message === "invalid token") {
      return new Response(JSON.stringify({ message: error.message }), {
        status: error.status || 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status || 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
