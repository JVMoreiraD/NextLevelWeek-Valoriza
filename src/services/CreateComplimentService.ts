import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRespositories } from "../repositories/UsersRespositories";

interface IComplimentRequest{
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

export class CreateComplimentService{
    async execute({tag_id, user_sender, user_receiver, message}: IComplimentRequest){
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRespositories = getCustomRepository(UsersRespositories);

        const userReceiverExists = await usersRespositories.findOne(user_receiver);

        if (user_sender === user_receiver){
            throw new Error("Incorrect User receiver")
        }

        if (!userReceiverExists){
            throw new Error("User receiver not found")
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
          });

          await complimentsRepositories.save(compliment);

          return compliment;
    }
}