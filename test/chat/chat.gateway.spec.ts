import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from '../../src/apis/chat/chat.gateway';
import { ChatService } from '../../src/apis/chat/chat.service';

describe('ChatGateway', () => {
  let gateway: ChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGateway, ChatService],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
