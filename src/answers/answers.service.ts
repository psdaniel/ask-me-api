import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
  ) {}

  findAll(): Promise<Answer[]> {
    return this.answersRepository.find();
  }

  findOne(id: string): Promise<Answer | null> {
    return this.answersRepository.findOneBy({ id });
  }

  create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const answer = this.answersRepository.create(createAnswerDto);
    return this.answersRepository.save(answer);
  }

  async remove(id: string): Promise<void> {
    await this.answersRepository.delete(id);
  }
}
