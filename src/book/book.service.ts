import { Injectable } from '@nestjs/common'

@Injectable()
export class BookService {
  hello() {
    return 'Book module'
  }
}
