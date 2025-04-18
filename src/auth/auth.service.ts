

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';
import { RegisterDto } from './dto/register.dto'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
   
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
    });

  
    const userWithoutPassword = user.get({ plain: true });

    return {
      message: 'User registered successfully',
      user: userWithoutPassword, 
    };
  }

  async login(email: string, password: string) {
   
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user.id });

    return {
      message: 'Login successful',
      token,
    };
  }
}
