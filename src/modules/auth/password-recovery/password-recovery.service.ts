import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common'
import type { Request } from 'express'

import { TokenType } from '@/prisma/generated'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { generateToken } from '@/src/shared/utils/generate-token.util'

import { MailService } from '../../libs/mail/mail.service'

import { ResetPasswordInput } from './inputs/reset-password.input'
import { NewPasswordInput } from './inputs/new-password.input'
import { hash } from 'argon2'
import { TelegramService } from '../../libs/telegram/telegram.service'

@Injectable()
export class PasswordRecoveryService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly mailService: MailService,
		private readonly telegramService: TelegramService
	) {}

	public async resetPassword(req: Request, input: ResetPasswordInput) {
		const { email } = input

		

		const user = await this.prismaService.user.findUnique({
			where: {
				email
			},
			include: {
				notificationSettings: true
			}
		})

		if (!user) {
			throw new NotAcceptableException('User not found')
		}

		const resetToken = await generateToken(
			this.prismaService,
			user,
			TokenType.PASSWORD_RESET
		)

		await this.mailService.sendPasswordResetToken(
			user.email,
			resetToken.token
		)

		if (
			user.notificationSettings &&
			user.telegramId
		) {
			await this.telegramService.sendPasswordResetToken(
				user.telegramId,
				resetToken.token,
			)
		}

		return true
	}

	public async newPassword(input: NewPasswordInput) {
		const { password, token } = input

		const existingToken = await this.prismaService.token.findUnique({
			where: {
				token,
				type: TokenType.PASSWORD_RESET
			}
		})

		if (!existingToken) {
			throw new NotFoundException('Token not found')
		}

		const hasExpired = new Date(existingToken.expiresIn) < new Date()

		if (hasExpired) {
			throw new BadRequestException('Token expired')
		}

		await this.prismaService.user.update({
			where: {
				id: existingToken.userId
			},
			data: {
				password: await hash(password)
			}
		})

		await this.prismaService.token.delete({
			where: {
				id: existingToken.id,
				type: TokenType.PASSWORD_RESET
			}
		})

		return true
	}
}
