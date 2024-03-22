import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { validateEmail, validatePassword, validateName } from '@/app/utils/regex';

export async function signupService({ fullname, email, password }: { fullname: string, email: string, password: string }) {
  await connectDB();

  const isPasswordValid = validatePassword(password);
  const isEmailValid = validateEmail(email);
  const isValidName = validateName(fullname)

  if (!isValidName.success) {
    throw { message: isValidName.message, status: 400 };
  }

  if (!isPasswordValid.success) {
    throw { message: isPasswordValid.message, status: 400 };
  }

  if (!isEmailValid.success) {
    throw { message: isEmailValid.message, status: 400 };
  }

  const userFound = await User.findOne({ email });
  if (userFound) {
    throw { message: "Email already exists", status: 409 };
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({ fullname, email, password: hashedPassword });
  const savedUser = await user.save();

  return {
    status: 201,
    data: { fullname, email, createdAt: savedUser.createdAt, updatedAt: savedUser.updatedAt },
    message: 'User registered successfully'
  };
}
