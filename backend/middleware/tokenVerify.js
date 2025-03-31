import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

const tokenVerify = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

      const refreshToken = await prisma.refreshToken.findUnique({
        where: { token },
      });

      if (refreshToken && payload.id === refreshToken.userId) {
        req.user = { id: payload.id };
        next();
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    } catch (err) {
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export { tokenVerify };