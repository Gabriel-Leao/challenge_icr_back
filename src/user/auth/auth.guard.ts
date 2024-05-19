import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    if (type !== 'Bearer' || !token) {
      throw new HttpException('Unauthorized', 401)
    }
    try {
      request['user'] = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      })
    } catch {
      throw new HttpException('Unauthorized', 401)
    }
    return true
  }
}
