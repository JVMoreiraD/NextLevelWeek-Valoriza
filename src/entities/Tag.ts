import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

import {Expose} from "class-transformer"

import { v4 as uuid } from "uuid";

@Entity("tags")
export class Tag{
    @PrimaryColumn()
    readonly id: String;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
    
    @Expose({name: "nameCustom"})
    nameCustom(): string {
        return `#${this.name}`;
    }

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}