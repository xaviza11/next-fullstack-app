// route.ts

import { NextResponse } from "next/server";
import {signupService} from './service'

export async function POST(request: Request) {
  try {
    const { fullname, email, password } = await request.json();
    const result = await signupService({ fullname, email, password });

    return NextResponse.json(result.data, { status: result.status });
  } catch (error:any) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 });
  }
}
