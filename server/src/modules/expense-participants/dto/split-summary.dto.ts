import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

export class SplitSummaryDto {
  @ApiProperty()
  @IsUUID()
  participantId: string;

  @ApiProperty()
  @IsString()
  participantName: string;

  @ApiProperty()
  @IsEnum(['owes', 'gets'])
  category: 'owes' | 'gets';

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  amount: number;
}
