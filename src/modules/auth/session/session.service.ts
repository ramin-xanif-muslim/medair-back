import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'argon2'
import type { Request } from 'express'
import { TOTP } from 'otpauth'

import { PrismaService } from '@/src/core/prisma/prisma.service'
import { destroySession, saveSession } from '@/src/shared/utils/session.util'

import { VerificationService } from '../verification/verification.service'

import { LoginInput } from './inputs/login.input'

@Injectable()
export class SessionService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService,
		private readonly verificationService: VerificationService
	) {}

	public async login(req: Request, input: LoginInput) {
		const { login, password, pin } = input

		const user = await this.prismaService.user.findFirst({
			where: {
				OR: [
					{ username: { equals: login } },
					{ email: { equals: login } }
				]
			}
		})

		if (!user || user.isDeactivated) {
			throw new NotFoundException('User not found')
		}

		const isValidPassword = await verify(user.password, password)

		if (!isValidPassword) {
			throw new UnauthorizedException('Incorrect password')
		}

		if (!user.isEmailVerified) {
			await this.verificationService.sendVerificationToken(user)

			throw new BadRequestException(
				'Account not verified. Please check your email for confirmation.'
			)
		}

		if (user.isTotpEnabled) {
			if (!pin) {
				return {
					message: 'A code is required to complete authorization.'
				}
			}

			const totp = new TOTP({
				issuer: 'MedAir',
				label: `${user.email}`,
				algorithm: 'SHA1',
				digits: 6,
				secret: user.totpSecret
			})

			const delta = totp.validate({ token: pin })

			if (delta === null) {
				throw new BadRequestException('Invalid code')
			}
		}


		return saveSession(req, user)
	}

	public async logout(req: Request) {
		return destroySession(req, this.configService)
	}
}
