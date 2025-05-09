import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class VisitInput {
	@Field(() => Date, { nullable: true })
	@IsString()
	@IsOptional()
	public visitDate?: Date

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	public placeName?: string

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	public status?: string

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	public visitType?: string

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	public visitReason?: string

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	public visitDesc?: string

	@Field(() => Boolean, { nullable: true })
	@IsOptional()
	public USM?: boolean

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	public usmDescription?: string

	@Field(() => Boolean, { nullable: true })
	@IsOptional()
	public blood?: boolean

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	public bloodDescription?: string

	@Field(() => Boolean, { nullable: true })
	@IsOptional()
	public lungs?: boolean

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	public lungsDescription?: string

	@Field(() => Boolean, { nullable: true })
	@IsOptional()
	public reason?: boolean

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	public reasonDescription?: string

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	public benignDescription?: string
}
