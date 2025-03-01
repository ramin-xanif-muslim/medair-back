import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ResetPasswordInput } from './inputs/reset-password.input';

@Injectable()
export class PasswordRecoveryService {
  public constructor(private readonly prismaService: PrismaService){}

  public resetPassword(input: ResetPasswordInput) {
    
  }
}
