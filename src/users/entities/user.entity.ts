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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: 'uuid-value',
    description: 'The unique identifier for a user',
  })
  id: string;

  @Column({ length: 100 })
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  password: string;

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
