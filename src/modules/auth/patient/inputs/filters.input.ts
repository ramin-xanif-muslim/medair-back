import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class PatientFiltersInput {
	@Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
	take?: number

	@Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
	skip?: number

	@Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
	searchTerm?: string
}
