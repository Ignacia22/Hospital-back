import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Credential } from "./Credential.entity"
import { Appointment } from "./Appointment.entity"



@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 70, nullable: false})
    name: string

    @Column({type: "varchar", length: 80, unique: true, nullable: false})
    email: string

    @Column({type: "date", nullable: false})
    birthdate: Date

    @Column({type: "integer", nullable: false, unique: true})
    nDni: number

    @CreateDateColumn({})
    createdAT?: number

    @UpdateDateColumn({})
    updateAT?: number

    @OneToOne(() => Credential, {cascade: true})
    @JoinColumn()
    credential: Credential

    @OneToMany(() => Appointment, (appointment: Appointment) => appointment.user)
    appointments: Appointment[];
}
