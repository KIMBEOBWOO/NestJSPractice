import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    user_index: number;

    @Column({ length: 20, unique: true , default: ''})
    id: string;

    @Column({ length: 20 , default: ''})
    pw: string;

    @Column({ length: 20 , default: 'user'})
    roles: string;
    
}