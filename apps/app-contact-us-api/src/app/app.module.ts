import { Module } from '@nestjs/common';
import { ContactUsApiModule } from '@portfolio/contact-us-api';

@Module({
  imports: [ContactUsApiModule]
})
export class AppModule {}
