import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db"; // Adjust the path accordingly
import { User } from "@/models/user.model.js";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();
    const { token } = reqBody;

    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid Token!!",
        },
        {
          status: 400,
        }
      );
    }
    console.log(user);

    user.isVerfied = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    /* 
    
    null: Explicitly sets the field to null. This will result in the field being stored in the database with a null value.
undefined: Removes the field from the document. If you set a field to undefined, Mongoose will not include that field in the update operation, effectively removing it from the document in the database.

    */

    await user.save({ validateBeforeSave: false });

    return NextResponse.json(
      {
        message: "email verififes successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log("error from verify email....");
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
