import { Question } from '../../questions/entities/question.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  question: Question;

  @ManyToOne(() => User, (user: User) => user.answers, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
