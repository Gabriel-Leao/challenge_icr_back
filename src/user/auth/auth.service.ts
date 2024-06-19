import { HttpException, Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { LoginDto } from './auth.dto'
import { compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginData: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginData.email }
    })

    if (!user) {
      throw new HttpException(
        { error: 'Not Found', message: 'Usuário não encontrado' },
        404
      )
    }
    if (!compareSync(loginData.password, user.password)) {
      throw new HttpException(
        {
          error: 'Unauthorized',
          message: 'Email ou senha incorretos'
        },
        401
      )
    }
    const payload = {
      id: user.id,
      role: user.role
    }
    return {
      message: 'login efetuado com sucesso',
      status: 200,
      access_token: this.jwtService.sign(payload, { expiresIn: '7d' })
    }
  }
}
