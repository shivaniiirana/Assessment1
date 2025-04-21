import { Inject, Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  constructor(@Inject('CLOUDINARY') private cloudinary) {}

//   upload(file: Express.Multer.File): Promise<{ url: string; publicId: string }> {
    
//   }

  async delete(publicId: string): Promise<void> {
    await this.cloudinary.uploader.destroy(publicId);
  }
}
