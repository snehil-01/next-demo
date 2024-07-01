import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message: "server(LESS) is up and running...",
      success: true,
    },
    {
      status: 200,
    }
  );
}
