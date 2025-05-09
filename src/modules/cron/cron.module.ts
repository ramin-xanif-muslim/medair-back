import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'


import { CronService } from './cron.service'
import { NotificationService } from '../notification/notification.service'

@Module({
	imports: [ScheduleModule.forRoot()],
	providers: [CronService, NotificationService]
})
export class CronModule {}
