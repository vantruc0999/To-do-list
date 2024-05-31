import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import { User } from 'src/modules/users/entities/User';

@Injectable()
export class EmailsService {
  constructor(
    @InjectQueue('email') private readonly emailQueue: Queue,
    private readonly configService: ConfigService,
    private mailerService: MailerService,
  ) {}

  async sendHelloMail(user: User): Promise<void> {
    const templatePath = '../templates/hello-mail.hbs';
    await this.emailQueue.add('sendHelloMail', {
      to: user.email,
      templatePath,
      context: {
        name: user.fullName,
      },
    });
  }
}
