import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PhotoService } from 'src/photos/photos.service';


@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    private readonly photoService: PhotoService,
  ) {}

  async getAllUsers() {
    return this.usersService.findAll();
  }

  async getAllPhotos() {
    return this.photoService.findAll();
  }

  async deleteUser(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return this.usersService.remove(userId);
  }

  async deletePhoto(photoId: string, admin = true) {
    // Bypass user check for admins
    const photo = await this.photoService.findById(photoId);
    if (!photo) throw new NotFoundException('Photo not found');
    return this.photoService.delete(photoId, photo.userId.toString());
  }
}
