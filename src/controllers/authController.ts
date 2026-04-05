import bcrypt from "bcrypt"
import User from "../models/user.model"
import { generateToken } from "../utils/generateToken"
import { NextFunction, Request, Response } from "express"

export const RegisterUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, role, status } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required"
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already existed"
            })
        }
        const hashedPwd = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            name,
            email,
            password: hashedPwd,
            role,
            status
        });

        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        });
    }
    catch (err: any) {
        res.status(500).json({
            message: "Internal server error",
            err
        });
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            message: "Email is not found"
        })
    }
    const isMatch = await bcrypt.compare(
        password,
        user.password
    );
    if(!isMatch){
        return res.status(401).json({
            message: "Invalid password"
        })
    }
    const token = generateToken( user._id.toString(), user.role);
    res.status(200).json({
        message: "Login successful",
        token
    });
} 