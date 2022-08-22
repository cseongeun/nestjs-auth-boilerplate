import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NetworkModule } from './network/network.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, NetworkModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
