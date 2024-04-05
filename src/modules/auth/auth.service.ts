import { HttpException, HttpStatus, Injectable, Request, UnauthorizedException } from '@nestjs/common';
// import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/CreateUser.dto';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ) {}

    async register(createUserDto: CreateUserDto): Promise<any> | null {
        const userExists = await this.usersService.findByEmail(
            createUserDto.email,
        );

        if (userExists) {
            throw new HttpException('Email is already registered', HttpStatus.CONFLICT);
        } 

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = await this.usersService.create({
            ...createUserDto,
            password: hashedPassword,
        });

        delete newUser.password;

        return { status: HttpStatus.OK, newUser };
    }

    async login(request: AuthDto): Promise<any> {
        const user = await this.usersService.findByEmail(request.email);

        if (!user) {
            throw new HttpException('Wrong email or password', HttpStatus.UNAUTHORIZED);
        }
        else {
            const passwordMatches = await bcrypt.compare(request.password, user.password);;

            if (!passwordMatches) {
                throw new HttpException('Wrong email or password', HttpStatus.UNAUTHORIZED);
            } else {
                delete user.password;

                const payload = { userId: user.id, email: user.email};
                
                const accessToken = await this.jwtService.signAsync(payload);

                return {
                    status: HttpStatus.OK,
                    access_token: accessToken,
                    user: user
                  };
            };
        }

    }
}
