import express, {Request, Response} from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";
const router = express.Router();

router.post("/login", 
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password with 6 or more characters required").isLength({min: 6})
    ],
    async (req: Request, res: Response) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ errors: errorMessages });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email: req.body.email});

            if(!user) {
                return res.status(400).json({message: "Invalid Credentials"});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return res.status(400).json({message: "Invalid Credentials"});
            }

            const token = jwt.sign({userId : user.id}, process.env.JWT_SECRET_KEY as string, {expiresIn: "1d"});

            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 8640000
            });

            res.status(200).json({userId: user._id});

        } catch (err) {

        }
    }
)

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    res.status(200).send({userId: req.userId})
});

router.post("/logout", (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
        expires: new Date(0)
    });
    res.send();
});

export default router;