import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

import { Patient } from '@/prisma/generated'
import { VisitModel } from '../../visit/models/visit.model'


@ObjectType()
export class PatientListResponse {
	@Field(() => [PatientModel])
	patients: PatientModel[]

	@Field(() => Int)
	totalCount: number
}

@ObjectType()
export class PatientModel implements Patient {
	@Field(() => ID)
	public id: string

	@Field(() => String)
	public userId: string

	@Field(() => String)
	public name: string

	@Field(() => String)
	public surname: string

	@Field(() => String, { nullable: true })
	public patronymic: string | null

	@Field(() => Date, { nullable: true })
	public birthDate: Date | null

	@Field(() => String, { nullable: true })
	public birthPlace: string | null

	@Field(() => String, { nullable: true })
	public phoneNumber: string | null

	@Field(() => String, { nullable: true })
	public gender: string | null

	@Field(() => String, { nullable: true })
	public maritalStatus: string | null

	@Field(() => String, { nullable: true })
	public sexStatus: string | null

	@Field(() => Boolean, { defaultValue: false })
	public alcohol: boolean

	@Field(() => Boolean, { defaultValue: false })
	public smoke: boolean

	@Field(() => String, { nullable: true })
	public recommendationPerson: string | null

	@Field(() => Number, { nullable: true })
	public rating: number | null

	@Field(() => Number, { nullable: true })
	public height: number | null

	@Field(() => Number, { nullable: true })
	public weight: number | null

	@Field(() => Number, { nullable: true })
	public imt: number | null

	@Field(() => String, { nullable: true })
	public cureForInfertility: string | null

	@Field(() => String, { nullable: true })
	public menopause: string | null

	@Field(() => String, { nullable: true })
	public menarche: string | null

	@Field(() => Number, { nullable: true })
	public firstChildbirth: number | null

	@Field(() => Number, { nullable: true })
	public lastChildbirth: number | null

	@Field(() => Number, { nullable: true })
	public abortCount: number | null

	@Field(() => String, { nullable: true })
	public lactationPeriod: string | null

	@Field(() => Number, { nullable: true })
	public artificialInseminationCount: number | null

	@Field(() => [VisitModel])
	public visits: VisitModel[]

	@Field(() => Date)
	public createdAt: Date

	@Field(() => Date)
	public updatedAt: Date
}
