
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from '../photos/photo.model';
import { User } from '../users/user.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Photo) private photoModel: typeof Photo,
  ) {}

  async getStats() {
    const totalUsers = await this.userModel.count();
    const totalPhotos = await this.photoModel.count();

    return {
      totalUsers,
      totalPhotos,
    };
  }
}
