import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { Question } from '@/questions/entities/question.entity';
import { User } from '@/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Question, User])],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
