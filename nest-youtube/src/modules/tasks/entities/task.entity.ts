import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  //uuid로 설정
  //   @PrimaryGeneratedColumn('uuid')
  //   id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  category: number;

  @Column()
  username: string;

  @CreateDateColumn({ name: 'create_dt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_dt' })
  updatedAt: Date;
}
