import { getCustomRepository } from "typeorm";
import { UsersRespositories } from "../repositories/UsersRespositories";

interface IUserRequest{
    name: string,
    email: string,
    admin?: boolean
}

export class CreateUserService{
    async execute({name, email, admin} : IUserRequest){
        const usersRespositories = getCustomRepository(UsersRespositories);

        if (!email){
            throw new Error("Email incorrect")
        }

        const userAlreadyCreated = await usersRespositories.findOne({email});
        
        if (userAlreadyCreated){
            throw new Error("User already created")
        }

        const user = usersRespositories.create({name, email, admin});

        await usersRespositories.save(user);

        return user;
    }
}