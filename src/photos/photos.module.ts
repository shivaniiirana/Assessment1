
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from './photo.model';
import { PhotoController } from './photos.controller';
import { PhotoService } from './photos.service';


@Module({
  imports: [SequelizeModule.forFeature([Photo])],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
