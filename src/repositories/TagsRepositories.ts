import { EntityRepository, Repository } from "typeorm";

import { Tag } from "../entities/Tags";

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {}
