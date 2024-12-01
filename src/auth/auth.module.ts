import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constant';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret, // Replace with a strong key
      signOptions: { expiresIn: '30d' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
