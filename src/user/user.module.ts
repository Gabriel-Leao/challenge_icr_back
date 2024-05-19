import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from '../prisma.service'
import { FavoriteController } from './favorite/favorite.controller'
import { FavoriteService } from './favorite/favorite.service'
import { JwtModule } from '@nestjs/jwt'
import * as process from 'node:process'
import { AuthController } from './auth/auth.controller'
import { AuthService } from './auth/auth.service'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [UserController, FavoriteController, AuthController],
  providers: [UserService, PrismaService, FavoriteService, AuthService]
})
export class UserModule {}
