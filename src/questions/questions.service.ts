import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  findAll(): Promise<Question[]> {
    return this.questionsRepository.find();
  }

  findOne(id: string): Promise<Question | null> {
    return this.questionsRepository.findOneBy({ id });
  }
}
