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
  ) {}

  async sendRegisterConfirmationEmail(user: User): Promise<void> {
    const templatePath = `../templates/confirmation-password.hbs`;

    await this.emailQueue.add('sendRegisterConfirmationEmailQueue', {
      to: user.email,
      templatePath,
      context: {
        name: user.fullName,
      },
    });
  }
}
