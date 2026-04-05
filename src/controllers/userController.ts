import { NextFunction, Request, Response } from "express"
import User from "../models/user.model";
import bcrypt from "bcrypt";


// Post the user
export const CreateUser = async (req: Request,res: Response) => {
  try {
    const {
      name,
      email,
      password,
      role,
      status
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      status
    });

    res.status(201).json({
      message: "User created successfully",
      data: user
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Failed to create user",
      error: err.message
    });
  }
};

// Controller for GetUser
export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: "Users Fetched Successfully",
            data: users
        })
    }
    catch (err: any) {
        res.status(500).json({
            message: "Failed to fetch the data",
            err
        })
    }
}

// Controller for update the role or other data
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "Role updated successfully",
            data: user
        });
    }
    catch (err: any) {
        res.status(500).json({
            message: "Failed to update role",
            err
        });
    }
}

// Update user status
export const updateUserStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "Status updated successfully",
            data: user
        });
    }
    catch (err: any) {
        res.status(500).json({
            message: "Failed to update status",
            err
        });
    }
}

// Delete the user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User deleted successfully"
        });
    }
    catch (err: any) {
        res.status(500).json({
            message: "Failed to delete user",
            err
        });
    }
}