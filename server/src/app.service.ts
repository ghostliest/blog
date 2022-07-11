import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly posts: Array<{ id: number; title: string }> = [
    { id: 1, title: 'post1' },
    { id: 2, title: 'post2' },
  ];

  getPosts() {
    return this.posts;
  }
}
