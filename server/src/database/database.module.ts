import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

export const DATABASE = Symbol('DATABASE');

@Module({
  providers: [
    {
      provide: DATABASE,
      useClass: PrismaService,
    },
  ],
  exports: [DATABASE],
})
export class DatabaseModule {}
