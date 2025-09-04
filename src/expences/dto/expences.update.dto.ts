import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export default class ExpencesUpdateDto {
  @ApiProperty({ description: 'group id' })
  @IsUUID()
  groupId: string;

  @ApiProperty({ description: 'paid by' })
  @IsString()
  paidBy: string;

  @ApiProperty({ description: 'amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'description' })
  @IsString()
  desc: string;
}
