import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function GET(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json({
      message: "Not logged in",
    }, {
      status: 401,
    })
  }

  try {
    cookieStore.delete("token");

    const response = NextResponse.json(
      {},
      {
        status: 200,
      }
    );

    return response;
  } catch (error:any) {
    return NextResponse.json(error.message, {
      status: 500,
    });
  }
}