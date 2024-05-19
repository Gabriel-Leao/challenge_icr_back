import { HttpException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './user.dto'
import { PrismaService } from '../prisma.service'
import { v4 as uuidv4 } from 'uuid'
import { genSaltSync, hashSync } from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
        password: true
      }
    })

    if (!user) {
      throw new HttpException('Usuário não encontrado', 404)
    }
    return user
  }

  async createUser(data: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email
      }
    })
    if (user) {
      throw new HttpException('Email já cadastrado', 400)
    }
    data.password = hashSync(data.password, genSaltSync(10))
    const id = uuidv4()
    return this.prisma.user.create({
      data: {
        id,
        ...data
      }
    })
  }

  async updateUser(id: string, data: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new HttpException('Usuário não encontrado', 404)
    }

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: { email: data.email, NOT: { id } }
    })

    if (userWithSameEmail) {
      throw new HttpException('Email já cadastrado', 400)
    }

    data.password = hashSync(data.password, genSaltSync(10))
    return this.prisma.user.update({
      where: {
        id
      },
      data
    })
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new HttpException('Usuário não encontrado', 404)
    }

    return this.prisma.user.delete({
      where: {
        id
      }
    })
  }
}
