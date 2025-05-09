import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'

import type { Prisma, User } from '@/prisma/generated'
import { PrismaService } from '@/src/core/prisma/prisma.service'

import { PatientFiltersInput } from './inputs/filters.input'
import { PatientInput } from './inputs/patient.input'
import { isValidUUID } from '@/src/shared/utils/is-valid-uuid.util'

@Injectable()
export class PatientService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async create(user: User, input: PatientInput) {

		return	await this.prismaService.patient.create({
			data: {
				...input,
				user: { connect: { id: user.id } }
			}
		})

	}

	public async update(id: string, input: PatientInput) {

		await this.prismaService.patient.update({
			where: {
				id
			},
			data: {
				...input
			}
		})

		return true
	}

	public async remove(id: string) {
		await this.prismaService.patient.delete({
			where: {
				id
			}
		})

		return true
	}
	
	public async findPatientById(id: string, patientId: string) {
    if (!isValidUUID(id)) {
        throw new BadRequestException('Invalid patient ID');
    }

		const patient = await this.prismaService.patient.findUnique({
			where: { id: patientId },
			include: {
				visits: true
			}
		})
	
		if (!patient) {
			throw new NotFoundException(`Patient with id ${id} not found`)
		}
	
		return patient
	}
	
	public async findAll(user: User, input: PatientFiltersInput = {}) {
    const { skip, take, searchTerm } = input;

    const whereClause = searchTerm
        ? this.findBySearchTermFilter(searchTerm)
        : undefined;

    const [patients, totalCount] = await Promise.all([
        this.prismaService.patient.findMany({
            take: take || 10,
            skip: skip || 0,
            where: {
                userId: user.id,
                ...whereClause,
            },
            orderBy: {
                createdAt: 'desc',
            },
        }),
        this.prismaService.patient.count({
            where: {
                userId: user.id,
                ...whereClause,
            },
        }),
    ]);

    return {
        patients,
        totalCount,
    };
	}

	public findBySearchTermFilter(
		searchTerm: string
	): Prisma.PatientWhereInput {
		return {
			OR: [
				{
					name: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				},
				{
					surname: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				},
				{
					patronymic: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				}
			]
		}
	}
}
