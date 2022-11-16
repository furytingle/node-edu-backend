import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 32 })
  password: string;

  @Column({ length: 255, nullable: true })
  first_name: string;

  @Column({ length: 255, nullable: true })
  last_name: string;
}
