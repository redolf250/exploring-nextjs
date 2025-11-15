import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 255, default: null})
  name: string
}