import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

import { PrismaService } from '@/src/core/prisma/prisma.service'

import { MailService } from '../libs/mail/mail.service'
import { TelegramService } from '../libs/telegram/telegram.service'
import { NotificationService } from '../notification/notification.service'

@Injectable()
export class CronService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly mailService: MailService,
		private readonly notificationService: NotificationService,
		private readonly telegramService: TelegramService,
	) {}

	@Cron('*/10 * * * * *')
	// @Cron(CronExpression.EVERY_10_SECONDS)
	public async deleteDeactivatedAccounts() {
		const sevenDaysAgo = new Date()
		sevenDaysAgo.setDate(sevenDaysAgo.getSeconds() - 10)

		const deactivatedAccounts = await this.prismaService.user.findMany({
			where: {
				isDeactivated: true,
				deactivatedAt: {
					lte: sevenDaysAgo
				}
			},
			include: {
				notificationSettings: true,
			}
		})

		for (const user of deactivatedAccounts) {
			await this.mailService.sendAccountDeletion(user.email)

			if (
				user.notificationSettings.telegramNotifications &&
				user.telegramId
			) {
				await this.telegramService.sendAccountDeletion(user.telegramId)
			}
		}

		await this.prismaService.user.deleteMany({
			where: {
				isDeactivated: true,
				deactivatedAt: {
					lte: sevenDaysAgo
				}
			}
		})
	}

	@Cron('0 0 */4 * *')
	// @Cron(CronExpression.EVERY_10_SECONDS)
	public async notifyUsersEnableTwoFactor() {
		const users = await this.prismaService.user.findMany({
			where: {
				// id:"404496e2-a402-4fa1-868c-bf26b42d4d5f",
				isTotpEnabled: false
			},
			include: {
				notificationSettings: true
			}
		})

		for (const user of users) {
			await this.mailService.sendEnableTwoFactor(user.email)

			if (user.notificationSettings.siteNotifications) {
				await this.notificationService.createEnableTwoFactor(user.id)
			}

			if (
				user.notificationSettings.telegramNotifications &&
				user.telegramId
			) {
				await this.telegramService.sendEnableTwoFactor(user.telegramId)
			}
		}
	}

	@Cron(CronExpression.EVERY_DAY_AT_1AM)
	public async deleteOldNotifications() {
		const sevenDaysAgo = new Date()
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

		await this.prismaService.notification.deleteMany({
			where: {
				createdAt: {
					lte: sevenDaysAgo
				}
			}
		})
	}
}
