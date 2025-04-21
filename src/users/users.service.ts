import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(data: { email: string; password: string; name: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const createdUser = new this.userModel({
      ...data,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> { // Updated return type
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<UserDocument | null> { // Updated return type
    return this.userModel.findById(id);
  }

  async findAll() {
    return this.userModel.find().select('-password');
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}