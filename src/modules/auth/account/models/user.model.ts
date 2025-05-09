import { Field, ID, ObjectType } from '@nestjs/graphql'

import { User } from '@/prisma/generated'

import { PatientModel } from '../../patient/models/patient.model'
import { VisitModel } from '../../visit/models/visit.model'
import { NotificationModel } from '@/src/modules/notification/models/notification.model'
import { NotificationSettingsModel } from '@/src/modules/notification/models/notification-settings.model'

@ObjectType()
export class UserModel implements User {
	@Field(() => ID)
	public id: string

	@Field(() => String)
	public email: string

	@Field(() => String)
	public password: string

	@Field(() => String)
	public username: string

	@Field(() => String)
	public displayName: string

	@Field(() => String, { nullable: true })
	public telegramId: string

	@Field(() => [PatientModel])
	public patients: PatientModel[]

	@Field(() => [VisitModel])
	public visits: VisitModel[]

	@Field(() => String, { nullable: true })
	public avatar: string | null

	@Field(() => String, { nullable: true })
	public bio: string | null

	@Field(() => Boolean)
	public isVerified: boolean

	@Field(() => Boolean)
	public isEmailVerified: boolean

	@Field(() => [NotificationModel])
	public notifications: NotificationModel[]

	@Field(() => NotificationSettingsModel)
	public notificationSettings: NotificationSettingsModel

	@Field(() => Boolean)
	public isTotpEnabled: boolean

	@Field(() => String, { nullable: true })
	public totpSecret: string

	@Field(() => Boolean)
	public isDeactivated: boolean

	@Field(() => Date, { nullable: true })
	public deactivatedAt: Date

	@Field(() => Date)
	public createdAt: Date

	@Field(() => Date)
	public updatedAt: Date
}
