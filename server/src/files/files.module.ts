import { Module } from '@nestjs/common';
import { FilesService } from './files.service';

export const FILES_SERVICE = Symbol('FILES_SERVICE');

@Module({
  providers: [
    {
      provide: FILES_SERVICE,
      useClass: FilesService,
    },
  ],
  exports: [FILES_SERVICE],
})
export class FilesModule {}
