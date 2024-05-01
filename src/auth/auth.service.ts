import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(user: User): Promise<string> {
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser) {
      return 'คุณเคยลงทะเบียนไว้แล้ว';
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await this.userModel.create(user);
    return 'ลงทะเบียนเรียบร้อย';
  }

  async login(email: string, password: string): Promise<{ access_token: string, message: string } | string> {
    const user = await this.userModel.findOne({ email });
    if (!user) return 'ข้อมูลไม่ถูกต้อง';

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return 'ข้อมูลไม่ถูกต้อง';

    const payload = { email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      message: 'ล็อกอินสำเร็จ',
    };
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}

