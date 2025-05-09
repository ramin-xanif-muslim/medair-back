import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { User } from '@/prisma/generated'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'

import { ChangeProfileInfoInput } from './inputs/change-profile-info.input'
import { ProfileService } from './profile.service'

@Resolver('Profile')
export class ProfileResolver {
	public constructor(private readonly profileService: ProfileService) {}

	@Authorization()
	@Mutation(() => Boolean, { name: 'changeProfileInfo' })
	public async changeInfo(
		@Authorized() user: User,
		@Args('data') input: ChangeProfileInfoInput
	) {
		return this.profileService.changeInfo(user, input)
	}
}
