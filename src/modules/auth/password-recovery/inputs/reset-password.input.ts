import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class ResetPasswordInput {
	@Field(() => String)
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	public email: string
}
