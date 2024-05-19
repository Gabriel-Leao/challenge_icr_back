import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  Length
} from 'class-validator'

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

  @IsString({ message: 'O campo password tem que ser um texto' })
  @IsNotEmpty({ message: 'O campo password é obrigatório' })
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
        'O campo password deve ter no mínimo 8 caracteres, sendo obrigatório 1 letra minúscula, 1 letra maiúscula e 1 número.'
    }
  )
  password: string

  @IsEnum(UserRole, { message: 'O campo role deve ser USER ou ADMIN' })
  @IsOptional()
  role?: UserRole
}

export class CreateFavoriteDto {
  @IsNotEmpty({ message: 'O campo bookId é obrigatório' })
  @IsUUID('4', { message: 'O campo bookId deve ser um UUID' })
  bookId: string
}

export class LoginDto {
  @IsEmail({}, { message: 'O campo email deve ser um email válido' })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string

  @IsString({ message: 'O campo password tem que ser um texto' })
  @IsNotEmpty({ message: 'O campo password é obrigatório' })
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
        'O campo password deve ter no mínimo 8 caracteres, sendo obrigatório 1 letra minúscula, 1 letra maiúscula e 1 número.'
    }
  )
  password: string
}
