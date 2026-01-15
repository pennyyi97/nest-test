import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('taskcomments')
export class TaskCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;
}
