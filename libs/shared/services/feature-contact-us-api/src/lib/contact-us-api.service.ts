import { Injectable } from '@nestjs/common';
import { UserDetails } from './models/userDetail';
import { MailService } from './mail/mail.service';

@Injectable()
export class ContactUsApiService {
    constructor(private mailService: MailService){}
  getData(): { message: string } {
    return { message: 'Hello ContactUsApiService' };
  }
  async sendEmail(userDetails: UserDetails) {
    await this.mailService.sendUserQuery(userDetails);
    return { message: 'ok' };
  }
}
