import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnswersService } from './answers.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto } from '@/answers/dto/create-answer.dto';

@ApiTags('answers')
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all answers' })
  @ApiResponse({
    status: 200,
    description: 'Return all answers',
    type: [Answer],
  })
  findAll(): Promise<Answer[]> {
    return this.answersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an answer by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return an answer by ID',
    type: Answer,
  })
  @ApiResponse({ status: 404, description: 'Answer not found' })
  findOne(@Param('id') id: string): Promise<Answer | null> {
    return this.answersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create an answer' })
  @ApiResponse({
    status: 201,
    description: 'Answer created successfully',
    type: Answer,
  })
  create(@Body() createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.answersService.create(createAnswerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an answer' })
  @ApiResponse({
    status: 200,
    description: 'Answer deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Answer not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.answersService.remove(id);
  }
}
