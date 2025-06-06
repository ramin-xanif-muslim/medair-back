import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'

import { GqlContext } from '@/src/shared/types/gql-context.types'

import { NewPasswordInput } from './inputs/new-password.input'
import { ResetPasswordInput } from './inputs/reset-password.input'
import { PasswordRecoveryService } from './password-recovery.service'

@Resolver('PasswordRecovery')
export class PasswordRecoveryResolver {
	constructor(
		private readonly passwordRecoveryService: PasswordRecoveryService
	) {}

	@Mutation(() => Boolean, { name: 'resetPassword' })
	public async resetPassword(
		@Context() { req }: GqlContext,
		@Args('data') input: ResetPasswordInput
	) {
		return this.passwordRecoveryService.resetPassword(req, input)
	}

	@Mutation(() => Boolean, { name: 'newPassword' })
	public async newPassword(@Args('data') input: NewPasswordInput) {
		return this.passwordRecoveryService.newPassword(input)
	}
}
