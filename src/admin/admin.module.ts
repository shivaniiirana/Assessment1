
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { Photo } from '../photos/photo.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Photo])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
