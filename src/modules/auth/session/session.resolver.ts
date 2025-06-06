import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'

import { GqlContext } from '@/src/shared/types/gql-context.types'

import { AuthModel } from '../account/models/auth.model'

import { LoginInput } from './inputs/login.input'
import { SessionService } from './session.service'

@Resolver('Session')
export class SessionResolver {
	constructor(private readonly sessionService: SessionService) {}

	@Mutation(() => AuthModel, { name: 'login' })
	public async login(
		@Context() { req }: GqlContext,
		@Args('data') input: LoginInput
	) {
		return this.sessionService.login(req, input)
	}

	@Mutation(() => Boolean, { name: 'logout' })
	public async logout(@Context() { req }: GqlContext) {
		return this.sessionService.logout(req)
	}
}
