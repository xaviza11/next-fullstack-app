import { authenticate } from './service';
import jwt from 'jsonwebtoken';
const { JWT_EXPIRATION, JWT_SECRET } = process.env;

export async function POST(request: Request) {
  try {
    const { email, password, language } = await request.json();
    const result = await authenticate({ email, password, language });

    if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined in environment variables.');

    const secretKey = JWT_SECRET;
    const tokenPayload = { sub: result?.data?.userId.toString(), name: result?.data?.userName, language: result?.data?.language };
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: JWT_EXPIRATION });
    const responseData = {
      res: 'success',
      token: token
    };

    let response = new Response(JSON.stringify(responseData), {
      status: result.status,
      headers: { 'Content-Type': 'application/json' }
    });

    const oneWeekFromNow = new Date(new Date().getTime() + (604800 * 1000)).toUTCString();
    const cookieValue = `token=${token}; Path=/; SameSite=Strict Expires=${oneWeekFromNow}`;
    response.headers.append('Set-Cookie', cookieValue);

 if(result.status === 200 || result.status === 201) return response
    else return new Response(JSON.stringify({ message: result.message }), { status: result.status || 500, headers: { 'Content-Type': 'application/json' } });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.status || 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

