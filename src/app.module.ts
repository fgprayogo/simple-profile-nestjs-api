import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { IndexModule } from './modules/index.module';

@Module({
  imports: [
    // .env config
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // mongoose config
    MongooseModule.forRoot(process.env.DB_URI),
    // jwt config
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1800s' },
    }),
    
    IndexModule,
  ],
})
export class AppModule {}
