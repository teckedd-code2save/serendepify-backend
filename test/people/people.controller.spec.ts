import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from '../../src/apis/people/people.controller';
import { PeopleService } from '../../src/apis/people/people.service';

describe('PeopleController', () => {
  let controller: PeopleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [PeopleService],
    }).compile();

    controller = module.get<PeopleController>(PeopleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
