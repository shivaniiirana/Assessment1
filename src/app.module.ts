import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PhotoModule } from './photos/photos.module';

import { AdminModule } from './admin/admin.module';

import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({ format: winston.format.simple() })
      ]
    }),
    AuthModule,
    UsersModule,
    PhotoModule,
    AdminModule,
  ],
})
export class AppModule {}