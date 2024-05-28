import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { IEMailContext } from 'src/modules/emails/dto/mail.interface';

@Processor('email')
export class EmailsConsumer {
  private readonly logger = new Logger(EmailsConsumer.name);

  constructor(private mailerService: MailerService) {}

  @Process('sendRegisterConfirmationEmailQueue')
  async sendConfirmRegistrationEmail(
    job: Job<{
      to: string;
      templatePath: string;
      context: IEMailContext;
    }>,
  ): Promise<void> {
    try {
      const { to: userEmail, templatePath } = job.data;
      const { name, confirmEmailLink } = job.data.context;
      await this.mailerService.sendMail({
        to: userEmail,
        subject: 'Confirm your email',
        template: templatePath,
        context: {
          name,
          confirmEmailLink,
        },
      });

      this.logger.log(`Email sent successfully to ${userEmail}`);
    } catch (error) {
      if (job.attemptsMade < job.opts.attempts) {
        throw new Error('Failed to send email. Retrying...');
      } else {
        this.logger.error(
          `Failed to send email after ${job.attemptsMade} attempts`,
          error.stack,
        );
      }
    }
  }
}
