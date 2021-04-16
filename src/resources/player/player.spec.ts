import { Test, TestingModule } from '@nestjs/testing';
import { Player } from './player';

describe('Player', () => {
  let provider: Player;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Player],
    }).compile();

    provider = module.get<Player>(Player);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
