import { NextFunction, Request, Response } from "express"

export const AuthorizedRoles = (...roles: string[])=>{
    return (req:Request, res: Response, next: NextFunction)=>{
        const userRole = (req as any).user.role;
        if(!userRole){
            return res.status(401).json({
                message:"Role Header is required"
            })
        }
        if(!roles.includes(userRole)){
            return res.status(403).json({
                message:"Access Denied"
            })
        }
        next()
    }
}