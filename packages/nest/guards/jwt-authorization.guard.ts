import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { Nullable } from '@zern/types';

import { ALLOW_EXPIRED_ACCESS_TOKEN_KEY, ALLOW_WITHOUT_ACCESS_TOKEN_KEY } from '../decorators';

type Payload = {
    token: Record <string, unknown>,
    isTokenExpired: boolean,
};

@Injectable()
class JwtAuthorizationGuard extends AuthGuard('jwt') {
    public constructor (
        private readonly reflector: Reflector
    ) {
        super();
    }

    public canActivate (context: ExecutionContext) {
        const isAllowWithoutAccessToken = this.isAllowWithoutAccessToken(context);

        if (isAllowWithoutAccessToken) {
            return true;
        }

        return super.canActivate(context);
    }

    public handleRequest <T> (
        error: Nullable <Error> = null,
        payload: Payload,
        info: Nullable <Error> = null,
        context: ExecutionContext,
    ): T {
        if (error !== null) {
            throw new UnauthorizedException(error.message);
        }

        if (info !== null) {
            throw new UnauthorizedException(info.message);
        }

        const isAllowExpiredAccessToken = this.isAllowExpiredAccessToken(context);

        if (payload.isTokenExpired && !isAllowExpiredAccessToken) {
            throw new UnauthorizedException('jwt expired');
        }

        return (payload.token as T);
    }

    private isAllowExpiredAccessToken (context: ExecutionContext): boolean {
        return this.getValue(ALLOW_EXPIRED_ACCESS_TOKEN_KEY, context);
    }

    private isAllowWithoutAccessToken (context: ExecutionContext): boolean {
        return this.getValue(ALLOW_WITHOUT_ACCESS_TOKEN_KEY, context);
    }

    private getValue <T> (key: string, context: ExecutionContext): T {
        return this.reflector.getAllAndOverride <T> (key, [
            context.getHandler(),
            context.getClass(),
        ]);
    }
}

export { JwtAuthorizationGuard };
