import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('uesr')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'service_agreed' })
  serviceAgreed: boolean;
}
