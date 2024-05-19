import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { BookModule } from './book/book.module'
import { PrismaService } from './prisma.service'
import { AppController } from './app.controller'

@Module({
  imports: [UserModule, BookModule],
  controllers: [AppController],
  providers: [PrismaService]
})
export class AppModule {}
