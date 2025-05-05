import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from "../interface/IAppointment";
import { User } from "./User.entity";


@Entity("appointments")
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "date", nullable: false})
    date: Date

    @Column({type: "varchar",length: 5, nullable: false})
    time: string


    @Column({type: "varchar", length: 10, nullable: false, default: Status.Active})
    status: Status


    @ManyToOne(() => User, (user: User) => user.appointments, {nullable: false})
    @JoinColumn()
    user: User


    @CreateDateColumn({})
    createdAT?: number

    @UpdateDateColumn({})
    updateAT?: number

}