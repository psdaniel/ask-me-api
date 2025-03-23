import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Answer } from '../../answers/entities/answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @OneToMany(() => Answer, (answer: Answer) => answer.question, {
    cascade: true,
    nullable: true,
  })
  answers: Answer[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
