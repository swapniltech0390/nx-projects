import { Module } from '@nestjs/common';
import { ContactUsApiController } from './contact-us-api.controller';
import { ContactUsApiService } from './contact-us-api.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports:[MailModule],
  controllers: [ContactUsApiController],
  providers: [ContactUsApiService],
  exports: [ContactUsApiService],
})
export class ContactUsApiModule {}
