import { User } from "@/models/user.model";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";


const options = {
  host: process.env.MAIL_TRAP_HOST! ,
  port: Number(process.env.MAIL_TRAP_PORT),
  auth: {
  user: process.env.MAIL_TRAP_USER!,
  pass: process.env.MAIL_TRAP_PASS!,
  },
  }

const transporter = nodemailer.createTransport(options);

export const SendMail = async ({ email, emailType, userId }: any) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedToken = await bcrypt.hash(String(userId), salt);
    const tokenExpiry = Date.now() + 3600 * 1000; // 1hr

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600 * 1000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600 * 1000, // 1 hour
      });
    }

    const info = await transporter.sendMail({
      from: "visputesnehil2002@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    });

    return info;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
