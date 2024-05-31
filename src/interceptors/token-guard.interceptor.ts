import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Inject,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SessionsService } from 'src/sessions/sessions.service';

@Injectable()
export class TokenGuard implements NestInterceptor {
    constructor(
        private readonly sessionService: SessionsService,
    ) { }

    private extractTokenFromCookie = async (cookieHeader: string) => {
        const tokenPrefix = 'token=';
        const cookieArray = cookieHeader.split(';').map((cookie) => cookie.trim());
        const fullToken = cookieArray.find((cookie) =>
            cookie.startsWith(tokenPrefix),
        );

        if (!fullToken) {
            throw new Error('Token not in cookie');
        }

        const token = fullToken.substring(tokenPrefix.length);
        if (!token) {
            throw new Error('Nothing after token=');
        }

        return token;
    };

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        try {
            const token = await this.extractTokenFromCookie(request.headers.cookie);
            const session = await this.sessionService.get({ where: { token } });
            if (!session) {
                throw new UnauthorizedException('Invalid token');
            }
            request.authId = session.userId;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
        return next.handle();
    }
}