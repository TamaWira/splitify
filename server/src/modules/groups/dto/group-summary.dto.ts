import { ApiProperty } from '@nestjs/swagger';

export class GroupSummaryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  participantsCount: number;

  @ApiProperty()
  expensesCount: number;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  unsettledAmount: number;

  @ApiProperty()
  isFullySettled: boolean;
}
