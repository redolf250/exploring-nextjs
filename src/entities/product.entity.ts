import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("products")
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 10, unique: true, nullable: false, update: false })
  skuCode: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  productName: string;

  @Column({ type: "int", nullable: false })
  quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false})
  unitPrice: number;
}