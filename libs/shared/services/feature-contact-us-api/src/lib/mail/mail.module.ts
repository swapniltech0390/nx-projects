import { Module } from '@nestjs/common';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp-mail.outlook.com',
        secure: false,
        auth: {
          user: 'jainswapnil90@hotmail.com',
          pass: 'Zaq1!!!!',
        },
      },
      defaults: {
        from: '"Swapnil Jain" jainswapnil90@hotmail.com',
      },
      template: {
        dir: join(__dirname, 'assets/mailTemplates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 
})
export class MailModule {}
