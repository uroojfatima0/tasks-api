import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique Task ID' })
  id: string;

  @ApiProperty({ example: 'Complete NestJS project', description: 'Task title' })
  title: string;

  @ApiProperty({ example: 'Develop all modules and test them', description: 'Task description' })
  description: string;

  @ApiProperty({ example: false, description: 'Task completion status' })
  completed: boolean;
}
