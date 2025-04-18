import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { PhotoModule } from './photos/photos.module';
import { AdminModule } from './admin/admin.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.model';


@Module({
  imports: [
   
    AuthModule,
    UserModule,
    PhotoModule,
    AdminModule,

  
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      username: "postgres",
      password: "shivani",
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([User]), 
    
    ConfigModule.forRoot({ isGlobal: true }),
  
     
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply LoggerMiddleware globally to all routes
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
