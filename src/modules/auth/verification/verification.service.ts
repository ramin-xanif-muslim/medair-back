import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import type { Request } from 'express'

import { TokenType, User } from '@/prisma/generated'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { generateToken } from '@/src/shared/utils/generate-token.util'
import { saveSession } from '@/src/shared/utils/session.util'


import { VerificationInput } from './inputs/verification.input'
import { MailService } from '../../libs/mail/mail.service'

@Injectable()
export class VerificationService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly mailService: MailService,
	) {}

	public async verify(
		req: Request,
		input: VerificationInput,
	) {
		const { token } = input

		const existingToken = await this.prismaService.token.findUnique({
			where: {
				token,
				type: TokenType.EMAIL_VERIFY
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
				isEmailVerified: true
			}
		})

		await this.prismaService.token.delete({
			where: {
				id: existingToken.id,
				type: TokenType.EMAIL_VERIFY
			}
		})


		return saveSession(req, user)
	}

	public async sendVerificationToken(user: User) {
		const verificationToken = await generateToken(
			this.prismaService,
			user,
			TokenType.EMAIL_VERIFY
		)

		await this.mailService.sendVerificationToken(
			user.email,
			verificationToken.token
		)

		return true
	}
}
