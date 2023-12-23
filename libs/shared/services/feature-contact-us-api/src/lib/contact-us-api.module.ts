import { Module } from '@nestjs/common';
import { ContactUsApiController } from './contact-us-api.controller';
import { ContactUsApiService } from './contact-us-api.service';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MailModule
  ],
  controllers: [ContactUsApiController],
  providers: [ContactUsApiService],
  exports: [ContactUsApiService]
})
export class ContactUsApiModule {}
