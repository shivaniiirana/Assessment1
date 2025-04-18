
import {
  Controller,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Body,
  Req,
  Get,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PhotoService } from './photos.service';
import { UploadPhotoDto } from './dto/upload-photo.dto';
import { Express } from 'express';

@Controller('photos')
@UseGuards(JwtAuthGuard)
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('image'))
  // async uploadPhoto(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() body: UploadPhotoDto,
  //   @Req() req,
  // ) {
  //   return this.photoService.uploadPhoto(file, body.caption, req.user.userId);
  // }

  @Get()
  async listPhotos(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Req() req,
  ) {
    return this.photoService.findAllByUser(req.user.userId, +page, +limit);
  }

  @Get(':id')
  async getPhoto(@Param('id') id: number) {
    return this.photoService.findOne(id);
  }

  @Delete(':id')
  async deletePhoto(@Param('id') id: number, @Req() req) {
    return this.photoService.deletePhoto(id, req.user.userId);
  }
}
