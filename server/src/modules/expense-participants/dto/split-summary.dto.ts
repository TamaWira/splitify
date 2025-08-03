// dto/split-summary.dto.ts
export class SplitSummaryDto {
  participantId: string;
  participantName: string;
  category: 'owes' | 'gets';
  amount: number;
}
