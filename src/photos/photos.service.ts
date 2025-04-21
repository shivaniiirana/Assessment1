import {
  Injectable,
  Inject,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photo, PhotoDocument } from './schemas/photo.schema';
import { UsersService } from 'src/users/users.service';
import { CloudinaryService } from 'src/config/cloudinary.service'; // ✅ Correct import
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel(Photo.name) private photoModel: Model<PhotoDocument>,
    private usersService: UsersService,
    private cloudinaryService: CloudinaryService, // ✅ Injected
  ) {}
  async uploadtoClodinary(file: Express.Multer.File, caption: string, userId: string): Promise<Photo> {
    const result: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
            folder: 'snapify',
            resource_type: 'image'
            },
            (error,result) => {
                if(error){
                    return reject(error);
                }
                resolve(result);
            }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });


    const uploadPhoto = new this.photoModel({
        userId,
        caption,
        cloudinaryUrl: result.secure_url,
        cloudinaryId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes,
    })
    await uploadPhoto.save();
    return uploadPhoto;
}

  async findAllByUser(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return this.photoModel.find({ userId }).skip(skip).limit(limit);
  }

  async findById(id: string) {
    return this.photoModel.findById(id);
  }

  async delete(id: string, userId: string) {
    const photo = await this.photoModel.findById(id);
    if (!photo) throw new NotFoundException('Photo not found');
    if (photo.userId.toString() !== userId)
      throw new ForbiddenException('Not your photo');

    await this.cloudinaryService.delete(photo.cloudinaryId); // ✅ Clean and modular
    return this.photoModel.findByIdAndDelete(id);
  }

  async findAll(): Promise<Photo[]> {
    return this.photoModel.find().exec();
  }
}
