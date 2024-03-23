
import { signupService } from './service';

export async function POST(request: Request) {
  try {
    const { fullname, email, password, language } = await request.json();
    const result = await signupService({ fullname, email, password, language });
    return new Response(JSON.stringify(result.data), { status: result.status, headers: { 'Content-Type': 'application/json' } });

  } catch (error:any) {
    return new Response(JSON.stringify({ message: error.message }), { status: error.status || 500, headers: { 'Content-Type': 'application/json' } });
  }
}
