import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { User } from 'src/database/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async login(body: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = body;
    const user: User = await this.userService.findOneByEmail(email);
    const encryptPassword = await this.encrypt(password);
    if (user?.password !== encryptPassword) {
      throw new HttpException({ message: 'email or password wrong' }, HttpStatus.BAD_REQUEST);
    }
    const payload = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async register(body: RegisterDto): Promise<User> {
    const { email, password, userName } = body;
    const encryptedPassword = await this.encrypt(password);
    const payload = {
      email,
      userName,
      password: encryptedPassword,
    };
    return await this.userService.create(payload);
  }

  private async encrypt(textToEncrypt: string) {
    const iv = Buffer.from(process.env.INITIALIZATION_VECTOR, 'hex');
    const key = (await promisify(scrypt)(process.env.PASSWORD_ENCRYPTION_KEY, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const encryptedText = Buffer.concat([cipher.update(textToEncrypt), cipher.final()]);
    return encryptedText.toString('hex');
  }

  private async decrypt(textToDecypt: string): Promise<any> {
    const iv = Buffer.from(process.env.INITIALIZATION_VECTOR, 'hex');
    const key = (await promisify(scrypt)(process.env.PASSWORD_ENCRYPTION_KEY, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const encryptedText = Buffer.from(textToDecypt, 'hex');
    const decryptedBuffer = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decryptedBuffer.toString();
  }
}
