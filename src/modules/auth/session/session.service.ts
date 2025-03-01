import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { equal } from 'assert'
import type { Request } from 'express'

import { PrismaService } from '@/src/core/prisma/prisma.service'
import { destroySession, saveSession } from '@/src/shared/utils/session.util'

import { LoginInput } from './input/login.input'

@Injectable()
export class SessionService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService
	) {}

	public async login(req: Request, input: LoginInput) {
		const { login, password } = input

		const user = await this.prismaService.user.findFirst({
			where: {
				OR: [
					{ username: { equals: login } },
					{ email: { equals: login } }
				]
			}
		})

		if (!user) {
			throw new NotFoundException('User not found')
		}

		return saveSession(req, user)
	}

	public async logout(req: Request) {
		return destroySession(req, this.configService)
	}
}
