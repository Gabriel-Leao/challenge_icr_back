import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength
} from 'class-validator'

export class CreateBookDto {
  @IsString({ message: 'O campo title tem que ser um texto' })
  @IsNotEmpty({ message: 'O campo title é obrigatório' })
  @Length(3, 200, {
    message: 'O campo title deve ter entre 3 e 100 caracteres'
  })
  title: string

  @IsString({ message: 'O campo description tem que ser um texto' })
  @IsNotEmpty({ message: 'O campo description é obrigatório' })
  @MinLength(150, {
    message: 'O campo description deve ter no mínimo 150 caracteres'
  })
  description: string

  @IsString({ message: 'O campo author tem que ser um texto' })
  @IsNotEmpty({ message: 'O campo author é obrigatório' })
  @Length(3, 100, {
    message: 'O campo author deve ter entre 3 e 100 caracteres'
  })
  author: string

  @IsString({ message: 'O campo image tem que ser um texto' })
  @IsOptional()
  image?: string
}
