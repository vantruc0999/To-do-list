import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}

    use(req: any, res: any, next: () => void) {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Unauthorized');
        }

        console.log(authHeader);
        
        const token = authHeader.split(' ')[1];

        try {
            const decoded = this.jwtService.verify(token);
            req.user = decoded;
            next();
        } catch (error) {
            throw new UnauthorizedException('Unauthorized');
        }
    }
}
