import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserDetails } from '../models/userDetail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, private configService:ConfigService) {}
  maillist = [this.configService.get('MAIL_USER')];

  async sendUserQuery(userDetails: UserDetails) {
    if (userDetails.sendMeCopy) {
      this.maillist.push(userDetails.email);
    }
    await this.mailerService.sendMail({
      to: this.maillist,
      subject: `Query : from ${userDetails.fullName}`,
      template: userDetails.sendMeCopy ? './sendCopy' : './userRequest', // `.hbs` extension is appended automatically
      context: {...userDetails,hostName : this.configService.get('MAIL_HOST_NAME')}
    });
  }
}
