import type { Patient, User } from '@/prisma/generated'

export const MESSAGES = {
	welcome:
		`<b>👋 Welcome to MedAir Bot!</b>\n\n` +
		`To receive notifications and improve your experience using the platform, let's link your Telegram account to MedAir.\n\n` +
		`Click the button below and go to the <b>Notifications</b> section to complete the setup.`,
	authSuccess: `🎉 You have successfully logged in and your Telegram account is linked to MedAir!\n\n`,
	invalidToken: '❌ Invalid or expired token.',
	profile: (user: User, patientsCount: number) =>
		`<b>👤 User profile:</b>\n\n` +
		`👤 Username: <b>${user.username}</b>\n` +
		`📧 Email: <b>${user.email}</b>\n` +
		`👥 Number of patients: <b>${patientsCount}</b>\n` +
		`📝 About me: <b>${user.bio || 'Not specified'}</b>\n\n` +
		`🔧 Click the button below to go to your profile settings.`,
	patients: (patient: Patient) =>
		`👤 <a href="https://medair.com/${patient.id}">${patient.name}</a>`,
	resetPassword: (token: string) =>
		`<b>🔒 Reset password</b>\n\n` +
		`You have requested a password reset for your platform account. <b>MedAir</b>.\n\n` +
		`To create a new password, please follow the link below.:\n\n` +
		`<b><a href="https://medair.com/account/recovery/${token}">Reset password</a></b>\n\n` +
		`📅 <b>Request date:</b> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n\n` +
		`🖥️ <b>Request information:</b>\n\n` +
		`If you did not make this request, simply ignore this message.\n\n` +
		`Thank you for using <b>MedAir</b>! 🚀`,
	deactivate: (token: string) =>
		`<b>⚠️ Account Deactivation Request</b>\n\n` +
		`You initiated the process of deactivating your account on the <b>MedAir</b> platform.\n\n` +
		`To complete the operation, please confirm your request by entering the following confirmation code:\n\n` +
		`<b>Confirmation code: ${token}</b>\n\n` +
		`📅 <b>Request date:</b> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n\n` +
		`🖥️ <b>Request information:</b>\n\n` +
		`<b>What happens after deactivation?</b>\n\n` +
		`1. You will be automatically logged out and lose access to your account.\n` +
		`2. If you don't cancel the deactivation within 7 days, your account will be <b>permanently deleted</b> along with all your information, data, and subscriptions.\n\n` +
		`<b>⏳ Please note:</b> If you change your mind within 7 days, you can contact our support to restore access to your account before it is completely deleted.\n\n` +
		`After the account is deleted, it will be impossible to restore it, and all data will be lost without the possibility of recovery.\n\n` +
		`If you've changed your mind, simply ignore this message. Your account will remain active.\n\n` +
		`Thank you for using <b>MedAir</b>! We're always happy to see you on our platform and hope you'll stay with us. 🚀\n\n` +
		`Best regards,\n` +
		`MedAir Team`,
	accountDeleted:
		`<b>⚠️ Your account has been permanently deleted.</b>\n\n` +
		`Your account has been completely erased from the MedAir database. All your data and information have been permanently deleted. ❌\n\n` +
		`🔒 You will no longer receive notifications on Telegram and email.\n\n` +
		`If you want to return to the platform, you can register using the following link:\n` +
		`<b><a href="https://medair.com/account/create">Register on MedAir</a></b>\n\n` +
		`Thank you for being with us! We will always be happy to see you on the platform. 🚀\n\n` +
		`Best regards,\n` +
		`MedAir Team`,
	streamStart: (channel: User) =>
		`<b>📡 Stream started on channel ${channel.displayName}!</b>\n\n` +
		`Watch here: <a href="https://medair.com/${channel.username}">Go to stream</a>`,
	newFollowing: (follower: User, followersCount: number) =>
		`<b>You have a new follower!</b>\n\nIt's user <a href="https://medair.com/${follower.username}">${follower.displayName}</a>\n\nTotal number of followers on your channel: ${followersCount}`,
	enableTwoFactor:
		`🔐 Secure your account!\n\n` +
		`Enable two-factor authentication in your <a href="https://medair.com/dashboard/settings">account settings</a>.`,
	verifyChannel:
		`<b>🎉 Congratulations! Your channel is verified</b>\n\n` +
		`We are pleased to inform you that your channel is now verified and you have received an official badge.\n\n` +
		`The verification badge confirms the authenticity of your channel and improves viewer trust.\n\n` +
		`Thank you for being with us and continuing to develop your channel with MedAir!`
}
