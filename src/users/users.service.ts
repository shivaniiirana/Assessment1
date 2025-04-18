// src/users/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findById(id: number) {
    return this.userModel.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }
}
