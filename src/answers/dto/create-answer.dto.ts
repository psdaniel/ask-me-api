import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({
    example: 'This is a test answer',
    description: 'The content of the answer',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the user who created the answer',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the question that the answer belongs to',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  questionId?: string;
}
