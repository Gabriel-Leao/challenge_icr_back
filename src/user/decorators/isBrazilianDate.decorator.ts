import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'IsBrazilianDate' })
export class IsBrazilianDateConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/
    if (!regex.test(value)) {
      return false
    }

    const year = Number(value.split('/')[2])
    const currentYear = new Date().getFullYear()

    return year <= currentYear && year > currentYear - 100
  }
}

export function IsBrazilianDate(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsBrazilianDateConstraint
    })
  }
}
