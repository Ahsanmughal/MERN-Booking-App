import express, {Request, Response} from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post(
    "/register", 
    [
        check("firstName", "First Name is required").isString().notEmpty(),
        check("lastName", "Last Name is required").isString().notEmpty(),
        check("email", "Email is required").isEmail(),
        check("password", "Password with 6 or more characters required").isLength({
          min: 6,
        }),
    ], async(req: Request, res: Response) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ errors: errorMessages });
        }

        try {
            let user = await User.findOne({ email: req.body.email});
            
            if(user) {
                return res.status(400).json({message: "User already exist"});
            }

            user = new User(req.body);

            await user.save();
            
            const token = jwt.sign({userId : user.id}, process.env.JWT_SECRET_KEY as string, {expiresIn: "1d"});

            res.cookie("auth_token", token, {httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 86400000});

            return res.status(200).json({ message: "User registered successfully" });
        } catch (error) {
            console.log('err', error);
            res.status(500).send({message: "Something went wrong."})
        }
    }
);

export default router;