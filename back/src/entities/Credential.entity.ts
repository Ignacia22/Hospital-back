import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"



@Entity("credentials")
export class Credential {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 100,unique: true, nullable: false})
    username: string

    @Column({type: "varchar", length: 100, nullable: false})
    password: string

    @CreateDateColumn({})
    createdAT?: number

    @UpdateDateColumn({})
    updateAT?: number

    
}



