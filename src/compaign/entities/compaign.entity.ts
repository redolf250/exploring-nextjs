import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("tbl_compaigns")
export class Compaign {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, default: null})
  name: string;

  @Column({ type: "varchar", length: 255, default: null})
  question: string;

  @Column({ type: "varchar", length: 255, default: null})
  phoneList: string
}