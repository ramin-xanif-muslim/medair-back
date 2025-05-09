import { Markup } from 'telegraf'

export const BUTTONS = {
	authSuccess: Markup.inlineKeyboard([
		[
			Markup.button.callback('👥 My patients', 'patients'),
			Markup.button.callback('👤 View profile', 'me')
		],
		[Markup.button.url('🌐 To the site', 'https://medair.com')]
	]),
	profile: Markup.inlineKeyboard([
		Markup.button.url(
			'⚙️ Account settings',
			'https://medair.com/dashboard/settings'
		)
	])
}
