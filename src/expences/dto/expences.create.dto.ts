import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, Min } from 'class-validator';

export default class ExpencesCreateDto {
  @ApiProperty({ description: 'group id' })
  @IsUUID()
  groupId: string;

  @ApiProperty({ description: 'paid by' })
  @IsString()
  paidBy: string;

  @ApiProperty({ description: 'amount' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ description: 'description' })
  @IsString()
  desc: string;
}
