import bcrypt from 'bcrypt';

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
