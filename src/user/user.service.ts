import { HttpException, Injectable } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { PrismaService } from '../prisma.service'
import { genSaltSync, hashSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true
      }
    })
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      },
      select: {
        name: true,
        email: true,
        role: true,
        password: true,
        favorites: {
          select: {
            id: true,
            book: {
              select: {
                id: true,
                title: true,
                description: true,
                author: true
              }
            }
          }
        }
      }
    })

    if (!user) {
      throw new HttpException(
        { error: 'Not Found', message: 'Usuário não encontrado' },
        404
      )
    }
    return {
      message: 'Usuário encontrado com sucesso',
      success: true,
      status: 200,
      user
    }
  }

  async createUser(data: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email
      }
    })
    if (user) {
      throw new HttpException(
        { error: 'Conflict', message: 'Email já cadastrado' },
        409
      )
    }
    const { name, password, email, role, birthday } = data
    const hashedPassword = hashSync(password, genSaltSync(10))
    const id = uuidv4()
    await this.prisma.user.create({
      data: {
        id,
        name,
        password: hashedPassword,
        email,
        role,
        birthday
      }
    })

    const payload = {
      id,
      role: role
    }
    return {
      message: 'Usuário criado com sucesso',
      status: 201,
      success: true,
      access_token: this.jwtService.sign(payload, { expiresIn: '7d' })
    }
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new HttpException(
        { error: 'Not Found', message: 'Usuário não encontrado' },
        404
      )
    }

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: { email: data.email, NOT: { id } }
    })

    if (userWithSameEmail) {
      throw new HttpException(
        { error: 'Conflict', message: 'Email já cadastrado' },
        409
      )
    }

    if (data.password !== user.password) {
      data.password = hashSync(data.password, genSaltSync(10))
    }
    await this.prisma.user.update({
      where: {
        id
      },
      data
    })
    return {
      message: 'Usuário atualizado com sucesso',
      success: true,
      status: 200
    }
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new HttpException(
        { error: 'Not Found', message: 'Usuário não encontrado' },
        404
      )
    }

    await this.prisma.favorite.deleteMany({
      where: { user_id: id }
    })
    await this.prisma.user.delete({
      where: {
        id
      }
    })
    return {
      message: 'Usuário deletado com sucesso',
      success: true,
      status: 200
    }
  }
}
