import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto implements Partial<CreateUserDto> {
  [key: string]: any;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'The name of the user',
  })
  name?: string;

  @ApiPropertyOptional({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  email?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the user is active',
  })
  isActive?: boolean;
}
