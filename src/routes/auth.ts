import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { connection } from "../dbConnection";

const auth = Router();

const getUserByEmail = (email: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM users where email='${email}' LIMIT 1`,
      (err, [user]) => {
        if (err) return reject(err);
        resolve(user);
      }
    );
  });
};

auth.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Invalid Email"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      return res.send({
        user,
        token: "super_secret_token"
      });
    }

    return res.status(403).send({
      message: "Invalid Credentials"
    });
  }
);

export default auth;
