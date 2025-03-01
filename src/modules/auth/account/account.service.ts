import { ConflictException, Injectable } from '@nestjs/common'
import { hash, verify } from 'argon2'

import { PrismaService } from '@/src/core/prisma/prisma.service'

import { CreateUserInput } from './inputs/create-user.input'

@Injectable()
export class AccountService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async me(id:string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			}
		})

		return user
	}

	public async create(input: CreateUserInput) {
		const { username, email, password } = input

		const isUsernameExists = await this.prismaService.user.findUnique({
			where: {
				username
			}
		})

		if (isUsernameExists) {
			throw new ConflictException('This username is already taken.')
		}

		const isEmailExists = await this.prismaService.user.findUnique({
			where: {
				email
			}
		})

		if (isEmailExists) {
			throw new ConflictException('This email is already taken.')
		}

		const user = await this.prismaService.user.create({
			data: {
				username,
				email,
				password: await hash(password),
				displayName: username,
			}
		})


		return true
	}
}
