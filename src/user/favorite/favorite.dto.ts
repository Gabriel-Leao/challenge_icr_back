import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateFavoriteDto {
  @IsNotEmpty({ message: 'O campo bookId é obrigatório' })
  @IsUUID('4', { message: 'O campo bookId deve ser um UUID' })
  bookId: string
}
