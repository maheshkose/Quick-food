export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role === "Admin" ? "AdminToken" : "ClientToken";

  const userSafe = {
    name: user.name,
    email: user.email,
    role: user.role,
  };
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPRIRE) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      // secure: true,
      // sameSite: "None",
      // httpOnly: false,
      secure: false, // for local development
      sameSite: "Lax", // or "None" if cross-site
    })
    .json({
      success: true,
      message,
      user: userSafe,
      token,
    });
};
