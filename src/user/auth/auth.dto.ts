import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword
} from 'class-validator'

export class LoginDto {
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
  password: string
}
