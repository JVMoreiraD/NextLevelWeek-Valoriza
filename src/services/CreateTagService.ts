import { getCustomRepository } from "typeorm";
import { TagRepository } from "../repositories/TagsRepositories";

export class CreateTagService{
    async execute(name: string){
        const tagsRepositories = getCustomRepository(TagRepository);

        if (!name){
            throw new Error("Incorrect name provided!");
        }

        const tagAlreadyExists = await tagsRepositories.findOne({name});

        if (tagAlreadyExists){
            throw new Error("Tag already exists");
        }

        const tag = tagsRepositories.create({name});

        await tagsRepositories.save(tag);

        return tag;
    }
}