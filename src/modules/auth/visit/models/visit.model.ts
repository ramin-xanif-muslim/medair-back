import { Visit } from "@/prisma/generated";
import { Field, ObjectType } from '@nestjs/graphql'


@ObjectType()
export class VisitModel implements Visit {
	@Field(() => String)
	id: string

	@Field(() => String)
	patientId: string

	@Field(() => Date)
	visitDate: Date

	@Field(() => String)
	placeName: string

	@Field(() => String)
	status: string

	@Field(() => String)
	visitType: string

	@Field(() => String)
	visitReason: string

	@Field(() => String, { nullable: true })
	visitDesc: string | null

	@Field(() => String, { nullable: true })
	Prophylactic: string | null

	@Field(() => Boolean, { nullable: true })
	USM: boolean | null

	@Field(() => String, { nullable: true })
	usmDescription: string | null

	@Field(() => Boolean, { nullable: true })
	blood: boolean | null

	@Field(() => String, { nullable: true })
	bloodDescription: string | null

	@Field(() => Boolean, { nullable: true })
	lungs: boolean | null

	@Field(() => String, { nullable: true })
	lungsDescription: string | null

	@Field(() => Boolean, { nullable: true })
	reason: boolean | null

	@Field(() => String, { nullable: true })
	reasonDescription: string | null

	@Field(() => String, { nullable: true })
	benignDescription: string | null

	@Field(() => Date)
	public createdAt: Date

	@Field(() => Date)
	public updatedAt: Date
}
