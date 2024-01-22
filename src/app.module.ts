import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from 'middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from 'libs';
import { StatusService } from 'modules/status/status.service';
import { BooksModule } from './modules/books/books.module';
import { StatusController } from './modules/status/status.controller';
import { StatusModule } from './modules/status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    BooksModule,
    StatusModule,
  ],
  controllers: [StatusController],
  providers: [PrismaService, StatusService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: '/users/me',
        method: RequestMethod.GET,
      },
      {
        path: '/users',
        method: RequestMethod.GET,
      },
      {
        path: '/users/status',
        method: RequestMethod.PUT,
      },
      {
        path: '/books',
        method: RequestMethod.ALL,
      },
      {
        path: '/books/:id',
        method: RequestMethod.ALL,
      },
      {
        path: '/status',
        method: RequestMethod.GET,
      },
    );
  }
}
