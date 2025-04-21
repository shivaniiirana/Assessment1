import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from 'src/users/users.module';
import { PhotoModule } from 'src/photos/photos.module';
import { AdminService } from './admin.service';

@Module({
  imports: [UsersModule, PhotoModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
