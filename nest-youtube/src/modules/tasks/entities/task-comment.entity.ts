import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TaskComments' })
export class TaskCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;
}
