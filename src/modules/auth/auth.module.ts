import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'hehhe',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'todos/create',
      method: RequestMethod.POST,
    });
  }
}
