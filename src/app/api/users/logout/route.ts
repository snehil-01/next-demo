import { connectDB } from "@/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const _id = getDataFromToken(request);
    const user = await User.findById(_id).select("-password ");

    if (!user) {
      return NextResponse.json(
        {
          error: "invalid id in token...",
          success: false,
        },
        {
          status: 400,
        }
      );
    }
    
    const response = NextResponse.json(
      {
        message: "user logged out succesfully",
        success: true,
      },
      {
        status: 200,
      }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), //Setting the expires property to new Date(0) effectively sets the cookie to expire immediately, as new Date(0) represents the epoch time (January 1, 1970). This is commonly used to delete a cookie
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
