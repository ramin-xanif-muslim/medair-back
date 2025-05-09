import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Authorization } from '@/src/shared/decorators/auth.decorator'

import { VisitInput } from './inputs/visit.input'
import { VisitModel } from './models/visit.model'
import { VisitService } from './visit.service'

@Resolver('Visit')
export class VisitResolver {
	constructor(private readonly visitService: VisitService) {}

	@Authorization()
	@Query(() => [VisitModel], { name: 'findAllPatientVisits' })
	public async findAllPatientVisits(@Args('patientId') patientId: string) {
		return this.visitService.findAllVisits(patientId)
	}

	@Authorization()
	@Mutation(() => String, { name: 'createVisit' })
	public async createVisit(
		@Args('patientId') patientId: string,
		@Args('data') input: VisitInput
	) {
		const visit = await this.visitService.create(patientId, input)
		return visit.id
	}

	@Authorization()
	@Mutation(() => Boolean, { name: 'updateVisit' })
	public async updateVisit(
		@Args('id') id: string,
		@Args('data') input: VisitInput
	) {
		await this.visitService.update(id, input)
		return true
	}

	@Authorization()
	@Mutation(() => Boolean, { name: 'deleteVisit' })
	public async deleteVisit(@Args('id') id: string) {
		await this.visitService.delete(id)
		return true
	}
}
