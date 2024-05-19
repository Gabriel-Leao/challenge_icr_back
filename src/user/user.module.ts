import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from '../prisma.service'
import { AuthController } from './auth/auth.controller'
import { AuthService } from './auth/auth.service'

@Module({
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, PrismaService]
})
export class UserModule {}
