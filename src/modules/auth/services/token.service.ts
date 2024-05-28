import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../entities/Token';

@Injectable()
export class TokenService {
  constructor(
    readonly jwtService: JwtService,
    readonly configService: ConfigService,

    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async generateRgisterToken(payload: { email: string }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REGISTER_TOKEN_EXPIRATION_TIME'),
    });
  }

  async generateAccessToken(payload: {
    id: number;
    email: string;
  }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
  }

  async generateRefreshToken(payload: {
    id: number;
    email: string;
  }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });
  }
}
