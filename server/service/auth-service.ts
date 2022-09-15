import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const encryptedPassword = async (pw: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(pw, salt);
  return hashedPw;
};

export const isPasswordCorrect = async (
  pw: string,
  encryptedPassword: string
) => {
  const isPasswordCorrect = await bcrypt.compare(pw, encryptedPassword);
  return isPasswordCorrect;
};

export const generateToken = async (email: string) => {
  const TOKEN_KEY = process.env.JWT_SECRET!;
  console.log(process.env.TOKEN_KEY);

  const token = jwt.sign({ email }, 'TOKEN_KEY', {
    expiresIn: '20h',
  });
  return { token: token };
};
