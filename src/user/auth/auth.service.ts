import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  hello() {
    return 'Auth module'
  }
}
