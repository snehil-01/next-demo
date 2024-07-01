const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "username is required..."],
      unique: true,
    },
    email: {
      type: String,
      require: [true, "email is required..."],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "password is required..."],
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
  },
  {
    timestamps: true,
  }
);

export const User =
  mongoose.models.users || mongoose.model("users", userSchema); //Hot-Reloading: During development, Next.js supports hot-reloading. This means your files can be re-executed multiple times without restarting the entire application. This is great for rapid development but can lead to issues with things like model definitions.
