import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db"; // Adjust the path accordingly
import { User } from "@/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();

    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          error: "email is not registered....",
        },
        {
          status: 400,
        }
      );
    }
    if(!user.isVerfied){
      return NextResponse.json(
        {
          error: "verify your mail....",
        },
        {
          status: 400,
        }
      );
    }
    
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return NextResponse.json(
        {
          error: "invalid password...",
        },
        {
          status: 400,
        }
      );
    }
    const tokenData = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    console.log(token);

    const response = NextResponse.json(
      {
        message: "user logged in...",
        success: true,
      },
      {
        status: 200,
      }
    );

    response.cookies.set("token", token, {
      httpOnly: true, // can be only accessedby server. ie frontend ki js isko acess nahi kr skti
    });

    return response;
  } catch (error: any) {
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
