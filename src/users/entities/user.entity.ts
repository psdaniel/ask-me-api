import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Answer } from '../../answers/entities/answer.entity';
import { Resource } from '../../resources/entities/resource.entity';

@Entity()
export class User {
  [x: string]: any;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Answer, (answer: Answer) => answer.user, {
    cascade: true,
    nullable: true,
  })
  answers: Answer[];

  @OneToMany(() => Resource, (resource: Resource) => resource.user, {
    cascade: true,
    nullable: true,
  })
  resources: Resource[];
}
