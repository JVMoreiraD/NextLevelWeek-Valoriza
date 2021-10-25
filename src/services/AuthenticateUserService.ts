import { getCustomRepository } from "typeorm";
import { UsersRespositories } from "../repositories/UsersRespositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticationRequest{ 
    email: string;
    password: string;
}

export class AuthenticateUserService{
    async execute({email, password}: IAuthenticationRequest){
        const usersRespositories = getCustomRepository(UsersRespositories);

        const user = await usersRespositories.findOne({email});

        if (!user){
            throw new Error("Email or password is incorrect");
        }
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch){
            throw new Error("Email or password is incorrect");
        }

        const token = sign(
            {email: user.email},
            "ff0c0bac15ee02bf21eb6ed4470a9fac",{
            subject: user.id, 
            expiresIn: "1d"    
            })

        return token;

    }
}