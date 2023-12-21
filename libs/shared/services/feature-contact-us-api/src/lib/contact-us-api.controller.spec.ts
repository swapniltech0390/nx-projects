import { Test } from '@nestjs/testing';
import { ContactUsApiController } from './contact-us-api.controller';
import { ContactUsApiService } from './contact-us-api.service';

describe('ContactUsApiController', () => {
  let controller: ContactUsApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ContactUsApiService],
      controllers: [ContactUsApiController],
    }).compile();

    controller = module.get(ContactUsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
