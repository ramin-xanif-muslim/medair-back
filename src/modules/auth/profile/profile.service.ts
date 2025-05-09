import { ConflictException, Injectable } from '@nestjs/common'

import { User } from '@/prisma/generated'
import { PrismaService } from '@/src/core/prisma/prisma.service'

import { ChangeProfileInfoInput } from './inputs/change-profile-info.input'

@Injectable()
export class ProfileService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async changeInfo(user: User, input: ChangeProfileInfoInput) {
		const { username, displayName, bio } = input

		const usernameExists = await this.prismaService.user.findUnique({
			where: {
				username
			}
		})

		if (usernameExists && username !== user.username) {
			throw new ConflictException('Username already exists')
		}

		await this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				username,
				displayName,
				bio
			}
		})

		return true
	}
}
