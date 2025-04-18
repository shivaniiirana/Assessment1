import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from './photo.model';
import cloudinary from '../config/cloudinary.config';
import { UploadApiResponse } from 'cloudinary';
import { Optional } from 'sequelize';

@Injectable()
export class PhotoService {
  constructor(@InjectModel(Photo) private photoModel: typeof Photo) {}

  // async uploadPhoto(file: Express.Multer.File, caption: string, userId: number): Promise<Photo> {
  //   const uploaded: UploadApiResponse = await new Promise((resolve, reject) => {
  //     const stream = cloudinary.uploader.upload_stream(
  //       { resource_type: 'image' },
  //       (error, result) => {
  //         if (error || !result) {
  //           return reject(error || new Error('Image upload failed'));
  //         }
  //         resolve(result);
  //       },
  //     );
  //     stream.end(file.buffer);
  //   });

  //   // Create photo with the userId as foreign key
  //   const photoData = {
  //     url: uploaded.secure_url ?? 'default-url',
  //     fileName: uploaded.original_filename,
  //     size: file.size,
  //     caption,
  //     userId, // Store the foreign key, not the 'user' object
  //   } as Partial<Photo>;

  //   return this.photoModel.create(photoData);
  // }

  async findAllByUser(userId: number, page: number, limit: number) {
    const offset = (page - 1) * limit;
    return this.photoModel.findAndCountAll({
      where: { userId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number): Promise<Photo> {
    const photo = await this.photoModel.findByPk(id);
    if (!photo) throw new NotFoundException('Photo not found');
    return photo;
  }

  async deletePhoto(id: number, userId: number) {
    const photo = await this.photoModel.findByPk(id);
    if (!photo) throw new NotFoundException('Photo not found');
    if (photo.userId !== userId) throw new UnauthorizedException('Access denied');

    await photo.destroy();
    return { message: 'Photo deleted successfully' };
  }
}
