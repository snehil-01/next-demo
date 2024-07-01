import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db"; // Adjust the path accordingly
import { User } from "@/models/user.model.js";
import { getDataFromToken } from "@/helpers/getDataFromToken";

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

    return NextResponse.json({
      mesaaage: "User found",
      data: user,
    });
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
