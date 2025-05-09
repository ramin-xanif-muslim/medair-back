import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class PatientInput {
	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	public name: string
  
	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	public surname: string
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public patronymic?: string
  
	@Field(() => Date, { nullable: true})
	@IsString()
	@IsOptional()
	public birthDate?: Date
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public birthPlace?: string
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public phoneNumber?: string
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public gender?: string
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public maritalStatus?: string
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public sexStatus?: string
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public alcohol?: boolean
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public smoke?: boolean
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public recommendationPerson?: string
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public rating?: number
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public height?: number
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public weight?: number
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public imt?: number
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public cureForInfertility?: string
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public menopause?: string
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public menarche?: string
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public firstChildbirth?: number
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public lastChildbirth?: number
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public abortCount?: number
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public lactationPeriod?: string
  
	@Field(() => String, { nullable: true})
	@IsString()
	@IsOptional()
	public artificialInseminationCount?: number
}
