import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
// import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/CreateUser.dto';
import { ConfigService } from '@nestjs/config';
import { Token } from './entities/Token';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as ms from 'ms';
import { User } from '../users/entities/User';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,

    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> | null {
    const userExists = await this.usersService.findByEmail(createUserDto.email);

    if (userExists) {
      throw new HttpException(
        'Email is already registered',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    delete newUser.password;

    return { status: HttpStatus.OK, newUser };
  }

  async login(loginPayloadDto: AuthDto): Promise<any> {
    const { email } = loginPayloadDto;
    const user = await this.usersService.findByEmail(email);

    await this.tokenRepository.delete({ user: { id: user.id } });

    const payload = { id: user.id, email: user.email };

    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    const expiresAt = new Date(
      Date.now() +
        ms(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')),
    );

    await this.tokenRepository.save(
      this.tokenRepository.create({ user, refreshToken, expiresAt }),
    );

    return {
      user,
      tokens: { accessToken: accessToken, refreshToken: refreshToken },
    };
  }

  private generateAccessToken(payload: {
    id: number;
    email: string;
  }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
  }

  private generateRefreshToken(payload: {
    id: number;
    email: string;
  }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findByEmail(email);

    if (!user || !(await compare(password, user.password))) {
      throw new ConflictException('Invalid email or password');
    }

    return user;
  }

  async isTokenRevoked(payload: any): Promise<boolean> {
    return await this.tokenRepository.exists({
      where: {
        user: {
          id: payload.id,
        },
      },
    });
  }
}
