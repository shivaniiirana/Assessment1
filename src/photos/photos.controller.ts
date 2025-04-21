import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Request,
  Get,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoService } from './photos.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('photos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a photo' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        caption: {
          type: 'string',
        },
      },
    },
  })
  uploadPhoto(
    @UploadedFile('file') file: Express.Multer.File,
    @Body('caption') caption: string,
    @Request() req: any,
  ) {
    return this.photoService.uploadtoClodinary(file, caption, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all photos of the logged-in user (paginated)' })
  getAllUserPhotos(
    @Request() req: any,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.photoService.findAllByUser(req.user.userId, +page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a photo by ID' })
  getPhotoById(@Param('id') id: string) {
    return this.photoService.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a photo by ID (if owned by user)' })
  deletePhoto(@Param('id') id: string, @Request() req: any) {
    return this.photoService.delete(id, req.user.userId);
  }
}
