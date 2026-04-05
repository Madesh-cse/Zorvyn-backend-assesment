import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
    // 1 minute
    windowMs:  60 * 1000,
    // limit each IP to 30 requests per windowMs 
    max: 4,   
    message: {
        message:"Too many requests from this IP, please try again after 1 minute"
    },
    standardHeaders: true, 
    legacyHeaders: false, 
})