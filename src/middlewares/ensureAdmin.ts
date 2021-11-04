import {Request, Response, NextFunction} from "express";
import { getCustomRepository } from "typeorm";
import { UsersRespositories } from "../repositories/UsersRespositories";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction){
    
    const {user_id} = request;
    console.log(user_id);

    const usersRespositories = getCustomRepository(UsersRespositories);
    
    const {admin} = await usersRespositories.findOne(user_id)


    if(admin){
        return next();
    }
    return response.status(401).json({error: "Unauthorized"});
}
