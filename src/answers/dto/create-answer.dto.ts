import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty({
    example: 'This is a test answer',
    description: 'The content of the answer',
  })
  content: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the user who created the answer',
  })
  userId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the question that the answer belongs to',
    required: false,
  })
  questionId?: string;
}
