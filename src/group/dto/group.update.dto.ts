import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export default class GroupUpdateDto {
  @ApiProperty({ description: 'group name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'description' })
  @IsString()
  @IsOptional()
  desc?: string;
}
