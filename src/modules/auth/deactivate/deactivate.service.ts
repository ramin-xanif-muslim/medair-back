import { PrismaService } from '@/src/core/prisma/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../../libs/mail/mail.service';
import { DeactivateAccountInput } from './inputs/deactivate-account.input';
import { TokenType, User } from '@/prisma/generated';
import { verify } from 'argon2';
import { destroySession } from '@/src/shared/utils/session.util';
import { Request } from 'express';
import { generateToken } from '@/src/shared/utils/generate-token.util';
import { TelegramService } from '../../libs/telegram/telegram.service';

@Injectable()
export class DeactivateService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService,
		private readonly mailSerivce: MailService,
		private readonly telegramService: TelegramService
	) {}

	public async deactivate(
		req: Request,
		input: DeactivateAccountInput,
		user: User,
	) {
		const { email, password, pin } = input

		if (user.email !== email) {
			throw new BadRequestException('Invalid email')
		}

		const isValidPassword = await verify(user.password, password)

		if (!isValidPassword) {
			throw new BadRequestException('Incorrect password')
		}

		if (!pin) {
			await this.sendDeactivateToken(req, user)

			return { message: 'Verification code required' }
		}

		await this.validateDeactivateToken(req, pin)

		return { user }
	}

	private async validateDeactivateToken(req: Request, token: string) {
		const existingToken = await this.prismaService.token.findUnique({
			where: {
				token,
				type: TokenType.DEACTIVATE_ACCOUNT
			}
		})

		if (!existingToken) {
			throw new NotFoundException('Token not found')
		}

		const hasExpired = new Date(existingToken.expiresIn) < new Date()

		if (hasExpired) {
			throw new BadRequestException('Token expired')
		}

		const user = await this.prismaService.user.update({
			where: {
				id: existingToken.userId
			},
			data: {
				isDeactivated: true,
				deactivatedAt: new Date()
			}
		})

		await this.prismaService.token.delete({
			where: {
				id: existingToken.id,
				type: TokenType.DEACTIVATE_ACCOUNT
			}
		})

		// await this.clearSessions(user.id)

		return destroySession(req, this.configService)
	}

	private async sendDeactivateToken(
		req: Request,
		user: User,
	) {
		const deactivateToken = await generateToken(
			this.prismaService,
			user,
			TokenType.DEACTIVATE_ACCOUNT,
			false
		)


		await this.mailSerivce.sendDeactivateToken(
			user.email,
			deactivateToken.token,
		)

		if (
			deactivateToken.user.notificationSettings.telegramNotifications &&
			deactivateToken.user.telegramId
		) {
			await this.telegramService.sendDeactivateToken(
				deactivateToken.user.telegramId,
				deactivateToken.token,
			)
		}

		return true
	}
}
