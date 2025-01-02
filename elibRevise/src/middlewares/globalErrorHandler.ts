import {Request,Response,NextFunction} from 'express'
import { HttpError } from 'http-errors';

const globalErrorHandler = (error:HttpError,req:Request,res:Response,next:NextFunction) => {
    
    error.statusCode = error.statusCode || 500;

    res.status(error.statusCode).json({
        Error : error.message,
        Source : "Global Error Handler"
    })

}

export default globalErrorHandler;