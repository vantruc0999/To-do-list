import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailQueueModule } from '../email-queue/email-queue.module';
import { EmailsService } from './services/email.service';
import { emailConfig } from 'src/config/email.config';

@Module({
  imports: [MailerModule.forRootAsync(emailConfig), EmailQueueModule],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
