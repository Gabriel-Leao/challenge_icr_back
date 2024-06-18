import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength
} from 'class-validator'
import { Match } from './decorators/match.decorator'
import { IsBrazilianDate } from './decorators/isBrazilianDate.decorator'

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export class CreateUserDto {
  @IsString({ message: 'O campo name tem que ser um texto' })
  @IsNotEmpty({ message: 'O campo name é obrigatório' })
  @Length(3, 100, { message: 'O campo name deve ter entre 3 e 100 caracteres' })
  name: string

  @IsEmail({}, { message: 'O campo email deve ser um email válido' })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string

  @IsString({ message: 'O campo senha tem que ser um texto' })
  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0
    },
    {
      message:
        'O campo senha deve ter no mínimo 8 caracteres, sendo obrigatório 1 letra minúscula, 1 letra maiúscula e 1 número.'
    }
  )
  @MaxLength(64, { message: 'A senha pode ter no máximo 64 caracteres' })
  password: string

  @IsString({ message: 'O campo confirma senha tem que ser um texto' })
  @Match('password', { message: 'As senhas não coincidem' })
  confirmPassword: string

  @IsBrazilianDate({
    message:
      'Data inválida. Use o formato dd/mm/yyyy e certifique-se de que a data é anterior a 100 anos atrás'
  })
  birthday: string

  @IsEnum(UserRole, { message: 'O campo role deve ser USER ou ADMIN' })
  @IsOptional()
  role?: UserRole
}
