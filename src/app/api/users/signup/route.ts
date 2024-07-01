import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db"; // Adjust the path accordingly
import { User } from "@/models/user.model.js"; // Adjust the path accordingly
import bcrypt from "bcrypt";
import { SendMail } from "@/helpers/mailer"; // Adjust the path accordingly

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();
    console.log(reqBody);
    const { username, email, password } = reqBody;

    if ([username, email, password].some((it) => !it || it.trim() === "")) {

      return NextResponse.json(
        {
          message: "all fileds are required...",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "user already exisit....",
        },
        {
          status: 400,
        }
      );
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(user);

    await SendMail({ email, emailType: "VERIFY", userId: user._id });

    return NextResponse.json(
      {
        data: user,
        message: "User registered successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error("Error during user registration:", error.message);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
