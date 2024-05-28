import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { queueConfig } from 'src/config/queue.config';
import { EmailsConsumer } from './consumers/email.consumer';

@Module({
  imports: [
    BullModule.forRootAsync(queueConfig),
    BullModule.registerQueue({
      name: 'email',
      defaultJobOptions: {
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    }),
  ],
  providers: [EmailsConsumer],
  exports: [BullModule],
})
export class EmailQueueModule {}
