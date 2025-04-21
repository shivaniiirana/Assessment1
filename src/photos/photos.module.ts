import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Photo, PhotoSchema } from './schemas/photo.schema';
import { PhotoService } from './photos.service';
import { PhotoController } from './photos.controller';
import { CloudinaryModule } from 'src/config/cloudinary.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }]),
    CloudinaryModule,
    UsersModule,
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService], // Export PhotoService
})
export class PhotoModule {}