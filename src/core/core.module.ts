import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { AccountModule } from '../modules/auth/account/account.module'
import { PasswordRecoveryModule } from '../modules/auth/password-recovery/password-recovery.module'
import { SessionModule } from '../modules/auth/session/session.module'
import { TotpModule } from '../modules/auth/totp/totp.module'
import { VerificationModule } from '../modules/auth/verification/verification.module'
import { MailModule } from '../modules/libs/mail/mail.module'
import { IS_DEV_ENV } from '../shared/utils/is-dev.util'

import { getGraphQLConfig } from './config/graphql.config'
import { PrismaModule } from './prisma/prisma.module'
import { DeactivateModule } from '../modules/auth/deactivate/deactivate.module'
import { CronModule } from '../modules/cron/cron.module'
import { ProfileModule } from '../modules/auth/profile/profile.module'
import { PatientModule } from '../modules/auth/patient/patient.module'
import { VisitModule } from '../modules/auth/visit/visit.module'
import { NotificationModule } from '../modules/notification/notification.module'
import { TelegramModule } from '../modules/libs/telegram/telegram.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true
		}),
		GraphQLModule.forRootAsync({
			driver: ApolloDriver,
			imports: [ConfigModule],
			useFactory: getGraphQLConfig,
			inject: [ConfigService]
		}),
		PrismaModule,
		AccountModule,
		SessionModule,
		ProfileModule,
		PatientModule,
		MailModule,
		CronModule,
		VerificationModule,
		PasswordRecoveryModule,
		TotpModule,
		VisitModule,
		DeactivateModule,
		NotificationModule,
		TelegramModule,
	]
})
export class CoreModule {}
