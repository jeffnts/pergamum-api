import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaService } from 'libs';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [BooksController],
  providers: [BooksService, PrismaService],
})
export class BooksModule {}
