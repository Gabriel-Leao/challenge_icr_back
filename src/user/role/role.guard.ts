import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from './role.decorator'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const role = this.reflector.get(Role, context.getHandler())
    if (!role) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user
    return user.role === role
  }
}
