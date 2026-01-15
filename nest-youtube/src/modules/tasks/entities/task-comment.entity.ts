import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'taskComments' })
export class TaskCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;
}
