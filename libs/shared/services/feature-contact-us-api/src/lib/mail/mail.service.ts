import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserDetails } from '../models/userDetail';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  maillist = ['jainswapnil90@hotmail.com'];

  async sendUserQuery(userDetails: UserDetails) {
    if (userDetails.sendMeCopy) {
      this.maillist.push(userDetails.email);
    }
    await this.mailerService.sendMail({
      to: this.maillist,
      subject: `Query : from ${userDetails.fullName}`,
      template: userDetails.sendMeCopy ? './sendCopy' : './userRequest', // `.hbs` extension is appended automatically
      context: userDetails
    });
  }
}
