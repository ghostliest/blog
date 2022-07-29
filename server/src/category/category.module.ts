import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository, ICategoryRepository } from './category.repository';
import { DATABASE, DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [
    {
      provide: CategoryService,
      useFactory: (categoryRepository: ICategoryRepository) =>
        new CategoryService(categoryRepository),
      inject: ['CATEGORY_REPO'],
    },
    {
      provide: 'CATEGORY_REPO',
      useFactory: (db) => new CategoryRepository(db),
      inject: [DATABASE],
    },
  ],
})
export class CategoryModule {}
