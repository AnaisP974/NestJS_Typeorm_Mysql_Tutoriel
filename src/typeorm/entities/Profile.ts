import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user_profiles' })
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    dob: string;
}