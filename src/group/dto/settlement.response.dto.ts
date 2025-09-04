import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SettlementResponseItemDto {
  @ApiProperty({ description: 'user name' })
  @IsString()
  user: string;

  @ApiProperty({ description: 'user' })
  @IsNumber()
  amount: number;
}

export default class SettlementResponseDto {
  @ApiProperty({ description: 'group id' })
  @IsUUID()
  groupId: string;

  @ApiProperty({ type: [SettlementResponseItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SettlementResponseItemDto)
  items: SettlementResponseItemDto[];

  @ApiProperty({ description: 'sum expences' })
  @IsNumber()
  sum: number;
}
