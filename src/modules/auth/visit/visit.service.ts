import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '@/src/core/prisma/prisma.service'

import { VisitInput } from './inputs/visit.input'

@Injectable()
export class VisitService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findAllVisits(patientId: string) {
		const patient = await this.prismaService.patient.findUnique({
			where: { id: patientId }
		})

		if (!patient) {
			throw new NotFoundException(
				`Patient with ID ${patientId} not found`
			)
		}

		const visits = await this.prismaService.visit.findMany({
			where: {
				patientId: patientId
			},
			orderBy: {
				createdAt: 'desc'
			},
      include: {
        patient: true
      }
		})

		return visits
	}

	public async create(patientId: string, input: VisitInput) {
		const patient = await this.prismaService.patient.findUnique({
			where: { id: patientId }
		})

		if (!patient) {
			throw new NotFoundException(
				`Patient with ID ${patientId} not found`
			)
		}

		return await this.prismaService.visit.create({
			data: {
				...input,
				patient: { connect: { id: patientId } }
			}
		})
	}

	public async update(id: string, input: VisitInput) {
		const existingVisit = await this.prismaService.visit.findUnique({
			where: { id }
		})

		if (!existingVisit) {
			throw new NotFoundException(`Visit with ID ${id} not found`)
		}

		return await this.prismaService.visit.update({
			where: { id },
			data: { ...input }
		})
	}

	public async delete(id: string) {
		const existingVisit = await this.prismaService.visit.findUnique({
			where: { id }
		})

		if (!existingVisit) {
			throw new NotFoundException(`Visit with ID ${id} not found`)
		}

		return await this.prismaService.visit.delete({
			where: { id }
		})
	}
}
