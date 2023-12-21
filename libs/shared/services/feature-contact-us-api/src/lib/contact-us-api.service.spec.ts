import { Test } from '@nestjs/testing';
import { ContactUsApiService } from './contact-us-api.service';

describe('ContactUsApiService', () => {
  let service: ContactUsApiService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ContactUsApiService],
    }).compile();

    service = module.get(ContactUsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
