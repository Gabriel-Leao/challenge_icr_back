import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateCategoryDto {
  @IsString({ message: 'O campo name tem que ser um texto' })
  @IsNotEmpty({ message: 'O campo name é obrigatório' })
  @Length(3, 100, {
    message: 'O campo name deve ter entre 3 e 100 caracteres'
  })
  name: string
}
