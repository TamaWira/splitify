import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseParticipantsController } from './expense-participants.controller';
import { ExpenseParticipantsService } from './expense-participants.service';

describe('ExpenseParticipantsController', () => {
  let controller: ExpenseParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseParticipantsController],
      providers: [ExpenseParticipantsService],
    }).compile();

    controller = module.get<ExpenseParticipantsController>(
      ExpenseParticipantsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
