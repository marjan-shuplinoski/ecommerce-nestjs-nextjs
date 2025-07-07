import { IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserStatus } from '../schemas/user.schema';

export class UpdateUserStatusDto {
  @ApiProperty({ enum: UserStatus, description: 'New user status' })
  @IsEnum(UserStatus)
  status!: UserStatus;

  @ApiPropertyOptional({ description: 'Whether user account is active' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
