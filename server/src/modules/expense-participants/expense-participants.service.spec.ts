import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseParticipantsService } from './expense-participants.service';

describe('ExpenseParticipantsService', () => {
  let service: ExpenseParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseParticipantsService],
    }).compile();

    service = module.get<ExpenseParticipantsService>(
      ExpenseParticipantsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
