import { getCustomRepository } from "typeorm";
import { UsersRespositories } from "../repositories/UsersRespositories";
import {classToPlain} from "class-transformer";

export class ListUsersService{
    async execute(){
        const usersRespositories = getCustomRepository(UsersRespositories);
        const users = await usersRespositories.find();

        return classToPlain(users);
    }
}