import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf'
import { Context, Telegraf } from 'telegraf'

import { TokenType, type User } from '@/prisma/generated'
import { PrismaService } from '@/src/core/prisma/prisma.service'

import { BUTTONS } from './telegram.buttons'
import { MESSAGES } from './telegram.messages'

@Update()
@Injectable()
export class TelegramService extends Telegraf {
	private readonly _token: string

	public constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService
	) {
		super(configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'))
		this._token = configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN')
	}

	@Start()
	public async onStart(@Ctx() ctx: any) {
		const chatId = ctx.chat.id.toString()
		const token = ctx.message.text.split(' ')[1]

		if (token) {
			const authToken = await this.prismaService.token.findUnique({
				where: {
					token,
					type: TokenType.TELEGRAM_AUTH
				}
			})

			if (!authToken) {
				await ctx.replyWithHTML(MESSAGES.invalidToken)
			}

			const hasExpired = new Date(authToken.expiresIn) < new Date()

			if (hasExpired) {
				await ctx.replyWithHTML(MESSAGES.invalidToken)
			}

			await this.connectTelegram(authToken.userId, chatId)

			await this.prismaService.token.delete({
				where: {
					id: authToken.id
				}
			})

			await ctx.replyWithHTML(MESSAGES.authSuccess, BUTTONS.authSuccess)
		} else {
			const user = await this.findUserByChatId(chatId)

			if (user) {
				return await this.onMe(ctx)
			} else {
				await ctx.replyWithHTML(MESSAGES.welcome, BUTTONS.profile)
			}
		}
	}

	@Command('me')
	@Action('me')
	public async onMe(@Ctx() ctx: Context) {
		const chatId = ctx.chat.id.toString()

		const user = await this.findUserByChatId(chatId)
		const patientsCount = await this.prismaService.patient.count({
			where: {
				userId: user.id
			}
		})

		await ctx.replyWithHTML(
			MESSAGES.profile(user, patientsCount),
			BUTTONS.profile
		)
	}
  
	@Command('patients')
	@Action('patients')
	public async onFollows(@Ctx() ctx: Context) {
		const chatId = ctx.chat.id.toString()

		const user = await this.findUserByChatId(chatId)
		const patients = await this.prismaService.patient.findMany({
			where: {
				userId: user.id
			},
		})

		if (user && patients.length) {
			const patientsList = patients
				.map(patient => MESSAGES.patients(patient))
				.join('\n')

			const message = `<b>👥 Your patients:</b>\n\n${patientsList}`

			await ctx.replyWithHTML(message)
		} else {
			await ctx.replyWithHTML("<b>❌ You don't have patients.</b>")
		}
	}

	public async sendPasswordResetToken(
		chatId: string,
		token: string,
	) {
		await this.telegram.sendMessage(
			chatId,
			MESSAGES.resetPassword(token),
			{ parse_mode: 'HTML' }
		)
	}

	public async sendDeactivateToken(
		chatId: string,
		token: string,
	) {
		await this.telegram.sendMessage(
			chatId,
			MESSAGES.deactivate(token),
			{ parse_mode: 'HTML' }
		)
	}

	public async sendAccountDeletion(chatId: string) {
		await this.telegram.sendMessage(chatId, MESSAGES.accountDeleted, {
			parse_mode: 'HTML'
		})
	}

	public async sendStreamStart(chatId: string, channel: User) {
		await this.telegram.sendMessage(chatId, MESSAGES.streamStart(channel), {
			parse_mode: 'HTML'
		})
	}

	public async sendEnableTwoFactor(chatId: string) {
		await this.telegram.sendMessage(chatId, MESSAGES.enableTwoFactor, {
			parse_mode: 'HTML'
		})
	}

	public async sendVerifyChannel(chatId: string) {
		await this.telegram.sendMessage(chatId, MESSAGES.verifyChannel, {
			parse_mode: 'HTML'
		})
	}

	private async connectTelegram(userId: string, chatId: string) {
		await this.prismaService.user.update({
			where: {
				id: userId
			},
			data: {
				telegramId: chatId
			}
		})
	}

	private async findUserByChatId(chatId: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				telegramId: chatId
			},
		})

		return user
	}
}
