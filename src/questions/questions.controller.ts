import { Controller, Get, Param } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  findAll(): Promise<Question[]> {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Question | null> {
    return this.questionsService.findOne(id);
  }
}
