import { getCustomRepository } from "typeorm";
import { UsersRespositories } from "../repositories/UsersRespositories";
import {hash} from "bcryptjs"

interface IUserRequest{
    name: string,
    email: string,
    admin?: boolean,
    password: string
}

export class CreateUserService{
    async execute({name, email, admin = false, password} : IUserRequest){
        const usersRespositories = getCustomRepository(UsersRespositories);

        if (!email){
            throw new Error("Email incorrect")
        }

        const userAlreadyCreated = await usersRespositories.findOne({email});
        
        if (userAlreadyCreated){
            throw new Error("User already created")
        }
        const passwordHash = await hash(password, 8);
        const user = usersRespositories.create({name, email, admin, password: passwordHash});

        await usersRespositories.save(user);

        return user;
    }
}