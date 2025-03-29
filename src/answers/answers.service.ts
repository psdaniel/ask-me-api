import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Question } from '@/questions/entities/question.entity';
import { User } from '@/users/entities/user.entity';
@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<Answer[]> {
    return this.answersRepository.find();
  }

  findOne(id: string): Promise<Answer | null> {
    return this.answersRepository.findOneBy({ id });
  }

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const user = await this.usersRepository.findOneBy({
      id: createAnswerDto.userId,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const dto = {
      ...createAnswerDto,
      user,
    };

    const answer = this.answersRepository.create(dto);

    if (createAnswerDto.questionId) {
      const question = await this.questionsRepository.findOneBy({
        id: createAnswerDto.questionId,
      });

      if (!question) {
        throw new NotFoundException('Question not found');
      }

      answer.question = question;
    }

    return this.answersRepository.save(answer);
  }

  async remove(id: string): Promise<void> {
    await this.answersRepository.delete(id);
  }
}
