import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password',
    example: 'oldPassword123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  currentPassword!: string;

  @ApiProperty({
    description: 'New password',
    example: 'newPassword456',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  newPassword!: string;
}
