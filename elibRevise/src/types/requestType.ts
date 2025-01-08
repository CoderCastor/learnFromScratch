import { Request } from "express"

//extending Request with interface
export interface AuthRequest extends Request{
    userId:string;
}