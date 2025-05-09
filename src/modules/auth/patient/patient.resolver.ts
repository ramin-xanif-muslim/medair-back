import { Param } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { User } from '@/prisma/generated'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { Authorized } from '@/src/shared/decorators/authorized.decorator'

import { PatientFiltersInput } from './inputs/filters.input'
import { PatientInput } from './inputs/patient.input'
import { PatientListResponse, PatientModel } from './models/patient.model'
import { PatientService } from './patient.service'

@Resolver('Patient')
export class PatientResolver {
	constructor(private readonly patientService: PatientService) {}

	@Authorization()
	@Mutation(() => String, { name: 'createPatient' })
	public async createPatient(
		@Authorized() user: User,
		@Args('data') input: PatientInput
	) {
		const newPatient = await this.patientService.create(user, {
			...input
		})

		return newPatient.id
	}

	@Authorization()
	@Mutation(() => Boolean, { name: 'updatePatient' })
	public async updatePatient(
		@Args('id') id: string,
		@Args('data') input: PatientInput
	) {
		await this.patientService.update(id, {
			...input
		})

		return true
	}

	@Authorization()
	@Mutation(() => Boolean, { name: 'removePatient' })
	public async removePatient(@Args('id') id: string) {
		await this.patientService.remove(id)

		return true
	}

	@Authorization()
	@Query(() => PatientModel, { name: 'findPatientById' })
	public async findPatientById(
		@Authorized('id') id: string,
		@Args('id') patientId: string
	) {
		return this.patientService.findPatientById(id, patientId)
	}

	@Authorization()
	@Query(() => PatientListResponse, { name: 'findAllPatients' })
	public async findAllPatients(
		@Authorized() user: User,
		@Args('filters') input: PatientFiltersInput
	) {
    return this.patientService.findAll(user, input);
	}
}
