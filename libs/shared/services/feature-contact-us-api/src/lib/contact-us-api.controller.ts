import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactUsApiService } from './contact-us-api.service';
import { UserDetails } from './models/userDetail';

@Controller('contact-us-api')
export class ContactUsApiController {
  constructor(private contactUsApiService: ContactUsApiService) {}

  @Get()
  getData() {
    return this.contactUsApiService.getData();
  }
  @Post('sendEmail')
  async sendEmail(@Body() userDetails: UserDetails) {
    console.log('controller ',userDetails);
    return this.contactUsApiService.sendEmail(userDetails);
  }
}
